/**
 * Pull Base UI components from an upstream shadcn checkout into `src/`.
 *
 * Run from the repo root (`bun run shadcn:import ...`) or this package (`bun run import ...`).
 *
 *   bun run shadcn:import button dialog       # specific components
 *   bun run shadcn:import --all                # every supported component
 *   bun run shadcn:import button --force       # overwrite local changes
 *   bun run shadcn:import --all --dry          # print the result, write nothing
 *
 * Options:
 *   --style <name>   shadcn style used to fill `cn-*` classes (default: nova)
 *   --shadcn <dir>   path to the shadcn repo, relative to the repo root
 *                    (default: shadcnui, or $SHADCN_DIR)
 *
 * Pipeline per file:
 *   1. resolve `cn-*` placeholders using the style CSS (shadcn's own transformer)
 *   2. map shadcn tokens to ma-ui tokens (see scripts/lib/tokens.ts)
 *   3. resolve <IconPlaceholder> to lucide-react
 *   4. rewrite imports to `@/registry/ma/*`, format with oxfmt
 *
 * Imported files are a starting point: edit them freely afterwards. Existing
 * files are skipped unless --force is passed.
 */
import path from 'node:path'
import { parseArgs } from 'node:util'
import { format, type FormatConfig } from 'oxfmt'
import { createStyleMap, transformIcons, transformMenu, transformStyle } from 'shadcn/utils'
import { Project, ScriptKind } from 'ts-morph'

import { mapColors, mapCssVars, mapStyleEntry, stripDarkVariants } from './lib/tokens'

const ROOT = path.resolve(import.meta.dir, '..')
const REPO_ROOT = path.resolve(ROOT, '../..')
const TARGET = path.join(ROOT, 'src')

/** Components that need extra, heavier dependencies; import them explicitly. */
const SKIP_BY_DEFAULT = new Set([
    'chart',
    'sonner',
    'form',
    'attachment',
    'bubble',
    'marker',
    'message',
    'message-scroller',
    'questionnaire',
])

const { values, positionals } = parseArgs({
    args: Bun.argv.slice(2),
    allowPositionals: true,
    options: {
        all: { type: 'boolean', default: false },
        force: { type: 'boolean', default: false },
        dry: { type: 'boolean', default: false },
        style: { type: 'string', default: 'nova' },
        shadcn: { type: 'string', default: Bun.env.SHADCN_DIR ?? 'shadcnui' },
    },
})

const shadcnRoot = path.resolve(REPO_ROOT, values.shadcn!)
const baseDir = path.join(shadcnRoot, 'apps/v4/registry/bases/base')
const styleFile = path.join(shadcnRoot, `apps/v4/registry/styles/style-${values.style}.css`)

if (!(await Bun.file(styleFile).exists())) {
    console.error(`Style not found: ${styleFile}`)
    process.exit(1)
}

type UpstreamItem = {
    name: string
    dependencies?: string[]
    registryDependencies?: string[]
    files?: { path: string }[]
}

const { ui } = (await import(path.join(baseDir, 'ui/_registry.ts'))) as {
    ui: UpstreamItem[]
}
const { hooks } = (await import(path.join(baseDir, 'hooks/_registry.ts'))) as {
    hooks: UpstreamItem[]
}
const upstream = new Map([...ui, ...hooks].map((item) => [item.name, item]))

const requested = values.all
    ? ui.map((item) => item.name).filter((name) => !SKIP_BY_DEFAULT.has(name))
    : positionals

if (requested.length === 0) {
    console.error('Usage: bun run shadcn:import <component...> | --all')
    process.exit(1)
}

// Resolve upstream registry dependencies so imports never dangle.
const queue = [...requested]
const selected = new Set<string>()
while (queue.length) {
    const name = queue.shift()!
    if (selected.has(name)) continue
    const item = upstream.get(name)
    if (!item) {
        console.error(`Unknown upstream item: ${name}`)
        process.exit(1)
    }
    selected.add(name)
    queue.push(...(item.registryDependencies ?? []))
}

const styleMap = Object.fromEntries(
    Object.entries(createStyleMap(await Bun.file(styleFile).text())).map(([part, classes]) => [
        part,
        mapStyleEntry(part, classes),
    ]),
)

// The format() API doesn't read .oxfmtrc.json, so load the repo config here.
const oxfmtrcPath = path.join(REPO_ROOT, '.oxfmtrc.json')
const {
    $schema: _,
    ignorePatterns: __,
    ...formatConfig
}: FormatConfig & {
    $schema?: string
    ignorePatterns?: string[]
} = await Bun.file(oxfmtrcPath).json()
if (typeof formatConfig.sortTailwindcss === 'object' && formatConfig.sortTailwindcss.stylesheet) {
    formatConfig.sortTailwindcss.stylesheet = path.resolve(
        REPO_ROOT,
        formatConfig.sortTailwindcss.stylesheet,
    )
}

async function transformFile(source: string, filePath: string) {
    let output = await transformStyle(source, { styleMap })

    const project = new Project({ useInMemoryFileSystem: true })
    const sourceFile = project.createSourceFile('component.tsx', output, {
        scriptKind: ScriptKind.TSX,
    })
    const config = { iconLibrary: 'lucide', menuColor: 'default' } as never
    await transformIcons({ sourceFile, config } as never)
    await transformMenu({ sourceFile, config } as never)
    output = sourceFile.getText()

    output = output
        .replace(/^import \{ IconPlaceholder \} from .*\n/m, '')
        .replace(/from "cn"/g, 'from "@/registry/ma/lib/utils"')
        .replace(/@\/registry\/bases\/base\//g, '@/registry/ma/')
        .replace(/\bcn-rtl-flip\b/g, 'rtl:rotate-180')
        // Remaining upstream markers (font-heading, logical-sides, ...).
        .replace(/\bcn-[\w-]+\b/g, '')

    output = mapColors(mapCssVars(stripDarkVariants(output))).replace(
        /var\(--radius\)/g,
        'var(--radius-field)',
    )

    const result = await format(filePath, output, formatConfig)
    if (result.errors.length > 0) {
        throw new Error(
            `oxfmt failed on ${filePath}:\n` +
                result.errors.map((e) => e.codeframe ?? e.message).join('\n'),
        )
    }
    return result.code
}

const written: string[] = []
const skipped: string[] = []
const npmDependencies = new Set<string>()

for (const name of selected) {
    const item = upstream.get(name)!
    item.dependencies?.forEach((dep) => npmDependencies.add(dep.replace(/@[^@/]*$/, '')))

    for (const file of item.files ?? []) {
        const from = path.join(baseDir, file.path)
        const to = path.join(TARGET, file.path)
        const relative = path.relative(REPO_ROOT, to)

        if (!values.force && !values.dry && (await Bun.file(to).exists())) {
            skipped.push(relative)
            continue
        }

        const output = await transformFile(await Bun.file(from).text(), to)
        if (values.dry) {
            console.log(`\n// ${relative}\n${output}`)
            continue
        }
        await Bun.write(to, output)
        written.push(relative)
    }
}

if (written.length) console.log(`Imported:\n  ${written.join('\n  ')}`)
if (skipped.length) console.log(`Skipped (exists, use --force):\n  ${skipped.join('\n  ')}`)

const pkg = await Bun.file(path.join(ROOT, 'package.json')).json()
const installed = { ...pkg.dependencies, ...pkg.devDependencies }
const missing = [...npmDependencies].filter((dep) => !installed[dep])
if (missing.length)
    console.log(`\nMissing dependencies:\n  bun add --cwd packages/registry ${missing.join(' ')}`)

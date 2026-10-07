import { Glob } from 'bun'
/**
 * Generate `registry.json` from the files in `src/`.
 *
 * Every file is one registry item. Dependencies are inferred from imports:
 *   - `@/registry/ma/<dir>/<name>` → registryDependencies `@ma-ui/<name>`
 *   - bare imports (except react)  → npm dependencies
 *
 * `shadcn build` then turns registry.json into installable JSON in public/r.
 * Add per-item metadata (description, extra deps, css, ...) in ITEM_OVERRIDES.
 */
import path from 'node:path'
import type { Registry, RegistryItem } from 'shadcn/schema'

const ROOT = path.resolve(import.meta.dir, '..')
const SOURCE = 'src'

/** Consumers map this namespace to the hosted registry in components.json. */
export const NAMESPACE = '@ma-ui'

const PEER_DEPENDENCIES = new Set(['react', 'react-dom'])

// `registry:file` / `registry:page` need an explicit target, so they are not inferred.
type InferredType = Exclude<RegistryItem['type'], 'registry:file' | 'registry:page'>

const TYPE_BY_DIR: Record<string, InferredType> = {
    ui: 'registry:ui',
    hooks: 'registry:hook',
    lib: 'registry:lib',
    components: 'registry:component',
    blocks: 'registry:block',
}

const ITEM_OVERRIDES: Record<string, Partial<RegistryItem>> = {
    utils: {
        description: 'cn() helper with tailwind-merge configured for ma-ui tokens.',
    },
}

/** Base item: installs the Tailwind plugin and wires it into the app CSS. */
const styleItem: RegistryItem = {
    name: 'style',
    type: 'registry:style',
    title: 'ma-ui',
    description: 'Theme system (@ma-ui/tailwind), animations and the cn() helper. Install first.',
    extends: 'none',
    dependencies: ['@ma-ui/tailwind', 'tw-animate-css', 'lucide-react'],
    registryDependencies: [`${NAMESPACE}/utils`],
    css: {
        '@import "tw-animate-css"': {},
        // Plugin defaults: `light --default, dark --prefersdark`. Pass options
        // (themes, custom themes) by editing the CSS after install.
        '@plugin "@ma-ui/tailwind"': {},
    },
    files: [],
}

function packageName(specifier: string) {
    const parts = specifier.split('/')
    return specifier.startsWith('@') ? parts.slice(0, 2).join('/') : parts[0]!
}

function titleCase(name: string) {
    return name
        .split('-')
        .map((word) => word[0]!.toUpperCase() + word.slice(1))
        .join(' ')
}

async function buildItem(file: string): Promise<RegistryItem> {
    const [dir] = file.split('/')
    const name = path.basename(file).replace(/\.(tsx?|jsx?)$/, '')
    const type = TYPE_BY_DIR[dir!]
    if (!type) throw new Error(`Unknown registry directory for ${file}`)

    const source = await Bun.file(path.join(ROOT, SOURCE, file)).text()
    const imports = new Bun.Transpiler({ loader: 'tsx' })
        .scanImports(source)
        .map((entry) => entry.path)

    const dependencies = new Set<string>()
    const registryDependencies = new Set<string>()
    for (const specifier of imports) {
        const local = specifier.match(/^@\/registry\/ma\/[^/]+\/([^/]+)$/)
        if (local) {
            registryDependencies.add(`${NAMESPACE}/${local[1]}`)
        } else if (!specifier.startsWith('.') && !specifier.startsWith('@/')) {
            const pkg = packageName(specifier)
            if (!PEER_DEPENDENCIES.has(pkg)) dependencies.add(pkg)
        }
    }

    const override = ITEM_OVERRIDES[name] ?? {}
    const deps = [...dependencies, ...(override.dependencies ?? [])].sort()
    const registryDeps = [...registryDependencies, ...(override.registryDependencies ?? [])].sort()

    return {
        name,
        type,
        title: titleCase(name),
        ...override,
        ...(deps.length && { dependencies: deps }),
        ...(registryDeps.length && { registryDependencies: registryDeps }),
        files: [{ path: `${SOURCE}/${file}`, type }],
    } as RegistryItem
}

const files = (
    await Array.fromAsync(new Glob('*/*.{ts,tsx}').scan({ cwd: path.join(ROOT, SOURCE) }))
)
    .filter((file) => !/\.(test|stories)\.tsx?$/.test(file))
    .sort()

const items = await Promise.all(files.map(buildItem))

const registry: Registry = {
    $schema: 'https://ui.shadcn.com/schema/registry.json',
    name: 'ma-ui',
    homepage: Bun.env.MA_UI_HOMEPAGE ?? 'https://github.com/your-org/ma-ui',
    items: [styleItem, ...items],
}

await Bun.write(path.join(ROOT, 'registry.json'), `${JSON.stringify(registry, null, 2)}\n`)
console.log(`registry.json: ${registry.items.length} items`)

import plugin from 'tailwindcss/plugin'

import { animation, borderRadius, colors, keyframes, spacing, variants } from './config'
import { prefersDarkSelector, themeSelector } from './selectors'
import builtinThemes from './themes'

export type PluginOptions = {
    /**
     * Built-in themes to emit, daisyUI style:
     * `"light --default, dark --prefersdark"`, an array of the same entries,
     * `"all"`, or `false` to emit no themes (define them with `@ma-ui/tailwind/theme`).
     */
    themes?: string | string[] | boolean
    /** Element the default theme is attached to. */
    root?: string
} & {
    /** Token overrides applied to every built-in theme, e.g. `--radius-field: 0.25rem`. */
    [token: `--${string}`]: string
}

type ThemeEntry = { name: string; isDefault: boolean; prefersDark: boolean }

export function parseThemes(themes: PluginOptions['themes']): ThemeEntry[] {
    if (themes === false || themes === 'false') return []

    const entries =
        themes === undefined || themes === true
            ? ['light --default', 'dark --prefersdark']
            : themes === 'all'
              ? Object.keys(builtinThemes).map((name, index) =>
                    index === 0 ? `${name} --default` : name,
                )
              : Array.isArray(themes)
                ? themes
                : themes.split(',')

    return entries
        .map((entry) => entry.trim().split(/\s+/))
        .filter(([name]) => Boolean(name))
        .map(([name, ...flags]) => ({
            name: name!,
            isDefault: flags.includes('--default'),
            prefersDark: flags.includes('--prefersdark'),
        }))
}

const maUi: ReturnType<typeof plugin.withOptions<PluginOptions>> =
    plugin.withOptions<PluginOptions>(
        (options = {}) =>
            ({ addBase, addUtilities, addVariant }) => {
                const { themes, root = ':root', ...overrides } = options

                // Themes. Order matters: default first, then prefers-dark, then the
                // explicit `[data-theme]` selectors so an explicit choice always wins.
                const entries = parseThemes(themes)
                const known = entries.filter(({ name }) => {
                    if (name in builtinThemes) return true
                    console.warn(`[@ma-ui/tailwind] Unknown theme "${name}", skipped.`)
                    return false
                })
                const tokens = (name: string) => ({
                    ...builtinThemes[name as keyof typeof builtinThemes],
                    ...overrides,
                })

                for (const { name } of known.filter((entry) => entry.isDefault)) {
                    addBase({
                        [themeSelector(name, { root, isDefault: true })]: tokens(name),
                    })
                }
                for (const { name } of known.filter((entry) => entry.prefersDark)) {
                    addBase({
                        '@media (prefers-color-scheme: dark)': {
                            [prefersDarkSelector(root)]: tokens(name),
                        },
                    })
                }
                for (const { name } of known.filter((entry) => !entry.isDefault)) {
                    addBase({ [themeSelector(name, { root })]: tokens(name) })
                }

                addBase({
                    // Page / themed-section surface, like daisyUI.
                    [`:where(${root}),[data-theme]`]: {
                        'background-color': 'var(--color-base-100)',
                        color: 'var(--color-base-content)',
                    },
                    // Default border/outline colors (shadcn: `border-border outline-ring/50`).
                    '*, ::after, ::before, ::backdrop, ::file-selector-button': {
                        'border-color':
                            'color-mix(in oklab, var(--color-base-content) 10%, transparent)',
                        'outline-color':
                            'color-mix(in oklab, var(--color-base-content) 20%, transparent)',
                    },
                })

                for (const [name, selectors] of Object.entries(variants)) {
                    addVariant(name, selectors)
                }

                addUtilities({
                    '.no-scrollbar': {
                        '-ms-overflow-style': 'none',
                        'scrollbar-width': 'none',
                        '&::-webkit-scrollbar': { display: 'none' },
                    },
                })
            },
        () => ({
            theme: {
                extend: { colors, borderRadius, spacing, keyframes, animation },
            },
        }),
    )

export default maUi

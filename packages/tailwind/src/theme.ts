import plugin from 'tailwindcss/plugin'

import { prefersDarkSelector, themeSelector } from './selectors'
import builtinThemes from './themes'

export type ThemePluginOptions = {
    /** Theme name, used as `data-theme="<name>"`. Reusing a built-in name extends it. */
    name?: string
    /** Apply on `:root` without any `data-theme`. */
    default?: boolean
    /** Apply when the OS prefers dark and no `data-theme` is set. */
    prefersdark?: boolean
    'color-scheme'?: 'light' | 'dark'
    root?: string
} & {
    /** Any token, e.g. `--color-primary: oklch(...)` or `--radius-box: 1rem`. */
    [token: `--${string}`]: string
}

/**
 * Define or override a theme from CSS, same syntax as `daisyui/theme`:
 *
 *   @plugin "@ma-ui/tailwind/theme" {
 *     name: "brand";
 *     default: true;
 *     color-scheme: light;
 *     --color-primary: oklch(55% 0.2 260);
 *   }
 */
const maUiTheme: ReturnType<typeof plugin.withOptions<ThemePluginOptions>> =
    plugin.withOptions<ThemePluginOptions>((options = {}) => ({ addBase }) => {
        const {
            name = 'custom-theme',
            default: isDefault = false,
            prefersdark = false,
            'color-scheme': colorScheme,
            root = ':root',
            ...customTokens
        } = options

        const base = builtinThemes[name as keyof typeof builtinThemes]
        const tokens = {
            ...base,
            ...customTokens,
            'color-scheme': colorScheme ?? base?.['color-scheme'] ?? 'normal',
        }

        if (prefersdark) {
            addBase({
                '@media (prefers-color-scheme: dark)': {
                    [prefersDarkSelector(root)]: tokens,
                },
            })
        }

        addBase({ [themeSelector(name, { root, isDefault })]: tokens })
    })

export default maUiTheme

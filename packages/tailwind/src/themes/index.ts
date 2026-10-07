/**
 * Built-in themes.
 *
 * Token names are identical to daisyUI 5, so any daisyUI theme (including
 * ones made with the daisyUI theme generator) can be dropped in as-is.
 *
 * The default `light` / `dark` themes use shadcn/ui's neutral palette with a
 * flat, square shape: no corner radius anywhere.
 */
export type ThemeTokens = {
    'color-scheme': 'light' | 'dark'
    '--color-base-100': string
    '--color-base-200': string
    '--color-base-300': string
    '--color-base-content': string
    '--color-primary': string
    '--color-primary-content': string
    '--color-secondary': string
    '--color-secondary-content': string
    '--color-accent': string
    '--color-accent-content': string
    '--color-neutral': string
    '--color-neutral-content': string
    '--color-info': string
    '--color-info-content': string
    '--color-success': string
    '--color-success-content': string
    '--color-warning': string
    '--color-warning-content': string
    '--color-error': string
    '--color-error-content': string
    '--radius-selector': string
    '--radius-field': string
    '--radius-box': string
    '--size-selector': string
    '--size-field': string
    '--border': string
    '--depth': string
    '--noise': string
}

const shape = {
    '--radius-selector': '0',
    '--radius-field': '0',
    '--radius-box': '0',
    '--size-selector': '0.25rem',
    '--size-field': '0.25rem',
    '--border': '1px',
    '--depth': '0',
    '--noise': '0',
} as const

export const light: ThemeTokens = {
    'color-scheme': 'light',
    '--color-base-100': 'oklch(100% 0 0)',
    '--color-base-200': 'oklch(97% 0 0)',
    '--color-base-300': 'oklch(92.2% 0 0)',
    '--color-base-content': 'oklch(14.5% 0 0)',
    '--color-primary': 'oklch(20.5% 0 0)',
    '--color-primary-content': 'oklch(98.5% 0 0)',
    '--color-secondary': 'oklch(54.1% 0.281 293.009)',
    '--color-secondary-content': 'oklch(96.9% 0.016 293.756)',
    '--color-accent': 'oklch(70.4% 0.14 182.503)',
    '--color-accent-content': 'oklch(27.7% 0.046 192.524)',
    '--color-neutral': 'oklch(26.9% 0 0)',
    '--color-neutral-content': 'oklch(98.5% 0 0)',
    '--color-info': 'oklch(68.5% 0.169 237.323)',
    '--color-info-content': 'oklch(29.3% 0.066 243.157)',
    '--color-success': 'oklch(69.6% 0.17 162.48)',
    '--color-success-content': 'oklch(26.2% 0.051 172.552)',
    '--color-warning': 'oklch(82.8% 0.189 84.429)',
    '--color-warning-content': 'oklch(27.9% 0.077 45.635)',
    '--color-error': 'oklch(57.7% 0.245 27.325)',
    '--color-error-content': 'oklch(97.1% 0.013 17.38)',
    ...shape,
}

export const dark: ThemeTokens = {
    'color-scheme': 'dark',
    '--color-base-100': 'oklch(14.5% 0 0)',
    '--color-base-200': 'oklch(20.5% 0 0)',
    '--color-base-300': 'oklch(26.9% 0 0)',
    '--color-base-content': 'oklch(98.5% 0 0)',
    '--color-primary': 'oklch(92.2% 0 0)',
    '--color-primary-content': 'oklch(20.5% 0 0)',
    '--color-secondary': 'oklch(60.6% 0.25 292.717)',
    '--color-secondary-content': 'oklch(96.9% 0.016 293.756)',
    '--color-accent': 'oklch(77.7% 0.152 181.912)',
    '--color-accent-content': 'oklch(27.7% 0.046 192.524)',
    '--color-neutral': 'oklch(37.1% 0 0)',
    '--color-neutral-content': 'oklch(98.5% 0 0)',
    '--color-info': 'oklch(74.6% 0.16 232.661)',
    '--color-info-content': 'oklch(29.3% 0.066 243.157)',
    '--color-success': 'oklch(76.5% 0.177 163.223)',
    '--color-success-content': 'oklch(26.2% 0.051 172.552)',
    '--color-warning': 'oklch(82.8% 0.189 84.429)',
    '--color-warning-content': 'oklch(27.9% 0.077 45.635)',
    '--color-error': 'oklch(70.4% 0.191 22.216)',
    '--color-error-content': 'oklch(25.8% 0.092 26.042)',
    ...shape,
}

const themes = { light, dark } satisfies Record<string, ThemeTokens>

export type ThemeName = keyof typeof themes

export default themes

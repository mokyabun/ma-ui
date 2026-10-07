import type { StorybookConfig } from '@storybook/react-vite'
import tailwindcss from '@tailwindcss/vite'
import { existsSync } from 'node:fs'
import path from 'node:path'
import type { InlineConfig } from 'vite'

const registry = path.resolve(import.meta.dirname, '../../../packages/registry')
const registryOutput = path.join(registry, 'public/r')

const config: StorybookConfig = {
    framework: '@storybook/react-vite',
    stories: ['../stories/**/*.mdx', '../stories/**/*.stories.@(ts|tsx)'],
    addons: ['@storybook/addon-docs', '@storybook/addon-a11y', '@storybook/addon-themes'],
    // The built registry is served next to Storybook (`/r/<item>.json`), so a
    // single static deploy hosts both the docs and the shadcn registry.
    staticDirs: existsSync(registryOutput) ? [{ from: registryOutput, to: '/r' }] : [],
    async viteFinal(config) {
        const { mergeConfig } = await import('vite')
        const overrides: InlineConfig = {
            plugins: [tailwindcss()],
            // Registry files import each other as `@/registry/ma/...` (shadcn convention).
            resolve: {
                alias: { '@/registry/ma': path.join(registry, 'src') },
            },
            build: {
                rolldownOptions: {
                    // Base UI ships "use client" directives; harmless in Storybook.
                    onwarn(warning, warn) {
                        if (warning.code === 'MODULE_LEVEL_DIRECTIVE') return
                        warn(warning)
                    },
                },
            },
        }
        return mergeConfig(config, overrides)
    },
}

export default config

import type { Meta, StoryObj } from '@storybook/react-vite'

import { Badge } from '@ma-ui/registry/ui/badge'

const variants = ['solid', 'soft', 'outline', 'dash', 'ghost', 'link'] as const
const colors = [
    undefined,
    'neutral',
    'primary',
    'secondary',
    'accent',
    'info',
    'success',
    'warning',
    'error',
] as const

const meta = {
    title: 'UI/Badge',
    component: Badge,
    args: { children: 'Badge' },
    argTypes: {
        variant: { control: 'select', options: variants },
        color: { control: 'select', options: colors },
    },
} satisfies Meta<typeof Badge>

export default meta
type Story = StoryObj<typeof meta>

export const Playground: Story = {}

export const VariantsAndColors: Story = {
    parameters: { layout: 'padded' },
    render: (args) => (
        <div className="grid gap-3">
            {variants.map((variant) => (
                <div key={variant} className="flex flex-wrap items-center gap-2">
                    <code className="w-16 text-xs text-base-content/60">{variant}</code>
                    {colors.map((color) => (
                        <Badge key={color ?? 'none'} {...args} variant={variant} color={color}>
                            {color ?? 'default'}
                        </Badge>
                    ))}
                </div>
            ))}
        </div>
    ),
}

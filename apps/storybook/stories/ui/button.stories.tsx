import type { Meta, StoryObj } from '@storybook/react-vite'
import { ArrowRightIcon, PlusIcon } from 'lucide-react'

import { Button } from '@ma-ui/registry/ui/button'

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
    title: 'UI/Button',
    component: Button,
    args: { children: 'Button' },
    argTypes: {
        variant: { control: 'select', options: variants },
        color: { control: 'select', options: colors },
        size: {
            control: 'select',
            options: ['xs', 'sm', 'default', 'lg', 'icon', 'icon-xs', 'icon-sm', 'icon-lg'],
        },
        disabled: { control: 'boolean' },
    },
} satisfies Meta<typeof Button>

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
                        <Button key={color ?? 'none'} {...args} variant={variant} color={color}>
                            {color ?? 'default'}
                        </Button>
                    ))}
                </div>
            ))}
        </div>
    ),
}

export const Sizes: Story = {
    render: (args) => (
        <div className="flex items-center gap-2">
            <Button {...args} size="xs">
                Extra small
            </Button>
            <Button {...args} size="sm">
                Small
            </Button>
            <Button {...args}>Default</Button>
            <Button {...args} size="lg">
                Large
            </Button>
            <Button {...args} size="icon" aria-label="Add">
                <PlusIcon />
            </Button>
        </div>
    ),
}

export const WithIcon: Story = {
    args: {
        children: (
            <>
                Continue <ArrowRightIcon data-icon="inline-end" />
            </>
        ),
    },
}

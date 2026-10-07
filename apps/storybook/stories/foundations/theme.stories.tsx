import type { Meta, StoryObj } from '@storybook/react-vite'

const meta = {
    title: 'Foundations/Theme',
    parameters: { layout: 'padded' },
    tags: ['!autodocs'],
} satisfies Meta

export default meta
type Story = StoryObj<typeof meta>

const brandColors = [
    'primary',
    'secondary',
    'accent',
    'neutral',
    'info',
    'success',
    'warning',
    'error',
] as const

function Swatch({ name, content }: { name: string; content: string }) {
    return (
        <div
            className="flex h-20 flex-col justify-between rounded-box p-3 text-xs"
            style={{
                background: `var(--color-${name})`,
                color: `var(--color-${content})`,
            }}
        >
            <span className="font-medium">{name}</span>
            <span className="opacity-80">{content}</span>
        </div>
    )
}

export const Colors: Story = {
    render: () => (
        <div className="grid w-full max-w-3xl gap-6">
            <section className="grid gap-2">
                <h2 className="text-sm font-medium">Base</h2>
                <div className="grid grid-cols-3 gap-2 rounded-box border p-2">
                    {(['base-100', 'base-200', 'base-300'] as const).map((name) => (
                        <Swatch key={name} name={name} content="base-content" />
                    ))}
                </div>
            </section>
            <section className="grid gap-2">
                <h2 className="text-sm font-medium">Semantic</h2>
                <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
                    {brandColors.map((name) => (
                        <Swatch key={name} name={name} content={`${name}-content`} />
                    ))}
                </div>
            </section>
        </div>
    ),
}

const radii = [
    {
        name: 'selector',
        className: 'rounded-selector',
        usedBy: 'checkbox, badge',
    },
    {
        name: 'field',
        className: 'rounded-field',
        usedBy: 'button, input, menu item',
    },
    { name: 'box', className: 'rounded-box', usedBy: 'card, dialog, popover' },
]

export const Radius: Story = {
    render: () => (
        <div className="flex gap-6">
            {radii.map(({ name, className, usedBy }) => (
                <div key={name} className="grid justify-items-center gap-2 text-xs">
                    <div className={`size-20 border-2 border-primary bg-base-200 ${className}`} />
                    <code>{className}</code>
                    <span className="text-base-content/60">{usedBy}</span>
                </div>
            ))}
        </div>
    ),
}

// Full class names so Tailwind can find them.
const sizes = ['h-field-xs', 'h-field-sm', 'h-field', 'h-field-lg', 'h-field-xl']

export const Sizes: Story = {
    render: () => (
        <div className="flex items-end gap-3 text-xs">
            {sizes.map((className) => (
                <div key={className} className="grid justify-items-center gap-2">
                    <div className={`w-16 rounded-field bg-primary ${className}`} />
                    <code>{className}</code>
                </div>
            ))}
        </div>
    ),
}

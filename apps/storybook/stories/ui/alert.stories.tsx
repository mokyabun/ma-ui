import type { Meta, StoryObj } from '@storybook/react-vite'
import { CircleAlertIcon, InfoIcon } from 'lucide-react'

import { Alert, AlertDescription, AlertTitle } from '@ma-ui/registry/ui/alert'

const meta = {
    title: 'UI/Alert',
    component: Alert,
    parameters: { layout: 'padded' },
    argTypes: {
        variant: {
            control: 'select',
            options: ['soft', 'solid', 'outline', 'dash'],
        },
        color: {
            control: 'select',
            options: [undefined, 'neutral', 'primary', 'info', 'success', 'warning', 'error'],
        },
    },
    render: (args) => (
        <Alert {...args} className="max-w-md">
            <InfoIcon />
            <AlertTitle>Heads up!</AlertTitle>
            <AlertDescription>
                You can add components to your app using the registry.
            </AlertDescription>
        </Alert>
    ),
} satisfies Meta<typeof Alert>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const Colors: Story = {
    render: (args) => (
        <div className="grid max-w-md gap-3">
            {(['info', 'success', 'warning', 'error'] as const).map((color) => (
                <Alert key={color} {...args} color={color}>
                    <CircleAlertIcon />
                    <AlertTitle className="capitalize">{color}</AlertTitle>
                    <AlertDescription>This alert uses the {color} color.</AlertDescription>
                </Alert>
            ))}
        </div>
    ),
}

export const Variants: Story = {
    render: (args) => (
        <div className="grid max-w-md gap-3">
            {(['soft', 'solid', 'outline', 'dash'] as const).map((variant) => (
                <Alert key={variant} {...args} variant={variant} color="info">
                    <InfoIcon />
                    <AlertTitle className="capitalize">{variant}</AlertTitle>
                    <AlertDescription>
                        variant=&quot;{variant}&quot; color=&quot;info&quot;
                    </AlertDescription>
                </Alert>
            ))}
        </div>
    ),
}

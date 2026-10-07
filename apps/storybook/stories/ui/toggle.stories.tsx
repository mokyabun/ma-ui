import type { Meta, StoryObj } from '@storybook/react-vite'
import {
    AlignCenterIcon,
    AlignLeftIcon,
    AlignRightIcon,
    ArchiveIcon,
    ArrowLeftIcon,
    BoldIcon,
    ChevronDownIcon,
    ItalicIcon,
    MinusIcon,
    PlusIcon,
    UnderlineIcon,
} from 'lucide-react'

import { Button } from '@ma-ui/registry/ui/button'
import { ButtonGroup, ButtonGroupSeparator, ButtonGroupText } from '@ma-ui/registry/ui/button-group'
import { Input } from '@ma-ui/registry/ui/input'
import { Toggle } from '@ma-ui/registry/ui/toggle'
import { ToggleGroup, ToggleGroupItem } from '@ma-ui/registry/ui/toggle-group'

const meta = {
    title: 'UI/Toggle & Button Group',
} satisfies Meta

export default meta
type Story = StoryObj<typeof meta>

export const ToggleStory: Story = {
    name: 'Toggle',
    render: () => (
        <div className="grid gap-4">
            {(['default', 'outline'] as const).map((variant) => (
                <div key={variant} className="flex items-center gap-2">
                    <code className="w-16 text-xs text-base-content/60">{variant}</code>
                    {(['sm', 'default', 'lg'] as const).map((size) => (
                        <Toggle key={size} variant={variant} size={size} aria-label="Bold">
                            <BoldIcon />
                        </Toggle>
                    ))}
                    <Toggle variant={variant} defaultPressed aria-label="Italic">
                        <ItalicIcon />
                        Italic
                    </Toggle>
                    <Toggle variant={variant} disabled aria-label="Underline">
                        <UnderlineIcon />
                    </Toggle>
                </div>
            ))}
        </div>
    ),
}

export const ToggleGroupStory: Story = {
    name: 'Toggle group',
    render: () => (
        <div className="grid gap-4">
            <ToggleGroup multiple defaultValue={['bold']}>
                <ToggleGroupItem value="bold" aria-label="Bold">
                    <BoldIcon />
                </ToggleGroupItem>
                <ToggleGroupItem value="italic" aria-label="Italic">
                    <ItalicIcon />
                </ToggleGroupItem>
                <ToggleGroupItem value="underline" aria-label="Underline">
                    <UnderlineIcon />
                </ToggleGroupItem>
            </ToggleGroup>
            <ToggleGroup variant="outline" spacing={0} defaultValue={['left']}>
                <ToggleGroupItem value="left" aria-label="Align left">
                    <AlignLeftIcon />
                </ToggleGroupItem>
                <ToggleGroupItem value="center" aria-label="Align center">
                    <AlignCenterIcon />
                </ToggleGroupItem>
                <ToggleGroupItem value="right" aria-label="Align right">
                    <AlignRightIcon />
                </ToggleGroupItem>
            </ToggleGroup>
            <ToggleGroup
                variant="outline"
                orientation="vertical"
                spacing={0}
                defaultValue={['top']}
            >
                <ToggleGroupItem value="top">Top</ToggleGroupItem>
                <ToggleGroupItem value="middle">Middle</ToggleGroupItem>
                <ToggleGroupItem value="bottom">Bottom</ToggleGroupItem>
            </ToggleGroup>
        </div>
    ),
}

export const ButtonGroupStory: Story = {
    name: 'Button group',
    render: () => (
        <div className="grid justify-items-start gap-4">
            <ButtonGroup>
                <Button variant="outline" size="icon" aria-label="Go back">
                    <ArrowLeftIcon />
                </Button>
                <Button variant="outline">Archive</Button>
                <Button variant="outline">Report</Button>
                <Button variant="outline">Snooze</Button>
            </ButtonGroup>
            <ButtonGroup>
                <Button>Save</Button>
                <ButtonGroupSeparator />
                <Button size="icon" aria-label="More options">
                    <ChevronDownIcon />
                </Button>
            </ButtonGroup>
            <ButtonGroup>
                <ButtonGroupText>https://</ButtonGroupText>
                <Input placeholder="example.com" className="w-48" />
                <Button variant="outline">Go</Button>
            </ButtonGroup>
            <ButtonGroup orientation="vertical">
                <Button variant="outline" size="icon" aria-label="Increase">
                    <PlusIcon />
                </Button>
                <Button variant="outline" size="icon" aria-label="Decrease">
                    <MinusIcon />
                </Button>
            </ButtonGroup>
            <ButtonGroup>
                <ButtonGroup>
                    <Button variant="soft" color="primary">
                        1
                    </Button>
                    <Button variant="soft" color="primary">
                        2
                    </Button>
                </ButtonGroup>
                <ButtonGroup>
                    <Button variant="outline">
                        <ArchiveIcon data-icon="inline-start" />
                        Archive
                    </Button>
                </ButtonGroup>
            </ButtonGroup>
        </div>
    ),
}

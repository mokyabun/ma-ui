import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { ArrowUpIcon, CopyIcon, InfoIcon, SearchIcon } from 'lucide-react'

import { Calendar } from '@ma-ui/registry/ui/calendar'
import {
    Combobox,
    ComboboxChip,
    ComboboxChips,
    ComboboxChipsInput,
    ComboboxContent,
    ComboboxEmpty,
    ComboboxInput,
    ComboboxItem,
    ComboboxList,
    ComboboxValue,
    useComboboxAnchor,
} from '@ma-ui/registry/ui/combobox'
import { Field, FieldDescription, FieldLabel } from '@ma-ui/registry/ui/field'
import {
    InputGroup,
    InputGroupAddon,
    InputGroupButton,
    InputGroupInput,
    InputGroupText,
    InputGroupTextarea,
} from '@ma-ui/registry/ui/input-group'
import {
    InputOTP,
    InputOTPGroup,
    InputOTPSeparator,
    InputOTPSlot,
} from '@ma-ui/registry/ui/input-otp'
import {
    NativeSelect,
    NativeSelectOptGroup,
    NativeSelectOption,
} from '@ma-ui/registry/ui/native-select'
import { Spinner } from '@ma-ui/registry/ui/spinner'

type DateRange = { from: Date | undefined; to?: Date | undefined }

const meta = {
    title: 'UI/Inputs',
} satisfies Meta

export default meta
type Story = StoryObj<typeof meta>

export const InputGroupStory: Story = {
    name: 'Input group',
    render: () => (
        <div className="grid w-80 gap-4">
            <InputGroup>
                <InputGroupInput placeholder="Search..." />
                <InputGroupAddon>
                    <SearchIcon />
                </InputGroupAddon>
                <InputGroupAddon align="inline-end">12 results</InputGroupAddon>
            </InputGroup>
            <InputGroup>
                <InputGroupAddon>
                    <InputGroupText>https://</InputGroupText>
                </InputGroupAddon>
                <InputGroupInput placeholder="example.com" className="pl-0.5" />
                <InputGroupAddon align="inline-end">
                    <InputGroupText>.com</InputGroupText>
                </InputGroupAddon>
            </InputGroup>
            <InputGroup>
                <InputGroupInput defaultValue="https://ma-ui.dev/r/button.json" readOnly />
                <InputGroupAddon align="inline-end">
                    <InputGroupButton size="icon-xs" aria-label="Copy">
                        <CopyIcon />
                    </InputGroupButton>
                </InputGroupAddon>
            </InputGroup>
            <InputGroup>
                <InputGroupInput placeholder="Searching..." disabled />
                <InputGroupAddon align="inline-end">
                    <Spinner />
                </InputGroupAddon>
            </InputGroup>
            <InputGroup>
                <InputGroupTextarea placeholder="Ask, search or chat..." />
                <InputGroupAddon align="block-end">
                    <InputGroupButton variant="outline" size="icon-xs" aria-label="Info">
                        <InfoIcon />
                    </InputGroupButton>
                    <InputGroupText className="ml-auto">52% used</InputGroupText>
                    <InputGroupButton
                        variant="solid"
                        color="primary"
                        size="icon-xs"
                        aria-label="Send"
                    >
                        <ArrowUpIcon />
                    </InputGroupButton>
                </InputGroupAddon>
            </InputGroup>
        </div>
    ),
}

export const InputOTPStory: Story = {
    name: 'Input OTP',
    render: () => (
        <Field className="w-auto">
            <FieldLabel htmlFor="otp">Verification code</FieldLabel>
            <InputOTP id="otp" maxLength={6}>
                <InputOTPGroup>
                    <InputOTPSlot index={0} />
                    <InputOTPSlot index={1} />
                    <InputOTPSlot index={2} />
                </InputOTPGroup>
                <InputOTPSeparator />
                <InputOTPGroup>
                    <InputOTPSlot index={3} />
                    <InputOTPSlot index={4} />
                    <InputOTPSlot index={5} />
                </InputOTPGroup>
            </InputOTP>
            <FieldDescription>Enter the 6-digit code sent to your email.</FieldDescription>
        </Field>
    ),
}

export const NativeSelectStory: Story = {
    name: 'Native select',
    render: () => (
        <div className="grid gap-4">
            <NativeSelect aria-label="Status">
                <NativeSelectOption value="">Select status</NativeSelectOption>
                <NativeSelectOption value="todo">Todo</NativeSelectOption>
                <NativeSelectOption value="in-progress">In Progress</NativeSelectOption>
                <NativeSelectOption value="done">Done</NativeSelectOption>
            </NativeSelect>
            <NativeSelect aria-label="Department" size="sm">
                <NativeSelectOptGroup label="Engineering">
                    <NativeSelectOption value="frontend">Frontend</NativeSelectOption>
                    <NativeSelectOption value="backend">Backend</NativeSelectOption>
                </NativeSelectOptGroup>
                <NativeSelectOptGroup label="Sales">
                    <NativeSelectOption value="sales-rep">Sales Rep</NativeSelectOption>
                    <NativeSelectOption value="account-manager">Account Manager</NativeSelectOption>
                </NativeSelectOptGroup>
            </NativeSelect>
            <NativeSelect aria-label="Disabled" disabled>
                <NativeSelectOption value="">Disabled</NativeSelectOption>
            </NativeSelect>
        </div>
    ),
}

const frameworks = ['Next.js', 'SvelteKit', 'Nuxt.js', 'Remix', 'Astro', 'Solid Start']

export const ComboboxStory: Story = {
    name: 'Combobox',
    render: () => (
        <Combobox items={frameworks}>
            <ComboboxInput placeholder="Select a framework" className="w-64" />
            <ComboboxContent>
                <ComboboxEmpty>No items found.</ComboboxEmpty>
                <ComboboxList>
                    {(item: string) => (
                        <ComboboxItem key={item} value={item}>
                            {item}
                        </ComboboxItem>
                    )}
                </ComboboxList>
            </ComboboxContent>
        </Combobox>
    ),
}

function ComboboxMultipleDemo() {
    const anchor = useComboboxAnchor()

    return (
        <Combobox multiple autoHighlight items={frameworks} defaultValue={[frameworks[0]]}>
            <ComboboxChips ref={anchor} className="w-80">
                <ComboboxValue>
                    {(values: string[]) => (
                        <>
                            {values.map((value) => (
                                <ComboboxChip key={value}>{value}</ComboboxChip>
                            ))}
                            <ComboboxChipsInput placeholder="Add framework" />
                        </>
                    )}
                </ComboboxValue>
            </ComboboxChips>
            <ComboboxContent anchor={anchor}>
                <ComboboxEmpty>No items found.</ComboboxEmpty>
                <ComboboxList>
                    {(item: string) => (
                        <ComboboxItem key={item} value={item}>
                            {item}
                        </ComboboxItem>
                    )}
                </ComboboxList>
            </ComboboxContent>
        </Combobox>
    )
}

export const ComboboxMultiple: Story = {
    render: () => <ComboboxMultipleDemo />,
}

function CalendarDemo() {
    const [date, setDate] = useState<Date | undefined>(() => new Date())

    return (
        <Calendar
            mode="single"
            selected={date}
            onSelect={setDate}
            className="rounded-box border border-base-content/20"
        />
    )
}

export const CalendarStory: Story = {
    name: 'Calendar',
    render: () => <CalendarDemo />,
}

function CalendarRangeDemo() {
    const [range, setRange] = useState<DateRange | undefined>(() => {
        const from = new Date()
        return { from, to: new Date(from.getFullYear(), from.getMonth(), from.getDate() + 6) }
    })

    return (
        <Calendar
            mode="range"
            numberOfMonths={2}
            captionLayout="dropdown"
            selected={range}
            onSelect={setRange}
            className="rounded-box border border-base-content/20"
        />
    )
}

export const CalendarRange: Story = {
    render: () => <CalendarRangeDemo />,
}

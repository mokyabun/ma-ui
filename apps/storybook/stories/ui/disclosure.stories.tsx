import type { Meta, StoryObj } from '@storybook/react-vite'
import { ChevronsUpDownIcon } from 'lucide-react'

import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from '@ma-ui/registry/ui/accordion'
import { Button } from '@ma-ui/registry/ui/button'
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@ma-ui/registry/ui/collapsible'

const meta = {
    title: 'UI/Disclosure',
} satisfies Meta

export default meta
type Story = StoryObj<typeof meta>

const faq = [
    {
        value: 'shipping',
        question: 'What are your shipping options?',
        answer: 'We offer standard (5-7 days), express (2-3 days), and overnight shipping.',
    },
    {
        value: 'returns',
        question: 'What is your return policy?',
        answer: 'Returns are accepted within 30 days of purchase with the original receipt.',
    },
    {
        value: 'support',
        question: 'How can I contact customer support?',
        answer: 'Reach us via email, live chat, or phone. We respond within 24 hours.',
    },
]

export const AccordionStory: Story = {
    name: 'Accordion',
    render: () => (
        <Accordion defaultValue={['shipping']} className="w-96">
            {faq.map((item) => (
                <AccordionItem key={item.value} value={item.value}>
                    <AccordionTrigger>{item.question}</AccordionTrigger>
                    <AccordionContent>{item.answer}</AccordionContent>
                </AccordionItem>
            ))}
        </Accordion>
    ),
}

export const AccordionMultiple: Story = {
    render: () => (
        <Accordion multiple defaultValue={['shipping', 'returns']} className="w-96">
            {faq.map((item) => (
                <AccordionItem key={item.value} value={item.value}>
                    <AccordionTrigger>{item.question}</AccordionTrigger>
                    <AccordionContent>{item.answer}</AccordionContent>
                </AccordionItem>
            ))}
            <AccordionItem value="disabled" disabled>
                <AccordionTrigger>Disabled item</AccordionTrigger>
                <AccordionContent>You can&apos;t see this.</AccordionContent>
            </AccordionItem>
        </Accordion>
    ),
}

export const CollapsibleStory: Story = {
    name: 'Collapsible',
    render: () => (
        <Collapsible className="flex w-80 flex-col gap-2">
            <div className="flex items-center justify-between gap-4 px-4">
                <h4 className="text-sm font-semibold">@peduarte starred 3 repositories</h4>
                <CollapsibleTrigger
                    render={<Button variant="ghost" size="icon-sm" aria-label="Toggle" />}
                >
                    <ChevronsUpDownIcon />
                </CollapsibleTrigger>
            </div>
            <div className="rounded-field border border-base-content/20 px-4 py-2 font-mono text-sm">
                @radix-ui/primitives
            </div>
            <CollapsibleContent className="flex flex-col gap-2">
                {['@radix-ui/colors', '@stitches/react'].map((repo) => (
                    <div
                        key={repo}
                        className="rounded-field border border-base-content/20 px-4 py-2 font-mono text-sm"
                    >
                        {repo}
                    </div>
                ))}
            </CollapsibleContent>
        </Collapsible>
    ),
}

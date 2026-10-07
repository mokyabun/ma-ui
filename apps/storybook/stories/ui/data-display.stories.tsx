import type { Meta, StoryObj } from '@storybook/react-vite'
import {
    BadgeCheckIcon,
    ChevronRightIcon,
    FolderCodeIcon,
    PlusIcon,
    ShieldAlertIcon,
} from 'lucide-react'

import {
    Avatar,
    AvatarBadge,
    AvatarFallback,
    AvatarGroup,
    AvatarGroupCount,
    AvatarImage,
} from '@ma-ui/registry/ui/avatar'
import { Badge } from '@ma-ui/registry/ui/badge'
import { Button } from '@ma-ui/registry/ui/button'
import {
    Empty,
    EmptyContent,
    EmptyDescription,
    EmptyHeader,
    EmptyMedia,
    EmptyTitle,
} from '@ma-ui/registry/ui/empty'
import {
    Item,
    ItemActions,
    ItemContent,
    ItemDescription,
    ItemGroup,
    ItemMedia,
    ItemSeparator,
    ItemTitle,
} from '@ma-ui/registry/ui/item'
import { Kbd, KbdGroup } from '@ma-ui/registry/ui/kbd'
import { Progress, ProgressLabel, ProgressValue } from '@ma-ui/registry/ui/progress'
import { Separator } from '@ma-ui/registry/ui/separator'
import { Skeleton } from '@ma-ui/registry/ui/skeleton'
import { Spinner } from '@ma-ui/registry/ui/spinner'
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
} from '@ma-ui/registry/ui/table'

const meta = {
    title: 'UI/Data Display',
} satisfies Meta

export default meta
type Story = StoryObj<typeof meta>

const people = [
    { name: 'shadcn', src: 'https://github.com/shadcn.png', fallback: 'CN' },
    { name: 'Max Leiter', src: 'https://github.com/maxleiter.png', fallback: 'ML' },
    { name: 'Evil Rabbit', src: 'https://github.com/evilrabbit.png', fallback: 'ER' },
]

export const AvatarStory: Story = {
    name: 'Avatar',
    render: () => (
        <div className="grid gap-6">
            <div className="flex items-center gap-4">
                {(['sm', 'default', 'lg'] as const).map((size) => (
                    <Avatar key={size} size={size}>
                        <AvatarImage src={people[0]?.src} alt="@shadcn" />
                        <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                ))}
                <Avatar>
                    <AvatarFallback>MA</AvatarFallback>
                </Avatar>
                <Avatar>
                    <AvatarImage src={people[1]?.src} alt="@maxleiter" />
                    <AvatarFallback>ML</AvatarFallback>
                    <AvatarBadge className="bg-success" />
                </Avatar>
            </div>
            <AvatarGroup>
                {people.map((person) => (
                    <Avatar key={person.name}>
                        <AvatarImage src={person.src} alt={person.name} />
                        <AvatarFallback>{person.fallback}</AvatarFallback>
                    </Avatar>
                ))}
                <AvatarGroupCount>+3</AvatarGroupCount>
            </AvatarGroup>
        </div>
    ),
}

export const KbdStory: Story = {
    name: 'Kbd',
    render: () => (
        <div className="flex flex-col items-center gap-4">
            <KbdGroup>
                <Kbd>⌘</Kbd>
                <Kbd>⇧</Kbd>
                <Kbd>⌥</Kbd>
                <Kbd>⌃</Kbd>
            </KbdGroup>
            <p className="text-sm text-base-content/60">
                Press{' '}
                <KbdGroup>
                    <Kbd>Ctrl</Kbd>
                    <span>+</span>
                    <Kbd>K</Kbd>
                </KbdGroup>{' '}
                to open the command palette.
            </p>
        </div>
    ),
}

export const ProgressStory: Story = {
    name: 'Progress',
    render: () => (
        <div className="grid w-80 gap-6">
            <Progress value={33} />
            <Progress value={66}>
                <ProgressLabel>Uploading</ProgressLabel>
                <ProgressValue />
            </Progress>
            <Progress value={null}>
                <ProgressLabel>Indeterminate</ProgressLabel>
            </Progress>
        </div>
    ),
}

export const SeparatorStory: Story = {
    name: 'Separator',
    render: () => (
        <div className="w-72">
            <div className="space-y-1">
                <h4 className="text-sm font-medium">ma-ui</h4>
                <p className="text-sm text-base-content/60">A daisyUI-themed shadcn registry.</p>
            </div>
            <Separator className="my-4" />
            <div className="flex h-5 items-center gap-4 text-sm">
                <div>Blog</div>
                <Separator orientation="vertical" />
                <div>Docs</div>
                <Separator orientation="vertical" />
                <div>Source</div>
            </div>
        </div>
    ),
}

export const SkeletonStory: Story = {
    name: 'Skeleton',
    render: () => (
        <div className="grid gap-6">
            <div className="flex items-center gap-4">
                <Skeleton className="size-12 rounded-box" />
                <div className="space-y-2">
                    <Skeleton className="h-4 w-60" />
                    <Skeleton className="h-4 w-48" />
                </div>
            </div>
            <div className="space-y-3">
                <Skeleton className="h-32 w-64 rounded-box" />
                <Skeleton className="h-4 w-64" />
                <Skeleton className="h-4 w-40" />
            </div>
        </div>
    ),
}

export const SpinnerStory: Story = {
    name: 'Spinner',
    render: () => (
        <div className="flex flex-col items-center gap-4">
            <div className="flex items-center gap-4">
                <Spinner className="size-3" />
                <Spinner />
                <Spinner className="size-6" />
                <Spinner className="size-8 text-primary" />
            </div>
            <div className="flex gap-2">
                <Button disabled>
                    <Spinner data-icon="inline-start" />
                    Loading…
                </Button>
                <Badge variant="soft" color="info">
                    <Spinner />
                    Syncing
                </Badge>
            </div>
        </div>
    ),
}

const invoices = [
    { invoice: 'INV001', status: 'Paid', method: 'Credit Card', amount: '$250.00' },
    { invoice: 'INV002', status: 'Pending', method: 'PayPal', amount: '$150.00' },
    { invoice: 'INV003', status: 'Unpaid', method: 'Bank Transfer', amount: '$350.00' },
    { invoice: 'INV004', status: 'Paid', method: 'Credit Card', amount: '$450.00' },
    { invoice: 'INV005', status: 'Paid', method: 'PayPal', amount: '$550.00' },
]

const statusColor = { Paid: 'success', Pending: 'warning', Unpaid: 'error' } as const

export const TableStory: Story = {
    name: 'Table',
    render: () => (
        <Table className="w-[32rem]">
            <TableCaption>A list of your recent invoices.</TableCaption>
            <TableHeader>
                <TableRow>
                    <TableHead className="w-24">Invoice</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Method</TableHead>
                    <TableHead className="text-right">Amount</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {invoices.map((row) => (
                    <TableRow key={row.invoice}>
                        <TableCell className="font-medium">{row.invoice}</TableCell>
                        <TableCell>
                            <Badge
                                variant="soft"
                                color={statusColor[row.status as keyof typeof statusColor]}
                            >
                                {row.status}
                            </Badge>
                        </TableCell>
                        <TableCell>{row.method}</TableCell>
                        <TableCell className="text-right">{row.amount}</TableCell>
                    </TableRow>
                ))}
            </TableBody>
            <TableFooter>
                <TableRow>
                    <TableCell colSpan={3}>Total</TableCell>
                    <TableCell className="text-right">$1,750.00</TableCell>
                </TableRow>
            </TableFooter>
        </Table>
    ),
}

export const EmptyStory: Story = {
    name: 'Empty',
    render: () => (
        <Empty className="w-[28rem] border border-dashed border-base-content/20">
            <EmptyHeader>
                <EmptyMedia variant="icon">
                    <FolderCodeIcon />
                </EmptyMedia>
                <EmptyTitle>No projects yet</EmptyTitle>
                <EmptyDescription>
                    You haven&apos;t created any projects yet. Get started by creating your first
                    project.
                </EmptyDescription>
            </EmptyHeader>
            <EmptyContent>
                <div className="flex gap-2">
                    <Button>
                        <PlusIcon data-icon="inline-start" />
                        Create project
                    </Button>
                    <Button variant="outline">Import project</Button>
                </div>
            </EmptyContent>
        </Empty>
    ),
}

export const ItemStory: Story = {
    name: 'Item',
    render: () => (
        <div className="grid w-[28rem] gap-6">
            {(['default', 'outline', 'muted'] as const).map((variant) => (
                <Item key={variant} variant={variant}>
                    <ItemContent>
                        <ItemTitle className="capitalize">{variant} item</ItemTitle>
                        <ItemDescription>A simple item with title and description.</ItemDescription>
                    </ItemContent>
                    <ItemActions>
                        <Button variant="outline" size="sm">
                            Action
                        </Button>
                    </ItemActions>
                </Item>
            ))}
            <Item
                variant="outline"
                size="sm"
                render={<a href="#verified" aria-label="Verified profile" />}
            >
                <ItemMedia>
                    <BadgeCheckIcon className="size-5" />
                </ItemMedia>
                <ItemContent>
                    <ItemTitle>Your profile has been verified.</ItemTitle>
                </ItemContent>
                <ItemActions>
                    <ChevronRightIcon className="size-4" />
                </ItemActions>
            </Item>
            <ItemGroup>
                {people.map((person, index) => (
                    <div key={person.name}>
                        {index > 0 && <ItemSeparator />}
                        <Item>
                            <ItemMedia>
                                <Avatar>
                                    <AvatarImage src={person.src} alt={person.name} />
                                    <AvatarFallback>{person.fallback}</AvatarFallback>
                                </Avatar>
                            </ItemMedia>
                            <ItemContent>
                                <ItemTitle>{person.name}</ItemTitle>
                                <ItemDescription>Member</ItemDescription>
                            </ItemContent>
                            <ItemActions>
                                <Button variant="ghost" size="icon-sm" aria-label="Invite">
                                    <PlusIcon />
                                </Button>
                            </ItemActions>
                        </Item>
                    </div>
                ))}
            </ItemGroup>
            <Item variant="outline">
                <ItemMedia variant="icon">
                    <ShieldAlertIcon />
                </ItemMedia>
                <ItemContent>
                    <ItemTitle>Security alert</ItemTitle>
                    <ItemDescription>New login detected from an unknown device.</ItemDescription>
                </ItemContent>
                <ItemActions>
                    <Button size="sm" variant="soft" color="warning">
                        Review
                    </Button>
                </ItemActions>
            </Item>
        </div>
    ),
}

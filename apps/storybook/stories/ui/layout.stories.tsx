import type { Meta, StoryObj } from '@storybook/react-vite'

import { AspectRatio } from '@ma-ui/registry/ui/aspect-ratio'
import { Badge } from '@ma-ui/registry/ui/badge'
import { Button } from '@ma-ui/registry/ui/button'
import {
    Card,
    CardAction,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@ma-ui/registry/ui/card'
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from '@ma-ui/registry/ui/carousel'
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from '@ma-ui/registry/ui/resizable'
import { ScrollArea, ScrollBar } from '@ma-ui/registry/ui/scroll-area'
import { Separator } from '@ma-ui/registry/ui/separator'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@ma-ui/registry/ui/tabs'

const meta = {
    title: 'UI/Layout',
} satisfies Meta

export default meta
type Story = StoryObj<typeof meta>

export const CardStory: Story = {
    name: 'Card',
    render: () => (
        <Card className="w-80">
            <CardHeader>
                <CardTitle>Starter plan</CardTitle>
                <CardDescription>Everything you need to get going.</CardDescription>
                <CardAction>
                    <Badge variant="soft" color="success">
                        Active
                    </Badge>
                </CardAction>
            </CardHeader>
            <CardContent className="text-sm text-base-content/60">
                3 projects · 10 GB storage · Email support
            </CardContent>
            <CardFooter className="gap-2">
                <Button className="flex-1">Upgrade</Button>
                <Button variant="outline">Manage</Button>
            </CardFooter>
        </Card>
    ),
}

export const TabsStory: Story = {
    name: 'Tabs',
    render: () => (
        <Tabs defaultValue="overview" className="w-96">
            <TabsList>
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="analytics">Analytics</TabsTrigger>
                <TabsTrigger value="settings">Settings</TabsTrigger>
            </TabsList>
            {['overview', 'analytics', 'settings'].map((tab) => (
                <TabsContent key={tab} value={tab}>
                    <Card>
                        <CardHeader>
                            <CardTitle className="capitalize">{tab}</CardTitle>
                            <CardDescription>Content for the {tab} tab.</CardDescription>
                        </CardHeader>
                    </Card>
                </TabsContent>
            ))}
        </Tabs>
    ),
}

export const TabsVariants: Story = {
    render: () => (
        <div className="grid gap-8">
            <Tabs defaultValue="overview">
                <TabsList variant="line">
                    <TabsTrigger value="overview">Overview</TabsTrigger>
                    <TabsTrigger value="analytics">Analytics</TabsTrigger>
                    <TabsTrigger value="settings" disabled>
                        Settings
                    </TabsTrigger>
                </TabsList>
            </Tabs>
            <Tabs defaultValue="account" orientation="vertical" className="flex-row">
                <TabsList>
                    <TabsTrigger value="account">Account</TabsTrigger>
                    <TabsTrigger value="password">Password</TabsTrigger>
                    <TabsTrigger value="billing">Billing</TabsTrigger>
                </TabsList>
                {['account', 'password', 'billing'].map((tab) => (
                    <TabsContent
                        key={tab}
                        value={tab}
                        className="w-56 text-sm text-base-content/60 capitalize"
                    >
                        {tab} settings
                    </TabsContent>
                ))}
            </Tabs>
        </div>
    ),
}

const tags = Array.from({ length: 50 }, (_, index) => `v1.2.0-beta.${50 - index}`)

const artworks = [
    { artist: 'Ornella Binni', hue: 'bg-primary/20' },
    { artist: 'Tom Byrom', hue: 'bg-secondary/20' },
    { artist: 'Vladimir Malyavko', hue: 'bg-accent/20' },
    { artist: 'Jane Doe', hue: 'bg-info/20' },
    { artist: 'John Roe', hue: 'bg-success/20' },
]

export const ScrollAreaStory: Story = {
    name: 'Scroll area',
    render: () => (
        <div className="flex flex-col items-center gap-6">
            <ScrollArea className="h-72 w-48 rounded-box border border-base-content/20">
                <div className="p-4">
                    <h4 className="mb-4 text-sm font-medium">Tags</h4>
                    {tags.map((tag) => (
                        <div key={tag}>
                            <div className="text-sm">{tag}</div>
                            <Separator className="my-2" />
                        </div>
                    ))}
                </div>
            </ScrollArea>
            <ScrollArea className="w-96 rounded-box border border-base-content/20 whitespace-nowrap">
                <div className="flex w-max gap-4 p-4">
                    {artworks.map((artwork) => (
                        <figure key={artwork.artist} className="shrink-0">
                            <div className={`h-40 w-32 rounded-field ${artwork.hue}`} />
                            <figcaption className="pt-2 text-xs text-base-content/60">
                                Photo by{' '}
                                <span className="font-semibold text-base-content">
                                    {artwork.artist}
                                </span>
                            </figcaption>
                        </figure>
                    ))}
                </div>
                <ScrollBar orientation="horizontal" />
            </ScrollArea>
        </div>
    ),
}

export const ResizableStory: Story = {
    name: 'Resizable',
    render: () => (
        <ResizablePanelGroup
            orientation="horizontal"
            className="h-64 w-[32rem] rounded-box border border-base-content/20"
        >
            <ResizablePanel defaultSize="40%" minSize="20%">
                <div className="flex h-full items-center justify-center p-6 font-semibold">
                    Sidebar
                </div>
            </ResizablePanel>
            <ResizableHandle withHandle />
            <ResizablePanel defaultSize="60%">
                <ResizablePanelGroup orientation="vertical">
                    <ResizablePanel defaultSize="30%">
                        <div className="flex h-full items-center justify-center p-6 font-semibold">
                            Header
                        </div>
                    </ResizablePanel>
                    <ResizableHandle />
                    <ResizablePanel defaultSize="70%">
                        <div className="flex h-full items-center justify-center p-6 font-semibold">
                            Content
                        </div>
                    </ResizablePanel>
                </ResizablePanelGroup>
            </ResizablePanel>
        </ResizablePanelGroup>
    ),
}

export const AspectRatioStory: Story = {
    name: 'Aspect ratio',
    render: () => (
        <div className="grid w-96 grid-cols-2 gap-4">
            {[
                { ratio: 16 / 9, label: '16 / 9' },
                { ratio: 1, label: '1 / 1' },
                { ratio: 4 / 3, label: '4 / 3' },
                { ratio: 9 / 16, label: '9 / 16' },
            ].map(({ ratio, label }) => (
                <AspectRatio
                    key={label}
                    ratio={ratio}
                    className="flex items-center justify-center rounded-box bg-base-200 text-sm text-base-content/60"
                >
                    {label}
                </AspectRatio>
            ))}
        </div>
    ),
}

export const CarouselStory: Story = {
    name: 'Carousel',
    render: () => (
        <div className="grid gap-12 px-12">
            <Carousel className="w-full max-w-xs">
                <CarouselContent>
                    {Array.from({ length: 5 }, (_, index) => (
                        <CarouselItem key={index}>
                            <Card>
                                <CardContent className="flex aspect-square items-center justify-center p-6">
                                    <span className="text-4xl font-semibold">{index + 1}</span>
                                </CardContent>
                            </Card>
                        </CarouselItem>
                    ))}
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
            </Carousel>
            <Carousel opts={{ align: 'start' }} className="w-full max-w-sm">
                <CarouselContent>
                    {Array.from({ length: 8 }, (_, index) => (
                        <CarouselItem key={index} className="basis-1/3">
                            <Card>
                                <CardContent className="flex aspect-square items-center justify-center p-4">
                                    <span className="text-2xl font-semibold">{index + 1}</span>
                                </CardContent>
                            </Card>
                        </CarouselItem>
                    ))}
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
            </Carousel>
        </div>
    ),
}

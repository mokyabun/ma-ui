import type { Meta, StoryObj } from '@storybook/react-vite'
import {
    ChevronsUpDownIcon,
    FolderIcon,
    HomeIcon,
    InboxIcon,
    LifeBuoyIcon,
    MoreHorizontalIcon,
    PlusIcon,
    SearchIcon,
    SettingsIcon,
} from 'lucide-react'

import { Avatar, AvatarFallback } from '@ma-ui/registry/ui/avatar'
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from '@ma-ui/registry/ui/breadcrumb'
import { Separator } from '@ma-ui/registry/ui/separator'
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupAction,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarInput,
    SidebarInset,
    SidebarMenu,
    SidebarMenuAction,
    SidebarMenuBadge,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarMenuSkeleton,
    SidebarMenuSub,
    SidebarMenuSubButton,
    SidebarMenuSubItem,
    SidebarProvider,
    SidebarRail,
    SidebarTrigger,
} from '@ma-ui/registry/ui/sidebar'
import { Skeleton } from '@ma-ui/registry/ui/skeleton'
import { TooltipProvider } from '@ma-ui/registry/ui/tooltip'

const meta = {
    title: 'UI/Sidebar',
    component: Sidebar,
    parameters: { layout: 'fullscreen' },
    args: { side: 'left', variant: 'sidebar', collapsible: 'icon' },
    argTypes: {
        side: { control: 'inline-radio', options: ['left', 'right'] },
        variant: { control: 'inline-radio', options: ['sidebar', 'floating', 'inset'] },
        collapsible: { control: 'inline-radio', options: ['offcanvas', 'icon', 'none'] },
    },
} satisfies Meta<typeof Sidebar>

export default meta
type Story = StoryObj<typeof meta>

const nav = [
    { title: 'Home', icon: HomeIcon, active: true },
    { title: 'Inbox', icon: InboxIcon, badge: '24' },
    { title: 'Search', icon: SearchIcon },
    { title: 'Settings', icon: SettingsIcon },
]

const projects = ['Design Engineering', 'Sales & Marketing', 'Travel']

export const Default: Story = {
    render: (args) => (
        <TooltipProvider>
            <SidebarProvider>
                <Sidebar {...args}>
                    <SidebarHeader>
                        <SidebarMenu>
                            <SidebarMenuItem>
                                <SidebarMenuButton size="lg">
                                    <div className="flex aspect-square size-8 items-center justify-center rounded-field bg-primary text-primary-content">
                                        M
                                    </div>
                                    <div className="grid flex-1 text-left text-sm leading-tight">
                                        <span className="truncate font-semibold">ma-ui</span>
                                        <span className="truncate text-xs">Workspace</span>
                                    </div>
                                    <ChevronsUpDownIcon className="ml-auto" />
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                        </SidebarMenu>
                        <SidebarInput placeholder="Search..." />
                    </SidebarHeader>
                    <SidebarContent>
                        <SidebarGroup>
                            <SidebarGroupLabel>Application</SidebarGroupLabel>
                            <SidebarGroupContent>
                                <SidebarMenu>
                                    {nav.map((item) => (
                                        <SidebarMenuItem key={item.title}>
                                            <SidebarMenuButton
                                                isActive={item.active}
                                                tooltip={item.title}
                                            >
                                                <item.icon />
                                                <span>{item.title}</span>
                                            </SidebarMenuButton>
                                            {item.badge && (
                                                <SidebarMenuBadge>{item.badge}</SidebarMenuBadge>
                                            )}
                                        </SidebarMenuItem>
                                    ))}
                                </SidebarMenu>
                            </SidebarGroupContent>
                        </SidebarGroup>
                        <SidebarGroup>
                            <SidebarGroupLabel>Projects</SidebarGroupLabel>
                            <SidebarGroupAction title="Add project">
                                <PlusIcon />
                                <span className="sr-only">Add project</span>
                            </SidebarGroupAction>
                            <SidebarGroupContent>
                                <SidebarMenu>
                                    {projects.map((project) => (
                                        <SidebarMenuItem key={project}>
                                            <SidebarMenuButton tooltip={project}>
                                                <FolderIcon />
                                                <span>{project}</span>
                                            </SidebarMenuButton>
                                            <SidebarMenuAction showOnHover>
                                                <MoreHorizontalIcon />
                                                <span className="sr-only">More</span>
                                            </SidebarMenuAction>
                                        </SidebarMenuItem>
                                    ))}
                                    <SidebarMenuItem>
                                        <SidebarMenuButton tooltip="Docs">
                                            <LifeBuoyIcon />
                                            <span>Docs</span>
                                        </SidebarMenuButton>
                                        <SidebarMenuSub>
                                            {['Introduction', 'Installation', 'Theming'].map(
                                                (page, index) => (
                                                    <SidebarMenuSubItem key={page}>
                                                        <SidebarMenuSubButton
                                                            href={`#${page}`}
                                                            isActive={index === 2}
                                                        >
                                                            <span>{page}</span>
                                                        </SidebarMenuSubButton>
                                                    </SidebarMenuSubItem>
                                                ),
                                            )}
                                        </SidebarMenuSub>
                                    </SidebarMenuItem>
                                </SidebarMenu>
                            </SidebarGroupContent>
                        </SidebarGroup>
                        <SidebarGroup>
                            <SidebarGroupLabel>Loading</SidebarGroupLabel>
                            <SidebarGroupContent>
                                <SidebarMenu>
                                    {[0, 1, 2].map((index) => (
                                        <SidebarMenuItem key={index}>
                                            <SidebarMenuSkeleton showIcon />
                                        </SidebarMenuItem>
                                    ))}
                                </SidebarMenu>
                            </SidebarGroupContent>
                        </SidebarGroup>
                    </SidebarContent>
                    <SidebarFooter>
                        <SidebarMenu>
                            <SidebarMenuItem>
                                <SidebarMenuButton size="lg">
                                    <Avatar size="sm">
                                        <AvatarFallback>SC</AvatarFallback>
                                    </Avatar>
                                    <div className="grid flex-1 text-left text-sm leading-tight">
                                        <span className="truncate font-semibold">shadcn</span>
                                        <span className="truncate text-xs">m@example.com</span>
                                    </div>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                        </SidebarMenu>
                    </SidebarFooter>
                    <SidebarRail />
                </Sidebar>
                <SidebarInset>
                    <header className="flex h-16 shrink-0 items-center gap-2 px-4">
                        <SidebarTrigger className="-ml-1" />
                        <Separator orientation="vertical" className="mr-2 h-4" />
                        <Breadcrumb>
                            <BreadcrumbList>
                                <BreadcrumbItem>
                                    <BreadcrumbLink href="#docs">Docs</BreadcrumbLink>
                                </BreadcrumbItem>
                                <BreadcrumbSeparator />
                                <BreadcrumbItem>
                                    <BreadcrumbPage>Theming</BreadcrumbPage>
                                </BreadcrumbItem>
                            </BreadcrumbList>
                        </Breadcrumb>
                    </header>
                    <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
                        <div className="grid gap-4 md:grid-cols-3">
                            <Skeleton className="aspect-video rounded-box" />
                            <Skeleton className="aspect-video rounded-box" />
                            <Skeleton className="aspect-video rounded-box" />
                        </div>
                        <Skeleton className="min-h-96 flex-1 rounded-box" />
                    </div>
                </SidebarInset>
            </SidebarProvider>
        </TooltipProvider>
    ),
}

export const Floating: Story = { ...Default, args: { variant: 'floating' } }

export const Inset: Story = { ...Default, args: { variant: 'inset' } }

export const Right: Story = { ...Default, args: { side: 'right' } }

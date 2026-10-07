import type { Meta, StoryObj } from '@storybook/react-vite'

import {
    Breadcrumb,
    BreadcrumbEllipsis,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from '@ma-ui/registry/ui/breadcrumb'
import {
    Menubar,
    MenubarCheckboxItem,
    MenubarContent,
    MenubarGroup,
    MenubarItem,
    MenubarMenu,
    MenubarRadioGroup,
    MenubarRadioItem,
    MenubarSeparator,
    MenubarShortcut,
    MenubarSub,
    MenubarSubContent,
    MenubarSubTrigger,
    MenubarTrigger,
} from '@ma-ui/registry/ui/menubar'
import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
    navigationMenuTriggerStyle,
} from '@ma-ui/registry/ui/navigation-menu'
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from '@ma-ui/registry/ui/pagination'

const meta = {
    title: 'UI/Navigation',
} satisfies Meta

export default meta
type Story = StoryObj<typeof meta>

export const BreadcrumbStory: Story = {
    name: 'Breadcrumb',
    render: () => (
        <Breadcrumb>
            <BreadcrumbList>
                <BreadcrumbItem>
                    <BreadcrumbLink href="#home">Home</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                    <BreadcrumbEllipsis />
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                    <BreadcrumbLink href="#components">Components</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                    <BreadcrumbPage>Breadcrumb</BreadcrumbPage>
                </BreadcrumbItem>
            </BreadcrumbList>
        </Breadcrumb>
    ),
}

export const PaginationStory: Story = {
    name: 'Pagination',
    render: () => (
        <Pagination>
            <PaginationContent>
                <PaginationItem>
                    <PaginationPrevious href="#prev" />
                </PaginationItem>
                {[1, 2, 3].map((page) => (
                    <PaginationItem key={page}>
                        <PaginationLink href={`#page-${page}`} isActive={page === 2}>
                            {page}
                        </PaginationLink>
                    </PaginationItem>
                ))}
                <PaginationItem>
                    <PaginationEllipsis />
                </PaginationItem>
                <PaginationItem>
                    <PaginationNext href="#next" />
                </PaginationItem>
            </PaginationContent>
        </Pagination>
    ),
}

const components = [
    { title: 'Alert Dialog', description: 'A modal dialog that interrupts the user.' },
    { title: 'Hover Card', description: 'Preview content available behind a link.' },
    { title: 'Progress', description: 'Displays the completion progress of a task.' },
    { title: 'Tabs', description: 'Layered sections of content, one at a time.' },
]

export const NavigationMenuStory: Story = {
    name: 'Navigation menu',
    parameters: { layout: 'padded' },
    render: () => (
        <div className="flex h-80 justify-center">
            <NavigationMenu>
                <NavigationMenuList>
                    <NavigationMenuItem>
                        <NavigationMenuTrigger>Getting started</NavigationMenuTrigger>
                        <NavigationMenuContent>
                            <ul className="grid w-96 gap-1">
                                {[
                                    ['Introduction', 'Re-usable components built with Base UI.'],
                                    ['Installation', 'How to install dependencies.'],
                                    ['Theming', 'daisyUI-compatible tokens and themes.'],
                                ].map(([title, description]) => (
                                    <li key={title}>
                                        <NavigationMenuLink
                                            href={`#${title}`}
                                            className="flex-col items-start gap-1"
                                        >
                                            <div className="font-medium">{title}</div>
                                            <div className="text-base-content/60">
                                                {description}
                                            </div>
                                        </NavigationMenuLink>
                                    </li>
                                ))}
                            </ul>
                        </NavigationMenuContent>
                    </NavigationMenuItem>
                    <NavigationMenuItem>
                        <NavigationMenuTrigger>Components</NavigationMenuTrigger>
                        <NavigationMenuContent>
                            <ul className="grid w-[32rem] grid-cols-2 gap-1">
                                {components.map((component) => (
                                    <li key={component.title}>
                                        <NavigationMenuLink
                                            href={`#${component.title}`}
                                            className="flex-col items-start gap-1"
                                        >
                                            <div className="font-medium">{component.title}</div>
                                            <div className="text-base-content/60">
                                                {component.description}
                                            </div>
                                        </NavigationMenuLink>
                                    </li>
                                ))}
                            </ul>
                        </NavigationMenuContent>
                    </NavigationMenuItem>
                    <NavigationMenuItem>
                        <NavigationMenuLink href="#docs" className={navigationMenuTriggerStyle()}>
                            Docs
                        </NavigationMenuLink>
                    </NavigationMenuItem>
                </NavigationMenuList>
            </NavigationMenu>
        </div>
    ),
}

export const MenubarStory: Story = {
    name: 'Menubar',
    render: () => (
        <Menubar>
            <MenubarMenu>
                <MenubarTrigger>File</MenubarTrigger>
                <MenubarContent>
                    <MenubarGroup>
                        <MenubarItem>
                            New Tab <MenubarShortcut>⌘T</MenubarShortcut>
                        </MenubarItem>
                        <MenubarItem>
                            New Window <MenubarShortcut>⌘N</MenubarShortcut>
                        </MenubarItem>
                        <MenubarItem disabled>New Incognito Window</MenubarItem>
                    </MenubarGroup>
                    <MenubarSeparator />
                    <MenubarSub>
                        <MenubarSubTrigger>Share</MenubarSubTrigger>
                        <MenubarSubContent>
                            <MenubarItem>Email link</MenubarItem>
                            <MenubarItem>Messages</MenubarItem>
                            <MenubarItem>Notes</MenubarItem>
                        </MenubarSubContent>
                    </MenubarSub>
                    <MenubarSeparator />
                    <MenubarItem>
                        Print… <MenubarShortcut>⌘P</MenubarShortcut>
                    </MenubarItem>
                </MenubarContent>
            </MenubarMenu>
            <MenubarMenu>
                <MenubarTrigger>Edit</MenubarTrigger>
                <MenubarContent>
                    <MenubarItem>
                        Undo <MenubarShortcut>⌘Z</MenubarShortcut>
                    </MenubarItem>
                    <MenubarItem>
                        Redo <MenubarShortcut>⇧⌘Z</MenubarShortcut>
                    </MenubarItem>
                    <MenubarSeparator />
                    <MenubarItem>Cut</MenubarItem>
                    <MenubarItem>Copy</MenubarItem>
                    <MenubarItem>Paste</MenubarItem>
                </MenubarContent>
            </MenubarMenu>
            <MenubarMenu>
                <MenubarTrigger>View</MenubarTrigger>
                <MenubarContent>
                    <MenubarCheckboxItem>Always Show Bookmarks Bar</MenubarCheckboxItem>
                    <MenubarCheckboxItem defaultChecked>Always Show Full URLs</MenubarCheckboxItem>
                    <MenubarSeparator />
                    <MenubarItem>
                        Reload <MenubarShortcut>⌘R</MenubarShortcut>
                    </MenubarItem>
                </MenubarContent>
            </MenubarMenu>
            <MenubarMenu>
                <MenubarTrigger>Profiles</MenubarTrigger>
                <MenubarContent>
                    <MenubarRadioGroup defaultValue="benoit">
                        <MenubarRadioItem value="andy">Andy</MenubarRadioItem>
                        <MenubarRadioItem value="benoit">Benoit</MenubarRadioItem>
                        <MenubarRadioItem value="luis">Luis</MenubarRadioItem>
                    </MenubarRadioGroup>
                </MenubarContent>
            </MenubarMenu>
        </Menubar>
    ),
}

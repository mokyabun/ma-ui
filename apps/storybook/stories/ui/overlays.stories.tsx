import { useEffect, useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import {
    CalendarIcon,
    CreditCardIcon,
    SettingsIcon,
    SmileIcon,
    Trash2Icon,
    UserIcon,
} from 'lucide-react'

import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogMedia,
    AlertDialogTitle,
    AlertDialogTrigger,
} from '@ma-ui/registry/ui/alert-dialog'
import { Avatar, AvatarFallback, AvatarImage } from '@ma-ui/registry/ui/avatar'
import { Button } from '@ma-ui/registry/ui/button'
import {
    Command,
    CommandDialog,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
    CommandSeparator,
    CommandShortcut,
} from '@ma-ui/registry/ui/command'
import {
    ContextMenu,
    ContextMenuCheckboxItem,
    ContextMenuContent,
    ContextMenuGroup,
    ContextMenuItem,
    ContextMenuLabel,
    ContextMenuRadioGroup,
    ContextMenuRadioItem,
    ContextMenuSeparator,
    ContextMenuShortcut,
    ContextMenuSub,
    ContextMenuSubContent,
    ContextMenuSubTrigger,
    ContextMenuTrigger,
} from '@ma-ui/registry/ui/context-menu'
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@ma-ui/registry/ui/dialog'
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from '@ma-ui/registry/ui/drawer'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuShortcut,
    DropdownMenuTrigger,
} from '@ma-ui/registry/ui/dropdown-menu'
import { Field, FieldGroup, FieldLabel } from '@ma-ui/registry/ui/field'
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@ma-ui/registry/ui/hover-card'
import { Input } from '@ma-ui/registry/ui/input'
import { Kbd, KbdGroup } from '@ma-ui/registry/ui/kbd'
import { Label } from '@ma-ui/registry/ui/label'
import {
    Popover,
    PopoverContent,
    PopoverDescription,
    PopoverHeader,
    PopoverTitle,
    PopoverTrigger,
} from '@ma-ui/registry/ui/popover'
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetDescription,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from '@ma-ui/registry/ui/sheet'
import { Toaster, toast } from '@ma-ui/registry/ui/toast'
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from '@ma-ui/registry/ui/tooltip'

const meta = {
    title: 'UI/Overlays',
} satisfies Meta

export default meta
type Story = StoryObj<typeof meta>

export const DialogStory: Story = {
    name: 'Dialog',
    render: () => (
        <Dialog>
            <DialogTrigger render={<Button variant="outline" />}>Open dialog</DialogTrigger>
            <DialogContent className="sm:max-w-sm">
                <DialogHeader>
                    <DialogTitle>Edit profile</DialogTitle>
                    <DialogDescription>
                        Make changes to your profile here. Click save when you&apos;re done.
                    </DialogDescription>
                </DialogHeader>
                <FieldGroup>
                    <Field>
                        <Label htmlFor="name">Name</Label>
                        <Input id="name" defaultValue="Pedro Duarte" />
                    </Field>
                </FieldGroup>
                <DialogFooter>
                    <DialogClose render={<Button variant="outline" />}>Cancel</DialogClose>
                    <Button>Save changes</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    ),
}

export const DropdownMenuStory: Story = {
    name: 'Dropdown menu',
    render: () => (
        <DropdownMenu>
            <DropdownMenuTrigger render={<Button variant="outline" />}>Open</DropdownMenuTrigger>
            <DropdownMenuContent className="w-40" align="start">
                <DropdownMenuGroup>
                    <DropdownMenuLabel>My Account</DropdownMenuLabel>
                    <DropdownMenuItem>
                        Profile <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                        Settings <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
                    </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuItem variant="destructive">Log out</DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    ),
}

export const PopoverStory: Story = {
    name: 'Popover',
    render: () => (
        <Popover>
            <PopoverTrigger render={<Button variant="outline" />}>Open popover</PopoverTrigger>
            <PopoverContent>
                <PopoverHeader>
                    <PopoverTitle>Dimensions</PopoverTitle>
                    <PopoverDescription>Set the dimensions for the layer.</PopoverDescription>
                </PopoverHeader>
            </PopoverContent>
        </Popover>
    ),
}

export const TooltipStory: Story = {
    name: 'Tooltip',
    render: () => (
        <TooltipProvider>
            <Tooltip>
                <TooltipTrigger render={<Button variant="outline" />}>Hover</TooltipTrigger>
                <TooltipContent>Add to library</TooltipContent>
            </Tooltip>
        </TooltipProvider>
    ),
}

export const AlertDialogStory: Story = {
    name: 'Alert dialog',
    render: () => (
        <div className="flex gap-2">
            <AlertDialog>
                <AlertDialogTrigger render={<Button variant="outline" />}>
                    Show dialog
                </AlertDialogTrigger>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                        <AlertDialogDescription>
                            This action cannot be undone. This will permanently delete your account
                            and remove your data from our servers.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction>Continue</AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
            <AlertDialog>
                <AlertDialogTrigger render={<Button variant="soft" color="error" />}>
                    Delete chat
                </AlertDialogTrigger>
                <AlertDialogContent size="sm">
                    <AlertDialogHeader>
                        <AlertDialogMedia className="bg-error/10 text-error">
                            <Trash2Icon />
                        </AlertDialogMedia>
                        <AlertDialogTitle>Delete chat?</AlertDialogTitle>
                        <AlertDialogDescription>
                            This will permanently delete this chat conversation.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction color="error">Delete</AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </div>
    ),
}

export const SheetStory: Story = {
    name: 'Sheet',
    render: () => (
        <div className="grid grid-cols-2 gap-2">
            {(['top', 'right', 'bottom', 'left'] as const).map((side) => (
                <Sheet key={side}>
                    <SheetTrigger render={<Button variant="outline" className="capitalize" />}>
                        {side}
                    </SheetTrigger>
                    <SheetContent side={side}>
                        <SheetHeader>
                            <SheetTitle>Edit profile</SheetTitle>
                            <SheetDescription>
                                Make changes to your profile here. Click save when you&apos;re done.
                            </SheetDescription>
                        </SheetHeader>
                        <FieldGroup className="px-4">
                            <Field>
                                <FieldLabel htmlFor={`sheet-name-${side}`}>Name</FieldLabel>
                                <Input id={`sheet-name-${side}`} defaultValue="Pedro Duarte" />
                            </Field>
                            <Field>
                                <FieldLabel htmlFor={`sheet-username-${side}`}>Username</FieldLabel>
                                <Input id={`sheet-username-${side}`} defaultValue="@peduarte" />
                            </Field>
                        </FieldGroup>
                        <SheetFooter>
                            <Button type="submit">Save changes</Button>
                            <SheetClose render={<Button variant="outline" />}>Close</SheetClose>
                        </SheetFooter>
                    </SheetContent>
                </Sheet>
            ))}
        </div>
    ),
}

export const DrawerStory: Story = {
    name: 'Drawer',
    render: () => (
        <div className="flex gap-2">
            {(['down', 'right'] as const).map((direction) => (
                <Drawer key={direction} swipeDirection={direction} showSwipeHandle>
                    <DrawerTrigger render={<Button variant="outline" />}>
                        Open ({direction})
                    </DrawerTrigger>
                    <DrawerContent>
                        <div className="mx-auto flex w-full max-w-sm flex-1 flex-col">
                            <DrawerHeader>
                                <DrawerTitle>Move goal</DrawerTitle>
                                <DrawerDescription>Set your daily activity goal.</DrawerDescription>
                            </DrawerHeader>
                            <div className="p-6 text-center">
                                <div className="text-7xl font-bold tracking-tighter">350</div>
                                <div className="text-xs text-base-content/60 uppercase">
                                    Calories/day
                                </div>
                            </div>
                            <DrawerFooter>
                                <Button>Submit</Button>
                                <DrawerClose render={<Button variant="outline" />}>
                                    Cancel
                                </DrawerClose>
                            </DrawerFooter>
                        </div>
                    </DrawerContent>
                </Drawer>
            ))}
        </div>
    ),
}

export const HoverCardStory: Story = {
    name: 'Hover card',
    render: () => (
        <HoverCard>
            <HoverCardTrigger render={<Button variant="link" />}>@nextjs</HoverCardTrigger>
            <HoverCardContent className="w-80">
                <div className="flex gap-4">
                    <Avatar>
                        <AvatarImage src="https://github.com/vercel.png" alt="@nextjs" />
                        <AvatarFallback>VC</AvatarFallback>
                    </Avatar>
                    <div className="space-y-1">
                        <h4 className="text-sm font-semibold">@nextjs</h4>
                        <p className="text-sm">
                            The React Framework – created and maintained by @vercel.
                        </p>
                        <div className="flex items-center gap-1 pt-1 text-xs text-base-content/60">
                            <CalendarIcon className="size-3" /> Joined December 2021
                        </div>
                    </div>
                </div>
            </HoverCardContent>
        </HoverCard>
    ),
}

export const ContextMenuStory: Story = {
    name: 'Context menu',
    render: () => (
        <ContextMenu>
            <ContextMenuTrigger className="flex h-36 w-72 items-center justify-center rounded-box border border-dashed border-base-content/20 text-sm">
                Right click here
            </ContextMenuTrigger>
            <ContextMenuContent className="w-52">
                <ContextMenuGroup>
                    <ContextMenuItem>
                        Back <ContextMenuShortcut>⌘[</ContextMenuShortcut>
                    </ContextMenuItem>
                    <ContextMenuItem disabled>
                        Forward <ContextMenuShortcut>⌘]</ContextMenuShortcut>
                    </ContextMenuItem>
                    <ContextMenuItem>
                        Reload <ContextMenuShortcut>⌘R</ContextMenuShortcut>
                    </ContextMenuItem>
                    <ContextMenuSub>
                        <ContextMenuSubTrigger>More tools</ContextMenuSubTrigger>
                        <ContextMenuSubContent className="w-44">
                            <ContextMenuItem>Save page…</ContextMenuItem>
                            <ContextMenuItem>Create shortcut…</ContextMenuItem>
                            <ContextMenuSeparator />
                            <ContextMenuItem>Developer tools</ContextMenuItem>
                        </ContextMenuSubContent>
                    </ContextMenuSub>
                </ContextMenuGroup>
                <ContextMenuSeparator />
                <ContextMenuCheckboxItem defaultChecked>Show bookmarks</ContextMenuCheckboxItem>
                <ContextMenuCheckboxItem>Show full URLs</ContextMenuCheckboxItem>
                <ContextMenuSeparator />
                <ContextMenuGroup>
                    <ContextMenuLabel>People</ContextMenuLabel>
                    <ContextMenuRadioGroup defaultValue="pedro">
                        <ContextMenuRadioItem value="pedro">Pedro Duarte</ContextMenuRadioItem>
                        <ContextMenuRadioItem value="colm">Colm Tuite</ContextMenuRadioItem>
                    </ContextMenuRadioGroup>
                </ContextMenuGroup>
            </ContextMenuContent>
        </ContextMenu>
    ),
}

function CommandItems() {
    return (
        <>
            <CommandEmpty>No results found.</CommandEmpty>
            <CommandGroup heading="Suggestions">
                <CommandItem>
                    <CalendarIcon />
                    <span>Calendar</span>
                </CommandItem>
                <CommandItem>
                    <SmileIcon />
                    <span>Search Emoji</span>
                </CommandItem>
            </CommandGroup>
            <CommandSeparator />
            <CommandGroup heading="Settings">
                <CommandItem>
                    <UserIcon />
                    <span>Profile</span>
                    <CommandShortcut>⌘P</CommandShortcut>
                </CommandItem>
                <CommandItem>
                    <CreditCardIcon />
                    <span>Billing</span>
                    <CommandShortcut>⌘B</CommandShortcut>
                </CommandItem>
                <CommandItem>
                    <SettingsIcon />
                    <span>Settings</span>
                    <CommandShortcut>⌘S</CommandShortcut>
                </CommandItem>
            </CommandGroup>
        </>
    )
}

export const CommandStory: Story = {
    name: 'Command',
    render: () => (
        <Command className="w-96 rounded-box border border-base-content/20">
            <CommandInput placeholder="Type a command or search..." />
            <CommandList>
                <CommandItems />
            </CommandList>
        </Command>
    ),
}

function CommandDialogDemo() {
    const [open, setOpen] = useState(false)

    useEffect(() => {
        const down = (event: KeyboardEvent) => {
            if (event.key === 'k' && (event.metaKey || event.ctrlKey)) {
                event.preventDefault()
                setOpen((value) => !value)
            }
        }
        document.addEventListener('keydown', down)
        return () => document.removeEventListener('keydown', down)
    }, [])

    return (
        <>
            <Button variant="outline" onClick={() => setOpen(true)}>
                Open command palette
                <KbdGroup>
                    <Kbd>⌘</Kbd>
                    <Kbd>K</Kbd>
                </KbdGroup>
            </Button>
            <CommandDialog open={open} onOpenChange={setOpen}>
                <Command>
                    <CommandInput placeholder="Type a command or search..." />
                    <CommandList>
                        <CommandItems />
                    </CommandList>
                </Command>
            </CommandDialog>
        </>
    )
}

export const CommandDialogStory: Story = {
    name: 'Command dialog',
    render: () => <CommandDialogDemo />,
}

export const ToastStory: Story = {
    name: 'Toast',
    render: () => (
        <Toaster>
            <div className="flex flex-wrap gap-2">
                <Button
                    variant="outline"
                    onClick={() =>
                        toast.add({
                            title: 'Event created',
                            description: 'Sunday, December 03, 2023 at 9:00 AM',
                        })
                    }
                >
                    Default
                </Button>
                {(['success', 'info', 'warning', 'error', 'loading'] as const).map((type) => (
                    <Button
                        key={type}
                        variant="outline"
                        className="capitalize"
                        onClick={() =>
                            toast.add({
                                type,
                                title: `${type[0]?.toUpperCase()}${type.slice(1)} toast`,
                                description: `This is a ${type} toast.`,
                            })
                        }
                    >
                        {type}
                    </Button>
                ))}
                <Button
                    variant="outline"
                    onClick={() =>
                        toast.add({
                            title: 'Message archived',
                            actionProps: { children: 'Undo' },
                        })
                    }
                >
                    With action
                </Button>
            </div>
        </Toaster>
    ),
}

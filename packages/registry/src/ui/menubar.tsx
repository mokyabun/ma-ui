'use client'

import * as React from 'react'
import { Menu as MenuPrimitive } from '@base-ui/react/menu'
import { Menubar as MenubarPrimitive } from '@base-ui/react/menubar'
import { CheckIcon } from 'lucide-react'

import { cn } from '@/registry/ma/lib/utils'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuPortal,
    DropdownMenuRadioGroup,
    DropdownMenuSeparator,
    DropdownMenuShortcut,
    DropdownMenuSub,
    DropdownMenuSubContent,
    DropdownMenuSubTrigger,
    DropdownMenuTrigger,
} from '@/registry/ma/ui/dropdown-menu'

function Menubar({ className, ...props }: MenubarPrimitive.Props) {
    return (
        <MenubarPrimitive
            data-slot="menubar"
            className={cn(
                'flex h-field items-center gap-1 rounded-box border border-base-content/20 p-1',
                className,
            )}
            {...props}
        />
    )
}

function MenubarMenu({ ...props }: React.ComponentProps<typeof DropdownMenu>) {
    return <DropdownMenu data-slot="menubar-menu" {...props} />
}

function MenubarGroup({ ...props }: React.ComponentProps<typeof DropdownMenuGroup>) {
    return <DropdownMenuGroup data-slot="menubar-group" {...props} />
}

function MenubarPortal({ ...props }: React.ComponentProps<typeof DropdownMenuPortal>) {
    return <DropdownMenuPortal data-slot="menubar-portal" {...props} />
}

function MenubarTrigger({ className, ...props }: React.ComponentProps<typeof DropdownMenuTrigger>) {
    return (
        <DropdownMenuTrigger
            data-slot="menubar-trigger"
            className={cn(
                'flex h-full items-center rounded-field px-3 text-sm font-medium outline-hidden select-none hover:bg-base-200 aria-expanded:bg-base-200',
                className,
            )}
            {...props}
        />
    )
}

function MenubarContent({
    className,
    align = 'start',
    alignOffset = -4,
    sideOffset = 8,
    ...props
}: React.ComponentProps<typeof DropdownMenuContent>) {
    return (
        <DropdownMenuContent
            data-slot="menubar-content"
            align={align}
            alignOffset={alignOffset}
            sideOffset={sideOffset}
            className={cn(
                'min-w-36 rounded-box border border-base-content/20 bg-base-100 p-1 text-base-content',
                className,
            )}
            {...props}
        />
    )
}

function MenubarItem({
    className,
    inset,
    variant = 'default',
    ...props
}: React.ComponentProps<typeof DropdownMenuItem>) {
    return (
        <DropdownMenuItem
            data-slot="menubar-item"
            data-inset={inset}
            data-variant={variant}
            className={cn(
                "group/menubar-item gap-2 rounded-field px-3 py-2 text-sm focus:bg-base-200 focus:text-base-content not-data-[variant=destructive]:focus:**:text-base-content data-inset:pl-9 data-[variant=destructive]:text-error data-[variant=destructive]:focus:bg-error/10 data-[variant=destructive]:focus:text-error data-disabled:opacity-50 [&_svg:not([class*='size-'])]:size-4 data-[variant=destructive]:*:[svg]:text-error!",
                className,
            )}
            {...props}
        />
    )
}

function MenubarCheckboxItem({
    className,
    children,
    checked,
    inset,
    ...props
}: MenuPrimitive.CheckboxItem.Props & {
    inset?: boolean
}) {
    return (
        <MenuPrimitive.CheckboxItem
            data-slot="menubar-checkbox-item"
            data-inset={inset}
            className={cn(
                'relative flex cursor-default items-center gap-2 rounded-field py-2 pr-3 pl-9 text-sm outline-hidden select-none focus:bg-base-200 focus:text-base-content focus:**:text-base-content data-inset:pl-9 data-disabled:pointer-events-none data-disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0',
                className,
            )}
            checked={checked}
            {...props}
        >
            <span className="pointer-events-none absolute left-3 flex size-4 items-center justify-center [&_svg:not([class*='size-'])]:size-4">
                <MenuPrimitive.CheckboxItemIndicator>
                    <CheckIcon />
                </MenuPrimitive.CheckboxItemIndicator>
            </span>
            {children}
        </MenuPrimitive.CheckboxItem>
    )
}

function MenubarRadioGroup({ ...props }: React.ComponentProps<typeof DropdownMenuRadioGroup>) {
    return <DropdownMenuRadioGroup data-slot="menubar-radio-group" {...props} />
}

function MenubarRadioItem({
    className,
    children,
    inset,
    ...props
}: MenuPrimitive.RadioItem.Props & {
    inset?: boolean
}) {
    return (
        <MenuPrimitive.RadioItem
            data-slot="menubar-radio-item"
            data-inset={inset}
            className={cn(
                "relative flex cursor-default items-center gap-2 rounded-field py-2 pr-3 pl-9 text-sm outline-hidden select-none focus:bg-base-200 focus:text-base-content focus:**:text-base-content data-inset:pl-9 data-disabled:pointer-events-none data-disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
                className,
            )}
            {...props}
        >
            <span className="pointer-events-none absolute left-3 flex size-4 items-center justify-center [&_svg:not([class*='size-'])]:size-4">
                <MenuPrimitive.RadioItemIndicator>
                    <CheckIcon />
                </MenuPrimitive.RadioItemIndicator>
            </span>
            {children}
        </MenuPrimitive.RadioItem>
    )
}

function MenubarLabel({
    className,
    inset,
    ...props
}: React.ComponentProps<typeof DropdownMenuLabel> & {
    inset?: boolean
}) {
    return (
        <DropdownMenuLabel
            data-slot="menubar-label"
            data-inset={inset}
            className={cn('px-3 py-1.5 text-sm font-medium data-inset:pl-9', className)}
            {...props}
        />
    )
}

function MenubarSeparator({
    className,
    ...props
}: React.ComponentProps<typeof DropdownMenuSeparator>) {
    return (
        <DropdownMenuSeparator
            data-slot="menubar-separator"
            className={cn('-mx-1 my-1 h-px bg-base-content/10', className)}
            {...props}
        />
    )
}

function MenubarShortcut({
    className,
    ...props
}: React.ComponentProps<typeof DropdownMenuShortcut>) {
    return (
        <DropdownMenuShortcut
            data-slot="menubar-shortcut"
            className={cn(
                'ml-auto text-xs tracking-widest text-base-content/60 group-focus/menubar-item:text-base-content',
                className,
            )}
            {...props}
        />
    )
}

function MenubarSub({ ...props }: React.ComponentProps<typeof DropdownMenuSub>) {
    return <DropdownMenuSub data-slot="menubar-sub" {...props} />
}

function MenubarSubTrigger({
    className,
    inset,
    ...props
}: React.ComponentProps<typeof DropdownMenuSubTrigger> & {
    inset?: boolean
}) {
    return (
        <DropdownMenuSubTrigger
            data-slot="menubar-sub-trigger"
            data-inset={inset}
            className={cn(
                "gap-2 rounded-field px-3 py-2 text-sm focus:bg-base-200 focus:text-base-content data-inset:pl-9 data-open:bg-base-200 data-open:text-base-content [&_svg:not([class*='size-'])]:size-4",
                className,
            )}
            {...props}
        />
    )
}

function MenubarSubContent({
    className,
    ...props
}: React.ComponentProps<typeof DropdownMenuSubContent>) {
    return (
        <DropdownMenuSubContent
            data-slot="menubar-sub-content"
            className={cn(
                'min-w-32 rounded-box border border-base-content/20 bg-base-100 p-1 text-base-content',
                className,
            )}
            {...props}
        />
    )
}

export {
    Menubar,
    MenubarPortal,
    MenubarMenu,
    MenubarTrigger,
    MenubarContent,
    MenubarGroup,
    MenubarSeparator,
    MenubarLabel,
    MenubarItem,
    MenubarShortcut,
    MenubarCheckboxItem,
    MenubarRadioGroup,
    MenubarRadioItem,
    MenubarSub,
    MenubarSubTrigger,
    MenubarSubContent,
}

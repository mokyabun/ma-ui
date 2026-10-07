import { cn } from '@/registry/ma/lib/utils'

function Kbd({ className, ...props }: React.ComponentProps<'kbd'>) {
    return (
        <kbd
            data-slot="kbd"
            className={cn(
                "pointer-events-none inline-flex h-6 w-fit min-w-6 items-center justify-center gap-1 rounded-selector border border-base-content/20 bg-base-200 px-1.5 font-sans text-xs font-medium text-base-content/60 select-none in-data-[slot=tooltip-content]:border-base-100/30 in-data-[slot=tooltip-content]:bg-base-100/20 in-data-[slot=tooltip-content]:text-base-100 [&_svg:not([class*='size-'])]:size-3",
                className,
            )}
            {...props}
        />
    )
}

function KbdGroup({ className, ...props }: React.ComponentProps<'div'>) {
    return (
        <kbd
            data-slot="kbd-group"
            className={cn('inline-flex items-center gap-1', className)}
            {...props}
        />
    )
}

export { Kbd, KbdGroup }

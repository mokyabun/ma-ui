'use client'

import { Toggle as TogglePrimitive } from '@base-ui/react/toggle'
import { cva, type VariantProps } from 'class-variance-authority'

import { cn } from '@/registry/ma/lib/utils'

const toggleVariants = cva(
    "group/toggle inline-flex items-center justify-center gap-1 rounded-field border border-transparent text-sm font-medium whitespace-nowrap outline-none hover:bg-base-content/8 hover:text-base-content focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-base-content focus-visible:outline-solid disabled:pointer-events-none disabled:opacity-50 aria-invalid:border-error aria-pressed:bg-base-content/12 data-[state=on]:bg-base-content/12 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
    {
        variants: {
            variant: {
                default: 'bg-transparent',
                outline: 'border-base-content/20 bg-transparent',
            },
            size: {
                default:
                    'h-field min-w-field gap-2 px-3 has-data-[icon=inline-end]:pr-2.5 has-data-[icon=inline-start]:pl-2.5',
                sm: 'h-field-sm min-w-field-sm gap-1.5 px-2.5 has-data-[icon=inline-end]:pr-2 has-data-[icon=inline-start]:pl-2',
                lg: "h-field-lg min-w-field-lg gap-2 px-4 text-base has-data-[icon=inline-end]:pr-3 has-data-[icon=inline-start]:pl-3 [&_svg:not([class*='size-'])]:size-5",
            },
        },
        defaultVariants: {
            variant: 'default',
            size: 'default',
        },
    },
)

function Toggle({
    className,
    variant = 'default',
    size = 'default',
    ...props
}: TogglePrimitive.Props & VariantProps<typeof toggleVariants>) {
    return (
        <TogglePrimitive
            data-slot="toggle"
            className={cn(toggleVariants({ variant, size, className }))}
            {...props}
        />
    )
}

export { Toggle, toggleVariants }

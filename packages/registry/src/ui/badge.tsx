import { mergeProps } from '@base-ui/react/merge-props'
import { useRender } from '@base-ui/react/use-render'
import { cva, type VariantProps } from 'class-variance-authority'

import { cn } from '@/registry/ma/lib/utils'

/** Same `variant` × `color` API as Button (see button.tsx). */
const badgeVariants = cva(
    [
        '[--badge-bg:var(--color-primary)] [--badge-border:color-mix(in_oklab,var(--color-base-content)_20%,transparent)] [--badge-fg:var(--color-primary-content)] [--badge-tone:var(--color-base-content)]',
        'group/badge inline-flex h-6 w-fit shrink-0 items-center justify-center gap-1 overflow-hidden rounded-selector border border-transparent px-2.5 text-xs font-medium whitespace-nowrap focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-base-content focus-visible:outline-solid has-data-[icon=inline-end]:pr-2 has-data-[icon=inline-start]:pl-2 aria-invalid:border-error [&>svg]:pointer-events-none [&>svg]:size-3.5!',
    ],
    {
        variants: {
            variant: {
                solid: 'border-(--badge-bg) bg-(--badge-bg) text-(--badge-fg) [a]:hover:bg-(--badge-bg)/85',
                soft: 'border-(--badge-tone)/20 bg-(--badge-tone)/8 text-(--badge-tone) [a]:hover:bg-(--badge-tone)/14',
                outline:
                    'border-(--badge-border) text-(--badge-tone) [a]:hover:bg-(--badge-tone)/8',
                dash: 'border-dashed border-(--badge-border) text-(--badge-tone) [a]:hover:bg-(--badge-tone)/8',
                ghost: 'text-(--badge-tone) hover:bg-(--badge-tone)/8',
                link: 'text-(--badge-tone) underline-offset-4 hover:underline',
            },
            color: {
                neutral:
                    '[--badge-bg:var(--color-neutral)] [--badge-border:var(--color-neutral)] [--badge-fg:var(--color-neutral-content)] [--badge-tone:var(--color-neutral)]',
                primary:
                    '[--badge-bg:var(--color-primary)] [--badge-border:var(--color-primary)] [--badge-fg:var(--color-primary-content)] [--badge-tone:var(--color-primary)]',
                secondary:
                    '[--badge-bg:var(--color-secondary)] [--badge-border:var(--color-secondary)] [--badge-fg:var(--color-secondary-content)] [--badge-tone:var(--color-secondary)]',
                accent: '[--badge-bg:var(--color-accent)] [--badge-border:var(--color-accent)] [--badge-fg:var(--color-accent-content)] [--badge-tone:var(--color-accent)]',
                info: '[--badge-bg:var(--color-info)] [--badge-border:var(--color-info)] [--badge-fg:var(--color-info-content)] [--badge-tone:var(--color-info)]',
                success:
                    '[--badge-bg:var(--color-success)] [--badge-border:var(--color-success)] [--badge-fg:var(--color-success-content)] [--badge-tone:var(--color-success)]',
                warning:
                    '[--badge-bg:var(--color-warning)] [--badge-border:var(--color-warning)] [--badge-fg:var(--color-warning-content)] [--badge-tone:var(--color-warning)]',
                error: '[--badge-bg:var(--color-error)] [--badge-border:var(--color-error)] [--badge-fg:var(--color-error-content)] [--badge-tone:var(--color-error)]',
            },
        },
        defaultVariants: {
            variant: 'solid',
        },
    },
)

function Badge({
    className,
    variant = 'solid',
    color,
    render,
    ...props
}: Omit<useRender.ComponentProps<'span'>, 'color'> & VariantProps<typeof badgeVariants>) {
    return useRender({
        defaultTagName: 'span',
        props: mergeProps<'span'>(
            {
                className: cn(badgeVariants({ variant, color }), className),
            },
            props,
        ),
        render,
        state: {
            slot: 'badge',
            variant,
            color,
        },
    })
}

export { Badge, badgeVariants }

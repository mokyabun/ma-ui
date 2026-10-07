import { Button as ButtonPrimitive } from "@base-ui/react/button"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/registry/ma/lib/utils"

/**
 * daisyUI-style API on top of the shadcn button:
 *
 *   variant: solid | soft | outline | dash | ghost | link   (how it looks)
 *   color:   neutral | primary | secondary | accent | info | success | warning | error
 *
 * Without `color`, it behaves like shadcn: `solid` uses primary, every other
 * variant is neutral (base-content). Colors are passed through CSS variables
 * so each variant is written once.
 */
const buttonVariants = cva(
  [
    "[--btn-bg:var(--color-primary)] [--btn-border:color-mix(in_oklab,var(--color-base-content)_20%,transparent)] [--btn-fg:var(--color-primary-content)] [--btn-tone:var(--color-base-content)]",
    "group/button inline-flex shrink-0 items-center justify-center rounded-field border border-transparent text-sm font-medium whitespace-nowrap outline-none select-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-base-content focus-visible:outline-solid disabled:pointer-events-none disabled:opacity-50 aria-invalid:border-error [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  ],
  {
    variants: {
      variant: {
        solid:
          "border-(--btn-bg) bg-(--btn-bg) text-(--btn-fg) hover:border-(--btn-bg)/85 hover:bg-(--btn-bg)/85",
        soft: "border-(--btn-tone)/20 bg-(--btn-tone)/8 text-(--btn-tone) hover:bg-(--btn-tone)/14 aria-expanded:bg-(--btn-tone)/14",
        outline:
          "border-(--btn-border) bg-base-100 text-(--btn-tone) hover:bg-(--btn-tone)/8 aria-expanded:bg-(--btn-tone)/8",
        dash: "border-dashed border-(--btn-border) text-(--btn-tone) hover:bg-(--btn-tone)/8 aria-expanded:bg-(--btn-tone)/8",
        ghost:
          "text-(--btn-tone) hover:bg-(--btn-tone)/8 aria-expanded:bg-(--btn-tone)/8",
        link: "text-(--btn-tone) underline-offset-4 hover:underline",
      },
      color: {
        neutral:
          "[--btn-bg:var(--color-neutral)] [--btn-border:var(--color-neutral)] [--btn-fg:var(--color-neutral-content)] [--btn-tone:var(--color-neutral)]",
        primary:
          "[--btn-bg:var(--color-primary)] [--btn-border:var(--color-primary)] [--btn-fg:var(--color-primary-content)] [--btn-tone:var(--color-primary)]",
        secondary:
          "[--btn-bg:var(--color-secondary)] [--btn-border:var(--color-secondary)] [--btn-fg:var(--color-secondary-content)] [--btn-tone:var(--color-secondary)]",
        accent:
          "[--btn-bg:var(--color-accent)] [--btn-border:var(--color-accent)] [--btn-fg:var(--color-accent-content)] [--btn-tone:var(--color-accent)]",
        info: "[--btn-bg:var(--color-info)] [--btn-border:var(--color-info)] [--btn-fg:var(--color-info-content)] [--btn-tone:var(--color-info)]",
        success:
          "[--btn-bg:var(--color-success)] [--btn-border:var(--color-success)] [--btn-fg:var(--color-success-content)] [--btn-tone:var(--color-success)]",
        warning:
          "[--btn-bg:var(--color-warning)] [--btn-border:var(--color-warning)] [--btn-fg:var(--color-warning-content)] [--btn-tone:var(--color-warning)]",
        error:
          "[--btn-bg:var(--color-error)] [--btn-border:var(--color-error)] [--btn-fg:var(--color-error-content)] [--btn-tone:var(--color-error)]",
      },
      size: {
        default:
          "h-field gap-2 px-4 has-data-[icon=inline-end]:pr-3 has-data-[icon=inline-start]:pl-3",
        xs: "h-field-xs gap-1 px-2 text-xs has-data-[icon=inline-end]:pr-1.5 has-data-[icon=inline-start]:pl-1.5 [&_svg:not([class*='size-'])]:size-3",
        sm: "h-field-sm gap-1.5 px-3 text-sm has-data-[icon=inline-end]:pr-2 has-data-[icon=inline-start]:pl-2",
        lg: "h-field-lg gap-2 px-6 text-base has-data-[icon=inline-end]:pr-5 has-data-[icon=inline-start]:pl-5 [&_svg:not([class*='size-'])]:size-5",
        icon: "size-field",
        "icon-xs": "size-field-xs [&_svg:not([class*='size-'])]:size-3.5",
        "icon-sm": "size-field-sm",
        "icon-lg": "size-field-lg [&_svg:not([class*='size-'])]:size-5",
      },
    },
    defaultVariants: {
      variant: "solid",
      size: "default",
    },
  }
)

type ButtonProps = Omit<ButtonPrimitive.Props, "color"> &
  VariantProps<typeof buttonVariants>

function Button({
  className,
  variant = "solid",
  color,
  size = "default",
  ...props
}: ButtonProps) {
  return (
    <ButtonPrimitive
      data-slot="button"
      data-variant={variant}
      data-color={color ?? undefined}
      className={cn(buttonVariants({ variant, color, size, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants, type ButtonProps }

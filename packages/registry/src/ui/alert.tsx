import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/registry/ma/lib/utils"

/**
 * daisyUI-style alert: `variant` (soft | solid | outline | dash) × `color`.
 * Without `color` it is the neutral shadcn alert.
 */
const alertVariants = cva(
  [
    "[--alert-fg:var(--color-base-100)] [--alert-tone:var(--color-base-content)]",
    "group/alert relative grid w-full gap-1 rounded-box border border-base-content/20 px-4 py-3 text-left text-sm has-data-[slot=alert-action]:relative has-data-[slot=alert-action]:pr-24 has-[>svg]:grid-cols-[auto_1fr] has-[>svg]:gap-x-3 *:[svg]:row-span-2 *:[svg]:translate-y-0.5 *:[svg]:text-current *:[svg:not([class*='size-'])]:size-4",
  ],
  {
    variants: {
      variant: {
        soft: "",
        solid:
          "border-transparent bg-(--alert-tone) text-(--alert-fg) *:data-[slot=alert-description]:text-(--alert-fg)/85",
        outline: "border-(--alert-tone) text-(--alert-tone)",
        dash: "border-dashed border-(--alert-tone) text-(--alert-tone)",
      },
      color: {
        neutral:
          "[--alert-fg:var(--color-neutral-content)] [--alert-tone:var(--color-neutral)]",
        primary:
          "[--alert-fg:var(--color-primary-content)] [--alert-tone:var(--color-primary)]",
        secondary:
          "[--alert-fg:var(--color-secondary-content)] [--alert-tone:var(--color-secondary)]",
        accent:
          "[--alert-fg:var(--color-accent-content)] [--alert-tone:var(--color-accent)]",
        info: "[--alert-fg:var(--color-info-content)] [--alert-tone:var(--color-info)]",
        success:
          "[--alert-fg:var(--color-success-content)] [--alert-tone:var(--color-success)]",
        warning:
          "[--alert-fg:var(--color-warning-content)] [--alert-tone:var(--color-warning)]",
        error:
          "[--alert-fg:var(--color-error-content)] [--alert-tone:var(--color-error)]",
      },
    },
    compoundVariants: [
      {
        variant: "soft",
        color: null,
        className: "bg-base-100 text-base-content",
      },
      {
        variant: "soft",
        color: [
          "neutral",
          "primary",
          "secondary",
          "accent",
          "info",
          "success",
          "warning",
          "error",
        ],
        className:
          "border-(--alert-tone)/20 bg-(--alert-tone)/8 text-(--alert-tone) *:data-[slot=alert-description]:text-(--alert-tone)/85",
      },
    ],
    defaultVariants: {
      variant: "soft",
    },
  }
)

function Alert({
  className,
  variant,
  color,
  ...props
}: Omit<React.ComponentProps<"div">, "color"> &
  VariantProps<typeof alertVariants>) {
  return (
    <div
      data-slot="alert"
      role="alert"
      className={cn(alertVariants({ variant, color }), className)}
      {...props}
    />
  )
}

function AlertTitle({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="alert-title"
      className={cn(
        "font-medium group-has-[>svg]/alert:col-start-2 [&_a]:underline [&_a]:underline-offset-3 [&_a]:hover:text-base-content",
        className
      )}
      {...props}
    />
  )
}

function AlertDescription({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="alert-description"
      className={cn(
        "text-sm text-balance text-base-content/60 md:text-pretty [&_a]:underline [&_a]:underline-offset-3 [&_a]:hover:text-base-content [&_p:not(:last-child)]:mb-4",
        className
      )}
      {...props}
    />
  )
}

function AlertAction({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="alert-action"
      className={cn("absolute top-2.5 right-3", className)}
      {...props}
    />
  )
}

export { Alert, AlertTitle, AlertDescription, AlertAction }

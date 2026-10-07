/**
 * Static Tailwind theme extension: maps theme CSS variables to utilities.
 *
 *   colors    → bg-primary, text-base-content, border-error/20, ...
 *   radius    → rounded-selector | rounded-field | rounded-box
 *   spacing   → h-field, h-field-sm, size-selector, ... (scale with --size-*)
 */
const colorNames = [
  "base-100",
  "base-200",
  "base-300",
  "base-content",
  "primary",
  "primary-content",
  "secondary",
  "secondary-content",
  "accent",
  "accent-content",
  "neutral",
  "neutral-content",
  "info",
  "info-content",
  "success",
  "success-content",
  "warning",
  "warning-content",
  "error",
  "error-content",
] as const

export const colors = Object.fromEntries(
  colorNames.map((name) => [name, `var(--color-${name})`])
)

export const borderRadius = {
  selector: "var(--radius-selector)",
  field: "var(--radius-field)",
  box: "var(--radius-box)",
}

/**
 * Control sizes. `--size-field` / `--size-selector` are a per-theme base unit
 * (0.25rem by default), so a theme can make every control denser or roomier.
 * Multipliers match daisyUI 5: a default field is 2.5rem, a selector 1.25rem.
 */
export const spacing = {
  "field-xs": "calc(var(--size-field, 0.25rem) * 6)",
  "field-sm": "calc(var(--size-field, 0.25rem) * 8)",
  field: "calc(var(--size-field, 0.25rem) * 10)",
  "field-lg": "calc(var(--size-field, 0.25rem) * 12)",
  "field-xl": "calc(var(--size-field, 0.25rem) * 14)",
  "selector-sm": "calc(var(--size-selector, 0.25rem) * 4)",
  selector: "calc(var(--size-selector, 0.25rem) * 5)",
  "selector-lg": "calc(var(--size-selector, 0.25rem) * 6)",
}

/** Height variables are set by Base UI (`--accordion-panel-height`) and Radix. */
export const keyframes = {
  "accordion-down": {
    from: { height: "0" },
    to: {
      height:
        "var(--radix-accordion-content-height, var(--accordion-panel-height, auto))",
    },
  },
  "accordion-up": {
    from: {
      height:
        "var(--radix-accordion-content-height, var(--accordion-panel-height, auto))",
    },
    to: { height: "0" },
  },
}

export const animation = {
  "accordion-down": "accordion-down 0.2s ease-out",
  "accordion-up": "accordion-up 0.2s ease-out",
}

/**
 * State variants shared by Base UI (`data-open`) and Radix (`data-state="open"`),
 * same as `shadcn/tailwind.css`, so imported components work unchanged.
 */
export const variants: Record<string, string[]> = {
  "data-open": [
    '&:where([data-state="open"])',
    '&:where([data-open]:not([data-open="false"]))',
  ],
  "data-closed": [
    '&:where([data-state="closed"])',
    '&:where([data-closed]:not([data-closed="false"]))',
  ],
  "data-checked": [
    '&:where([data-state="checked"])',
    '&:where([data-checked]:not([data-checked="false"]))',
  ],
  "data-unchecked": [
    '&:where([data-state="unchecked"])',
    '&:where([data-unchecked]:not([data-unchecked="false"]))',
  ],
  "data-selected": ['&:where([data-selected="true"])'],
  "data-disabled": [
    '&:where([data-disabled="true"])',
    '&:where([data-disabled]:not([data-disabled="false"]))',
  ],
  "data-active": [
    '&:where([data-state="active"])',
    '&:where([data-active]:not([data-active="false"]))',
  ],
  "data-horizontal": ['&:where([data-orientation="horizontal"])'],
  "data-vertical": ['&:where([data-orientation="vertical"])'],
}

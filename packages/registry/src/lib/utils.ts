import { clsx, type ClassValue } from 'clsx'
import { extendTailwindMerge } from 'tailwind-merge'

/**
 * tailwind-merge that knows about the @ma-ui/tailwind tokens, so e.g.
 * `cn("rounded-box", "rounded-none")` and `cn("h-field", "h-12")` dedupe.
 */
const twMerge = extendTailwindMerge({
    extend: {
        theme: {
            radius: ['selector', 'field', 'box'],
            spacing: [
                'field-xs',
                'field-sm',
                'field',
                'field-lg',
                'field-xl',
                'selector-sm',
                'selector',
                'selector-lg',
            ],
            animate: ['accordion-down', 'accordion-up'],
        },
    },
})

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}

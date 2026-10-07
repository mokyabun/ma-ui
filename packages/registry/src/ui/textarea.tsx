import * as React from 'react'

import { cn } from '@/registry/ma/lib/utils'

function Textarea({ className, ...props }: React.ComponentProps<'textarea'>) {
    return (
        <textarea
            data-slot="textarea"
            className={cn(
                'flex field-sizing-content min-h-20 w-full rounded-field border border-base-content/20 bg-transparent px-3 py-2 text-base outline-none placeholder:text-base-content/60 focus-visible:border-base-content focus-visible:ring-1 focus-visible:ring-base-content disabled:cursor-not-allowed disabled:bg-base-content/10 disabled:opacity-50 aria-invalid:border-error aria-invalid:ring-error md:text-sm',
                className,
            )}
            {...props}
        />
    )
}

export { Textarea }

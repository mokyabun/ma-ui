import { cn } from '@/registry/ma/lib/utils'

function Skeleton({ className, ...props }: React.ComponentProps<'div'>) {
    return (
        <div
            data-slot="skeleton"
            className={cn('rounded-field bg-base-200', className)}
            {...props}
        />
    )
}

export { Skeleton }

import * as React from "react"
import { Input as InputPrimitive } from "@base-ui/react/input"

import { cn } from "@/registry/ma/lib/utils"

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <InputPrimitive
      type={type}
      data-slot="input"
      className={cn(
        "h-field w-full min-w-0 rounded-field border border-base-content/20 bg-transparent px-3 py-1 text-base outline-none file:inline-flex file:h-field-xs file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-base-content placeholder:text-base-content/60 focus-visible:border-base-content focus-visible:ring-1 focus-visible:ring-base-content disabled:pointer-events-none disabled:cursor-not-allowed disabled:bg-base-content/10 disabled:opacity-50 aria-invalid:border-error aria-invalid:ring-error md:text-sm",
        className
      )}
      {...props}
    />
  )
}

export { Input }

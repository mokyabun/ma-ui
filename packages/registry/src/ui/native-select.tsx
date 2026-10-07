import * as React from "react"
import { ChevronDownIcon } from "lucide-react"

import { cn } from "@/registry/ma/lib/utils"

type NativeSelectProps = Omit<React.ComponentProps<"select">, "size"> & {
  size?: "sm" | "default"
}

function NativeSelect({
  className,
  size = "default",
  ...props
}: NativeSelectProps) {
  return (
    <div
      className={cn(
        "group/native-select relative w-fit has-[select:disabled]:opacity-50",
        className
      )}
      data-slot="native-select-wrapper"
      data-size={size}
    >
      <select
        data-slot="native-select"
        data-size={size}
        className="h-field w-full min-w-0 appearance-none rounded-field border border-base-content/20 bg-transparent py-1 pr-9 pl-3 text-sm outline-none select-none selection:bg-primary selection:text-primary-content placeholder:text-base-content/60 focus-visible:border-base-content focus-visible:ring-1 focus-visible:ring-base-content disabled:pointer-events-none disabled:cursor-not-allowed aria-invalid:border-error aria-invalid:ring-error data-[size=sm]:h-field-sm data-[size=sm]:rounded-[min(var(--radius-field),10px)] data-[size=sm]:py-0.5"
        {...props}
      />
      <ChevronDownIcon
        className="pointer-events-none absolute top-1/2 right-3 size-4 -translate-y-1/2 text-base-content/60 select-none"
        aria-hidden="true"
        data-slot="native-select-icon"
      />
    </div>
  )
}

function NativeSelectOption({
  className,
  ...props
}: React.ComponentProps<"option">) {
  return (
    <option
      data-slot="native-select-option"
      className={cn("bg-[Canvas] text-[CanvasText]", className)}
      {...props}
    />
  )
}

function NativeSelectOptGroup({
  className,
  ...props
}: React.ComponentProps<"optgroup">) {
  return (
    <optgroup
      data-slot="native-select-optgroup"
      className={cn("bg-[Canvas] text-[CanvasText]", className)}
      {...props}
    />
  )
}

export { NativeSelect, NativeSelectOptGroup, NativeSelectOption }

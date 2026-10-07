import { describe, expect, test } from "bun:test"

import {
  mapColors,
  mapCssVars,
  mapRadius,
  mapSizes,
  mapStyleEntry,
  radiusKindOf,
  stripDarkVariants,
} from "./tokens"

describe("mapColors", () => {
  test("maps shadcn tokens to daisyUI tokens, keeping variants", () => {
    expect(
      mapColors(
        "bg-background text-foreground hover:bg-muted focus:text-accent-foreground"
      )
    ).toBe(
      "bg-base-100 text-base-content hover:bg-base-200 focus:text-base-content"
    )
  })

  test("combines built-in alpha with opacity modifiers", () => {
    expect(mapColors("text-muted-foreground")).toBe("text-base-content/60")
    expect(mapColors("border-input/30")).toBe("border-base-content/6")
    expect(mapColors("ring-ring/50")).toBe("ring-base-content/20")
  })

  test("leaves daisyUI tokens and unrelated classes alone", () => {
    const input =
      "bg-primary-content text-base-content bg-accent-content bg-red-500"
    expect(mapColors(input)).toBe(input)
  })
})

test("mapCssVars rewrites variables in arbitrary values", () => {
  expect(
    mapCssVars("bg-[color-mix(in_oklch,var(--secondary),var(--foreground)_5%)]")
  ).toBe(
    "bg-[color-mix(in_oklch,var(--color-base-200),var(--color-base-content)_5%)]"
  )
  expect(mapCssVars("w-(--sidebar-width)")).toBe("w-(--sidebar-width)")
})

test("stripDarkVariants removes dark: overrides", () => {
  expect(stripDarkVariants("bg-input/30 dark:bg-input/50 border")).toBe(
    "bg-input/30  border"
  )
})

describe("radius", () => {
  test("picks the radius kind from the part name", () => {
    expect(radiusKindOf("cn-button")).toBe("field")
    expect(radiusKindOf("cn-checkbox")).toBe("selector")
    expect(radiusKindOf("cn-card")).toBe("box")
    expect(radiusKindOf("cn-dropdown-menu-content")).toBe("box")
    expect(radiusKindOf("cn-dropdown-menu-item")).toBe("field")
    expect(radiusKindOf("cn-unknown-thing")).toBeUndefined()
  })

  test("rewrites sized radius classes, keeps full/none/sm", () => {
    expect(
      mapRadius("rounded-lg rounded-t-xl rounded-full rounded-sm", "box")
    ).toBe("rounded-box rounded-t-box rounded-full rounded-sm")
    expect(mapRadius("rounded-md rounded-2xl", undefined)).toBe(
      "rounded-field rounded-box"
    )
    expect(mapRadius("rounded-[4px]", "selector")).toBe("rounded-selector")
    expect(mapRadius("rounded-[4px]", "box")).toBe("rounded-[4px]")
    expect(mapRadius("rounded-[min(var(--radius-md),10px)]", "field")).toBe(
      "rounded-[min(var(--radius-field),10px)]"
    )
  })
})

test("mapSizes scales control heights with --size-field", () => {
  expect(mapSizes("cn-button-size-sm", "h-7 px-2 size-8")).toBe(
    "h-field-sm px-2 size-field"
  )
  expect(mapSizes("cn-select-trigger", "h-8")).toBe("h-field")
  expect(mapSizes("cn-select-content", "h-8")).toBe("h-8")
  expect(mapSizes("cn-checkbox", "size-4")).toBe("size-selector")
  expect(mapSizes("cn-card", "h-8")).toBe("h-8")
})

test("mapStyleEntry applies everything and normalizes whitespace", () => {
  expect(
    mapStyleEntry(
      "cn-input",
      "h-8 rounded-lg border-input dark:bg-input/30 bg-transparent"
    )
  ).toBe("h-field rounded-field border-base-content/20 bg-transparent")
})

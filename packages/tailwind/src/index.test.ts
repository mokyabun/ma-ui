import path from "node:path"
import { compile } from "@tailwindcss/node"
import { describe, expect, test } from "bun:test"

import { parseThemes } from "./index"

const src = import.meta.dir

async function build(css: string, candidates: string[]) {
  const compiler = await compile(`@import "tailwindcss";\n${css}`, {
    base: src,
    onDependency: () => {},
  })
  return compiler.build(candidates)
}

const pluginPath = path.join(src, "index.ts")
const themePluginPath = path.join(src, "theme.ts")

describe("parseThemes", () => {
  test("defaults to light + dark", () => {
    expect(parseThemes(undefined)).toEqual([
      { name: "light", isDefault: true, prefersDark: false },
      { name: "dark", isDefault: false, prefersDark: true },
    ])
  })

  test("accepts daisyUI-style comma list", () => {
    expect(parseThemes("dark --default, light")).toEqual([
      { name: "dark", isDefault: true, prefersDark: false },
      { name: "light", isDefault: false, prefersDark: false },
    ])
  })

  test("false disables built-in themes", () => {
    expect(parseThemes(false)).toEqual([])
  })
})

describe("plugin", () => {
  test("emits themes and token utilities", async () => {
    const css = await build(`@plugin "${pluginPath}";`, [
      "bg-base-100",
      "text-primary-content",
      "border-error/20",
      "rounded-box",
      "rounded-field",
      "rounded-selector",
      "h-field",
      "size-selector",
      "animate-accordion-down",
      "no-scrollbar",
    ])

    expect(css).toContain(
      ':where(:root),:root:has(input.theme-controller[value="light"]:checked),[data-theme="light"]'
    )
    expect(css).toContain("@media (prefers-color-scheme: dark)")
    expect(css).toContain('[data-theme="dark"]')
    expect(css).toMatch(
      /\.bg-base-100\s*{\s*background-color: var\(--color-base-100\)/
    )
    expect(css).toMatch(
      /\.rounded-box\s*{\s*border-radius: var\(--radius-box\)/
    )
    expect(css).toMatch(
      /\.h-field\s*{\s*height: calc\(var\(--size-field, 0\.25rem\) \* 10\)/
    )
    expect(css).toContain(
      "color-mix(in oklab, var(--color-error) 20%, transparent)"
    )
    expect(css).toContain("@keyframes accordion-down")
    expect(css).toContain("scrollbar-width: none")
  })

  test("state variants match Base UI and Radix attributes", async () => {
    const css = await build(`@plugin "${pluginPath}";`, ["data-open:block"])
    expect(css).toContain('[data-state="open"]')
    expect(css).toContain('[data-open]:not([data-open="false"])')
  })

  test("theme plugin defines and extends themes", async () => {
    const css = await build(
      `@plugin "${pluginPath}" { themes: false; }
       @plugin "${themePluginPath}" { name: "brand"; default: true; color-scheme: light; --color-primary: oklch(55% 0.2 260); }
       @plugin "${themePluginPath}" { name: "dark"; --radius-box: 1rem; }`,
      ["bg-primary"]
    )
    expect(css).toContain('[data-theme="brand"]')
    expect(css).toContain("--color-primary: oklch(55% 0.2 260)")
    // Extending a built-in keeps its other tokens.
    expect(css).toContain("--color-base-100: oklch(14.5% 0 0)")
    expect(css).toContain("--radius-box: 1rem")
    expect(css).not.toContain('[data-theme="light"]')
  })
})

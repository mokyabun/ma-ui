/**
 * shadcn → ma-ui (daisyUI-style) token mapping.
 *
 * Used by `scripts/shadcn-import.ts` when pulling components from upstream.
 * Kept separate so it can be unit tested and tweaked in one place.
 */

type ColorTarget = { color: string; alpha?: number }

/** shadcn semantic color → daisyUI token (optionally with an opacity). */
export const COLOR_MAP: Record<string, ColorTarget> = {
  background: { color: "base-100" },
  foreground: { color: "base-content" },
  card: { color: "base-100" },
  "card-foreground": { color: "base-content" },
  popover: { color: "base-100" },
  "popover-foreground": { color: "base-content" },
  primary: { color: "primary" },
  "primary-foreground": { color: "primary-content" },
  secondary: { color: "base-200" },
  "secondary-foreground": { color: "base-content" },
  muted: { color: "base-200" },
  "muted-foreground": { color: "base-content", alpha: 60 },
  accent: { color: "base-200" },
  "accent-foreground": { color: "base-content" },
  destructive: { color: "error" },
  "destructive-foreground": { color: "error-content" },
  border: { color: "base-content", alpha: 10 },
  input: { color: "base-content", alpha: 20 },
  ring: { color: "base-content", alpha: 40 },
  sidebar: { color: "base-200" },
  "sidebar-foreground": { color: "base-content" },
  "sidebar-primary": { color: "primary" },
  "sidebar-primary-foreground": { color: "primary-content" },
  "sidebar-accent": { color: "base-300" },
  "sidebar-accent-foreground": { color: "base-content" },
  "sidebar-border": { color: "base-content", alpha: 10 },
  "sidebar-ring": { color: "base-content", alpha: 40 },
}

const COLOR_UTILITIES = [
  "bg",
  "text",
  "border",
  "border-x",
  "border-y",
  "border-t",
  "border-r",
  "border-b",
  "border-l",
  "border-s",
  "border-e",
  "ring",
  "ring-offset",
  "inset-ring",
  "outline",
  "fill",
  "stroke",
  "from",
  "via",
  "to",
  "divide",
  "placeholder",
  "caret",
  "decoration",
  "shadow",
]

const byLengthDesc = (a: string, b: string) => b.length - a.length
const TOKEN_PATTERN = Object.keys(COLOR_MAP).sort(byLengthDesc).join("|")
const UTILITY_PATTERN = [...COLOR_UTILITIES].sort(byLengthDesc).join("|")

// A class boundary: start, whitespace, quote, `:` (after a variant), `!`, `(`.
const BOUNDARY = "(?<=^|[\\s\"'`:!(])"

const COLOR_RE = new RegExp(
  `${BOUNDARY}(${UTILITY_PATTERN})-(${TOKEN_PATTERN})(?:/(\\d+))?(?![\\w-])`,
  "g"
)

export function mapColors(input: string) {
  return input.replace(
    COLOR_RE,
    (_, utility: string, token: string, mod?: string) => {
      const target = COLOR_MAP[token]!
      const modifier = mod === undefined ? undefined : Number(mod)
      const alpha =
        target.alpha === undefined
          ? modifier
          : Math.round((target.alpha * (modifier ?? 100)) / 100)
      return `${utility}-${target.color}${alpha === undefined ? "" : `/${alpha}`}`
    }
  )
}

const CSS_VAR_RE = new RegExp(`var\\(--(?:color-)?(${TOKEN_PATTERN})\\)`, "g")

/** `var(--muted)` / `var(--color-muted)` inside arbitrary values. */
export function mapCssVars(input: string) {
  return input.replace(CSS_VAR_RE, (_, token: string) => {
    const target = COLOR_MAP[token]!
    const value = `var(--color-${target.color})`
    return target.alpha === undefined
      ? value
      : `color-mix(in_oklab,${value}_${target.alpha}%,transparent)`
  })
}

/** Theme-driven dark mode replaces `dark:` overrides, so drop them. */
export function stripDarkVariants(input: string) {
  return input.replace(new RegExp(`${BOUNDARY}dark:[^\\s"'\`]+`, "g"), "")
}

export type RadiusKind = "selector" | "field" | "box"

const SELECTOR_COMPONENTS = ["checkbox", "radio-group", "badge", "kbd"]
const FIELD_COMPONENTS = [
  "button",
  "button-group",
  "input",
  "input-group",
  "input-otp",
  "native-select",
  "textarea",
  "toggle",
  "toggle-group",
  "tabs",
  "pagination",
]
const BOX_COMPONENTS = [
  "accordion",
  "alert",
  "alert-dialog",
  "calendar",
  "card",
  "combobox",
  "command",
  "context-menu",
  "dialog",
  "drawer",
  "dropdown-menu",
  "empty",
  "hover-card",
  "item",
  "menubar",
  "navigation-menu",
  "popover",
  "select",
  "sheet",
  "sidebar",
  "table",
  "toast",
  "tooltip",
]
const ALL_COMPONENTS = [
  ...SELECTOR_COMPONENTS,
  ...FIELD_COMPONENTS,
  ...BOX_COMPONENTS,
].sort(byLengthDesc)

/** `cn-dropdown-menu-item` → `dropdown-menu` */
export function componentOf(part: string) {
  const name = part.replace(/^cn-/, "")
  return ALL_COMPONENTS.find((c) => name === c || name.startsWith(`${c}-`))
}

/** Decide which radius token a `cn-*` part should use. */
export function radiusKindOf(part: string): RadiusKind | undefined {
  const name = part.replace(/^cn-/, "")
  if (/-(content|popup|positioner|viewport)(-|$)/.test(name)) return "box"
  if (/-(item|trigger|input|chip|chips|link|slot|day|button)(-|$)/.test(name))
    return "field"
  const component = componentOf(part)
  if (!component) return undefined
  if (SELECTOR_COMPONENTS.includes(component)) return "selector"
  if (FIELD_COMPONENTS.includes(component)) return "field"
  return "box"
}

const RADIUS_RE = new RegExp(
  `${BOUNDARY}rounded(-(?:[trbl]|[se]|[tb][lr]|[se][se]))?-(md|lg|xl|2xl|3xl|4xl|\\[\\d+px\\])(?![\\w-])`,
  "g"
)

export function mapRadius(classes: string, kind: RadiusKind | undefined) {
  return classes
    .replace(RADIUS_RE, (match, side = "", size: string) => {
      const isArbitrary = size.startsWith("[")
      // Arbitrary pixel radii are only tokenized on selector-type controls (checkbox).
      if (isArbitrary && kind !== "selector") return match
      const target = kind ?? (["md", "lg"].includes(size) ? "field" : "box")
      return `rounded${side}-${target}`
    })
    .replace(
      /var\(--radius-(?:xs|sm|md|lg|xl|2xl|3xl|4xl)\)/g,
      `var(--radius-${kind ?? "field"})`
    )
    .replace(/var\(--radius\)/g, "var(--radius-field)")
}

const FIELD_SIZE_COMPONENTS = [
  "button",
  "input",
  "input-group",
  "native-select",
  "toggle",
  "toggle-group",
]
const FIELD_SIZE_PARTS = /-(trigger|chips|input|slot)(-|$)/
const FIELD_HEIGHTS: Record<string, string> = {
  "6": "field-xs",
  "7": "field-sm",
  "8": "field",
  "9": "field-lg",
  "10": "field-xl",
}

/** Control heights scale with the theme's `--size-field` / `--size-selector`. */
export function mapSizes(part: string, classes: string) {
  const component = componentOf(part)
  const name = part.replace(/^cn-/, "")

  if (component === "checkbox" || name === "radio-group-item") {
    return classes.replace(
      new RegExp(`${BOUNDARY}size-4(?![\\w.-])`, "g"),
      "size-selector"
    )
  }

  const isField =
    (component && FIELD_SIZE_COMPONENTS.includes(component)) ||
    (component &&
      ["select", "combobox", "input-otp"].includes(component) &&
      FIELD_SIZE_PARTS.test(name))
  if (!isField) return classes

  return classes.replace(
    new RegExp(`${BOUNDARY}(h|size|min-h)-(6|7|8|9|10)(?![\\w.-])`, "g"),
    (_, utility: string, n: string) => `${utility}-${FIELD_HEIGHTS[n]}`
  )
}

/** Apply all class-level mappings to one style-map entry. */
export function mapStyleEntry(part: string, classes: string) {
  let out = stripDarkVariants(classes)
  out = mapRadius(out, radiusKindOf(part))
  out = mapSizes(part, out)
  out = mapColors(mapCssVars(out))
  return out.replace(/\s+/g, " ").trim()
}

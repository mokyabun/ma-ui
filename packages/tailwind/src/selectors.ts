/** Escape a theme name for use inside a CSS attribute selector string. */
function escapeName(name: string) {
  return name.replace(
    /[^a-zA-Z0-9_-]/gu,
    (character) => `\\${character.codePointAt(0)!.toString(16)} `
  )
}

/**
 * Selector that activates a theme. Mirrors daisyUI so that both
 * `data-theme="x"` and `<input class="theme-controller" value="x">` work.
 */
export function themeSelector(
  name: string,
  { root = ":root", isDefault = false } = {}
) {
  const escaped = escapeName(name)
  const selector = `${root}:has(input.theme-controller[value="${escaped}"]:checked),[data-theme="${escaped}"]`
  return isDefault ? `:where(${root}),${selector}` : selector
}

/** Selector used inside `prefers-color-scheme: dark` for the `--prefersdark` theme. */
export function prefersDarkSelector(root = ":root") {
  return `${root}:not([data-theme])`
}

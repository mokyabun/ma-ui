import { withThemeByDataAttribute } from "@storybook/addon-themes"
import type { Preview } from "@storybook/react-vite"

import "../src/styles.css"

const preview: Preview = {
  decorators: [
    // Same mechanism apps use: `data-theme` on <html>.
    withThemeByDataAttribute({
      themes: { light: "light", dark: "dark" },
      defaultTheme: "light",
      attributeName: "data-theme",
      parentSelector: "html",
    }),
  ],
  parameters: {
    layout: "centered",
    // Theme tokens own the canvas color.
    backgrounds: { disable: true },
    controls: {
      matchers: { color: /(background|color)$/i, date: /Date$/i },
      sort: "requiredFirst",
    },
    a11y: { test: "todo" },
  },
  tags: ["autodocs"],
}

export default preview

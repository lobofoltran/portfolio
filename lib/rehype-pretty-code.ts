import type { Options } from "rehype-pretty-code"

export const rehypePrettyCodeOptions: Options = {
  theme: {
    light: "github-light",
    dark: "github-dark",
  },
  keepBackground: false,
  defaultLang: "ts",

  onVisitLine(node) {
    if (!node.children || node.children.length === 0) {
      node.children = [{ type: "text", value: " " }]
    }
  },

  onVisitHighlightedLine(node) {
    const className = node.properties?.className

    if (Array.isArray(className)) {
      className.push("line--highlighted")
    } else {
      node.properties = {
        ...node.properties,
        className: ["line--highlighted"],
      }
    }
  },
}

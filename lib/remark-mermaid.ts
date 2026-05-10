import type { Root, Code, Parent } from "mdast"
import { visit } from "unist-util-visit"

/**
 * Replaces fenced code blocks tagged as `mermaid` with a `<Mermaid code="..." />`
 * MDX JSX element. Runs *before* rehype-pretty-code so the source is preserved
 * verbatim and not turned into syntax-highlighted HTML.
 */
export function remarkMermaid() {
  return (tree: Root) => {
    visit(tree, "code", (node: Code, index, parent) => {
      if (node.lang !== "mermaid" || !parent || index == null) return

      const jsxNode = {
        type: "mdxJsxFlowElement",
        name: "Mermaid",
        attributes: [
          {
            type: "mdxJsxAttribute",
            name: "code",
            value: node.value,
          },
        ],
        children: [],
      } as unknown as Parent["children"][number]

      ;(parent as Parent).children[index] = jsxNode
    })
  }
}

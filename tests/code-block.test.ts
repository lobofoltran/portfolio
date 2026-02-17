import { describe, expect, it } from "vitest"

import { extractCodeText } from "@/components/blog/code-block"

describe("code block", () => {
  it("extracts text from nested node shape", () => {
    const node = {
      props: {
        children: [
          "const a = 1;\n",
          { props: { children: "console.log(a);" } },
        ],
      },
    }

    expect(extractCodeText(node)).toBe("const a = 1;\nconsole.log(a);")
  })
})

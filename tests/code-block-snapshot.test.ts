import { describe, expect, it } from "vitest"

import { resolveCodeLanguage } from "@/components/blog/code-block"

describe("code block language badge", () => {
  it("resolves from className", () => {
    expect(resolveCodeLanguage("language-typescript")).toMatchInlineSnapshot('"TYPESCRIPT"')
  })

  it("prefers data-language", () => {
    expect(resolveCodeLanguage("language-bash", "go")).toMatchInlineSnapshot('"GO"')
  })
})

import { describe, expect, it } from "vitest"

import { parsePostFile } from "@/lib/posts"

describe("post parsing", () => {
  it("parses categories and cover", () => {
    const post = parsePostFile(
      "sample",
      `---\ntitle: Sample\nexcerpt: Description\ndate: 2026-01-01\ncategories:\n  - Distributed Systems\ncover: /blog/sample.png\n---\ncontent`
    )

    expect(post.title).toBe("Sample")
    expect(post.categories).toEqual(["Distributed Systems"])
    expect(post.cover).toBe("/blog/sample.png")
  })

  it("fails when cover is missing", () => {
    expect(() =>
      parsePostFile(
        "invalid",
        `---\ntitle: Invalid\nexcerpt: Description\ndate: 2026-01-01\ncategories:\n  - Observability\n---\ncontent`
      )
    ).toThrowError("missing required frontmatter field: cover")
  })
})

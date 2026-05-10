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

  it("fails when excerpt is missing", () => {
    expect(() =>
      parsePostFile(
        "invalid",
        `---\ntitle: Invalid\ndate: 2026-01-01\ncategories:\n  - Observability\ncover: /blog/invalid.png\n---\ncontent`
      )
    ).toThrowError("missing required frontmatter field: excerpt")
  })

  it("falls back to description when excerpt is absent", () => {
    const post = parsePostFile(
      "legacy",
      `---\ntitle: Legacy\ndescription: Legacy description\ndate: 2026-01-01\ncategories:\n  - Observability\ncover: /blog/legacy.png\n---\ncontent`
    )

    expect(post.excerpt).toBe("Legacy description")
  })
})

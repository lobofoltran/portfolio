import { describe, expect, it } from "vitest"

import {
  categoryToSlug,
  filterPostsByCategory,
  getAdjacentPosts,
  getAllCategories,
  getSelectedCategoryFromSearchParams,
  slugToCategory,
} from "@/lib/blog"
import type { Post } from "@/lib/posts"

const posts: Post[] = [
  {
    slug: "a",
    title: "A",
    excerpt: "",
    date: "2026-01-03",
    updated: null,
    categories: ["Distributed Systems"],
    tags: [],
    cover: "/blog/placeholder.svg",
    content: "",
    readTimeMinutes: 2,
    author: "Gustavo Lobo",
  },
  {
    slug: "b",
    title: "B",
    excerpt: "",
    date: "2026-01-02",
    updated: null,
    categories: ["Databases", "Scalability"],
    tags: [],
    cover: "/blog/placeholder.svg",
    content: "",
    readTimeMinutes: 3,
    author: "Gustavo Lobo",
  },
  {
    slug: "c",
    title: "C",
    excerpt: "",
    date: "2026-01-01",
    updated: null,
    categories: ["Observability"],
    tags: [],
    cover: "/blog/placeholder.svg",
    content: "",
    readTimeMinutes: 1,
    author: "Gustavo Lobo",
  },
]

describe("blog utilities", () => {
  it("builds stable category slugs", () => {
    expect(categoryToSlug("Domain-Driven Design")).toBe("domain-driven-design")
  })

  it("derives unique categories", () => {
    expect(getAllCategories(posts)).toEqual([
      "Databases",
      "Distributed Systems",
      "Observability",
      "Scalability",
    ])
  })

  it("resolves category slug back to category label", () => {
    expect(slugToCategory("distributed-systems", getAllCategories(posts))).toBe(
      "Distributed Systems"
    )
  })

  it("filters posts by category", () => {
    const filtered = filterPostsByCategory(posts, "Databases")
    expect(filtered.map((post) => post.slug)).toEqual(["b"])
  })

  it("resolves next/previous posts", () => {
    expect(getAdjacentPosts(posts, "b")).toMatchObject({
      previous: { slug: "c" },
      next: { slug: "a" },
    })
  })

  it("reads category from URLSearchParams", () => {
    const params = new URLSearchParams("category=distributed-systems")
    expect(getSelectedCategoryFromSearchParams(params)).toBe("distributed-systems")
  })
})

import type { Post } from "@/lib/posts"

export function normalizeCategory(value: string): string {
  return value.trim().toLowerCase()
}

export function categoryToSlug(category: string): string {
  return normalizeCategory(category)
    .replace(/&/g, "and")
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
}

export function slugToCategory(slug: string, categories: string[]): string | null {
  const match = categories.find((category) => categoryToSlug(category) === slug)

  return match ?? null
}

export function getSelectedCategoryFromSearchParams(searchParams: URLSearchParams): string | null {
  const category = searchParams.get("category")

  return category && category.length > 0 ? category : null
}

export function getAllCategories(posts: Post[]): string[] {
  const unique = new Set<string>()

  for (const post of posts) {
    for (const category of post.categories) {
      unique.add(category)
    }
  }

  return Array.from(unique).sort((a, b) => a.localeCompare(b))
}

export function filterPostsByCategory(posts: Post[], category?: string | null): Post[] {
  if (!category) {
    return posts
  }

  const normalizedCategory = normalizeCategory(category)

  return posts.filter((post) =>
    post.categories.some((item) => normalizeCategory(item) === normalizedCategory)
  )
}

export function getAdjacentPosts(posts: Post[], slug: string): {
  previous: Post | null
  next: Post | null
} {
  const index = posts.findIndex((post) => post.slug === slug)

  if (index === -1) {
    return {
      previous: null,
      next: null,
    }
  }

  return {
    previous: posts[index + 1] ?? null,
    next: posts[index - 1] ?? null,
  }
}

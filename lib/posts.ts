import fs from "fs"
import path from "path"
import matter from "gray-matter"

export type Post = {
  slug: string
  title: string
  excerpt: string
  date: string
  categories: string[]
  cover: string
  content: string
  readTimeMinutes: number
  author: string
}

type Frontmatter = {
  title?: string
  description?: string
  excerpt?: string
  date?: string
  categories?: string[] | string
  category?: string[] | string
  cover?: string
}

const POSTS_PATH = path.join(process.cwd(), "content/blog")

export function parsePostFile(slug: string, source: string): Post {
  const { data, content } = matter(source)
  const frontmatter = data as Frontmatter

  if (!frontmatter.cover || typeof frontmatter.cover !== "string") {
    throw new Error(`Post ${slug} is missing required frontmatter field: cover`)
  }

  const categoriesSource = frontmatter.categories ?? frontmatter.category ?? []
  const categories = Array.isArray(categoriesSource)
    ? categoriesSource
    : categoriesSource
      ? [categoriesSource]
      : []

  return {
    slug,
    title: frontmatter.title ?? slug,
    excerpt: frontmatter.excerpt ?? frontmatter.description ?? "",
    date: frontmatter.date ?? new Date(0).toISOString(),
    categories,
    cover: frontmatter.cover,
    content,
    readTimeMinutes: estimateReadTime(content),
    author: "Gustavo Lobo",
  }
}

export function getAllPosts(): Post[] {
  return fs
    .readdirSync(POSTS_PATH)
    .filter((file) => file.endsWith(".mdx"))
    .map((file) => {
      const filePath = path.join(POSTS_PATH, file)
      const source = fs.readFileSync(filePath, "utf-8")
      const slug = file.replace(".mdx", "")

      return parsePostFile(slug, source)
    })
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
}

export function getPostBySlug(slug: string): Post | null {
  const filePath = path.join(POSTS_PATH, `${slug}.mdx`)

  if (!fs.existsSync(filePath)) {
    return null
  }

  const source = fs.readFileSync(filePath, "utf-8")

  return parsePostFile(slug, source)
}

function estimateReadTime(content: string): number {
  const words = content.trim().split(/\s+/).filter(Boolean).length

  return Math.max(1, Math.ceil(words / 220))
}

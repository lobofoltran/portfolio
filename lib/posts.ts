import fs from "fs"
import path from "path"
import matter from "gray-matter"

export type Post = {
  slug: string
  title: string
  description: string
  date: string
  tags?: string[]
  content: string
}

const POSTS_PATH = path.join(process.cwd(), "content/blog")

export function getAllPosts(): Post[] {
  return fs.readdirSync(POSTS_PATH).map((file) => {
    const filePath = path.join(POSTS_PATH, file)
    const source = fs.readFileSync(filePath, "utf-8")
    const { data, content } = matter(source)

    return {
      slug: file.replace(".mdx", ""),
      title: data.title,
      description: data.description,
      date: data.date,
      tags: data.tags ?? [],
      content
    }
  })
  .sort(
    (a, b) =>
      new Date(b.date).getTime() - new Date(a.date).getTime()
  )
}

export function getPostBySlug(slug: string): Post {
  const filePath = path.join(POSTS_PATH, `${slug}.mdx`)
  const source = fs.readFileSync(filePath, "utf-8")
  const { data, content } = matter(source)

  return {
    slug,
    title: data.title,
    description: data.description,
    date: data.date,
    tags: data.tags ?? [],
    content
  }
}

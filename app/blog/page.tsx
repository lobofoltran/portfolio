import { Metadata } from "next"

import { getAllPosts } from "@/lib/posts"
import { getAllCategories } from "@/lib/blog"
import { BlogList } from "@/components/blog/blog-list"

export const metadata: Metadata = {
  title: "Blog — Gustavo Lobo | Backend & Distributed Systems",
  description:
    "Technical articles on backend engineering, distributed systems, Domain-Driven Design, event-driven architectures, and operating reliable systems in production.",
}

export default function BlogPage() {
  const posts = getAllPosts()
  const allCategories = getAllCategories(posts)

  return (
    <main className="mx-auto max-w-4xl px-6 pt-5 pb-16">
      <header className="mb-10 space-y-4">
        <h1 className="text-3xl font-semibold tracking-tight">Blog</h1>
        <p className="text-muted-foreground">
          Writing about software engineering, architecture, and lessons learned from real systems.
        </p>

      </header>

      <BlogList posts={posts} categories={allCategories} />
    </main>
  )
}

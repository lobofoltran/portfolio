import Link from "next/link"
import { Metadata } from "next"

import { getAllPosts } from "@/lib/posts"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export const metadata: Metadata = {
  title: "Blog — Gustavo Lobo | Backend & Distributed Systems",
  description:
    "Technical articles on backend engineering, distributed systems, Domain-Driven Design, event-driven architectures, and operating reliable systems in production."
}

export default function BlogPage() {
  const posts = getAllPosts()

  return (
    <main className="mx-auto max-w-3xl px-6 py-16">
      <header className="mb-12 space-y-2">
        <h1 className="text-3xl font-semibold tracking-tight">
          Blog
        </h1>
        <p className="text-muted-foreground">
          Writing about software engineering, architecture, and lessons learned
          from real systems.
        </p>
      </header>

      <section className="space-y-6">
        {posts.map((post) => (
          <Card key={post.slug}>
            <CardHeader>
              <CardTitle className="text-lg">
                <Link
                  href={`/blog/${post.slug}`}
                  className="hover:underline"
                >
                  {post.title}
                </Link>
              </CardTitle>
              <p className="text-sm text-muted-foreground">
                {new Date(post.date).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric"
                })}
              </p>
            </CardHeader>

            <CardContent>
              <p className="text-sm text-muted-foreground">
                {post.description}
              </p>
            </CardContent>
          </Card>
        ))}
      </section>
    </main>
  )
}

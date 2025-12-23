import { notFound } from "next/navigation"
import { Metadata } from "next"
import { MDXRemote } from "next-mdx-remote/rsc"
import { mdxComponents } from "@/components/mdx-components"
import { getAllPosts, getPostBySlug } from "@/lib/posts"
import rehypePrettyCode from "rehype-pretty-code"
import { rehypePrettyCodeOptions } from "@/lib/rehype-pretty-code"

type Props = {
    params: Promise<{
        slug: string
    }>
}

/* ---------- SSG ---------- */
export async function generateStaticParams() {
    return getAllPosts().map((post) => ({
        slug: post.slug
    }))
}

/* ---------- SEO ---------- */
export async function generateMetadata(
  { params }: Props
): Promise<Metadata> {
  const { slug } = await params
  const post = getPostBySlug(slug)

  if (!post) return {}

  return {
    title: `${post.title} — Gustavo Lobo`,
    description: post.description,

    authors: [{ name: "Gustavo Lobo" }],

    openGraph: {
      title: post.title,
      description: post.description,
      type: "article",
      publishedTime: post.date,
      authors: ["Gustavo Lobo"]
    }
  }
}

/* ---------- PAGE ---------- */
export default async function BlogPostPage({ params }: Props) {
    const { slug } = await params
    const post = getPostBySlug(slug)

    if (!post) notFound()

    return (
        <main className="mx-auto max-w-3xl px-6 py-16">
            <article className="space-y-8">
                <header className="space-y-2">
                    <h1 className="text-3xl font-semibold tracking-tight">
                        {post.title}
                    </h1>

                    <p className="text-sm text-muted-foreground">
                        {new Date(post.date).toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "long",
                            day: "numeric"
                        })}
                    </p>
                </header>

                <div className="max-w-none">
                    <MDXRemote
                        source={post.content}
                        components={mdxComponents}
                        options={{
                            mdxOptions: {
                                rehypePlugins: [
                                    [rehypePrettyCode, rehypePrettyCodeOptions]
                                ]
                            }
                        }}
                    />
                </div>
            </article>
        </main>
    )
}

import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { Metadata } from "next"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { MDXRemote } from "next-mdx-remote/rsc"
import rehypePrettyCode from "rehype-pretty-code"
import remarkUnwrapImages from "remark-unwrap-images"
import { BackToBlogLink } from "@/components/blog/back-to-blog-link"
import { Card, CardContent } from "@/components/ui/card"
import { mdxComponents } from "@/components/mdx-components"
import { getAdjacentPosts } from "@/lib/blog"
import { getAllPosts, getPostBySlug } from "@/lib/posts"
import { rehypePrettyCodeOptions } from "@/lib/rehype-pretty-code"
import { ZoomImage } from "@/components/blog/zoom-image"

type Props = {
  params: Promise<{
    slug: string
  }>
}

export async function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const post = getPostBySlug(slug)

  if (!post) return {}

  return {
    title: `${post.title} — Gustavo Lobo`,
    description: post.excerpt,
    authors: [{ name: "Gustavo Lobo" }],
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      publishedTime: post.date,
      authors: ["Gustavo Lobo"],
      images: [{ url: post.cover, width: 1200, height: 675, alt: post.title }],
    },
  }
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params
  const post = getPostBySlug(slug)

  if (!post) notFound()

  const allPosts = getAllPosts()
  const { previous, next } = getAdjacentPosts(allPosts, slug)

  return (
    <main className="mx-auto max-w-4xl px-6 pt-5 pb-16">
      <article className="space-y-8">
        <header className="space-y-4">
          <BackToBlogLink />

          <h1 className="text-3xl font-semibold tracking-tight">{post.title}</h1>

          <p className="text-sm text-muted-foreground">
            {post.author} · {new Date(post.date).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })} · {post.readTimeMinutes} min read
          </p>

          <ZoomImage
            src={post.cover}
            alt={post.title}
          />
        </header>

        <div className="mdx-content mx-auto max-w-3xl">
          <MDXRemote
            source={post.content}
            components={mdxComponents}
            options={{
              mdxOptions: {
                remarkPlugins: [
                  remarkUnwrapImages
                ],
                rehypePlugins: [
                  [rehypePrettyCode, rehypePrettyCodeOptions]
                ],
              },
            }} />
        </div>
      </article>

      {(previous || next) ? (
        <nav className="mt-12 grid gap-4 border-t pt-6 md:grid-cols-2">
          {previous ? (
            <Link href={`/blog/${previous.slug}`} className="block">
              <Card className="h-full py-0">
                <CardContent className="space-y-2 py-5">
                  <p className="inline-flex items-center text-xs uppercase tracking-wide text-muted-foreground">
                    <ChevronLeft className="mr-1 size-4" /> Previous
                  </p>
                  <p className="font-medium leading-snug">{previous.title}</p>
                  <p className="line-clamp-1 text-sm text-muted-foreground">{previous.excerpt}</p>
                </CardContent>
              </Card>
            </Link>
          ) : (
            <div />
          )}

          {next ? (
            <Link href={`/blog/${next.slug}`} className="block">
              <Card className="h-full py-0">
                <CardContent className="space-y-2 py-5 text-left md:text-right">
                  <p className="inline-flex items-center text-xs uppercase tracking-wide text-muted-foreground md:justify-end">
                    Next <ChevronRight className="ml-1 size-4" />
                  </p>
                  <p className="font-medium leading-snug">{next.title}</p>
                  <p className="line-clamp-1 text-sm text-muted-foreground">{next.excerpt}</p>
                </CardContent>
              </Card>
            </Link>
          ) : (
            <div />
          )}
        </nav>
      ) : null}
    </main>
  )
}

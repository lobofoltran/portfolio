import Link from "next/link"
import { notFound } from "next/navigation"
import { Metadata } from "next"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { MDXRemote } from "next-mdx-remote/rsc"
import rehypePrettyCode from "rehype-pretty-code"
import remarkGfm from "remark-gfm"
import remarkUnwrapImages from "remark-unwrap-images"
import { BackToBlogLink } from "@/components/blog/back-to-blog-link"
import { TableOfContents } from "@/components/blog/table-of-contents"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { mdxComponents } from "@/components/mdx-components"
import { categoryToSlug, getAdjacentPosts } from "@/lib/blog"
import { getAllPosts, getPostBySlug } from "@/lib/posts"
import { rehypePrettyCodeOptions } from "@/lib/rehype-pretty-code"
import { remarkMermaid } from "@/lib/remark-mermaid"
import { absoluteUrl, SITE_NAME, SITE_TWITTER, SITE_URL } from "@/lib/site"
import { extractToc } from "@/lib/toc"
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

  const url = `/blog/${post.slug}`
  const keywords = [...post.categories, ...post.tags]
  const coverAbsolute = absoluteUrl(post.cover)

  return {
    title: post.title,
    description: post.excerpt,
    keywords: keywords.length > 0 ? keywords : undefined,
    authors: [{ name: SITE_NAME, url: SITE_URL }],
    alternates: {
      canonical: url,
      types: {
        "application/rss+xml": [{ url: "/rss.xml", title: `${SITE_NAME} — Blog` }],
      },
    },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      url,
      siteName: SITE_NAME,
      type: "article",
      publishedTime: post.date,
      modifiedTime: post.updated ?? post.date,
      authors: [SITE_NAME],
      tags: keywords,
      images: [
        {
          url: coverAbsolute,
          width: 1200,
          height: 675,
          alt: post.title,
          type: "image/png",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
      creator: SITE_TWITTER,
      images: [coverAbsolute],
    },
  }
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params
  const post = getPostBySlug(slug)

  if (!post) notFound()

  const allPosts = getAllPosts()
  const { previous, next } = getAdjacentPosts(allPosts, slug)
  const tocItems = extractToc(post.content)

  return (
    <main className="mx-auto max-w-3xl px-6 py-16">
      <div className="mb-8">
        <BackToBlogLink />
      </div>

      <article className="space-y-6">
        <header className="space-y-4">
          {post.categories.length > 0 ? (
            <div className="flex flex-wrap gap-2">
              {post.categories.map((category) => (
                <Badge asChild key={category} variant="outline" className="px-3 py-1 text-xs">
                  <Link href={{ pathname: "/blog", query: { category: categoryToSlug(category) } }}>
                    {category}
                  </Link>
                </Badge>
              ))}
            </div>
          ) : null}

          <h1 className="text-3xl font-semibold tracking-tight md:text-4xl">{post.title}</h1>

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

        <div className="mdx-content">
          <MDXRemote
            source={post.content}
            components={mdxComponents}
            options={{
              mdxOptions: {
                remarkPlugins: [
                  remarkMermaid,
                  remarkGfm,
                  remarkUnwrapImages
                ],
                rehypePlugins: [
                  [rehypePrettyCode, rehypePrettyCodeOptions]
                ],
              },
            }} />
        </div>
      </article>

      {/* Sticky TOC on xl+ screens — fixed-positioned outside the article column */}
      {tocItems.length > 1 ? (
        <aside
          aria-label="Article navigation"
          className="pointer-events-none fixed right-[max(1.5rem,calc(50%-40rem))] top-24 hidden w-56 xl:block"
        >
          <div className="pointer-events-auto max-h-[calc(100vh-8rem)] overflow-y-auto pr-2">
            <TableOfContents items={tocItems} />
          </div>
        </aside>
      ) : null}

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

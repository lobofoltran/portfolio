"use client"

import Image from "next/image"
import Link from "next/link"
import { useSearchParams } from "next/navigation"

import { CategoryFilter } from "@/components/blog/category-filter"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  filterPostsByCategory,
  getSelectedCategoryFromSearchParams,
  slugToCategory,
} from "@/lib/blog"
import type { Post } from "@/lib/posts"

type BlogListProps = {
  posts: Post[]
  categories: string[]
}

export function BlogList({ posts, categories }: BlogListProps) {
  const searchParams = useSearchParams()
  const categoryParam = getSelectedCategoryFromSearchParams(searchParams)
  const selectedCategory = categoryParam ? slugToCategory(categoryParam, categories) : null
  const filteredPosts = filterPostsByCategory(posts, selectedCategory)

  const featured = filteredPosts[0]
  const gridPosts = filteredPosts.slice(1)

  return (
    <div className="space-y-8">
      <CategoryFilter categories={categories} selectedCategory={selectedCategory ?? undefined} />

      {featured ? (
        <Link
          href={{
            pathname: `/blog/${featured.slug}`,
            query: categoryParam ? { category: categoryParam } : {},
          }}
          className="block"
        >
          <Card className="overflow-hidden py-0">
            <div className="grid gap-0 md:grid-cols-2">
              <div className="relative aspect-video md:aspect-auto md:min-h-[320px]">
                <Image
                  src={featured.cover}
                  alt={featured.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover"
                />
              </div>

              <div className="flex h-full items-center">
                <CardContent className="space-y-4 py-6 md:py-8">
                  <h2 className="text-2xl font-semibold tracking-tight">{featured.title}</h2>
                  <p className="line-clamp-3 text-sm text-muted-foreground">{featured.excerpt}</p>
                  <p className="text-xs text-muted-foreground">
                    {featured.author} · {new Date(featured.date).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })} · {featured.readTimeMinutes} min read
                  </p>
                  <p className="text-sm font-medium">Read</p>
                </CardContent>
              </div>
            </div>
          </Card>
        </Link>
      ) : null}

      <section className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {gridPosts.map((post) => (
          <Link
            key={post.slug}
            href={{
              pathname: `/blog/${post.slug}`,
              query: categoryParam ? { category: categoryParam } : {},
            }}
            className="block"
          >
            <Card className="h-full overflow-hidden py-0">
              <div className="relative aspect-video border-b">
                <Image
                  src={post.cover}
                  alt={post.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover"
                />
              </div>

              <CardHeader className="space-y-2 pt-5">
                <CardTitle className="line-clamp-2 text-base leading-snug">{post.title}</CardTitle>
                <p className="line-clamp-2 text-sm text-muted-foreground">{post.excerpt}</p>
              </CardHeader>

              <CardContent className="pb-5">
                <p className="text-xs text-muted-foreground">
                  {new Date(post.date).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })} · {post.readTimeMinutes} min read
                </p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </section>
    </div>
  )
}

"use client"

import Link from "next/link"

import { Badge } from "@/components/ui/badge"
import { categoryToSlug } from "@/lib/blog"
import { cn } from "@/lib/utils"

type CategoryFilterProps = {
  categories: string[]
  selectedCategory?: string
}

export function CategoryFilter({ categories, selectedCategory }: CategoryFilterProps) {
  const items = [
    { label: "All", slug: null as string | null },
    ...categories.map((category) => ({
      label: category,
      slug: categoryToSlug(category),
    })),
  ]

  return (
    <nav aria-label="Filter posts by category">
      <ul className="flex flex-wrap gap-2">
        {items.map((item) => {
          const isActive =
            item.slug === null ? !selectedCategory : selectedCategory === item.label

          return (
            <li key={item.slug ?? "all"}>
              <Badge
                asChild
                variant={isActive ? "default" : "outline"}
                className={cn(
                  "cursor-pointer px-3 py-1 text-xs",
                  !isActive && "hover:bg-accent hover:text-accent-foreground"
                )}
              >
                <Link
                  href={
                    item.slug ? { pathname: "/blog", query: { category: item.slug } } : "/blog"
                  }
                >
                  {item.label}
                </Link>
              </Badge>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}

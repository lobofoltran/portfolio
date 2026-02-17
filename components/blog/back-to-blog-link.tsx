"use client"

import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { ChevronLeft } from "lucide-react"

import { getSelectedCategoryFromSearchParams } from "@/lib/blog"

export function BackToBlogLink() {
  const searchParams = useSearchParams()
  const category = getSelectedCategoryFromSearchParams(searchParams)

  return (
    <Link
      href={{ pathname: "/blog", query: category ? { category } : {} }}
      className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground"
    >
      <ChevronLeft className="mr-1 size-4" />
      Back to blog
    </Link>
  )
}

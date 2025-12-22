import type { MDXComponents } from "mdx/types"
import Link from "next/link"

import { cn } from "@/lib/utils"
import { Separator } from "@/components/ui/separator"

export const mdxComponents: MDXComponents = {
  h1: ({ className, ...props }) => (
    <h1
      className={cn(
        "mt-8 scroll-m-20 text-3xl font-semibold tracking-tight",
        className
      )}
      {...props}
    />
  ),

  h2: ({ className, ...props }) => (
    <h2
      className={cn(
        "mt-10 scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight",
        className
      )}
      {...props}
    />
  ),

  h3: ({ className, ...props }) => (
    <h3
      className={cn(
        "mt-8 scroll-m-20 text-xl font-semibold tracking-tight",
        className
      )}
      {...props}
    />
  ),

  p: ({ className, ...props }) => (
    <p
      className={cn(
        "leading-7 [&:not(:first-child)]:mt-6",
        className
      )}
      {...props}
    />
  ),

  a: ({ className, href = "", ...props }) => {
    const isExternal = href.startsWith("http")

    if (isExternal) {
      return (
        <a
          href={href}
          target="_blank"
          rel="noreferrer"
          className={cn(
            "font-medium underline underline-offset-4",
            className
          )}
          {...props}
        />
      )
    }

    return (
      <Link
        href={href}
        className={cn(
          "font-medium underline underline-offset-4",
          className
        )}
        {...props}
      />
    )
  },

  ul: ({ className, ...props }) => (
    <ul
      className={cn("my-6 ml-6 list-disc", className)}
      {...props}
    />
  ),

  ol: ({ className, ...props }) => (
    <ol
      className={cn("my-6 ml-6 list-decimal", className)}
      {...props}
    />
  ),

  li: ({ className, ...props }) => (
    <li
      className={cn("mt-2", className)}
      {...props}
    />
  ),

  blockquote: ({ className, ...props }) => (
    <blockquote
      className={cn(
        "mt-6 border-l-2 pl-6 italic text-muted-foreground",
        className
      )}
      {...props}
    />
  ),

  hr: () => <Separator className="my-12" />,

  code: ({ className, ...props }) => (
    <code
      className={cn(
        "relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm",
        className
      )}
      {...props}
    />
  ),

  pre: ({ className, ...props }) => (
    <pre
      className={cn(
        "mb-6 mt-6 overflow-x-auto rounded-lg bg-muted p-4 text-sm",
        className
      )}
      {...props}
    />
  )
}

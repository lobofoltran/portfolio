import type { MDXComponents } from "mdx/types"
import type { ComponentProps, ReactNode } from "react"
import { isValidElement } from "react"
import Link from "next/link"

import { CodeBlock } from "@/components/blog/code-block"
import { Mermaid } from "@/components/blog/mermaid"
import { ZoomImage } from "@/components/blog/zoom-image"
import { Separator } from "@/components/ui/separator"
import { slugify } from "@/lib/toc"
import { cn } from "@/lib/utils"

function extractTextFromChildren(node: ReactNode): string {
  if (typeof node === "string") return node
  if (typeof node === "number") return String(node)
  if (Array.isArray(node)) return node.map(extractTextFromChildren).join("")
  if (isValidElement<{ children?: ReactNode }>(node)) {
    return extractTextFromChildren(node.props.children)
  }
  return ""
}

function HeadingAnchor({ id }: { id: string }) {
  return (
    <a
      href={`#${id}`}
      aria-label="Link to this section"
      className="ml-2 inline-block align-middle text-muted-foreground/50 opacity-0 transition-opacity hover:text-foreground group-hover:opacity-100"
    >
      #
    </a>
  )
}

function unwrapIfOnlyImage(children: ComponentProps<"p">["children"]) {
  const arr = Array.isArray(children) ? children : [children]

  // Remove whitespace-only text nodes (MDX frequently adds "\n")
  const filtered = arr.filter((child) => {
    if (typeof child === "string") return child.trim().length > 0
    return child != null
  })

  if (filtered.length !== 1) return null

  const child: any = filtered[0]

  // Markdown img (before mapping)
  if (child?.type === "img") return child

  // After mapping: img -> ZoomImage, so inside <p> you may see <ZoomImage .../>
  if (child?.type === ZoomImage) return child

  // MDX runtime fallback
  if (child?.props?.mdxType === "img") return child

  return null
}

export const mdxComponents: MDXComponents = {
  h1: ({ className, ...props }: ComponentProps<"h1">) => (
    <h1 className={cn("mt-8 scroll-m-20 text-3xl font-semibold tracking-tight", className)} {...props} />
  ),

  h2: ({ className, children, id, ...props }: ComponentProps<"h2">) => {
    const slug = id ?? slugify(extractTextFromChildren(children))
    return (
      <h2
        id={slug}
        className={cn(
          "group mt-10 scroll-m-24 border-b pb-2 text-2xl font-semibold tracking-tight",
          className
        )}
        {...props}
      >
        {children}
        {slug ? <HeadingAnchor id={slug} /> : null}
      </h2>
    )
  },

  h3: ({ className, children, id, ...props }: ComponentProps<"h3">) => {
    const slug = id ?? slugify(extractTextFromChildren(children))
    return (
      <h3
        id={slug}
        className={cn(
          "group mt-8 scroll-m-24 text-xl font-semibold tracking-tight",
          className
        )}
        {...props}
      >
        {children}
        {slug ? <HeadingAnchor id={slug} /> : null}
      </h3>
    )
  },

  p: ({ children, className, ...props }: ComponentProps<"p">) => {
    const unwrapped = unwrapIfOnlyImage(children)
    if (unwrapped) return <>{unwrapped}</>

    return (
      <p className={cn("leading-7 [&:not(:first-child)]:mt-6", className)} {...props}>
        {children}
      </p>
    )
  },

  a: ({ className, href = "", ...props }: ComponentProps<"a">) => {
    const isExternal = typeof href === "string" && href.startsWith("http")

    if (isExternal) {
      return (
        <a
          href={href}
          target="_blank"
          rel="noreferrer"
          className={cn("font-medium underline underline-offset-4", className)}
          {...props}
        />
      )
    }

    return (
      <Link href={href} className={cn("font-medium underline underline-offset-4", className)} {...props} />
    )
  },

  img: ({ src = "", alt = "", title }: ComponentProps<"img">) => (
    <ZoomImage src={src as any} alt={alt ?? ""} caption={title} wide />
  ),

  ZoomImage,

  Mermaid,

  ul: ({ className, ...props }: ComponentProps<"ul">) => <ul className={cn("my-6 ml-6 list-disc", className)} {...props} />,

  ol: ({ className, ...props }: ComponentProps<"ol">) => <ol className={cn("my-6 ml-6 list-decimal", className)} {...props} />,

  li: ({ className, ...props }: ComponentProps<"li">) => <li className={cn("mt-2", className)} {...props} />,

  blockquote: ({ className, ...props }: ComponentProps<"blockquote">) => (
    <blockquote className={cn("mt-6 border-l-2 pl-6 italic text-muted-foreground", className)} {...props} />
  ),

  hr: () => <Separator className="my-12" />,

  table: ({ className, ...props }: ComponentProps<"table">) => (
    <div className="my-6 w-full overflow-x-auto">
      <table className={cn("w-full border-collapse text-sm", className)} {...props} />
    </div>
  ),

  thead: ({ className, ...props }: ComponentProps<"thead">) => (
    <thead className={cn("border-b text-left", className)} {...props} />
  ),

  th: ({ className, ...props }: ComponentProps<"th">) => (
    <th className={cn("px-3 py-2 font-semibold", className)} {...props} />
  ),

  td: ({ className, ...props }: ComponentProps<"td">) => (
    <td className={cn("border-b px-3 py-2 align-top", className)} {...props} />
  ),

  pre: ({ className, ...props }: ComponentProps<"pre">) => <CodeBlock className={className} {...props} />,
}

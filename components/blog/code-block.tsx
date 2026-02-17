"use client"

import type { ComponentProps, ReactElement, ReactNode } from "react"
import { isValidElement, useRef, useState } from "react"
import { Check, Copy } from "lucide-react"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

type CodeBlockProps = ComponentProps<"pre">

export function resolveCodeLanguage(
  className?: string,
  dataLanguage?: string
): string | null {
  if (dataLanguage) {
    return dataLanguage.toUpperCase()
  }

  const match = className?.match(/language-([a-z0-9-]+)/i)

  return match?.[1] ? match[1].toUpperCase() : null
}

export function CodeBlock({ className, children, ...props }: CodeBlockProps) {
  const [copied, setCopied] = useState(false)
  const language = resolveCodeLanguage(
    className,
    (props as { "data-language"?: string })["data-language"]
  )
  const preRef = useRef<HTMLPreElement>(null)
  async function handleCopy() {
    const code = preRef.current?.innerText ?? ""

    if (!code) return

    await navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 1200)
  }

  return (
    <div className="group relative my-6">
      {language ? (
        <span className="absolute left-3 top-3 z-10 rounded border bg-background/80 px-2 py-0.5 text-[10px] font-medium tracking-wide text-muted-foreground">
          {language}
        </span>
      ) : null}

      <Button
        type="button"
        variant="outline"
        size="sm"
        onClick={handleCopy}
        className="absolute right-3 top-3 z-10 h-7 px-2 text-xs opacity-100 transition-opacity md:opacity-0 md:group-hover:opacity-100"
      >
        {copied ? (
          <>
            <Check className="size-3" /> Copied
          </>
        ) : (
          <>
            <Copy className="size-3" /> Copy
          </>
        )}
      </Button>

      <pre
        ref={preRef}
        className={cn(
          "overflow-x-auto whitespace-pre rounded-lg border bg-muted/40 p-4 pt-10 pr-16 text-sm text-foreground",
          className
        )}
        {...props}
      >
        {children}
      </pre>
    </div>
  )
}

"use client"

import { useState } from "react"
import { Check, Copy, Mail } from "lucide-react"

import { Button } from "@/components/ui/button"
import { IconGithubSimple, IconLinkedinSVG } from "@/components/icons/simple-icons"

const EMAIL = "gustavo@lobofoltran.dev"

export function EmailCard() {
  const [copied, setCopied] = useState(false)

  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(EMAIL)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // ignore
    }
  }

  return (
    <div className="mx-auto max-w-md space-y-6 rounded-md border bg-background p-6">
      <div className="flex items-center gap-2 text-muted-foreground">
        <Mail className="size-4" />
        <span className="text-xs font-mono uppercase tracking-wider">Email</span>
      </div>

      <a
        href={`mailto:${EMAIL}`}
        className="block break-all rounded-md border bg-muted/30 px-4 py-3 font-mono text-sm hover:bg-muted/60"
      >
        {EMAIL}
      </a>

      <div className="flex flex-wrap gap-2">
        <Button asChild>
          <a href={`mailto:${EMAIL}`}>
            <Mail className="size-4" />
            Send email
          </a>
        </Button>
        <Button variant="outline" onClick={copyEmail} aria-label="Copy email address">
          {copied ? <Check className="size-4" /> : <Copy className="size-4" />}
          {copied ? "Copied" : "Copy"}
        </Button>
      </div>

      <div className="space-y-2 border-t pt-4 text-sm">
        <p className="text-xs font-mono uppercase tracking-wider text-muted-foreground">
          Elsewhere
        </p>
        <div className="flex flex-col gap-1.5">
          <a
            href="https://linkedin.com/in/gustavo-lobo"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground"
          >
            <IconLinkedinSVG className="size-4" />
            linkedin.com/in/gustavo-lobo
          </a>
          <a
            href="https://github.com/lobofoltran"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground"
          >
            <IconGithubSimple className="size-4" />
            github.com/lobofoltran
          </a>
        </div>
      </div>
    </div>
  )
}

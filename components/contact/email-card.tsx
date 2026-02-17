"use client"

import { Mail } from "lucide-react"

const EMAIL = "gustavo@lobofoltran.dev"

export function EmailCard() {
  async function copyEmail() {
    await navigator.clipboard.writeText(EMAIL)
  }

  return (
    <div className="mx-auto max-w-md rounded-2xl border bg-background/60 p-8 shadow-lg backdrop-blur">
      <div className="space-y-5">
        <div className="flex items-center gap-3">
          <Mail className="size-5" />
          <h2 className="font-semibold">Email</h2>
        </div>

        <div className="rounded-lg border bg-background/80 px-4 py-3 font-medium">
          {EMAIL}
        </div>

        <button
          onClick={copyEmail}
          className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
        >
        </button>
      </div>
    </div>
  )
}

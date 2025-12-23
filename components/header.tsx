"use client"

import Link from "next/link"
import { useState } from "react"
import { Separator } from "@/components/ui/separator"
import { Button } from "@/components/ui/button"

export function Header() {
  const [open, setOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 bg-background">
      <div className="mx-auto flex h-16 max-w-5xl items-center justify-between px-6">
        <Link
          href="/"
          className="text-sm font-medium tracking-tight"
        >
          Gustavo Lobo
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-6 text-sm text-muted-foreground md:flex">
          <Link href="/resume" className="hover:text-foreground">
            Resume
          </Link>
          <Link href="/blog" className="hover:text-foreground">
            Blog
          </Link>
          <a
            href="https://github.com/lobofoltran"
            target="_blank"
            rel="noreferrer"
            className="hover:text-foreground"
          >
            GitHub
          </a>
          <a
            href="https://linkedin.com/in/gustavo-lobo"
            target="_blank"
            rel="noreferrer"
            className="hover:text-foreground"
          >
            LinkedIn
          </a>
        </nav>

        {/* Mobile button */}
        <Button
          variant="ghost"
          size="sm"
          className="md:hidden"
          onClick={() => setOpen(!open)}
        >
          Menu
        </Button>
      </div>

      {/* Mobile nav */}
      {open && (
        <div className="md:hidden">
          <Separator />
          <nav className="flex flex-col gap-4 px-6 py-4 text-sm text-muted-foreground">
            <Link
              href="/resume"
              onClick={() => setOpen(false)}
              className="hover:text-foreground"
            >
              Resume
            </Link>
            <Link
              href="/blog"
              onClick={() => setOpen(false)}
              className="hover:text-foreground"
            >
              Blog
            </Link>
            <a
              href="https://github.com/lobofoltran"
              target="_blank"
              rel="noreferrer"
              className="hover:text-foreground"
            >
              GitHub
            </a>
            <a
              href="https://linkedin.com/in/gustavo-lobo"
              target="_blank"
              rel="noreferrer"
              className="hover:text-foreground"
            >
              LinkedIn
            </a>
          </nav>
        </div>
      )}

      <Separator />
    </header>
  )
}

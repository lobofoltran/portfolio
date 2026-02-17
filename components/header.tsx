"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { useMounted } from "@/hooks/useMounted"
import { cn } from "@/lib/utils"
import { IconGithubSimple, IconLinkedinSVG } from "./icons/simple-icons"

export function Header() {
  const mounted = useMounted()
  const pathname = usePathname()

  if (!mounted) return null

  const navItems = [
    { href: "/", label: "Home" },
    { href: "/courses", label: "Courses" },
    { href: "/resume", label: "Resume" },
    { href: "/contact", label: "Contact" },
    { href: "/blog", label: "Blog" },
  ]

  function isActive(pathname: string, href: string) {
    if (href === "/") return pathname === "/"
    return pathname.startsWith(href)
  }

  return (
    <header className="sticky top-0 z-50 border-b bg-background/80 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-5xl items-center justify-between px-6">
        <Link href="/" className="select-none text-sm font-mono text-foreground">
          <span>gustavo@</span>
          <span className="font-medium">pop-os</span>
          <span className="opacity-60">:~</span>
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {navItems.map(({ href, label }) => (
            <Button
              key={href}
              asChild
              variant="ghost"
              size="sm"
              className={cn(
                "px-3",
                isActive(pathname, href)
                  ? "bg-primary/10 font-medium text-primary"
                  : "text-muted-foreground hover:text-primary"
              )}
            >
              <Link href={href}>{label}</Link>
            </Button>
          ))}

          <Button asChild variant="ghost" size="icon" className="text-muted-foreground hover:text-primary">
            <a href="https://linkedin.com/in/gustavo-lobo" target="_blank" rel="noreferrer">
              <IconLinkedinSVG className="h-4 w-4" />
            </a>
          </Button>

          <Button asChild variant="ghost" size="icon" className="text-muted-foreground hover:text-primary">
            <a href="https://github.com/lobofoltran" target="_blank" rel="noreferrer">
              <IconGithubSimple className="h-4 w-4" />
            </a>
          </Button>
        </nav>

        <Sheet>
          <SheetTrigger asChild className="md:hidden">
            <Button variant="ghost" size="icon">
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>

          <SheetContent side="right" className="w-64 font-mono">
            <SheetTitle />
            <nav className="mt-8 flex flex-col gap-2">
              {navItems.map(({ href, label }) => (
                <Button
                  key={href}
                  asChild
                  variant="ghost"
                  className={cn("justify-start", isActive(pathname, href) && "bg-primary/10 font-medium")}
                >
                  <Link href={href}>{label}</Link>
                </Button>
              ))}

              <div className="my-2 h-px bg-border" />

              <Button asChild variant="ghost" className="justify-start">
                <a href="https://linkedin.com/in/gustavo-lobo" target="_blank" rel="noreferrer">
                  LinkedIn
                </a>
              </Button>

              <Button asChild variant="ghost" className="justify-start">
                <a href="https://github.com/lobofoltran" target="_blank" rel="noreferrer">
                  GitHub
                </a>
              </Button>
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  )
}

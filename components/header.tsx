import Link from "next/link"
import { Separator } from "@/components/ui/separator"

export function Header() {
  return (
    <header className="sticky top-0 z-50 bg-background">
      <div className="mx-auto flex h-16 max-w-5xl items-center justify-between px-6">
        <Link
          href="/"
          className="text-sm font-medium tracking-tight"
        >
          Gustavo Foltran
        </Link>

        <nav className="flex items-center gap-6 text-sm text-muted-foreground">
          <Link href="/resume" className="hover:text-foreground">
            Resume
          </Link>
          <Link href="/blog" className="hover:text-foreground">
            Blog
          </Link>
          <a
            href="https://github.com/seu-usuario"
            target="_blank"
            rel="noreferrer"
            className="hover:text-foreground"
          >
            GitHub
          </a>
          <a
            href="https://linkedin.com/in/seu-perfil"
            target="_blank"
            rel="noreferrer"
            className="hover:text-foreground"
          >
            LinkedIn
          </a>
        </nav>
      </div>

      <Separator />
    </header>
  )
}

import Link from "next/link"
import { Metadata } from "next"

import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"

export const metadata: Metadata = {
  title: "Home",
  description:
    "Software Engineer focused on architecture, distributed systems, and performance."
}

export default function HomePage() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-24">
      {/* Intro */}
      <section className="space-y-6">
        <h1 className="text-4xl font-semibold tracking-tight">
          Gustavo Foltran
        </h1>

        <p className="max-w-xl text-lg text-muted-foreground">
          Software Engineer focused on architecture, distributed systems,
          performance, and building reliable systems at scale.
        </p>

        <div className="flex flex-wrap gap-4">
          <Button asChild>
            <Link href="/resume">Resume</Link>
          </Button>

          <Button variant="outline" asChild>
            <Link href="/blog">Blog</Link>
          </Button>
        </div>
      </section>

      <Separator className="my-16" />

      {/* Short bio */}
      <section className="max-w-xl space-y-4 text-sm text-muted-foreground">
        <p>
          I work with modern web technologies and backend systems, focusing on
          clean architecture, scalability, and long-term maintainability.
        </p>

        <p>
          This site serves as my personal portfolio and a place where I share
          technical insights and lessons learned from real-world systems.
        </p>
      </section>
    </main>
  )
}

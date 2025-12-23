import Link from "next/link"
import { Metadata } from "next"

import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"

export const metadata: Metadata = {
  title: "Home",
  description:
    "Software Engineer working on backend, distributed systems, and mission-critical production environments."
}

export default function HomePage() {
  return (
    <main className="mx-auto max-w-3xl px-6">
      {/* Intro */}
      <section className="space-y-6 pt-20">
        <h1 className="text-4xl font-semibold tracking-tight">
          Gustavo Lobo
        </h1>

        <p className="max-w-xl text-lg text-muted-foreground">
          Software Engineer focused on backend, distributed systems, and
          building reliable, scalable systems in real-world production
          environments.
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

      <Separator className="my-8" />

      {/* Short bio */}
      <section className="max-w-xl space-y-4 text-sm text-muted-foreground">
        <p>
          I work on backend and distributed systems, focusing on reliability, scalability, and long-term system evolution in production environments.
        </p>
        <p>
          This site is a place to document my work and share technical insights from real-world systems.
        </p>
      </section>
    </main>
  )
}

import Image from "next/image"
import Link from "next/link"
import { Metadata } from "next"

import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"

export const metadata: Metadata = {
  title: "Gustavo Lobo — Senior Backend & Distributed Systems Engineer",
  description:
    "Senior backend engineer specializing in distributed systems, event-driven architecture, and production reliability.",
}

export default function HomePage() {
  return (
    <main className="mx-auto max-w-4xl px-6 pb-24">
      <section className="grid gap-10 pt-20 md:grid-cols-[1.2fr_0.8fr] md:items-center">
        <div className="space-y-6">
          <p className="text-sm font-mono text-muted-foreground">Backend Engineer · Distributed Systems</p>
          <h1 className="text-4xl font-semibold tracking-tight md:text-5xl">Gustavo Lobo</h1>
          <p className="max-w-2xl text-base text-muted-foreground md:text-lg">
            Software engineer focused on event-driven architecture, data-intensive services,
            and operational excellence in production.
          </p>

          <div className="flex flex-wrap gap-3">
            <Button asChild>
              <Link href="/contact">Contact</Link>
            </Button>
            <Button asChild variant="outline">
              <Link href="/courses">Courses</Link>
            </Button>
            <Button asChild variant="outline">
              <Link href="/resume">Resume</Link>
            </Button>
            <Button asChild variant="outline">
              <Link href="/blog">Blog</Link>
            </Button>
          </div>
        </div>

        <div className="mx-auto w-full max-w-xs">
          <div className="relative aspect-square overflow-hidden rounded-md border">
            <Image src="/me.jpeg" alt="Gustavo Lobo" fill priority className="object-cover" />
          </div>
        </div>
      </section>

      <Separator className="my-12" />

      <section className="grid gap-4 text-sm text-muted-foreground">
        <p>Experience operating critical production workloads with observability, resiliency, and performance as first-class concerns.</p>
      </section>
    </main>
  )
}

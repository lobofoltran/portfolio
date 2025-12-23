import Link from "next/link"
import Image from "next/image"
import { Metadata } from "next"

import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { TextGenerateEffect } from "@/components/ui/text-generate-effect"

export const metadata: Metadata = {
  title: "Gustavo Lobo — Senior Backend & Distributed Systems Engineer",
  description:
    "Senior backend engineer specializing in Java, distributed systems, and event-driven architectures. Focused on reliability, scalability, and operating mission-critical systems in production."
}

export default function HomePage() {
  return (
    <main className="mx-auto max-w-3xl px-6 pb-24">
      {/* Hero */}
      <section className="grid gap-10 pt-20 md:grid-cols-2 md:items-center">
        {/* Text */}
        <div className="space-y-6">
          <h1 className="text-4xl font-semibold tracking-tight">
            Gustavo <span className="text-primary">Lobo</span>
          </h1>

          <div className="max-w-xl text-lg text-muted-foreground">
            <TextGenerateEffect
              words="Software Engineer focused on backend and distributed systems, building
            reliable and scalable mission-critical systems."
            />
          </div>

          <div className="flex items-center gap-4">
            {/* Primary CTA */}
            <Button
              asChild
              className="
                relative
                px-6
                font-medium
                transition-all
                duration-300
                ease-in-out
                hover:shadow-lg
                hover:ring-4
                hover:ring-blue-500/30
                "
              >
              <Link href="/resume">View Resume</Link>
            </Button>

            {/* Secondary CTA */}
            <Button
              variant="outline"
              asChild
              className="
                px-6
                transition-all
                duration-300
                ease-in-out
                hover:border-primary
              "
              >
              <Link href="/blog">Read Blog</Link>
            </Button>
          </div>
        </div>

        {/* Image */}
        <div className="flex justify-center md:justify-end">
          <div
            className="
      relative h-64 w-64 overflow-hidden rounded-2xl
      ring-2 ring-blue-500/60
      shadow-sm
      transition-all duration-700 ease-out
      hover:scale-105 hover:ring-blue-500 hover:shadow-md
    "
          >
            <Image
              src="/me.jpeg"
              alt="Gustavo Lobo"
              fill
              priority
              className="
        object-cover
        transition-transform duration-700 ease-out
        hover:scale-110
      "
            />
          </div>
        </div>
      </section>

      <Separator className="my-12" />

      {/* Short bio */}
      <section className="max-w-xl space-y-4 text-sm text-muted-foreground">
        <p>
          I work on backend and distributed systems with a strong focus on reliability,
          scalability, and long-term system evolution.
        </p>
        <p>
          This site documents my work and shares technical insights drawn from
          complex, real-world systems.
        </p>
      </section>
    </main>
  )
}

import { Metadata } from "next"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"

export const metadata: Metadata = {
  title: "Resume",
  description:
    "Software Engineer focused on architecture, distributed systems, and performance."
}

export default function ResumePage() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-16">
      {/* Header */}
      <header className="space-y-2">
        <h1 className="text-3xl font-semibold tracking-tight">
          Gustavo Foltran
        </h1>
        <p className="text-muted-foreground">
          Software Engineer · Architecture · Distributed Systems
        </p>
      </header>

      <Separator className="my-10" />

      {/* Experience */}
      <section className="space-y-6">
        <h2 className="text-xl font-semibold">Experience</h2>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">
              Fiscaltech · Software Engineer
            </CardTitle>
            <p className="text-sm text-muted-foreground">
              2024 — Present
            </p>
          </CardHeader>
          <CardContent>
            <ul className="list-disc space-y-2 pl-5 text-sm leading-relaxed">
              <li>
                Designed and implemented distributed systems for large-scale
                tolling platforms (MLFF).
              </li>
              <li>
                Worked with event-driven architectures, PostgreSQL, Kafka,
                and high-throughput image processing pipelines.
              </li>
              <li>
                Led architectural decisions focused on performance,
                scalability, and maintainability.
              </li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">
              WHB Automotive · Systems Analyst / Developer
            </CardTitle>
            <p className="text-sm text-muted-foreground">
              2022 — 2024
            </p>
          </CardHeader>
          <CardContent>
            <ul className="list-disc space-y-2 pl-5 text-sm leading-relaxed">
              <li>
                Developed and maintained enterprise systems using PHP,
                Laravel, Angular, and Flutter.
              </li>
              <li>
                Integrated applications with ERP systems (TOTVS Protheus).
              </li>
              <li>
                Built internal tools focused on automation and reliability.
              </li>
            </ul>
          </CardContent>
        </Card>
      </section>

      <Separator className="my-10" />

      {/* Education */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Education</h2>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">
              B.Sc. in Systems Analysis and Development
            </CardTitle>
            <p className="text-sm text-muted-foreground">
              UniCesumar · 2021 — 2024
            </p>
          </CardHeader>
        </Card>
      </section>

      <Separator className="my-10" />

      {/* Skills */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Skills</h2>

        <Card>
          <CardContent className="flex flex-wrap gap-2">
            <Badge variant="secondary">TypeScript</Badge>
            <Badge variant="secondary">Go</Badge>
            <Badge variant="secondary">Java</Badge>
            <Badge variant="secondary">Python</Badge>
            <Badge variant="secondary">PHP</Badge>

            <Badge variant="outline">React</Badge>
            <Badge variant="outline">Next.js</Badge>
            <Badge variant="outline">Vite</Badge>
            <Badge variant="outline">Tailwind</Badge>
            <Badge variant="outline">shadcn/ui</Badge>

            <Badge variant="outline">PostgreSQL</Badge>
            <Badge variant="outline">Kafka</Badge>
            <Badge variant="outline">Docker</Badge>
            <Badge variant="outline">Linux</Badge>
          </CardContent>
        </Card>
      </section>

      <Separator className="my-10" />

      {/* Contact */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Contact</h2>

        <Card>
          <CardContent className="space-y-2 text-sm">
            <p>
              Email:{" "}
              <a
                href="mailto:gustavo@email.com"
                className="underline underline-offset-4"
              >
                gustavo@email.com
              </a>
            </p>
            <p>
              GitHub:{" "}
              <a
                href="https://github.com/seu-usuario"
                target="_blank"
                rel="noreferrer"
                className="underline underline-offset-4"
              >
                github.com/seu-usuario
              </a>
            </p>
            <p>
              LinkedIn:{" "}
              <a
                href="https://linkedin.com/in/seu-perfil"
                target="_blank"
                rel="noreferrer"
                className="underline underline-offset-4"
              >
                linkedin.com/in/seu-perfil
              </a>
            </p>
          </CardContent>
        </Card>
      </section>
    </main>
  )
}

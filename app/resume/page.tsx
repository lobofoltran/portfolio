import Image from "next/image"
import { Metadata } from "next"
import { Cloud, Database, Layers, Server } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"

export const metadata: Metadata = {
  title: "Resume — Gustavo Lobo | Senior Backend & Distributed Systems Engineer",
  description:
    "Senior backend engineer with experience in Java, distributed systems, and event-driven architectures. Focused on reliability, scalability, and operating mission-critical systems in production.",
}

type Experience = {
  role: string
  company: string
  period: string
  context: string
  responsibilities: string[]
  stack: string[]
}

const experiences: Experience[] = [
  {
    role: "Software Engineer — Research & Development",
    company: "Fiscal Technology and Automation",
    period: "Jan 2025 — Present",
    context:
      "Nationwide free-flow toll platform operating 24/7 with high transaction volume and strict traceability requirements.",
    responsibilities: [
      "Owned backend service lifecycle from architecture to production support.",
      "Built event-driven Java services integrated with Kafka.",
      "Operated PostgreSQL HA (Patroni), replication, and partitioning in production.",
      "Maintained on-prem Kubernetes workloads with CI/CD and observability.",
    ],
    stack: ["Java", "Spring Boot", "Kafka", "PostgreSQL", "Kubernetes", "DDD", "Event-Driven"],
  },
  {
    role: "Software Engineer — ERP Protheus",
    company: "Fiscal Technology and Automation",
    period: "May 2024 — Jan 2025",
    context:
      "ERP and legacy integration layer for internal business operations across multiple domains.",
    responsibilities: [
      "Developed integrations and backend routines aligned with Protheus architecture.",
      "Implemented REST APIs and modernization initiatives around legacy systems.",
      "Delivered a centralized web platform for dashboards and strategic workflows.",
    ],
    stack: ["TOTVS Protheus", "Next.js", "REST APIs", "Legacy Integration"],
  },
  {
    role: "Software Engineer",
    company: "WHB AUTOMOTIVE S.A",
    period: "Apr 2022 — May 2024",
    context:
      "Industrial and corporate software supporting HR, manufacturing, quality, and operations.",
    responsibilities: [
      "Built internal applications and APIs across multiple operational domains.",
      "Delivered a Flutter mobile HR app used by 2,000+ employees.",
      "Created real-time industrial KPI dashboards and refactored legacy applications.",
    ],
    stack: ["Industrial Systems", "Flutter", "Dashboards", "Legacy Modernization"],
  },
]

export default function ResumePage() {
  return (
    <main className="relative mx-auto max-w-3xl py-12 text-sm leading-relaxed antialiased">
      <div className="px-6">
        <header className="flex items-center gap-4">
          <div className="relative h-14 w-14 overflow-hidden rounded-md border">
            <Image src="/me.jpeg" alt="Gustavo Lobo" fill priority className="object-cover" />
          </div>

          <div className="space-y-1">
            <h1 className="text-3xl font-semibold tracking-tight">Gustavo Lobo</h1>
            <p className="text-muted-foreground">Software Engineer — Backend & Distributed Systems</p>
          </div>
        </header>

        <Separator className="my-8" />

        <section className="space-y-3">
          <h2 className="text-lg font-semibold">Profile</h2>
          <p className="text-muted-foreground">
            Software Engineer with hands-on experience designing, operating, and evolving mission-critical and highly transactional systems in production. Strong focus on backend engineering, distributed systems, and event-driven architectures.
          </p>
        </section>

        <Separator className="my-8" />

        <section className="space-y-8">
          <h2 className="text-lg font-semibold">Experience</h2>

            {experiences.map((experience) => (
              <div key={`${experience.company}-${experience.role}`} className="relative">
                <Card className="py-0">
                  <CardContent className="space-y-5 py-6">
                    <div className="space-y-2">
                      <p className="text-base font-semibold leading-tight">{experience.role}</p>
                      <p className="text-muted-foreground">
                        {experience.company} · {experience.period}
                      </p>
                    </div>

                    <div className="space-y-2">
                      <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">Context</p>
                      <p className="text-muted-foreground">{experience.context}</p>
                    </div>

                    <div className="space-y-2">
                      <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">Key Responsibilities</p>
                      <ul className="list-disc space-y-1 pl-5 text-muted-foreground">
                        {experience.responsibilities.map((item) => (
                          <li key={item}>{item}</li>
                        ))}
                      </ul>
                    </div>

                    <div className="space-y-2">
                      <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">Tech Stack</p>
                      <div className="flex flex-wrap gap-2">
                        {experience.stack.map((item) => (
                          <Badge key={item} variant="blue">
                            {item}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            ))}
        </section>

        <Separator className="my-8" />

        <section className="space-y-6">
          <h2 className="text-lg font-semibold">Stack</h2>

          <div className="grid gap-4 sm:grid-cols-2">
            <Card>
              <CardContent className="space-y-4 px-6">
                <div className="flex items-center gap-4">
                  <div className="rounded border border-blue px-2 py-2 text-blue-600 dark:text-blue-400">
                    <Server className="size-4" />
                  </div>
                  <h3 className="text-sm font-semibold">Backend Development</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="blue">Java</Badge>
                  <Badge variant="blue">Spring Boot</Badge>
                  <Badge variant="blue">Go</Badge>
                  <Badge variant="blue">Node.js</Badge>
                  <Badge variant="blue">Python</Badge>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="space-y-4 px-6">
                <div className="flex items-center gap-4">
                  <div className="rounded border border-blue px-2 py-2 text-blue-600 dark:text-blue-400">
                    <Layers className="size-4" />
                  </div>
                  <h3 className="text-sm font-semibold">Distributed Systems & Architecture</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="blue">Kafka</Badge>
                  <Badge variant="blue">RabbitMQ</Badge>
                  <Badge variant="blue">Event-Driven Architecture</Badge>
                  <Badge variant="blue">DDD</Badge>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="space-y-4 px-6">
                <div className="flex items-center gap-4">
                  <div className="rounded border border-blue px-2 py-2 text-blue-600 dark:text-blue-400">
                    <Database className="size-4" />
                  </div>
                  <h3 className="text-sm font-semibold">Data Engineering & Persistence</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="blue">PostgreSQL</Badge>
                  <Badge variant="blue">Partitioning</Badge>
                  <Badge variant="blue">Patroni</Badge>
                  <Badge variant="blue">Redis</Badge>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="space-y-4 px-6">
                <div className="flex items-center gap-4">
                  <div className="rounded border border-blue px-2 py-2 text-blue-600 dark:text-blue-400">
                    <Cloud className="size-4" />
                  </div>
                  <h3 className="text-sm font-semibold">Cloud & Infrastructure</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="blue">AWS</Badge>
                  <Badge variant="blue">Kubernetes</Badge>
                  <Badge variant="blue">Terraform</Badge>
                  <Badge variant="blue">Docker</Badge>
                  <Badge variant="blue">Observability</Badge>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        <Separator className="my-8" />

        <section className="space-y-3">
          <h2 className="text-lg font-semibold">Education</h2>
          <ul className="space-y-2 text-muted-foreground">
            <li><span className="font-medium text-foreground">Postgraduate — Software Architecture</span> · UTP · Jul 2025 — Present</li>
            <li><span className="font-medium text-foreground">Postgraduate — Software Engineering</span> · UTP · Mar 2025 — Jan 2026</li>
            <li><span className="font-medium text-foreground">Postgraduate — BI, Big Data & Analytics</span> · UTP · Aug 2024 — Feb 2025</li>
            <li><span className="font-medium text-foreground">B.Sc. — Systems Analysis and Development</span> · UniCesumar · Aug 2021 — Jun 2024</li>
          </ul>
        </section>

      </div>
    </main>
  )
}

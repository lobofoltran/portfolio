import Image from "next/image"
import { Metadata } from "next"

import { Separator } from "@/components/ui/separator"
import { TracingBeam } from "@/components/ui/tracing-beam"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Cloud, Code2, Database, Layers, LucideProps, Server } from "lucide-react"
import { ForwardRefExoticComponent, RefAttributes } from "react"

export const metadata: Metadata = {
  title: "Resume — Gustavo Lobo | Senior Backend & Distributed Systems Engineer",
  description:
    "Senior backend engineer with experience in Java, distributed systems, and event-driven architectures. Focused on reliability, scalability, and operating mission-critical systems in production."
}

export default function ResumePage() {
  return (
    <main className="mx-auto max-w-3xl py-10 text-sm leading-relaxed antialiased relative">
      <TracingBeam className="px-6">
        <div className="pl-6">
          {/* Header */}
          <header className="flex items-center gap-4">
            <div className="relative h-12 w-12 overflow-hidden rounded-md">
              <Image
                src="/me.jpeg"
                alt="Gustavo Lobo"
                fill
                priority
                className="object-cover"
              />
            </div>

            <div className="space-y-1">
              <h1 className="text-3xl font-semibold tracking-tight">
                Gustavo Lobo
              </h1>
              <p className="text-muted-foreground">
                Software Engineer — Backend & Distributed Systems
              </p>
            </div>
          </header>

          <Separator className="my-8" />

          {/* Summary */}
          <section className="space-y-3">
            <h2 className="text-lg font-semibold">Summary</h2>
            <p className="text-muted-foreground">
              Software Engineer with hands-on experience designing, operating,
              and evolving mission-critical and highly transactional systems in
              production. Strong focus on backend engineering, distributed
              systems, and event-driven architectures, with technical ownership
              spanning architectural design, rollout, and post–go-live support.
            </p>
          </section>

          <Separator className="my-8" />

          {/* Experience */}
          <section className="space-y-6">
            <h2 className="text-lg font-semibold">Experience</h2>

            {/* Fiscaltech R&D */}
            <Card>
              <CardContent className="space-y-4 px-6">
                <div>
                  <p className="font-medium">
                    Software Engineer — Research & Development
                  </p>
                  <p className="text-muted-foreground">
                    Fiscal Technology and Automation · Jan 2025 — Present
                  </p>
                </div>

                <ul className="list-disc space-y-1 pl-5 text-muted-foreground">
                  <li>
                    Contributed to the development and operation of a nationwide electronic toll collection system (Free Flow), a highly transactional, mission-critical platform operating 24/7 and responsible for more than doubling the company’s revenue.
                  </li>
                  <li>
                    Worked on systems processing large volumes of financial and operational data in real time under strict requirements for availability, consistency, and traceability.
                  </li>
                  <li>
                    Held technical ownership of backend services from architectural design through rollout and post–go-live support, participating in architectural decisions and continuous evolution in production.
                  </li>
                  <li>
                    Designed, developed, and operated backend services using Java (Spring Boot) with event-driven integration via Kafka.
                  </li>
                  <li>
                    Operated PostgreSQL in high availability (Patroni), including logical replication and table partitioning for high data throughput.
                  </li>
                  <li>
                    Deployed and operated services in on-premise Kubernetes environments with CI/CD pipelines, infrastructure automation, and centralized observability.
                  </li>
                </ul>

                <div className="flex flex-wrap gap-2">
                  <Badge variant="blue">Java</Badge>
                  <Badge variant="blue">Spring Boot</Badge>
                  <Badge variant="blue">Kafka</Badge>
                  <Badge variant="blue">PostgreSQL</Badge>
                  <Badge variant="blue">Kubernetes</Badge>
                  <Badge variant="blue">DDD</Badge>
                  <Badge variant="blue">Event-Driven</Badge>
                </div>
              </CardContent>
            </Card>

            {/* ERP */}
            <Card>
              <CardContent className="space-y-4 px-6">
                <div>
                  <p className="font-medium">
                    Software Engineer — ERP Protheus
                  </p>
                  <p className="text-muted-foreground">
                    Fiscal Technology and Automation · May 2024 — Jan 2025
                  </p>
                </div>

                <ul className="list-disc space-y-1 pl-5 text-muted-foreground">
                  <li>
                    Developed and maintained integrations and custom solutions based on the TOTVS Protheus ERP, supporting multiple business areas.
                  </li>
                  <li>
                    Designed and implemented REST APIs and backend routines following official Protheus architecture and best practices.
                  </li>
                  <li>
                    Built a corporate web platform to centralize dashboards, reports, and strategic tools as a modern integration layer over legacy systems.
                  </li>
                  <li>
                    Implemented process automation initiatives that reduced manual workflows and improved operational efficiency.
                  </li>
                </ul>

                <div className="flex flex-wrap gap-2">
                  <Badge variant="blue">TOTVS Protheus</Badge>
                  <Badge variant="blue">Next.js</Badge>
                  <Badge variant="blue">Legacy Integration</Badge>
                  <Badge variant="blue">System Modernization</Badge>
                </div>
              </CardContent>
            </Card>

            {/* WHB */}
            <Card>
              <CardContent className="space-y-4 px-6">
                <div>
                  <p className="font-medium">Software Engineer</p>
                  <p className="text-muted-foreground">
                    WHB AUTOMOTIVE S.A · Apr 2022 — May 2024
                  </p>
                </div>

                <ul className="list-disc space-y-1 pl-5 text-muted-foreground">
                  <li>
                    Worked in industrial and corporate environments delivering software solutions for HR, Manufacturing, Quality, Occupational Safety, and IT.
                  </li>
                  <li>
                    Developed web applications and APIs integrated with multiple internal systems and databases.
                  </li>
                  <li>
                    Developed a Mobile HR application built with Flutter, used by 2,000+ employees.
                  </li>
                  <li>
                    Delivered real-time dashboards and industrial performance indicators (OEE, MTTR, MTBF) for production and maintenance teams.
                  </li>
                  <li>
                    Led refactoring and architectural standardization efforts, including containerization and improvements to legacy systems.
                  </li>
                </ul>

                <div className="flex flex-wrap gap-2">
                  <Badge variant="blue">Industrial Systems</Badge>
                  <Badge variant="blue">Operational Dashboards</Badge>
                  <Badge variant="blue">Flutter</Badge>
                  <Badge variant="blue">Mobile</Badge>
                  <Badge variant="blue">Legacy Modernization</Badge>
                </div>
              </CardContent>
            </Card>
          </section>

          <Separator className="my-8" />

          {/* Skills */}
          <section className="space-y-6">
            <h2 className="text-lg font-semibold">Skills</h2>

            <div className="grid gap-4 sm:grid-cols-2">
              {/* Backend & Systems */}
              <Card>
                <CardContent className="space-y-4 px-6">
                  <div className="flex flex-wrap gap-4 items-center">
                    <div className="px-2 py-2 border rounded border-blue text-blue-600 dark:text-blue-400">
                      <Server className="size-4" />
                    </div>
                    <h3 className="text-sm font-semibold">Backend Development</h3>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="blue">Java</Badge>
                    <Badge variant="blue">Spring Boot</Badge>
                    <Badge variant="blue">Swagger/OpenAPI</Badge>
                    <Badge variant="blue">Go</Badge>
                    <Badge variant="blue">Node.js</Badge>
                    <Badge variant="blue">Python</Badge>
                    <Badge variant="blue">PHP</Badge>
                    <Badge variant="blue">Laravel</Badge>
                  </div>
                </CardContent>
              </Card>

              {/* Frontend */}
              <Card>
                <CardContent className="space-y-4 px-6">
                  <div className="flex flex-wrap gap-4 items-center">
                    <div className="px-2 py-2 border rounded border-blue text-blue-600 dark:text-blue-400">
                      <Server className="size-4" />
                    </div>
                    <h3 className="text-sm font-semibold">Frontend Development</h3>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="blue">TypeScript</Badge>
                    <Badge variant="blue">React</Badge>
                    <Badge variant="blue">Next.js</Badge>
                    <Badge variant="blue">Flutter</Badge>
                    <Badge variant="blue">Angular</Badge>
                    <Badge variant="blue">Vue.js</Badge>
                  </div>
                </CardContent>
              </Card>

              {/* Distributed & Event-Driven */}
              <Card>
                <CardContent className="space-y-4 px-6">
                  <div className="flex flex-wrap gap-4 items-center">
                    <div className="px-2 py-2 border rounded border-blue text-blue-600 dark:text-blue-400">
                      <Layers className="size-4" />
                    </div>
                    <h3 className="text-sm font-semibold">Distributed Systems & Architecture</h3>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="blue">Kafka</Badge>
                    <Badge variant="blue">RabbitMQ</Badge>
                    <Badge variant="blue">Event-driven Architecture</Badge>
                    <Badge variant="blue">Domain-Driven Design (DDD)</Badge>
                  </div>
                </CardContent>
              </Card>

              {/* Data & Persistence */}
              <Card>
                <CardContent className="space-y-4 px-6">
                  <div className="flex flex-wrap gap-4 items-center">
                    <div className="px-2 py-2 border rounded border-blue text-blue-600 dark:text-blue-400">
                      <Database className="size-4" />
                    </div>
                    <h3 className="text-sm font-semibold">Data Engineering & Persistence</h3>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="blue">PostgreSQL</Badge>
                    <Badge variant="blue">Partitioning</Badge>
                    <Badge variant="blue">Logical Replication</Badge>
                    <Badge variant="blue">High Availability</Badge>
                    <Badge variant="blue">Patroni</Badge>
                    <Badge variant="blue">SQL Server</Badge>
                    <Badge variant="blue">MySQL</Badge>
                    <Badge variant="blue">MongoDB</Badge>
                    <Badge variant="blue">Redis</Badge>
                  </div>
                </CardContent>
              </Card>

              {/* Platform & Operations */}
              <Card className="sm:col-span-2">
                <CardContent className="space-y-4 px-6">
                  <div className="flex flex-wrap gap-4 items-center">
                    <div className="px-2 py-2 border rounded border-blue text-blue-600 dark:text-blue-400">
                      <Cloud className="size-4" />
                    </div>
                    <h3 className="text-sm font-semibold">Cloud & Infrastructure</h3>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="blue">AWS</Badge>
                    <Badge variant="blue">Cloudflare</Badge>
                    <Badge variant="blue">Kubernetes</Badge>
                    <Badge variant="blue">Terraform</Badge>
                    <Badge variant="blue">Docker</Badge>
                    <Badge variant="blue">CI/CD</Badge>
                    <Badge variant="blue">Automation</Badge>
                    <Badge variant="blue">Observability</Badge>
                    <Badge variant="blue">Linux</Badge>
                  </div>
                </CardContent>
              </Card>
            </div>
          </section>

          <Separator className="my-8" />

          {/* Education */}
          <section className="space-y-3">
            <h2 className="text-lg font-semibold">Education</h2>

            <ul className="space-y-2 text-muted-foreground">
              <li>
                <span className="font-medium text-foreground">
                  Postgraduate — Software Architecture
                </span>{" "}
                · UTP · Jul 2025 — Present
              </li>
              <li>
                <span className="font-medium text-foreground">
                  Postgraduate — Software Engineering
                </span>{" "}
                · UTP · Mar 2025 — Jan 2026
              </li>
              <li>
                <span className="font-medium text-foreground">
                  Postgraduate — BI, Big Data & Analytics
                </span>{" "}
                · UTP · Aug 2024 — Feb 2025
              </li>
              <li>
                <span className="font-medium text-foreground">
                  B.Sc. — Systems Analysis and Development
                </span>{" "}
                · UniCesumar · Aug 2021 — Jun 2024
              </li>
            </ul>
          </section>

          <Separator className="my-8" />

          {/* Contact */}
          <section className="space-y-2">
            <h2 className="text-lg font-semibold">Contact</h2>

            <p className="">
              Email:{" "}
              <a
                href="mailto:gustavoqe.75@gmail.com"
                className="underline underline-offset-4"
              >
                gustavoqe.75@gmail.com
              </a>
            </p>

            <p className="">
              GitHub:{" "}
              <a
                href="https://github.com/lobofoltran"
                target="_blank"
                rel="noreferrer"
                className="underline underline-offset-4"
              >
                github.com/lobofoltran
              </a>
            </p>

            <p className="">
              LinkedIn:{" "}
              <a
                href="https://linkedin.com/in/gustavo-lobo"
                target="_blank"
                rel="noreferrer"
                className="underline underline-offset-4"
              >
                linkedin.com/in/gustavo-lobo
              </a>
            </p>
          </section>
        </div>
      </TracingBeam>
    </main>
  )
}
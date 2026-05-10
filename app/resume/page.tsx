import Image from "next/image"
import { Metadata } from "next"
import { Cloud, Database, Layers, Server } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"

export const metadata: Metadata = {
  title: "Resume — Gustavo Lobo | Backend & Distributed Systems Engineer",
  description:
    "Software engineer focused on backend, distributed systems, and event-driven architectures. Hands-on experience designing and operating mission-critical, high-throughput systems in production.",
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
    role: "Mid Software Engineer",
    company: "EBANX",
    period: "Feb 2026 — Present",
    context:
      "Distributed financial services across the Pix and Open Finance ecosystems, integrated with BACEN and Núclea infrastructures (SPI, DICT, STR, SITRAF, SLC, SILOC) under 99.999% SLA.",
    responsibilities: [
      "Evolve high-throughput Java/Spring Boot services for Pix transactional flows on AWS.",
      "Translate Pix and SPB business rules into DDD-aligned domain models alongside product.",
      "Investigate concurrency and eventual consistency issues with Hibernate L2 cache in multi-instance environments.",
      "Reduced p99 latency on transactional endpoints from ~40 ms to ~20 ms.",
      "Drive observability with Datadog APM, distributed tracing, Rollbar, and Kibana.",
    ],
    stack: ["Java", "Spring Boot", "AWS", "PostgreSQL", "DDD", "Datadog"],
  },
  {
    role: "Mid Software Engineer — R&D",
    company: "Fiscaltech",
    period: "Jan 2025 — Feb 2026",
    context:
      "Free-flow electronic toll platform — distributed, high-throughput, mission-critical systems with 99.999% SLA, strict consistency, and full auditability.",
    responsibilities: [
      "Owned event-driven Java/Spring Boot services on Kafka end-to-end, from design to production.",
      "Designed the transponder reading system (SLT) integrated with ARTESP's key management entity (EGC).",
      "Built distributed pipeline syncing TAG identifiers with toll operators via JMS and PostgreSQL logical replication to edge nodes.",
      "Operated on-prem Kubernetes, PostgreSQL HA with Patroni, Partman partitioning, GitLab CI/CD, and Ansible across 30+ hosts.",
      "Implemented centralized observability with Prometheus, Grafana, Loki, and Alertmanager.",
      "Mentored engineers and led code reviews to raise team engineering standards.",
    ],
    stack: ["Java", "Spring Boot", "Kafka", "PostgreSQL", "Kubernetes", "DDD", "Event-Driven"],
  },
  {
    role: "Software Engineer — ERP & Business",
    company: "Fiscaltech",
    period: "May 2024 — Jan 2025",
    context: "Stabilization and evolution of TOTVS Protheus across multiple business domains.",
    responsibilities: [
      "Led structural data and routine fixes after failed migrations to restore ERP consistency.",
      "Built customizations, routines, and REST APIs in AdvPL/TLPP following TOTVS standards.",
      "Delivered a decoupled Next.js web layer with operational dashboards and internal tooling.",
      "Set up CI/CD pipelines with GitHub Actions and Jenkins, including Protheus build artifacts.",
    ],
    stack: ["TOTVS Protheus", "AdvPL/TLPP", "Next.js", "Jenkins"],
  },
  {
    role: "Software Engineer",
    company: "WHB Automotive",
    period: "Apr 2022 — May 2024",
    context:
      "Corporate and industrial software for HR, Production, Quality, and Workplace Safety in a multi-stack environment.",
    responsibilities: [
      "Built web apps and internal APIs across PHP/Laravel, Node.js, Angular, and Vue.js.",
      "Designed real-time industrial KPI pipeline (OEE, MTTR, MTBF) from collectors to shop-floor dashboards.",
      "Delivered a Flutter (BLoC) HR mobile app used by 2,000+ employees in production.",
      "Built RPA automations with Electron.js and Puppeteer, eliminating manual HR routines across 20+ legacy systems.",
    ],
    stack: ["PHP", "Laravel", "TypeScript", "Vue.js", "Flutter", "MySQL", "SQL Server"],
  },
]

export default function ResumePage() {
  return (
    <main className="relative mx-auto max-w-3xl py-12 text-sm leading-relaxed antialiased">
      <div className="px-6">
        <header className="flex items-center gap-4">
          <div className="relative h-14 w-14 overflow-hidden rounded-md border">
            <Image src="/me.jpeg" alt="Gustavo Lobo" fill priority className="object-cover object-top" />
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
            Software engineer building and operating mission-critical, high-throughput backend systems in production. Focused on distributed systems, event-driven architectures, and Domain-Driven Design — applying observability, automation, and engineering rigor to ship resilient, scalable, and maintainable software.
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
                  <Badge variant="blue">TypeScript</Badge>
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

import { Metadata } from "next"
import { Separator } from "@/components/ui/separator"

export const metadata: Metadata = {
  title: "Resume",
  description:
    "Software Engineer focused on backend, distributed systems, and mission-critical production systems."
}

export default function ResumePage() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-10 text-sm leading-relaxed">
      {/* Header */}
      <header className="space-y-1">
        <h1 className="text-3xl font-semibold tracking-tight">
          Gustavo Lobo
        </h1>
        <p className="text-muted-foreground">
          Software Engineer — Backend & Distributed Systems
        </p>
      </header>

      <Separator className="my-8" />

      {/* Summary */}
      <section className="space-y-3">
        <h2 className="text-lg font-semibold">Summary</h2>
        <p className="text-muted-foreground">
          Software Engineer with hands-on experience designing, operating, and
          evolving mission-critical and highly transactional systems in
          production. Strong focus on backend engineering, distributed systems,
          and event-driven architectures, with technical ownership spanning
          architectural design, rollout, and post–go-live support in real-world
          environments.
        </p>
      </section>

      <Separator className="my-8" />

      {/* Experience */}
      <section className="space-y-6">
        <h2 className="text-lg font-semibold">Experience</h2>

        {/* Fiscaltech R&D */}
        <div className="space-y-2">
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
              Contributed to the development and operation of a nationwide
              electronic toll collection system (Free Flow), a highly
              transactional, mission-critical platform operating 24/7 and
              responsible for more than doubling the company’s revenue.
            </li>
            <li>
              Worked on systems processing large volumes of financial and
              operational data in real time under strict requirements for
              availability, consistency, and traceability.
            </li>
            <li>
              Held technical ownership of backend services from architectural
              design through rollout and post–go-live support, participating in
              architectural decisions and continuous evolution in production.
            </li>
            <li>
              Designed, developed, and operated backend services using Java
              (Spring Boot) with event-driven integration via Kafka.
            </li>
            <li>
              Operated PostgreSQL in high availability (Patroni), including
              logical replication and table partitioning for high data
              throughput.
            </li>
            <li>
              Deployed and operated services in on-premise Kubernetes
              environments with CI/CD pipelines, infrastructure automation,
              and centralized observability.
            </li>
          </ul>
        </div>

        {/* Fiscaltech ERP */}
        <div className="space-y-2">
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
              Developed and maintained integrations and custom solutions based
              on the TOTVS Protheus ERP, supporting multiple business areas.
            </li>
            <li>
              Designed and implemented REST APIs and backend routines following
              official Protheus architecture and best practices.
            </li>
            <li>
              Built a corporate web platform to centralize dashboards, reports,
              and strategic tools as a modern integration layer over legacy
              systems.
            </li>
            <li>
              Implemented process automation initiatives that reduced manual
              workflows and improved operational efficiency.
            </li>
          </ul>
        </div>

        {/* WHB */}
        <div className="space-y-2">
          <div>
            <p className="font-medium">
              Software Engineer
            </p>
            <p className="text-muted-foreground">
              WHB AUTOMOTIVE S.A · Apr 2022 — May 2024
            </p>
          </div>

          <ul className="list-disc space-y-1 pl-5 text-muted-foreground">
            <li>
              Worked in industrial and corporate environments delivering
              software solutions for HR, Manufacturing, Quality, Occupational
              Safety, and IT.
            </li>
            <li>
              Developed web applications and APIs integrated with multiple
              internal systems and databases.
            </li>
            <li>
              Delivered real-time dashboards and industrial performance
              indicators (OEE, MTTR, MTBF) for production and maintenance teams.
            </li>
            <li>
              Led refactoring and architectural standardization efforts,
              including containerization and improvements to legacy systems.
            </li>
          </ul>
        </div>
      </section>

      <Separator className="my-8" />

      {/* Skills */}
      <section className="space-y-3">
        <h2 className="text-lg font-semibold">Skills</h2>
        <p className="text-muted-foreground">
          Backend Development · Distributed Systems · Event-Driven Architecture ·
          Java (Spring Boot) · Apache Kafka · PostgreSQL · Kubernetes · CI/CD ·
          Observability · Linux · System Design
        </p>
      </section>

      <Separator className="my-8" />

      {/* Education */}
      <section className="space-y-3">
        <h2 className="text-lg font-semibold">Education</h2>

        <ul className="space-y-2 text-muted-foreground">
          <li>
            <span className="font-medium text-foreground">
              Postgraduate Degree — Software Architecture
            </span>{" "}
            · Universidade Tuiuti do Paraná (2025 — in progress)
          </li>
          <li>
            <span className="font-medium text-foreground">
              Postgraduate Degree — Software Engineering
            </span>{" "}
            · Universidade Tuiuti do Paraná (2025 — 2026)
          </li>
          <li>
            <span className="font-medium text-foreground">
              Postgraduate Degree — Business Intelligence, Big Data & Analytics
            </span>{" "}
            · Universidade Tuiuti do Paraná (2024 — 2025)
          </li>
          <li>
            <span className="font-medium text-foreground">
              Bachelor of Technology — Systems Analysis and Development
            </span>{" "}
            · UniCesumar (2021 — 2024)
          </li>
        </ul>
      </section>

      <Separator className="my-8" />

      {/* Contact */}
      <section className="space-y-2">
        <h2 className="text-lg font-semibold">Contact</h2>
        <p className="text-muted-foreground">
          Email:{" "}
          <a
            href="mailto:gustavoqe.75@gmail.com"
            className="underline underline-offset-4"
          >
            gustavoqe.75@gmail.com
          </a>
        </p>
        <p className="text-muted-foreground">
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
        <p className="text-muted-foreground">
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
    </main>
  )
}

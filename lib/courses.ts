export type CourseStatus = "Planned" | "Recording" | "Published"

export type CourseModule = {
  title: string
  summary: string
}

export type Course = {
  slug: string
  title: string
  shortTitle: string
  status: CourseStatus
  description: string
  level: string
  topics: string[]
  objectives: string[]
  methodology: string[]
  modules: CourseModule[]
  project: string[]
  outcomes: string[]
  tagline: string
  ogImage: string
  courseUrl?: string
  udemyUrl?: string
}

export const courses: Course[] = [
  {
    slug: "golang-pragmatic-backend",
    title: "GoLang Pragmático — Engenharia Backend AI-Driven (Do Zero ao Avançado em 1 Dia)",
    shortTitle: "GoLang Pragmático — Engenharia Backend AI-Driven",
    status: "Planned",
    description:
      "Formação intensiva para construir backends de produção com Go, focando em APIs, concorrência, arquitetura e práticas modernas com apoio de workflows de IA.",
    level: "Beginner to Advanced",
    topics: [
      "REST APIs",
      "Clean Architecture",
      "Concorrência",
      "SQL",
      "Workers assíncronos",
      "Docker",
      "Observabilidade",
      "AI workflows",
    ],
    objectives: [
      "Build REST APIs",
      "Apply Clean Architecture",
      "Use concurrency",
      "Integrate SQL",
      "Build workers",
      "Dockerize",
      "Add observability",
      "Use AI workflows",
    ],
    methodology: [
      "Hands-on coding do início ao fim",
      "Exercícios com feedback pragmático",
      "Foco em decisões reais de produção",
      "Estratégias AI-assisted para acelerar entrega",
    ],
    modules: [
      { title: "Foundations", summary: "Setup de ambiente, fundamentos de linguagem e padrão de projeto base." },
      { title: "Concurrency", summary: "Goroutines, channels, coordenação e controle de concorrência." },
      { title: "APIs", summary: "Design e implementação de APIs REST com validação e contratos." },
      { title: "Persistence", summary: "Integração SQL, migrations e acesso a dados robusto." },
      { title: "Architecture", summary: "Clean Architecture e separação clara de camadas." },
      { title: "Observability", summary: "Métricas, logs, health checks e troubleshooting." },
      { title: "Docker", summary: "Containerização e execução reprodutível para deploy." },
      { title: "Final Project", summary: "Sistema backend completo com cenários reais de produção." },
    ],
    project: [
      "CRUD",
      "Upload",
      "Async workers",
      "DB",
      "Queues",
      "Healthchecks",
      "Logs",
    ],
    outcomes: [
      "Entregar um backend de produção completo em Go",
      "Dominar padrões pragmáticos de arquitetura",
      "Operar serviços com foco em confiabilidade",
      "Aplicar workflows AI-driven com segurança técnica",
    ],
    tagline:
      "Aprenda Go como engenheiros de sistemas críticos aprendem — rápido, pragmático e orientado à produção.",
    ogImage: "/og.png",
  },
]

export function getCourseBySlug(slug: string): Course | null {
  return courses.find((course) => course.slug === slug) ?? null
}

export function withTrackingParams(url: string, source: string): string {
  const parsed = new URL(url)
  parsed.searchParams.set("utm_source", "portfolio")
  parsed.searchParams.set("utm_medium", "course_link")
  parsed.searchParams.set("utm_campaign", source)

  return parsed.toString()
}

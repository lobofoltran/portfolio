export type CourseStatus = "WIP" | "Recording" | "Published"

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
    title: "Pragmatic Go — AI-Driven Backend Engineering (Zero to Advanced in 1 Day)",
    shortTitle: "Pragmatic Go — AI-Driven Backend Engineering",
    status: "WIP",
    description:
      "Intensive training to build production backends in Go, focused on APIs, concurrency, architecture, and modern practices supported by AI workflows.",
    level: "Beginner to Advanced",
    topics: [
      "REST APIs",
      "Clean Architecture",
      "Concurrency",
      "SQL",
      "Async workers",
      "Docker",
      "Observability",
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
      "Hands-on coding from start to finish",
      "Exercises with pragmatic feedback",
      "Focus on real production decisions",
      "AI-assisted strategies to accelerate delivery",
    ],
    modules: [
      { title: "Foundations", summary: "Environment setup, language fundamentals, and baseline project pattern." },
      { title: "Concurrency", summary: "Goroutines, channels, coordination, and concurrency control." },
      { title: "APIs", summary: "Design and implementation of REST APIs with validation and contracts." },
      { title: "Persistence", summary: "SQL integration, migrations, and robust data access." },
      { title: "Architecture", summary: "Clean Architecture and clear separation of layers." },
      { title: "Observability", summary: "Metrics, logs, health checks, and troubleshooting." },
      { title: "Docker", summary: "Containerization and reproducible execution for deployment." },
      { title: "Final Project", summary: "Complete backend system with real production scenarios." },
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
      "Ship a complete production backend in Go",
      "Master pragmatic architecture patterns",
      "Operate services with a focus on reliability",
      "Apply AI-driven workflows with technical confidence",
    ],
    tagline:
      "Learn Go the way engineers of critical systems learn — fast, pragmatic, and production-oriented.",
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

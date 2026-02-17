import { Metadata } from "next"
import { notFound } from "next/navigation"

import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { courses, getCourseBySlug } from "@/lib/courses"

type Props = {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return courses.map((course) => ({ slug: course.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const course = getCourseBySlug(slug)

  if (!course) return {}

  return {
    title: `${course.shortTitle} — Course`,
    description: course.description,
    openGraph: {
      title: course.shortTitle,
      description: course.description,
      images: [{ url: course.ogImage, width: 1200, height: 630, alt: course.shortTitle }],
      type: "article",
    },
  }
}

export default async function CourseDetailsPage({ params }: Props) {
  const { slug } = await params
  const course = getCourseBySlug(slug)

  if (!course) notFound()

  return (
    <main className="mx-auto max-w-4xl px-6 py-16">
      <section className="space-y-6">
        <div className="space-y-3">
          <p className="text-sm text-muted-foreground">Course</p>
          <h1 className="text-3xl font-semibold tracking-tight">{course.title}</h1>
          <p className="text-muted-foreground">{course.tagline}</p>
          <Badge variant="outline">{course.status}</Badge>
        </div>

        <Card>
          <CardHeader><CardTitle>Positioning</CardTitle></CardHeader>
          <CardContent><p className="text-sm text-muted-foreground">{course.description}</p></CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle>Objectives</CardTitle></CardHeader>
          <CardContent>
            <ul className="list-disc space-y-1 pl-5 text-sm text-muted-foreground">
              {course.objectives.map((objective) => <li key={objective}>{objective}</li>)}
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle>Methodology</CardTitle></CardHeader>
          <CardContent>
            <ul className="list-disc space-y-1 pl-5 text-sm text-muted-foreground">
              {course.methodology.map((item) => <li key={item}>{item}</li>)}
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle>Modules</CardTitle></CardHeader>
          <CardContent className="space-y-3">
            {course.modules.map((module, index) => (
              <div key={module.title} className="rounded-md border p-3">
                <p className="text-sm font-medium">{index + 1}. {module.title}</p>
                <p className="text-sm text-muted-foreground">{module.summary}</p>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle>Final Project</CardTitle></CardHeader>
          <CardContent>
            <ul className="list-disc space-y-1 pl-5 text-sm text-muted-foreground">
              {course.project.map((item) => <li key={item}>{item}</li>)}
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle>Outcomes</CardTitle></CardHeader>
          <CardContent>
            <ul className="list-disc space-y-1 pl-5 text-sm text-muted-foreground">
              {course.outcomes.map((item) => <li key={item}>{item}</li>)}
            </ul>
          </CardContent>
        </Card>
      </section>
    </main>
  )
}

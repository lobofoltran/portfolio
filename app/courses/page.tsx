import { Metadata } from "next"
import Link from "next/link"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { courses, withTrackingParams } from "@/lib/courses"

export const metadata: Metadata = {
  title: "Courses — Gustavo Lobo",
  description: "Pragmatic backend and distributed systems courses.",
  openGraph: {
    title: "Courses — Gustavo Lobo",
    description: "Courses focused on production-ready backend engineering.",
    images: [{ url: "/og.png", width: 1200, height: 630, alt: "Gustavo Lobo Courses" }],
  },
}

export default function CoursesPage() {
  return (
    <main className="mx-auto max-w-4xl px-6 py-16">
      <header className="mb-10 space-y-2">
        <h1 className="text-3xl font-semibold tracking-tight">Courses</h1>
        <p className="text-muted-foreground">Practical and production-oriented backend training.</p>
      </header>

      <section className="space-y-6">
        {courses.map((course) => (
          <Card key={course.slug}>
            <CardHeader className="space-y-3">
              <div className="flex flex-wrap items-center gap-2">
                <CardTitle className="text-lg">{course.shortTitle}</CardTitle>
                <Badge variant="outline">{course.status}</Badge>
              </div>
              <p className="text-sm text-muted-foreground">{course.description}</p>
            </CardHeader>

            <CardContent className="space-y-4">
              <p className="text-sm"><span className="font-medium">Level:</span> {course.level}</p>

              <div className="space-y-2">
                <p className="text-sm font-medium">Topics</p>
                <div className="flex flex-wrap gap-2">
                  {course.topics.map((topic) => (
                    <Badge key={topic} variant="outline">{topic}</Badge>
                  ))}
                </div>
              </div>

              <div className="flex flex-wrap gap-2 pt-2">
                <Button asChild size="sm">
                  <Link href={`/courses/${course.slug}`}>View course</Link>
                </Button>

                {course.udemyUrl ? (
                  <Button asChild variant="outline" size="sm">
                    <a href={withTrackingParams(course.udemyUrl, "udemy")} target="_blank" rel="noreferrer">Udemy</a>
                  </Button>
                ) : (
                  <Button variant="outline" size="sm" disabled>Udemy</Button>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </section>
    </main>
  )
}

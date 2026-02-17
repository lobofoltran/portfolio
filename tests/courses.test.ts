import { describe, expect, it } from "vitest"

import { courses, getCourseBySlug, withTrackingParams } from "@/lib/courses"

describe("courses", () => {
  it("resolves golang course route", () => {
    const course = getCourseBySlug("golang-pragmatic-backend")
    expect(course?.title).toContain("GoLang Pragmático")
  })

  it("has required modules", () => {
    expect(courses[0].modules).toHaveLength(8)
    expect(courses[0].modules[0].title).toBe("Foundations")
  })

  it("adds external tracking params", () => {
    const tracked = withTrackingParams("https://example.com/course", "udemy")
    expect(tracked).toContain("utm_source=portfolio")
    expect(tracked).toContain("utm_medium=course_link")
    expect(tracked).toContain("utm_campaign=udemy")
  })
})

import { describe, expect, it } from "vitest"

import { shouldCloseOnKey } from "@/components/blog/zoom-image"

describe("zoom image", () => {
  it("closes on escape", () => {
    expect(shouldCloseOnKey("Escape")).toBe(true)
  })

  it("does not close on other keys", () => {
    expect(shouldCloseOnKey("Enter")).toBe(false)
  })
})

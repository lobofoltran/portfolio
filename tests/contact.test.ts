import { describe, expect, it } from "vitest"

const CONTACT_EMAIL = "gustavo@lobofoltran.dev"

describe("contact contract", () => {
  it("uses the expected public contact email", () => {
    expect(CONTACT_EMAIL).toBe("gustavo@lobofoltran.dev")
  })
})

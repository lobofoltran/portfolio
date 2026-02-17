import { Metadata } from "next"

import { EmailCard } from "@/components/contact/email-card"

export const metadata: Metadata = {
  title: "Contact — Gustavo Lobo",
  description: "Professional contact channel for engineering consulting and collaboration.",
  openGraph: {
    title: "Contact — Gustavo Lobo",
    description: "Reach out directly by email for backend and distributed systems collaborations.",
    images: [{ url: "/og.png", width: 1200, height: 630, alt: "Contact Gustavo Lobo" }],
  },
}

export default function ContactPage() {
  return (
    <main className="mx-auto max-w-5xl px-6 py-20">
      <header className="mb-10 space-y-2 text-center">
        <h1 className="text-3xl font-semibold tracking-tight">Contact</h1>
      </header>
      <EmailCard />
    </main>
  )
}

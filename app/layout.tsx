import type { Metadata } from "next"
import { Inter } from "next/font/google"

import "./globals.css"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter"
})

export const metadata: Metadata = {
  title: {
    default: "Gustavo Foltran",
    template: "%s | Gustavo Foltran"
  },
  description:
    "Software Engineer focused on architecture, distributed systems, and performance.",
  openGraph: {
    title: "Gustavo Foltran",
    description:
      "Software Engineer focused on architecture, distributed systems, and performance.",
    url: "https://seusite.com",
    siteName: "Gustavo Foltran",
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "Gustavo Foltran"
      }
    ],
    locale: "en_US",
    type: "website"
  }
}

export default function RootLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.variable} min-h-screen bg-background font-sans antialiased`}
      >
        <div className="flex min-h-screen flex-col">
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  )
}

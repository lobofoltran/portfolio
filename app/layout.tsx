import type { Metadata } from "next"

import "./globals.css"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { inter } from "./fonts"
import { ThemeProvider } from "next-themes"
import { Providers } from "./providers"
import { Suspense } from "react"
import { AppLoading } from "@/components/app-loading"


export const metadata: Metadata = {
  title: {
    default: "Gustavo Lobo",
    template: "%s | Gustavo Lobo"
  },
  description:
    "Software Engineer focused on architecture, distributed systems, and performance.",
  openGraph: {
    title: "Gustavo Lobo",
    description:
      "Software Engineer focused on architecture, distributed systems, and performance.",
    url: "https://seusite.com",
    siteName: "Gustavo Lobo",
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "Gustavo Lobo"
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
        className={`${inter.className} min-h-screen bg-background font-sans antialiased dark`}
      >
        <Suspense fallback={<AppLoading />}>
          <Providers>
            <div className="flex min-h-screen flex-col">
              <Header />
              <main className="flex-1">{children}</main>
              <Footer />
            </div>
          </Providers>
        </Suspense>
      </body>
    </html>
  )
}

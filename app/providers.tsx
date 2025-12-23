"use client"

import { AppLoading } from "@/components/app-loading"
import { ThemeProvider } from "next-themes"
import { useEffect, useState } from "react"

export function Providers({ children }: { children: React.ReactNode }) {
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        setMounted(true)
    }, [])

    if (!mounted) {
        return <AppLoading />
    }

    return (
        <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
        >
            {children}
        </ThemeProvider>
    )
}

import type React from "react"
import type { Metadata } from "next"
import { Outfit } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { Sidebar } from "@/components/sidebar"

const outfit = Outfit({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "EduGen - Educational Material Generator",
  description: "AI-powered educational material generator for universities",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={outfit.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <div className="flex h-screen bg-[#f0f7ff] dark:bg-gray-900 transition-colors duration-300">
            <Sidebar />
            <main className="flex-1 overflow-y-auto">{children}</main>
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}



import './globals.css'
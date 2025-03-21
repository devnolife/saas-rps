"use client"

import { useEffect, useState } from "react"
import { useTheme } from "next-themes"
import { Sun, Moon } from "lucide-react"

export function ThemeIndicator() {
  const { theme, resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const [showIndicator, setShowIndicator] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (mounted) {
      setShowIndicator(true)
      const timer = setTimeout(() => {
        setShowIndicator(false)
      }, 2000)

      return () => clearTimeout(timer)
    }
  }, [theme, mounted])

  if (!mounted || !showIndicator) return null

  const currentTheme = resolvedTheme || theme

  return (
    <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50 animate-fade-in-up">
      <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white dark:bg-gray-800 shadow-lg border-2 border-primary-lighter">
        {currentTheme === "dark" ? (
          <>
            <Moon className="h-5 w-5 text-primary" />
            <span className="font-medium">Dark Mode Enabled</span>
          </>
        ) : (
          <>
            <Sun className="h-5 w-5 text-primary" />
            <span className="font-medium">Light Mode Enabled</span>
          </>
        )}
      </div>
    </div>
  )
}


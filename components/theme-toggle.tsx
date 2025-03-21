"use client"

import { useEffect, useState } from "react"
import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"
import { Moon, Sun, Monitor } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  // Ensure component is mounted before rendering to avoid hydration mismatch
  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  return (
    <div className="flex items-center gap-2">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="outline"
            size="icon"
            className="relative h-10 w-10 rounded-full border-2 hover:border-primary hover:bg-primary-lighter/20 transition-all duration-300"
            aria-label="Toggle theme"
          >
            <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            <span className="sr-only">Toggle theme</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="rounded-2xl p-2 border-2 border-gray-100 dark:border-gray-700">
          <DropdownMenuItem
            onClick={() => setTheme("light")}
            className={`flex items-center gap-2 rounded-xl px-3 py-2 text-base cursor-pointer ${theme === "light" ? "bg-primary-lighter text-primary" : ""}`}
          >
            <Sun className="h-5 w-5" />
            <span>Light</span>
            {theme === "light" && <div className="ml-auto h-2 w-2 rounded-full bg-primary" />}
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => setTheme("dark")}
            className={`flex items-center gap-2 rounded-xl px-3 py-2 text-base cursor-pointer ${theme === "dark" ? "bg-primary-lighter/20 text-primary-light" : ""}`}
          >
            <Moon className="h-5 w-5" />
            <span>Dark</span>
            {theme === "dark" && <div className="ml-auto h-2 w-2 rounded-full bg-primary" />}
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => setTheme("system")}
            className={`flex items-center gap-2 rounded-xl px-3 py-2 text-base cursor-pointer ${theme === "system" ? "bg-primary-lighter/20 text-primary" : ""}`}
          >
            <Monitor className="h-5 w-5" />
            <span>System</span>
            {theme === "system" && <div className="ml-auto h-2 w-2 rounded-full bg-primary" />}
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}

export function ThemeToggleSimple() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  // Ensure component is mounted before rendering to avoid hydration mismatch
  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  return (
    <Button
      variant="outline"
      size="icon"
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="relative h-10 w-10 rounded-full border-2 hover:border-primary hover:bg-primary-lighter/20 transition-all duration-300"
      aria-label="Toggle theme"
    >
      <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
      <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
      <span className="sr-only">Toggle theme</span>
    </Button>
  )
}


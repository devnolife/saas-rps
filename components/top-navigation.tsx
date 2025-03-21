"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Bell, Search, Settings, Sparkles } from "lucide-react"
import { ThemeToggle } from "@/components/theme-toggle"

export function TopNavigation() {
  return (
    <div className="flex items-center justify-between bg-white dark:bg-gray-800 rounded-3xl p-3 shadow-lg mb-6 theme-transition">
      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          size="sm"
          className="rounded-full border-primary-lighter bg-primary-lighter/30 text-primary theme-transition"
        >
          <Search className="h-4 w-4 mr-2" />
          Find Materials
        </Button>
        <Button variant="outline" size="sm" className="rounded-full theme-transition">
          My Library
        </Button>
        <Button variant="outline" size="sm" className="rounded-full theme-transition">
          Templates
        </Button>
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search anything..."
          className="pl-9 w-72 rounded-full border-gray-200 dark:border-gray-700 focus:border-primary focus:ring-2 focus:ring-primary/20 theme-transition"
        />
      </div>

      <div className="flex items-center gap-3">
        <ThemeToggle />
        <Button variant="ghost" size="icon" className="rounded-full relative theme-transition">
          <Bell className="h-5 w-5" />
          <span className="absolute -top-1 -right-1 w-3 h-3 bg-primary rounded-full"></span>
        </Button>
        <Button variant="ghost" size="icon" className="rounded-full theme-transition">
          <Settings className="h-5 w-5" />
        </Button>
        <Button className="rounded-full bg-primary hover:bg-primary-dark text-white shadow-md hover:shadow-lg transition-all duration-300 flex items-center gap-2 theme-transition">
          <Sparkles className="h-4 w-4" />
          Create New
        </Button>
      </div>
    </div>
  )
}


"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { BellIcon, MoonIcon, SearchIcon, SunIcon } from "lucide-react"
import { useTheme } from "next-themes"

export function DashboardHeader() {
  const { theme, setTheme } = useTheme()

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Welcome, Dr. Doe</h1>
          <p className="text-muted-foreground mt-1">Create and manage your educational materials</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative">
            <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search materials..." className="pl-9 w-64" />
          </div>
          <Button variant="ghost" size="icon" onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
            {theme === "dark" ? <SunIcon className="h-5 w-5" /> : <MoonIcon className="h-5 w-5" />}
          </Button>
          <Button variant="ghost" size="icon">
            <BellIcon className="h-5 w-5" />
          </Button>
          <Button variant="default">New Material</Button>
        </div>
      </div>
    </div>
  )
}


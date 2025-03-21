"use client"

import { useState } from "react"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  BookOpen,
  FileText,
  GraduationCap,
  LayoutDashboard,
  Settings,
  Calendar,
  MessageSquare,
  Sparkles,
  FileSpreadsheet,
} from "lucide-react"

// Update the navItems array to include the RPS Generator with a badge
const navItems = [
  { name: "Dashboard", href: "/", icon: LayoutDashboard },
  { name: "Materials", href: "/materials", icon: FileText },
  { name: "RPS Generator", href: "/rps-generator", icon: FileSpreadsheet, badge: "New" },
  { name: "Courses", href: "/courses", icon: BookOpen },
  { name: "Students", href: "/students", icon: GraduationCap },
  { name: "Calendar", href: "/calendar", icon: Calendar },
  { name: "Messages", href: "/messages", icon: MessageSquare, badge: "3" },
  { name: "Settings", href: "/settings", icon: Settings },
]

export function Sidebar() {
  const [active, setActive] = useState("RPS Generator") // Set RPS Generator as active by default

  return (
    <div className="w-72 bg-white dark:bg-gray-800 h-screen flex flex-col rounded-r-4xl shadow-lg theme-transition">
      <div className="p-6 flex justify-center bg-gradient-to-r from-[#5fa2db] to-[#7ab8e6] rounded-tr-4xl">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 bg-white flex items-center justify-center rounded-2xl rotate-12 shadow-md">
            <Sparkles className="h-6 w-6 text-[#5fa2db]" />
          </div>
          <h1 className="text-2xl font-bold text-white">EduGen</h1>
        </div>
      </div>

      <div className="p-6 flex flex-col items-center border-b border-gray-100 dark:border-gray-700">
        <div className="relative">
          <div className="absolute -top-2 -right-2 w-6 h-6 bg-cyan-100 dark:bg-cyan-800 rounded-full flex items-center justify-center shadow-md">
            <span className="text-xs">✨</span>
          </div>
          <Avatar className="w-20 h-20 mb-3 border-4 border-[#d0e4f5] dark:border-[#3a5d7d]">
            <AvatarImage src="/placeholder.svg?height=80&width=80" alt="User" />
            <AvatarFallback className="bg-[#5fa2db] text-white">JD</AvatarFallback>
          </Avatar>
        </div>
        <p className="font-medium text-lg">Dr. Jane Doe</p>
        <p className="text-sm text-muted-foreground">Computer Science, MIT</p>
        <div className="mt-2 px-3 py-1 bg-[#d0e4f5] dark:bg-[#3a5d7d] rounded-full text-xs font-medium text-[#5fa2db] dark:text-[#a8d1f0]">
          Pro Educator 🏆
        </div>
      </div>

      <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
        {navItems.map((item) => (
          <Link key={item.name} href={item.href} onClick={() => setActive(item.name)}>
            <Button
              variant={active === item.name ? "secondary" : "ghost"}
              className={cn(
                "w-full justify-start rounded-2xl h-12 text-base",
                active === item.name &&
                  "bg-[#e6f1fa] text-[#5fa2db] font-medium dark:bg-[#2c4c6b]/30 dark:text-[#a8d1f0]",
              )}
            >
              <item.icon className="mr-3 h-5 w-5" />
              {item.name}
              {item.badge && (
                <span
                  className={`ml-auto px-2 py-0.5 rounded-full text-xs ${item.badge === "New" ? "bg-gradient-to-r from-[#5fa2db] to-[#7ab8e6]" : "bg-[#5fa2db]"} text-white animate-pulse-light`}
                >
                  {item.badge}
                </span>
              )}
            </Button>
          </Link>
        ))}
      </nav>

      <div className="p-4 m-4 bg-[#e6f1fa] dark:bg-[#2c4c6b]/30 rounded-3xl relative overflow-hidden">
        <div className="absolute -right-6 -bottom-6 w-24 h-24 gen-z-blob-alt bg-[#d0e4f5]/50 dark:bg-[#3a5d7d]/30 animate-float"></div>
        <div className="relative z-10">
          <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-r from-[#5fa2db] to-[#7ab8e6] rounded-2xl mb-3 shadow-md">
            <Sparkles className="h-6 w-6 text-white" />
          </div>
          <h3 className="font-medium text-lg mb-2 text-[#2c4c6b] dark:text-[#a8d1f0]">AI Assistant</h3>
          <p className="text-sm mb-3 text-[#3a5d7d]/80 dark:text-[#a8d1f0]/80">
            Need help creating materials? Ask our AI!
          </p>
          <Button className="w-full text-sm bg-gradient-to-r from-[#5fa2db] to-[#7ab8e6] hover:from-[#4a8bc7] hover:to-[#6aa7d9] text-white rounded-xl shadow-md">
            Ask AI Assistant
          </Button>
        </div>
      </div>
    </div>
  )
}


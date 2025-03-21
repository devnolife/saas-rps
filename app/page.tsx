import { TopNavigation } from "@/components/top-navigation"
import { MaterialGenerator } from "@/components/material-generator"
import { ThemeIndicator } from "@/components/theme-indicator"

export default function Home() {
  return (
    <div className="p-6">
      <TopNavigation />
      <MaterialGenerator />
      <ThemeIndicator />
    </div>
  )
}


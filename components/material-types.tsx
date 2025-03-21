import { Card, CardContent } from "@/components/ui/card"
import { BookText, FileQuestion, FileSpreadsheet, Presentation } from "lucide-react"

const materialTypes = [
  {
    title: "Lecture Notes",
    description: "Comprehensive notes with key concepts",
    icon: BookText,
    color: "bg-blue-100 dark:bg-blue-950",
    textColor: "text-blue-600 dark:text-blue-400",
  },
  {
    title: "Quizzes",
    description: "Assessment questions with answers",
    icon: FileQuestion,
    color: "bg-amber-100 dark:bg-amber-950",
    textColor: "text-amber-600 dark:text-amber-400",
  },
  {
    title: "Assignments",
    description: "Practical tasks and problem sets",
    icon: FileSpreadsheet,
    color: "bg-green-100 dark:bg-green-950",
    textColor: "text-green-600 dark:text-green-400",
  },
  {
    title: "Presentations",
    description: "Visual slides for classroom teaching",
    icon: Presentation,
    color: "bg-purple-100 dark:bg-purple-950",
    textColor: "text-purple-600 dark:text-purple-400",
  },
]

export function MaterialTypes() {
  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Material Types</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {materialTypes.map((type) => (
          <Card key={type.title} className="border hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className={`w-12 h-12 rounded-full ${type.color} flex items-center justify-center mb-4`}>
                <type.icon className={`h-6 w-6 ${type.textColor}`} />
              </div>
              <h3 className="font-medium text-lg">{type.title}</h3>
              <p className="text-sm text-muted-foreground mt-1">{type.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}


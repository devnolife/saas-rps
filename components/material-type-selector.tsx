"use client"

import { BookText, FileQuestion, FileSpreadsheet, Presentation, Sparkles } from "lucide-react"

const materialTypes = [
  {
    id: "lecture-notes",
    title: "Lecture Notes",
    description: "Comprehensive notes with key concepts",
    icon: BookText,
    emoji: "📝",
    color: "primary",
  },
  {
    id: "quizzes",
    title: "Quizzes",
    description: "Assessment questions with answers",
    icon: FileQuestion,
    emoji: "❓",
    color: "primary",
  },
  {
    id: "assignments",
    title: "Assignments",
    description: "Practical tasks and problem sets",
    icon: FileSpreadsheet,
    emoji: "📋",
    color: "primary",
  },
  {
    id: "presentations",
    title: "Presentations",
    description: "Visual slides for classroom teaching",
    icon: Presentation,
    emoji: "🎯",
    color: "primary",
  },
]

interface MaterialTypeSelectorProps {
  selectedType: string
  onSelectType: (type: string) => void
}

export function MaterialTypeSelector({ selectedType, onSelectType }: MaterialTypeSelectorProps) {
  return (
    <div>
      <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
        <Sparkles className="h-5 w-5 text-primary" />
        Material Type
      </h2>
      <div className="space-y-4">
        {materialTypes.map((type) => (
          <div
            key={type.id}
            className={`border-2 ${selectedType === type.id ? "border-primary bg-primary-lighter/20" : "border-gray-100 dark:border-gray-700"} rounded-3xl p-4 cursor-pointer transition-all duration-300 hover:shadow-md ${selectedType === type.id ? "" : "hover:border-primary-lighter"}`}
            onClick={() => onSelectType(type.id)}
          >
            <div className="flex items-start gap-4">
              <div
                className={`w-12 h-12 rounded-2xl ${selectedType === type.id ? "bg-primary text-white" : "bg-gray-100 dark:bg-gray-700 text-primary dark:text-primary-light"} flex items-center justify-center shadow-md`}
              >
                {selectedType === type.id ? (
                  <span className="text-xl">{type.emoji}</span>
                ) : (
                  <type.icon className="h-6 w-6" />
                )}
              </div>
              <div>
                <h3 className="font-medium text-lg">{type.title}</h3>
                <p className="text-sm text-muted-foreground">{type.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}


import { BookText, FileQuestion, FileSpreadsheet, Presentation } from "lucide-react"

const categories = [
  {
    title: "Lecture Notes",
    description: "Michael Anderson",
    icon: () => (
      <div className="w-full h-full flex items-center justify-center bg-blue-100 rounded-xl p-4">
        <div className="relative">
          <div className="absolute -top-4 -left-4 w-3 h-3 bg-blue-400 rounded-full"></div>
          <div className="absolute -top-1 -right-2 w-2 h-2 bg-blue-300 rounded-full"></div>
          <BookText className="h-10 w-10 text-blue-500" />
          <div className="absolute -bottom-2 -right-4 w-4 h-4 bg-blue-200 rounded-full"></div>
        </div>
      </div>
    ),
  },
  {
    title: "Quizzes",
    description: "Michael Anderson",
    icon: () => (
      <div className="w-full h-full flex items-center justify-center bg-yellow-100 rounded-xl p-4">
        <div className="relative">
          <div className="absolute -top-4 -left-2 w-3 h-3 bg-yellow-400 rounded-full"></div>
          <div className="absolute -top-1 -right-4 w-2 h-2 bg-yellow-300 rounded-full"></div>
          <FileQuestion className="h-10 w-10 text-yellow-500" />
          <div className="absolute -bottom-2 -right-3 w-4 h-4 bg-yellow-200 rounded-full"></div>
        </div>
      </div>
    ),
  },
  {
    title: "Assignments",
    description: "Michael Anderson",
    icon: () => (
      <div className="w-full h-full flex items-center justify-center bg-green-100 rounded-xl p-4">
        <div className="relative">
          <div className="absolute -top-3 -left-3 w-3 h-3 bg-green-400 rounded-full"></div>
          <div className="absolute -top-1 -right-3 w-2 h-2 bg-green-300 rounded-full"></div>
          <FileSpreadsheet className="h-10 w-10 text-green-500" />
          <div className="absolute -bottom-2 -right-4 w-4 h-4 bg-green-200 rounded-full"></div>
        </div>
      </div>
    ),
  },
  {
    title: "Presentations",
    description: "Michael Anderson",
    icon: () => (
      <div className="w-full h-full flex items-center justify-center bg-purple-100 rounded-xl p-4">
        <div className="relative">
          <div className="absolute -top-4 -left-3 w-3 h-3 bg-purple-400 rounded-full"></div>
          <div className="absolute -top-1 -right-3 w-2 h-2 bg-purple-300 rounded-full"></div>
          <Presentation className="h-10 w-10 text-purple-500" />
          <div className="absolute -bottom-2 -right-4 w-4 h-4 bg-purple-200 rounded-full"></div>
        </div>
      </div>
    ),
  },
]

export function LearningCategories() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {categories.map((category, index) => (
        <div key={index} className="group cursor-pointer">
          <div className="border border-gray-100 dark:border-gray-700 rounded-xl p-4 transition-all hover:shadow-md">
            <div className="h-32 mb-4">{category.icon()}</div>
            <h3 className="font-medium">{category.title}</h3>
            <p className="text-sm text-gray-500">{category.description}</p>
          </div>
        </div>
      ))}
    </div>
  )
}


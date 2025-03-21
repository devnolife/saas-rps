"use client"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Edit, Share } from "lucide-react"

const todoItems = [
  {
    title: "Create a lecture on data structures",
    priority: "Low",
    category: "Lecture design",
    assignee: {
      name: "David Wilson",
      avatar: "/placeholder.svg?height=32&width=32",
    },
  },
  {
    title: "Design a midterm exam for CS101",
    priority: "High",
    category: "Assessment design",
    assignee: {
      name: "Rachel Lee",
      avatar: "/placeholder.svg?height=32&width=32",
    },
  },
]

export function TodoList() {
  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-medium">To do list</h2>
        <div className="flex -space-x-2">
          <Avatar className="border-2 border-white dark:border-gray-800 w-8 h-8">
            <AvatarImage src="/placeholder.svg?height=32&width=32" />
            <AvatarFallback>U1</AvatarFallback>
          </Avatar>
          <Avatar className="border-2 border-white dark:border-gray-800 w-8 h-8">
            <AvatarImage src="/placeholder.svg?height=32&width=32" />
            <AvatarFallback>U2</AvatarFallback>
          </Avatar>
          <Avatar className="border-2 border-white dark:border-gray-800 w-8 h-8">
            <AvatarImage src="/placeholder.svg?height=32&width=32" />
            <AvatarFallback>U3</AvatarFallback>
          </Avatar>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {todoItems.map((item, index) => (
          <div key={index} className="border border-gray-100 dark:border-gray-700 rounded-xl p-4">
            <div className="flex justify-between mb-4">
              <h3 className="font-medium">{item.title}</h3>
              <span
                className={`text-xs px-2 py-1 rounded-full ${
                  item.priority === "High"
                    ? "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100"
                    : "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100"
                }`}
              >
                {item.priority}
              </span>
            </div>

            <div className="flex justify-between items-center">
              <Button variant="outline" size="sm" className="rounded-full text-xs px-3 py-1 h-auto">
                {item.category}
              </Button>

              <div className="flex items-center gap-2">
                <Avatar className="w-6 h-6">
                  <AvatarImage src={item.assignee.avatar} />
                  <AvatarFallback>{item.assignee.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <span className="text-xs text-gray-500">{item.assignee.name}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-end mt-4 gap-2">
        <Button variant="ghost" size="sm" className="text-gray-500">
          <Edit className="h-4 w-4 mr-1" />
          Edit
        </Button>
        <Button variant="ghost" size="sm" className="text-gray-500">
          <Share className="h-4 w-4 mr-1" />
          Share
        </Button>
      </div>
    </div>
  )
}


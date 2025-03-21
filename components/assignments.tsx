"use client"

import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"

const assignmentItems = [
  {
    title: "Course syllabus",
    type: "Document",
    date: "24 March, 10:30 AM",
    duration: "02 h 45 m",
    progress: 90,
    score: "8/9",
  },
  {
    title: "Midterm questions",
    type: "Assessment",
    date: "14 April, 12:30 AM",
    duration: "04 h 15 m",
    progress: 50,
    score: "7/14",
  },
]

export function Assignments() {
  return (
    <div>
      <h2 className="text-lg font-medium mb-4">My assignments</h2>

      <div className="space-y-4">
        {assignmentItems.map((item, index) => (
          <div
            key={index}
            className="flex items-start gap-4 pb-4 border-b border-gray-100 dark:border-gray-700 last:border-0"
          >
            <div className="w-10 h-10 rounded-full bg-lime-100 flex items-center justify-center text-lime-600 dark:bg-lime-900 dark:text-lime-300">
              {item.type === "Document" ? "D" : "A"}
            </div>

            <div className="flex-1">
              <div className="flex justify-between">
                <div>
                  <h3 className="font-medium">{item.title}</h3>
                  <p className="text-xs text-gray-500">{item.date}</p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-gray-500">Duration</p>
                  <p className="text-xs font-medium">{item.duration}</p>
                </div>
              </div>

              <div className="mt-2 flex items-center gap-4">
                <div className="flex-1">
                  <div className="h-1.5 w-full bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-lime-400 dark:bg-lime-500 rounded-full"
                      style={{ width: `${item.progress}%` }}
                    ></div>
                  </div>
                </div>
                <span className="text-sm font-medium">{item.score}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <Button
        variant="outline"
        className="w-full mt-4 border-dashed border-gray-300 dark:border-gray-600 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
      >
        <Plus className="h-4 w-4 mr-2" />
        Add new assignment
      </Button>
    </div>
  )
}


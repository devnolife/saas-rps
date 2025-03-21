"use client"

import { Button } from "@/components/ui/button"

const progressItems = [
  {
    category: "COURSE CREATION",
    title: "Lecture Notes",
    percentage: 90,
    color: "lime",
    marked: "5/5",
    message: "All materials are done!",
  },
  {
    category: "MATERIAL DESIGN",
    title: "Presentations",
    percentage: 60,
    color: "yellow",
    marked: "3/5",
    message: "2 assignments left",
  },
  {
    category: "QUIZ DESIGN",
    title: "Assessments",
    percentage: 30,
    color: "blue",
    marked: "1.5",
    message: "4 assignments left",
  },
]

export function ProgressTrackers() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {progressItems.map((item, index) => (
        <div key={index} className="flex flex-col">
          <div className="flex items-center gap-3 mb-2">
            <div className={`w-12 h-12 rounded-full bg-${item.color}-100 flex items-center justify-center relative`}>
              <div
                className={`w-12 h-12 rounded-full border-4 border-${item.color}-400 absolute`}
                style={{
                  clipPath: `polygon(0 0, 100% 0, 100% 100%, 0 100%, 0 ${100 - item.percentage}%)`,
                }}
              ></div>
              <span className="text-sm font-bold">{item.percentage}%</span>
            </div>
            <div>
              <p className="text-xs text-gray-500">{item.category}</p>
              <p className="font-medium">{item.title}</p>
            </div>
          </div>
          <div className="text-sm text-gray-500 mb-2">
            You marked {item.marked}
            <br />
            {item.message}
          </div>
          {item.percentage < 100 && (
            <Button
              variant="outline"
              size="sm"
              className="self-end rounded-full text-xs px-3 py-1 h-auto bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600"
            >
              Check
            </Button>
          )}
        </div>
      ))}
    </div>
  )
}


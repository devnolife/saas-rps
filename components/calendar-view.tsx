"use client"

import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"

const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
const dates = [14, 15, 16, 17, 18, 19, 20]

const events = [
  {
    time: "10:30-12:00",
    title: "Team meeting",
    subtitle: "Motion design",
    type: "meeting",
  },
  {
    time: "12:30",
    title: "Meeting with supervisor",
    subtitle: "Job interview",
    type: "interview",
  },
]

export function CalendarView() {
  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-medium">April 2021</h2>
        <div className="flex gap-1">
          <Button variant="ghost" size="icon" className="h-6 w-6 rounded-full">
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" className="h-6 w-6 rounded-full">
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-7 gap-1 mb-6">
        {days.map((day, i) => (
          <div key={i} className="text-center text-xs text-gray-500">
            {day}
          </div>
        ))}

        {dates.map((date, i) => (
          <div key={i} className="text-center">
            <Button
              variant="ghost"
              size="sm"
              className={`w-8 h-8 p-0 rounded-full ${date === 18 ? "bg-yellow-400 text-yellow-900" : ""}`}
            >
              {date}
            </Button>
          </div>
        ))}
      </div>

      <div className="space-y-6">
        {events.map((event, i) => (
          <div key={i} className="relative">
            <div className="text-xs text-gray-500 mb-1">{event.time}</div>
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center">
                <div className="w-3 h-3 rounded-full bg-lime-400"></div>
              </div>
              <div>
                <h3 className="font-medium text-sm">{event.title}</h3>
                <p className="text-xs text-gray-500">{event.subtitle}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}


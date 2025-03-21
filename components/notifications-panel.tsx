"use client"

import { Button } from "@/components/ui/button"
import { MoreHorizontal, Edit } from "lucide-react"

const notifications = [
  {
    title: "Upcoming event",
    description: "Product design meeting | Time: 120 min",
    date: "Wed, 20 Apr",
    time: "11 AM - 11:45 AM",
  },
]

const boardMeeting = {
  title: "Board meeting",
  date: "March 24 at 4:00 PM",
  description: "Meeting with Ann Perkins, room 15",
}

export function NotificationsPanel() {
  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-medium">Notifications</h2>
        <Button variant="ghost" size="sm" className="text-xs text-gray-500">
          Clear
        </Button>
      </div>

      <div className="space-y-4">
        {notifications.map((notification, i) => (
          <div key={i} className="border border-gray-100 dark:border-gray-700 rounded-xl p-3">
            <div className="flex justify-between items-start mb-2">
              <h3 className="font-medium">{notification.title}</h3>
              <Button variant="ghost" size="icon" className="h-6 w-6 rounded-full">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </div>

            <p className="text-sm text-gray-500 mb-2">{notification.description}</p>

            <div className="flex items-center gap-2">
              <div className="w-5 h-5 rounded-full border border-gray-300 flex items-center justify-center">
                <span className="text-xs">📅</span>
              </div>
              <span className="text-xs">{notification.date}</span>

              <div className="w-5 h-5 rounded-full border border-gray-300 flex items-center justify-center ml-2">
                <span className="text-xs">⏰</span>
              </div>
              <span className="text-xs">{notification.time}</span>
            </div>
          </div>
        ))}

        <div className="mt-6">
          <div className="flex justify-between items-center mb-2">
            <h3 className="font-medium">{boardMeeting.title}</h3>
            <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
              <Edit className="h-4 w-4" />
            </Button>
          </div>

          <div className="flex items-center gap-2 mb-2">
            <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
            <span className="text-sm">{boardMeeting.date}</span>
          </div>

          <p className="text-sm text-gray-500 mb-4">{boardMeeting.description}</p>

          <div className="flex gap-2">
            <Button variant="outline" className="flex-1 rounded-full">
              Reschedule
            </Button>
            <Button className="flex-1 rounded-full bg-lime-400 text-black hover:bg-lime-500">Accept invite</Button>
          </div>
        </div>
      </div>
    </div>
  )
}


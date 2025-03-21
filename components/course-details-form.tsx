"use client"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Sparkles } from "lucide-react"

export function CourseDetailsForm() {
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
        <Sparkles className="h-5 w-5 text-primary" />
        Course Details
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="course-title" className="text-base font-medium">
            Course Title
          </Label>
          <Input
            id="course-title"
            placeholder="e.g., Introduction to Computer Science"
            className="rounded-2xl border-2 border-gray-200 dark:border-gray-700 focus-visible:ring-primary h-12"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="course-code" className="text-base font-medium">
            Course Code
          </Label>
          <Input
            id="course-code"
            placeholder="e.g., CS101"
            className="rounded-2xl border-2 border-gray-200 dark:border-gray-700 focus-visible:ring-primary h-12"
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="topic" className="text-base font-medium">
          Topic
        </Label>
        <Input
          id="topic"
          placeholder="e.g., Data Structures and Algorithms"
          className="rounded-2xl border-2 border-gray-200 dark:border-gray-700 focus-visible:ring-primary h-12"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="learning-objectives" className="text-base font-medium">
          Learning Objectives
        </Label>
        <Textarea
          id="learning-objectives"
          placeholder="Enter the key learning objectives for this material"
          rows={3}
          className="rounded-2xl resize-none border-2 border-gray-200 dark:border-gray-700 focus-visible:ring-primary"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="academic-level" className="text-base font-medium">
            Academic Level
          </Label>
          <Select defaultValue="undergraduate">
            <SelectTrigger
              id="academic-level"
              className="rounded-2xl border-2 border-gray-200 dark:border-gray-700 focus-visible:ring-primary h-12"
            >
              <SelectValue placeholder="Select level" />
            </SelectTrigger>
            <SelectContent className="rounded-2xl">
              <SelectItem value="undergraduate">Undergraduate</SelectItem>
              <SelectItem value="graduate">Graduate</SelectItem>
              <SelectItem value="phd">PhD</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="target-audience" className="text-base font-medium">
            Target Audience
          </Label>
          <Select defaultValue="students">
            <SelectTrigger
              id="target-audience"
              className="rounded-2xl border-2 border-gray-200 dark:border-gray-700 focus-visible:ring-primary h-12"
            >
              <SelectValue placeholder="Select audience" />
            </SelectTrigger>
            <SelectContent className="rounded-2xl">
              <SelectItem value="students">Students</SelectItem>
              <SelectItem value="professionals">Professionals</SelectItem>
              <SelectItem value="researchers">Researchers</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  )
}


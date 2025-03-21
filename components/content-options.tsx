"use client"

import { useState } from "react"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Sparkles } from "lucide-react"
import { Textarea } from "@/components/ui/textarea"

interface ContentOptionsProps {
  materialType: string
}

export function ContentOptions({ materialType }: ContentOptionsProps) {
  const [detailLevel, setDetailLevel] = useState(75)

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
        <Sparkles className="h-5 w-5 text-primary" />
        Content Options
      </h2>

      {materialType === "lecture-notes" && (
        <>
          <div className="space-y-3">
            <div className="flex justify-between">
              <Label className="text-base font-medium">Detail Level</Label>
              <span className="text-sm font-medium px-3 py-1 rounded-full bg-primary-lighter text-primary">
                {detailLevel < 33 ? "Basic" : detailLevel < 66 ? "Intermediate" : "Comprehensive"}
              </span>
            </div>
            <Slider
              defaultValue={[detailLevel]}
              max={100}
              step={1}
              onValueChange={(value) => setDetailLevel(value[0])}
              className="py-3"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center justify-between space-x-2 border-2 border-gray-100 dark:border-gray-700 rounded-2xl p-4 hover:border-primary-lighter transition-colors duration-300">
              <Label htmlFor="include-examples" className="cursor-pointer text-base">
                Include Examples
              </Label>
              <Switch id="include-examples" defaultChecked className="data-[state=checked]:bg-primary" />
            </div>
            <div className="flex items-center justify-between space-x-2 border-2 border-gray-100 dark:border-gray-700 rounded-2xl p-4 hover:border-primary-lighter transition-colors duration-300">
              <Label htmlFor="include-diagrams" className="cursor-pointer text-base">
                Include Diagrams
              </Label>
              <Switch id="include-diagrams" defaultChecked className="data-[state=checked]:bg-primary" />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center justify-between space-x-2 border-2 border-gray-100 dark:border-gray-700 rounded-2xl p-4 hover:border-primary-lighter transition-colors duration-300">
              <Label htmlFor="include-references" className="cursor-pointer text-base">
                Include References
              </Label>
              <Switch id="include-references" defaultChecked className="data-[state=checked]:bg-primary" />
            </div>
            <div className="flex items-center justify-between space-x-2 border-2 border-gray-100 dark:border-gray-700 rounded-2xl p-4 hover:border-primary-lighter transition-colors duration-300">
              <Label htmlFor="include-summary" className="cursor-pointer text-base">
                Include Summary
              </Label>
              <Switch id="include-summary" defaultChecked className="data-[state=checked]:bg-primary" />
            </div>
          </div>
        </>
      )}

      {materialType === "quizzes" && (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="question-count" className="text-base font-medium">
                Number of Questions
              </Label>
              <Input
                id="question-count"
                type="number"
                placeholder="10"
                className="rounded-2xl border-2 border-gray-200 dark:border-gray-700 focus-visible:ring-primary h-12"
                defaultValue="10"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="difficulty" className="text-base font-medium">
                Difficulty Level
              </Label>
              <Select defaultValue="medium">
                <SelectTrigger
                  id="difficulty"
                  className="rounded-2xl border-2 border-gray-200 dark:border-gray-700 focus-visible:ring-primary h-12"
                >
                  <SelectValue placeholder="Select difficulty" />
                </SelectTrigger>
                <SelectContent className="rounded-2xl">
                  <SelectItem value="easy">Easy</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="hard">Hard</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center justify-between space-x-2 border-2 border-gray-100 dark:border-gray-700 rounded-2xl p-4 hover:border-primary-lighter transition-colors duration-300">
              <Label htmlFor="include-solutions" className="cursor-pointer text-base">
                Include Solutions
              </Label>
              <Switch id="include-solutions" defaultChecked className="data-[state=checked]:bg-primary" />
            </div>
            <div className="flex items-center justify-between space-x-2 border-2 border-gray-100 dark:border-gray-700 rounded-2xl p-4 hover:border-primary-lighter transition-colors duration-300">
              <Label htmlFor="multiple-choice" className="cursor-pointer text-base">
                Multiple Choice Questions
              </Label>
              <Switch id="multiple-choice" defaultChecked className="data-[state=checked]:bg-primary" />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center justify-between space-x-2 border-2 border-gray-100 dark:border-gray-700 rounded-2xl p-4 hover:border-primary-lighter transition-colors duration-300">
              <Label htmlFor="short-answer" className="cursor-pointer text-base">
                Short Answer Questions
              </Label>
              <Switch id="short-answer" defaultChecked className="data-[state=checked]:bg-primary" />
            </div>
            <div className="flex items-center justify-between space-x-2 border-2 border-gray-100 dark:border-gray-700 rounded-2xl p-4 hover:border-primary-lighter transition-colors duration-300">
              <Label htmlFor="essay-questions" className="cursor-pointer text-base">
                Essay Questions
              </Label>
              <Switch id="essay-questions" className="data-[state=checked]:bg-primary" />
            </div>
          </div>
        </>
      )}

      {materialType === "assignments" && (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="assignment-type" className="text-base font-medium">
                Assignment Type
              </Label>
              <Select defaultValue="problem-set">
                <SelectTrigger
                  id="assignment-type"
                  className="rounded-2xl border-2 border-gray-200 dark:border-gray-700 focus-visible:ring-primary h-12"
                >
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent className="rounded-2xl">
                  <SelectItem value="problem-set">Problem Set</SelectItem>
                  <SelectItem value="project">Project</SelectItem>
                  <SelectItem value="case-study">Case Study</SelectItem>
                  <SelectItem value="research">Research Paper</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="deadline" className="text-base font-medium">
                Suggested Deadline (days)
              </Label>
              <Input
                id="deadline"
                type="number"
                placeholder="7"
                className="rounded-2xl border-2 border-gray-200 dark:border-gray-700 focus-visible:ring-primary h-12"
                defaultValue="7"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center justify-between space-x-2 border-2 border-gray-100 dark:border-gray-700 rounded-2xl p-4 hover:border-primary-lighter transition-colors duration-300">
              <Label htmlFor="include-rubric" className="cursor-pointer text-base">
                Include Rubric
              </Label>
              <Switch id="include-rubric" defaultChecked className="data-[state=checked]:bg-primary" />
            </div>
            <div className="flex items-center justify-between space-x-2 border-2 border-gray-100 dark:border-gray-700 rounded-2xl p-4 hover:border-primary-lighter transition-colors duration-300">
              <Label htmlFor="include-sample" className="cursor-pointer text-base">
                Include Sample Solution
              </Label>
              <Switch id="include-sample" className="data-[state=checked]:bg-primary" />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="assignment-description" className="text-base font-medium">
              Additional Instructions
            </Label>
            <Textarea
              id="assignment-description"
              placeholder="Enter any additional instructions for this assignment"
              rows={3}
              className="rounded-2xl resize-none border-2 border-gray-200 dark:border-gray-700 focus-visible:ring-primary"
            />
          </div>
        </>
      )}

      {materialType === "presentations" && (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="slide-count" className="text-base font-medium">
                Number of Slides
              </Label>
              <Input
                id="slide-count"
                type="number"
                placeholder="20"
                className="rounded-2xl border-2 border-gray-200 dark:border-gray-700 focus-visible:ring-primary h-12"
                defaultValue="20"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="presentation-style" className="text-base font-medium">
                Presentation Style
              </Label>
              <Select defaultValue="academic">
                <SelectTrigger
                  id="presentation-style"
                  className="rounded-2xl border-2 border-gray-200 dark:border-gray-700 focus-visible:ring-primary h-12"
                >
                  <SelectValue placeholder="Select style" />
                </SelectTrigger>
                <SelectContent className="rounded-2xl">
                  <SelectItem value="academic">Academic</SelectItem>
                  <SelectItem value="professional">Professional</SelectItem>
                  <SelectItem value="interactive">Interactive</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center justify-between space-x-2 border-2 border-gray-100 dark:border-gray-700 rounded-2xl p-4 hover:border-primary-lighter transition-colors duration-300">
              <Label htmlFor="include-speaker-notes" className="cursor-pointer text-base">
                Include Speaker Notes
              </Label>
              <Switch id="include-speaker-notes" defaultChecked className="data-[state=checked]:bg-primary" />
            </div>
            <div className="flex items-center justify-between space-x-2 border-2 border-gray-100 dark:border-gray-700 rounded-2xl p-4 hover:border-primary-lighter transition-colors duration-300">
              <Label htmlFor="include-animations" className="cursor-pointer text-base">
                Include Animations
              </Label>
              <Switch id="include-animations" defaultChecked className="data-[state=checked]:bg-primary" />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center justify-between space-x-2 border-2 border-gray-100 dark:border-gray-700 rounded-2xl p-4 hover:border-primary-lighter transition-colors duration-300">
              <Label htmlFor="include-visuals" className="cursor-pointer text-base">
                Include Visuals/Charts
              </Label>
              <Switch id="include-visuals" defaultChecked className="data-[state=checked]:bg-primary" />
            </div>
            <div className="flex items-center justify-between space-x-2 border-2 border-gray-100 dark:border-gray-700 rounded-2xl p-4 hover:border-primary-lighter transition-colors duration-300">
              <Label htmlFor="include-references-slides" className="cursor-pointer text-base">
                Include References Slide
              </Label>
              <Switch id="include-references-slides" defaultChecked className="data-[state=checked]:bg-primary" />
            </div>
          </div>
        </>
      )}
    </div>
  )
}


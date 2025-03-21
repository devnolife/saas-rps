"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { BookText, FileQuestion, FileSpreadsheet, Presentation, Loader2 } from "lucide-react"

export function GeneratorForm() {
  const [isGenerating, setIsGenerating] = useState(false)
  const [selectedTab, setSelectedTab] = useState("lecture-notes")

  const handleGenerate = () => {
    setIsGenerating(true)
    // Simulate API call
    setTimeout(() => {
      setIsGenerating(false)
    }, 3000)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Generate Educational Material</CardTitle>
        <CardDescription>Enter course details and let AI create customized educational content</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="lecture-notes" onValueChange={setSelectedTab}>
          <TabsList className="grid grid-cols-4 mb-6">
            <TabsTrigger value="lecture-notes" className="flex items-center gap-2">
              <BookText className="h-4 w-4" />
              <span className="hidden sm:inline">Lecture Notes</span>
            </TabsTrigger>
            <TabsTrigger value="quizzes" className="flex items-center gap-2">
              <FileQuestion className="h-4 w-4" />
              <span className="hidden sm:inline">Quizzes</span>
            </TabsTrigger>
            <TabsTrigger value="assignments" className="flex items-center gap-2">
              <FileSpreadsheet className="h-4 w-4" />
              <span className="hidden sm:inline">Assignments</span>
            </TabsTrigger>
            <TabsTrigger value="presentations" className="flex items-center gap-2">
              <Presentation className="h-4 w-4" />
              <span className="hidden sm:inline">Presentations</span>
            </TabsTrigger>
          </TabsList>

          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="course-title">Course Title</Label>
                <Input id="course-title" placeholder="e.g., Introduction to Computer Science" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="course-code">Course Code</Label>
                <Input id="course-code" placeholder="e.g., CS101" />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="topic">Topic</Label>
              <Input id="topic" placeholder="e.g., Data Structures and Algorithms" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="learning-objectives">Learning Objectives</Label>
              <Textarea
                id="learning-objectives"
                placeholder="Enter the key learning objectives for this material"
                rows={3}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="academic-level">Academic Level</Label>
                <Select defaultValue="undergraduate">
                  <SelectTrigger id="academic-level">
                    <SelectValue placeholder="Select level" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="undergraduate">Undergraduate</SelectItem>
                    <SelectItem value="graduate">Graduate</SelectItem>
                    <SelectItem value="phd">PhD</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="duration">Duration (minutes)</Label>
                <Input id="duration" type="number" placeholder="60" />
              </div>
            </div>

            {selectedTab === "lecture-notes" && (
              <div className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <Label>Detail Level</Label>
                    <span className="text-sm text-muted-foreground">Comprehensive</span>
                  </div>
                  <Slider defaultValue={[75]} max={100} step={1} />
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Switch id="include-examples" />
                    <Label htmlFor="include-examples">Include Examples</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch id="include-diagrams" />
                    <Label htmlFor="include-diagrams">Include Diagrams</Label>
                  </div>
                </div>
              </div>
            )}

            {selectedTab === "quizzes" && (
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="question-count">Number of Questions</Label>
                    <Input id="question-count" type="number" placeholder="10" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="difficulty">Difficulty Level</Label>
                    <Select defaultValue="medium">
                      <SelectTrigger id="difficulty">
                        <SelectValue placeholder="Select difficulty" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="easy">Easy</SelectItem>
                        <SelectItem value="medium">Medium</SelectItem>
                        <SelectItem value="hard">Hard</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch id="include-solutions" defaultChecked />
                  <Label htmlFor="include-solutions">Include Solutions</Label>
                </div>
              </div>
            )}

            {selectedTab === "assignments" && (
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="assignment-type">Assignment Type</Label>
                  <Select defaultValue="problem-set">
                    <SelectTrigger id="assignment-type">
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="problem-set">Problem Set</SelectItem>
                      <SelectItem value="project">Project</SelectItem>
                      <SelectItem value="case-study">Case Study</SelectItem>
                      <SelectItem value="research">Research Paper</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="deadline">Suggested Deadline (days)</Label>
                  <Input id="deadline" type="number" placeholder="7" />
                </div>
              </div>
            )}

            {selectedTab === "presentations" && (
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="slide-count">Number of Slides</Label>
                  <Input id="slide-count" type="number" placeholder="20" />
                </div>
                <div className="flex items-center space-x-2">
                  <Switch id="include-speaker-notes" defaultChecked />
                  <Label htmlFor="include-speaker-notes">Include Speaker Notes</Label>
                </div>
              </div>
            )}
          </div>
        </Tabs>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline">Save as Draft</Button>
        <Button onClick={handleGenerate} disabled={isGenerating}>
          {isGenerating ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Generating...
            </>
          ) : (
            "Generate Material"
          )}
        </Button>
      </CardFooter>
    </Card>
  )
}


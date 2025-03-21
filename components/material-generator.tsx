"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { MaterialTypeSelector } from "@/components/material-type-selector"
import { CourseDetailsForm } from "@/components/course-details-form"
import { ContentOptions } from "@/components/content-options"
import { MaterialPreview } from "@/components/material-preview"
import { ExportOptions } from "@/components/export-options"
import { Button } from "@/components/ui/button"
import { Loader2, Sparkles, Zap } from "lucide-react"

export function MaterialGenerator() {
  const [activeTab, setActiveTab] = useState("create")
  const [materialType, setMaterialType] = useState("lecture-notes")
  const [isGenerating, setIsGenerating] = useState(false)
  const [isGenerated, setIsGenerated] = useState(false)

  const handleGenerate = () => {
    setIsGenerating(true)
    // Simulate API call
    setTimeout(() => {
      setIsGenerating(false)
      setIsGenerated(true)
      setActiveTab("preview")
    }, 3000)
  }

  return (
    <div className="grid grid-cols-1 gap-6">
      <div className="bg-white dark:bg-gray-800 rounded-3xl p-6 shadow-lg relative overflow-hidden theme-transition">
        <div className="absolute -right-20 -top-20 w-64 h-64 gen-z-blob bg-primary-lighter/30 dark:bg-primary/10"></div>
        <div className="absolute -left-20 -bottom-20 w-64 h-64 gen-z-blob-alt bg-secondary/50 dark:bg-secondary/10"></div>

        <div className="relative z-10 mb-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="bg-primary text-white p-2 rounded-2xl">
              <Sparkles className="h-6 w-6" />
            </div>
            <h1 className="text-3xl font-bold">Educational Material Generator</h1>
          </div>
          <p className="text-muted-foreground text-lg ml-14">
            Create professional educational content powered by AI ✨
          </p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full relative z-10">
          <TabsList className="grid grid-cols-4 w-full max-w-2xl mb-8 bg-gray-100 dark:bg-gray-700 p-1.5 rounded-full">
            <TabsTrigger
              value="create"
              className="rounded-full data-[state=active]:bg-primary data-[state=active]:text-white"
            >
              Create
            </TabsTrigger>
            <TabsTrigger
              value="preview"
              className="rounded-full data-[state=active]:bg-primary data-[state=active]:text-white"
              disabled={!isGenerated}
            >
              Preview
            </TabsTrigger>
            <TabsTrigger
              value="edit"
              className="rounded-full data-[state=active]:bg-primary data-[state=active]:text-white"
              disabled={!isGenerated}
            >
              Edit
            </TabsTrigger>
            <TabsTrigger
              value="export"
              className="rounded-full data-[state=active]:bg-primary data-[state=active]:text-white"
              disabled={!isGenerated}
            >
              Export
            </TabsTrigger>
          </TabsList>

          <TabsContent value="create">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-1">
                <MaterialTypeSelector selectedType={materialType} onSelectType={setMaterialType} />
              </div>

              <div className="lg:col-span-2 space-y-8">
                <CourseDetailsForm />
                <ContentOptions materialType={materialType} />

                <div className="flex justify-end gap-3 mt-8">
                  <Button variant="outline" className="rounded-full px-6">
                    Save Draft
                  </Button>
                  <Button
                    onClick={handleGenerate}
                    disabled={isGenerating}
                    className="rounded-full bg-primary hover:bg-primary-dark text-white px-6 shadow-md hover:shadow-lg transition-all duration-300"
                  >
                    {isGenerating ? (
                      <>
                        <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                        Generating...
                      </>
                    ) : (
                      <>
                        <Zap className="mr-2 h-5 w-5" />
                        Generate Material
                      </>
                    )}
                  </Button>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="preview">
            <MaterialPreview materialType={materialType} />
          </TabsContent>

          <TabsContent value="edit">
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <div className="w-20 h-20 gen-z-gradient rounded-3xl flex items-center justify-center mb-6 shadow-lg animate-float">
                <div className="text-white text-3xl">✏️</div>
              </div>
              <h2 className="text-3xl font-bold mb-3">Edit Your Material</h2>
              <p className="text-muted-foreground max-w-md mb-8 text-lg">
                Make changes to your generated content using our intuitive editor
              </p>
              <Button className="rounded-full bg-primary hover:bg-primary-dark text-white px-8 py-6 text-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                Open Editor
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="export">
            <ExportOptions />
          </TabsContent>
        </Tabs>
      </div>

      {isGenerated && activeTab === "preview" && (
        <div className="bg-white dark:bg-gray-800 rounded-3xl p-6 shadow-lg">
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-primary" />
            Recently Generated Materials
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="border-2 border-primary-lighter rounded-3xl p-5 hover:shadow-lg transition-all duration-300 hover:scale-[1.02]">
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h3 className="font-medium text-lg">Data Structures Overview</h3>
                  <p className="text-xs text-muted-foreground">Lecture Notes • CS202</p>
                </div>
                <span className="text-xs px-3 py-1 bg-secondary text-accent-dark rounded-full font-medium">New</span>
              </div>
              <p className="text-sm text-muted-foreground mb-4">
                Comprehensive introduction to data structures including arrays, linked lists, trees, and graphs.
              </p>
              <div className="flex justify-between items-center">
                <span className="text-xs text-muted-foreground">Created today</span>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-8 rounded-full text-primary hover:text-primary-dark hover:bg-primary-lighter/20"
                >
                  View
                </Button>
              </div>
            </div>

            <div className="border-2 border-gray-100 dark:border-gray-700 rounded-3xl p-5 hover:shadow-lg transition-all duration-300 hover:scale-[1.02]">
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h3 className="font-medium text-lg">Algorithms Midterm</h3>
                  <p className="text-xs text-muted-foreground">Quiz • CS301</p>
                </div>
                <span className="text-xs px-3 py-1 bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-300 rounded-full font-medium">
                  3d ago
                </span>
              </div>
              <p className="text-sm text-muted-foreground mb-4">
                Comprehensive assessment covering sorting algorithms, graph traversal, and complexity analysis.
              </p>
              <div className="flex justify-between items-center">
                <span className="text-xs text-muted-foreground">Oct 10, 2023</span>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-8 rounded-full text-primary hover:text-primary-dark hover:bg-primary-lighter/20"
                >
                  View
                </Button>
              </div>
            </div>

            <div className="border-2 border-gray-100 dark:border-gray-700 rounded-3xl p-5 hover:shadow-lg transition-all duration-300 hover:scale-[1.02]">
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h3 className="font-medium text-lg">Database Design Project</h3>
                  <p className="text-xs text-muted-foreground">Assignment • CS405</p>
                </div>
                <span className="text-xs px-3 py-1 bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-300 rounded-full font-medium">
                  1w ago
                </span>
              </div>
              <p className="text-sm text-muted-foreground mb-4">
                Practical assignment on designing and implementing relational database systems.
              </p>
              <div className="flex justify-between items-center">
                <span className="text-xs text-muted-foreground">Oct 5, 2023</span>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-8 rounded-full text-primary hover:text-primary-dark hover:bg-primary-lighter/20"
                >
                  View
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}


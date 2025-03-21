"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { FileText, Download, FileImage, FileIcon as FilePdf, Sparkles } from "lucide-react"

export function ExportOptions() {
  const [exportFormat, setExportFormat] = useState("pdf")

  return (
    <div>
      <h2 className="text-2xl font-bold mb-8 flex items-center gap-2">
        <Sparkles className="h-6 w-6 text-primary" />
        Export Material
      </h2>

      <Tabs defaultValue="format" className="w-full">
        <TabsList className="rounded-full bg-gray-100 dark:bg-gray-700 p-1.5 w-full max-w-md">
          <TabsTrigger
            value="format"
            className="rounded-full data-[state=active]:bg-primary data-[state=active]:text-white"
          >
            Format
          </TabsTrigger>
          <TabsTrigger
            value="options"
            className="rounded-full data-[state=active]:bg-primary data-[state=active]:text-white"
          >
            Options
          </TabsTrigger>
          <TabsTrigger
            value="branding"
            className="rounded-full data-[state=active]:bg-primary data-[state=active]:text-white"
          >
            Branding
          </TabsTrigger>
        </TabsList>

        <TabsContent value="format" className="mt-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div
              className={`border-2 cursor-pointer rounded-3xl ${exportFormat === "pdf" ? "border-primary bg-primary-lighter/20 shadow-lg" : "border-gray-100 dark:border-gray-700"} transition-all duration-300 hover:shadow-lg hover:scale-[1.02]`}
              onClick={() => setExportFormat("pdf")}
            >
              <div className="p-6 flex flex-col items-center text-center">
                <div className="w-16 h-16 rounded-2xl bg-primary-lighter flex items-center justify-center mb-4">
                  <FilePdf className="h-8 w-8 text-primary" />
                </div>
                <h3 className="font-medium text-xl mb-2">PDF Document</h3>
                <p className="text-sm text-muted-foreground">Standard format for sharing and printing</p>
              </div>
            </div>

            <div
              className={`border-2 cursor-pointer rounded-3xl ${exportFormat === "docx" ? "border-primary bg-primary-lighter/20 shadow-lg" : "border-gray-100 dark:border-gray-700"} transition-all duration-300 hover:shadow-lg hover:scale-[1.02]`}
              onClick={() => setExportFormat("docx")}
            >
              <div className="p-6 flex flex-col items-center text-center">
                <div className="w-16 h-16 rounded-2xl bg-secondary flex items-center justify-center mb-4">
                  <FileText className="h-8 w-8 text-accent-dark" />
                </div>
                <h3 className="font-medium text-xl mb-2">Word Document</h3>
                <p className="text-sm text-muted-foreground">Editable format for Microsoft Word</p>
              </div>
            </div>

            <div
              className={`border-2 cursor-pointer rounded-3xl ${exportFormat === "pptx" ? "border-primary bg-primary-lighter/20 shadow-lg" : "border-gray-100 dark:border-gray-700"} transition-all duration-300 hover:shadow-lg hover:scale-[1.02]`}
              onClick={() => setExportFormat("pptx")}
            >
              <div className="p-6 flex flex-col items-center text-center">
                <div className="w-16 h-16 rounded-2xl bg-primary-light flex items-center justify-center mb-4">
                  <FileImage className="h-8 w-8 text-primary-dark" />
                </div>
                <h3 className="font-medium text-xl mb-2">PowerPoint</h3>
                <p className="text-sm text-muted-foreground">Presentation slides for teaching</p>
              </div>
            </div>
          </div>

          <div className="mt-8 border-2 border-gray-100 dark:border-gray-700 rounded-3xl p-6 bg-white dark:bg-gray-800">
            <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-primary" />
              Additional Formats
            </h3>
            <RadioGroup defaultValue="none" className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center space-x-3 p-4 rounded-2xl border-2 border-gray-100 dark:border-gray-700 hover:border-primary-lighter transition-colors duration-300">
                <RadioGroupItem value="none" id="none" className="text-primary" />
                <Label htmlFor="none" className="text-base font-medium cursor-pointer">
                  No additional format
                </Label>
              </div>
              <div className="flex items-center space-x-3 p-4 rounded-2xl border-2 border-gray-100 dark:border-gray-700 hover:border-primary-lighter transition-colors duration-300">
                <RadioGroupItem value="html" id="html" className="text-primary" />
                <Label htmlFor="html" className="text-base font-medium cursor-pointer">
                  HTML (Web-ready)
                </Label>
              </div>
              <div className="flex items-center space-x-3 p-4 rounded-2xl border-2 border-gray-100 dark:border-gray-700 hover:border-primary-lighter transition-colors duration-300">
                <RadioGroupItem value="markdown" id="markdown" className="text-primary" />
                <Label htmlFor="markdown" className="text-base font-medium cursor-pointer">
                  Markdown
                </Label>
              </div>
              <div className="flex items-center space-x-3 p-4 rounded-2xl border-2 border-gray-100 dark:border-gray-700 hover:border-primary-lighter transition-colors duration-300">
                <RadioGroupItem value="latex" id="latex" className="text-primary" />
                <Label htmlFor="latex" className="text-base font-medium cursor-pointer">
                  LaTeX
                </Label>
              </div>
            </RadioGroup>
          </div>
        </TabsContent>

        <TabsContent value="options" className="mt-8">
          <div className="border-2 border-gray-100 dark:border-gray-700 rounded-3xl p-6 bg-white dark:bg-gray-800">
            <div className="space-y-8">
              <div>
                <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                  <Sparkles className="h-5 w-5 text-primary" />
                  Content Options
                </h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 rounded-2xl border-2 border-gray-100 dark:border-gray-700 hover:border-primary-lighter transition-colors duration-300">
                    <Label htmlFor="include-toc" className="text-base font-medium cursor-pointer">
                      Include Table of Contents
                    </Label>
                    <Switch id="include-toc" defaultChecked className="data-[state=checked]:bg-primary" />
                  </div>
                  <div className="flex items-center justify-between p-4 rounded-2xl border-2 border-gray-100 dark:border-gray-700 hover:border-primary-lighter transition-colors duration-300">
                    <Label htmlFor="include-page-numbers" className="text-base font-medium cursor-pointer">
                      Include Page Numbers
                    </Label>
                    <Switch id="include-page-numbers" defaultChecked className="data-[state=checked]:bg-primary" />
                  </div>
                  <div className="flex items-center justify-between p-4 rounded-2xl border-2 border-gray-100 dark:border-gray-700 hover:border-primary-lighter transition-colors duration-300">
                    <Label htmlFor="include-references" className="text-base font-medium cursor-pointer">
                      Include References
                    </Label>
                    <Switch id="include-references" defaultChecked className="data-[state=checked]:bg-primary" />
                  </div>
                  <div className="flex items-center justify-between p-4 rounded-2xl border-2 border-gray-100 dark:border-gray-700 hover:border-primary-lighter transition-colors duration-300">
                    <Label htmlFor="include-appendix" className="text-base font-medium cursor-pointer">
                      Include Appendix
                    </Label>
                    <Switch id="include-appendix" className="data-[state=checked]:bg-primary" />
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                  <Sparkles className="h-5 w-5 text-primary" />
                  Formatting Options
                </h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 rounded-2xl border-2 border-gray-100 dark:border-gray-700 hover:border-primary-lighter transition-colors duration-300">
                    <Label htmlFor="high-resolution" className="text-base font-medium cursor-pointer">
                      High Resolution Images
                    </Label>
                    <Switch id="high-resolution" defaultChecked className="data-[state=checked]:bg-primary" />
                  </div>
                  <div className="flex items-center justify-between p-4 rounded-2xl border-2 border-gray-100 dark:border-gray-700 hover:border-primary-lighter transition-colors duration-300">
                    <Label htmlFor="print-optimized" className="text-base font-medium cursor-pointer">
                      Print Optimized
                    </Label>
                    <Switch id="print-optimized" className="data-[state=checked]:bg-primary" />
                  </div>
                  <div className="flex items-center justify-between p-4 rounded-2xl border-2 border-gray-100 dark:border-gray-700 hover:border-primary-lighter transition-colors duration-300">
                    <Label htmlFor="accessibility" className="text-base font-medium cursor-pointer">
                      Accessibility Features
                    </Label>
                    <Switch id="accessibility" defaultChecked className="data-[state=checked]:bg-primary" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="branding" className="mt-8">
          <div className="border-2 border-gray-100 dark:border-gray-700 rounded-3xl p-6 bg-white dark:bg-gray-800">
            <div className="space-y-8">
              <div>
                <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                  <Sparkles className="h-5 w-5 text-primary" />
                  University Branding
                </h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 rounded-2xl border-2 border-gray-100 dark:border-gray-700 hover:border-primary-lighter transition-colors duration-300">
                    <Label htmlFor="university-logo" className="text-base font-medium cursor-pointer">
                      Include University Logo
                    </Label>
                    <Switch id="university-logo" defaultChecked className="data-[state=checked]:bg-primary" />
                  </div>
                  <div className="flex items-center justify-between p-4 rounded-2xl border-2 border-gray-100 dark:border-gray-700 hover:border-primary-lighter transition-colors duration-300">
                    <Label htmlFor="department-info" className="text-base font-medium cursor-pointer">
                      Include Department Information
                    </Label>
                    <Switch id="department-info" defaultChecked className="data-[state=checked]:bg-primary" />
                  </div>
                  <div className="flex items-center justify-between p-4 rounded-2xl border-2 border-gray-100 dark:border-gray-700 hover:border-primary-lighter transition-colors duration-300">
                    <Label htmlFor="faculty-info" className="text-base font-medium cursor-pointer">
                      Include Faculty Information
                    </Label>
                    <Switch id="faculty-info" defaultChecked className="data-[state=checked]:bg-primary" />
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                  <Sparkles className="h-5 w-5 text-primary" />
                  Document Style
                </h3>
                <RadioGroup defaultValue="university" className="space-y-4">
                  <div className="flex items-center space-x-3 p-4 rounded-2xl border-2 border-gray-100 dark:border-gray-700 hover:border-primary-lighter transition-colors duration-300">
                    <RadioGroupItem value="university" id="university" className="text-primary" />
                    <Label htmlFor="university" className="text-base font-medium cursor-pointer">
                      University Template
                    </Label>
                  </div>
                  <div className="flex items-center space-x-3 p-4 rounded-2xl border-2 border-gray-100 dark:border-gray-700 hover:border-primary-lighter transition-colors duration-300">
                    <RadioGroupItem value="department" id="department" className="text-primary" />
                    <Label htmlFor="department" className="text-base font-medium cursor-pointer">
                      Department Template
                    </Label>
                  </div>
                  <div className="flex items-center space-x-3 p-4 rounded-2xl border-2 border-gray-100 dark:border-gray-700 hover:border-primary-lighter transition-colors duration-300">
                    <RadioGroupItem value="custom" id="custom" className="text-primary" />
                    <Label htmlFor="custom" className="text-base font-medium cursor-pointer">
                      Custom Template
                    </Label>
                  </div>
                </RadioGroup>
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>

      <div className="flex justify-end mt-8">
        <Button className="rounded-full bg-primary hover:bg-primary-dark text-white px-8 py-6 text-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 flex items-center gap-2">
          <Download className="h-5 w-5" />
          Export Material
        </Button>
      </div>
    </div>
  )
}


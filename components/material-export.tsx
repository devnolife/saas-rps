"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { FileText, Download, FileImage, FileIcon as FilePdf } from "lucide-react"

export function MaterialExport() {
  const [exportFormat, setExportFormat] = useState("pdf")

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Export Material</h2>

      <Tabs defaultValue="format">
        <TabsList className="mb-6">
          <TabsTrigger value="format">Format</TabsTrigger>
          <TabsTrigger value="options">Options</TabsTrigger>
          <TabsTrigger value="branding">Branding</TabsTrigger>
        </TabsList>

        <TabsContent value="format">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card
              className={`border-2 cursor-pointer ${exportFormat === "pdf" ? "border-primary" : "border-border"}`}
              onClick={() => setExportFormat("pdf")}
            >
              <CardContent className="p-6 flex flex-col items-center text-center">
                <FilePdf className="h-12 w-12 text-primary mb-4" />
                <h3 className="font-medium text-lg mb-1">PDF Document</h3>
                <p className="text-sm text-muted-foreground">Standard format for sharing and printing</p>
              </CardContent>
            </Card>

            <Card
              className={`border-2 cursor-pointer ${exportFormat === "docx" ? "border-primary" : "border-border"}`}
              onClick={() => setExportFormat("docx")}
            >
              <CardContent className="p-6 flex flex-col items-center text-center">
                <FileText className="h-12 w-12 text-primary mb-4" />
                <h3 className="font-medium text-lg mb-1">Word Document</h3>
                <p className="text-sm text-muted-foreground">Editable format for Microsoft Word</p>
              </CardContent>
            </Card>

            <Card
              className={`border-2 cursor-pointer ${exportFormat === "pptx" ? "border-primary" : "border-border"}`}
              onClick={() => setExportFormat("pptx")}
            >
              <CardContent className="p-6 flex flex-col items-center text-center">
                <FileImage className="h-12 w-12 text-primary mb-4" />
                <h3 className="font-medium text-lg mb-1">PowerPoint</h3>
                <p className="text-sm text-muted-foreground">Presentation slides for teaching</p>
              </CardContent>
            </Card>
          </div>

          <div className="mt-6">
            <h3 className="text-lg font-medium mb-4">Additional Formats</h3>
            <RadioGroup defaultValue="none" className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="none" id="none" />
                <Label htmlFor="none">No additional format</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="html" id="html" />
                <Label htmlFor="html">HTML (Web-ready)</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="markdown" id="markdown" />
                <Label htmlFor="markdown">Markdown</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="latex" id="latex" />
                <Label htmlFor="latex">LaTeX</Label>
              </div>
            </RadioGroup>
          </div>
        </TabsContent>

        <TabsContent value="options">
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-medium mb-4">Content Options</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <Label htmlFor="include-toc">Include Table of Contents</Label>
                  <Switch id="include-toc" defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="include-page-numbers">Include Page Numbers</Label>
                  <Switch id="include-page-numbers" defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="include-references">Include References</Label>
                  <Switch id="include-references" defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="include-appendix">Include Appendix</Label>
                  <Switch id="include-appendix" />
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-medium mb-4">Formatting Options</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <Label htmlFor="high-resolution">High Resolution Images</Label>
                  <Switch id="high-resolution" defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="print-optimized">Print Optimized</Label>
                  <Switch id="print-optimized" />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="accessibility">Accessibility Features</Label>
                  <Switch id="accessibility" defaultChecked />
                </div>
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="branding">
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-medium mb-4">University Branding</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <Label htmlFor="university-logo">Include University Logo</Label>
                  <Switch id="university-logo" defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="department-info">Include Department Information</Label>
                  <Switch id="department-info" defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="faculty-info">Include Faculty Information</Label>
                  <Switch id="faculty-info" defaultChecked />
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-medium mb-4">Document Style</h3>
              <RadioGroup defaultValue="university" className="space-y-3">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="university" id="university" />
                  <Label htmlFor="university">University Template</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="department" id="department" />
                  <Label htmlFor="department">Department Template</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="custom" id="custom" />
                  <Label htmlFor="custom">Custom Template</Label>
                </div>
              </RadioGroup>
            </div>
          </div>
        </TabsContent>
      </Tabs>

      <div className="flex justify-end mt-6">
        <Button className="flex items-center gap-2">
          <Download className="h-4 w-4" />
          Export Material
        </Button>
      </div>
    </div>
  )
}


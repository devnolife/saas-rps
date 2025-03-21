import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { MaterialPreview } from "@/components/material-preview"
import { MaterialExport } from "@/components/material-export"

export default function MaterialsPage() {
  return (
    <div className="container mx-auto p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold">Materials</h1>
          <p className="text-muted-foreground mt-1">Preview, edit and export your generated materials</p>
        </div>
        <Button>New Material</Button>
      </div>

      <Tabs defaultValue="preview">
        <TabsList className="mb-6">
          <TabsTrigger value="preview">Preview</TabsTrigger>
          <TabsTrigger value="edit">Edit</TabsTrigger>
          <TabsTrigger value="export">Export</TabsTrigger>
        </TabsList>

        <TabsContent value="preview">
          <Card>
            <CardContent className="p-6">
              <MaterialPreview />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="edit">
          <Card>
            <CardContent className="p-6">
              <div className="flex flex-col items-center justify-center py-12">
                <h3 className="text-xl font-medium mb-2">Material Editor</h3>
                <p className="text-muted-foreground text-center max-w-md mb-4">
                  Edit your material content, structure, and formatting before exporting
                </p>
                <Button>Open Editor</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="export">
          <Card>
            <CardContent className="p-6">
              <MaterialExport />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}


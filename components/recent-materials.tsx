import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { BookText, Download, Edit, FileQuestion, FileSpreadsheet, MoreHorizontal, Presentation } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

const recentMaterials = [
  {
    title: "Data Structures Overview",
    type: "lecture-notes",
    date: "Oct 15, 2023",
    course: "CS202",
  },
  {
    title: "Algorithms Midterm",
    type: "quizzes",
    date: "Oct 10, 2023",
    course: "CS301",
  },
  {
    title: "Database Design Project",
    type: "assignments",
    date: "Oct 5, 2023",
    course: "CS405",
  },
  {
    title: "Introduction to AI",
    type: "presentations",
    date: "Sep 28, 2023",
    course: "CS450",
  },
]

const getIcon = (type: string) => {
  switch (type) {
    case "lecture-notes":
      return <BookText className="h-4 w-4" />
    case "quizzes":
      return <FileQuestion className="h-4 w-4" />
    case "assignments":
      return <FileSpreadsheet className="h-4 w-4" />
    case "presentations":
      return <Presentation className="h-4 w-4" />
    default:
      return <BookText className="h-4 w-4" />
  }
}

const getBadgeVariant = (type: string) => {
  switch (type) {
    case "lecture-notes":
      return "default"
    case "quizzes":
      return "secondary"
    case "assignments":
      return "outline"
    case "presentations":
      return "destructive"
    default:
      return "default"
  }
}

export function RecentMaterials() {
  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle>Recent Materials</CardTitle>
        <CardDescription>Your recently generated educational content</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {recentMaterials.map((material, index) => (
            <div key={index} className="flex items-start justify-between pb-4 border-b last:border-0 last:pb-0">
              <div className="flex items-start gap-3">
                <div className={`w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center`}>
                  {getIcon(material.type)}
                </div>
                <div>
                  <p className="font-medium">{material.title}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <Badge variant={getBadgeVariant(material.type)}>
                      {material.type
                        .split("-")
                        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                        .join(" ")}
                    </Badge>
                    <span className="text-xs text-muted-foreground">
                      {material.course} • {material.date}
                    </span>
                  </div>
                </div>
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>
                    <Edit className="mr-2 h-4 w-4" />
                    Edit
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Download className="mr-2 h-4 w-4" />
                    Download
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          ))}
        </div>
        <Button variant="outline" className="w-full mt-4">
          View All Materials
        </Button>
      </CardContent>
    </Card>
  )
}


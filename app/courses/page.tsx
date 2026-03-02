"use client"

import { useState } from "react"
import { DashboardShell } from "@/components/dashboard-shell"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter,
} from "@/components/ui/dialog"
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select"
import { Plus, Pencil, Trash2, BookOpen, Users, Clock } from "lucide-react"

const courses = [
  { id: 1, title: "Introduction to Machine Learning", description: "Learn the fundamentals of ML algorithms, neural networks, and data-driven decision making.", department: "Computer Science", modules: 12, students: 245, duration: "16 weeks", status: "Active" },
  { id: 2, title: "Advanced Data Structures", description: "Deep dive into trees, graphs, hash tables, and advanced algorithmic techniques.", department: "Computer Science", modules: 10, students: 180, duration: "14 weeks", status: "Active" },
  { id: 3, title: "Quantum Physics Fundamentals", description: "Explore quantum mechanics, wave-particle duality, and quantum field theory.", department: "Physics", modules: 14, students: 120, duration: "16 weeks", status: "Active" },
  { id: 4, title: "Digital Marketing Strategy", description: "Master SEO, content marketing, social media strategy, and analytics.", department: "Business Administration", modules: 8, students: 310, duration: "10 weeks", status: "Draft" },
  { id: 5, title: "Linear Algebra & Applications", description: "Matrix theory, eigenvalues, and applications in engineering and science.", department: "Mathematics", modules: 11, students: 195, duration: "14 weeks", status: "Active" },
  { id: 6, title: "Molecular Biology", description: "DNA replication, gene expression, protein synthesis, and biotechnology.", department: "Biology", modules: 13, students: 160, duration: "16 weeks", status: "Archived" },
  { id: 7, title: "Creative Writing Workshop", description: "Develop fiction, poetry, and narrative non-fiction writing skills.", department: "Literature", modules: 9, students: 85, duration: "12 weeks", status: "Active" },
  { id: 8, title: "Thermodynamics & Heat Transfer", description: "Laws of thermodynamics, heat engines, and thermal system design.", department: "Mechanical Engineering", modules: 10, students: 140, duration: "14 weeks", status: "Active" },
]

const colorMap: Record<string, string> = {
  "Computer Science": "bg-primary/10 text-primary",
  "Physics": "bg-chart-2/15 text-chart-2",
  "Business Administration": "bg-chart-3/15 text-chart-3",
  "Mathematics": "bg-chart-4/15 text-chart-4",
  "Biology": "bg-success/15 text-success",
  "Literature": "bg-chart-5/15 text-chart-5",
  "Mechanical Engineering": "bg-warning/15 text-warning-foreground",
}

export default function CoursesPage() {
  const [open, setOpen] = useState(false)

  return (
    <DashboardShell>
      <div className="flex flex-col gap-6">
        {/* Header */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Courses</h1>
            <p className="mt-1 text-sm text-muted-foreground">Browse and manage all courses</p>
          </div>
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button className="gap-2">
                <Plus className="h-4 w-4" />
                Add Course
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-lg">
              <DialogHeader>
                <DialogTitle>Add New Course</DialogTitle>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="course-title">Course Title</Label>
                  <Input id="course-title" placeholder="Enter course title" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="course-desc">Description</Label>
                  <Textarea id="course-desc" placeholder="Course description..." rows={3} />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label>Department</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select department" />
                      </SelectTrigger>
                      <SelectContent>
                        {Object.keys(colorMap).map((d) => (
                          <SelectItem key={d} value={d}>{d}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="course-duration">Duration</Label>
                    <Input id="course-duration" placeholder="e.g. 16 weeks" />
                  </div>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
                <Button onClick={() => setOpen(false)}>Create Course</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        {/* Course Cards Grid */}
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
          {courses.map((course) => (
            <Card key={course.id} className="group rounded-xl border-border/60 shadow-sm transition-all hover:shadow-md hover:border-primary/20">
              {/* Color accent bar */}
              <div className={`h-1.5 rounded-t-xl ${colorMap[course.department]?.split(" ")[0] || "bg-primary/10"}`} />
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between gap-2">
                  <CardTitle className="text-base font-semibold text-foreground leading-tight">{course.title}</CardTitle>
                  <Badge
                    variant="outline"
                    className={
                      course.status === "Active"
                        ? "border-success/30 bg-success/10 text-success shrink-0"
                        : course.status === "Draft"
                        ? "border-warning/30 bg-warning/10 text-warning-foreground shrink-0"
                        : "border-muted-foreground/30 bg-muted text-muted-foreground shrink-0"
                    }
                  >
                    {course.status}
                  </Badge>
                </div>
                <p className="text-xs text-muted-foreground line-clamp-2 mt-1">{course.description}</p>
              </CardHeader>
              <CardContent className="pb-3">
                <Badge variant="secondary" className={`text-xs ${colorMap[course.department] || ""}`}>
                  {course.department}
                </Badge>
                <div className="mt-3 flex items-center gap-4 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <BookOpen className="h-3.5 w-3.5" />
                    {course.modules} Modules
                  </span>
                  <span className="flex items-center gap-1">
                    <Users className="h-3.5 w-3.5" />
                    {course.students}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="h-3.5 w-3.5" />
                    {course.duration}
                  </span>
                </div>
              </CardContent>
              <CardFooter className="gap-2 pt-0">
                <Button variant="ghost" size="sm" className="h-8 gap-1 text-xs text-muted-foreground hover:text-foreground">
                  <Pencil className="h-3 w-3" />
                  Edit
                </Button>
                <Button variant="ghost" size="sm" className="h-8 gap-1 text-xs text-muted-foreground hover:text-destructive">
                  <Trash2 className="h-3 w-3" />
                  Delete
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </DashboardShell>
  )
}

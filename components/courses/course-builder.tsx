"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { Plus, ChevronDown, ChevronUp, Trash2 } from "lucide-react"
import { ModuleSection } from "./module-section"

interface Module {
  id: string
  name: string
  videos: Video[]
}

interface Video {
  id: string
  name: string
  url: string
  funTaskId?: string
}

interface Course {
  id: string
  name: string
  instructions: string
  termsAccepted: boolean
  modules: Module[]
}

interface CourseBuilderProps {
  courseId?: string
  onSave?: (course: Course) => void
}

const mockFunTasks = [
  { id: "1", name: "Quiz 1: Basics" },
  { id: "2", name: "Assignment 1: Coding Challenge" },
  { id: "3", name: "Project: Build App" },
  { id: "4", name: "Quiz 2: Advanced Topics" },
]

export function CourseBuilder({ courseId, onSave }: CourseBuilderProps) {
  const [course, setCourse] = useState<Course>({
    id: courseId || `course-${Date.now()}`,
    name: "",
    instructions: "",
    termsAccepted: false,
    modules: [],
  })

  const [expandedModules, setExpandedModules] = useState<Set<string>>(new Set())

  const handleAddModule = () => {
    const newModule: Module = {
      id: `module-${Date.now()}`,
      name: "",
      videos: [],
    }
    setCourse({
      ...course,
      modules: [...course.modules, newModule],
    })
  }

  const handleDeleteModule = (moduleId: string) => {
    setCourse({
      ...course,
      modules: course.modules.filter((m) => m.id !== moduleId),
    })
  }

  const handleUpdateModule = (moduleId: string, updatedModule: Module) => {
    setCourse({
      ...course,
      modules: course.modules.map((m) => (m.id === moduleId ? updatedModule : m)),
    })
  }

  const toggleModuleExpand = (moduleId: string) => {
    const newExpanded = new Set(expandedModules)
    if (newExpanded.has(moduleId)) {
      newExpanded.delete(moduleId)
    } else {
      newExpanded.add(moduleId)
    }
    setExpandedModules(newExpanded)
  }

  const handleSave = () => {
    if (!course.name.trim()) {
      alert("Please enter a course name")
      return
    }
    if (!course.termsAccepted) {
      alert("Please accept the terms and conditions")
      return
    }
    onSave?.(course)
  }

  return (
    <div className="space-y-6">
      {/* Course Information Card */}
      <Card className="border-border/60">
        <CardHeader>
          <CardTitle>Course Information</CardTitle>
          <CardDescription>Basic course details and requirements</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Course Name */}
          <div className="space-y-2">
            <Label htmlFor="course-name" className="text-sm font-medium">
              Course Name
            </Label>
            <Input
              id="course-name"
              placeholder="Enter course name"
              value={course.name}
              onChange={(e) => setCourse({ ...course, name: e.target.value })}
              className="h-10"
            />
          </div>

          {/* Instructions */}
          <div className="space-y-2">
            <Label htmlFor="instructions" className="text-sm font-medium">
              Course Instructions & Requirements
            </Label>
            <Textarea
              id="instructions"
              placeholder="Enter instructions for students attending this course..."
              value={course.instructions}
              onChange={(e) => setCourse({ ...course, instructions: e.target.value })}
              rows={4}
              className="resize-none"
            />
          </div>

          {/* Terms and Conditions */}
          <div className="flex items-center gap-3 rounded-lg border border-border/50 p-4">
            <Checkbox
              id="terms"
              checked={course.termsAccepted}
              onCheckedChange={(checked) =>
                setCourse({ ...course, termsAccepted: checked as boolean })
              }
              className="h-5 w-5"
            />
            <Label htmlFor="terms" className="flex-1 cursor-pointer text-sm font-medium">
              I agree to the terms and conditions for this course
            </Label>
          </div>
        </CardContent>
      </Card>

      {/* Modules Section */}
      <Card className="border-border/60">
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Modules</CardTitle>
            <CardDescription>Create modules and add videos with tasks</CardDescription>
          </div>
          <Button onClick={handleAddModule} size="sm" className="gap-2">
            <Plus className="h-4 w-4" />
            Add Module
          </Button>
        </CardHeader>
        <CardContent className="space-y-3">
          {course.modules.length === 0 ? (
            <div className="flex flex-col items-center justify-center rounded-lg border-2 border-dashed border-border/50 py-12 text-center">
              <p className="text-sm text-muted-foreground">No modules yet</p>
              <p className="text-xs text-muted-foreground/60">Click "Add Module" to create your first module</p>
            </div>
          ) : (
            course.modules.map((module) => (
              <div key={module.id} className="space-y-2">
                <div
                  className="flex items-center justify-between rounded-lg border border-border/50 p-4 cursor-pointer hover:bg-muted/30 transition-colors"
                  onClick={() => toggleModuleExpand(module.id)}
                >
                  <div className="flex items-center gap-3 flex-1 min-w-0">
                    {expandedModules.has(module.id) ? (
                      <ChevronUp className="h-5 w-5 shrink-0 text-muted-foreground" />
                    ) : (
                      <ChevronDown className="h-5 w-5 shrink-0 text-muted-foreground" />
                    )}
                    <span className="text-sm font-medium truncate">
                      {module.name || "Untitled Module"}
                    </span>
                    <span className="text-xs text-muted-foreground ml-auto shrink-0">
                      {module.videos.length} video{module.videos.length !== 1 ? "s" : ""}
                    </span>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation()
                      handleDeleteModule(module.id)
                    }}
                    className="text-destructive hover:text-destructive"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>

                {/* Expanded Module Content */}
                {expandedModules.has(module.id) && (
                  <ModuleSection
                    module={module}
                    onUpdate={(updated) => handleUpdateModule(module.id, updated)}
                    funTasks={mockFunTasks}
                  />
                )}
              </div>
            ))
          )}
        </CardContent>
      </Card>

      {/* Save Button */}
      <div className="flex justify-end gap-3">
        <Button variant="outline">Cancel</Button>
        <Button onClick={handleSave} className="gap-2">
          Save Course
        </Button>
      </div>
    </div>
  )
}

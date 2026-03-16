"use client"

import { DashboardShell } from "@/components/dashboard-shell"
import { CourseBuilder } from "@/components/courses/course-builder"
import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Pencil, Trash2, Eye } from "lucide-react"

interface QuizQuestion {
  id: string
  question: string
  imageUrl?: string
  options: string[]
  correctAnswer: number
}

interface Quiz {
  id: string
  title: string
  questions: QuizQuestion[]
  passingScore?: number
}

interface Module {
  id: string
  name: string
  description?: string
  videos: Array<{
    id: string
    name: string
    url: string
    funTaskId?: string
  }>
  quizzes?: Quiz[]
}

interface Course {
  id: string
  name: string
  description: string
  instructions: string
  dueDate?: string
  termsAccepted: boolean
  modules: Module[]
  finalQuiz?: Quiz
  passingScore: number
}

export default function CreateCoursesPage() {
  const [courses, setCourses] = useState<Course[]>([])
  const [isCreating, setIsCreating] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)

  const handleSaveCourse = (course: Course) => {
    if (editingId) {
      setCourses(courses.map((c) => (c.id === editingId ? course : c)))
      setEditingId(null)
    } else {
      setCourses([...courses, course])
    }
    setIsCreating(false)
  }

  const handleDeleteCourse = (courseId: string) => {
    if (confirm("Are you sure you want to delete this course?")) {
      setCourses(courses.filter((c) => c.id !== courseId))
    }
  }

  const handleEditCourse = (courseId: string) => {
    setEditingId(courseId)
    setIsCreating(true)
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  if (isCreating) {
    return (
      <DashboardShell>
        <div className="max-w-4xl mx-auto space-y-6">
          <div>
            <div className="flex items-center gap-3 mb-2">
              {editingId && <Badge variant="outline">Editing</Badge>}
              <h1 className="text-2xl font-bold text-foreground">
                {editingId ? "Edit Course" : "Create New Course"}
              </h1>
            </div>
            <p className="text-sm text-muted-foreground">
              Build your course with modules, videos, and tasks
            </p>
          </div>

          <CourseBuilder
            courseId={editingId || undefined}
            onSave={handleSaveCourse}
          />

          {editingId && (
            <div className="flex justify-start">
              <Button
                variant="outline"
                onClick={() => {
                  setIsCreating(false)
                  setEditingId(null)
                }}
              >
                Back to Courses
              </Button>
            </div>
          )}
        </div>
      </DashboardShell>
    )
  }

  return (
    <DashboardShell>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Create Courses</h1>
            <p className="mt-1 text-sm text-muted-foreground">
              Create and manage courses with modules, videos, and assignments
            </p>
          </div>
          <Button
            onClick={() => {
              setEditingId(null)
              setIsCreating(true)
            }}
            className="gap-2"
          >
            + New Course
          </Button>
        </div>

        {/* Courses List */}
        {courses.length === 0 ? (
          <Card className="border-border/60">
            <CardContent className="flex flex-col items-center justify-center py-12">
              <div className="text-center space-y-2">
                <p className="text-muted-foreground font-medium">No courses yet</p>
                <p className="text-sm text-muted-foreground/70">
                  Click "New Course" to create your first course
                </p>
              </div>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-3">
            {courses.map((course) => (
              <Card
                key={course.id}
                className="border-border/60 hover:shadow-md transition-shadow"
              >
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <CardTitle className="text-lg">{course.name}</CardTitle>
                      <CardDescription className="mt-1 line-clamp-2">
                        {course.description || "No description"}
                      </CardDescription>
                    </div>
                    <Badge variant="secondary">
                      {course.modules.length} Module{course.modules.length !== 1 ? "s" : ""}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="pb-3 space-y-4">
                  {/* Course Meta */}
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs text-muted-foreground">
                    <div>
                      <span className="font-medium">Pass Score:</span> {course.passingScore}%
                    </div>
                    {course.dueDate && (
                      <div>
                        <span className="font-medium">Due:</span> {new Date(course.dueDate).toLocaleDateString()}
                      </div>
                    )}
                    {course.finalQuiz && (
                      <div>
                        <span className="font-medium">✓ Final Quiz</span>
                      </div>
                    )}
                  </div>

                  {/* Modules Summary */}
                  <div className="space-y-2 border-t border-border/50 pt-4">
                    <p className="text-xs font-medium text-foreground">Modules:</p>
                    <div className="space-y-1 max-h-20 overflow-y-auto">
                      {course.modules.map((module) => (
                        <div
                          key={module.id}
                          className="text-xs text-muted-foreground flex items-center gap-2 pl-0.5"
                        >
                          <span className="font-medium">{module.name}</span>
                          <span>•</span>
                          <span>
                            {module.videos.length} video{module.videos.length !== 1 ? "s" : ""}
                          </span>
                          {module.quizzes && module.quizzes.length > 0 && (
                            <>
                              <span>•</span>
                              <span>{module.quizzes.length} quiz{module.quizzes.length !== 1 ? "zes" : ""}</span>
                            </>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
                <div className="flex gap-2 justify-end border-t border-border/50 bg-muted/30 px-6 py-3">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="gap-1"
                    onClick={() => handleEditCourse(course.id)}
                  >
                    <Pencil className="h-4 w-4" />
                    Edit
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="gap-1 text-destructive hover:text-destructive"
                    onClick={() => handleDeleteCourse(course.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                    Delete
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </DashboardShell>
  )
}

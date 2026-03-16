"use client"

import { DashboardShell } from "@/components/dashboard-shell"
import { CourseBuilder } from "@/components/courses/course-builder"
import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Pencil, Trash2, Calendar, Users, FileText } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface Course {
  id: string
  name: string
  description: string
  instructions: string
  dueDate?: string
  termsAccepted: boolean
  modules: Array<{
    id: string
    name: string
    description: string
    videos: Array<{
      id: string
      name: string
      url: string
      funTaskId?: string
    }>
    quizzes: Array<{
      id: string
      title: string
      questions: Array<{
        id: string
        question: string
        imageUrl?: string
        options: string[]
        correctAnswer: number
      }>
    }>
  }>
  finalQuiz?: {
    id: string
    title: string
    questions: Array<{
      id: string
      question: string
      imageUrl?: string
      options: string[]
      correctAnswer: number
    }>
  }
  passingScore: number
  createdAt?: string
  status?: "ongoing" | "completed" | "upcoming"
}

// Mock data for demonstration
const mockCourses: Course[] = [
  {
    id: "course-1",
    name: "Introduction to Web Development",
    description: "Learn the basics of HTML, CSS, and JavaScript",
    instructions: "Complete all modules and pass the final quiz with 70%",
    dueDate: "2024-06-30",
    termsAccepted: true,
    modules: [
      {
        id: "module-1",
        name: "HTML Basics",
        description: "Learn HTML fundamentals",
        videos: [
          { id: "v1", name: "Introduction to HTML", url: "https://example.com/v1.mp4" },
          { id: "v2", name: "HTML Tags", url: "https://example.com/v2.mp4" },
        ],
        quizzes: [
          {
            id: "quiz-1",
            title: "HTML Basics Quiz",
            questions: [
              {
                id: "q1",
                question: "What does HTML stand for?",
                options: ["Hypertext Markup Language", "High Tech Modern Language", "Home Tool Markup Language", "Hyperlinks and Text Markup Language"],
                correctAnswer: 0,
              },
            ],
          },
        ],
      },
      {
        id: "module-2",
        name: "CSS Styling",
        description: "Master CSS for styling",
        videos: [
          { id: "v3", name: "CSS Selectors", url: "https://example.com/v3.mp4" },
          { id: "v4", name: "CSS Box Model", url: "https://example.com/v4.mp4" },
        ],
        quizzes: [
          {
            id: "quiz-2",
            title: "CSS Quiz",
            questions: [
              {
                id: "q2",
                question: "What does CSS stand for?",
                options: ["Creative Style Sheets", "Cascading Style Sheets", "Computer Style Sheets", "Colorful Style Sheets"],
                correctAnswer: 1,
              },
            ],
          },
        ],
      },
    ],
    finalQuiz: {
      id: "final-quiz-1",
      title: "Web Development Final Exam",
      questions: [
        {
          id: "fq1",
          question: "Which is the correct HTML syntax?",
          options: ["<html>", "<HTML>", "<Html>", "All are correct"],
          correctAnswer: 3,
        },
      ],
    },
    passingScore: 70,
    createdAt: "2024-01-15",
    status: "ongoing",
  },
  {
    id: "course-2",
    name: "Advanced JavaScript",
    description: "Deep dive into JavaScript ES6+ features",
    instructions: "Master async/await, promises, and modern JavaScript patterns",
    dueDate: "2024-05-30",
    termsAccepted: true,
    modules: [
      {
        id: "module-3",
        name: "ES6 Fundamentals",
        description: "Learn arrow functions and destructuring",
        videos: [
          { id: "v5", name: "Arrow Functions", url: "https://example.com/v5.mp4" },
        ],
        quizzes: [],
      },
    ],
    finalQuiz: {
      id: "final-quiz-2",
      title: "JavaScript Final Exam",
      questions: [],
    },
    passingScore: 75,
    createdAt: "2024-02-01",
    status: "completed",
  },
]

export default function RecentCoursesPage() {
  const [courses, setCourses] = useState<Course[]>(mockCourses)
  const [isEditing, setIsEditing] = useState(false)
  const [editingCourse, setEditingCourse] = useState<Course | null>(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [filterStatus, setFilterStatus] = useState<"all" | "ongoing" | "completed" | "upcoming">("all")

  const filteredCourses = courses.filter((course) => {
    const matchesSearch = course.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.description.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = filterStatus === "all" || course.status === filterStatus
    return matchesSearch && matchesStatus
  })

  const handleEditCourse = (course: Course) => {
    setEditingCourse(course)
    setIsEditing(true)
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  const handleSaveCourse = (updatedCourse: Course) => {
    setCourses(courses.map((c) => (c.id === updatedCourse.id ? updatedCourse : c)))
    setIsEditing(false)
    setEditingCourse(null)
  }

  const handleDeleteCourse = (courseId: string) => {
    if (confirm("Are you sure you want to delete this course?")) {
      setCourses(courses.filter((c) => c.id !== courseId))
    }
  }

  const getStatusBadgeColor = (status?: string) => {
    switch (status) {
      case "ongoing":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
      case "completed":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
      case "upcoming":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200"
    }
  }

  if (isEditing && editingCourse) {
    return (
      <DashboardShell>
        <div className="max-w-4xl mx-auto space-y-6">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <Badge variant="outline">Editing</Badge>
              <h1 className="text-2xl font-bold text-foreground">{editingCourse.name}</h1>
            </div>
            <p className="text-sm text-muted-foreground">
              Edit this course, update modules, videos, and quizzes
            </p>
          </div>

          <CourseBuilder
            initialCourse={editingCourse}
            onSave={handleSaveCourse}
          />

          <div className="flex justify-start">
            <Button
              variant="outline"
              onClick={() => {
                setIsEditing(false)
                setEditingCourse(null)
              }}
            >
              Back to Courses
            </Button>
          </div>
        </div>
      </DashboardShell>
    )
  }

  return (
    <DashboardShell>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-2xl font-bold text-foreground">Recent Courses</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            View and edit your course history
          </p>
        </div>

        {/* Search and Filter */}
        <Card className="border-border/60">
          <CardContent className="pt-6 space-y-4">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-end">
              <div className="flex-1">
                <label className="text-sm font-medium text-foreground block mb-2">Search Courses</label>
                <Input
                  placeholder="Search by course name or description..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="h-9"
                />
              </div>
            </div>

            {/* Status Filter Tabs */}
            <Tabs value={filterStatus} onValueChange={(value: any) => setFilterStatus(value)}>
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="all">All Courses</TabsTrigger>
                <TabsTrigger value="ongoing">Ongoing</TabsTrigger>
                <TabsTrigger value="completed">Completed</TabsTrigger>
                <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
              </TabsList>
            </Tabs>
          </CardContent>
        </Card>

        {/* Courses List */}
        {filteredCourses.length === 0 ? (
          <Card className="border-border/60">
            <CardContent className="flex flex-col items-center justify-center py-12">
              <div className="text-center space-y-2">
                <p className="text-muted-foreground font-medium">No courses found</p>
                <p className="text-sm text-muted-foreground/70">
                  Try adjusting your search or filters
                </p>
              </div>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-3">
            {filteredCourses.map((course) => (
              <Card
                key={course.id}
                className="border-border/60 hover:shadow-md transition-shadow overflow-hidden"
              >
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1 space-y-2">
                      <div className="flex items-center gap-2">
                        <CardTitle className="text-lg">{course.name}</CardTitle>
                        <Badge className={getStatusBadgeColor(course.status)}>
                          {course.status || "Unknown"}
                        </Badge>
                      </div>
                      <CardDescription className="line-clamp-2">
                        {course.description || "No description"}
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>

                <CardContent className="pb-4 space-y-4">
                  {/* Course Meta Info */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-sm">
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <FileText className="h-4 w-4" />
                      <span>{course.modules.length} Module{course.modules.length !== 1 ? "s" : ""}</span>
                    </div>
                    {course.dueDate && (
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Calendar className="h-4 w-4" />
                        <span>Due: {new Date(course.dueDate).toLocaleDateString()}</span>
                      </div>
                    )}
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <span>Pass: {course.passingScore}%</span>
                    </div>
                  </div>

                  {/* Module Summary */}
                  <div className="space-y-2 border-t border-border/50 pt-4">
                    <p className="text-xs font-medium text-foreground">Modules:</p>
                    <div className="space-y-1 max-h-24 overflow-y-auto">
                      {course.modules.slice(0, 3).map((module) => (
                        <div
                          key={module.id}
                          className="text-xs text-muted-foreground flex items-center gap-2 pl-2"
                        >
                          <span className="font-medium">{module.name}</span>
                          <span>•</span>
                          <span>{module.videos.length} video{module.videos.length !== 1 ? "s" : ""}</span>
                          {module.quizzes.length > 0 && (
                            <>
                              <span>•</span>
                              <span>{module.quizzes.length} quiz{module.quizzes.length !== 1 ? "zes" : ""}</span>
                            </>
                          )}
                        </div>
                      ))}
                      {course.modules.length > 3 && (
                        <p className="text-xs text-muted-foreground/70 pl-2">
                          +{course.modules.length - 3} more module{course.modules.length - 3 !== 1 ? "s" : ""}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Final Quiz Info */}
                  {course.finalQuiz && (
                    <div className="text-xs text-muted-foreground flex items-center gap-2 px-2 py-2 bg-muted/30 rounded">
                      <span className="font-medium">✓ Final Quiz:</span>
                      <span>{course.finalQuiz.questions.length} question{course.finalQuiz.questions.length !== 1 ? "s" : ""}</span>
                    </div>
                  )}
                </CardContent>

                {/* Actions */}
                <div className="flex gap-2 justify-end border-t border-border/50 bg-muted/30 px-6 py-3">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="gap-1"
                    onClick={() => handleEditCourse(course)}
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

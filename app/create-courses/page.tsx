"use client"

import { DashboardShell } from "@/components/dashboard-shell"
import { CourseBuilder } from "@/components/courses/course-builder"
import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Progress } from "@/components/ui/progress"
import { Pencil, Trash2, Calendar, Users, FileText, ArrowLeft } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

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
  duration?: string
  department?: string
  termsAccepted: boolean
  modules: Module[]
  finalQuiz?: Quiz
  passingScore: number
  createdAt?: string
  status?: "ongoing" | "completed" | "upcoming"
}

interface FacultyProgress {
  id: string
  name: string
  email: string
  progress: number
  score?: number
  status: "completed" | "in-progress" | "not-started"
  completedDate?: string
  modulesCompleted?: number
}

// Mock faculty progress data
const getFacultyProgressForCourse = (courseId: string): FacultyProgress[] => {
  const baseFacultyList: FacultyProgress[] = [
    { id: "f1", name: "Dr. Alan Turing", email: "alan.turing@university.edu", progress: 100, score: 92, status: "completed", completedDate: "2024-02-28", modulesCompleted: 5 },
    { id: "f2", name: "Dr. Grace Hopper", email: "grace.hopper@university.edu", progress: 85, score: 88, status: "in-progress", modulesCompleted: 4 },
    { id: "f3", name: "Dr. Tim Berners-Lee", email: "tim.bernerslee@university.edu", progress: 60, status: "in-progress", modulesCompleted: 3 },
    { id: "f4", name: "Dr. Ada Lovelace", email: "ada.lovelace@university.edu", progress: 30, status: "in-progress", modulesCompleted: 1 },
    { id: "f5", name: "Dr. Dennis Ritchie", email: "dennis.ritchie@university.edu", progress: 100, score: 84, status: "completed", completedDate: "2024-03-15", modulesCompleted: 5 },
  ]
  return baseFacultyList
}

// Mock data from recent courses
const mockRecentCourses: Course[] = [
  {
    id: "course-1",
    name: "Introduction to Web Development",
    description: "Learn the basics of HTML, CSS, and JavaScript",
    instructions: "Complete all modules and pass the final quiz with 70%",
    duration: "8 weeks",
    department: "Computer Science",
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
    ],
    finalQuiz: {
      id: "final-quiz-1",
      title: "Web Development Final Exam",
      questions: [],
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
    duration: "6 weeks",
    department: "Computer Science",
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

export default function CreateCoursesPage() {
  const [courses, setCourses] = useState<Course[]>([])
  const [isCreating, setIsCreating] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [activeTab, setActiveTab] = useState<"all-courses" | "create">("all-courses")
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null)

  useEffect(() => {
    // Initialize with mock courses on first load
    setCourses(mockRecentCourses)
  }, [])

  const handleSaveCourse = (course: Course) => {
    if (editingId) {
      setCourses(courses.map((c) => (c.id === editingId ? course : c)))
      setEditingId(null)
    } else {
      setCourses([...courses, { ...course, createdAt: new Date().toISOString(), status: "upcoming" }])
    }
    setIsCreating(false)
    setActiveTab("all-courses")
  }

  const handleDeleteCourse = (courseId: string) => {
    if (confirm("Are you sure you want to delete this course?")) {
      setCourses(courses.filter((c) => c.id !== courseId))
    }
  }

  const handleEditCourse = (courseId: string) => {
    setEditingId(courseId)
    setIsCreating(true)
    setActiveTab("create")
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  const filteredCourses = courses.filter((course) =>
    course.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    course.description.toLowerCase().includes(searchQuery.toLowerCase())
  )

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

  // Course Detail View
  if (selectedCourse) {
    const facultyProgress = getFacultyProgressForCourse(selectedCourse.id)
    const sortedFaculty = [...facultyProgress].sort((a, b) => b.progress - a.progress)

    return (
      <DashboardShell>
        <div className="space-y-6">
          {/* Header with Back Button */}
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setSelectedCourse(null)}
              className="gap-2"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Courses
            </Button>
            <div className="flex-1">
              <h1 className="text-2xl font-bold text-foreground">{selectedCourse.name}</h1>
              <p className="text-sm text-muted-foreground mt-1">{selectedCourse.description}</p>
            </div>
          </div>

          {/* Course Overview Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <Card className="border-border/60">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium">Total Faculty</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold text-foreground">{facultyProgress.length}</p>
              </CardContent>
            </Card>
            <Card className="border-border/60">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium">Completed</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold text-foreground">{facultyProgress.filter(f => f.status === "completed").length}</p>
              </CardContent>
            </Card>
            <Card className="border-border/60">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium">In Progress</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold text-foreground">{facultyProgress.filter(f => f.status === "in-progress").length}</p>
              </CardContent>
            </Card>
          </div>

          {/* Course Details */}
          <Card className="border-border/60">
            <CardHeader>
              <CardTitle>Course Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-sm">
                <div>
                  <p className="text-muted-foreground font-medium">Duration</p>
                  <p className="text-foreground mt-1">{selectedCourse.duration || "Not specified"}</p>
                </div>
                <div>
                  <p className="text-muted-foreground font-medium">Department</p>
                  <p className="text-foreground mt-1">{selectedCourse.department || "All"}</p>
                </div>
                <div>
                  <p className="text-muted-foreground font-medium">Passing Score</p>
                  <p className="text-foreground mt-1">{selectedCourse.passingScore}%</p>
                </div>
                <div>
                  <p className="text-muted-foreground font-medium">Modules</p>
                  <p className="text-foreground mt-1">{selectedCourse.modules.length}</p>
                </div>
                <div>
                  <p className="text-muted-foreground font-medium">Created</p>
                  <p className="text-foreground mt-1">{selectedCourse.createdAt ? new Date(selectedCourse.createdAt).toLocaleDateString() : "N/A"}</p>
                </div>
                <div>
                  <p className="text-muted-foreground font-medium">Status</p>
                  <Badge className={getStatusBadgeColor(selectedCourse.status)} style={{ display: 'inline-block' }}>
                    {selectedCourse.status || "Unknown"}
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Faculty Progress Ranking */}
          <Card className="border-border/60">
            <CardHeader>
              <CardTitle>Faculty Progress Ranking</CardTitle>
              <CardDescription>Ranked by completion progress</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {sortedFaculty.map((faculty, index) => (
                <div key={faculty.id} className="space-y-2 pb-4 border-b border-border/50 last:border-0 last:pb-0">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span className="inline-flex items-center justify-center h-6 w-6 rounded-full bg-muted text-xs font-semibold text-muted-foreground">
                          {index + 1}
                        </span>
                        <div>
                          <p className="font-medium text-foreground">{faculty.name}</p>
                          <p className="text-xs text-muted-foreground">{faculty.email}</p>
                        </div>
                      </div>
                    </div>
                    <div className="text-right flex items-center gap-4">
                      <div>
                        {faculty.status === "completed" && (
                          <Badge variant="outline" className="bg-green-50 text-green-700 dark:bg-green-900/20 dark:text-green-300">
                            Completed
                          </Badge>
                        )}
                        {faculty.status === "in-progress" && (
                          <Badge variant="outline" className="bg-blue-50 text-blue-700 dark:bg-blue-900/20 dark:text-blue-300">
                            In Progress
                          </Badge>
                        )}
                      </div>
                      {faculty.score && (
                        <div className="text-right min-w-fit">
                          <p className="font-semibold text-foreground">{faculty.score}%</p>
                          <p className="text-xs text-muted-foreground">Score</p>
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-muted-foreground">Progress</span>
                      <span className="font-medium text-foreground">{faculty.progress}%</span>
                    </div>
                    <Progress value={faculty.progress} className="h-2" />
                  </div>
                  {faculty.modulesCompleted && (
                    <p className="text-xs text-muted-foreground">Modules completed: {faculty.modulesCompleted}/{selectedCourse.modules.length}</p>
                  )}
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </DashboardShell>
    )
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
              Build your course with modules, videos, tasks, and department assignment
            </p>
          </div>

          <CourseBuilder
            courseId={editingId || undefined}
            initialCourse={editingId ? courses.find((c) => c.id === editingId) : undefined}
            onSave={handleSaveCourse}
          />

          <div className="flex justify-start">
            <Button
              variant="outline"
              onClick={() => {
                setIsCreating(false)
                setEditingId(null)
                setActiveTab("all-courses")
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
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Course Management</h1>
            <p className="mt-1 text-sm text-muted-foreground">
              Create new courses and manage existing courses
            </p>
          </div>
        </div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={(value: any) => setActiveTab(value)} className="space-y-4">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="all-courses" className="flex items-center gap-2">
              <FileText className="h-4 w-4" />
              All Courses ({courses.length})
            </TabsTrigger>
            <TabsTrigger value="create" className="flex items-center gap-2">
              Create New Course
            </TabsTrigger>
          </TabsList>

          {/* All Courses Tab */}
          <TabsContent value="all-courses" className="space-y-4">
            {/* Search */}
            <div className="flex gap-2">
              <Input
                placeholder="Search courses..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="h-9"
              />
              <Button
                onClick={() => {
                  setEditingId(null)
                  setIsCreating(true)
                  setActiveTab("create")
                }}
                className="gap-2"
              >
                + New Course
              </Button>
            </div>

            {/* Courses List */}
            {filteredCourses.length === 0 ? (
              <Card className="border-border/60">
                <CardContent className="flex flex-col items-center justify-center py-12">
                  <div className="text-center space-y-2">
                    <p className="text-muted-foreground font-medium">No courses found</p>
                    <p className="text-sm text-muted-foreground/70">
                      Try adjusting your search or create a new course
                    </p>
                  </div>
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-3">
                {filteredCourses.map((course) => (
                  <Card
                    key={course.id}
                    className="border-border/60 hover:shadow-md transition-shadow overflow-hidden cursor-pointer"
                    onClick={() => setSelectedCourse(course)}
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
                        {course.duration && (
                          <div className="flex items-center gap-2 text-muted-foreground">
                            <Calendar className="h-4 w-4" />
                            <span>Duration: {course.duration}</span>
                          </div>
                        )}
                        {course.department && (
                          <div className="flex items-center gap-2 text-muted-foreground">
                            <Users className="h-4 w-4" />
                            <span>{course.department}</span>
                          </div>
                        )}
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
                              {module.quizzes && module.quizzes.length > 0 && (
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
          </TabsContent>

          {/* Create Course Tab */}
          <TabsContent value="create" className="space-y-6">
            <div>
              <h2 className="text-lg font-semibold text-foreground mb-2">Create New Course</h2>
              <p className="text-sm text-muted-foreground">Fill in the details below to create a new course</p>
            </div>

            <CourseBuilder
              onSave={handleSaveCourse}
            />

            <div className="flex justify-start">
              <Button
                variant="outline"
                onClick={() => {
                  setActiveTab("all-courses")
                }}
              >
                Back to All Courses
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardShell>
  )
}

"use client"

import { useState } from "react"
import { DashboardShell } from "@/components/dashboard-shell"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ChevronDown, ChevronUp, Users, Award, BarChart3 } from "lucide-react"

interface AssignedFaculty {
  id: string
  name: string
  department: string
  progress: number
  status: "completed" | "in-progress" | "not-started"
  score?: number
  activities: number
}

interface CourseProgressData {
  id: string
  name: string
  description: string
  duration: string
  department: string
  totalFaculty: number
  assignedFaculty: AssignedFaculty[]
  overallProgress: number
  completionRate: number
  avgScore: number
  rank: number
}

const mockCourseProgress: CourseProgressData[] = [
  {
    id: "course-1",
    name: "Introduction to Web Development",
    description: "Learn the basics of HTML, CSS, and JavaScript",
    duration: "8 weeks",
    department: "Computer Science",
    totalFaculty: 15,
    assignedFaculty: [
      { id: "f1", name: "Dr. Alan Turing", department: "CS", progress: 100, status: "completed", score: 92, activities: 45 },
      { id: "f2", name: "Dr. Grace Hopper", department: "CS", progress: 85, status: "in-progress", score: 82, activities: 38 },
      { id: "f3", name: "Dr. Ada Lovelace", department: "CS", progress: 60, status: "in-progress", score: 71, activities: 25 },
      { id: "f4", name: "Dr. Tim Berners-Lee", department: "CS", progress: 45, status: "in-progress", score: 58, activities: 18 },
    ],
    overallProgress: 72,
    completionRate: 25,
    avgScore: 76,
    rank: 1,
  },
  {
    id: "course-2",
    name: "Advanced JavaScript",
    description: "Deep dive into JavaScript ES6+ features",
    duration: "6 weeks",
    department: "Computer Science",
    totalFaculty: 12,
    assignedFaculty: [
      { id: "f5", name: "Dr. Dennis Ritchie", department: "CS", progress: 100, status: "completed", score: 88, activities: 40 },
      { id: "f6", name: "Dr. Bjarne Stroustrup", department: "CS", progress: 78, status: "in-progress", score: 79, activities: 32 },
      { id: "f7", name: "Dr. Guido van Rossum", department: "CS", progress: 55, status: "in-progress", score: 65, activities: 22 },
    ],
    overallProgress: 78,
    completionRate: 33,
    avgScore: 77,
    rank: 2,
  },
  {
    id: "course-3",
    name: "Python for Data Science",
    description: "Master Python for data analysis and visualization",
    duration: "10 weeks",
    department: "Data Science",
    totalFaculty: 18,
    assignedFaculty: [
      { id: "f8", name: "Dr. Yann LeCun", department: "DS", progress: 100, status: "completed", score: 95, activities: 50 },
      { id: "f9", name: "Dr. Geoffrey Hinton", department: "DS", progress: 92, status: "in-progress", score: 89, activities: 44 },
    ],
    overallProgress: 96,
    completionRate: 50,
    avgScore: 92,
    rank: 3,
  },
]

export default function CourseProgressPage() {
  const [courses, setCourses] = useState<CourseProgressData[]>(mockCourseProgress)
  const [searchQuery, setSearchQuery] = useState("")
  const [expandedCourse, setExpandedCourse] = useState<string | null>(null)
  const [sortBy, setSortBy] = useState<"rank" | "progress" | "completion">("rank")

  const filteredAndSortedCourses = courses
    .filter((course) =>
      course.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.description.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .sort((a, b) => {
      if (sortBy === "rank") return a.rank - b.rank
      if (sortBy === "progress") return b.overallProgress - a.overallProgress
      if (sortBy === "completion") return b.completionRate - a.completionRate
      return 0
    })

  const toggleCourseExpand = (courseId: string) => {
    setExpandedCourse(expandedCourse === courseId ? null : courseId)
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "completed":
        return <Badge className="bg-success/10 text-success border border-success/30">Completed</Badge>
      case "in-progress":
        return <Badge className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">In Progress</Badge>
      case "not-started":
        return <Badge variant="outline">Not Started</Badge>
      default:
        return null
    }
  }

  return (
    <DashboardShell>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-2xl font-bold text-foreground">Course Progress</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Track course completion, faculty assignments, and performance metrics
          </p>
        </div>

        {/* Search and Filter */}
        <Card className="border-border/60">
          <CardContent className="pt-6 space-y-4">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              <Input
                placeholder="Search courses by name or description..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="h-9 flex-1"
              />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as "rank" | "progress" | "completion")}
                className="h-9 rounded-md border border-input bg-background px-3 text-sm"
              >
                <option value="rank">Sort by Rank</option>
                <option value="progress">Sort by Progress</option>
                <option value="completion">Sort by Completion</option>
              </select>
            </div>
          </CardContent>
        </Card>

        {/* Courses Grid */}
        <div className="space-y-3">
          {filteredAndSortedCourses.map((course) => (
            <div key={course.id} className="space-y-2">
              <Card
                className="border-border/60 cursor-pointer hover:shadow-md transition-shadow"
                onClick={() => toggleCourseExpand(course.id)}
              >
                <CardHeader className="pb-4">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-3 mb-2">
                        <CardTitle className="text-lg">{course.name}</CardTitle>
                        <Badge variant="outline">Rank #{course.rank}</Badge>
                      </div>
                      <CardDescription className="line-clamp-1">{course.description}</CardDescription>
                    </div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        toggleCourseExpand(course.id)
                      }}
                      className="text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {expandedCourse === course.id ? (
                        <ChevronUp className="h-5 w-5" />
                      ) : (
                        <ChevronDown className="h-5 w-5" />
                      )}
                    </button>
                  </div>
                </CardHeader>

                <CardContent className="space-y-4">
                  {/* Quick Stats */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    <div className="rounded-lg bg-muted/50 p-3">
                      <p className="text-xs text-muted-foreground mb-1">Duration</p>
                      <p className="text-sm font-semibold text-foreground">{course.duration}</p>
                    </div>
                    <div className="rounded-lg bg-muted/50 p-3">
                      <p className="text-xs text-muted-foreground mb-1">Faculty</p>
                      <p className="text-sm font-semibold text-foreground">{course.assignedFaculty.length}/{course.totalFaculty}</p>
                    </div>
                    <div className="rounded-lg bg-muted/50 p-3">
                      <p className="text-xs text-muted-foreground mb-1">Avg Score</p>
                      <p className="text-sm font-semibold text-foreground">{course.avgScore}%</p>
                    </div>
                    <div className="rounded-lg bg-muted/50 p-3">
                      <p className="text-xs text-muted-foreground mb-1">Completed</p>
                      <p className="text-sm font-semibold text-foreground">{course.completionRate * course.assignedFaculty.length / 100}%</p>
                    </div>
                  </div>

                  {/* Progress Bars */}
                  <div className="space-y-3 border-t border-border/50 pt-4">
                    <div>
                      <div className="flex items-center justify-between text-sm mb-2">
                        <span className="text-muted-foreground">Overall Progress</span>
                        <span className="font-semibold text-foreground">{course.overallProgress}%</span>
                      </div>
                      <Progress value={course.overallProgress} className="h-2" />
                    </div>
                    <div>
                      <div className="flex items-center justify-between text-sm mb-2">
                        <span className="text-muted-foreground">Course Completion</span>
                        <span className="font-semibold text-foreground">{course.completionRate}%</span>
                      </div>
                      <Progress value={course.completionRate} className="h-2" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Expanded Faculty Details */}
              {expandedCourse === course.id && (
                <Card className="border-border/60 bg-muted/20">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-sm flex items-center gap-2">
                      <Users className="h-4 w-4" />
                      Assigned Faculty ({course.assignedFaculty.length})
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Tabs defaultValue="faculty" className="space-y-4">
                      <TabsList className="grid w-full grid-cols-3">
                        <TabsTrigger value="faculty" className="flex items-center gap-2">
                          <Users className="h-4 w-4" />
                          <span className="hidden sm:inline">Faculty</span>
                        </TabsTrigger>
                        <TabsTrigger value="progress" className="flex items-center gap-2">
                          <BarChart3 className="h-4 w-4" />
                          <span className="hidden sm:inline">Progress</span>
                        </TabsTrigger>
                        <TabsTrigger value="activities" className="flex items-center gap-2">
                          <Award className="h-4 w-4" />
                          <span className="hidden sm:inline">Activities</span>
                        </TabsTrigger>
                      </TabsList>

                      <TabsContent value="faculty" className="space-y-3">
                        {course.assignedFaculty.map((faculty) => (
                          <div
                            key={faculty.id}
                            className="flex items-center gap-3 rounded-lg border border-border/50 p-4 hover:bg-muted/30 transition-colors"
                          >
                            <div className="flex-1 min-w-0">
                              <p className="font-medium text-foreground">{faculty.name}</p>
                              <p className="text-xs text-muted-foreground">{faculty.department} Department</p>
                            </div>
                            <div className="text-right">
                              {getStatusBadge(faculty.status)}
                            </div>
                          </div>
                        ))}
                      </TabsContent>

                      <TabsContent value="progress" className="space-y-3">
                        {course.assignedFaculty.map((faculty) => (
                          <div key={faculty.id} className="space-y-2">
                            <div className="flex items-center justify-between text-sm">
                              <span className="font-medium text-foreground">{faculty.name}</span>
                              <span className="text-muted-foreground">{faculty.progress}%</span>
                            </div>
                            <Progress value={faculty.progress} className="h-2" />
                          </div>
                        ))}
                      </TabsContent>

                      <TabsContent value="activities" className="space-y-3">
                        {course.assignedFaculty.map((faculty) => (
                          <div
                            key={faculty.id}
                            className="flex items-center justify-between rounded-lg border border-border/50 p-4 hover:bg-muted/30 transition-colors"
                          >
                            <div className="flex-1">
                              <p className="font-medium text-foreground">{faculty.name}</p>
                              <p className="text-xs text-muted-foreground">
                                {faculty.score && `Score: ${faculty.score}%`}
                              </p>
                            </div>
                            <div className="text-right">
                              <p className="font-semibold text-foreground">{faculty.activities}</p>
                              <p className="text-xs text-muted-foreground">Activities</p>
                            </div>
                          </div>
                        ))}
                      </TabsContent>
                    </Tabs>

                    {/* Department Assignment Section */}
                    <div className="mt-6 border-t border-border/50 pt-4 space-y-3">
                      <div>
                        <p className="text-sm font-semibold text-foreground mb-2">Assign Department to Course</p>
                        <div className="flex gap-2">
                          <select className="flex-1 h-9 rounded-md border border-input bg-background px-3 text-sm">
                            <option>Select Department</option>
                            <option>Computer Science</option>
                            <option>Data Science</option>
                            <option>Engineering</option>
                            <option>Business</option>
                          </select>
                          <Button size="sm">Assign</Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          ))}
        </div>

        {/* Rank List Summary */}
        {filteredAndSortedCourses.length > 0 && (
          <Card className="border-border/60">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Award className="h-5 w-5" />
                Course Rank List
              </CardTitle>
              <CardDescription>Courses ranked by overall progress and completion rate</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {filteredAndSortedCourses.map((course, index) => (
                  <div
                    key={course.id}
                    className="flex items-center gap-4 rounded-lg border border-border/50 p-4 hover:bg-muted/30 transition-colors"
                  >
                    <div className="flex items-center justify-center h-8 w-8 rounded-full bg-primary/10 text-primary font-semibold text-sm">
                      #{index + 1}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-foreground truncate">{course.name}</p>
                      <p className="text-xs text-muted-foreground">{course.assignedFaculty.length} faculty assigned</p>
                    </div>
                    <div className="flex items-center gap-6 text-sm">
                      <div className="text-right">
                        <p className="font-semibold text-foreground">{course.overallProgress}%</p>
                        <p className="text-xs text-muted-foreground">Progress</p>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-foreground">{course.avgScore}%</p>
                        <p className="text-xs text-muted-foreground">Avg Score</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </DashboardShell>
  )
}

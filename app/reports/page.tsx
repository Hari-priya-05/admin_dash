"use client"

import { useState } from "react"
import { DashboardShell } from "@/components/dashboard-shell"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { ChevronRight, Building2, Network, Users, ChevronDown } from "lucide-react"

type DrillLevel = "colleges" | "departments" | "faculties"

interface CollegeReport {
  name: string
  departments: number
  faculties: number
  courses: number
  completion: number
  passRate: number
}

interface DepartmentReport {
  name: string
  college: string
  faculties: number
  courses: number
  completion: number
  passRate: number
}

interface FacultyActivity {
  id: string
  type: "assignment" | "quiz" | "module_complete" | "enrollment"
  description: string
  date: string
  score?: number
}

interface CourseDetail {
  id: string
  name: string
  duration: string
  modules: number
  quizzes: number
  description: string
  completionDate?: string
  score?: number
}

interface FacultyReport {
  name: string
  department: string
  courses: number
  completion: number
  avgScore: number
  passed: boolean
  email?: string
  joinDate?: string
  activities?: FacultyActivity[]
  assignedCourses?: CourseDetail[]
}

const collegeReports: CollegeReport[] = [
  { name: "MIT", departments: 42, faculties: 380, courses: 850, completion: 88, passRate: 92 },
  { name: "Stanford", departments: 38, faculties: 340, courses: 780, completion: 82, passRate: 89 },
  { name: "Harvard", departments: 35, faculties: 310, courses: 720, completion: 76, passRate: 85 },
  { name: "Yale", departments: 30, faculties: 260, courses: 620, completion: 71, passRate: 82 },
  { name: "Princeton", departments: 28, faculties: 240, courses: 580, completion: 68, passRate: 78 },
  { name: "Columbia", departments: 33, faculties: 290, courses: 670, completion: 74, passRate: 84 },
]

const departmentReports: DepartmentReport[] = [
  { name: "Computer Science", college: "MIT", faculties: 45, courses: 120, completion: 92, passRate: 94 },
  { name: "Electrical Engineering", college: "MIT", faculties: 38, courses: 95, completion: 85, passRate: 90 },
  { name: "Physics", college: "MIT", faculties: 32, courses: 80, completion: 78, passRate: 86 },
  { name: "Mathematics", college: "MIT", faculties: 28, courses: 65, completion: 90, passRate: 92 },
  { name: "Biology", college: "MIT", faculties: 25, courses: 55, completion: 72, passRate: 80 },
]

const facultyReports: FacultyReport[] = [
  {
    name: "Dr. Alan Turing",
    department: "Computer Science",
    courses: 5,
    completion: 95,
    avgScore: 88,
    passed: true,
    email: "alan.turing@university.edu",
    joinDate: "2023-01-15",
    activities: [
      { id: "a1", type: "enrollment", description: "Enrolled in Web Development Course", date: "2024-01-10" },
      { id: "a2", type: "module_complete", description: "Completed Module 1: HTML Basics", date: "2024-01-15", score: 92 },
      { id: "a3", type: "quiz", description: "Completed Quiz: CSS Selectors", date: "2024-01-20", score: 85 },
      { id: "a4", type: "assignment", description: "Submitted Assignment: Build Website", date: "2024-01-25", score: 90 },
    ],
    assignedCourses: [
      { id: "c1", name: "Introduction to Web Development", duration: "8 weeks", modules: 5, quizzes: 12, description: "Learn HTML, CSS, and JavaScript basics", completionDate: "2024-02-28", score: 92 },
      { id: "c2", name: "Advanced JavaScript", duration: "6 weeks", modules: 4, quizzes: 10, description: "Master ES6+ features", completionDate: "2024-03-15", score: 88 },
    ],
  },
  {
    name: "Dr. Grace Hopper",
    department: "Computer Science",
    courses: 6,
    completion: 92,
    avgScore: 82,
    passed: true,
    email: "grace.hopper@university.edu",
    joinDate: "2023-02-20",
    activities: [
      { id: "a5", type: "enrollment", description: "Enrolled in Data Structures Course", date: "2024-01-12" },
      { id: "a6", type: "module_complete", description: "Completed Module 2: Linked Lists", date: "2024-01-22", score: 88 },
      { id: "a7", type: "quiz", description: "Completed Quiz: Trees and Graphs", date: "2024-02-05", score: 79 },
    ],
    assignedCourses: [
      { id: "c3", name: "Data Structures & Algorithms", duration: "10 weeks", modules: 6, quizzes: 15, description: "Core computer science fundamentals", completionDate: "2024-04-10", score: 82 },
    ],
  },
  {
    name: "Dr. Tim Berners-Lee",
    department: "Computer Science",
    courses: 4,
    completion: 88,
    avgScore: 76,
    passed: true,
    email: "tim.bernerslee@university.edu",
    joinDate: "2023-03-10",
    activities: [
      { id: "a8", type: "enrollment", description: "Enrolled in Web Technologies Course", date: "2024-01-08" },
      { id: "a9", type: "module_complete", description: "Completed Module 1: HTTP Protocol", date: "2024-01-18", score: 84 },
    ],
    assignedCourses: [
      { id: "c4", name: "Web Technologies & Architecture", duration: "8 weeks", modules: 5, quizzes: 11, description: "Understanding modern web infrastructure", completionDate: "2024-03-08", score: 76 },
    ],
  },
  {
    name: "Dr. Ada Lovelace",
    department: "Computer Science",
    courses: 3,
    completion: 65,
    avgScore: 58,
    passed: false,
    email: "ada.lovelace@university.edu",
    joinDate: "2023-04-05",
    activities: [
      { id: "a10", type: "enrollment", description: "Enrolled in Programming Basics", date: "2024-01-20" },
      { id: "a11", type: "module_complete", description: "Completed Module 1: Variables & Data Types", date: "2024-02-01", score: 65 },
    ],
    assignedCourses: [
      { id: "c5", name: "Programming Fundamentals", duration: "12 weeks", modules: 8, quizzes: 16, description: "Introduction to programming concepts", score: 58 },
    ],
  },
  {
    name: "Dr. Dennis Ritchie",
    department: "Computer Science",
    courses: 5,
    completion: 90,
    avgScore: 84,
    passed: true,
    email: "dennis.ritchie@university.edu",
    joinDate: "2023-05-01",
    activities: [
      { id: "a12", type: "enrollment", description: "Enrolled in Systems Programming", date: "2024-01-05" },
      { id: "a13", type: "module_complete", description: "Completed Module 3: Memory Management", date: "2024-02-10", score: 91 },
      { id: "a14", type: "quiz", description: "Completed Quiz: Pointers and Arrays", date: "2024-02-20", score: 87 },
    ],
    assignedCourses: [
      { id: "c6", name: "Systems Programming with C", duration: "9 weeks", modules: 5, quizzes: 12, description: "Deep dive into low-level programming", completionDate: "2024-03-30", score: 84 },
    ],
  },
]

export default function ReportsPage() {
  const [level, setLevel] = useState<DrillLevel>("colleges")
  const [selectedCollege, setSelectedCollege] = useState<string | null>(null)
  const [selectedDepartment, setSelectedDepartment] = useState<string | null>(null)
  const [selectedFaculty, setSelectedFaculty] = useState<FacultyReport | null>(null)
  const [facultyDetailView, setFacultyDetailView] = useState<"overview" | "courses" | "activities">("overview")

  const handleCollegeClick = (college: string) => {
    setSelectedCollege(college)
    setLevel("departments")
  }

  const handleDepartmentClick = (department: string) => {
    setSelectedDepartment(department)
    setLevel("faculties")
    setSelectedFaculty(null)
  }

  const handleFacultyClick = (faculty: FacultyReport) => {
    setSelectedFaculty(faculty)
  }

  const handleBreadcrumb = (target: DrillLevel) => {
    setLevel(target)
    setSelectedFaculty(null)
    setFacultyDetailView("overview")
    if (target === "colleges") {
      setSelectedCollege(null)
      setSelectedDepartment(null)
    }
    if (target === "departments") {
      setSelectedDepartment(null)
    }
  }

  return (
    <DashboardShell>
      <div className="flex flex-col gap-6">
        {/* Header */}
        <div>
          <h1 className="text-2xl font-bold text-foreground">Reports</h1>
          <p className="mt-1 text-sm text-muted-foreground">Drill-down performance reports</p>
        </div>

        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm">
          <button
            onClick={() => handleBreadcrumb("colleges")}
            className={`flex items-center gap-1.5 transition-colors ${level === "colleges" ? "font-semibold text-foreground" : "text-primary hover:underline"}`}
          >
            <Building2 className="h-4 w-4" />
            Colleges
          </button>
          {selectedCollege && (
            <>
              <ChevronRight className="h-4 w-4 text-muted-foreground" />
              <button
                onClick={() => handleBreadcrumb("departments")}
                className={`flex items-center gap-1.5 transition-colors ${level === "departments" ? "font-semibold text-foreground" : "text-primary hover:underline"}`}
              >
                <Network className="h-4 w-4" />
                {selectedCollege}
              </button>
            </>
          )}
          {selectedDepartment && (
            <>
              <ChevronRight className="h-4 w-4 text-muted-foreground" />
              <span className="flex items-center gap-1.5 font-semibold text-foreground">
                <Users className="h-4 w-4" />
                {selectedDepartment}
              </span>
            </>
          )}
        </div>

        {/* College Level */}
        {level === "colleges" && (
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {collegeReports.map((college) => (
              <Card
                key={college.name}
                className="cursor-pointer rounded-xl border-border/60 shadow-sm transition-all hover:shadow-md hover:border-primary/20"
                onClick={() => handleCollegeClick(college.name)}
              >
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-sm font-semibold text-foreground">{college.name}</CardTitle>
                    <ChevronRight className="h-4 w-4 text-muted-foreground" />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col gap-3">
                    <div className="grid grid-cols-3 gap-2 text-center">
                      <div>
                        <p className="text-lg font-bold text-foreground">{college.departments}</p>
                        <p className="text-[10px] text-muted-foreground">Departments</p>
                      </div>
                      <div>
                        <p className="text-lg font-bold text-foreground">{college.faculties}</p>
                        <p className="text-[10px] text-muted-foreground">Faculties</p>
                      </div>
                      <div>
                        <p className="text-lg font-bold text-foreground">{college.courses}</p>
                        <p className="text-[10px] text-muted-foreground">Courses</p>
                      </div>
                    </div>
                    <div>
                      <div className="flex items-center justify-between text-xs mb-1">
                        <span className="text-muted-foreground">Completion</span>
                        <span className="font-medium text-foreground">{college.completion}%</span>
                      </div>
                      <Progress value={college.completion} className="h-2" />
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-muted-foreground">Pass Rate</span>
                      <Badge variant="outline" className={college.passRate >= 85 ? "border-success/30 bg-success/10 text-success" : "border-warning/30 bg-warning/10 text-warning-foreground"}>
                        {college.passRate}%
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Department Level */}
        {level === "departments" && (
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {departmentReports.map((dept) => (
              <Card
                key={dept.name}
                className="cursor-pointer rounded-xl border-border/60 shadow-sm transition-all hover:shadow-md hover:border-primary/20"
                onClick={() => handleDepartmentClick(dept.name)}
              >
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-sm font-semibold text-foreground">{dept.name}</CardTitle>
                    <ChevronRight className="h-4 w-4 text-muted-foreground" />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col gap-3">
                    <div className="grid grid-cols-2 gap-2 text-center">
                      <div>
                        <p className="text-lg font-bold text-foreground">{dept.faculties}</p>
                        <p className="text-[10px] text-muted-foreground">Faculties</p>
                      </div>
                      <div>
                        <p className="text-lg font-bold text-foreground">{dept.courses}</p>
                        <p className="text-[10px] text-muted-foreground">Courses</p>
                      </div>
                    </div>
                    <div>
                      <div className="flex items-center justify-between text-xs mb-1">
                        <span className="text-muted-foreground">Completion</span>
                        <span className="font-medium text-foreground">{dept.completion}%</span>
                      </div>
                      <Progress value={dept.completion} className="h-2" />
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-muted-foreground">Pass Rate</span>
                      <Badge variant="outline" className={dept.passRate >= 85 ? "border-success/30 bg-success/10 text-success" : "border-warning/30 bg-warning/10 text-warning-foreground"}>
                        {dept.passRate}%
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Faculty Level */}
        {level === "faculties" && !selectedFaculty && (
          <Card className="rounded-xl border-border/60 shadow-sm">
            <CardHeader>
              <CardTitle className="text-sm font-semibold text-foreground">Faculty Performance</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col gap-2">
                {facultyReports.map((faculty) => (
                  <Collapsible key={faculty.name} className="rounded-lg border border-border overflow-hidden">
                    <CollapsibleTrigger className="w-full hover:bg-muted/30 transition-colors">
                      <div className="flex items-center gap-4 p-4 w-full">
                        <ChevronDown className="h-4 w-4 shrink-0 text-muted-foreground" />
                        <div className="flex-1 min-w-0 text-left">
                          <p className="font-medium text-foreground">{faculty.name}</p>
                          <p className="text-xs text-muted-foreground">{faculty.courses} courses • {faculty.email}</p>
                        </div>
                        <div className="flex items-center gap-3 min-w-[200px]">
                          <Progress value={faculty.completion} className="h-2 flex-1" />
                          <span className="text-xs font-medium text-muted-foreground w-8">{faculty.completion}%</span>
                        </div>
                        <div className="text-sm font-medium text-foreground w-16 text-center">{faculty.avgScore}%</div>
                        <Badge
                          variant="outline"
                          className={faculty.passed ? "border-success/30 bg-success/10 text-success" : "border-destructive/30 bg-destructive/10 text-destructive"}
                        >
                          {faculty.passed ? "Pass" : "Fail"}
                        </Badge>
                      </div>
                    </CollapsibleTrigger>
                    <CollapsibleContent className="border-t border-border/50 bg-muted/20 p-4 space-y-4">
                      {/* Quick Stats */}
                      <div className="grid grid-cols-3 gap-3">
                        <div className="rounded bg-muted/50 p-3">
                          <p className="text-xs text-muted-foreground">Completion</p>
                          <p className="text-lg font-semibold text-foreground mt-1">{faculty.completion}%</p>
                        </div>
                        <div className="rounded bg-muted/50 p-3">
                          <p className="text-xs text-muted-foreground">Avg Score</p>
                          <p className="text-lg font-semibold text-foreground mt-1">{faculty.avgScore}%</p>
                        </div>
                        <div className="rounded bg-muted/50 p-3">
                          <p className="text-xs text-muted-foreground">Status</p>
                          <p className="text-sm font-semibold text-foreground mt-1">{faculty.passed ? "✓ Pass" : "✗ Fail"}</p>
                        </div>
                      </div>

                      {/* Recent Activity Preview */}
                      {faculty.activities && faculty.activities.length > 0 && (
                        <div className="space-y-2 border-t border-border/30 pt-3">
                          <p className="text-xs font-semibold text-foreground">Recent Activities</p>
                          <div className="space-y-1 max-h-24 overflow-y-auto">
                            {faculty.activities.slice(0, 3).map((activity) => (
                              <div key={activity.id} className="text-xs text-muted-foreground flex items-center justify-between bg-background/50 p-2 rounded">
                                <span>{activity.description}</span>
                                {activity.score && <span className="font-medium">{activity.score}%</span>}
                              </div>
                            ))}
                            {faculty.activities.length > 3 && (
                              <p className="text-xs text-muted-foreground/70 p-2">+{faculty.activities.length - 3} more activities</p>
                            )}
                          </div>
                        </div>
                      )}

                      {/* Course Summary */}
                      {faculty.assignedCourses && faculty.assignedCourses.length > 0 && (
                        <div className="space-y-2 border-t border-border/30 pt-3">
                          <p className="text-xs font-semibold text-foreground">Assigned Courses ({faculty.assignedCourses.length})</p>
                          <div className="space-y-1 max-h-24 overflow-y-auto">
                            {faculty.assignedCourses.slice(0, 2).map((course) => (
                              <div key={course.id} className="text-xs text-muted-foreground bg-background/50 p-2 rounded">
                                <p className="font-medium text-foreground">{course.name}</p>
                                {course.score && <p>Score: {course.score}%</p>}
                              </div>
                            ))}
                            {faculty.assignedCourses.length > 2 && (
                              <p className="text-xs text-muted-foreground/70 p-2">+{faculty.assignedCourses.length - 2} more courses</p>
                            )}
                          </div>
                        </div>
                      )}

                      {/* View Full Details Button */}
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleFacultyClick(faculty)}
                        className="w-full gap-2 mt-2"
                      >
                        View Full Details
                      </Button>
                    </CollapsibleContent>
                  </Collapsible>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Faculty Detail View */}
        {selectedFaculty && (
          <Card className="rounded-xl border-border/60 shadow-sm">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="text-lg text-foreground">{selectedFaculty.name}</CardTitle>
                  <CardDescription className="mt-1">
                    {selectedFaculty.email} • Joined {selectedFaculty.joinDate}
                  </CardDescription>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setSelectedFaculty(null)}
                >
                  Back
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Overview Stats */}
              <Tabs
                value={facultyDetailView}
                onValueChange={(value: any) => setFacultyDetailView(value)}
                className="w-full space-y-4"
              >
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="overview">Overview</TabsTrigger>
                  <TabsTrigger value="courses">Assigned Courses</TabsTrigger>
                  <TabsTrigger value="activities">Activities</TabsTrigger>
                </TabsList>

                <TabsContent value="overview" className="space-y-4">
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    <div className="rounded-lg bg-muted/50 p-4">
                      <p className="text-xs text-muted-foreground mb-1">Total Courses</p>
                      <p className="text-2xl font-bold text-foreground">{selectedFaculty.courses}</p>
                    </div>
                    <div className="rounded-lg bg-muted/50 p-4">
                      <p className="text-xs text-muted-foreground mb-1">Completion Rate</p>
                      <p className="text-2xl font-bold text-foreground">{selectedFaculty.completion}%</p>
                    </div>
                    <div className="rounded-lg bg-muted/50 p-4">
                      <p className="text-xs text-muted-foreground mb-1">Average Score</p>
                      <p className="text-2xl font-bold text-foreground">{selectedFaculty.avgScore}%</p>
                    </div>
                    <div className="rounded-lg bg-muted/50 p-4">
                      <p className="text-xs text-muted-foreground mb-1">Status</p>
                      <p className="text-lg font-bold text-foreground">{selectedFaculty.passed ? "✓ Pass" : "✗ Fail"}</p>
                    </div>
                  </div>

                  <div className="border-t border-border/50 pt-4">
                    <p className="text-sm font-semibold text-foreground mb-3">Individual Faculty Progress</p>
                    <div className="space-y-3">
                      <div>
                        <div className="flex items-center justify-between text-sm mb-2">
                          <span className="text-muted-foreground">Overall Progress</span>
                          <span className="font-medium text-foreground">{selectedFaculty.completion}%</span>
                        </div>
                        <Progress value={selectedFaculty.completion} className="h-2" />
                      </div>
                      <div>
                        <div className="flex items-center justify-between text-sm mb-2">
                          <span className="text-muted-foreground">Score Performance</span>
                          <span className="font-medium text-foreground">{selectedFaculty.avgScore}%</span>
                        </div>
                        <Progress value={selectedFaculty.avgScore} className="h-2" />
                      </div>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="courses" className="space-y-4">
                  <div className="space-y-3">
                    {selectedFaculty.assignedCourses && selectedFaculty.assignedCourses.length > 0 ? (
                      selectedFaculty.assignedCourses.map((course) => (
                        <div
                          key={course.id}
                          className="rounded-lg border border-border/50 p-4 space-y-3 hover:bg-muted/20 transition-colors"
                        >
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <p className="font-medium text-foreground">{course.name}</p>
                              <p className="text-xs text-muted-foreground mt-1">{course.description}</p>
                            </div>
                            {course.score && (
                              <Badge variant="outline" className="ml-2">
                                Score: {course.score}%
                              </Badge>
                            )}
                          </div>

                          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
                            <div>
                              <p className="text-muted-foreground">Duration</p>
                              <p className="font-medium text-foreground">{course.duration}</p>
                            </div>
                            <div>
                              <p className="text-muted-foreground">Modules</p>
                              <p className="font-medium text-foreground">{course.modules}</p>
                            </div>
                            <div>
                              <p className="text-muted-foreground">Quizzes</p>
                              <p className="font-medium text-foreground">{course.quizzes}</p>
                            </div>
                            {course.completionDate && (
                              <div>
                                <p className="text-muted-foreground">Completed</p>
                                <p className="font-medium text-foreground">{new Date(course.completionDate).toLocaleDateString()}</p>
                              </div>
                            )}
                          </div>
                        </div>
                      ))
                    ) : (
                      <p className="text-sm text-muted-foreground">No assigned courses</p>
                    )}
                  </div>
                </TabsContent>

                <TabsContent value="activities" className="space-y-3">
                  {selectedFaculty.activities && selectedFaculty.activities.length > 0 ? (
                    selectedFaculty.activities.map((activity) => (
                      <div key={activity.id} className="flex items-start gap-4 rounded-lg border border-border/50 p-4 hover:bg-muted/20 transition-colors">
                        <div className="flex-1">
                          <p className="font-medium text-foreground">{activity.description}</p>
                          <p className="text-xs text-muted-foreground mt-1">{new Date(activity.date).toLocaleDateString()}</p>
                        </div>
                        {activity.score && (
                          <div className="text-right">
                            <p className="font-semibold text-foreground">{activity.score}%</p>
                            <p className="text-xs text-muted-foreground">Score</p>
                          </div>
                        )}
                        <Badge variant="outline" className="ml-2">
                          {activity.type.replace("_", " ")}
                        </Badge>
                      </div>
                    ))
                  ) : (
                    <p className="text-sm text-muted-foreground">No activities recorded</p>
                  )}
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        )}

        {/* Back Button */}
        {level !== "colleges" && (
          <Button
            variant="outline"
            onClick={() => handleBreadcrumb(level === "faculties" ? "departments" : "colleges")}
            className="w-fit"
          >
            Back to {level === "faculties" ? "Departments" : "Colleges"}
          </Button>
        )}
      </div>
    </DashboardShell>
  )
}

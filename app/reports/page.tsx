"use client"

import { useState } from "react"
import { DashboardShell } from "@/components/dashboard-shell"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import { ChevronRight, Building2, Network, Users } from "lucide-react"

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

interface FacultyReport {
  name: string
  department: string
  courses: number
  completion: number
  avgScore: number
  passed: boolean
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
  { name: "Dr. Alan Turing", department: "Computer Science", courses: 5, completion: 95, avgScore: 88, passed: true },
  { name: "Dr. Grace Hopper", department: "Computer Science", courses: 6, completion: 92, avgScore: 82, passed: true },
  { name: "Dr. Tim Berners-Lee", department: "Computer Science", courses: 4, completion: 88, avgScore: 76, passed: true },
  { name: "Dr. Ada Lovelace", department: "Computer Science", courses: 3, completion: 65, avgScore: 58, passed: false },
  { name: "Dr. Dennis Ritchie", department: "Computer Science", courses: 5, completion: 90, avgScore: 84, passed: true },
]

export default function ReportsPage() {
  const [level, setLevel] = useState<DrillLevel>("colleges")
  const [selectedCollege, setSelectedCollege] = useState<string | null>(null)
  const [selectedDepartment, setSelectedDepartment] = useState<string | null>(null)

  const handleCollegeClick = (college: string) => {
    setSelectedCollege(college)
    setLevel("departments")
  }

  const handleDepartmentClick = (department: string) => {
    setSelectedDepartment(department)
    setLevel("faculties")
  }

  const handleBreadcrumb = (target: DrillLevel) => {
    setLevel(target)
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
        {level === "faculties" && (
          <Card className="rounded-xl border-border/60 shadow-sm">
            <CardHeader>
              <CardTitle className="text-sm font-semibold text-foreground">Faculty Performance</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col gap-3">
                {facultyReports.map((faculty) => (
                  <div key={faculty.name} className="flex items-center gap-4 rounded-lg border border-border p-4 transition-colors hover:bg-muted/30">
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-foreground">{faculty.name}</p>
                      <p className="text-xs text-muted-foreground">{faculty.courses} courses</p>
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
                ))}
              </div>
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

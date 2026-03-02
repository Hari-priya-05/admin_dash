"use client"

import { DashboardShell } from "@/components/dashboard-shell"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Accordion, AccordionContent, AccordionItem, AccordionTrigger,
} from "@/components/ui/accordion"
import { Upload, Play, FileText, HelpCircle, Clock, BookOpen } from "lucide-react"

const courseModules = [
  {
    course: "Introduction to Machine Learning",
    department: "Computer Science",
    modules: [
      { id: "m1", title: "Introduction & Setup", videos: 3, quizzes: 1, duration: "2h 30m", status: "Published" },
      { id: "m2", title: "Linear Regression", videos: 4, quizzes: 1, duration: "3h 15m", status: "Published" },
      { id: "m3", title: "Classification Algorithms", videos: 5, quizzes: 2, duration: "4h 00m", status: "Published" },
      { id: "m4", title: "Neural Networks Basics", videos: 6, quizzes: 2, duration: "5h 00m", status: "Draft" },
    ],
  },
  {
    course: "Advanced Data Structures",
    department: "Computer Science",
    modules: [
      { id: "m5", title: "Trees & Balanced BSTs", videos: 4, quizzes: 1, duration: "3h 45m", status: "Published" },
      { id: "m6", title: "Graph Algorithms", videos: 5, quizzes: 2, duration: "4h 30m", status: "Published" },
      { id: "m7", title: "Hash Tables & Hashing", videos: 3, quizzes: 1, duration: "2h 45m", status: "Draft" },
    ],
  },
  {
    course: "Quantum Physics Fundamentals",
    department: "Physics",
    modules: [
      { id: "m8", title: "Wave-Particle Duality", videos: 4, quizzes: 1, duration: "3h 00m", status: "Published" },
      { id: "m9", title: "Schrodinger Equation", videos: 5, quizzes: 2, duration: "4h 15m", status: "Published" },
      { id: "m10", title: "Quantum Entanglement", videos: 3, quizzes: 1, duration: "2h 30m", status: "Published" },
    ],
  },
]

export default function ModulesPage() {
  return (
    <DashboardShell>
      <div className="flex flex-col gap-6">
        {/* Header */}
        <div>
          <h1 className="text-2xl font-bold text-foreground">Modules</h1>
          <p className="mt-1 text-sm text-muted-foreground">Manage course modules, videos, and attached quizzes</p>
        </div>

        {/* Course Accordions */}
        <div className="flex flex-col gap-4">
          {courseModules.map((course) => (
            <Card key={course.course} className="rounded-xl border-border/60 shadow-sm">
              <CardHeader className="pb-2">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                    <BookOpen className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <CardTitle className="text-base font-semibold text-foreground">{course.course}</CardTitle>
                    <p className="text-xs text-muted-foreground">{course.department} &middot; {course.modules.length} Modules</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <Accordion type="single" collapsible className="w-full">
                  {course.modules.map((mod) => (
                    <AccordionItem key={mod.id} value={mod.id}>
                      <AccordionTrigger className="py-3 text-sm hover:no-underline">
                        <div className="flex flex-1 items-center gap-3 pr-4">
                          <span className="font-medium text-foreground">{mod.title}</span>
                          <Badge
                            variant="outline"
                            className={
                              mod.status === "Published"
                                ? "border-success/30 bg-success/10 text-success text-[10px]"
                                : "border-warning/30 bg-warning/10 text-warning-foreground text-[10px]"
                            }
                          >
                            {mod.status}
                          </Badge>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent>
                        <div className="flex flex-col gap-4 pl-1">
                          {/* Module Stats */}
                          <div className="flex items-center gap-6 text-xs text-muted-foreground">
                            <span className="flex items-center gap-1.5">
                              <Play className="h-3.5 w-3.5" />
                              {mod.videos} Videos
                            </span>
                            <span className="flex items-center gap-1.5">
                              <HelpCircle className="h-3.5 w-3.5" />
                              {mod.quizzes} {mod.quizzes === 1 ? "Quiz" : "Quizzes"}
                            </span>
                            <span className="flex items-center gap-1.5">
                              <Clock className="h-3.5 w-3.5" />
                              {mod.duration}
                            </span>
                          </div>

                          {/* Video Upload Section */}
                          <div className="rounded-lg border border-dashed border-border bg-muted/30 p-4">
                            <div className="flex flex-col items-center gap-2 text-center">
                              <Upload className="h-8 w-8 text-muted-foreground/50" />
                              <div>
                                <p className="text-sm font-medium text-muted-foreground">Upload Video</p>
                                <p className="text-xs text-muted-foreground/70">Drag & drop or click to browse. MP4, MOV up to 500MB</p>
                              </div>
                              <Button variant="outline" size="sm" className="mt-1 h-8 text-xs">
                                Choose File
                              </Button>
                            </div>
                          </div>

                          {/* Attached Quizzes */}
                          <div>
                            <h4 className="text-xs font-medium text-muted-foreground mb-2">Attached Quizzes</h4>
                            <div className="flex flex-col gap-2">
                              {Array.from({ length: mod.quizzes }, (_, i) => (
                                <div key={i} className="flex items-center justify-between rounded-lg border border-border bg-card p-3">
                                  <div className="flex items-center gap-2">
                                    <FileText className="h-4 w-4 text-primary" />
                                    <span className="text-sm text-foreground">{mod.title} - Quiz {i + 1}</span>
                                  </div>
                                  <Badge variant="secondary" className="text-[10px]">10 Questions</Badge>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </DashboardShell>
  )
}

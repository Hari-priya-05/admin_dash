"use client"

import { useState } from "react"
import { DashboardShell } from "@/components/dashboard-shell"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Progress } from "@/components/ui/progress"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table"
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select"
import { Search } from "lucide-react"

const faculties = [
  { id: 1, name: "Dr. Alan Turing", initials: "AT", email: "turing@mit.edu", department: "Computer Science", courses: 5, progress: 92, status: "Active" },
  { id: 2, name: "Dr. Nikola Tesla", initials: "NT", email: "tesla@mit.edu", department: "Electrical Engineering", courses: 4, progress: 85, status: "Active" },
  { id: 3, name: "Dr. Richard Feynman", initials: "RF", email: "feynman@stanford.edu", department: "Physics", courses: 6, progress: 78, status: "Active" },
  { id: 4, name: "Dr. Euler Newton", initials: "EN", email: "newton@harvard.edu", department: "Mathematics", courses: 3, progress: 95, status: "Active" },
  { id: 5, name: "Dr. Charles Darwin", initials: "CD", email: "darwin@yale.edu", department: "Biology", courses: 4, progress: 45, status: "On Leave" },
  { id: 6, name: "Prof. Peter Drucker", initials: "PD", email: "drucker@stanford.edu", department: "Business Administration", courses: 7, progress: 88, status: "Active" },
  { id: 7, name: "Dr. Maya Angelou", initials: "MA", email: "angelou@harvard.edu", department: "Literature", courses: 3, progress: 72, status: "Active" },
  { id: 8, name: "Dr. James Watt", initials: "JW", email: "watt@columbia.edu", department: "Mechanical Engineering", courses: 5, progress: 65, status: "Inactive" },
  { id: 9, name: "Prof. Marie Curie", initials: "MC", email: "curie@mit.edu", department: "Chemistry", courses: 4, progress: 90, status: "Active" },
  { id: 10, name: "Dr. Grace Hopper", initials: "GH", email: "hopper@yale.edu", department: "Computer Science", courses: 6, progress: 83, status: "Active" },
]

const deptOptions = ["All Departments", "Computer Science", "Electrical Engineering", "Physics", "Mathematics", "Biology", "Business Administration", "Literature", "Mechanical Engineering", "Chemistry"]

export default function FacultiesPage() {
  const [search, setSearch] = useState("")
  const [deptFilter, setDeptFilter] = useState("All Departments")

  const filtered = faculties.filter((f) => {
    const matchesSearch = f.name.toLowerCase().includes(search.toLowerCase()) || f.email.toLowerCase().includes(search.toLowerCase())
    const matchesDept = deptFilter === "All Departments" || f.department === deptFilter
    return matchesSearch && matchesDept
  })

  return (
    <DashboardShell>
      <div className="flex flex-col gap-6">
        {/* Header */}
        <div>
          <h1 className="text-2xl font-bold text-foreground">Faculties</h1>
          <p className="mt-1 text-sm text-muted-foreground">View and manage faculty members</p>
        </div>

        {/* Filters */}
        <Card className="rounded-xl border-border/60 shadow-sm">
          <CardHeader className="pb-4">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <CardTitle className="text-sm font-semibold text-foreground">Faculty Members ({filtered.length})</CardTitle>
              <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
                <Select value={deptFilter} onValueChange={setDeptFilter}>
                  <SelectTrigger className="h-9 w-[220px]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {deptOptions.map((d) => (
                      <SelectItem key={d} value={d}>{d}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <div className="relative w-full max-w-sm">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    placeholder="Search faculty..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="pl-9 h-9"
                  />
                </div>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Faculty</TableHead>
                  <TableHead>Department</TableHead>
                  <TableHead>Courses</TableHead>
                  <TableHead>Progress</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filtered.map((faculty) => (
                  <TableRow key={faculty.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar className="h-9 w-9">
                          <AvatarFallback className="bg-primary/10 text-primary text-xs font-medium">
                            {faculty.initials}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium text-foreground">{faculty.name}</p>
                          <p className="text-xs text-muted-foreground">{faculty.email}</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="secondary" className="text-xs">{faculty.department}</Badge>
                    </TableCell>
                    <TableCell className="text-muted-foreground">{faculty.courses}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-3 min-w-[140px]">
                        <Progress value={faculty.progress} className="h-2 flex-1" />
                        <span className="text-xs font-medium text-muted-foreground w-8">{faculty.progress}%</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant="outline"
                        className={
                          faculty.status === "Active"
                            ? "border-success/30 bg-success/10 text-success"
                            : faculty.status === "On Leave"
                            ? "border-warning/30 bg-warning/10 text-warning"
                            : "border-destructive/30 bg-destructive/10 text-destructive"
                        }
                      >
                        {faculty.status}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </DashboardShell>
  )
}

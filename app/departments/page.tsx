"use client"

import { useState } from "react"
import { DashboardShell } from "@/components/dashboard-shell"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table"
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter,
} from "@/components/ui/dialog"
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select"
import { Plus, Pencil, Trash2, Search } from "lucide-react"

const departments = [
  { id: 1, name: "Computer Science", college: "MIT", head: "Dr. Alan Turing", courses: 45, students: 1200, status: "Active" },
  { id: 2, name: "Electrical Engineering", college: "MIT", head: "Dr. Nikola Tesla", courses: 38, students: 980, status: "Active" },
  { id: 3, name: "Physics", college: "Stanford", head: "Dr. Richard Feynman", courses: 32, students: 850, status: "Active" },
  { id: 4, name: "Mathematics", college: "Harvard", head: "Dr. Euler Newton", courses: 28, students: 720, status: "Active" },
  { id: 5, name: "Biology", college: "Yale", head: "Dr. Charles Darwin", courses: 30, students: 680, status: "Inactive" },
  { id: 6, name: "Business Administration", college: "Stanford", head: "Dr. Peter Drucker", courses: 42, students: 1100, status: "Active" },
  { id: 7, name: "Literature", college: "Harvard", head: "Dr. Maya Angelou", courses: 22, students: 520, status: "Active" },
  { id: 8, name: "Mechanical Engineering", college: "Columbia", head: "Dr. James Watt", courses: 35, students: 900, status: "Active" },
]

const collegeOptions = ["All Colleges", "MIT", "Stanford", "Harvard", "Yale", "Columbia"]

export default function DepartmentsPage() {
  const [search, setSearch] = useState("")
  const [collegeFilter, setCollegeFilter] = useState("All Colleges")
  const [open, setOpen] = useState(false)

  const filtered = departments.filter((d) => {
    const matchesSearch = d.name.toLowerCase().includes(search.toLowerCase()) || d.head.toLowerCase().includes(search.toLowerCase())
    const matchesCollege = collegeFilter === "All Colleges" || d.college === collegeFilter
    return matchesSearch && matchesCollege
  })

  return (
    <DashboardShell>
      <div className="flex flex-col gap-6">
        {/* Header */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Departments</h1>
            <p className="mt-1 text-sm text-muted-foreground">Manage departments across all colleges</p>
          </div>
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button className="gap-2">
                <Plus className="h-4 w-4" />
                Add Department
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-lg">
              <DialogHeader>
                <DialogTitle>Add New Department</DialogTitle>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="dept-name">Department Name</Label>
                  <Input id="dept-name" placeholder="Enter department name" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="dept-college">College</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select college" />
                    </SelectTrigger>
                    <SelectContent>
                      {collegeOptions.slice(1).map((c) => (
                        <SelectItem key={c} value={c}>{c}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="dept-head">Department Head</Label>
                  <Input id="dept-head" placeholder="Name of department head" />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
                <Button onClick={() => setOpen(false)}>Save Department</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        {/* Table */}
        <Card className="rounded-xl border-border/60 shadow-sm">
          <CardHeader className="pb-4">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <CardTitle className="text-sm font-semibold text-foreground">All Departments ({filtered.length})</CardTitle>
              <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
                <Select value={collegeFilter} onValueChange={setCollegeFilter}>
                  <SelectTrigger className="h-9 w-[180px]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {collegeOptions.map((c) => (
                      <SelectItem key={c} value={c}>{c}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <div className="relative w-full max-w-sm">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    placeholder="Search departments..."
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
                  <TableHead>Department</TableHead>
                  <TableHead>College</TableHead>
                  <TableHead>Head</TableHead>
                  <TableHead>Courses</TableHead>
                  <TableHead>Students</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filtered.map((dept) => (
                  <TableRow key={dept.id}>
                    <TableCell className="font-medium text-foreground">{dept.name}</TableCell>
                    <TableCell>
                      <Badge variant="secondary" className="text-xs">{dept.college}</Badge>
                    </TableCell>
                    <TableCell className="text-muted-foreground">{dept.head}</TableCell>
                    <TableCell className="text-muted-foreground">{dept.courses}</TableCell>
                    <TableCell className="text-muted-foreground">{dept.students}</TableCell>
                    <TableCell>
                      <Badge
                        variant="outline"
                        className={
                          dept.status === "Active"
                            ? "border-success/30 bg-success/10 text-success"
                            : "border-destructive/30 bg-destructive/10 text-destructive"
                        }
                      >
                        {dept.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-1">
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-foreground">
                          <Pencil className="h-3.5 w-3.5" />
                          <span className="sr-only">Edit {dept.name}</span>
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-destructive">
                          <Trash2 className="h-3.5 w-3.5" />
                          <span className="sr-only">Delete {dept.name}</span>
                        </Button>
                      </div>
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

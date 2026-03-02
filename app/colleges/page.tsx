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

const colleges = [
  { id: 1, name: "Massachusetts Institute of Technology", code: "MIT", location: "Cambridge, MA", email: "admin@mit.edu", status: "Active", departments: 42 },
  { id: 2, name: "Stanford University", code: "SU", location: "Stanford, CA", email: "admin@stanford.edu", status: "Active", departments: 38 },
  { id: 3, name: "Harvard University", code: "HU", location: "Cambridge, MA", email: "admin@harvard.edu", status: "Active", departments: 35 },
  { id: 4, name: "Yale University", code: "YU", location: "New Haven, CT", email: "admin@yale.edu", status: "Active", departments: 30 },
  { id: 5, name: "Princeton University", code: "PU", location: "Princeton, NJ", email: "admin@princeton.edu", status: "Inactive", departments: 28 },
  { id: 6, name: "Columbia University", code: "CU", location: "New York, NY", email: "admin@columbia.edu", status: "Active", departments: 33 },
  { id: 7, name: "Duke University", code: "DU", location: "Durham, NC", email: "admin@duke.edu", status: "Active", departments: 25 },
  { id: 8, name: "University of Chicago", code: "UC", location: "Chicago, IL", email: "admin@uchicago.edu", status: "Active", departments: 22 },
]

export default function CollegesPage() {
  const [search, setSearch] = useState("")
  const [open, setOpen] = useState(false)

  const filtered = colleges.filter(
    (c) =>
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.code.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <DashboardShell>
      <div className="flex flex-col gap-6">
        {/* Header */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Colleges</h1>
            <p className="mt-1 text-sm text-muted-foreground">Manage all registered colleges</p>
          </div>
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button className="gap-2">
                <Plus className="h-4 w-4" />
                Add College
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-lg">
              <DialogHeader>
                <DialogTitle>Add New College</DialogTitle>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="name">College Name</Label>
                  <Input id="name" placeholder="Enter college name" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="code">Code</Label>
                    <Input id="code" placeholder="e.g. MIT" />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="status">Status</Label>
                    <Select defaultValue="active">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="active">Active</SelectItem>
                        <SelectItem value="inactive">Inactive</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="location">Location</Label>
                  <Input id="location" placeholder="City, State" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" placeholder="admin@college.edu" />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
                <Button onClick={() => setOpen(false)}>Save College</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        {/* Search & Filters */}
        <Card className="rounded-xl border-border/60 shadow-sm">
          <CardHeader className="pb-4">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <CardTitle className="text-sm font-semibold text-foreground">All Colleges ({filtered.length})</CardTitle>
              <div className="relative w-full max-w-sm">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Search colleges..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="pl-9 h-9"
                />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>College Name</TableHead>
                  <TableHead>Code</TableHead>
                  <TableHead>Location</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Departments</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filtered.map((college) => (
                  <TableRow key={college.id}>
                    <TableCell className="font-medium text-foreground">{college.name}</TableCell>
                    <TableCell>
                      <Badge variant="secondary" className="font-mono text-xs">{college.code}</Badge>
                    </TableCell>
                    <TableCell className="text-muted-foreground">{college.location}</TableCell>
                    <TableCell className="text-muted-foreground">{college.email}</TableCell>
                    <TableCell className="text-muted-foreground">{college.departments}</TableCell>
                    <TableCell>
                      <Badge
                        variant="outline"
                        className={
                          college.status === "Active"
                            ? "border-success/30 bg-success/10 text-success"
                            : "border-destructive/30 bg-destructive/10 text-destructive"
                        }
                      >
                        {college.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-1">
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-foreground">
                          <Pencil className="h-3.5 w-3.5" />
                          <span className="sr-only">Edit {college.name}</span>
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-destructive">
                          <Trash2 className="h-3.5 w-3.5" />
                          <span className="sr-only">Delete {college.name}</span>
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

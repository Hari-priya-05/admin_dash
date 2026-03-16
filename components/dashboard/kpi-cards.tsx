"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Building2, Network, Users, BookOpen, TrendingUp, Award, Edit2, Check, X } from "lucide-react"
import { Button } from "@/components/ui/button"

const initialStats = [
  { label: "Total Colleges", value: "24", change: "+3 this month", icon: Building2, trend: "up", editable: true },
  { label: "Total Departments", value: "186", change: "+12 this month", icon: Network, trend: "up", editable: true },
  { label: "Total Faculties", value: "1,240", change: "+45 this month", icon: Users, trend: "up", editable: false },
  { label: "Total Courses", value: "3,560", change: "+120 this month", icon: BookOpen, trend: "up", editable: false },
  { label: "Completion Rate", value: "78.5%", change: "+2.3% vs last month", icon: TrendingUp, trend: "up", editable: false },
  { label: "Avg Quiz Score", value: "72.4", change: "+1.8 vs last month", icon: Award, trend: "up", editable: false },
]

const iconBgColors = [
  "bg-primary/10 text-primary",
  "bg-chart-2/15 text-chart-2",
  "bg-chart-3/15 text-chart-3",
  "bg-chart-4/15 text-chart-4",
  "bg-success/15 text-success",
  "bg-chart-5/15 text-chart-5",
]

export function KpiCards() {
  const [stats, setStats] = useState(initialStats)
  const [editingIndex, setEditingIndex] = useState<number | null>(null)
  const [editValue, setEditValue] = useState("")

  const handleEdit = (index: number) => {
    setEditingIndex(index)
    setEditValue(stats[index].value)
  }

  const handleSave = (index: number) => {
    const newStats = [...stats]
    newStats[index].value = editValue
    setStats(newStats)
    setEditingIndex(null)
  }

  const handleCancel = () => {
    setEditingIndex(null)
  }

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
      {stats.map((stat, index) => (
        <Card key={stat.label} className="rounded-xl border-border/60 shadow-sm transition-shadow hover:shadow-md">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-xs font-medium text-muted-foreground">{stat.label}</CardTitle>
            <div className={`flex h-8 w-8 items-center justify-center rounded-lg ${iconBgColors[index]}`}>
              <stat.icon className="h-4 w-4" />
            </div>
          </CardHeader>
          <CardContent>
            {editingIndex === index && stat.editable ? (
              <div className="space-y-2">
                <Input
                  type="text"
                  value={editValue}
                  onChange={(e) => setEditValue(e.target.value)}
                  className="h-8 text-lg font-bold"
                  autoFocus
                />
                <div className="flex gap-1">
                  <Button
                    size="sm"
                    variant="default"
                    className="h-7 px-2"
                    onClick={() => handleSave(index)}
                  >
                    <Check className="h-3 w-3" />
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    className="h-7 px-2"
                    onClick={handleCancel}
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </div>
              </div>
            ) : (
              <div>
                <div className="flex items-center justify-between gap-2">
                  <div className="text-2xl font-bold text-foreground">{stat.value}</div>
                  {stat.editable && (
                    <button
                      onClick={() => handleEdit(index)}
                      className="rounded p-1 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                      aria-label="Edit value"
                    >
                      <Edit2 className="h-3 w-3" />
                    </button>
                  )}
                </div>
                <p className="mt-1 text-xs text-success">{stat.change}</p>
              </div>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

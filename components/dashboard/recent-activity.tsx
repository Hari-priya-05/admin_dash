"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"

const recentActivity = [
  { user: "Dr. Smith", initials: "DS", action: "completed Module 5 of Advanced Physics", time: "2 hours ago", type: "completion" },
  { user: "Prof. Johnson", initials: "PJ", action: "added 15 new quiz questions to Data Structures", time: "4 hours ago", type: "quiz" },
  { user: "Dr. Williams", initials: "DW", action: "enrolled 32 students in Machine Learning", time: "6 hours ago", type: "enrollment" },
  { user: "Prof. Davis", initials: "PD", action: "submitted grades for Digital Marketing", time: "8 hours ago", type: "grades" },
  { user: "Dr. Brown", initials: "DB", action: "created new course: Quantum Computing 101", time: "12 hours ago", type: "course" },
]

const typeColors: Record<string, string> = {
  completion: "bg-success/10 text-success border-success/20",
  quiz: "bg-primary/10 text-primary border-primary/20",
  enrollment: "bg-chart-2/10 text-chart-2 border-chart-2/20",
  grades: "bg-chart-3/10 text-chart-3 border-chart-3/20",
  course: "bg-chart-4/10 text-chart-4 border-chart-4/20",
}

export function RecentActivity() {
  return (
    <Card className="rounded-xl border-border/60 shadow-sm">
      <CardHeader>
        <CardTitle className="text-sm font-semibold text-foreground">Recent Activity</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-4">
          {recentActivity.map((activity, index) => (
            <div key={index} className="flex items-start gap-3">
              <Avatar className="h-8 w-8 shrink-0">
                <AvatarFallback className="bg-primary/10 text-primary text-xs font-medium">
                  {activity.initials}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <p className="text-sm text-foreground">
                  <span className="font-medium">{activity.user}</span>{" "}
                  <span className="text-muted-foreground">{activity.action}</span>
                </p>
                <div className="mt-1 flex items-center gap-2">
                  <span className="text-xs text-muted-foreground">{activity.time}</span>
                  <Badge variant="outline" className={`text-[10px] px-1.5 py-0 ${typeColors[activity.type]}`}>
                    {activity.type}
                  </Badge>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

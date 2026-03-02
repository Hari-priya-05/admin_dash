"use client"

import { DashboardShell } from "@/components/dashboard-shell"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Gamepad2, Trophy, Star, Clock, Users } from "lucide-react"

const funTasks = [
  { id: 1, title: "Code Challenge: Fibonacci", description: "Write the fastest Fibonacci function in under 5 minutes.", category: "Coding", participants: 128, timeLimit: "5 min", difficulty: "Easy", points: 50 },
  { id: 2, title: "Quiz Blitz: History of Computing", description: "Answer 20 rapid-fire questions about computing history.", category: "Quiz", participants: 95, timeLimit: "3 min", difficulty: "Medium", points: 100 },
  { id: 3, title: "Design Sprint: Landing Page", description: "Create a mock landing page wireframe in record time.", category: "Design", participants: 67, timeLimit: "15 min", difficulty: "Hard", points: 200 },
  { id: 4, title: "Memory Match: Scientific Terms", description: "Match scientific terms with their definitions in a memory game.", category: "Game", participants: 210, timeLimit: "2 min", difficulty: "Easy", points: 30 },
  { id: 5, title: "Puzzle: Algorithm Maze", description: "Navigate through a maze using only algorithm concepts.", category: "Puzzle", participants: 84, timeLimit: "10 min", difficulty: "Hard", points: 150 },
  { id: 6, title: "Speed Type: Research Paper", description: "Type a research abstract as fast as possible with accuracy.", category: "Typing", participants: 156, timeLimit: "2 min", difficulty: "Medium", points: 75 },
]

const difficultyColors: Record<string, string> = {
  Easy: "border-success/30 bg-success/10 text-success",
  Medium: "border-warning/30 bg-warning/10 text-warning-foreground",
  Hard: "border-destructive/30 bg-destructive/10 text-destructive",
}

const categoryColors: Record<string, string> = {
  Coding: "bg-primary/10 text-primary",
  Quiz: "bg-chart-2/15 text-chart-2",
  Design: "bg-chart-4/15 text-chart-4",
  Game: "bg-chart-3/15 text-chart-3",
  Puzzle: "bg-chart-5/15 text-chart-5",
  Typing: "bg-success/15 text-success",
}

export default function FunTasksPage() {
  return (
    <DashboardShell>
      <div className="flex flex-col gap-6">
        {/* Header */}
        <div>
          <h1 className="text-2xl font-bold text-foreground">Fun Tasks</h1>
          <p className="mt-1 text-sm text-muted-foreground">Engaging activities and challenges for learners</p>
        </div>

        {/* Task Cards Grid */}
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {funTasks.map((task) => (
            <Card key={task.id} className="group rounded-xl border-border/60 shadow-sm transition-all hover:shadow-md hover:border-primary/20">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-3">
                    <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${categoryColors[task.category] || "bg-primary/10 text-primary"}`}>
                      <Gamepad2 className="h-5 w-5" />
                    </div>
                    <div>
                      <CardTitle className="text-sm font-semibold text-foreground">{task.title}</CardTitle>
                      <Badge variant="secondary" className={`mt-1 text-[10px] ${categoryColors[task.category] || ""}`}>
                        {task.category}
                      </Badge>
                    </div>
                  </div>
                  <Badge variant="outline" className={difficultyColors[task.difficulty]}>
                    {task.difficulty}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-xs text-muted-foreground mb-4">{task.description}</p>
                <div className="flex items-center gap-4 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Users className="h-3.5 w-3.5" />
                    {task.participants}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="h-3.5 w-3.5" />
                    {task.timeLimit}
                  </span>
                  <span className="flex items-center gap-1">
                    <Trophy className="h-3.5 w-3.5" />
                    {task.points} pts
                  </span>
                  <span className="flex items-center gap-1">
                    <Star className="h-3.5 w-3.5" />
                    Popular
                  </span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </DashboardShell>
  )
}

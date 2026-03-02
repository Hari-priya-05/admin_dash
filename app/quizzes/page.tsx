"use client"

import { useState } from "react"
import { DashboardShell } from "@/components/dashboard-shell"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table"
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter,
} from "@/components/ui/dialog"
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select"
import { Plus, Pencil, Trash2, HelpCircle, X } from "lucide-react"

const quizzes = [
  { id: 1, title: "ML Fundamentals Quiz", course: "Intro to Machine Learning", questions: 15, passingScore: 70, attempts: 245, avgScore: 74, status: "Active" },
  { id: 2, title: "Data Structures Midterm", course: "Advanced Data Structures", questions: 20, passingScore: 65, attempts: 180, avgScore: 68, status: "Active" },
  { id: 3, title: "Quantum Mechanics Basics", course: "Quantum Physics", questions: 12, passingScore: 60, attempts: 120, avgScore: 62, status: "Active" },
  { id: 4, title: "Marketing Strategy Assessment", course: "Digital Marketing", questions: 18, passingScore: 75, attempts: 310, avgScore: 78, status: "Draft" },
  { id: 5, title: "Linear Algebra Test 1", course: "Linear Algebra", questions: 10, passingScore: 70, attempts: 195, avgScore: 71, status: "Active" },
  { id: 6, title: "Biology Final Exam", course: "Molecular Biology", questions: 25, passingScore: 65, attempts: 160, avgScore: 66, status: "Archived" },
]

interface Question {
  id: number
  text: string
  options: string[]
  correct: number
}

export default function QuizzesPage() {
  const [open, setOpen] = useState(false)
  const [questions, setQuestions] = useState<Question[]>([
    { id: 1, text: "", options: ["", "", "", ""], correct: 0 },
  ])

  const addQuestion = () => {
    setQuestions([
      ...questions,
      { id: questions.length + 1, text: "", options: ["", "", "", ""], correct: 0 },
    ])
  }

  const removeQuestion = (id: number) => {
    if (questions.length > 1) {
      setQuestions(questions.filter((q) => q.id !== id))
    }
  }

  const updateQuestion = (id: number, field: string, value: string) => {
    setQuestions(questions.map((q) => (q.id === id ? { ...q, [field]: value } : q)))
  }

  const updateOption = (qId: number, optIndex: number, value: string) => {
    setQuestions(
      questions.map((q) =>
        q.id === qId ? { ...q, options: q.options.map((o, i) => (i === optIndex ? value : o)) } : q
      )
    )
  }

  const updateCorrect = (qId: number, optIndex: number) => {
    setQuestions(questions.map((q) => (q.id === qId ? { ...q, correct: optIndex } : q)))
  }

  return (
    <DashboardShell>
      <div className="flex flex-col gap-6">
        {/* Header */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Quizzes</h1>
            <p className="mt-1 text-sm text-muted-foreground">Create and manage quizzes and assessments</p>
          </div>
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button className="gap-2">
                <Plus className="h-4 w-4" />
                Create Quiz
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-2xl max-h-[85vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Create New Quiz</DialogTitle>
              </DialogHeader>
              <div className="grid gap-6 py-4">
                {/* Quiz Details */}
                <div className="grid gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="quiz-title">Quiz Title</Label>
                    <Input id="quiz-title" placeholder="Enter quiz title" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="grid gap-2">
                      <Label>Assign to Course</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select course" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="ml">Intro to Machine Learning</SelectItem>
                          <SelectItem value="ds">Advanced Data Structures</SelectItem>
                          <SelectItem value="qp">Quantum Physics</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="passing-score">Passing Score (%)</Label>
                      <Input id="passing-score" type="number" placeholder="70" defaultValue={70} />
                    </div>
                  </div>
                </div>

                {/* Question Builder */}
                <div className="flex flex-col gap-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-semibold text-foreground">Questions ({questions.length})</h3>
                    <Button variant="outline" size="sm" onClick={addQuestion} className="gap-1 h-8 text-xs">
                      <Plus className="h-3 w-3" />
                      Add Question
                    </Button>
                  </div>

                  {questions.map((q, qIndex) => (
                    <Card key={q.id} className="rounded-xl border-border/60">
                      <CardHeader className="pb-3">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-medium text-muted-foreground">Question {qIndex + 1}</span>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-6 w-6 text-muted-foreground hover:text-destructive"
                            onClick={() => removeQuestion(q.id)}
                          >
                            <X className="h-3 w-3" />
                          </Button>
                        </div>
                        <Input
                          placeholder="Enter your question..."
                          value={q.text}
                          onChange={(e) => updateQuestion(q.id, "text", e.target.value)}
                        />
                      </CardHeader>
                      <CardContent>
                        <RadioGroup
                          value={String(q.correct)}
                          onValueChange={(val) => updateCorrect(q.id, Number(val))}
                        >
                          <div className="grid gap-2">
                            {q.options.map((opt, i) => (
                              <div key={i} className="flex items-center gap-3">
                                <RadioGroupItem value={String(i)} id={`q${q.id}-opt${i}`} />
                                <Input
                                  placeholder={`Option ${String.fromCharCode(65 + i)}`}
                                  value={opt}
                                  onChange={(e) => updateOption(q.id, i, e.target.value)}
                                  className="flex-1"
                                />
                              </div>
                            ))}
                          </div>
                        </RadioGroup>
                        <p className="mt-2 text-[10px] text-muted-foreground">Select the radio button next to the correct answer</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
                <Button onClick={() => setOpen(false)}>Save Quiz</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        {/* Quiz List Table */}
        <Card className="rounded-xl border-border/60 shadow-sm">
          <CardHeader>
            <CardTitle className="text-sm font-semibold text-foreground">All Quizzes ({quizzes.length})</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Quiz</TableHead>
                  <TableHead>Course</TableHead>
                  <TableHead>Questions</TableHead>
                  <TableHead>Passing Score</TableHead>
                  <TableHead>Attempts</TableHead>
                  <TableHead>Avg Score</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {quizzes.map((quiz) => (
                  <TableRow key={quiz.id}>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10">
                          <HelpCircle className="h-4 w-4 text-primary" />
                        </div>
                        <span className="font-medium text-foreground">{quiz.title}</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-muted-foreground">{quiz.course}</TableCell>
                    <TableCell className="text-muted-foreground">{quiz.questions}</TableCell>
                    <TableCell className="text-muted-foreground">{quiz.passingScore}%</TableCell>
                    <TableCell className="text-muted-foreground">{quiz.attempts}</TableCell>
                    <TableCell>
                      <span className={quiz.avgScore >= quiz.passingScore ? "text-success font-medium" : "text-destructive font-medium"}>
                        {quiz.avgScore}%
                      </span>
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant="outline"
                        className={
                          quiz.status === "Active"
                            ? "border-success/30 bg-success/10 text-success"
                            : quiz.status === "Draft"
                            ? "border-warning/30 bg-warning/10 text-warning-foreground"
                            : "border-muted-foreground/30 bg-muted text-muted-foreground"
                        }
                      >
                        {quiz.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-1">
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-foreground">
                          <Pencil className="h-3.5 w-3.5" />
                          <span className="sr-only">Edit {quiz.title}</span>
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-destructive">
                          <Trash2 className="h-3.5 w-3.5" />
                          <span className="sr-only">Delete {quiz.title}</span>
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

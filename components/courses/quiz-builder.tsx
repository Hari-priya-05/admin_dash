"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Plus, Trash2, Upload, X } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

interface QuizQuestion {
  id: string
  question: string
  imageUrl?: string
  options: string[]
  correctAnswer: number
}

interface Quiz {
  id: string
  title: string
  questions: QuizQuestion[]
  passingScore?: number
}

interface QuizBuilderProps {
  quiz?: Quiz
  onSave?: (quiz: Quiz) => void
  isModuleQuiz?: boolean
}

export function QuizBuilder({ quiz, onSave, isModuleQuiz = false }: QuizBuilderProps) {
  const [currentQuiz, setCurrentQuiz] = useState<Quiz>(
    quiz || {
      id: `quiz-${Date.now()}`,
      title: isModuleQuiz ? "Module Quiz" : "Final Course Quiz",
      questions: [],
      passingScore: 70,
    }
  )

  const [isAddingQuestion, setIsAddingQuestion] = useState(false)
  const [editingQuestionId, setEditingQuestionId] = useState<string | null>(null)
  const [editingQuestion, setEditingQuestion] = useState<QuizQuestion>({
    id: "",
    question: "",
    options: ["", "", "", ""],
    correctAnswer: 0,
  })

  const handleAddQuestion = () => {
    const newQuestion: QuizQuestion = {
      id: `question-${Date.now()}`,
      question: "",
      options: ["", "", "", ""],
      correctAnswer: 0,
    }
    setEditingQuestion(newQuestion)
    setEditingQuestionId(newQuestion.id)
    setIsAddingQuestion(true)
  }

  const handleSaveQuestion = () => {
    if (!editingQuestion.question.trim()) {
      alert("Please enter a question")
      return
    }
    if (editingQuestion.options.some((opt) => !opt.trim())) {
      alert("Please fill in all options")
      return
    }

    const existingIndex = currentQuiz.questions.findIndex((q) => q.id === editingQuestion.id)
    let updatedQuestions = [...currentQuiz.questions]

    if (existingIndex > -1) {
      updatedQuestions[existingIndex] = editingQuestion
    } else {
      updatedQuestions.push(editingQuestion)
    }

    setCurrentQuiz({ ...currentQuiz, questions: updatedQuestions })
    setIsAddingQuestion(false)
    setEditingQuestionId(null)
  }

  const handleDeleteQuestion = (questionId: string) => {
    setCurrentQuiz({
      ...currentQuiz,
      questions: currentQuiz.questions.filter((q) => q.id !== questionId),
    })
  }

  const handleEditQuestion = (question: QuizQuestion) => {
    setEditingQuestion({ ...question })
    setEditingQuestionId(question.id)
    setIsAddingQuestion(true)
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (event) => {
        setEditingQuestion({
          ...editingQuestion,
          imageUrl: event.target?.result as string,
        })
      }
      reader.readAsDataURL(file)
    }
  }

  return (
    <div className="space-y-6">
      {/* Quiz Header */}
      <Card className="border-border/60">
        <CardHeader>
          <CardTitle>Quiz Configuration</CardTitle>
          <CardDescription>{isModuleQuiz ? "Module Quiz" : "Final Course Quiz"}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Quiz Title */}
          <div className="space-y-2">
            <Label htmlFor="quiz-title" className="text-sm font-medium">
              Quiz Title
            </Label>
            <Input
              id="quiz-title"
              value={currentQuiz.title}
              onChange={(e) => setCurrentQuiz({ ...currentQuiz, title: e.target.value })}
              placeholder="Enter quiz title"
              className="h-10"
            />
          </div>

          {/* Passing Score */}
          <div className="space-y-2">
            <Label htmlFor="passing-score" className="text-sm font-medium">
              Passing Score (%)
            </Label>
            <Input
              id="passing-score"
              type="number"
              min="0"
              max="100"
              value={currentQuiz.passingScore || 70}
              onChange={(e) =>
                setCurrentQuiz({
                  ...currentQuiz,
                  passingScore: parseInt(e.target.value) || 70,
                })
              }
              className="h-10"
            />
          </div>
        </CardContent>
      </Card>

      {/* Questions Section */}
      <Card className="border-border/60">
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Questions</CardTitle>
            <CardDescription>{currentQuiz.questions.length} question(s) added</CardDescription>
          </div>
          <Button onClick={handleAddQuestion} size="sm" className="gap-2">
            <Plus className="h-4 w-4" />
            Add Question
          </Button>
        </CardHeader>
        <CardContent className="space-y-3">
          {currentQuiz.questions.length === 0 ? (
            <div className="flex flex-col items-center justify-center rounded-lg border-2 border-dashed border-border/50 py-12 text-center">
              <p className="text-sm text-muted-foreground">No questions yet</p>
              <p className="text-xs text-muted-foreground/60">Click "Add Question" to create your first question</p>
            </div>
          ) : (
            <div className="space-y-2">
              {currentQuiz.questions.map((question, index) => (
                <div
                  key={question.id}
                  className="flex items-center justify-between rounded-lg border border-border/50 p-4 hover:bg-muted/30"
                >
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium">Q{index + 1}: {question.question.substring(0, 50)}...</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      {question.options.length} options
                      {question.imageUrl && " • Has image"}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleEditQuestion(question)}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDeleteQuestion(question.id)}
                      className="text-destructive hover:text-destructive"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Question Editor Dialog */}
      <Dialog open={isAddingQuestion} onOpenChange={setIsAddingQuestion}>
        <DialogContent className="sm:max-w-2xl">
          <DialogHeader>
            <DialogTitle>
              {editingQuestionId && currentQuiz.questions.some((q) => q.id === editingQuestionId)
                ? "Edit Question"
                : "Add Question"}
            </DialogTitle>
            <DialogDescription>Add or edit a quiz question with options and image support</DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            {/* Question Text */}
            <div className="space-y-2">
              <Label htmlFor="question-text" className="text-sm font-medium">
                Question Text
              </Label>
              <Textarea
                id="question-text"
                value={editingQuestion.question}
                onChange={(e) => setEditingQuestion({ ...editingQuestion, question: e.target.value })}
                placeholder="Enter your question"
                rows={3}
                className="resize-none"
              />
            </div>

            {/* Image Upload */}
            <div className="space-y-2">
              <Label className="text-sm font-medium">Question Image (Optional)</Label>
              <div className="flex items-center gap-3">
                <label className="flex items-center gap-2 rounded-lg border border-dashed border-border px-3 py-2 cursor-pointer hover:bg-muted/30">
                  <Upload className="h-4 w-4" />
                  <span className="text-sm">Upload Image</span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                </label>
                {editingQuestion.imageUrl && (
                  <button
                    onClick={() => setEditingQuestion({ ...editingQuestion, imageUrl: undefined })}
                    className="rounded p-1 text-destructive hover:bg-destructive/10"
                  >
                    <X className="h-4 w-4" />
                  </button>
                )}
              </div>
              {editingQuestion.imageUrl && (
                <div className="relative w-full h-40 rounded-lg overflow-hidden border border-border/50">
                  <img
                    src={editingQuestion.imageUrl}
                    alt="Question"
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
            </div>

            {/* Options */}
            <div className="space-y-3">
              <Label className="text-sm font-medium">Answer Options</Label>
              <div className="space-y-2">
                {editingQuestion.options.map((option, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="correct-answer"
                      checked={editingQuestion.correctAnswer === index}
                      onChange={() => setEditingQuestion({ ...editingQuestion, correctAnswer: index })}
                      className="h-4 w-4"
                    />
                    <Input
                      value={option}
                      onChange={(e) => {
                        const newOptions = [...editingQuestion.options]
                        newOptions[index] = e.target.value
                        setEditingQuestion({ ...editingQuestion, options: newOptions })
                      }}
                      placeholder={`Option ${index + 1}`}
                      className="flex-1"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Buttons */}
            <div className="flex gap-2 justify-end pt-4">
              <Button variant="outline" onClick={() => setIsAddingQuestion(false)}>
                Cancel
              </Button>
              <Button onClick={handleSaveQuestion}>
                {editingQuestionId && currentQuiz.questions.some((q) => q.id === editingQuestionId)
                  ? "Save Changes"
                  : "Add Question"}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Save Button */}
      <div className="flex justify-end gap-3">
        <Button variant="outline" onClick={() => {
          // Reset form or close dialog
        }}>
          Cancel
        </Button>
        <Button onClick={() => onSave?.(currentQuiz)} className="gap-2">
          Save Quiz
        </Button>
      </div>
    </div>
  )
}

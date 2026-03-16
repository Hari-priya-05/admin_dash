"use client"

import { useState } from "react"
import { CourseBuilder } from "./course-builder"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

interface Module {
  id: string
  name: string
  description: string
  videos: Video[]
  quizzes: Quiz[]
}

interface Video {
  id: string
  name: string
  url: string
  funTaskId?: string
}

interface Quiz {
  id: string
  title: string
  questions: QuizQuestion[]
}

interface QuizQuestion {
  id: string
  question: string
  imageUrl?: string
  options: string[]
  correctAnswer: number
}

interface Course {
  id: string
  name: string
  description: string
  instructions: string
  duration?: string
  department?: string
  termsAccepted: boolean
  modules: Module[]
  finalQuiz?: Quiz
  passingScore: number
}

interface CourseBuilderModalProps {
  isOpen: boolean
  onOpenChange: (open: boolean) => void
  onSave: (course: Course) => void
  editingCourse?: Course
  editingId?: string | null
}

export function CourseBuilderModal({
  isOpen,
  onOpenChange,
  onSave,
  editingCourse,
  editingId,
}: CourseBuilderModalProps) {
  const handleClose = () => {
    onOpenChange(false)
  }

  const handleSave = (course: Course) => {
    onSave(course)
    handleClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center gap-3">
            {editingId && <Badge variant="outline">Editing</Badge>}
            <div>
              <DialogTitle>
                {editingId ? "Edit Course" : "Create New Course"}
              </DialogTitle>
              <DialogDescription className="mt-1">
                Build your course with modules, videos, tasks, and department assignment
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <div className="mt-6">
          <CourseBuilder
            courseId={editingId || undefined}
            initialCourse={editingCourse}
            onSave={handleSave}
          />
        </div>

        <div className="flex justify-end gap-2 mt-6 border-t pt-4">
          <Button variant="outline" onClick={handleClose}>
            Cancel
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { Plus, ChevronDown, ChevronUp, Trash2, Edit2, GripVertical } from "lucide-react"
import { ModuleSection } from "./module-section"
import { QuizBuilder } from "./quiz-builder"
import { Combobox, type ComboboxOption } from "@/components/ui/combobox"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
} from "@dnd-kit/core"
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"

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
  departments?: string[]
  termsAccepted: boolean
  modules: Module[]
  finalQuiz?: Quiz
  passingScore: number
}

interface CourseBuilderProps {
  courseId?: string
  initialCourse?: Course
  onSave?: (course: Course) => void
}

const mockFunTasks = [
  { id: "1", name: "Quiz 1: Basics" },
  { id: "2", name: "Assignment 1: Coding Challenge" },
  { id: "3", name: "Project: Build App" },
  { id: "4", name: "Quiz 2: Advanced Topics" },
]

const departmentOptions: ComboboxOption[] = [
  { value: "computer-science", label: "Computer Science" },
  { value: "data-science", label: "Data Science" },
  { value: "engineering", label: "Engineering" },
  { value: "business", label: "Business" },
  { value: "medicine", label: "Medicine" },
  { value: "arts", label: "Arts" },
]

interface SortableModuleItemProps {
  module: Module
  isExpanded: boolean
  onToggleExpand: () => void
  onDelete: () => void
  onUpdate: (updated: Module) => void
  funTasks: Array<{ id: string; name: string }>
}

function SortableModuleItem({
  module,
  isExpanded,
  onToggleExpand,
  onDelete,
  onUpdate,
  funTasks,
}: SortableModuleItemProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: module.id })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  }

  return (
    <div ref={setNodeRef} style={style} className="space-y-2">
      <div
        className="flex items-center justify-between rounded-lg border border-border/50 p-4 hover:bg-muted/30 transition-colors"
      >
        <div className="flex items-center gap-3 flex-1 min-w-0">
          <button
            className="cursor-grab active:cursor-grabbing p-1 rounded hover:bg-muted"
            {...attributes}
            {...listeners}
          >
            <GripVertical className="h-5 w-5 text-muted-foreground" />
          </button>
          <button
            onClick={onToggleExpand}
            className="flex items-center gap-3 flex-1 min-w-0"
          >
            {isExpanded ? (
              <ChevronUp className="h-5 w-5 shrink-0 text-muted-foreground" />
            ) : (
              <ChevronDown className="h-5 w-5 shrink-0 text-muted-foreground" />
            )}
            <span className="text-sm font-medium truncate">
              {module.name || "Untitled Module"}
            </span>
            <span className="text-xs text-muted-foreground ml-auto shrink-0">
              {module.videos.length} video{module.videos.length !== 1 ? "s" : ""}
            </span>
          </button>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={onDelete}
          className="text-destructive hover:text-destructive"
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>

      {/* Expanded Module Content */}
      {isExpanded && (
        <ModuleSection
          module={module}
          onUpdate={onUpdate}
          funTasks={funTasks}
        />
      )}
    </div>
  )
}

export function CourseBuilder({ courseId, initialCourse, onSave }: CourseBuilderProps) {
  const [course, setCourse] = useState<Course>(
    initialCourse || {
      id: courseId || `course-${Date.now()}`,
      name: "",
      description: "",
      instructions: "",
      duration: "",
      departments: [],
      termsAccepted: false,
      modules: [],
      passingScore: 70,
    }
  )

  const [expandedModules, setExpandedModules] = useState<Set<string>>(new Set())
  const [isFinalQuizDialogOpen, setIsFinalQuizDialogOpen] = useState(false)

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  )

  const handleModuleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event

    if (over && active.id !== over.id) {
      const oldIndex = course.modules.findIndex((m) => m.id === active.id)
      const newIndex = course.modules.findIndex((m) => m.id === over.id)

      setCourse({
        ...course,
        modules: arrayMove(course.modules, oldIndex, newIndex),
      })
    }
  }

  const handleAddModule = () => {
    const newModule: Module = {
      id: `module-${Date.now()}`,
      name: "",
      videos: [],
    }
    setCourse({
      ...course,
      modules: [...course.modules, newModule],
    })
  }

  const handleDeleteModule = (moduleId: string) => {
    setCourse({
      ...course,
      modules: course.modules.filter((m) => m.id !== moduleId),
    })
  }

  const handleUpdateModule = (moduleId: string, updatedModule: Module) => {
    setCourse({
      ...course,
      modules: course.modules.map((m) => (m.id === moduleId ? updatedModule : m)),
    })
  }

  const toggleModuleExpand = (moduleId: string) => {
    const newExpanded = new Set(expandedModules)
    if (newExpanded.has(moduleId)) {
      newExpanded.delete(moduleId)
    } else {
      newExpanded.add(moduleId)
    }
    setExpandedModules(newExpanded)
  }

  const handleSave = () => {
    if (!course.name.trim()) {
      alert("Please enter a course name")
      return
    }
    if (!course.termsAccepted) {
      alert("Please accept the terms and conditions")
      return
    }
    onSave?.(course)
  }

  return (
    <div className="space-y-6">
      {/* Course Information Card */}
      <Card className="border-border/60">
        <CardHeader>
          <CardTitle>Course Information</CardTitle>
          <CardDescription>Basic course details and requirements</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Course Name */}
          <div className="space-y-2">
            <Label htmlFor="course-name" className="text-sm font-medium">
              Course Name
            </Label>
            <Input
              id="course-name"
              placeholder="Enter course name"
              value={course.name}
              onChange={(e) => setCourse({ ...course, name: e.target.value })}
              className="h-10"
            />
          </div>

          {/* Course Description */}
          <div className="space-y-2">
            <Label htmlFor="description" className="text-sm font-medium">
              Course Description
            </Label>
            <Textarea
              id="description"
              placeholder="Enter a brief description of the course..."
              value={course.description}
              onChange={(e) => setCourse({ ...course, description: e.target.value })}
              rows={2}
              className="resize-none"
            />
          </div>

          {/* Course Duration */}
          <div className="space-y-2">
            <Label htmlFor="duration" className="text-sm font-medium">
              Course Duration (Optional)
            </Label>
            <Input
              id="duration"
              placeholder="e.g., 8 weeks, 6 months, 12 weeks"
              value={course.duration}
              onChange={(e) => setCourse({ ...course, duration: e.target.value })}
              className="h-10"
            />
            <p className="text-xs text-muted-foreground">Specify the expected duration for completing this course</p>
          </div>

          {/* Department Assignment */}
          <div className="space-y-2">
            <Label htmlFor="department" className="text-sm font-medium">
              Assign Departments (Optional)
            </Label>
            <Combobox
              options={departmentOptions}
              value={course.departments || []}
              onValueChange={(value) => setCourse({ ...course, departments: value as string[] })}
              placeholder="Select departments..."
              searchPlaceholder="Search departments..."
              multiple={true}
            />
            {course.departments && course.departments.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-2">
                {course.departments.map((dept) => {
                  const deptLabel = departmentOptions.find((opt) => opt.value === dept)?.label
                  return (
                    <div
                      key={dept}
                      className="inline-flex items-center gap-2 rounded-full bg-muted px-3 py-1 text-xs font-medium text-foreground"
                    >
                      {deptLabel}
                      <button
                        onClick={() =>
                          setCourse({
                            ...course,
                            departments: (course.departments || []).filter((d) => d !== dept),
                          })
                        }
                        className="ml-1 text-muted-foreground hover:text-foreground"
                      >
                        ✕
                      </button>
                    </div>
                  )
                })}
              </div>
            )}
            <p className="text-xs text-muted-foreground">Faculty from these departments can be assigned to the course</p>
          </div>

          {/* Passing Score */}
          <div className="space-y-2">
            <Label htmlFor="passing-score" className="text-sm font-medium">
              Passing Score for Certificate (%)
            </Label>
            <Input
              id="passing-score"
              type="number"
              min="0"
              max="100"
              value={course.passingScore}
              onChange={(e) => setCourse({ ...course, passingScore: parseInt(e.target.value) || 70 })}
              className="h-10"
            />
          </div>

          {/* Instructions */}
          <div className="space-y-2">
            <Label htmlFor="instructions" className="text-sm font-medium">
              Course Instructions & Requirements
            </Label>
            <Textarea
              id="instructions"
              placeholder="Enter instructions for students attending this course..."
              value={course.instructions}
              onChange={(e) => setCourse({ ...course, instructions: e.target.value })}
              rows={4}
              className="resize-none"
            />
          </div>

          {/* Terms and Conditions */}
          <div className="flex items-center gap-3 rounded-lg border border-border/50 p-4">
            <Checkbox
              id="terms"
              checked={course.termsAccepted}
              onCheckedChange={(checked) =>
                setCourse({ ...course, termsAccepted: checked as boolean })
              }
              className="h-5 w-5"
            />
            <Label htmlFor="terms" className="flex-1 cursor-pointer text-sm font-medium">
              I agree to the terms and conditions for this course
            </Label>
          </div>
        </CardContent>
      </Card>

      {/* Modules Section */}
      <Card className="border-border/60">
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Modules</CardTitle>
            <CardDescription>Create modules and add videos with tasks</CardDescription>
          </div>
          <Button onClick={handleAddModule} size="sm" className="gap-2">
            <Plus className="h-4 w-4" />
            Add Module
          </Button>
        </CardHeader>
        <CardContent className="space-y-3">
          {course.modules.length === 0 ? (
            <div className="flex flex-col items-center justify-center rounded-lg border-2 border-dashed border-border/50 py-12 text-center">
              <p className="text-sm text-muted-foreground">No modules yet</p>
              <p className="text-xs text-muted-foreground/60">Click "Add Module" to create your first module</p>
            </div>
          ) : (
            <DndContext
              sensors={sensors}
              collisionDetection={closestCenter}
              onDragEnd={handleModuleDragEnd}
            >
              <SortableContext
                items={course.modules.map((m) => m.id)}
                strategy={verticalListSortingStrategy}
              >
                {course.modules.map((module) => (
                  <SortableModuleItem
                    key={module.id}
                    module={module}
                    isExpanded={expandedModules.has(module.id)}
                    onToggleExpand={() => toggleModuleExpand(module.id)}
                    onDelete={() => handleDeleteModule(module.id)}
                    onUpdate={(updated) => handleUpdateModule(module.id, updated)}
                    funTasks={mockFunTasks}
                  />
                ))}
              </SortableContext>
            </DndContext>
          )}
        </CardContent>
      </Card>

      {/* Final Quiz Section */}
      <Card className="border-border/60">
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Final Course Quiz</CardTitle>
            <CardDescription>Create a final quiz at the end of the course</CardDescription>
          </div>
          {!course.finalQuiz && (
            <Button 
              onClick={() => {
                setCourse({
                  ...course,
                  finalQuiz: {
                    id: `final-quiz-${Date.now()}`,
                    title: "Final Exam",
                    questions: [],
                    passingScore: 70
                  }
                })
                setIsFinalQuizDialogOpen(true)
              }} 
              size="sm" 
              variant="outline"
              className="gap-2"
            >
              <Plus className="h-4 w-4" />
              Create Final Quiz
            </Button>
          )}
        </CardHeader>
        <CardContent>
          {!course.finalQuiz ? (
            <div className="flex flex-col items-center justify-center rounded-lg border-2 border-dashed border-border/50 py-12 text-center">
              <p className="text-sm text-muted-foreground">No final quiz yet</p>
              <p className="text-xs text-muted-foreground/60">Click "Create Final Quiz" to add a comprehensive final exam</p>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="rounded-lg border border-border/30 bg-white dark:bg-slate-950 p-4">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <p className="text-sm font-medium">{course.finalQuiz.title}</p>
                    <p className="text-xs text-muted-foreground">{course.finalQuiz.questions.length} questions</p>
                  </div>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => setIsFinalQuizDialogOpen(true)}
                    className="gap-1"
                  >
                    <Edit2 className="h-3.5 w-3.5" />
                    Edit
                  </Button>
                </div>
              </div>

              <Button
                variant="ghost"
                size="sm"
                className="text-destructive hover:text-destructive"
                onClick={() => setCourse({ ...course, finalQuiz: undefined })}
              >
                <Trash2 className="h-4 w-4 mr-1" />
                Remove Final Quiz
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Final Quiz Dialog */}
      <Dialog open={isFinalQuizDialogOpen} onOpenChange={setIsFinalQuizDialogOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Final Course Quiz Builder</DialogTitle>
            <DialogDescription>Create and manage final exam questions with options and images</DialogDescription>
          </DialogHeader>
          {course.finalQuiz && (
            <QuizBuilder
              quiz={course.finalQuiz}
              onSave={(savedQuiz) => {
                setCourse({ ...course, finalQuiz: savedQuiz })
                setIsFinalQuizDialogOpen(false)
              }}
              isModuleQuiz={false}
            />
          )}
        </DialogContent>
      </Dialog>

      {/* Save Button */}
      <div className="flex justify-end gap-3">
        <Button variant="outline">Cancel</Button>
        <Button onClick={handleSave} className="gap-2">
          Save Course
        </Button>
      </div>
    </div>
  )
}

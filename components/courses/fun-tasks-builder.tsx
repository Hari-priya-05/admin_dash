"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Plus, Trash2, Eye, EyeOff } from "lucide-react"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

type ActivityType = "mini-quiz" | "feedback" | "puzzle" | "audio-listening" | "unique-activity" | "mini-code"

interface FunTask {
  id: string
  title: string
  type: ActivityType
  description: string
  data: Record<string, any>
}

interface FunTasksBuilderProps {
  existingTasks?: FunTask[]
  onSave?: (tasks: FunTask[]) => void
}

const ACTIVITY_TYPES: { value: ActivityType; label: string; description: string }[] = [
  { value: "mini-quiz", label: "Mini Quiz", description: "Short quiz with multiple choice questions" },
  { value: "feedback", label: "Feedback", description: "Student feedback form with rating and comments" },
  { value: "puzzle", label: "Puzzle", description: "Logic puzzle or word puzzle activity" },
  { value: "audio-listening", label: "Audio Listening", description: "Listen to audio and answer questions" },
  { value: "unique-activity", label: "Unique Activity", description: "Custom interactive activity" },
  { value: "mini-code", label: "Mini Code", description: "Small coding challenge or task" },
]

// Mini Quiz Component
function MiniQuizBuilder({ data, onChange }: { data: any; onChange: (data: any) => void }) {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label className="text-sm font-medium">Questions (one per line)</Label>
        <Textarea
          value={data?.questions?.join("\n") || ""}
          onChange={(e) => onChange({ ...data, questions: e.target.value.split("\n").filter(Boolean) })}
          placeholder="Question 1&#10;Question 2&#10;Question 3"
          rows={3}
          className="resize-none"
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="difficulty" className="text-sm font-medium">Difficulty</Label>
        <Select value={data?.difficulty || "medium"} onValueChange={(val) => onChange({ ...data, difficulty: val })}>
          <SelectTrigger id="difficulty">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="easy">Easy</SelectItem>
            <SelectItem value="medium">Medium</SelectItem>
            <SelectItem value="hard">Hard</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  )
}

// Feedback Component
function FeedbackBuilder({ data, onChange }: { data: any; onChange: (data: any) => void }) {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="feedback-type" className="text-sm font-medium">Feedback Type</Label>
        <Select value={data?.feedbackType || "rating"} onValueChange={(val) => onChange({ ...data, feedbackType: val })}>
          <SelectTrigger id="feedback-type">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="rating">Rating</SelectItem>
            <SelectItem value="comment">Comment</SelectItem>
            <SelectItem value="both">Both</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="space-y-2">
        <Label className="text-sm font-medium">Questions (one per line)</Label>
        <Textarea
          value={data?.questions?.join("\n") || ""}
          onChange={(e) => onChange({ ...data, questions: e.target.value.split("\n").filter(Boolean) })}
          placeholder="How helpful was this lesson?&#10;What could be improved?"
          rows={3}
          className="resize-none"
        />
      </div>
    </div>
  )
}

// Puzzle Component
function PuzzleBuilder({ data, onChange }: { data: any; onChange: (data: any) => void }) {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="puzzle-type" className="text-sm font-medium">Puzzle Type</Label>
        <Select value={data?.puzzleType || "logic"} onValueChange={(val) => onChange({ ...data, puzzleType: val })}>
          <SelectTrigger id="puzzle-type">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="logic">Logic Puzzle</SelectItem>
            <SelectItem value="word">Word Puzzle</SelectItem>
            <SelectItem value="pattern">Pattern Match</SelectItem>
            <SelectItem value="memory">Memory Game</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="space-y-2">
        <Label className="text-sm font-medium">Puzzle Content</Label>
        <Textarea
          value={data?.content || ""}
          onChange={(e) => onChange({ ...data, content: e.target.value })}
          placeholder="Describe the puzzle here..."
          rows={4}
          className="resize-none"
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="time-limit" className="text-sm font-medium">Time Limit (minutes)</Label>
        <Input
          id="time-limit"
          type="number"
          min="1"
          value={data?.timeLimit || 10}
          onChange={(e) => onChange({ ...data, timeLimit: parseInt(e.target.value) })}
        />
      </div>
    </div>
  )
}

// Audio Listening Component
function AudioListeningBuilder({ data, onChange }: { data: any; onChange: (data: any) => void }) {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="audio-url" className="text-sm font-medium">Audio URL</Label>
        <Input
          id="audio-url"
          type="url"
          value={data?.audioUrl || ""}
          onChange={(e) => onChange({ ...data, audioUrl: e.target.value })}
          placeholder="https://example.com/audio.mp3"
        />
      </div>
      <div className="space-y-2">
        <Label className="text-sm font-medium">Questions (one per line)</Label>
        <Textarea
          value={data?.questions?.join("\n") || ""}
          onChange={(e) => onChange({ ...data, questions: e.target.value.split("\n").filter(Boolean) })}
          placeholder="Question 1&#10;Question 2&#10;Question 3"
          rows={3}
          className="resize-none"
        />
      </div>
      <div className="space-y-2">
        <Label className="text-sm font-medium">Playback Options</Label>
        <div className="space-y-2">
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={data?.allowPlaybackControl !== false}
              onChange={(e) => onChange({ ...data, allowPlaybackControl: e.target.checked })}
              className="h-4 w-4"
            />
            <span className="text-sm">Allow playback controls</span>
          </label>
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={data?.showTranscript}
              onChange={(e) => onChange({ ...data, showTranscript: e.target.checked })}
              className="h-4 w-4"
            />
            <span className="text-sm">Show transcript</span>
          </label>
        </div>
      </div>
    </div>
  )
}

// Unique Activity Component
function UniqueActivityBuilder({ data, onChange }: { data: any; onChange: (data: any) => void }) {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="activity-name" className="text-sm font-medium">Activity Name</Label>
        <Input
          id="activity-name"
          value={data?.activityName || ""}
          onChange={(e) => onChange({ ...data, activityName: e.target.value })}
          placeholder="e.g., Group Discussion, Project Work"
        />
      </div>
      <div className="space-y-2">
        <Label className="text-sm font-medium">Detailed Instructions</Label>
        <Textarea
          value={data?.instructions || ""}
          onChange={(e) => onChange({ ...data, instructions: e.target.value })}
          placeholder="Provide detailed instructions for this activity..."
          rows={5}
          className="resize-none"
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="duration" className="text-sm font-medium">Estimated Duration (minutes)</Label>
        <Input
          id="duration"
          type="number"
          min="1"
          value={data?.duration || 30}
          onChange={(e) => onChange({ ...data, duration: parseInt(e.target.value) })}
        />
      </div>
    </div>
  )
}

// Mini Code Component
function MiniCodeBuilder({ data, onChange }: { data: any; onChange: (data: any) => void }) {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="language" className="text-sm font-medium">Programming Language</Label>
        <Select value={data?.language || "javascript"} onValueChange={(val) => onChange({ ...data, language: val })}>
          <SelectTrigger id="language">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="javascript">JavaScript</SelectItem>
            <SelectItem value="python">Python</SelectItem>
            <SelectItem value="java">Java</SelectItem>
            <SelectItem value="cpp">C++</SelectItem>
            <SelectItem value="html">HTML/CSS</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="space-y-2">
        <Label className="text-sm font-medium">Problem Description</Label>
        <Textarea
          value={data?.problemDescription || ""}
          onChange={(e) => onChange({ ...data, problemDescription: e.target.value })}
          placeholder="Describe the coding challenge here..."
          rows={4}
          className="resize-none"
        />
      </div>
      <div className="space-y-2">
        <Label className="text-sm font-medium">Starter Code</Label>
        <Textarea
          value={data?.starterCode || ""}
          onChange={(e) => onChange({ ...data, starterCode: e.target.value })}
          placeholder="// Optional: Provide starter code"
          rows={3}
          className="resize-none font-mono text-xs"
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="difficulty" className="text-sm font-medium">Difficulty</Label>
        <Select value={data?.difficulty || "medium"} onValueChange={(val) => onChange({ ...data, difficulty: val })}>
          <SelectTrigger id="difficulty">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="easy">Easy</SelectItem>
            <SelectItem value="medium">Medium</SelectItem>
            <SelectItem value="hard">Hard</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  )
}

// Activity Type Renderer
function ActivityConfigComponent({ type, data, onChange }: { type: ActivityType; data: any; onChange: (data: any) => void }) {
  switch (type) {
    case "mini-quiz":
      return <MiniQuizBuilder data={data} onChange={onChange} />
    case "feedback":
      return <FeedbackBuilder data={data} onChange={onChange} />
    case "puzzle":
      return <PuzzleBuilder data={data} onChange={onChange} />
    case "audio-listening":
      return <AudioListeningBuilder data={data} onChange={onChange} />
    case "unique-activity":
      return <UniqueActivityBuilder data={data} onChange={onChange} />
    case "mini-code":
      return <MiniCodeBuilder data={data} onChange={onChange} />
    default:
      return null
  }
}

export function FunTasksBuilder({ existingTasks = [], onSave }: FunTasksBuilderProps) {
  const [tasks, setTasks] = useState<FunTask[]>(existingTasks)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [selectedType, setSelectedType] = useState<ActivityType>("mini-quiz")
  const [taskData, setTaskData] = useState<Record<string, any>>({})
  const [taskTitle, setTaskTitle] = useState("")

  const handleAddTask = () => {
    if (!taskTitle.trim()) {
      alert("Please enter a task title")
      return
    }

    const newTask: FunTask = {
      id: `task-${Date.now()}`,
      title: taskTitle,
      type: selectedType,
      description: ACTIVITY_TYPES.find((t) => t.value === selectedType)?.description || "",
      data: taskData,
    }

    setTasks([...tasks, newTask])
    setIsDialogOpen(false)
    setTaskTitle("")
    setTaskData({})
    setSelectedType("mini-quiz")
  }

  const handleDeleteTask = (taskId: string) => {
    setTasks(tasks.filter((t) => t.id !== taskId))
  }

  return (
    <div className="space-y-6">
      <Card className="border-border/60">
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Fun Tasks</CardTitle>
            <CardDescription>Create and manage learning activities</CardDescription>
          </div>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button size="sm" className="gap-2">
                <Plus className="h-4 w-4" />
                Add Task
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-2xl">
              <DialogHeader>
                <DialogTitle>Create New Fun Task</DialogTitle>
                <DialogDescription>Add a new activity type to engage students</DialogDescription>
              </DialogHeader>

              <div className="space-y-4">
                {/* Task Title */}
                <div className="space-y-2">
                  <Label htmlFor="task-title" className="text-sm font-medium">Task Title</Label>
                  <Input
                    id="task-title"
                    value={taskTitle}
                    onChange={(e) => setTaskTitle(e.target.value)}
                    placeholder="e.g., JavaScript Quiz, Listening Exercise"
                  />
                </div>

                {/* Activity Type Selection */}
                <div className="space-y-2">
                  <Label htmlFor="activity-type" className="text-sm font-medium">Activity Type</Label>
                  <Select value={selectedType} onValueChange={(val) => setSelectedType(val as ActivityType)}>
                    <SelectTrigger id="activity-type">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {ACTIVITY_TYPES.map((type) => (
                        <SelectItem key={type.value} value={type.value}>
                          {type.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <p className="text-xs text-muted-foreground">
                    {ACTIVITY_TYPES.find((t) => t.value === selectedType)?.description}
                  </p>
                </div>

                {/* Activity Configuration */}
                <div className="border-t border-border/50 pt-4">
                  <Label className="text-sm font-medium mb-3 block">Activity Configuration</Label>
                  <ActivityConfigComponent
                    type={selectedType}
                    data={taskData}
                    onChange={setTaskData}
                  />
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2 justify-end pt-4">
                  <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button onClick={handleAddTask}>Create Task</Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </CardHeader>
        <CardContent className="space-y-3">
          {tasks.length === 0 ? (
            <div className="flex flex-col items-center justify-center rounded-lg border-2 border-dashed border-border/50 py-12 text-center">
              <p className="text-sm text-muted-foreground">No fun tasks yet</p>
              <p className="text-xs text-muted-foreground/60">Click "Add Task" to create your first activity</p>
            </div>
          ) : (
            <div className="space-y-2">
              {tasks.map((task) => (
                <div
                  key={task.id}
                  className="flex items-center justify-between rounded-lg border border-border/50 p-4 hover:bg-muted/30"
                >
                  <div className="flex-1">
                    <p className="text-sm font-medium">{task.title}</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      Type: {ACTIVITY_TYPES.find((t) => t.value === task.type)?.label}
                    </p>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleDeleteTask(task.id)}
                    className="text-destructive hover:text-destructive"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Save Button */}
      <div className="flex justify-end gap-3">
        <Button variant="outline">Cancel</Button>
        <Button onClick={() => onSave?.(tasks)} className="gap-2">
          Save Activities
        </Button>
      </div>
    </div>
  )
}

"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Plus, Trash2 } from "lucide-react"
import { VideoItem } from "./video-item"

interface Video {
  id: string
  name: string
  url: string
  funTaskId?: string
}

interface Module {
  id: string
  name: string
  videos: Video[]
}

interface ModuleSectionProps {
  module: Module
  onUpdate: (module: Module) => void
  funTasks: Array<{ id: string; name: string }>
}

export function ModuleSection({ module, onUpdate, funTasks }: ModuleSectionProps) {
  const handleNameChange = (name: string) => {
    onUpdate({ ...module, name })
  }

  const handleAddVideo = () => {
    const newVideo: Video = {
      id: `video-${Date.now()}`,
      name: "",
      url: "",
    }
    onUpdate({
      ...module,
      videos: [...module.videos, newVideo],
    })
  }

  const handleUpdateVideo = (videoId: string, updatedVideo: Video) => {
    onUpdate({
      ...module,
      videos: module.videos.map((v) => (v.id === videoId ? updatedVideo : v)),
    })
  }

  const handleDeleteVideo = (videoId: string) => {
    onUpdate({
      ...module,
      videos: module.videos.filter((v) => v.id !== videoId),
    })
  }

  const handleAddQuiz = () => {
    const newQuiz = {
      id: `quiz-${Date.now()}`,
      title: "Module Quiz",
      questions: [],
    }
    onUpdate({
      ...module,
      quizzes: [...(module.quizzes || []), newQuiz],
    })
  }

  return (
    <div className="space-y-4 rounded-lg border border-border/50 bg-muted/20 p-4">
      {/* Module Name */}
      <div className="space-y-2">
        <Label htmlFor={`module-name-${module.id}`} className="text-sm font-medium">
          Module Name
        </Label>
        <Input
          id={`module-name-${module.id}`}
          placeholder="Enter module name"
          value={module.name}
          onChange={(e) => handleNameChange(e.target.value)}
          className="h-9"
        />
      </div>

      {/* Module Description */}
      <div className="space-y-2">
        <Label htmlFor={`module-desc-${module.id}`} className="text-sm font-medium">
          Module Description
        </Label>
        <textarea
          id={`module-desc-${module.id}`}
          placeholder="Describe what students will learn in this module..."
          value={module.description || ""}
          onChange={(e) => onUpdate({ ...module, description: e.target.value })}
          className="h-20 w-full rounded-md border border-border bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
        />
      </div>

      {/* Videos */}
      <div className="space-y-3 border-t border-border/50 pt-4">
        <div className="flex items-center justify-between">
          <Label className="text-sm font-medium">Videos</Label>
          <Button onClick={handleAddVideo} size="sm" variant="outline" className="gap-1">
            <Plus className="h-3.5 w-3.5" />
            Add Video
          </Button>
        </div>

        {module.videos.length === 0 ? (
          <div className="flex flex-col items-center justify-center rounded-lg border-2 border-dashed border-border/50 py-8 text-center">
            <p className="text-xs text-muted-foreground">No videos yet</p>
            <p className="text-xs text-muted-foreground/60">Click "Add Video" to add your first video</p>
          </div>
        ) : (
          <div className="space-y-2">
            {module.videos.map((video, index) => (
              <VideoItem
                key={video.id}
                video={video}
                videoIndex={index}
                moduleId={module.id}
                onUpdate={(updated) => handleUpdateVideo(video.id, updated)}
                onDelete={() => handleDeleteVideo(video.id)}
                funTasks={funTasks}
              />
            ))}
          </div>
        )}
      </div>

      {/* Module Quiz */}
      <div className="space-y-3 border-t border-border/50 pt-4">
        <div className="flex items-center justify-between">
          <Label className="text-sm font-medium">Module Quiz</Label>
          {!module.quizzes || module.quizzes.length === 0 ? (
            <Button onClick={handleAddQuiz} size="sm" variant="outline" className="gap-1">
              <Plus className="h-3.5 w-3.5" />
              Create Quiz
            </Button>
          ) : null}
        </div>

        {!module.quizzes || module.quizzes.length === 0 ? (
          <div className="flex flex-col items-center justify-center rounded-lg border-2 border-dashed border-border/50 py-8 text-center">
            <p className="text-xs text-muted-foreground">No quiz yet</p>
            <p className="text-xs text-muted-foreground/60">Click "Create Quiz" to add a quiz for this module</p>
          </div>
        ) : (
          <div className="rounded-lg border border-border/30 bg-white dark:bg-slate-950 p-3 space-y-3">
            <p className="text-sm font-medium">{module.quizzes[0].title}</p>
            <p className="text-xs text-muted-foreground">{module.quizzes[0].questions.length} questions</p>
            <Button size="sm" variant="outline" className="w-full">
              Edit Quiz
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}

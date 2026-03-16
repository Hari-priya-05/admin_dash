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

      {/* Videos */}
      <div className="space-y-3">
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
    </div>
  )
}

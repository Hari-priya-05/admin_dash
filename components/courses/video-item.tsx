"use client"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Trash2, GripVertical } from "lucide-react"

interface Video {
  id: string
  name: string
  url: string
  funTaskId?: string
}

interface DragHandleProps {
  attributes: Record<string, unknown>
  listeners: Record<string, unknown> | undefined
}

interface VideoItemProps {
  video: Video
  videoIndex: number
  moduleId: string
  onUpdate: (video: Video) => void
  onDelete: () => void
  funTasks: Array<{ id: string; name: string }>
  dragHandleProps?: DragHandleProps
}

export function VideoItem({
  video,
  videoIndex,
  moduleId,
  onUpdate,
  onDelete,
  funTasks,
  dragHandleProps,
}: VideoItemProps) {
  return (
    <div className="space-y-3 rounded-lg border border-border/30 bg-white dark:bg-slate-950 p-3">
      {/* Video Header with Drag Handle */}
      <div className="flex items-center gap-2">
        {dragHandleProps && (
          <button
            className="cursor-grab active:cursor-grabbing p-1 rounded hover:bg-muted"
            {...dragHandleProps.attributes}
            {...dragHandleProps.listeners}
          >
            <GripVertical className="h-4 w-4 text-muted-foreground" />
          </button>
        )}
        <p className="text-xs font-semibold text-muted-foreground">Video {videoIndex + 1}</p>
      </div>

      {/* Two column layout for name and URL */}
      <div className="grid grid-cols-2 gap-3">
        {/* Video Name */}
        <div className="space-y-1.5">
          <Label htmlFor={`video-name-${video.id}`} className="text-xs font-medium">
            Video Name
          </Label>
          <Input
            id={`video-name-${video.id}`}
            placeholder="e.g. Introduction to React"
            value={video.name}
            onChange={(e) => onUpdate({ ...video, name: e.target.value })}
            className="h-8 text-sm"
          />
        </div>

        {/* Video URL */}
        <div className="space-y-1.5">
          <Label htmlFor={`video-url-${video.id}`} className="text-xs font-medium">
            Video URL
          </Label>
          <Input
            id={`video-url-${video.id}`}
            placeholder="https://example.com/video.mp4"
            value={video.url}
            onChange={(e) => onUpdate({ ...video, url: e.target.value })}
            className="h-8 text-sm"
            type="url"
          />
        </div>
      </div>

      {/* Fun Task Assignment */}
      <div className="grid grid-cols-2 gap-3 items-end">
        <div className="space-y-1.5">
          <Label htmlFor={`fun-task-${video.id}`} className="text-xs font-medium">
            Assign Fun Task
          </Label>
          <Select
            value={video.funTaskId || "none"}
            onValueChange={(value) =>
              onUpdate({
                ...video,
                funTaskId: value === "none" ? undefined : value,
              })
            }
          >
            <SelectTrigger id={`fun-task-${video.id}`} className="h-8 text-sm">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="none">None</SelectItem>
              {funTasks.map((task) => (
                <SelectItem key={task.id} value={task.id}>
                  {task.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Delete Button */}
        <Button
          variant="ghost"
          size="sm"
          onClick={onDelete}
          className="text-destructive hover:text-destructive h-8"
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}

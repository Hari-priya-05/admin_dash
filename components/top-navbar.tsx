"use client"

import { Bell, Search, ChevronDown, Edit2, X } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

export function TopNavbar() {
  const [isEditProfileOpen, setIsEditProfileOpen] = useState(false)
  const [profileData, setProfileData] = useState({
    name: "Admin User",
    role: "Super Admin",
    avatar: "",
  })
  const [editData, setEditData] = useState(profileData)

  const handleSaveProfile = () => {
    setProfileData(editData)
    setIsEditProfileOpen(false)
  }

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
  }

  return (
    <>
      <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-border bg-card px-6">
        {/* Search */}
        <div className="relative w-full max-w-md">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search courses, faculties..."
            className="h-9 pl-9 bg-muted/50 border-transparent focus:border-primary"
          />
        </div>

        {/* Right actions */}
        <div className="flex items-center gap-4">
          {/* Notifications */}
          <button className="relative rounded-lg p-2 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground" aria-label="Notifications">
            <Bell className="h-5 w-5" />
            <Badge className="absolute -top-0.5 -right-0.5 h-4 w-4 items-center justify-center p-0 text-[10px]">
              3
            </Badge>
          </button>

          {/* Profile */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="flex items-center gap-2 rounded-lg p-1.5 transition-colors hover:bg-muted">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={profileData.avatar || ""} alt={profileData.name} />
                  <AvatarFallback className="bg-primary text-primary-foreground text-xs">
                    {getInitials(profileData.name)}
                  </AvatarFallback>
                </Avatar>
                <div className="hidden text-left md:block">
                  <p className="text-sm font-medium text-foreground">{profileData.name}</p>
                  <p className="text-xs text-muted-foreground">{profileData.role}</p>
                </div>
                <ChevronDown className="hidden h-4 w-4 text-muted-foreground md:block" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => setIsEditProfileOpen(true)}>
                <Edit2 className="mr-2 h-4 w-4" />
                Edit Profile
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-destructive">Log out</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>

      {/* Edit Profile Dialog */}
      <Dialog open={isEditProfileOpen} onOpenChange={setIsEditProfileOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Edit Profile</DialogTitle>
            <DialogDescription>Update your profile information</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            {/* Avatar Preview */}
            <div className="flex justify-center">
              <Avatar className="h-20 w-20">
                <AvatarImage src={editData.avatar || ""} alt={editData.name} />
                <AvatarFallback className="bg-primary text-primary-foreground text-lg">
                  {getInitials(editData.name)}
                </AvatarFallback>
              </Avatar>
            </div>

            {/* Name Field */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Name</label>
              <Input
                value={editData.name}
                onChange={(e) => setEditData({ ...editData, name: e.target.value })}
                placeholder="Your name"
              />
            </div>

            {/* Role Field */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Role</label>
              <Input
                value={editData.role}
                onChange={(e) => setEditData({ ...editData, role: e.target.value })}
                placeholder="Your role"
              />
            </div>

            {/* Avatar URL Field */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Avatar URL</label>
              <Input
                value={editData.avatar}
                onChange={(e) => setEditData({ ...editData, avatar: e.target.value })}
                placeholder="https://example.com/avatar.jpg"
              />
            </div>

            {/* Buttons */}
            <div className="flex gap-2 justify-end pt-4">
              <Button
                variant="outline"
                onClick={() => {
                  setEditData(profileData)
                  setIsEditProfileOpen(false)
                }}
              >
                Cancel
              </Button>
              <Button onClick={handleSaveProfile}>
                Save Changes
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}

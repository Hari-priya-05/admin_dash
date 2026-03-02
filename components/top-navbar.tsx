"use client"

import { Bell, Search, ChevronDown } from "lucide-react"
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

export function TopNavbar() {
  return (
    <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-border bg-card px-6">
      {/* Search */}
      <div className="relative w-full max-w-md">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Search colleges, courses, faculties..."
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
                <AvatarImage src="" alt="Admin user" />
                <AvatarFallback className="bg-primary text-primary-foreground text-xs">AD</AvatarFallback>
              </Avatar>
              <div className="hidden text-left md:block">
                <p className="text-sm font-medium text-foreground">Admin User</p>
                <p className="text-xs text-muted-foreground">Super Admin</p>
              </div>
              <ChevronDown className="hidden h-4 w-4 text-muted-foreground md:block" />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Profile</DropdownMenuItem>
            <DropdownMenuItem>Settings</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-destructive">Log out</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  )
}

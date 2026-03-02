"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  LayoutDashboard,
  Building2,
  Network,
  Users,
  BookOpen,
  Layers,
  HelpCircle,
  Gamepad2,
  BarChart3,
  Settings,
  GraduationCap,
  ChevronLeft,
  ChevronRight,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { useState } from "react"

const navItems = [
  { label: "Dashboard", href: "/", icon: LayoutDashboard },
  { label: "Colleges", href: "/colleges", icon: Building2 },
  { label: "Departments", href: "/departments", icon: Network },
  { label: "Faculties", href: "/faculties", icon: Users },
  { label: "Courses", href: "/courses", icon: BookOpen },
  { label: "Modules", href: "/modules", icon: Layers },
  { label: "Quizzes", href: "/quizzes", icon: HelpCircle },
  { label: "Fun Tasks", href: "/fun-tasks", icon: Gamepad2 },
  { label: "Reports", href: "/reports", icon: BarChart3 },
  { label: "Settings", href: "/settings", icon: Settings },
]

export function AppSidebar() {
  const pathname = usePathname()
  const [collapsed, setCollapsed] = useState(false)

  return (
    <aside
      className={cn(
        "fixed top-0 left-0 z-40 flex h-screen flex-col bg-sidebar text-sidebar-foreground transition-all duration-300",
        collapsed ? "w-[68px]" : "w-[250px]"
      )}
    >
      {/* Logo */}
      <div className="flex h-16 items-center gap-3 border-b border-sidebar-border px-4">
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-sidebar-primary">
          <GraduationCap className="h-5 w-5 text-sidebar-primary-foreground" />
        </div>
        {!collapsed && (
          <div className="flex flex-col overflow-hidden">
            <span className="text-sm font-semibold text-sidebar-foreground">EduAdmin</span>
            <span className="text-xs text-sidebar-foreground/60">LMS Dashboard</span>
          </div>
        )}
      </div>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto px-3 py-4" aria-label="Main navigation">
        <ul className="flex flex-col gap-1">
          {navItems.map((item) => {
            const isActive = pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href))
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={cn(
                    "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                    isActive
                      ? "bg-sidebar-accent text-sidebar-primary"
                      : "text-sidebar-foreground/70 hover:bg-sidebar-accent/60 hover:text-sidebar-foreground"
                  )}
                >
                  <item.icon className="h-[18px] w-[18px] shrink-0" />
                  {!collapsed && <span>{item.label}</span>}
                </Link>
              </li>
            )
          })}
        </ul>
      </nav>

      {/* Collapse Toggle */}
      <div className="border-t border-sidebar-border p-3">
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="flex w-full items-center justify-center rounded-lg py-2 text-sidebar-foreground/50 transition-colors hover:bg-sidebar-accent hover:text-sidebar-foreground"
          aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
        </button>
      </div>
    </aside>
  )
}

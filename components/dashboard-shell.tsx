"use client"

import { AppSidebar } from "@/components/app-sidebar"
import { TopNavbar } from "@/components/top-navbar"

export function DashboardShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-background">
      <AppSidebar />
      <div className="ml-[250px] flex flex-1 flex-col transition-all duration-300">
        <TopNavbar />
        <main className="flex-1 p-6">{children}</main>
      </div>
    </div>
  )
}

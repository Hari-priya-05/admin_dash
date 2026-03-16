"use client"

import { AppSidebar } from "@/components/app-sidebar"
import { useSidebar } from "@/contexts/sidebar-context"

export function DashboardShell({ children }: { children: React.ReactNode }) {
  const { collapsed } = useSidebar()

  return (
    <div className="flex min-h-screen bg-background">
      <AppSidebar />
      <div className={`flex flex-1 flex-col transition-all duration-300 ${collapsed ? "ml-[68px]" : "ml-[250px]"}`}>
        <main className="flex-1 p-6">{children}</main>
      </div>
    </div>
  )
}

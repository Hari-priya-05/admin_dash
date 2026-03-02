"use client"

import { DashboardShell } from "@/components/dashboard-shell"
import { KpiCards } from "@/components/dashboard/kpi-cards"
import { DashboardCharts } from "@/components/dashboard/dashboard-charts"
import { RecentActivity } from "@/components/dashboard/recent-activity"

export default function DashboardPage() {
  return (
    <DashboardShell>
      <div className="flex flex-col gap-6">
        {/* Page Header */}
        <div>
          <h1 className="text-2xl font-bold text-foreground">Dashboard</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Overview of your learning management system
          </p>
        </div>

        {/* KPI Cards */}
        <KpiCards />

        {/* Charts */}
        <DashboardCharts />

        {/* Recent Activity */}
        <div className="grid gap-4 lg:grid-cols-2">
          <RecentActivity />
          <RecentActivity />
        </div>
      </div>
    </DashboardShell>
  )
}

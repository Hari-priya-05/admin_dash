"use client"

import { DashboardShell } from "@/components/dashboard-shell"
import { KpiCards } from "@/components/dashboard/kpi-cards"
import { DashboardCharts } from "@/components/dashboard/dashboard-charts"
import { RecentActivity } from "@/components/dashboard/recent-activity"

export default function DashboardPage() {
  return (
    <DashboardShell>
      <div className="flex flex-col gap-6">
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

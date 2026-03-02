"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  LineChart, Line, PieChart, Pie, Cell, Legend,
} from "recharts"

const barData = [
  { college: "MIT", progress: 88 },
  { college: "Stanford", progress: 82 },
  { college: "Harvard", progress: 76 },
  { college: "Yale", progress: 71 },
  { college: "Princeton", progress: 68 },
  { college: "Columbia", progress: 64 },
  { college: "Duke", progress: 59 },
]

const lineData = [
  { month: "Jan", engineering: 72, science: 68, arts: 62, business: 75 },
  { month: "Feb", engineering: 75, science: 71, arts: 65, business: 77 },
  { month: "Mar", engineering: 78, science: 74, arts: 68, business: 80 },
  { month: "Apr", engineering: 74, science: 76, arts: 70, business: 78 },
  { month: "May", engineering: 80, science: 79, arts: 73, business: 82 },
  { month: "Jun", engineering: 85, science: 82, arts: 76, business: 85 },
]

const pieData = [
  { name: "90-100", value: 15 },
  { name: "80-89", value: 25 },
  { name: "70-79", value: 30 },
  { name: "60-69", value: 18 },
  { name: "Below 60", value: 12 },
]

const PIE_COLORS = [
  "oklch(0.51 0.18 255)",
  "oklch(0.65 0.18 165)",
  "oklch(0.70 0.16 45)",
  "oklch(0.60 0.20 330)",
  "oklch(0.55 0.15 200)",
]

export function DashboardCharts() {
  return (
    <div className="grid gap-4 lg:grid-cols-2 xl:grid-cols-3">
      {/* Bar Chart */}
      <Card className="rounded-xl border-border/60 shadow-sm lg:col-span-1">
        <CardHeader>
          <CardTitle className="text-sm font-semibold text-foreground">College-wise Progress</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={barData} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.90 0.01 260)" />
              <XAxis dataKey="college" tick={{ fontSize: 11 }} stroke="oklch(0.50 0.02 260)" />
              <YAxis tick={{ fontSize: 11 }} stroke="oklch(0.50 0.02 260)" />
              <Tooltip
                contentStyle={{
                  backgroundColor: "oklch(1 0 0)",
                  border: "1px solid oklch(0.90 0.01 260)",
                  borderRadius: "8px",
                  fontSize: "12px",
                }}
              />
              <Bar dataKey="progress" fill="oklch(0.51 0.18 255)" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Line Chart */}
      <Card className="rounded-xl border-border/60 shadow-sm lg:col-span-1">
        <CardHeader>
          <CardTitle className="text-sm font-semibold text-foreground">Department Performance</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={280}>
            <LineChart data={lineData} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.90 0.01 260)" />
              <XAxis dataKey="month" tick={{ fontSize: 11 }} stroke="oklch(0.50 0.02 260)" />
              <YAxis tick={{ fontSize: 11 }} stroke="oklch(0.50 0.02 260)" />
              <Tooltip
                contentStyle={{
                  backgroundColor: "oklch(1 0 0)",
                  border: "1px solid oklch(0.90 0.01 260)",
                  borderRadius: "8px",
                  fontSize: "12px",
                }}
              />
              <Legend iconSize={8} wrapperStyle={{ fontSize: "11px" }} />
              <Line type="monotone" dataKey="engineering" stroke="oklch(0.51 0.18 255)" strokeWidth={2} dot={{ r: 3 }} />
              <Line type="monotone" dataKey="science" stroke="oklch(0.65 0.18 165)" strokeWidth={2} dot={{ r: 3 }} />
              <Line type="monotone" dataKey="arts" stroke="oklch(0.70 0.16 45)" strokeWidth={2} dot={{ r: 3 }} />
              <Line type="monotone" dataKey="business" stroke="oklch(0.60 0.20 330)" strokeWidth={2} dot={{ r: 3 }} />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Pie Chart */}
      <Card className="rounded-xl border-border/60 shadow-sm lg:col-span-2 xl:col-span-1">
        <CardHeader>
          <CardTitle className="text-sm font-semibold text-foreground">Quiz Score Distribution</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={280}>
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                paddingAngle={3}
                dataKey="value"
              >
                {pieData.map((_, index) => (
                  <Cell key={`cell-${index}`} fill={PIE_COLORS[index % PIE_COLORS.length]} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: "oklch(1 0 0)",
                  border: "1px solid oklch(0.90 0.01 260)",
                  borderRadius: "8px",
                  fontSize: "12px",
                }}
              />
              <Legend iconSize={8} wrapperStyle={{ fontSize: "11px" }} />
            </PieChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  )
}

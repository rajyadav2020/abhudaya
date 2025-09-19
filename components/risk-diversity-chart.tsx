"use client"

import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts"

interface Student {
  riskFactor: "Low" | "Medium" | "High"
}

interface RiskDiversityChartProps {
  students: Student[]
}

const COLORS = {
  Low: "hsl(var(--chart-1))",
  Medium: "hsl(var(--chart-2))",
  High: "hsl(var(--destructive))",
}

export function RiskDiversityChart({ students }: RiskDiversityChartProps) {
  const riskCounts = students.reduce(
    (acc, student) => {
      acc[student.riskFactor] = (acc[student.riskFactor] || 0) + 1
      return acc
    },
    {} as Record<string, number>,
  )

  const data = Object.entries(riskCounts).map(([risk, count]) => ({
    name: risk,
    value: count,
    percentage: Math.round((count / students.length) * 100),
  }))

  return (
    <div className="space-y-4">
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie data={data} cx="50%" cy="50%" innerRadius={60} outerRadius={120} paddingAngle={5} dataKey="value">
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[entry.name as keyof typeof COLORS]} />
            ))}
          </Pie>
          <Tooltip
            content={({ active, payload }) => {
              if (active && payload && payload.length) {
                const data = payload[0].payload
                return (
                  <div className="rounded-lg border bg-background p-2 shadow-sm">
                    <div className="grid grid-cols-2 gap-2">
                      <div className="flex flex-col">
                        <span className="text-[0.70rem] uppercase text-muted-foreground">Risk Level</span>
                        <span className="font-bold text-muted-foreground">{data.name}</span>
                      </div>
                      <div className="flex flex-col">
                        <span className="text-[0.70rem] uppercase text-muted-foreground">Students</span>
                        <span className="font-bold">
                          {data.value} ({data.percentage}%)
                        </span>
                      </div>
                    </div>
                  </div>
                )
              }
              return null
            }}
          />
        </PieChart>
      </ResponsiveContainer>

      <div className="flex justify-center gap-6">
        {data.map((entry) => (
          <div key={entry.name} className="flex items-center gap-2">
            <div
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: COLORS[entry.name as keyof typeof COLORS] }}
            />
            <span className="text-sm font-medium">{entry.name}</span>
            <span className="text-sm text-muted-foreground">({entry.value})</span>
          </div>
        ))}
      </div>
    </div>
  )
}

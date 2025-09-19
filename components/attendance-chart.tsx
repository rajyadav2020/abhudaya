"use client"

import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

const data = [
  { month: "Jul", attendance: 78 },
  { month: "Aug", attendance: 82 },
  { month: "Sep", attendance: 85 },
  { month: "Oct", attendance: 88 },
  { month: "Nov", attendance: 85 },
  { month: "Dec", attendance: 85 },
]

export function AttendanceChart() {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={data}>
        <XAxis dataKey="month" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
        <YAxis
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
          tickFormatter={(value) => `${value}%`}
        />
        <Tooltip
          content={({ active, payload, label }) => {
            if (active && payload && payload.length) {
              return (
                <div className="rounded-lg border bg-background p-2 shadow-sm">
                  <div className="grid grid-cols-2 gap-2">
                    <div className="flex flex-col">
                      <span className="text-[0.70rem] uppercase text-muted-foreground">Month</span>
                      <span className="font-bold text-muted-foreground">{label}</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[0.70rem] uppercase text-muted-foreground">Attendance</span>
                      <span className="font-bold">{payload[0].value}%</span>
                    </div>
                  </div>
                </div>
              )
            }
            return null
          }}
        />
        <Line
          type="monotone"
          dataKey="attendance"
          strokeWidth={2}
          activeDot={{
            r: 6,
            style: { fill: "hsl(var(--primary))", opacity: 0.8 },
          }}
          style={{
            stroke: "hsl(var(--primary))",
          }}
        />
      </LineChart>
    </ResponsiveContainer>
  )
}

"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Bar, BarChart, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"

const data = [
  { month: "Sep", wins: 2, losses: 1, neutral: 0 },
  { month: "Oct", wins: 3, losses: 1, neutral: 1 },
  { month: "Nov", wins: 2, losses: 2, neutral: 1 },
  { month: "Dec", wins: 4, losses: 1, neutral: 0 },
  { month: "Jan", wins: 3, losses: 0, neutral: 1 },
]

export function WinRateChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Experiment Outcomes</CardTitle>
        <CardDescription>Monthly win/loss distribution</CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
            <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" fontSize={12} />
            <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
            <Tooltip
              contentStyle={{
                backgroundColor: "hsl(var(--popover))",
                border: "1px solid hsl(var(--border))",
                borderRadius: "var(--radius)",
              }}
              labelStyle={{ color: "hsl(var(--foreground))" }}
            />
            <Legend />
            <Bar dataKey="wins" fill="hsl(var(--chart-2))" name="Wins" radius={[4, 4, 0, 0]} />
            <Bar dataKey="neutral" fill="hsl(var(--chart-3))" name="Neutral" radius={[4, 4, 0, 0]} />
            <Bar dataKey="losses" fill="hsl(var(--chart-5))" name="Losses" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}

"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { mockDailyMetrics } from "@/lib/mock-data"
import { Line, LineChart, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"
import { formatPercentage } from "@/lib/statistical-utils"

interface ExperimentTimelineProps {
  experimentId: string
}

export function ExperimentTimeline({ experimentId }: ExperimentTimelineProps) {
  const metrics = mockDailyMetrics.filter((m) => experimentId === "exp-001")

  if (metrics.length === 0) {
    return null
  }

  // Group by date
  const chartData = metrics.reduce(
    (acc, metric) => {
      const existing = acc.find((d) => d.date === metric.date)
      if (existing) {
        existing[metric.variantName] = metric.conversionRate
      } else {
        acc.push({
          date: metric.date,
          [metric.variantName]: metric.conversionRate,
        })
      }
      return acc
    },
    [] as Array<Record<string, number | string>>,
  )

  return (
    <Card>
      <CardHeader>
        <CardTitle>Performance Over Time</CardTitle>
        <CardDescription>Daily conversion rates by variant</CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
            <XAxis
              dataKey="date"
              stroke="hsl(var(--muted-foreground))"
              fontSize={12}
              tickFormatter={(value) => new Date(value).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
            />
            <YAxis
              stroke="hsl(var(--muted-foreground))"
              fontSize={12}
              tickFormatter={(value) => formatPercentage(value)}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "hsl(var(--popover))",
                border: "1px solid hsl(var(--border))",
                borderRadius: "var(--radius)",
              }}
              labelStyle={{ color: "hsl(var(--foreground))" }}
              formatter={(value: number) => formatPercentage(value)}
            />
            <Legend />
            <Line type="monotone" dataKey="Control (Blue)" stroke="hsl(var(--chart-1))" strokeWidth={2} dot={false} />
            <Line
              type="monotone"
              dataKey="Treatment (Green)"
              stroke="hsl(var(--chart-2))"
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}

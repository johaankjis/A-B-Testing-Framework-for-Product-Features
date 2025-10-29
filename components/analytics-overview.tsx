"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Area, AreaChart, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"
import { formatPercentage } from "@/lib/statistical-utils"

const cumulativeData = [
  { day: 1, control: 0.078, treatment: 0.082 },
  { day: 3, control: 0.081, treatment: 0.089 },
  { day: 5, control: 0.082, treatment: 0.093 },
  { day: 7, control: 0.083, treatment: 0.096 },
  { day: 10, control: 0.084, treatment: 0.098 },
  { day: 14, control: 0.0842, treatment: 0.0993 },
]

export function AnalyticsOverview() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Cumulative Conversion Rate</CardTitle>
        <CardDescription>How conversion rates stabilized over time</CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <AreaChart data={cumulativeData}>
            <defs>
              <linearGradient id="colorControl" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="hsl(var(--chart-1))" stopOpacity={0.3} />
                <stop offset="95%" stopColor="hsl(var(--chart-1))" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="colorTreatment" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="hsl(var(--chart-2))" stopOpacity={0.3} />
                <stop offset="95%" stopColor="hsl(var(--chart-2))" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
            <XAxis
              dataKey="day"
              stroke="hsl(var(--muted-foreground))"
              fontSize={12}
              label={{ value: "Days", position: "insideBottom", offset: -5 }}
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
            <Area
              type="monotone"
              dataKey="control"
              stroke="hsl(var(--chart-1))"
              fillOpacity={1}
              fill="url(#colorControl)"
              name="Control"
            />
            <Area
              type="monotone"
              dataKey="treatment"
              stroke="hsl(var(--chart-2))"
              fillOpacity={1}
              fill="url(#colorTreatment)"
              name="Treatment"
            />
          </AreaChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}

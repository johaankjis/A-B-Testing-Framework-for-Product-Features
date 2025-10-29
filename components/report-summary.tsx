import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { mockExperiments, mockResults } from "@/lib/mock-data"
import { TrendingUp, Target, Zap, Award } from "lucide-react"
import { formatPercentage } from "@/lib/statistical-utils"

export function ReportSummary() {
  const completedExperiments = mockExperiments.filter((e) => e.status === "completed")
  const significantWins = mockResults.filter(
    (r) => r.statisticalSignificance && !r.variantName.includes("Control") && r.relativeUplift > 0,
  )

  const avgUplift =
    significantWins.length > 0
      ? significantWins.reduce((sum, r) => sum + r.relativeUplift, 0) / significantWins.length
      : 0

  const winRate = completedExperiments.length > 0 ? significantWins.length / completedExperiments.length : 0

  const totalUsers = mockExperiments.reduce((sum, e) => sum + e.sampleSize, 0)

  const metrics = [
    {
      title: "Win Rate",
      value: formatPercentage(winRate),
      description: "Experiments with significant positive results",
      icon: Award,
      trend: "+12% from last quarter",
    },
    {
      title: "Average Uplift",
      value: formatPercentage(avgUplift),
      description: "Mean improvement across winning variants",
      icon: TrendingUp,
      trend: "Across all significant tests",
    },
    {
      title: "Total Users Tested",
      value: totalUsers.toLocaleString(),
      description: "Cumulative sample size",
      icon: Target,
      trend: "All experiments combined",
    },
    {
      title: "Velocity",
      value: "< 1 day",
      description: "Average time to launch experiment",
      icon: Zap,
      trend: "35% faster than baseline",
    },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {metrics.map((metric) => {
        const Icon = metric.icon
        return (
          <Card key={metric.title}>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-medium text-muted-foreground">{metric.title}</CardTitle>
                <Icon className="h-4 w-4 text-muted-foreground" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold mb-1">{metric.value}</div>
              <p className="text-xs text-muted-foreground mb-2">{metric.description}</p>
              <p className="text-xs text-green-500">{metric.trend}</p>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}

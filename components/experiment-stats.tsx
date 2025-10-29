import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { mockExperiments, mockResults } from "@/lib/mock-data"
import { TrendingUp, FlaskConical, CheckCircle2, Clock } from "lucide-react"

export function ExperimentStats() {
  const totalExperiments = mockExperiments.length
  const runningExperiments = mockExperiments.filter((e) => e.status === "running").length
  const completedExperiments = mockExperiments.filter((e) => e.status === "completed").length

  const significantResults = mockResults.filter(
    (r) => r.statisticalSignificance && !r.variantName.includes("Control"),
  ).length

  const stats = [
    {
      title: "Total Experiments",
      value: totalExperiments,
      icon: FlaskConical,
      description: "All time",
    },
    {
      title: "Running",
      value: runningExperiments,
      icon: Clock,
      description: "Active experiments",
    },
    {
      title: "Completed",
      value: completedExperiments,
      icon: CheckCircle2,
      description: "Finished tests",
    },
    {
      title: "Significant Wins",
      value: significantResults,
      icon: TrendingUp,
      description: "Statistically significant",
    },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      {stats.map((stat) => {
        const Icon = stat.icon
        return (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">{stat.title}</CardTitle>
              <Icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground mt-1">{stat.description}</p>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}

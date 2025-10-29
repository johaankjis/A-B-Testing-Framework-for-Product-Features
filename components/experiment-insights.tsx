import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { mockExperiments, mockResults } from "@/lib/mock-data"
import { TrendingUp, AlertCircle, CheckCircle2 } from "lucide-react"
import { formatPercentage } from "@/lib/statistical-utils"

export function ExperimentInsights() {
  const insights = [
    {
      type: "success",
      experiment: mockExperiments[1],
      result: mockResults.find((r) => r.experimentId === "exp-002" && !r.variantName.includes("Control")),
      message: "Onboarding simplification achieved 15% uplift",
    },
    {
      type: "success",
      experiment: mockExperiments[0],
      result: mockResults.find((r) => r.experimentId === "exp-001" && !r.variantName.includes("Control")),
      message: "Green checkout button showing 18% improvement",
    },
    {
      type: "warning",
      experiment: mockExperiments[3],
      result: null,
      message: "Email test needs 3 more days to reach significance",
    },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle>Key Insights</CardTitle>
        <CardDescription>Automated experiment analysis</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {insights.map((insight, index) => {
          const Icon = insight.type === "success" ? CheckCircle2 : insight.type === "warning" ? AlertCircle : TrendingUp

          return (
            <div key={index} className="flex gap-3 p-3 rounded-lg border border-border bg-card/50">
              <Icon
                className={`h-5 w-5 mt-0.5 flex-shrink-0 ${
                  insight.type === "success"
                    ? "text-green-500"
                    : insight.type === "warning"
                      ? "text-yellow-500"
                      : "text-blue-500"
                }`}
              />
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <p className="font-semibold text-sm">{insight.experiment.name}</p>
                  {insight.result && (
                    <Badge variant="secondary" className="text-xs">
                      {formatPercentage(insight.result.relativeUplift)} uplift
                    </Badge>
                  )}
                </div>
                <p className="text-sm text-muted-foreground">{insight.message}</p>
              </div>
            </div>
          )
        })}

        <div className="pt-4 border-t border-border">
          <h4 className="font-semibold text-sm mb-2">Recommendations</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li className="flex gap-2">
              <span className="text-primary">•</span>
              <span>Roll out winning variants to 100% of users</span>
            </li>
            <li className="flex gap-2">
              <span className="text-primary">•</span>
              <span>Continue email test for 3 more days</span>
            </li>
            <li className="flex gap-2">
              <span className="text-primary">•</span>
              <span>Launch pricing page test next week</span>
            </li>
          </ul>
        </div>
      </CardContent>
    </Card>
  )
}

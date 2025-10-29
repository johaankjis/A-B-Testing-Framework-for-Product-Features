import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { mockResults } from "@/lib/mock-data"
import { formatPercentage, formatNumber } from "@/lib/statistical-utils"

export function MetricBreakdown() {
  const result = mockResults.find((r) => r.experimentId === "exp-001" && !r.variantName.includes("Control"))

  if (!result) return null

  const metrics = [
    { label: "Sample Size", value: formatNumber(result.sampleSize) },
    { label: "Conversion Rate", value: formatPercentage(result.conversionRate) },
    { label: "Standard Deviation", value: result.standardDeviation.toFixed(4) },
    {
      label: "Confidence Interval",
      value: `[${formatPercentage(result.confidenceInterval[0])}, ${formatPercentage(result.confidenceInterval[1])}]`,
    },
    { label: "p-value", value: result.pValue < 0.001 ? "<0.001" : result.pValue.toFixed(4) },
    { label: "Relative Uplift", value: formatPercentage(result.relativeUplift) },
    { label: "Absolute Uplift", value: formatPercentage(result.absoluteUplift, 3) },
    { label: "Statistical Significance", value: result.statisticalSignificance ? "Yes" : "No" },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle>Metric Breakdown</CardTitle>
        <CardDescription>Detailed statistical metrics for {result.variantName}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {metrics.map((metric) => (
            <div
              key={metric.label}
              className="flex items-center justify-between py-2 border-b border-border last:border-0"
            >
              <span className="text-sm text-muted-foreground">{metric.label}</span>
              <span className="font-mono text-sm font-medium">{metric.value}</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

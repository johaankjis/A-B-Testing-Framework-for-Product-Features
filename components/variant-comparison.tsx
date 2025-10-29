import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import type { Experiment, ExperimentResult } from "@/lib/types"
import { formatPercentage, formatNumber } from "@/lib/statistical-utils"
import { TrendingUp, TrendingDown } from "lucide-react"

interface VariantComparisonProps {
  experiment: Experiment
  results: ExperimentResult[]
}

export function VariantComparison({ experiment, results }: VariantComparisonProps) {
  if (results.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Variant Performance</CardTitle>
          <CardDescription>No data available yet</CardDescription>
        </CardHeader>
      </Card>
    )
  }

  const controlResult = results.find((r) => r.variantName.includes("Control"))

  return (
    <Card>
      <CardHeader>
        <CardTitle>Variant Performance</CardTitle>
        <CardDescription>Conversion rates and statistical comparison</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {results.map((result) => {
          const isControl = result.variantName.includes("Control")
          const uplift = result.relativeUplift

          return (
            <div key={result.variantId} className="space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold text-lg">{result.variantName}</h3>
                    {!isControl && uplift !== 0 && (
                      <div
                        className={`flex items-center gap-1 text-sm ${uplift > 0 ? "text-green-500" : "text-red-500"}`}
                      >
                        {uplift > 0 ? <TrendingUp className="h-4 w-4" /> : <TrendingDown className="h-4 w-4" />}
                        <span className="font-medium">{formatPercentage(Math.abs(uplift))} uplift</span>
                      </div>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground">{formatNumber(result.sampleSize)} users</p>
                </div>
                <div className="text-right">
                  <p className="text-3xl font-bold">{formatPercentage(result.conversionRate)}</p>
                  <p className="text-sm text-muted-foreground">Conversion Rate</p>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Confidence Interval (95%)</span>
                  <span className="font-mono">
                    [{formatPercentage(result.confidenceInterval[0])} - {formatPercentage(result.confidenceInterval[1])}
                    ]
                  </span>
                </div>
                <Progress value={result.conversionRate * 100} className="h-2" />
              </div>

              {!isControl && (
                <div className="flex items-center justify-between text-sm pt-2 border-t border-border">
                  <span className="text-muted-foreground">vs Control</span>
                  <div className="flex items-center gap-4">
                    <span>
                      Absolute: <span className="font-medium">{formatPercentage(result.absoluteUplift, 3)}</span>
                    </span>
                    <span>
                      p-value:{" "}
                      <span className="font-mono font-medium">
                        {result.pValue < 0.001 ? "<0.001" : result.pValue.toFixed(4)}
                      </span>
                    </span>
                  </div>
                </div>
              )}
            </div>
          )
        })}
      </CardContent>
    </Card>
  )
}

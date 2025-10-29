import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import type { ExperimentResult } from "@/lib/types"
import { getSignificanceLabel } from "@/lib/statistical-utils"
import { CheckCircle2, XCircle, AlertCircle } from "lucide-react"

interface StatisticalSignificanceProps {
  results: ExperimentResult[]
}

export function StatisticalSignificance({ results }: StatisticalSignificanceProps) {
  if (results.length === 0) {
    return null
  }

  const treatmentResults = results.filter((r) => !r.variantName.includes("Control"))

  return (
    <Card>
      <CardHeader>
        <CardTitle>Statistical Analysis</CardTitle>
        <CardDescription>Significance testing results</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {treatmentResults.map((result) => {
          const { label, color } = getSignificanceLabel(result.pValue)
          const isSignificant = result.statisticalSignificance

          return (
            <div key={result.variantId} className="space-y-4">
              <div>
                <h4 className="font-semibold mb-2">{result.variantName}</h4>

                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Significance</span>
                    <Badge variant={isSignificant ? "default" : "secondary"} className="gap-1">
                      {isSignificant ? <CheckCircle2 className="h-3 w-3" /> : <XCircle className="h-3 w-3" />}
                      {label}
                    </Badge>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">p-value</span>
                    <span className={`font-mono text-sm font-medium ${color}`}>
                      {result.pValue < 0.001 ? "<0.001" : result.pValue.toFixed(4)}
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Sample Size</span>
                    <span className="text-sm font-medium">{result.sampleSize.toLocaleString()}</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Std. Deviation</span>
                    <span className="text-sm font-mono">{result.standardDeviation.toFixed(4)}</span>
                  </div>
                </div>
              </div>

              {result.pValue >= 0.05 && (
                <div className="flex gap-2 p-3 bg-yellow-500/10 border border-yellow-500/20 rounded-lg">
                  <AlertCircle className="h-4 w-4 text-yellow-500 mt-0.5 flex-shrink-0" />
                  <p className="text-sm text-yellow-500">
                    Result is not statistically significant. Consider running the experiment longer.
                  </p>
                </div>
              )}
            </div>
          )
        })}

        <div className="pt-4 border-t border-border space-y-2">
          <h4 className="font-semibold text-sm">Interpretation Guide</h4>
          <div className="space-y-1 text-xs text-muted-foreground">
            <p>p {"<"} 0.05: Statistically significant</p>
            <p>p {"<"} 0.01: Very significant</p>
            <p>p {"<"} 0.001: Highly significant</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

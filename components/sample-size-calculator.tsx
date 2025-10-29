"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { calculateSampleSizeNeeded } from "@/lib/statistical-utils"
import { Calculator } from "lucide-react"

export function SampleSizeCalculator() {
  const [baselineRate, setBaselineRate] = useState(5)
  const [mde, setMde] = useState(10)
  const [sampleSize, setSampleSize] = useState<number | null>(null)

  const calculate = () => {
    const size = calculateSampleSizeNeeded(baselineRate / 100, mde / 100)
    setSampleSize(size)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Sample Size Calculator</CardTitle>
        <CardDescription>Calculate required sample size for your experiment</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="baseline">Baseline Conversion Rate (%)</Label>
          <Input
            id="baseline"
            type="number"
            value={baselineRate}
            onChange={(e) => setBaselineRate(Number(e.target.value))}
            min="0"
            max="100"
            step="0.1"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="mde">Minimum Detectable Effect (%)</Label>
          <Input
            id="mde"
            type="number"
            value={mde}
            onChange={(e) => setMde(Number(e.target.value))}
            min="0"
            max="100"
            step="1"
          />
        </div>

        <Button onClick={calculate} className="w-full">
          <Calculator className="h-4 w-4 mr-2" />
          Calculate Sample Size
        </Button>

        {sampleSize !== null && (
          <div className="p-4 bg-primary/10 border border-primary/20 rounded-lg">
            <p className="text-sm text-muted-foreground mb-1">Required sample size per variant:</p>
            <p className="text-3xl font-bold text-primary">{sampleSize.toLocaleString()}</p>
            <p className="text-xs text-muted-foreground mt-2">
              Based on 95% confidence level and 80% statistical power
            </p>
          </div>
        )}

        <div className="pt-4 border-t border-border space-y-2">
          <h4 className="font-semibold text-sm">Parameters</h4>
          <div className="space-y-1 text-xs text-muted-foreground">
            <p>Confidence Level: 95% (α = 0.05)</p>
            <p>Statistical Power: 80% (β = 0.20)</p>
            <p>Test Type: Two-tailed</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

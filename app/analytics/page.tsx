import { Navigation } from "@/components/navigation"
import { AnalyticsOverview } from "@/components/analytics-overview"
import { MetricBreakdown } from "@/components/metric-breakdown"
import { SampleSizeCalculator } from "@/components/sample-size-calculator"

export default function AnalyticsPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-balance mb-2">Analytics Dashboard</h1>
          <p className="text-muted-foreground text-lg">Deep dive into experiment metrics and calculations</p>
        </div>

        <div className="space-y-6">
          <AnalyticsOverview />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <MetricBreakdown />
            <SampleSizeCalculator />
          </div>
        </div>
      </main>
    </div>
  )
}

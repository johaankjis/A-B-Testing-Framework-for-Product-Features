import { Navigation } from "@/components/navigation"
import { ReportSummary } from "@/components/report-summary"
import { ExperimentInsights } from "@/components/experiment-insights"
import { WinRateChart } from "@/components/win-rate-chart"
import { Button } from "@/components/ui/button"
import { Download, Calendar } from "lucide-react"

export default function ReportsPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold text-balance mb-2">Experiment Reports</h1>
            <p className="text-muted-foreground text-lg">Automated insights and performance summaries</p>
          </div>

          <div className="flex gap-2">
            <Button variant="outline">
              <Calendar className="h-4 w-4 mr-2" />
              Date Range
            </Button>
            <Button>
              <Download className="h-4 w-4 mr-2" />
              Export Report
            </Button>
          </div>
        </div>

        <div className="space-y-6">
          <ReportSummary />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <WinRateChart />
            <ExperimentInsights />
          </div>
        </div>
      </main>
    </div>
  )
}

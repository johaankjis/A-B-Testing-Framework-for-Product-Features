import { ExperimentList } from "@/components/experiment-list"
import { ExperimentStats } from "@/components/experiment-stats"
import { Navigation } from "@/components/navigation"

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-balance mb-2">A/B Testing Framework</h1>
          <p className="text-muted-foreground text-lg">
            Manage experiments, analyze results, and make data-driven decisions
          </p>
        </div>

        <ExperimentStats />
        <ExperimentList />
      </main>
    </div>
  )
}

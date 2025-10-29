import { notFound } from "next/navigation"
import { mockExperiments, mockResults } from "@/lib/mock-data"
import { Navigation } from "@/components/navigation"
import { ExperimentHeader } from "@/components/experiment-header"
import { VariantComparison } from "@/components/variant-comparison"
import { StatisticalSignificance } from "@/components/statistical-significance"
import { ExperimentTimeline } from "@/components/experiment-timeline"

export default async function ExperimentPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const experiment = mockExperiments.find((e) => e.id === id)

  if (!experiment) {
    notFound()
  }

  const results = mockResults.filter((r) => r.experimentId === id)

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="container mx-auto px-4 py-8">
        <ExperimentHeader experiment={experiment} />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-8">
          <div className="lg:col-span-2 space-y-6">
            <VariantComparison experiment={experiment} results={results} />
            <ExperimentTimeline experimentId={experiment.id} />
          </div>

          <div className="space-y-6">
            <StatisticalSignificance results={results} />
          </div>
        </div>
      </main>
    </div>
  )
}

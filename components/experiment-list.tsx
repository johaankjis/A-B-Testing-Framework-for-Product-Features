import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { mockExperiments } from "@/lib/mock-data"
import type { ExperimentStatus } from "@/lib/types"
import { ArrowRight, Calendar, Users } from "lucide-react"
import Link from "next/link"

function getStatusColor(status: ExperimentStatus) {
  switch (status) {
    case "running":
      return "bg-blue-500/10 text-blue-500 border-blue-500/20"
    case "completed":
      return "bg-green-500/10 text-green-500 border-green-500/20"
    case "paused":
      return "bg-yellow-500/10 text-yellow-500 border-yellow-500/20"
    case "draft":
      return "bg-muted text-muted-foreground border-border"
    default:
      return "bg-muted text-muted-foreground border-border"
  }
}

export function ExperimentList() {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Experiments</h2>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            Filter
          </Button>
          <Button variant="outline" size="sm">
            Sort
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {mockExperiments.map((experiment) => (
          <Card key={experiment.id} className="hover:border-primary/50 transition-colors">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <CardTitle className="text-xl">{experiment.name}</CardTitle>
                    <Badge variant="outline" className={getStatusColor(experiment.status)}>
                      {experiment.status}
                    </Badge>
                  </div>
                  <CardDescription className="text-base">{experiment.description}</CardDescription>
                </div>
                <Button variant="ghost" size="sm" asChild>
                  <Link href={`/experiment/${experiment.id}`}>
                    View Details
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Link>
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-6 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  <span>Started {new Date(experiment.startDate).toLocaleDateString()}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4" />
                  <span>{experiment.sampleSize.toLocaleString()} users</span>
                </div>
                <div className="flex items-center gap-2">
                  <span>{experiment.variants.length} variants</span>
                </div>
              </div>

              <div className="mt-4 flex gap-2">
                {experiment.variants.map((variant) => (
                  <Badge key={variant.id} variant="secondary">
                    {variant.name} ({variant.trafficPercentage}%)
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

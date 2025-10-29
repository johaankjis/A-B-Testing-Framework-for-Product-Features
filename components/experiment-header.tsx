import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import type { Experiment } from "@/lib/types"
import { Calendar, Users, Target, ArrowLeft } from "lucide-react"
import Link from "next/link"

interface ExperimentHeaderProps {
  experiment: Experiment
}

export function ExperimentHeader({ experiment }: ExperimentHeaderProps) {
  return (
    <div>
      <Button variant="ghost" size="sm" className="mb-4" asChild>
        <Link href="/">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Experiments
        </Link>
      </Button>

      <div className="flex items-start justify-between mb-6">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <h1 className="text-4xl font-bold text-balance">{experiment.name}</h1>
            <Badge
              variant="outline"
              className={
                experiment.status === "running"
                  ? "bg-blue-500/10 text-blue-500 border-blue-500/20"
                  : experiment.status === "completed"
                    ? "bg-green-500/10 text-green-500 border-green-500/20"
                    : "bg-muted text-muted-foreground"
              }
            >
              {experiment.status}
            </Badge>
          </div>
          <p className="text-lg text-muted-foreground">{experiment.description}</p>
        </div>

        <div className="flex gap-2">
          {experiment.status === "running" && (
            <>
              <Button variant="outline">Pause</Button>
              <Button variant="destructive">Stop</Button>
            </>
          )}
          {experiment.status === "draft" && <Button>Launch Experiment</Button>}
        </div>
      </div>

      <Card>
        <CardContent className="pt-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="flex items-start gap-3">
              <Calendar className="h-5 w-5 text-muted-foreground mt-0.5" />
              <div>
                <p className="text-sm text-muted-foreground">Start Date</p>
                <p className="font-semibold">{new Date(experiment.startDate).toLocaleDateString()}</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Users className="h-5 w-5 text-muted-foreground mt-0.5" />
              <div>
                <p className="text-sm text-muted-foreground">Sample Size</p>
                <p className="font-semibold">{experiment.sampleSize.toLocaleString()}</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Target className="h-5 w-5 text-muted-foreground mt-0.5" />
              <div>
                <p className="text-sm text-muted-foreground">Variants</p>
                <p className="font-semibold">{experiment.variants.length}</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Target className="h-5 w-5 text-muted-foreground mt-0.5" />
              <div>
                <p className="text-sm text-muted-foreground">Traffic Allocation</p>
                <p className="font-semibold">{experiment.trafficAllocation}%</p>
              </div>
            </div>
          </div>

          <div className="mt-6 pt-6 border-t border-border">
            <p className="text-sm text-muted-foreground mb-2">Hypothesis</p>
            <p className="text-base">{experiment.hypothesis}</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { FlaskConical, BarChart3, FileText, Settings } from "lucide-react"

export function Navigation() {
  return (
    <nav className="border-b border-border bg-card">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-8">
            <Link href="/" className="flex items-center gap-2">
              <FlaskConical className="h-6 w-6 text-primary" />
              <span className="font-bold text-xl">ExperimentLab</span>
            </Link>

            <div className="flex items-center gap-1">
              <Button variant="ghost" size="sm" asChild>
                <Link href="/">
                  <FlaskConical className="h-4 w-4 mr-2" />
                  Experiments
                </Link>
              </Button>
              <Button variant="ghost" size="sm" asChild>
                <Link href="/analytics">
                  <BarChart3 className="h-4 w-4 mr-2" />
                  Analytics
                </Link>
              </Button>
              <Button variant="ghost" size="sm" asChild>
                <Link href="/reports">
                  <FileText className="h-4 w-4 mr-2" />
                  Reports
                </Link>
              </Button>
              <Button variant="ghost" size="sm" asChild>
                <Link href="/config">
                  <Settings className="h-4 w-4 mr-2" />
                  Configuration
                </Link>
              </Button>
            </div>
          </div>

          <Button>New Experiment</Button>
        </div>
      </div>
    </nav>
  )
}

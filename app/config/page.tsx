import { Navigation } from "@/components/navigation"
import { ConfigurationForm } from "@/components/configuration-form"
import { ConfigTemplates } from "@/components/config-templates"

export default function ConfigPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-balance mb-2">Experiment Configuration</h1>
          <p className="text-muted-foreground text-lg">Set up new experiments and manage configurations</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <ConfigurationForm />
          </div>
          <div>
            <ConfigTemplates />
          </div>
        </div>
      </main>
    </div>
  )
}

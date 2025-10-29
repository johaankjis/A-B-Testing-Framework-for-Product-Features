import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { FileText, Download } from "lucide-react"

const templates = [
  {
    name: "Button Color Test",
    description: "Test different CTA button colors",
    variants: 2,
  },
  {
    name: "Pricing Page Layout",
    description: "Compare pricing table layouts",
    variants: 2,
  },
  {
    name: "Onboarding Flow",
    description: "Test different onboarding steps",
    variants: 3,
  },
  {
    name: "Email Campaign",
    description: "A/B test email subject lines",
    variants: 2,
  },
]

export function ConfigTemplates() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Templates</CardTitle>
          <CardDescription>Quick start with pre-configured experiments</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          {templates.map((template) => (
            <div
              key={template.name}
              className="p-3 border border-border rounded-lg hover:border-primary/50 transition-colors"
            >
              <div className="flex items-start justify-between mb-2">
                <div className="flex-1">
                  <h4 className="font-semibold text-sm">{template.name}</h4>
                  <p className="text-xs text-muted-foreground">{template.description}</p>
                </div>
                <FileText className="h-4 w-4 text-muted-foreground" />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs text-muted-foreground">{template.variants} variants</span>
                <Button variant="ghost" size="sm">
                  Use Template
                </Button>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Configuration Files</CardTitle>
          <CardDescription>Export and import experiment configs</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          <Button variant="outline" className="w-full bg-transparent">
            <Download className="h-4 w-4 mr-2" />
            Export Config (YAML)
          </Button>
          <Button variant="outline" className="w-full bg-transparent">
            <Download className="h-4 w-4 mr-2" />
            Export Config (JSON)
          </Button>

          <div className="pt-4 border-t border-border">
            <h4 className="font-semibold text-sm mb-2">Best Practices</h4>
            <ul className="space-y-1 text-xs text-muted-foreground">
              <li>• Run tests for at least 1-2 weeks</li>
              <li>• Ensure sufficient sample size</li>
              <li>• Test one variable at a time</li>
              <li>• Set clear success metrics</li>
              <li>• Document your hypothesis</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

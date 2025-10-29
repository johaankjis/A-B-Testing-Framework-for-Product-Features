"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Plus, Trash2, Save } from "lucide-react"

export function ConfigurationForm() {
  const [variants, setVariants] = useState([
    { name: "Control", traffic: 50, isControl: true },
    { name: "Variant A", traffic: 50, isControl: false },
  ])

  const addVariant = () => {
    setVariants([
      ...variants,
      { name: `Variant ${String.fromCharCode(65 + variants.length - 1)}`, traffic: 0, isControl: false },
    ])
  }

  const removeVariant = (index: number) => {
    if (variants.length > 2) {
      setVariants(variants.filter((_, i) => i !== index))
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Create New Experiment</CardTitle>
        <CardDescription>Configure your A/B test parameters</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="exp-name">Experiment Name</Label>
          <Input id="exp-name" placeholder="e.g., Homepage Hero Test" />
        </div>

        <div className="space-y-2">
          <Label htmlFor="description">Description</Label>
          <Textarea id="description" placeholder="Brief description of what you're testing" rows={3} />
        </div>

        <div className="space-y-2">
          <Label htmlFor="hypothesis">Hypothesis</Label>
          <Textarea
            id="hypothesis"
            placeholder="e.g., Changing the CTA button color to green will increase conversions by 10%"
            rows={3}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="start-date">Start Date</Label>
            <Input id="start-date" type="date" />
          </div>

          <div className="space-y-2">
            <Label htmlFor="traffic">Traffic Allocation (%)</Label>
            <Input id="traffic" type="number" min="0" max="100" defaultValue="100" />
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <Label>Variants</Label>
            <Button variant="outline" size="sm" onClick={addVariant}>
              <Plus className="h-4 w-4 mr-2" />
              Add Variant
            </Button>
          </div>

          <div className="space-y-3">
            {variants.map((variant, index) => (
              <div key={index} className="flex gap-3 p-3 border border-border rounded-lg">
                <div className="flex-1 space-y-2">
                  <Input placeholder="Variant name" value={variant.name} readOnly={variant.isControl} />
                </div>
                <div className="w-24 space-y-2">
                  <Input type="number" placeholder="%" value={variant.traffic} min="0" max="100" />
                </div>
                {!variant.isControl && variants.length > 2 && (
                  <Button variant="ghost" size="icon" onClick={() => removeVariant(index)}>
                    <Trash2 className="h-4 w-4 text-destructive" />
                  </Button>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="metric">Primary Metric</Label>
          <Select defaultValue="conversion">
            <SelectTrigger id="metric">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="conversion">Conversion Rate</SelectItem>
              <SelectItem value="revenue">Revenue Per User</SelectItem>
              <SelectItem value="engagement">Engagement Rate</SelectItem>
              <SelectItem value="retention">Retention Rate</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="sample-size">Target Sample Size</Label>
          <Input id="sample-size" type="number" placeholder="e.g., 10000" />
          <p className="text-xs text-muted-foreground">Use the sample size calculator in Analytics to determine this</p>
        </div>

        <div className="flex gap-3 pt-4">
          <Button className="flex-1">
            <Save className="h-4 w-4 mr-2" />
            Save as Draft
          </Button>
          <Button variant="default" className="flex-1">
            Launch Experiment
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

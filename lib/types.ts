export type ExperimentStatus = "draft" | "running" | "completed" | "paused"

export interface Experiment {
  id: string
  name: string
  description: string
  status: ExperimentStatus
  startDate: string
  endDate?: string
  hypothesis: string
  variants: Variant[]
  metrics: Metric[]
  sampleSize: number
  trafficAllocation: number
  createdAt: string
  updatedAt: string
}

export interface Variant {
  id: string
  name: string
  description: string
  trafficPercentage: number
  isControl: boolean
}

export interface Metric {
  id: string
  name: string
  type: "conversion" | "revenue" | "engagement" | "retention"
  description: string
  isPrimary: boolean
}

export interface ExperimentResult {
  experimentId: string
  variantId: string
  variantName: string
  sampleSize: number
  conversionRate: number
  mean: number
  standardDeviation: number
  confidenceInterval: [number, number]
  pValue: number
  statisticalSignificance: boolean
  relativeUplift: number
  absoluteUplift: number
}

export interface DailyMetric {
  date: string
  variantId: string
  variantName: string
  conversions: number
  users: number
  conversionRate: number
}

export interface StatisticalTest {
  testType: "ttest" | "ztest" | "chi-square"
  pValue: number
  confidenceLevel: number
  effectSize: number
  power: number
  minimumDetectableEffect: number
}

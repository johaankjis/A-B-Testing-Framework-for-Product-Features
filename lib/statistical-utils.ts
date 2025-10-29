export function calculateZScore(p1: number, p2: number, n1: number, n2: number): number {
  const pooledP = (p1 * n1 + p2 * n2) / (n1 + n2)
  const se = Math.sqrt(pooledP * (1 - pooledP) * (1 / n1 + 1 / n2))
  return (p2 - p1) / se
}

export function calculatePValue(zScore: number): number {
  // Two-tailed p-value approximation
  const x = Math.abs(zScore)
  const t = 1 / (1 + 0.2316419 * x)
  const d = 0.3989423 * Math.exp((-x * x) / 2)
  const p = d * t * (0.3193815 + t * (-0.3565638 + t * (1.781478 + t * (-1.821256 + t * 1.330274))))
  return 2 * p
}

export function calculateConfidenceInterval(
  proportion: number,
  sampleSize: number,
  confidenceLevel = 0.95,
): [number, number] {
  const z = confidenceLevel === 0.95 ? 1.96 : 2.576
  const se = Math.sqrt((proportion * (1 - proportion)) / sampleSize)
  const margin = z * se
  return [Math.max(0, proportion - margin), Math.min(1, proportion + margin)]
}

export function calculateSampleSizeNeeded(baselineRate: number, mde: number, alpha = 0.05, power = 0.8): number {
  const z_alpha = 1.96 // for alpha = 0.05
  const z_beta = 0.84 // for power = 0.8

  const p1 = baselineRate
  const p2 = baselineRate * (1 + mde)
  const p_avg = (p1 + p2) / 2

  const numerator = Math.pow(z_alpha + z_beta, 2) * (p1 * (1 - p1) + p2 * (1 - p2))
  const denominator = Math.pow(p2 - p1, 2)

  return Math.ceil(numerator / denominator)
}

export function getSignificanceLabel(pValue: number): {
  label: string
  color: string
} {
  if (pValue < 0.001) {
    return { label: "Highly Significant", color: "text-green-500" }
  } else if (pValue < 0.01) {
    return { label: "Very Significant", color: "text-green-400" }
  } else if (pValue < 0.05) {
    return { label: "Significant", color: "text-green-300" }
  } else if (pValue < 0.1) {
    return { label: "Marginally Significant", color: "text-yellow-500" }
  } else {
    return { label: "Not Significant", color: "text-muted-foreground" }
  }
}

export function formatPercentage(value: number, decimals = 2): string {
  return `${(value * 100).toFixed(decimals)}%`
}

export function formatNumber(value: number): string {
  return new Intl.NumberFormat("en-US").format(value)
}

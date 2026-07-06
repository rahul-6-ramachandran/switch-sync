import type { JobSource } from '@/types/job'

export function formatRelativeDate(iso: string): string {
  const date = new Date(iso)
  const now = new Date()
  const diffMs = now.getTime() - date.getTime()
  const diffMinutes = Math.round(diffMs / 60_000)
  const diffHours = Math.round(diffMinutes / 60)
  const diffDays = Math.round(diffHours / 24)

  if (diffMinutes < 1) return 'just now'
  if (diffMinutes < 60) return `${diffMinutes}m ago`
  if (diffHours < 24) return `${diffHours}h ago`
  if (diffDays < 30) return `${diffDays}d ago`

  return date.toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })
}

export const SOURCE_LABELS: Record<JobSource, string> = {
  greenhouse: 'Greenhouse',
  ashby: 'Ashby',
  lever: 'Lever',
  linkedin: 'LinkedIn',
  wellfound: 'Wellfound',
  other: 'Other',
}

export function formatSource(source: JobSource): string {
  return SOURCE_LABELS[source] ?? source
}

export function scoreTier(score: number): 'strong' | 'mid' | 'weak' {
  if (score >= 75) return 'strong'
  if (score >= 45) return 'mid'
  return 'weak'
}

export function formatNumber(value: number): string {
  return new Intl.NumberFormat(undefined, { notation: value >= 10_000 ? 'compact' : 'standard' }).format(
    value,
  )
}

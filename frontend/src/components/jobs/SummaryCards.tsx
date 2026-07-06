import { Briefcase, Globe, Building2, Radio } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import { formatNumber } from '@/utils/format'
import type { JobSummary } from '@/types/job'
import type { LucideIcon } from 'lucide-react'

interface SummaryCardsProps {
  summary?: JobSummary
  isLoading: boolean
}

interface StatDef {
  key: keyof JobSummary
  label: string
  icon: LucideIcon
  accent: string
}

const STATS: StatDef[] = [
  { key: 'totalJobs', label: 'Total jobs', icon: Briefcase, accent: 'var(--color-accent)' },
  { key: 'remoteJobs', label: 'Remote jobs', icon: Globe, accent: 'var(--color-signal-strong)' },
  { key: 'companies', label: 'Companies', icon: Building2, accent: 'var(--color-signal-mid)' },
  { key: 'sources', label: 'Sources', icon: Radio, accent: 'var(--color-text-secondary)' },
]

export function SummaryCards({ summary, isLoading }: SummaryCardsProps) {
  return (
    <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
      {STATS.map(({ key, label, icon: Icon, accent }) => (
        <Card key={key}>
          <CardContent className="flex items-center justify-between p-4">
            <div>
              <p className="text-xs font-medium uppercase tracking-wide text-[var(--color-text-muted)]">
                {label}
              </p>
              {isLoading || !summary ? (
                <Skeleton className="mt-2 h-7 w-14" />
              ) : (
                <p className="mt-1 font-mono text-2xl font-semibold text-[var(--color-text-primary)]">
                  {formatNumber(summary[key])}
                </p>
              )}
            </div>
            <div
              className="flex h-9 w-9 items-center justify-center rounded-md"
              style={{ backgroundColor: `${accent}1a` }}
            >
              <Icon className="h-4.5 w-4.5" style={{ color: accent }} />
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

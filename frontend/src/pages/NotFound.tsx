import { Link } from 'react-router-dom'
import { RadarMark } from '@/components/layout/RadarMark'
import { Button } from '@/components/ui/button'

export function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-[var(--color-canvas)] px-4 text-center">
      <RadarMark size={44} />
      <div className="space-y-1">
        <h1 className="text-lg font-semibold text-[var(--color-text-primary)]">Off the radar</h1>
        <p className="max-w-sm text-sm text-[var(--color-text-muted)]">
          This page doesn't exist. Let's get you back to the job listings.
        </p>
      </div>
      <Button asChild>
        <Link to="/">Back to dashboard</Link>
      </Button>
    </div>
  )
}

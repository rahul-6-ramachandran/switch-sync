import { cn } from '@/utils/cn'

interface RadarMarkProps {
  size?: number
  sweeping?: boolean
  className?: string
}

/**
 * The signature visual element of Job Radar: a small radar dish with a
 * continuously sweeping beam. Doubles as the brand mark in the header and
 * as an ambient loading indicator elsewhere in the app.
 */
export function RadarMark({ size = 28, sweeping = true, className }: RadarMarkProps) {
  return (
    <span
      className={cn('relative inline-flex shrink-0 items-center justify-center rounded-full', className)}
      style={{ width: size, height: size }}
    >
      <span className="absolute inset-0 rounded-full border border-[var(--color-border-hover)]" />
      <span className="absolute inset-[22%] rounded-full border border-[var(--color-border-hover)]" />
      <span
        className={cn(
          'absolute inset-0 origin-center rounded-full',
          sweeping && 'animate-radar-sweep',
        )}
        style={{
          background:
            'conic-gradient(from 0deg, var(--color-accent) 0deg, transparent 55deg, transparent 360deg)',
          maskImage: 'radial-gradient(circle, transparent 0%, black 35%, black 100%)',
          WebkitMaskImage: 'radial-gradient(circle, transparent 0%, black 35%, black 100%)',
        }}
      />
      <span className="relative h-[16%] w-[16%] rounded-full bg-[var(--color-accent)]" />
    </span>
  )
}

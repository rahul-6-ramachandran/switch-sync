import { Search } from 'lucide-react'
import { RadarMark } from './RadarMark'
import { Input } from '@/components/ui/input'

interface HeaderProps {
  search: string
  onSearchChange: (value: string) => void
}

export function Header({ search, onSearchChange }: HeaderProps) {
  return (
    <header className="sticky top-0 z-40 border-b border-[var(--color-border)] bg-[var(--color-canvas)]/85 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center gap-4 px-4 py-3 sm:px-6 lg:px-8">
        <div className="flex items-center gap-2.5">
          <RadarMark size={26} />
          <span className="text-[15px] font-semibold tracking-tight text-[var(--color-text-primary)]">
            HireScope
          </span>
        </div>

        <div className="relative ml-2 flex-1 max-w-xl">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--color-text-muted)]" />
          <Input
            value={search}
            onChange={(event) => onSearchChange(event.target.value)}
            placeholder="Search by title, company, or keyword…"
            className="pl-9"
            aria-label="Search jobs"
          />
        </div>

        <div className="hidden items-center gap-1.5 text-xs text-[var(--color-text-muted)] sm:flex">
          <span className="rounded border border-[var(--color-border)] px-1.5 py-0.5 font-mono">
            {new Date().toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
          </span>
        </div>
      </div>
    </header>
  )
}

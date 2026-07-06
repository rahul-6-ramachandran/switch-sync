import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface PaginationProps {
  page: number
  totalPages: number
  totalItems: number
  pageSize: number
  onPageChange: (page: number) => void
}

export function Pagination({ page, totalPages, totalItems, pageSize, onPageChange }: PaginationProps) {
  if (totalPages <= 1) return null

  const rangeStart = (page - 1) * pageSize + 1
  const rangeEnd = Math.min(page * pageSize, totalItems)

  const pageNumbers = getVisiblePages(page, totalPages)

  return (
    <div className="flex flex-col items-center justify-between gap-3 border-t border-[var(--color-border)] pt-4 sm:flex-row">
      <p className="text-xs text-[var(--color-text-muted)]">
        Showing <span className="font-mono text-[var(--color-text-secondary)]">{rangeStart}-{rangeEnd}</span>{' '}
        of <span className="font-mono text-[var(--color-text-secondary)]">{totalItems}</span> jobs
      </p>

      <div className="flex items-center gap-1">
        <Button
          variant="outline"
          size="icon"
          disabled={page <= 1}
          onClick={() => onPageChange(page - 1)}
          aria-label="Previous page"
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>

        {pageNumbers.map((pageNumber, index) =>
          pageNumber === 'ellipsis' ? (
            <span key={`ellipsis-${index}`} className="px-1 text-sm text-[var(--color-text-muted)]">
              …
            </span>
          ) : (
            <Button
              key={pageNumber}
              variant={pageNumber === page ? 'default' : 'outline'}
              size="icon"
              onClick={() => onPageChange(pageNumber)}
              aria-current={pageNumber === page ? 'page' : undefined}
            >
              {pageNumber}
            </Button>
          ),
        )}

        <Button
          variant="outline"
          size="icon"
          disabled={page >= totalPages}
          onClick={() => onPageChange(page + 1)}
          aria-label="Next page"
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}

function getVisiblePages(current: number, total: number): (number | 'ellipsis')[] {
  const delta = 1
  const pages: (number | 'ellipsis')[] = []

  const left = Math.max(2, current - delta)
  const right = Math.min(total - 1, current + delta)

  pages.push(1)
  if (left > 2) pages.push('ellipsis')
  for (let i = left; i <= right; i++) pages.push(i)
  if (right < total - 1) pages.push('ellipsis')
  if (total > 1) pages.push(total)

  return pages
}

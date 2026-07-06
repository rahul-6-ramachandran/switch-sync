import { JobCard } from './JobCard'
import { JobCardSkeleton } from './JobCardSkeleton'
import { EmptyState } from './EmptyState'
import type { Job } from '@/types/job'

interface JobGridProps {
  jobs: Job[]
  isLoading: boolean
  isError: boolean
  errorMessage?: string
  hasActiveFilters: boolean
  onClearFilters: () => void
  onRetry: () => void
}

export function JobGrid({
  jobs,
  isLoading,
  isError,
  errorMessage,
  hasActiveFilters,
  onClearFilters,
  onRetry,
}: JobGridProps) {
  if (isError) {
    return (
      <EmptyState
        title="Couldn't load jobs"
        description={errorMessage ?? 'The request failed. Check your connection and try again.'}
        actionLabel="Retry"
        onAction={onRetry}
      />
    )
  }

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-3">
        {Array.from({ length: 6 }).map((_, index) => (
          <JobCardSkeleton key={index} />
        ))}
      </div>
    )
  }

  if (jobs.length === 0) {
    return (
      <EmptyState
        title="No jobs match your filters"
        description={
          hasActiveFilters
            ? 'Try widening your search or clearing a few filters to see more results.'
            : 'Nothing is on the radar yet. Check back soon as new postings come in.'
        }
        actionLabel={hasActiveFilters ? 'Clear filters' : undefined}
        onAction={hasActiveFilters ? onClearFilters : undefined}
      />
    )
  }

  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-3">
      {jobs.map((job) => (
        <JobCard key={job.id} job={job} />
      ))}
    </div>
  )
}

import { useMemo, useState } from 'react'
import { Header } from '@/components/layout/Header'
import { SummaryCards } from '@/components/jobs/SummaryCards'
import { FilterPanel } from '@/components/filters/FilterPanel'
import { JobGrid } from '@/components/jobs/JobGrid'
import { Pagination } from '@/components/jobs/Pagination'
import { useJobs } from '@/hooks/useJobs'
import { useJobSummary } from '@/hooks/useJobSummary'
import { useFacetOptions } from '@/hooks/useFacetOptions'
import { useDebouncedValue } from '@/hooks/useDebouncedValue'
import type { JobFilters } from '@/types/job'

const DEFAULT_FILTERS: JobFilters = {
  search: '',
  company: null,
  source: null,
  remoteOnly: false,
  postedWithin: 'any',
  page: 1,
  pageSize: 12,
  experience: '',
}

export function Dashboard() {
  const [filters, setFilters] = useState<JobFilters>(DEFAULT_FILTERS)
  const debouncedSearch = useDebouncedValue(filters.search, 350)
  const effectiveFilters = useMemo(
    () => ({ ...filters, search: debouncedSearch }),
    [filters, debouncedSearch],
  )

  const jobsQuery = useJobs(effectiveFilters)
  const summaryQuery = useJobSummary()
  const facetsQuery = useFacetOptions()

  function patchFilters(patch: Partial<JobFilters>) {
    setFilters((prev) => ({ ...prev, ...patch }))
  }

  function resetFilters() {
    setFilters(DEFAULT_FILTERS)
  }

  const hasActiveFilters =
    Boolean(filters.company) ||
    Boolean(filters.source) ||
    filters.remoteOnly ||
    (filters.postedWithin && filters.postedWithin !== 'any') ||
    Boolean(filters.search) ||
    Boolean(filters.experience) 

  const jobs = jobsQuery.data?.items ?? []

  return (
    <div className="min-h-screen bg-[var(--color-canvas)]">
      <Header search={filters.search} onSearchChange={(value) => patchFilters({ search: value, page: 1 })} />

      <main className="mx-auto flex max-w-7xl flex-col gap-6 px-4 py-6 sm:px-6 lg:px-8">
        <SummaryCards summary={summaryQuery.data} isLoading={summaryQuery.isLoading} />

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-[260px_1fr]">
          <FilterPanel
            filters={filters}
            facets={facetsQuery.data}
            onChange={patchFilters}
            onReset={resetFilters}
          />

          <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <p className="text-sm text-[var(--color-text-secondary)]">
                {jobsQuery.data ? (
                  <>
                    <span className="font-mono font-medium text-[var(--color-text-primary)]">
                      {jobsQuery.data.total}
                    </span>{' '}
                    jobs on the radar
                  </>
                ) : (
                  'Scanning for jobs…'
                )}
              </p>
            </div>

            <JobGrid
              jobs={jobs}
              isLoading={jobsQuery.isLoading}
              isError={jobsQuery.isError}
              errorMessage={jobsQuery.error?.message}
              hasActiveFilters={hasActiveFilters}
              onClearFilters={resetFilters}
              onRetry={() => jobsQuery.refetch()}
            />

            {jobsQuery.data && (
              <Pagination
                page={jobsQuery.data.page}
                totalPages={jobsQuery.data.totalPages}
                totalItems={jobsQuery.data.total}
                pageSize={jobsQuery.data.pageSize}
                onPageChange={(page) => patchFilters({ page })}
              />
            )}
          </div>
        </div>
      </main>
    </div>
  )
}

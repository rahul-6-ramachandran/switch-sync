import { useQuery } from '@tanstack/react-query'
import { fetchJobs } from '@/api/jobs'
import type { JobFilters } from '@/types/job'

export function useJobs(filters: JobFilters) {
  return useQuery({
    queryKey: [
      'jobs',
      {
        page: filters.page,
        pageSize: filters.pageSize,
        search: filters.search.trim(),
        company: filters.company,
        source: filters.source,
        remoteOnly: filters.remoteOnly,
        postedWithin: filters.postedWithin,
        experience: filters.experience,
      },
    ],
    queryFn: () => fetchJobs(filters),
    placeholderData: (previousData) => previousData,
    staleTime: 30_000,
  })
}

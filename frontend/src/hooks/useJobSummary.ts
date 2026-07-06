import { useQuery } from '@tanstack/react-query'
import { fetchJobSummary } from '@/api/jobs'

export function useJobSummary() {
  return useQuery({
    queryKey: ['jobs', 'summary'],
    queryFn: fetchJobSummary,
    staleTime: 60_000,
  })
}

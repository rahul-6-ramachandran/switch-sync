import { useQuery } from '@tanstack/react-query'
import { fetchFacetOptions } from '@/api/jobs'

export function useFacetOptions() {
  return useQuery({
    queryKey: ['jobs', 'facets'],
    queryFn: fetchFacetOptions,
    staleTime: 5 * 60_000,
  })
}

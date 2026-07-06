import { apiClient } from './client'

import type {  JobFilters,  PaginatedResponse, Job } from '@/types/job'




function buildParams(filters: JobFilters) {
  const params: Record<string, string | number | boolean> = {
    page: filters.page,
    limit: filters.pageSize,
  }

  if (filters.search.trim()) {
    params.q = filters.search.trim()
  }

  if (filters.company) {
    params.company = filters.company
  }

  if (filters.source) {
    params.source = filters.source
  }

  if (filters.remoteOnly) {
    params.remote = true
  }

  if (filters.experience) {
    params.experience = filters.experience;
  }

  switch (filters.postedWithin) {
    case '24h':
      params.postedWithinDays = 1
      break

    case '7d':
      params.postedWithinDays = 7
      break

    case '30d':
      params.postedWithinDays = 30
      break
  }

  return params
}


export async function fetchJobs(
    filters: JobFilters,
): Promise<PaginatedResponse<Job>> {

    const { data } = await apiClient.get("/jobs", {
        params: buildParams(filters),
    });

    return {
        items: data.jobs,
        total: data.total,
        page: data.page,
        pageSize: data.limit,
        totalPages: data.totalPages,
    };
}

export async function fetchJobSummary() {
    const { data } =
        await apiClient.get("/jobs/summary");

    return data;
}

export async function fetchFacetOptions() {
    const { data } =
        await apiClient.get("/jobs/facets");

    return data;
}

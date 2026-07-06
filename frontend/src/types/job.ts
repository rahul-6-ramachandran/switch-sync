export type JobSource = 'greenhouse' | 'ashby' | 'lever' | 'linkedin' | 'wellfound' | 'other' | string
export interface Job {
  id: string

  source: string

  externalJobId: string

  companyName: string

  title: string

  location?: string | null

  remoteStatus: boolean

  experienceLevel?: 'junior' | 'mid' | 'senior' | null

  applicationUrl: string

  postedAt?: string | null

  createdAt: string

  updatedAt: string

  score: number
}
export interface JobFilters {
  search: string
  company: string | null
  source: JobSource | null
  remoteOnly: boolean
  postedWithin: PostedWithin | null
  page: number
  pageSize: number
  experience: '' | 'junior' | 'mid' | 'senior'
}

export type PostedWithin = '24h' | '7d' | '30d' | 'any'

export interface PaginatedResponse<T> {
  items: T[]
  total: number
  page: number
  pageSize: number
  totalPages: number
}

export interface JobSummary {
  totalJobs: number
  remoteJobs: number
  companies: number
  sources: number
}

export interface FacetOptions {
  companies: string[]
  sources: JobSource[]
}

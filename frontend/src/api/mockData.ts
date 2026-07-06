import type { Job, JobSource } from '@/types/job'

const SOURCES: JobSource[] = ['greenhouse', 'ashby', 'lever', 'linkedin', 'wellfound']
const COMPANIES = [
  'Stripe',
  'Vercel',
  'Linear',
  'Figma',
  'Anthropic',
  'Ramp',
  'Retool',
  'Notion',
  'Supabase',
  'Cloudflare',
]
const TITLES = [
  'Backend Engineer',
  'Senior Full-Stack Engineer',
  'Platform Engineer',
  'Node.js Engineer',
  'Staff Software Engineer',
  'Infrastructure Engineer',
  'Founding Engineer',
  'API Engineer',
]
const LOCATIONS = ['San Francisco, CA', 'New York, NY', 'Remote — US', 'Remote — Worldwide', 'Bengaluru, IN', 'London, UK']
const TAGS = ['Node.js', 'PostgreSQL', 'TypeScript', 'AWS', 'Redis', 'GraphQL', 'Kubernetes', 'React']

function seededRandom(seed: number) {
  let value = seed
  return () => {
    value = (value * 9301 + 49297) % 233280
    return value / 233280
  }
}

function generateMockJobs(count: number): Job[] {
  const random = seededRandom(42)
  return Array.from({ length: count }, (_, index) => {
    const company = COMPANIES[Math.floor(random() * COMPANIES.length)]
    const title = TITLES[Math.floor(random() * TITLES.length)]
    const location = LOCATIONS[Math.floor(random() * LOCATIONS.length)]
    const source = SOURCES[Math.floor(random() * SOURCES.length)]
    const remote = location.toLowerCase().includes('remote') || random() > 0.6
    const score = Math.floor(random() * 100)
    const daysAgo = Math.floor(random() * 20)
    const tagCount = 2 + Math.floor(random() * 3)
    const tags = Array.from(new Set(Array.from({ length: tagCount }, () => TAGS[Math.floor(random() * TAGS.length)])))

    return {
      id: `job-${index + 1}`,
      title,
      company,
      location,
      remote,
      source,
      score,
      postedAt: new Date(Date.now() - daysAgo * 86_400_000).toISOString(),
      applyUrl: 'https://example.com/apply',
      tags,
    }
  })
}

export const MOCK_JOBS: Job[] = generateMockJobs(87)
export const MOCK_COMPANIES = COMPANIES
export const MOCK_SOURCES = SOURCES

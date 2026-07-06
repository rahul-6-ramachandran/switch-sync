# Job Radar

A dark, minimal job-tracking dashboard built with React, Vite, and TypeScript — inspired by the density and restraint of Linear and GitHub.

## Stack

- **React 19 + Vite + TypeScript**
- **Tailwind CSS v4** (CSS-first config via `@theme` in `src/index.css`)
- **shadcn/ui-style components** built on Radix primitives (Select, Checkbox, Label, Slot)
- **React Router** for routing
- **TanStack Query** for data fetching, caching, and pagination
- **Axios** for HTTP
- **Lucide React** for icons

No Redux — all server state lives in TanStack Query; local UI state (filters, search) is plain `useState`.

## Getting started

```bash
npm install
npm run dev
```

The app runs against **mock data** by default (see `.env.local`, `VITE_USE_MOCKS=true`), so it's fully explorable without a backend.

To point it at a real API, set:

```bash
# .env.local
VITE_USE_MOCKS=false
VITE_API_BASE_URL=https://your-api.example.com/api
```

## Expected API contract

| Endpoint | Method | Query params | Returns |
|---|---|---|---|
| `/jobs` | GET | `page`, `pageSize`, `search?`, `company?`, `source?`, `remote?`, `postedWithin?` | `PaginatedResponse<Job>` |
| `/jobs/summary` | GET | — | `JobSummary` |
| `/jobs/facets` | GET | — | `FacetOptions` |

Types are defined in `src/types/job.ts`.

## Project structure

```
src/
  api/          Axios client + typed API calls (+ mock data for demos)
  components/
    ui/         Reusable shadcn-style primitives (Button, Card, Input, Select...)
    layout/     Header, RadarMark (brand/loading motif)
    jobs/       SummaryCards, JobCard, JobGrid, ScoreBadge, Pagination, EmptyState
    filters/    FilterPanel (company, source, remote, posted-within)
  hooks/        useJobs, useJobSummary, useFacetOptions, useDebouncedValue
  pages/        Dashboard, NotFound
  types/        Shared TypeScript types
  utils/        cn() class merge helper, formatting helpers
```

## Design notes

- **Palette**: near-black canvas/surface layers with a violet-blue accent (`#6e5bff`) reserved for interactive/primary elements.
- **Type**: Inter for UI text, JetBrains Mono for scores, badges, and dates -- anything that reads like data.
- **Signature element**: the `RadarMark` -- a small sweeping radar dish used as the logo and as an ambient empty/loading motif -- and the score badge, styled as radar "signal bars" rather than a generic percentage pill.
- Respects `prefers-reduced-motion` (sweep animation and skeleton shimmer are disabled).

## Extending

- Swap mock data for a real backend by implementing the three endpoints above.
- Add new filters by extending `JobFilters` in `types/job.ts`, `FilterPanel`, and `buildParams` in `api/jobs.ts`.
- Add new card metadata by extending the `Job` type and `JobCard`.

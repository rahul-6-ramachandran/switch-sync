import { SlidersHorizontal, RotateCcw } from 'lucide-react'
import { Label } from '@/components/ui/label'
import { Checkbox } from '@/components/ui/checkbox'
import { Button } from '@/components/ui/button'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

import { formatSource } from '@/utils/format'

import type { JobFilters, PostedWithin, FacetOptions } from '@/types/job'

interface FilterPanelProps {
  filters: JobFilters
  facets?: FacetOptions
  onChange: (patch: Partial<JobFilters>) => void
  onReset: () => void
}

const ALL = '__all__'

const POSTED_WITHIN_OPTIONS: { value: PostedWithin; label: string }[] = [
  { value: 'any', label: 'Any time' },
  { value: '24h', label: 'Past 24 hours' },
  { value: '7d', label: 'Past 7 days' },
  { value: '30d', label: 'Past 30 days' },
]

const EXPERIENCE_OPTIONS = [
  {
    value: '',
    label: 'All Levels',
  },
  {
    value: 'junior',
    label: 'Junior',
  },
  {
    value: 'mid',
    label: 'Mid',
  },
  {
    value: 'senior',
    label: 'Senior',
  },
]

export function FilterPanel({
  filters,
  facets,
  onChange,
  onReset,
}: FilterPanelProps) {
  const hasActiveFilters =
    Boolean(filters.company) ||
    Boolean(filters.source) ||
    Boolean(filters.experience) ||
    filters.remoteOnly ||
    (filters.postedWithin &&
      filters.postedWithin !== 'any')

  return (
    <aside className="rounded-xl border bg-card p-5 shadow-sm">

      {/* Header */}

      <div className="mb-6 flex items-center justify-between border-b pb-4">

        <div className="flex items-center gap-3">

          <div className="rounded-lg bg-primary/10 p-2">

            <SlidersHorizontal className="h-5 w-5 text-primary" />

          </div>

          <div>

            <h3 className="text-sm font-semibold">
              Filters
            </h3>

            <p className="text-xs text-muted-foreground">
              Narrow your search
            </p>

          </div>

        </div>

        {hasActiveFilters && (
          <Button
            variant="ghost"
            size="sm"
            onClick={onReset}
            className="gap-2 text-xs"
          >
            <RotateCcw className="h-3.5 w-3.5" />
            Reset
          </Button>
        )}

      </div>

      <div className="space-y-5">

        {/* Company */}

        <div className="space-y-2">

          <Label htmlFor="filter-company">
            Company
          </Label>

          <Select
            value={filters.company ?? ALL}
            onValueChange={(value) =>
              onChange({
                company: value === ALL ? null : value,
                page: 1,
              })
            }
          >
            <SelectTrigger id="filter-company">
              <SelectValue placeholder="All companies" />
            </SelectTrigger>

            <SelectContent className="max-h-80 overflow-y-auto">

              <SelectItem value={ALL}>
                All companies
              </SelectItem>

              {facets?.companies?.map((company:string) => (
                <SelectItem
                  key={company}
                  value={company}
                >
                  {company}
                </SelectItem>
              ))}

            </SelectContent>

          </Select>

        </div>

        {/* Experience */}

        <div className="space-y-2">

          <Label htmlFor="filter-experience">
            Experience
          </Label>

          <Select
            value={filters.experience || ALL}
            onValueChange={(value) =>
              onChange({
                experience:
                  value === ALL
                    ? ''
                    : (value as JobFilters['experience']),
                page: 1,
              })
            }
          >
            <SelectTrigger id="filter-experience">
              <SelectValue placeholder="All Levels" />
            </SelectTrigger>

            <SelectContent>

              <SelectItem value={ALL}>
                All Levels
              </SelectItem>

              {EXPERIENCE_OPTIONS.slice(1).map((level) => (
                <SelectItem
                  key={level.value}
                  value={level.value}
                >
                  {level.label}
                </SelectItem>
              ))}

            </SelectContent>

          </Select>

        </div>

        {/* Source */}

        <div className="space-y-2">

          <Label htmlFor="filter-source">
            Source
          </Label>

          <Select
            value={filters.source ?? ALL}
            onValueChange={(value) =>
              onChange({
                source:
                  value === ALL
                    ? null
                    : (value as JobFilters['source']),
                page: 1,
              })
            }
          >
            <SelectTrigger id="filter-source">
              <SelectValue placeholder="All sources" />
            </SelectTrigger>

            <SelectContent>

              <SelectItem value={ALL}>
                All sources
              </SelectItem>

              {facets?.sources?.map((source: string) => (
                <SelectItem
                  key={source}
                  value={source}
                >
                  {formatSource(source)}
                </SelectItem>
              ))}

            </SelectContent>

          </Select>

        </div>

        {/* Posted */}

        <div className="space-y-2">

          <Label htmlFor="filter-posted">
            Posted Within
          </Label>

          <Select
            value={filters.postedWithin ?? 'any'}
            onValueChange={(value) =>
              onChange({
                postedWithin:
                  value as PostedWithin,
                page: 1,
              })
            }
          >
            <SelectTrigger id="filter-posted">
              <SelectValue placeholder="Any time" />
            </SelectTrigger>

            <SelectContent>

              {POSTED_WITHIN_OPTIONS.map(
                (option) => (
                  <SelectItem
                    key={option.value}
                    value={option.value}
                  >
                    {option.label}
                  </SelectItem>
                ),
              )}

            </SelectContent>

          </Select>

        </div>

        {/* Remote */}

        <div className="rounded-lg border bg-muted/40 p-3 transition-colors hover:bg-muted/60">

          <label
            htmlFor="filter-remote"
            className="flex cursor-pointer items-center justify-between"
          >

            <div>

              <p className="text-sm font-medium">
                Remote Only
              </p>

              <p className="text-xs text-muted-foreground">
                Show fully remote roles
              </p>

            </div>

            <Checkbox
              id="filter-remote"
              checked={filters.remoteOnly}
              onCheckedChange={(checked) =>
                onChange({
                  remoteOnly:
                    checked === true,
                  page: 1,
                })
              }
            />

          </label>

        </div>

      </div>

    </aside>
  )
}
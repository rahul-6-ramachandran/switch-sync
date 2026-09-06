import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Building2,
  MapPin,
  Clock3,
  Globe2,
  ArrowRight,
  Info,
  RotateCcw,
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ScoreBadge } from "@/components/jobs/ScoreBadge";
import { ExperienceBadge } from "@/components/jobs/ExperienceBadge";
import { formatSource, formatRelativeDate } from "@/utils/format";
import { useJobs } from "@/hooks/useJobs";
import type { Job } from "@/types/job";
import { MOCK_LANDING_JOBS, type LandingJob } from "../data/mockLandingJobs";

function getJobSkills(job: Job | LandingJob): string[] {
  if ("skills" in job && Array.isArray((job as LandingJob).skills)) {
    return (job as LandingJob).skills;
  }
  const title = (job.title || "").toLowerCase();
  const inferred: string[] = [];
  if (title.includes("backend") || title.includes("back-end")) inferred.push("Go", "Node.js", "PostgreSQL");
  else if (title.includes("frontend") || title.includes("front-end")) inferred.push("React", "TypeScript", "Next.js");
  else if (title.includes("full") || title.includes("fullstack")) inferred.push("TypeScript", "React", "Node.js");
  else if (title.includes("infra") || title.includes("devops") || title.includes("platform")) inferred.push("Kubernetes", "AWS", "Terraform");
  else if (title.includes("data")) inferred.push("Python", "SQL", "Kafka");
  else inferred.push("TypeScript", "Cloud", "API");
  return inferred;
}

function getDepartment(job: Job | LandingJob): string {
  if ("department" in job && (job as LandingJob).department) {
    return (job as LandingJob).department;
  }
  return "Engineering";
}

export function JobFeedPreview() {
  const [filter, setFilter] = useState<"all" | "remote" | "senior" | "mid" | "junior">("all");

  // Call real API
  const jobsQuery = useJobs({
    page: 1,
    pageSize: 6,
    search: "",
    company: null,
    source: null,
    remoteOnly: filter === "remote",
    postedWithin: "any",
    experience: filter === "senior" || filter === "mid" || filter === "junior" ? filter : "",
  });

  const apiJobs = jobsQuery.data?.items ?? [];
  const hasLiveJobs = apiJobs.length > 0;
  const isDemo = !hasLiveJobs;

  // Filter sample jobs if in demo mode
  const filteredSampleJobs = MOCK_LANDING_JOBS.filter((job) => {
    if (filter === "remote") return job.remoteStatus;
    if (filter === "senior") return job.experienceLevel === "senior";
    if (filter === "mid") return job.experienceLevel === "mid";
    if (filter === "junior") return job.experienceLevel === "junior";
    return true;
  });

  // Decide which jobs to show: live jobs first, otherwise sample jobs
  const displayJobs = hasLiveJobs ? apiJobs : filteredSampleJobs;

  return (
    <section id="preview" className="relative border-t border-[var(--color-border)] bg-[#090a0d] py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header and Filter bar */}
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs font-semibold uppercase tracking-widest text-[var(--color-accent)]">
                Job Radar Feed
              </span>

              {/* Live or Sample Status Badge */}
              {hasLiveJobs ? (
                <span className="flex items-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2.5 py-0.5 text-[11px] font-mono text-emerald-400">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  Live ATS Feed ({jobsQuery.data?.total} jobs)
                </span>
              ) : (
                <span className="flex items-center gap-1.5 rounded-full border border-amber-500/30 bg-amber-500/10 px-2.5 py-0.5 text-[11px] font-mono text-amber-400">
                  <span className="h-1.5 w-1.5 rounded-full bg-amber-400" />
                  Sample / Demo Data
                </span>
              )}
            </div>

            <h2 className="mt-2 text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Fresh opportunities.
            </h2>

            <p className="mt-2 text-sm text-[var(--color-text-secondary)] sm:text-base">
              {hasLiveJobs
                ? "Live engineering postings continuously fetched from company ATS endpoints."
                : "Curated sample preview of software engineering positions matching our scoring pipeline."}
            </p>
          </div>

          {/* Quick Filter Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-2 md:pb-0 scrollbar-none">
            {(["all", "remote", "senior", "mid", "junior"] as const).map((t) => (
              <button
                key={t}
                type="button"
                onClick={() => setFilter(t)}
                className={`rounded-lg px-3.5 py-1.5 text-xs font-medium capitalize transition-colors ${
                  filter === t
                    ? "bg-[var(--color-accent)] text-white shadow-sm"
                    : "border border-[var(--color-border)] bg-[#12131a] text-[var(--color-text-secondary)] hover:text-white"
                }`}
              >
                {t === "all" ? "All Roles" : t}
              </button>
            ))}
          </div>
        </div>

        {/* Demo / Empty DB Notice Banner */}
        {isDemo && (
          <div className="mt-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 rounded-xl border border-amber-500/25 bg-amber-500/5 px-4 py-3 text-xs text-amber-300">
            <div className="flex items-center gap-2">
              <Info className="h-4 w-4 shrink-0 text-amber-400" />
              <span>
                <strong>Sample Preview:</strong> Showing interactive demo listings so you can test search and filters.
              </span>
            </div>
            <Link
              to="/dashboard"
              className="inline-flex items-center gap-1 font-semibold text-amber-400 hover:text-amber-300 underline shrink-0"
            >
              <span>Go to live dashboard</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        )}

        {/* Job Cards Grid or Empty State Warning */}
        {displayJobs.length === 0 ? (
          <div className="mt-12 flex flex-col items-center justify-center rounded-2xl border border-[var(--color-border)] bg-[#0e0f16] p-10 text-center">
            <div className="flex h-12 w-12 items-center justify-center rounded-full border border-[var(--color-border)] bg-[#14151f] text-[var(--color-text-muted)]">
              <Info className="h-5 w-5" />
            </div>
            <h3 className="mt-4 text-base font-semibold text-white">
              No jobs matching this filter
            </h3>
            <p className="mt-1 max-w-sm text-xs text-[var(--color-text-secondary)]">
              No positions found for the &ldquo;{filter}&rdquo; filter. Reset to view all available listings.
            </p>
            <Button
              onClick={() => setFilter("all")}
              size="sm"
              variant="outline"
              className="mt-5 text-xs gap-1.5"
            >
              <RotateCcw className="h-3.5 w-3.5" />
              <span>Reset filter</span>
            </Button>
          </div>
        ) : (
          <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {displayJobs.map((job) => {
              const skills = getJobSkills(job);
              const department = getDepartment(job);

              return (
                <Card
                  key={job.id}
                  className="group flex flex-col justify-between rounded-xl border border-[var(--color-border)] bg-[#0e0f16] p-5 transition-all duration-200 hover:border-[var(--color-accent)]/40 hover:bg-[#13141e] hover:shadow-xl hover:shadow-black/40"
                >
                  <div>
                    {/* Card Top: Title & Score */}
                    <div className="flex items-start justify-between gap-3">
                      <div className="space-y-1">
                        <h3 className="line-clamp-2 text-base font-semibold text-white group-hover:text-[var(--color-accent-hover)] transition-colors">
                          {job.title}
                        </h3>
                        <div className="flex items-center gap-2 text-xs text-[var(--color-text-secondary)]">
                          <Building2 className="h-3.5 w-3.5 text-[var(--color-text-muted)]" />
                          <span className="font-medium text-white">{job.companyName}</span>
                          <span className="text-[var(--color-text-muted)]">•</span>
                          <span className="text-[var(--color-text-muted)]">{department}</span>
                        </div>
                      </div>

                      <ScoreBadge score={job.score} />
                    </div>

                    {/* Metadata Pills */}
                    <div className="mt-4 flex flex-wrap items-center gap-1.5">
                      <Badge
                        variant="default"
                        className="border-[var(--color-border)] bg-[#181924] text-[11px] text-[var(--color-text-secondary)] font-normal"
                      >
                        <MapPin className="mr-1 h-3 w-3 text-[var(--color-text-muted)]" />
                        <span className="truncate max-w-[130px]">{job.location || "Remote / Unspecified"}</span>
                      </Badge>

                      {job.remoteStatus && (
                        <Badge className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-[11px] font-normal">
                          <Globe2 className="mr-1 h-3 w-3" />
                          Remote
                        </Badge>
                      )}

                      <ExperienceBadge level={job.experienceLevel} />

                      <Badge
                        variant="mid"
                        className="text-[10px] font-mono uppercase tracking-wider"
                      >
                        {formatSource(job.source)}
                      </Badge>
                    </div>

                    {/* Skills tags */}
                    <div className="mt-3 flex flex-wrap gap-1">
                      {skills.slice(0, 4).map((skill) => (
                        <span
                          key={skill}
                          className="rounded bg-[#171822] px-2 py-0.5 font-mono text-[10px] text-[var(--color-text-muted)] border border-[var(--color-border)]/60"
                        >
                          {skill}
                        </span>
                      ))}
                      {skills.length > 4 && (
                        <span className="rounded bg-[#171822] px-1.5 py-0.5 font-mono text-[10px] text-[var(--color-text-muted)]">
                          +{skills.length - 4}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Card Footer: Timestamp & Action */}
                  <div className="mt-6 flex items-center justify-between border-t border-[var(--color-border)]/60 pt-4 text-xs">
                    <div className="flex items-center gap-1.5 text-[var(--color-text-muted)]">
                      <Clock3 className="h-3.5 w-3.5" />
                      <span>{job.postedAt ? formatRelativeDate(job.postedAt) : "Recently"}</span>
                    </div>

                    <Button
                      asChild
                      size="sm"
                      variant="secondary"
                      className="h-8 rounded-lg border-[var(--color-border)] bg-[#1a1b26] text-xs font-medium text-white hover:bg-[var(--color-accent)] hover:border-[var(--color-accent)] transition-colors"
                    >
                      <Link to="/dashboard">
                        View Job
                        <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
                      </Link>
                    </Button>
                  </div>
                </Card>
              );
            })}
          </div>
        )}

        {/* View All CTA */}
        <div className="mt-14 flex flex-col items-center justify-center gap-4 text-center">
          <Button
            asChild
            size="default"
            className="group h-12 rounded-xl bg-[var(--color-accent)] px-8 text-sm font-semibold text-white shadow-lg shadow-[var(--color-accent)]/20 transition-all hover:bg-[var(--color-accent-hover)] hover:shadow-xl hover:shadow-[var(--color-accent)]/30 active:scale-[0.98]"
          >
            <Link to="/dashboard" className="flex items-center gap-2">
              <span>View All Jobs on Dashboard</span>
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>
          <span className="text-xs text-[var(--color-text-muted)]">
            Explore 200+ actively monitored company careers with full filter & search capabilities.
          </span>
        </div>
      </div>
    </section>
  );
}

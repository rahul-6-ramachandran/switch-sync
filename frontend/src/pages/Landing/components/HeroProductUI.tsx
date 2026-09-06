import { useState, useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import {
  Search,
  SlidersHorizontal,
  MapPin,
  Building2,
  Clock,
  Sparkles,
  ChevronRight,
  Info,
  RotateCcw,
  Play,
  Pause,
} from "lucide-react";
import { ScoreBadge } from "@/components/jobs/ScoreBadge";
import { ExperienceBadge } from "@/components/jobs/ExperienceBadge";
import { Badge } from "@/components/ui/badge";
import { formatSource, formatRelativeDate } from "@/utils/format";
import { useJobs } from "@/hooks/useJobs";
import type { Job } from "@/types/job";
import { MOCK_LANDING_JOBS, type LandingJob } from "../data/mockLandingJobs";

interface DemoScenario {
  query: string;
  tag: string;
  tab: "all" | "remote" | "senior";
  filterTerm: string;
}

const DEMO_SCENARIOS: DemoScenario[] = [
  {
    query: "Backend Engineer",
    tag: "Go",
    tab: "all",
    filterTerm: "backend",
  },
  {
    query: "Distributed Systems",
    tag: "Distributed Systems",
    tab: "remote",
    filterTerm: "distributed",
  },
  {
    query: "Full Stack Product",
    tag: "TypeScript",
    tab: "all",
    filterTerm: "product",
  },
  {
    query: "Staff Infrastructure",
    tag: "Kubernetes",
    tab: "senior",
    filterTerm: "infrastructure",
  },
];

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

export function HeroProductUI() {
  const [scenarioIndex, setScenarioIndex] = useState(0);
  const [displayText, setDisplayText] = useState("Backend Engineer");
  const [isTypingPhase, setIsTypingPhase] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const [selectedTag, setSelectedTag] = useState<string>("All");
  const [activeTab, setActiveTab] = useState<"all" | "remote" | "senior">("all");

  const filterTags = ["All", "Go", "TypeScript", "Distributed Systems", "Kubernetes", "PostgreSQL"];

  const currentScenario = DEMO_SCENARIOS[scenarioIndex];

  // Auto-typing animation engine
  useEffect(() => {
    if (!isAutoPlaying) return;

    // Respect user's motion preferences
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setDisplayText(currentScenario.query);
      return;
    }

    let timeoutId: ReturnType<typeof setTimeout>;
    const targetText = currentScenario.query;

    if (!isTypingPhase) {
      // Pause at full text so user can review the results
      timeoutId = setTimeout(() => {
        setIsTypingPhase(true);
      }, 3000);
    } else {
      // Typing or Deleting
      if (displayText.length > 0 && targetText !== displayText) {
        // Backspacing previous query
        timeoutId = setTimeout(() => {
          setDisplayText((prev) => prev.slice(0, -1));
        }, 30);
      } else if (displayText.length === 0) {
        // Pause briefly before typing next
        timeoutId = setTimeout(() => {
          const nextIndex = (scenarioIndex + 1) % DEMO_SCENARIOS.length;
          setScenarioIndex(nextIndex);
          const nextScenario = DEMO_SCENARIOS[nextIndex];
          setActiveTab(nextScenario.tab);
          setSelectedTag(nextScenario.tag);
          setDisplayText(nextScenario.query[0]);
        }, 300);
      } else if (displayText.length < targetText.length) {
        // Typing characters
        timeoutId = setTimeout(() => {
          setDisplayText(targetText.slice(0, displayText.length + 1));
        }, 60);
      } else {
        // Just finished typing
        setIsSearching(true);
        setTimeout(() => setIsSearching(false), 300);
        setIsTypingPhase(false);
      }
    }

    return () => clearTimeout(timeoutId);
  }, [isAutoPlaying, isTypingPhase, displayText, scenarioIndex, currentScenario]);

  // Handle manual interaction: pause auto-play so user has full control
  const handleUserInteract = () => {
    if (isAutoPlaying) {
      setIsAutoPlaying(false);
    }
  };

  // Query live jobs from API
  const jobsQuery = useJobs({
    page: 1,
    pageSize: 4,
    search: displayText.trim(),
    company: null,
    source: null,
    remoteOnly: activeTab === "remote",
    postedWithin: "any",
    experience: activeTab === "senior" ? "senior" : "",
  });

  const apiJobs = jobsQuery.data?.items ?? [];
  const hasLiveJobs = apiJobs.length > 0;

  // Filter sample jobs for fallback demo
  const filteredSampleJobs: LandingJob[] = useMemo(() => {
    const term = (isAutoPlaying ? currentScenario.filterTerm : displayText).toLowerCase().trim();

    return MOCK_LANDING_JOBS.filter((job) => {
      if (activeTab === "remote" && !job.remoteStatus) return false;
      if (activeTab === "senior" && job.experienceLevel !== "senior") return false;
      if (selectedTag !== "All" && !job.skills.includes(selectedTag)) return false;

      if (term) {
        const matchesTitle = job.title.toLowerCase().includes(term);
        const matchesSkills = job.skills.some((s) => s.toLowerCase().includes(term));
        const matchesDept = job.department.toLowerCase().includes(term);
        if (!matchesTitle && !matchesSkills && !matchesDept) return false;
      }
      return true;
    });
  }, [activeTab, selectedTag, isAutoPlaying, currentScenario, displayText]);

  // Choose source
  const displayJobs = (hasLiveJobs ? apiJobs : filteredSampleJobs).slice(0, 3);

  return (
    <div className="relative mx-auto w-full max-w-5xl">
      {/* Ambient background glow effect */}
      <div className="pointer-events-none absolute -inset-4 rounded-3xl bg-gradient-to-b from-[var(--color-accent)]/15 via-[var(--color-accent)]/5 to-transparent blur-2xl -z-10" />

      {/* Main Container Card */}
      <div className="overflow-hidden rounded-2xl border border-[var(--color-border)] bg-[#0d0e14]/95 shadow-2xl shadow-black/80 backdrop-blur-xl transition-all duration-300">
        {/* Mock Window Titlebar */}
        <div className="flex items-center justify-between border-b border-[var(--color-border)] bg-[#0a0a0d] px-4 py-3 sm:px-6">
          <div className="flex items-center gap-2">
            <div className="flex gap-1.5">
              <span className="h-3 w-3 rounded-full bg-red-500/30 border border-red-500/50 inline-block" />
              <span className="h-3 w-3 rounded-full bg-yellow-500/30 border border-yellow-500/50 inline-block" />
              <span className="h-3 w-3 rounded-full bg-green-500/30 border border-green-500/50 inline-block" />
            </div>
            <span className="ml-2 hidden font-mono text-xs text-[var(--color-text-muted)] sm:inline-block">
              switch-sync.vercel.app/discovery
            </span>
          </div>

          <div className="flex items-center gap-2">
            {/* Auto Demo / Interactive Toggle */}
            <button
              type="button"
              onClick={() => setIsAutoPlaying(!isAutoPlaying)}
              className="flex items-center gap-1 rounded-md border border-[var(--color-border)] bg-[#12131b] px-2 py-0.5 text-[10px] font-mono text-[var(--color-text-secondary)] transition-colors hover:text-white"
              title={isAutoPlaying ? "Pause automatic search demonstration" : "Play automatic search demonstration"}
            >
              {isAutoPlaying ? (
                <>
                  <Pause className="h-2.5 w-2.5 text-[var(--color-accent)]" />
                  <span>Auto Demo</span>
                </>
              ) : (
                <>
                  <Play className="h-2.5 w-2.5 text-emerald-400" />
                  <span>Resume Demo</span>
                </>
              )}
            </button>

            {hasLiveJobs ? (
              <span className="flex items-center gap-1.5 rounded-md border border-emerald-500/30 bg-emerald-500/10 px-2 py-0.5 text-[11px] font-mono text-emerald-400">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                Live Feed
              </span>
            ) : (
              <span className="flex items-center gap-1.5 rounded-md border border-amber-500/30 bg-amber-500/10 px-2 py-0.5 text-[11px] font-mono text-amber-400">
                <span className="h-1.5 w-1.5 rounded-full bg-amber-400" />
                Sample Preview
              </span>
            )}
            <span className="hidden rounded-md border border-[var(--color-border)] bg-[var(--color-surface-2)] px-2 py-0.5 text-[11px] font-mono text-[var(--color-text-muted)] md:inline-block">
              200+ Companies
            </span>
          </div>
        </div>

        {/* Product UI Toolbar */}
        <div className="border-b border-[var(--color-border)] bg-[#111218] p-4 sm:p-5">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            {/* Live Typing Search Box */}
            <div className="relative flex-1">
              <Search
                className={`pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 transition-colors duration-200 ${
                  isSearching ? "text-emerald-400" : "text-[var(--color-accent)]"
                }`}
              />
              <div
                onClick={handleUserInteract}
                className={`flex h-10 w-full items-center rounded-lg border bg-[#0a0a0c] pl-10 pr-3 text-sm text-[var(--color-text-primary)] transition-all duration-200 ${
                  isSearching
                    ? "border-[var(--color-accent)] shadow-[0_0_12px_rgba(110,91,255,0.25)]"
                    : "border-[var(--color-border)]"
                }`}
              >
                <span className="font-medium text-[var(--color-text-primary)]">
                  {displayText || <span className="text-[var(--color-text-muted)] font-normal">Search engineering roles…</span>}
                </span>
                <span className="ml-1 inline-block h-4 w-[2px] animate-pulse bg-[var(--color-accent)]" />

                <div className="ml-auto flex items-center gap-1.5">
                  {isSearching && (
                    <span className="flex items-center gap-1 font-mono text-[10px] text-emerald-400 animate-pulse">
                      <Sparkles className="h-3 w-3" />
                      Scanning…
                    </span>
                  )}
                  <span className="hidden rounded border border-[var(--color-border)] bg-[var(--color-surface-2)] px-1.5 py-0.5 text-[10px] font-mono text-[var(--color-text-muted)] sm:inline-block">
                    ⌘K
                  </span>
                </div>
              </div>
            </div>

            {/* Quick Filter Switchers */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
              <button
                type="button"
                onClick={() => {
                  handleUserInteract();
                  setActiveTab("all");
                }}
                className={`rounded-lg px-3 py-1.5 text-xs font-medium transition-all ${
                  activeTab === "all"
                    ? "bg-[var(--color-accent)] text-white shadow-sm"
                    : "border border-[var(--color-border)] bg-[#0a0a0c] text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]"
                }`}
              >
                All Jobs
              </button>
              <button
                type="button"
                onClick={() => {
                  handleUserInteract();
                  setActiveTab("remote");
                }}
                className={`rounded-lg px-3 py-1.5 text-xs font-medium transition-all ${
                  activeTab === "remote"
                    ? "bg-[var(--color-accent)] text-white shadow-sm"
                    : "border border-[var(--color-border)] bg-[#0a0a0c] text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]"
                }`}
              >
                Remote Only
              </button>
              <button
                type="button"
                onClick={() => {
                  handleUserInteract();
                  setActiveTab("senior");
                }}
                className={`rounded-lg px-3 py-1.5 text-xs font-medium transition-all ${
                  activeTab === "senior"
                    ? "bg-[var(--color-accent)] text-white shadow-sm"
                    : "border border-[var(--color-border)] bg-[#0a0a0c] text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]"
                }`}
              >
                Senior Level
              </button>
            </div>
          </div>

          {/* Interactive Tech Filter Chips */}
          <div className="mt-3.5 flex items-center gap-1.5 overflow-x-auto text-xs scrollbar-none">
            <span className="flex items-center gap-1 text-[var(--color-text-muted)] text-[11px] font-medium mr-1 shrink-0">
              <SlidersHorizontal className="h-3 w-3" />
              Stack:
            </span>
            {filterTags.map((tag) => (
              <button
                key={tag}
                type="button"
                onClick={() => {
                  handleUserInteract();
                  setSelectedTag(tag);
                }}
                className={`shrink-0 rounded-full px-2.5 py-0.5 font-mono text-[11px] transition-all duration-200 ${
                  selectedTag === tag
                    ? "border border-[var(--color-accent)] bg-[var(--color-accent)]/20 text-[var(--color-text-primary)] font-semibold shadow-[0_0_8px_rgba(110,91,255,0.2)]"
                    : "border border-[var(--color-border)] bg-[var(--color-surface-2)]/60 text-[var(--color-text-secondary)] hover:border-[var(--color-border-hover)] hover:text-[var(--color-text-primary)]"
                }`}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>

        {/* Job Cards List with Smooth Transition */}
        {displayJobs.length === 0 ? (
          <div className="flex flex-col items-center justify-center p-8 text-center bg-[#0c0d12]">
            <Info className="h-5 w-5 text-[var(--color-text-muted)]" />
            <p className="mt-2 text-xs text-[var(--color-text-secondary)]">
              No jobs matching &ldquo;{displayText || selectedTag}&rdquo;.
            </p>
            <button
              onClick={() => {
                setActiveTab("all");
                setSelectedTag("All");
                setDisplayText("Backend Engineer");
              }}
              className="mt-2 inline-flex items-center gap-1 text-xs text-[var(--color-accent)] underline"
            >
              <RotateCcw className="h-3 w-3" />
              Reset filters
            </button>
          </div>
        ) : (
          <div
            key={displayText + activeTab + selectedTag}
            className="divide-y divide-[var(--color-border)] bg-[#0c0d12] transition-opacity duration-300"
          >
            {displayJobs.map((job, idx) => {
              const skills = getJobSkills(job);

              return (
                <div
                  key={job.id}
                  style={{
                    animationDelay: `${idx * 80}ms`,
                  }}
                  className="group p-4 transition-all duration-300 hover:bg-[#13141c] sm:p-5 animate-in fade-in slide-in-from-bottom-2 duration-300"
                >
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                    {/* Left details */}
                    <div className="space-y-1.5">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="font-semibold text-base text-[var(--color-text-primary)] group-hover:text-white transition-colors">
                          {job.title}
                        </span>
                        <span className="hidden text-xs text-[var(--color-text-muted)] sm:inline">•</span>
                        <div className="flex items-center gap-1.5 text-xs text-[var(--color-text-secondary)]">
                          <Building2 className="h-3.5 w-3.5 text-[var(--color-text-muted)]" />
                          <span className="font-medium text-[var(--color-text-primary)]">{job.companyName}</span>
                        </div>
                      </div>

                      {/* Metadata Row */}
                      <div className="flex flex-wrap items-center gap-2 pt-0.5">
                        <span className="inline-flex items-center gap-1 text-xs text-[var(--color-text-secondary)]">
                          <MapPin className="h-3 w-3 text-[var(--color-text-muted)]" />
                          {job.location || "Remote / Unspecified"}
                        </span>

                        <ExperienceBadge level={job.experienceLevel} />

                        <Badge
                          variant="default"
                          className="text-[10px] uppercase font-mono tracking-wider border-[var(--color-border)] bg-[var(--color-surface-2)] text-[var(--color-text-secondary)]"
                        >
                          {formatSource(job.source)}
                        </Badge>
                      </div>

                      {/* Skills / Tech Stack Pills */}
                      <div className="flex flex-wrap items-center gap-1.5 pt-1.5">
                        {skills.map((skill) => (
                          <span
                            key={skill}
                            className={`rounded px-1.5 py-0.5 font-mono text-[10px] transition-colors ${
                              skill === selectedTag
                                ? "bg-[var(--color-accent)]/20 text-[var(--color-accent)] border border-[var(--color-accent)]/40 font-semibold"
                                : "bg-[#181922] text-[var(--color-text-secondary)] border border-[var(--color-border)]"
                            }`}
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Right: Score & Timing */}
                    <div className="flex items-center justify-between gap-3 border-t border-[var(--color-border)]/50 pt-2 sm:border-0 sm:pt-0 sm:flex-col sm:items-end">
                      <div className="flex items-center gap-2">
                        <span className="text-[11px] text-[var(--color-text-muted)] font-mono">
                          Match:
                        </span>
                        <ScoreBadge score={job.score} />
                      </div>

                      <div className="flex items-center gap-2 text-xs text-[var(--color-text-muted)]">
                        <Clock className="h-3 w-3" />
                        <span>{job.postedAt ? formatRelativeDate(job.postedAt) : "recent"}</span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Bottom Banner to Live Dashboard */}
        <div className="flex items-center justify-between border-t border-[var(--color-border)] bg-[#090a0d] px-4 py-3 sm:px-6">
          <div className="flex items-center gap-2 text-xs text-[var(--color-text-secondary)]">
            <Sparkles className="h-3.5 w-3.5 text-[var(--color-accent)]" />
            <span>
              Real-time synchronization across <span className="font-mono text-white font-medium">Greenhouse</span>,{" "}
              <span className="font-mono text-white font-medium">Lever</span>, and{" "}
              <span className="font-mono text-white font-medium">Ashby</span>.
            </span>
          </div>

          <Link
            to="/dashboard"
            className="group flex items-center gap-1 text-xs font-semibold text-[var(--color-accent)] transition-colors hover:text-[var(--color-accent-hover)]"
          >
            <span>Open live dashboard</span>
            <ChevronRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </div>
  );
}

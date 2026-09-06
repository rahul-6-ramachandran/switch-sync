import {
  Layers,
  Sparkles,
  ArrowDown,
  ArrowRight,
  GitMerge,
  CheckCircle2,
  Terminal,
  Server,
  Zap,
} from "lucide-react";

export function DataPipeline() {
  const pipelineNodes = [
    {
      step: "01",
      label: "ATS Sources",
      subtext: "Greenhouse · Lever · Ashby · Workday",
      icon: Layers,
      type: "source",
      badge: "Public APIs",
    },
    {
      step: "02",
      label: "Ingestion Engine",
      subtext: "Adapter Registry & Incremental Fetching",
      icon: Zap,
      type: "process",
      badge: "Hourly Workers",
    },
    {
      step: "03",
      label: "Normalization",
      subtext: "HTML Cleanup & Unified Schema Mapping",
      icon: Terminal,
      type: "process",
      badge: "Structured Data",
    },
    {
      step: "04",
      label: "Deduplication",
      subtext: "Cross-platform Fingerprint & Title Hash",
      icon: GitMerge,
      type: "process",
      badge: "Idempotent",
    },
    {
      step: "05",
      label: "Scoring Engine",
      subtext: "Experience, Stack & Seniority Match (0–100)",
      icon: Sparkles,
      type: "process",
      badge: "Algorithmic",
    },
    {
      step: "06",
      label: "HireScope Core",
      subtext: "PostgreSQL Storage & REST API Services",
      icon: Server,
      type: "database",
      badge: "Neon DB",
    },
    {
      step: "07",
      label: "Relevant Jobs Output",
      subtext: "Live React Radar & Instant Telegram Alerts",
      icon: CheckCircle2,
      type: "output",
      badge: "Zero Latency",
    },
  ];

  return (
    <section id="pipeline" className="relative border-t border-[var(--color-border)] bg-[#07080b] py-20 lg:py-28 overflow-hidden">
      {/* Subtle background glow */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[600px] w-full max-w-5xl bg-[var(--color-accent)]/5 blur-[140px]" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mx-auto max-w-2xl text-center">
          <span className="font-mono text-xs font-semibold uppercase tracking-widest text-[var(--color-accent)]">
            Engineering Architecture
          </span>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Built Like a Real Production System.
          </h2>
          <p className="mt-4 text-base text-[var(--color-text-secondary)]">
            Under the hood, HireScope is built to continuously ingest, normalize, and score job data through a fault-tolerant multi-stage pipeline.
          </p>
        </div>

        {/* Visual Pipeline Container */}
        <div className="mt-16 rounded-2xl border border-[var(--color-border)] bg-[#0d0e14]/80 p-6 sm:p-10 shadow-2xl backdrop-blur-md">
          {/* Architecture header bar */}
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[var(--color-border)] pb-6">
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="font-mono text-xs font-semibold text-white">
                PIPELINE STATE: SYNCHRONIZED
              </span>
            </div>
            <div className="flex items-center gap-2 font-mono text-[11px] text-[var(--color-text-muted)]">
              <span className="rounded bg-[#171821] px-2 py-0.5 border border-[var(--color-border)]">
                TypeScript
              </span>
              <span className="rounded bg-[#171821] px-2 py-0.5 border border-[var(--color-border)]">
                PostgreSQL
              </span>
              <span className="rounded bg-[#171821] px-2 py-0.5 border border-[var(--color-border)]">
                Prisma ORM
              </span>
            </div>
          </div>

          {/* Desktop Flow: Horizontal Grid / Flow */}
          <div className="mt-8 hidden lg:grid lg:grid-cols-7 lg:gap-3">
            {pipelineNodes.map((node, i) => {
              const Icon = node.icon;
              const isLast = i === pipelineNodes.length - 1;
              return (
                <div key={node.step} className="relative flex flex-col justify-between">
                  <div className="group rounded-xl border border-[var(--color-border)] bg-[#12131b] p-3.5 transition-all duration-200 hover:border-[var(--color-accent)]/50 hover:bg-[#161722] hover:-translate-y-1">
                    <div className="flex items-center justify-between">
                      <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#1b1c28] text-[var(--color-accent)]">
                        <Icon className="h-3.5 w-3.5" />
                      </span>
                      <span className="font-mono text-[10px] text-[var(--color-text-muted)]">
                        {node.step}
                      </span>
                    </div>

                    <h4 className="mt-3 text-xs font-bold text-white leading-tight">
                      {node.label}
                    </h4>

                    <p className="mt-1 text-[11px] text-[var(--color-text-muted)] leading-snug line-clamp-2">
                      {node.subtext}
                    </p>

                    <div className="mt-3 pt-2 border-t border-[var(--color-border)]/40">
                      <span className="font-mono text-[9px] text-[var(--color-accent)]">
                        {node.badge}
                      </span>
                    </div>
                  </div>

                  {/* Arrow Indicator */}
                  {!isLast && (
                    <div className="pointer-events-none absolute -right-2.5 top-1/2 -translate-y-1/2 z-10 hidden lg:block">
                      <ArrowRight className="h-3.5 w-3.5 text-[var(--color-text-muted)]" />
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Mobile Flow: Vertical Stack with Connecting Lines */}
          <div className="mt-8 flex flex-col space-y-3 lg:hidden">
            {pipelineNodes.map((node, i) => {
              const Icon = node.icon;
              const isLast = i === pipelineNodes.length - 1;
              return (
                <div key={node.step} className="relative flex flex-col items-center">
                  <div className="w-full rounded-xl border border-[var(--color-border)] bg-[#12131b] p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#1b1c28] text-[var(--color-accent)]">
                          <Icon className="h-4 w-4" />
                        </span>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-mono text-xs text-[var(--color-text-muted)]">
                              {node.step}
                            </span>
                            <h4 className="text-sm font-semibold text-white">
                              {node.label}
                            </h4>
                          </div>
                          <p className="text-xs text-[var(--color-text-muted)]">
                            {node.subtext}
                          </p>
                        </div>
                      </div>
                      <span className="shrink-0 rounded bg-[#1b1c28] px-2 py-0.5 font-mono text-[10px] text-[var(--color-accent)] border border-[var(--color-border)]">
                        {node.badge}
                      </span>
                    </div>
                  </div>

                  {!isLast && (
                    <div className="my-1.5 flex h-4 items-center justify-center text-[var(--color-text-muted)]">
                      <ArrowDown className="h-3.5 w-3.5" />
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Technical Summary Footnote */}
          <div className="mt-8 rounded-xl border border-[var(--color-border)] bg-[#090a0d] p-4 text-xs text-[var(--color-text-secondary)] sm:flex sm:items-center sm:justify-between">
            <span className="font-mono text-[11px] text-[var(--color-text-muted)]">
              SYNC INTERVAL: HOURLY · PROVIDER FAILOVER: ISOLATED · DATA SCHEMA: NORMALIZED
            </span>
            <span className="mt-2 block sm:mt-0 font-medium text-emerald-400">
              100% Provider Agnostic
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

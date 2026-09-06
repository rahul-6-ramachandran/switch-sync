import { Radar, Filter, Target, BellRing } from "lucide-react";
import { MotionReveal } from "./MotionReveal";

export function ValueProposition() {
  const values = [
    {
      step: "01",
      icon: Radar,
      title: "Discover",
      description:
        "Find relevant jobs across multiple trusted job sources directly from public ATS endpoints before aggregators index them.",
      badge: "Direct ATS Ingestion",
    },
    {
      step: "02",
      icon: Filter,
      title: "Filter",
      description:
        "Cut through irrelevant listings using experience, location, remote status, and technology stack filters designed for developers.",
      badge: "Zero Noise",
    },
    {
      step: "03",
      icon: Target,
      title: "Rank",
      description:
        "Surface opportunities that better match your profile with our transparent 0–100 relevance scoring engine.",
      badge: "Scoring Engine",
    },
    {
      step: "04",
      icon: BellRing,
      title: "Stay Updated",
      description:
        "Keep up with newly discovered opportunities without manually checking dozens of company career pages every day.",
      badge: "Hourly Sync",
    },
  ];

  return (
    <section className="relative border-y border-[var(--color-border)] bg-[#090a0d] py-20 lg:py-28">
      {/* Subtle background glow */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[400px] w-full max-w-4xl bg-[var(--color-accent)]/5 blur-[100px]" />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <MotionReveal delay={50} distance={20}>
          <div className="mx-auto max-w-2xl text-center">
            <span className="font-mono text-xs font-semibold uppercase tracking-widest text-[var(--color-accent)]">
              Value Proposition
            </span>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Your Job Search, Without the Noise.
            </h2>
            <p className="mt-4 text-base text-[var(--color-text-secondary)]">
              Traditional job boards flood you with sponsored roles and outdated listings. HireScope eliminates repetitive search friction with automated synchronization.
            </p>
          </div>
        </MotionReveal>

        {/* 4 Feature Blocks with Staggered Entrance */}
        <div className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {values.map((val, idx) => {
            const Icon = val.icon;
            return (
              <MotionReveal
                key={val.title}
                delay={120 + idx * 100}
                distance={24}
                className="h-full"
              >
                <div className="group relative flex h-full flex-col justify-between overflow-hidden rounded-2xl border border-[var(--color-border)] bg-[#111218]/80 p-6 transition-all duration-300 hover:border-[var(--color-border-hover)] hover:bg-[#15161f] hover:shadow-xl hover:shadow-[var(--color-accent)]/5 hover:-translate-y-1">
                  {/* Subtle card glow highlight */}
                  <div className="pointer-events-none absolute -top-12 -right-12 h-28 w-28 rounded-full bg-[var(--color-accent)]/10 blur-xl opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                  <div>
                    <div className="flex items-center justify-between">
                      <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-[var(--color-border)] bg-[#0a0a0c] text-[var(--color-accent)] transition-all duration-200 group-hover:border-[var(--color-accent)]/40 group-hover:text-white group-hover:scale-105">
                        <Icon className="h-5 w-5" />
                      </span>
                      <span className="font-mono text-xs font-semibold text-[var(--color-text-muted)]">
                        {val.step}
                      </span>
                    </div>

                    <h3 className="mt-5 text-lg font-semibold text-white">
                      {val.title}
                    </h3>

                    <p className="mt-2 text-sm leading-relaxed text-[var(--color-text-secondary)]">
                      {val.description}
                    </p>
                  </div>

                  <div className="mt-6 pt-4 border-t border-[var(--color-border)]/60">
                    <span className="font-mono text-[11px] text-[var(--color-accent)] bg-[var(--color-accent)]/10 px-2.5 py-1 rounded-md border border-[var(--color-accent)]/20">
                      {val.badge}
                    </span>
                  </div>
                </div>
              </MotionReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

import {
  Layers,
  Sparkles,
  GitFork,
  Brain,
  Sliders,
  Search,
  RefreshCw,
  Send,
  CheckCircle2,
  FileCode2,
} from "lucide-react";
import { MotionReveal } from "./MotionReveal";

export function Features() {
  const features = [
    {
      icon: Layers,
      title: "Multi-Source ATS Discovery",
      description:
        "Adapter-based architecture interfacing directly with Greenhouse, Lever, Ashby, and Workday public APIs.",
      tag: "Adapters",
      highlight: "Greenhouse · Lever · Ashby · Workday",
    },
    {
      icon: FileCode2,
      title: "Job Normalization",
      description:
        "Standardizes raw, unstructured schemas across distinct platforms into unified, structured engineering job entities.",
      tag: "Data Ingestion",
      highlight: "Unified Schema Structure",
    },
    {
      icon: GitFork,
      title: "Duplicate Detection",
      description:
        "Intelligently identifies cross-posted roles and repeated postings to eliminate clutter from your search radar.",
      tag: "Pipeline",
      highlight: "Zero Redundant Postings",
    },
    {
      icon: Brain,
      title: "Experience Extraction",
      description:
        "NLP-based parsing extracts precise experience tiers (Junior, Mid, Senior) from job descriptions automatically.",
      tag: "Classification",
      highlight: "Automatic Tier Labeling",
    },
    {
      icon: Sparkles,
      title: "Intelligent Relevance Scoring",
      description:
        "Scores each listing on a 0–100 scale using keyword density, title relevance, recency, and experience match.",
      tag: "Scoring Engine",
      highlight: "Transparent 0–100 Match Rating",
    },
    {
      icon: Sliders,
      title: "Advanced Faceted Filtering",
      description:
        "Drill down by specific product companies, remote status, experience level, ATS source, and posting timeframe.",
      tag: "Discovery UI",
      highlight: "Instant Multi-Filter",
    },
    {
      icon: Search,
      title: "Fast Search & Pagination",
      description:
        "Debounced full-text search across titles, technologies, and company names with server-side pagination.",
      tag: "Performance",
      highlight: "Sub-millisecond Search UI",
    },
    {
      icon: RefreshCw,
      title: "Automated Synchronization",
      description:
        "Scheduled hourly sync engine via GitHub Actions keeps your listings synchronized with zero downtime.",
      tag: "Automation",
      highlight: "24/7 Hourly Background Sync",
    },
    {
      icon: Send,
      title: "Telegram Notifications",
      description:
        "Instant push notifications delivered to your Telegram whenever high-relevance engineering roles are discovered.",
      tag: "Alerts",
      highlight: "Real-time Direct Alerts",
    },
  ];

  return (
    <section id="features" className="relative border-t border-[var(--color-border)] bg-[#0a0a0d] py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mx-auto max-w-2xl text-center">
          <MotionReveal delay={400} distance={5}>
          <span className="font-mono text-xs font-semibold uppercase tracking-widest text-[var(--color-accent)]">
            Product Capabilities
          </span>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Engineered for Precision Job Discovery.
          </h2>
          <p className="mt-4 text-base text-[var(--color-text-secondary)]">
            Every feature in HireScope is built around one objective: giving engineers immediate access to relevant opportunities.
          </p>
          </MotionReveal>
        </div>

        {/* Feature Grid */}
        <div className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <MotionReveal key={feature.title} delay={500 + index * 100}>
                <div className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-[var(--color-border)] bg-[#111218]/90 p-6 transition-all duration-300 hover:border-[var(--color-border-hover)] hover:bg-[#151620] hover:shadow-xl hover:shadow-black/40">
                {/* Ambient hover glow */}
                <div className="pointer-events-none absolute -bottom-10 -right-10 h-32 w-32 rounded-full bg-[var(--color-accent)]/10 blur-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                <div>
                  <div className="flex items-center justify-between">
                    <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-[var(--color-border)] bg-[#0b0c10] text-[var(--color-accent)] transition-transform group-hover:scale-105">
                      <Icon className="h-5 w-5" />
                    </span>
                    <span className="rounded-full border border-[var(--color-border)] bg-[#0b0c10] px-2.5 py-0.5 font-mono text-[10px] text-[var(--color-text-muted)]">
                      {feature.tag}
                    </span>
                  </div>

                  <h3 className="mt-4 text-base font-semibold text-white">
                    {feature.title}
                  </h3>

                  <p className="mt-2 text-sm leading-relaxed text-[var(--color-text-secondary)]">
                    {feature.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-[var(--color-border)]/50">
                  <div className="flex items-center gap-1.5 font-mono text-[11px] text-[var(--color-text-primary)]">
                    <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400 shrink-0" />
                    <span>{feature.highlight}</span>
                  </div>
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

import { Check } from "lucide-react";
import { MotionReveal } from "./MotionReveal";

export function HowItWorks() {
  const steps = [
    {
      number: "01",
      title: "Discover",
      subtitle: "Public ATS Collection",
      description:
        "HireScope continuously monitors public Applicant Tracking Systems used by 200+ top product companies — including Greenhouse, Lever, Ashby, and Workday.",
      details: [
        "Direct API querying without third-party delay",
        "Config-driven discovery for zero-maintenance additions",
        "Scheduled hourly sync runs via automated workers",
      ],
      tag: "Ingestion Layer",
    },
    {
      number: "02",
      title: "Understand",
      subtitle: "Enrichment & Normalization",
      description:
        "Raw job postings are parsed, deduplicated, and enriched. We extract experience requirements, normalize titles, and validate remote eligibility.",
      details: [
        "Automatic Junior / Mid / Senior classification",
        "Cross-posting duplicate elimination",
        "Tech stack and keyword extraction from descriptions",
      ],
      tag: "Data Pipeline",
    },
    {
      number: "03",
      title: "Match",
      subtitle: "Scoring & Discovery",
      description:
        "Relevant opportunities are scored from 0 to 100 based on experience match and role specificity, surfaced on the live dashboard and broadcast via Telegram.",
      details: [
        "Configurable multi-factor relevance scoring",
        "Instant faceted filtering by company & location",
        "Real-time Telegram notifications for top-tier matches",
      ],
      tag: "Scoring Engine",
    },
  ];

  return (
    <section id="how-it-works" className="relative py-20 lg:py-28 overflow-hidden">
      {/* Background radial highlight */}
      <div className="pointer-events-none absolute right-0 top-1/3 h-[500px] w-[500px] rounded-full bg-[var(--color-accent)]/5 blur-[120px]" />
<MotionReveal delay={400} distance={5}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mx-auto max-w-2xl text-center">
          <span className="font-mono text-xs font-semibold uppercase tracking-widest text-[var(--color-accent)]">
            How It Works
          </span>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-white sm:text-4xl">
            From ATS Endpoint to Your Radar in Three Steps.
          </h2>
          <p className="mt-4 text-base text-[var(--color-text-secondary)]">
            By eliminating aggregator latency, HireScope puts newly published engineering roles in front of you hours before traditional job boards.
          </p>
        </div>

        {/* Visual 3-step Flow */}
        <div className="mt-16 relative">
          {/* Connector Line (Desktop) */}
          <div className="pointer-events-none absolute top-1/2 left-8 right-8 hidden -translate-y-1/2 h-[2px] bg-gradient-to-r from-transparent via-[var(--color-border-hover)] to-transparent lg:block" />

          <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
            
            {steps.map((step) => (
              <div
                key={step.number}
                className="relative flex flex-col justify-between rounded-2xl border border-[var(--color-border)] bg-[#0d0e14] p-7 transition-all duration-300 hover:border-[var(--color-border-hover)] hover:bg-[#12131b] hover:shadow-2xl hover:shadow-black/50"
              >
                <MotionReveal delay={600} distance={5}>
                {/* Step indicator header */}
                <div>
                  <div className="flex items-center justify-between">
                    <span className="flex h-12 w-12 items-center justify-center rounded-xl border border-[var(--color-border)] bg-[#171821] font-mono text-base font-bold text-white shadow-inner">
                      {step.number}
                    </span>
                    <span className="rounded-full border border-[var(--color-border)] bg-[#171821]/80 px-3 py-1 font-mono text-xs text-[var(--color-text-secondary)]">
                      {step.tag}
                    </span>
                  </div>

                  <div className="mt-6">
                    <span className="font-mono text-xs text-[var(--color-accent)] font-medium">
                      {step.subtitle}
                    </span>
                    <h3 className="mt-1 text-2xl font-bold text-white">
                      {step.title}
                    </h3>
                    <p className="mt-3 text-sm leading-relaxed text-[var(--color-text-secondary)]">
                      {step.description}
                    </p>
                  </div>
                </div>

                {/* Bullet details */}
                <div className="mt-8 border-t border-[var(--color-border)]/60 pt-5">
                  <ul className="space-y-2 text-xs text-[var(--color-text-secondary)]">
                    {step.details.map((detail) => (
                      <li key={detail} className="flex items-start gap-2">
                        <Check className="h-3.5 w-3.5 shrink-0 text-[var(--color-signal-strong)] mt-0.5" />
                        <span>{detail}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                </MotionReveal>
              </div>
            ))}
          </div>
        </div>
      </div>
      </MotionReveal>
    </section>
  );
}

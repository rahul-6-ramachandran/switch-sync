import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { RadarMark } from "@/components/layout/RadarMark";

export function FinalCTA() {
  return (
    <section className="group relative overflow-hidden py-24 lg:py-32">
      {/* Background ambient lighting */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
        <div className="h-[400px] w-[700px] animate-pulse rounded-full bg-gradient-to-tr from-[var(--color-accent)]/20 via-sky-500/10 to-transparent blur-[140px] transition-transform duration-1000 group-hover:scale-110" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-3xl border border-[var(--color-border)] bg-gradient-to-b from-[#13141e]/90 to-[#0c0d13]/90 p-8 text-center shadow-2xl backdrop-blur-xl transition-all duration-700 hover:-translate-y-1 hover:border-[var(--color-accent)]/40 hover:shadow-[0_0_70px_-20px_var(--color-accent)] sm:p-16">
          {/* Subtle grid pattern background */}
          <div
            className="pointer-events-none absolute inset-0 opacity-15 transition-opacity duration-700 group-hover:opacity-30"
            style={{
              backgroundImage: `radial-gradient(var(--color-border-hover) 1px, transparent 1px)`,
              backgroundSize: "24px 24px",
            }}
          />

          <div className="relative z-10 mx-auto max-w-2xl">
            {/* Radar brand mark badge */}
            <div className="flex justify-center">
              <div className="inline-flex items-center gap-2 rounded-full border border-[var(--color-accent)]/30 bg-[var(--color-accent)]/10 px-3.5 py-1 text-xs font-medium text-[var(--color-accent)] transition-transform duration-300 hover:scale-105">
                <RadarMark size={18} />
                <span>Zero Latency Job Discovery</span>
              </div>
            </div>

            <h2 className="mt-6 text-3xl font-extrabold tracking-tight text-white transition-transform duration-500 group-hover:-translate-y-1 sm:text-5xl sm:leading-[1.15]">
              Your next opportunity is out there.
            </h2>

            <p className="mt-5 text-base text-[var(--color-text-secondary)] sm:text-lg">
              Spend less time searching and more time applying to jobs that actually fit.
            </p>

            <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Button
                asChild
                size="default"
                className="group h-13 w-full sm:w-auto rounded-xl bg-[var(--color-accent)] px-8 text-base font-semibold text-white shadow-xl shadow-[var(--color-accent)]/30 transition-all hover:bg-[var(--color-accent-hover)] hover:shadow-2xl hover:shadow-[var(--color-accent)]/50 active:scale-[0.98]"
              >
                <Link to="/dashboard" className="flex items-center justify-center gap-2">
                  <span>Explore HireScope</span>
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
            </div>

            {/* Micro guarantee / trust line */}
            <div className="mt-8 flex items-center justify-center gap-4 text-xs text-[var(--color-text-muted)] font-mono">
              <span>NO ACCOUNT REQUIRED</span>
              <span>•</span>
              <span>100% FREE ACCESS</span>
              <span>•</span>
              <span>HOURLY ATS UPDATES</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

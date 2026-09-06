import { Link } from "react-router-dom";
import { ArrowRight, Play, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { HeroProductUI } from "./HeroProductUI";
import { MotionReveal } from "./MotionReveal";

export function Hero() {
  return (
    <section className="relative overflow-hidden pt-12 pb-20 md:pt-20 md:pb-28">
      {/* Background ambient lighting with subtle floating pulse */}
      <div className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 h-[500px] w-full max-w-7xl">
        <div className="absolute -top-24 left-1/2 -translate-x-1/2 h-[380px] w-[600px] rounded-full bg-gradient-to-tr from-[var(--color-accent)]/20 to-blue-500/10 blur-[120px] transition-all duration-1000" />
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Top Tagline Pill */}
        <div className="flex justify-center">
          <MotionReveal delay={600} distance={16}>
            <div className="inline-flex items-center gap-2 rounded-full border border-[var(--color-border)] bg-[#121319]/80 px-3.5 py-1 text-xs text-[var(--color-text-secondary)] shadow-inner backdrop-blur-md">
              <span className="flex h-2 w-2 rounded-full bg-emerald-400" />
              <span className="font-medium text-[var(--color-text-primary)]">Public ATS Monitoring</span>
              <span className="text-[var(--color-border-hover)]">|</span>
              <span className="font-mono text-[11px] text-[var(--color-accent)]">Direct API Ingestion</span>
            </div>
          </MotionReveal>
        </div>

        {/* Hero Typography */}
        <div className="mt-8 text-center">
          <MotionReveal delay={500} distance={5 }>
            <h1 className="mx-auto max-w-4xl text-4xl font-extrabold tracking-tight text-white sm:text-6xl sm:leading-[1.1] lg:text-7xl">
              The Right Job Is Out There.{" "}
              
            
              <span className="bg-gradient-to-r from-[var(--color-accent)] via-[#9b8eff] to-sky-400 bg-clip-text text-transparent">
                We Help You Find It.{" "}
              </span>
            </h1>
          </MotionReveal>

          <MotionReveal delay={400} distance={5}>
            <p className="mx-auto mt-6 max-w-2xl text-base text-[var(--color-text-secondary)] sm:text-lg sm:leading-relaxed">
              HireScope brings relevant engineering jobs from multiple trusted sources into one intelligent job discovery platform.
            </p>
          </MotionReveal>

          {/* Action CTAs */}
          <MotionReveal delay={280} distance={18}>
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4">
              <Button
                asChild
                size="default"
                className="group h-12 w-full sm:w-auto rounded-xl bg-[var(--color-accent)] px-7 text-sm font-semibold text-white shadow-xl shadow-[var(--color-accent)]/25 transition-all hover:bg-[var(--color-accent-hover)] hover:shadow-2xl hover:shadow-[var(--color-accent)]/40 active:scale-[0.98]"
              >
                <Link to="/dashboard" className="flex items-center justify-center gap-2">
                  <span>Explore Jobs</span>
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>

              <Button
                asChild
                variant="outline"
                size="default"
                className="h-12 w-full sm:w-auto rounded-xl border-[var(--color-border)] bg-[#121319]/90 px-6 text-sm font-medium text-[var(--color-text-primary)] hover:border-[var(--color-border-hover)] hover:bg-[var(--color-surface-hover)]"
              >
                <a href="#how-it-works" className="flex items-center justify-center gap-2">
                  <Play className="h-3.5 w-3.5 fill-current text-[var(--color-accent)]" />
                  <span>See How It Works</span>
                </a>
              </Button>
            </div>
          </MotionReveal>

          {/* Real Trust / Value Indicators */}
          <MotionReveal delay={360} distance={16}>
            <div className="mt-10 flex flex-wrap items-center justify-center gap-x-6 gap-y-3 text-xs text-[var(--color-text-secondary)]">
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="h-4 w-4 text-[var(--color-accent)]" />
                <span>200+ Product Companies</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="h-4 w-4 text-[var(--color-accent)]" />
                <span>Greenhouse, Lever, Ashby & Workday</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="h-4 w-4 text-[var(--color-accent)]" />
                <span>Intelligent 0–100 Relevance Scoring</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="h-4 w-4 text-[var(--color-accent)]" />
                <span>Hourly Automated Synchronization</span>
              </div>
            </div>
          </MotionReveal>
        </div>

        {/* Product Visual Mockup */}
        <MotionReveal delay={440} distance={32} duration={850}>
          <div className="mt-14 lg:mt-18">
            <HeroProductUI />
          </div>
        </MotionReveal>
      </div>
    </section>
  );
}

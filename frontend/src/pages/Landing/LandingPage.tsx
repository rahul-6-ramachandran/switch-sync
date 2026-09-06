import { useEffect } from "react";
import { LandingNavbar } from "./components/LandingNavbar";
import { Hero } from "./components/Hero";
import { ValueProposition } from "./components/ValueProposition";
import { HowItWorks } from "./components/HowItWorks";
import { Features } from "./components/Features";
import { JobFeedPreview } from "./components/JobFeedPreview";
import { FinalCTA } from "./components/FinalCTA";
import { LandingFooter } from "./components/LandingFooter";

export function LandingPage() {
  useEffect(() => {
    document.title = "HireScope — Intelligent Job Discovery for Software Engineers";
  }, []);

  return (
    <div className="min-h-screen w-full bg-[var(--color-canvas)] text-[var(--color-text-primary)] antialiased overflow-x-hidden selection:bg-[var(--color-accent-muted)] selection:text-white">
      <LandingNavbar />
      <main>
        <Hero />
        <ValueProposition />
        <HowItWorks />
        <Features />
        <JobFeedPreview />
        <FinalCTA />
      </main>
      <LandingFooter />
    </div>
  );
}

export default LandingPage;

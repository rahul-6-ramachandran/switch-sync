import { Link } from "react-router-dom";
import { RadarMark } from "@/components/layout/RadarMark";
import { ArrowUpRight } from "lucide-react";

export function LandingFooter() {
  return (
    <footer className="border-t border-[var(--color-border)] bg-[#07080b] py-14 text-sm text-[var(--color-text-secondary)]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-4">
          {/* Brand Col */}
          <div className="md:col-span-2 space-y-4">
            <Link to="/" className="flex items-center gap-2.5">
              <RadarMark size={26} />
              <span className="text-base font-semibold tracking-tight text-white">
                HireScope
              </span>
            </Link>

            <p className="max-w-sm text-sm leading-relaxed text-[var(--color-text-secondary)]">
              Intelligent job discovery for modern engineers. Continuously indexing software engineering roles directly from public company ATS platforms.
            </p>

            <div className="flex items-center gap-2 pt-2">
              <span className="flex h-2 w-2 rounded-full bg-emerald-400" />
              <span className="font-mono text-xs text-[var(--color-text-muted)]">
                Monitoring Greenhouse, Lever, Ashby & Workday
              </span>
            </div>
          </div>

          {/* Platform Links */}
          <div className="space-y-3">
            <h4 className="font-mono text-xs font-semibold uppercase tracking-wider text-white">
              Platform
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link
                  to="/dashboard"
                  className="transition-colors hover:text-white"
                >
                  Job Discovery Dashboard
                </Link>
              </li>
              <li>
                <a href="#preview" className="transition-colors hover:text-white">
                  Fresh Opportunities
                </a>
              </li>
              <li>
                <a href="#how-it-works" className="transition-colors hover:text-white">
                  How It Works
                </a>
              </li>
              <li>
                <a href="#features" className="transition-colors hover:text-white">
                  Capabilities & Filters
                </a>
              </li>
              <li>
                <a href="#pipeline" className="transition-colors hover:text-white">
                  Data Architecture
                </a>
              </li>
            </ul>
          </div>

          {/* Source & Resources */}
          <div className="space-y-3">
            <h4 className="font-mono text-xs font-semibold uppercase tracking-wider text-white">
              Resources
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <a
                  href="https://github.com"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1 transition-colors hover:text-white"
                >
                  <span>GitHub Repository</span>
                  <ArrowUpRight className="h-3 w-3" />
                </a>
              </li>
              <li>
                <Link
                  to="/dashboard"
                  className="inline-flex items-center gap-1 transition-colors hover:text-white"
                >
                  <span>API Status</span>
                  <span className="rounded bg-emerald-500/15 px-1.5 py-0.2 font-mono text-[9px] text-emerald-400">
                    Live
                  </span>
                </Link>
              </li>
              <li>
                <span className="text-[var(--color-text-muted)]">
                  Hourly Synchronization
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom copyright line */}
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-[var(--color-border)]/60 pt-8 sm:flex-row text-xs text-[var(--color-text-muted)]">
          <p>© {new Date().getFullYear()} HireScope. Built for software engineers.</p>
          <div className="flex items-center gap-4">
            <span className="font-mono text-[11px]">
              Direct ATS Ingestion · No Middlemen
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}

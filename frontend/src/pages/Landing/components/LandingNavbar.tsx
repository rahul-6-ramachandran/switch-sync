import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Menu, X, ArrowRight, Sparkles } from "lucide-react";
import { RadarMark } from "@/components/layout/RadarMark";
import { Button } from "@/components/ui/button";

export function LandingNavbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { label: "Jobs", href: "#preview" },
    { label: "How It Works", href: "#how-it-works" },
    { label: "Features", href: "#features" },
    { label: "Architecture", href: "#pipeline" },
  ];

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        isScrolled
          ? "border-b border-[var(--color-border)] bg-[#0a0a0c]/85 backdrop-blur-md shadow-2xl shadow-black/40"
          : "border-b border-transparent bg-[#0a0a0c]/50 backdrop-blur-sm"
      }`}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Brand */}
        <Link
          to="/"
          className="group flex items-center gap-2.5 transition-opacity hover:opacity-90"
          aria-label="HireScope Home"
        >
          <div className="relative flex items-center justify-center">
            <RadarMark size={28} />
            <div className="absolute -inset-1 rounded-full bg-[var(--color-accent)]/20 blur-sm opacity-0 transition-opacity group-hover:opacity-100" />
          </div>
          <span className="text-base font-semibold tracking-tight text-[var(--color-text-primary)]">
            HireScope
          </span>
          <span className="hidden rounded-full border border-[var(--color-accent)]/30 bg-[var(--color-accent)]/10 px-2 py-0.5 text-[10px] font-medium tracking-wide text-[var(--color-accent)] sm:inline-flex">
            ATS Direct
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-1 rounded-full border border-[var(--color-border)] bg-[var(--color-surface)]/60 px-4 py-1.5 backdrop-blur-sm md:flex">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="rounded-full px-3 py-1 text-sm font-medium text-[var(--color-text-secondary)] transition-colors hover:text-[var(--color-text-primary)] hover:bg-[var(--color-surface-2)]"
            >
              {link.label}
            </a>
          ))}
          <Link
            to="/dashboard"
            className="rounded-full px-3 py-1 text-sm font-medium text-[var(--color-text-secondary)] transition-colors hover:text-[var(--color-text-primary)] hover:bg-[var(--color-surface-2)] flex items-center gap-1.5"
          >
            <span>Live Radar</span>
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
            </span>
          </Link>
        </nav>

        {/* Actions */}
        <div className="hidden items-center gap-3 md:flex">
          <Button
            asChild
            variant="ghost"
            size="sm"
            className="text-xs text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]"
          >
            <Link to="/dashboard">Sign In</Link>
          </Button>

          <Button
            asChild
            size="sm"
            className="group relative overflow-hidden rounded-lg bg-[var(--color-accent)] px-4 py-2 text-xs font-semibold text-white shadow-md shadow-[var(--color-accent)]/20 transition-all hover:bg-[var(--color-accent-hover)] hover:shadow-lg hover:shadow-[var(--color-accent)]/30 active:scale-[0.98]"
          >
            <Link to="/dashboard" className="flex items-center gap-1.5">
              <span>Explore Jobs</span>
              <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </Button>
        </div>

        {/* Mobile menu trigger */}
        <div className="flex items-center gap-2 md:hidden">
          <Button
            asChild
            size="sm"
            className="h-8 rounded-md bg-[var(--color-accent)] px-2.5 text-xs text-white"
          >
            <Link to="/dashboard">Dashboard</Link>
          </Button>
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-text-primary)] transition-colors hover:bg-[var(--color-surface-2)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]"
            aria-expanded={mobileMenuOpen}
            aria-label={mobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
          >
            {mobileMenuOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="border-b border-[var(--color-border)] bg-[#0c0d12] px-4 pt-3 pb-6 md:hidden">
          <div className="flex flex-col space-y-2">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-between rounded-lg px-3 py-2.5 text-sm font-medium text-[var(--color-text-secondary)] transition-colors hover:bg-[var(--color-surface-2)] hover:text-[var(--color-text-primary)]"
              >
                <span>{link.label}</span>
                <span className="text-xs text-[var(--color-text-muted)]">→</span>
              </a>
            ))}

            <Link
              to="/dashboard"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-between rounded-lg px-3 py-2.5 text-sm font-medium text-[var(--color-text-primary)] bg-[var(--color-surface-2)]/60"
            >
              <div className="flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-[var(--color-accent)]" />
                <span>Live Job Radar</span>
              </div>
              <span className="rounded-full bg-emerald-500/20 px-2 py-0.5 text-[10px] font-mono text-emerald-400">
                Live
              </span>
            </Link>

            <div className="pt-3 border-t border-[var(--color-border)] flex flex-col gap-2">
              <Button
                asChild
                className="w-full justify-center bg-[var(--color-accent)] text-white shadow-md shadow-[var(--color-accent)]/20"
              >
                <Link to="/dashboard" onClick={() => setMobileMenuOpen(false)}>
                  Explore All Jobs →
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                className="w-full justify-center text-xs"
              >
                <Link to="/dashboard" onClick={() => setMobileMenuOpen(false)}>
                  Sign In
                </Link>
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

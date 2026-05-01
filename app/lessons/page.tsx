"use client";

import Link from "next/link";
import { motion } from "framer-motion";

const tracks = [
  {
    slug: "investment-banking",
    title: "Investment Banking",
    description: "M&A, IPOs, debt issuance, and the deal lifecycle.",
    status: "live" as const,
    lessons: 8,
    href: "/lessons/ib-foundations/what-is-investment-banking",
  },
  {
    slug: "equity-research",
    title: "Equity Research",
    description: "Buy-side and sell-side analysis, models, and stock pitches.",
    status: "coming-soon" as const,
  },
  {
    slug: "sales-trading",
    title: "Sales & Trading",
    description: "Markets, derivatives, and the trading floor playbook.",
    status: "coming-soon" as const,
  },
  {
    slug: "private-equity-vc",
    title: "Private Equity & VC",
    description: "LBOs, growth equity, term sheets, and investor mindset.",
    status: "coming-soon" as const,
  },
  {
    slug: "corporate-development",
    title: "Corporate Development",
    description: "Strategic M&A, integration, and CorpDev career paths.",
    status: "coming-soon" as const,
  },
  {
    slug: "financial-planning-analysis",
    title: "Financial Planning & Analysis",
    description: "Budgeting, forecasting, and FP&A in modern companies.",
    status: "coming-soon" as const,
  },
];

export default function LessonsPage() {
  return (
    <main className="min-h-screen bg-ivory">
      {/* Header */}
      <section className="bg-navy text-ivory">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-14 sm:py-20">
          <p className="text-gold text-xs font-semibold uppercase tracking-[0.2em] mb-4">
            Curriculum
          </p>
          <h1 className="font-serif text-3xl sm:text-5xl font-bold text-ivory mb-4">
            Learning Tracks
          </h1>
          <p className="text-ivory/60 text-base max-w-xl">
            Six tracks designed to take you from zero to analyst-ready. Start
            with Investment Banking and build your foundation.
          </p>
        </div>
      </section>

      <div className="h-px bg-gradient-to-r from-transparent via-gold/40 to-transparent" />

      {/* Tracks */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {tracks.map((track, i) => (
            <motion.div
              key={track.slug}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              whileHover={{
                y: -4,
                boxShadow: "0 0 0 1.5px #C9A961, 0 8px 32px 0 rgba(201,169,97,0.18)",
                transition: { duration: 0.22 },
              }}
              className="border border-gold/20 bg-white p-7 flex flex-col gap-5 rounded-sm"
            >
              {/* Status row */}
              <div className="flex items-center justify-between">
                {track.status === "live" ? (
                  <span className="text-xs text-gold font-semibold uppercase tracking-widest">
                    {track.lessons} lessons
                  </span>
                ) : (
                  <span className="text-xs font-semibold px-2.5 py-0.5 border border-gold/40 text-gold/70 uppercase tracking-widest">
                    Coming Soon
                  </span>
                )}
              </div>

              {/* Title + Description */}
              <div>
                <h2 className="font-serif text-xl font-bold text-charcoal mb-2">
                  {track.title}
                </h2>
                <p className="text-muted text-sm leading-relaxed font-sans">
                  {track.description}
                </p>
              </div>

              {/* CTA */}
              <div className="mt-auto pt-4 border-t border-gold/10">
                {track.status === "live" ? (
                  <Link
                    href={track.href!}
                    className="inline-block text-sm font-semibold text-navy border-b border-navy/30 hover:border-gold hover:text-gold transition-colors duration-200"
                  >
                    Begin Track →
                  </Link>
                ) : (
                  <Link
                    href={`/waitlist?track=${track.slug}`}
                    className="inline-block text-sm font-semibold text-ivory bg-navy px-4 py-2 hover:bg-navy-light transition-colors duration-200"
                  >
                    Notify Me
                  </Link>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      <footer className="border-t border-gold/20 py-8 text-center text-xs text-muted">
        © {new Date().getFullYear()} Finlingo. All rights reserved.
      </footer>
    </main>
  );
}

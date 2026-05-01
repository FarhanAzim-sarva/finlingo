import Link from "next/link";

const tracks = [
  {
    id: "ib-foundations",
    title: "IB Foundations",
    description:
      "Understand what investment banks do, how they make money, and how they're structured. The essential primer before anything else.",
    lessons: 8,
    icon: "I",
    firstLesson: "/lessons/ib-foundations/what-is-investment-banking",
    tags: ["Bulge Bracket", "Coverage Groups", "Deal Flow"],
  },
  {
    id: "ma",
    title: "Mergers & Acquisitions",
    description:
      "Walk through a live M&A deal from mandate to close — strategic rationale, due diligence, deal structuring, and synergy modeling.",
    lessons: 10,
    icon: "M&A",
    firstLesson: "#",
    tags: ["Deal Structure", "Due Diligence", "Synergies"],
    locked: true,
  },
  {
    id: "valuation",
    title: "Valuation",
    description:
      "Master the three valuation methodologies every analyst must know: DCF, comparable companies, and precedent transactions.",
    lessons: 9,
    icon: "V",
    firstLesson: "#",
    tags: ["DCF", "Comps", "Precedents"],
    locked: true,
  },
  {
    id: "financial-modeling",
    title: "Financial Modeling",
    description:
      "Build three-statement models and LBO models from scratch. Learn the mechanics of how Excel models are used in live deals.",
    lessons: 12,
    icon: "FM",
    firstLesson: "#",
    tags: ["3-Statement", "LBO", "Sensitivity Analysis"],
    locked: true,
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
            Four tracks designed to take you from zero to analyst-ready. Start
            with IB Foundations and work your way through.
          </p>
        </div>
      </section>

      <div className="h-px bg-gradient-to-r from-transparent via-gold/40 to-transparent" />

      {/* Tracks */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {tracks.map((track) => (
            <div
              key={track.id}
              className={`border border-gold/20 bg-white p-7 flex flex-col gap-5 ${
                track.locked ? "opacity-70" : "hover:border-gold/50 transition-colors"
              }`}
            >
              <div className="flex items-start justify-between">
                <span className="bg-navy text-gold text-xs font-bold px-3 py-1.5 font-serif">
                  {track.icon}
                </span>
                {track.locked && (
                  <span className="text-xs text-muted border border-muted/30 px-2 py-0.5">
                    Coming Soon
                  </span>
                )}
              </div>

              <div>
                <h2 className="font-serif text-xl font-bold text-charcoal mb-2">
                  {track.title}
                </h2>
                <p className="text-muted text-sm leading-relaxed">
                  {track.description}
                </p>
              </div>

              <div className="flex flex-wrap gap-2">
                {track.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-xs text-navy/70 border border-navy/20 px-2 py-0.5"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-gold/10 mt-auto">
                <span className="text-xs text-muted">
                  {track.lessons} lessons
                </span>
                {track.locked ? (
                  <span className="text-xs text-muted">Locked</span>
                ) : (
                  <Link
                    href={track.firstLesson}
                    className="text-sm font-semibold text-navy border-b border-navy/30 hover:border-gold hover:text-gold transition-colors"
                  >
                    Begin Track →
                  </Link>
                )}
              </div>

              {/* Progress placeholder */}
              <div className="h-1 bg-ivory-dark w-full">
                <div
                  className="h-1 bg-gold"
                  style={{ width: track.locked ? "0%" : "12%" }}
                />
              </div>
            </div>
          ))}
        </div>
      </section>

      <footer className="border-t border-gold/20 py-8 text-center text-xs text-muted">
        © {new Date().getFullYear()} Finlingo. All rights reserved.
      </footer>
    </main>
  );
}

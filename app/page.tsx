"use client";

import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import { motion, useInView } from "framer-motion";

// ── Count-up number that animates when scrolled into view ──────────────────────
function CountUp({ target, suffix = "" }: { target: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    const duration = 1200;
    const startTime = performance.now();
    const tick = (now: number) => {
      const progress = Math.min((now - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * target));
      if (progress < 1) requestAnimationFrame(tick);
      else setCount(target);
    };
    requestAnimationFrame(tick);
  }, [isInView, target]);

  return <span ref={ref}>{count}{suffix}</span>;
}

// ── Floating ambient SVG shapes behind the hero ────────────────────────────────
function AmbientShapes() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden>
      {/* Large ring — top-left, slow drift */}
      <motion.div
        className="absolute"
        style={{ top: "-8%", left: "-4%", opacity: 0.07 }}
        animate={{ y: [0, -18, 0], x: [0, 10, 0] }}
        transition={{ duration: 11, repeat: Infinity, ease: "easeInOut" }}
      >
        <svg width="340" height="340" viewBox="0 0 340 340">
          <circle cx="170" cy="170" r="150" fill="none" stroke="#C9A961" strokeWidth="1.5" />
        </svg>
      </motion.div>

      {/* Small diamond — upper right */}
      <motion.div
        className="absolute"
        style={{ top: "14%", right: "7%", opacity: 0.08 }}
        animate={{ rotate: [0, 20, 0], y: [0, 14, 0] }}
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
      >
        <svg width="56" height="56" viewBox="0 0 56 56">
          <rect
            x="14" y="14" width="28" height="28"
            fill="none" stroke="#C9A961" strokeWidth="1.5"
            transform="rotate(45 28 28)"
          />
        </svg>
      </motion.div>

      {/* Stacked lines — mid right */}
      <motion.div
        className="absolute"
        style={{ top: "48%", right: "5%", opacity: 0.06 }}
        animate={{ x: [0, 8, 0], opacity: [0.06, 0.1, 0.06] }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
      >
        <svg width="72" height="28" viewBox="0 0 72 28">
          <line x1="0" y1="4"  x2="72" y2="4"  stroke="#C9A961" strokeWidth="1" />
          <line x1="0" y1="14" x2="54" y2="14" stroke="#C9A961" strokeWidth="1" />
          <line x1="0" y1="24" x2="36" y2="24" stroke="#C9A961" strokeWidth="1" />
        </svg>
      </motion.div>

      {/* Soft filled circle — lower left */}
      <motion.div
        className="absolute"
        style={{ bottom: "4%", left: "8%", opacity: 0.05 }}
        animate={{ y: [0, 16, 0], scale: [1, 1.06, 1] }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
      >
        <svg width="190" height="190" viewBox="0 0 190 190">
          <circle cx="95" cy="95" r="85" fill="#FAF8F3" />
        </svg>
      </motion.div>
    </div>
  );
}

// ── Data ───────────────────────────────────────────────────────────────────────
const valueProps = [
  {
    icon: "◈",
    title: "Structured Curriculum",
    body: "Four tracks covering IB Foundations, M&A, Valuation, and Financial Modeling — built around how real deals are executed.",
  },
  {
    icon: "◉",
    title: "Learn by Doing",
    body: "Every lesson ends with a quiz. No passive reading — concepts are reinforced through practice and instant feedback.",
  },
  {
    icon: "◆",
    title: "AI Tutor, 24/7",
    body: "Ask any finance question and get concise, professional answers from an AI trained on IB concepts and terminology.",
  },
];

const WHITE_WORDS = ["From", "Classroom", "to", "Wall", "Street."];
// Timing: 5 words stagger 0.2 → 0.6s start; last completes at ~1.1s; gold at 1.4s.
const GOLD_DELAY = 1.4;

// ── Page ───────────────────────────────────────────────────────────────────────
export default function LandingPage() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (email.trim()) setSubmitted(true);
  }

  return (
    <main className="min-h-screen bg-ivory">

      {/* ── Hero ── */}
      <section className="relative bg-navy text-ivory overflow-hidden">
        <AmbientShapes />

        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 py-24 sm:py-36 text-center">

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="text-gold text-xs font-semibold uppercase tracking-[0.2em] mb-6"
          >
            Finance Career Education
          </motion.p>

          <h1 className="font-serif text-4xl sm:text-6xl font-bold leading-tight text-ivory mb-6">
            <span className="block">
              {WHITE_WORDS.map((word, i) => (
                <motion.span
                  key={word}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 + i * 0.1 }}
                  className="inline-block mr-[0.25em] last:mr-0"
                >
                  {word}
                </motion.span>
              ))}
            </span>
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: GOLD_DELAY }}
              className="text-gold block"
            >
              The Finance Career Platform.
            </motion.span>
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: GOLD_DELAY + 0.3 }}
            className="text-ivory/70 text-lg sm:text-xl max-w-2xl mx-auto mb-12 leading-relaxed"
          >
            Master investment banking, equity research, sales & trading, private equity,
            corporate development, and FP&A — with an AI tutor on call.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: GOLD_DELAY + 0.5 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <motion.div
              whileHover={{ scale: 1.02, boxShadow: "0 0 22px rgba(201,169,97,0.45)" }}
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 0.18 }}
            >
              <Link
                href="/lessons"
                className="inline-block bg-gold text-navy font-semibold text-sm px-8 py-3 hover:bg-gold-light transition-colors"
              >
                Start Learning
              </Link>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.02, boxShadow: "0 0 16px rgba(201,169,97,0.2)" }}
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 0.18 }}
            >
              <Link
                href="/chat"
                className="inline-block border border-ivory/30 text-ivory text-sm font-medium px-8 py-3 hover:border-gold hover:text-gold transition-colors"
              >
                Ask the AI Tutor
              </Link>
            </motion.div>
          </motion.div>

        </div>
      </section>

      {/* Divider */}
      <div className="h-px bg-gradient-to-r from-transparent via-gold/40 to-transparent" />

      {/* ── Value Props ── */}
      <motion.section
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.6 }}
        className="max-w-5xl mx-auto px-4 sm:px-6 py-20 sm:py-28"
      >
        <h2 className="font-serif text-2xl sm:text-3xl text-charcoal text-center mb-16">
          Why Finlingo
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-10">
          {valueProps.map(({ icon, title, body }, i) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="border-t-2 border-gold pt-6"
            >
              <span className="text-gold text-2xl block mb-4">{icon}</span>
              <h3 className="font-serif text-lg font-semibold text-charcoal mb-3">{title}</h3>
              <p className="text-muted text-sm leading-relaxed">{body}</p>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* ── Stats Strip ── */}
      <section className="bg-ivory-dark border-y border-gold/20 py-10">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 flex flex-wrap justify-center gap-10 text-center">
          {[
            { content: <CountUp target={6} />, label: "Learning Tracks", delay: 0 },
            { content: <CountUp target={30} suffix="+" />, label: "Lessons Planned", delay: 0.1 },
            { content: <>AI Tutor</>, label: "Always Available", delay: 0.2 },
          ].map(({ content, label, delay }) => (
            <motion.div
              key={label}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay }}
            >
              <p className="font-serif text-3xl font-bold text-navy">{content}</p>
              <p className="text-xs uppercase tracking-widest text-muted mt-1">{label}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── Email Capture ── */}
      <motion.section
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.6 }}
        className="bg-navy text-ivory py-20 sm:py-28"
      >
        <div className="max-w-xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="font-serif text-2xl sm:text-3xl font-bold mb-4">
            Get Early Access
          </h2>
          <p className="text-ivory/60 text-sm mb-8">
            Be first to know when new tracks and features launch.
          </p>
          {submitted ? (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4 }}
              className="text-gold font-medium text-sm"
            >
              You&apos;re on the list. We&apos;ll be in touch.
            </motion.p>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                required
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 bg-white/10 border border-white/20 text-ivory placeholder-ivory/40 px-4 py-2.5 text-sm focus:outline-none focus:border-gold"
              />
              <motion.button
                type="submit"
                whileHover={{ scale: 1.02, boxShadow: "0 0 18px rgba(201,169,97,0.4)" }}
                whileTap={{ scale: 0.98 }}
                transition={{ duration: 0.18 }}
                className="bg-gold text-navy font-semibold text-sm px-6 py-2.5 hover:bg-gold-light transition-colors"
              >
                Notify Me
              </motion.button>
            </form>
          )}
        </div>
      </motion.section>

      {/* ── Footer ── */}
      <footer className="border-t border-gold/20 py-8 text-center text-xs text-muted">
        © {new Date().getFullYear()} Finlingo. All rights reserved.
      </footer>

    </main>
  );
}

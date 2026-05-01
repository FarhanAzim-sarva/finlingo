"use client";

import Link from "next/link";
import { useState } from "react";

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

export default function LandingPage() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (email.trim()) setSubmitted(true);
  }

  return (
    <main className="min-h-screen bg-ivory">
      {/* Hero */}
      <section className="bg-navy text-ivory">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-24 sm:py-36 text-center">
          <p className="text-gold text-xs font-semibold uppercase tracking-[0.2em] mb-6">
            Investment Banking Education
          </p>
          <h1 className="font-serif text-4xl sm:text-6xl font-bold leading-tight text-ivory mb-6">
            Master Investment Banking.
            <br />
            <span className="text-gold">One Lesson at a Time.</span>
          </h1>
          <p className="text-ivory/70 text-lg sm:text-xl max-w-2xl mx-auto mb-12 leading-relaxed">
            Structured lessons in IB fundamentals, M&A, valuation, and financial
            modeling — with an AI tutor always on call.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/lessons"
              className="bg-gold text-navy font-semibold text-sm px-8 py-3 hover:bg-gold-light transition-colors"
            >
              Start Learning
            </Link>
            <Link
              href="/chat"
              className="border border-ivory/30 text-ivory text-sm font-medium px-8 py-3 hover:border-gold hover:text-gold transition-colors"
            >
              Ask the AI Tutor
            </Link>
          </div>
        </div>
      </section>

      {/* Divider rule */}
      <div className="h-px bg-gradient-to-r from-transparent via-gold/40 to-transparent" />

      {/* Value Props */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 py-20 sm:py-28">
        <h2 className="font-serif text-2xl sm:text-3xl text-charcoal text-center mb-16">
          Why Finlingo
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-10">
          {valueProps.map(({ icon, title, body }) => (
            <div key={title} className="border-t-2 border-gold pt-6">
              <span className="text-gold text-2xl block mb-4">{icon}</span>
              <h3 className="font-serif text-lg font-semibold text-charcoal mb-3">
                {title}
              </h3>
              <p className="text-muted text-sm leading-relaxed">{body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Social Proof Strip */}
      <section className="bg-ivory-dark border-y border-gold/20 py-10">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 flex flex-wrap justify-center gap-10 text-center">
          {[
            ["4", "Learning Tracks"],
            ["30+", "Lessons Planned"],
            ["AI Tutor", "Always Available"],
          ].map(([stat, label]) => (
            <div key={label}>
              <p className="font-serif text-3xl font-bold text-navy">{stat}</p>
              <p className="text-xs uppercase tracking-widest text-muted mt-1">{label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Email Capture */}
      <section className="bg-navy text-ivory py-20 sm:py-28">
        <div className="max-w-xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="font-serif text-2xl sm:text-3xl font-bold mb-4">
            Get Early Access
          </h2>
          <p className="text-ivory/60 text-sm mb-8">
            Be first to know when new tracks and features launch.
          </p>
          {submitted ? (
            <p className="text-gold font-medium text-sm">
              You&apos;re on the list. We&apos;ll be in touch.
            </p>
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
              <button
                type="submit"
                className="bg-gold text-navy font-semibold text-sm px-6 py-2.5 hover:bg-gold-light transition-colors"
              >
                Notify Me
              </button>
            </form>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gold/20 py-8 text-center text-xs text-muted">
        © {new Date().getFullYear()} Finlingo. All rights reserved.
      </footer>
    </main>
  );
}

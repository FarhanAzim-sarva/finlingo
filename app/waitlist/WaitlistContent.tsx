"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";

const TRACKS = [
  { label: "Investment Banking", value: "investment-banking" },
  { label: "Equity Research", value: "equity-research" },
  { label: "Sales & Trading", value: "sales-trading" },
  { label: "Private Equity & VC", value: "private-equity-vc" },
  { label: "Corporate Development", value: "corporate-development" },
  { label: "Financial Planning & Analysis", value: "financial-planning-analysis" },
];

const fieldItem = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

const fieldContainer = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1, delayChildren: 0.05 } },
};

export default function WaitlistContent() {
  const searchParams = useSearchParams();
  const trackParam = searchParams.get("track") ?? "";

  const [email, setEmail] = useState("");
  const [track, setTrack] = useState(trackParam);
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    if (trackParam) setTrack(trackParam);
  }, [trackParam]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    setErrorMsg("");

    const res = await fetch("/api/waitlist", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, track, message }),
    });

    const data = await res.json();

    if (data.success) {
      setStatus("success");
      confetti({
        particleCount: 120,
        spread: 80,
        origin: { y: 0.5 },
        colors: ["#C9A961", "#D4B97A", "#0A1F44", "#FAF8F3", "#ffffff"],
        ticks: 140,
      });
    } else {
      setStatus("error");
      setErrorMsg(data.error ?? "Something went wrong. Please try again.");
    }
  }

  const inputClass =
    "w-full bg-white border border-gold/25 px-4 py-3 text-sm text-charcoal placeholder:text-muted/60 focus:outline-none focus:border-gold transition-colors duration-200";

  return (
    <main className="min-h-screen bg-ivory">
      {/* Hero */}
      <section className="bg-navy text-ivory">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 py-16 sm:py-24 text-center">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="text-gold text-xs font-semibold uppercase tracking-[0.2em] mb-5"
          >
            Early Access
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="font-serif text-4xl sm:text-6xl font-bold text-ivory mb-6 leading-tight"
          >
            Be First in Line.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-ivory/65 text-base sm:text-lg max-w-lg mx-auto leading-relaxed"
          >
            We&apos;re building the most comprehensive finance career platform.
            Get early access when new tracks launch.
          </motion.p>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.35 }}
            className="mt-5 text-xs text-gold/60 tracking-wide"
          >
            Join early Finlingo users.
          </motion.p>
        </div>
      </section>

      <div className="h-px bg-gradient-to-r from-transparent via-gold/40 to-transparent" />

      {/* Form / Success */}
      <section className="max-w-xl mx-auto px-4 sm:px-6 py-14 sm:py-20">
        <AnimatePresence mode="wait">
          {status === "success" ? (
            <motion.div
              key="success"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-center py-10"
            >
              <p className="font-serif text-4xl font-bold text-charcoal mb-4">
                You&apos;re on the list.
              </p>
              <p className="text-muted text-base leading-relaxed max-w-sm mx-auto mb-6">
                We&apos;ll reach out the moment your track launches. Keep
                building — your career starts here.
              </p>
              <p className="text-xs text-gold/70 font-semibold uppercase tracking-widest">
                Welcome aboard.
              </p>
            </motion.div>
          ) : (
            <motion.form
              key="form"
              variants={fieldContainer}
              initial="hidden"
              animate="show"
              onSubmit={handleSubmit}
              className="flex flex-col gap-5"
            >
              {/* Email */}
              <motion.div variants={fieldItem}>
                <label className="block text-xs font-semibold text-charcoal uppercase tracking-widest mb-2">
                  Email <span className="text-gold">*</span>
                </label>
                <input
                  type="email"
                  required
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={inputClass}
                />
              </motion.div>

              {/* Track */}
              <motion.div variants={fieldItem}>
                <label className="block text-xs font-semibold text-charcoal uppercase tracking-widest mb-2">
                  Which track interests you most?
                </label>
                <select
                  value={track}
                  onChange={(e) => setTrack(e.target.value)}
                  className={inputClass}
                >
                  <option value="">Select a track…</option>
                  {TRACKS.map((t) => (
                    <option key={t.value} value={t.value}>
                      {t.label}
                    </option>
                  ))}
                </select>
              </motion.div>

              {/* Message */}
              <motion.div variants={fieldItem}>
                <label className="block text-xs font-semibold text-charcoal uppercase tracking-widest mb-2">
                  What would you most want to learn?{" "}
                  <span className="text-muted normal-case tracking-normal font-normal">
                    (optional)
                  </span>
                </label>
                <textarea
                  placeholder="Tell us what you're hoping to get out of Finlingo…"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  maxLength={500}
                  rows={4}
                  className={`${inputClass} resize-none`}
                />
                <p className="text-right text-xs text-muted/60 mt-1">
                  {message.length}/500
                </p>
              </motion.div>

              {/* Error */}
              {status === "error" && errorMsg && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-sm text-red-500"
                >
                  {errorMsg}
                </motion.p>
              )}

              {/* Submit */}
              <motion.div variants={fieldItem}>
                <motion.button
                  type="submit"
                  disabled={status === "loading"}
                  whileHover={{
                    scale: 1.02,
                    boxShadow: "0 0 18px rgba(201,169,97,0.35)",
                  }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ duration: 0.18 }}
                  className="w-full bg-navy text-ivory font-semibold text-sm py-4 tracking-wide hover:bg-navy-light transition-colors duration-200 disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {status === "loading" ? "Joining…" : "Join the Waitlist"}
                </motion.button>
              </motion.div>
            </motion.form>
          )}
        </AnimatePresence>
      </section>

      <footer className="border-t border-gold/20 py-8 text-center text-xs text-muted">
        © {new Date().getFullYear()} Finlingo. All rights reserved.
      </footer>
    </main>
  );
}

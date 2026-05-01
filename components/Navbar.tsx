"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const navLinks = [
  { href: "/lessons", label: "Lessons" },
  { href: "/chat", label: "AI Tutor" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <nav className="bg-navy text-ivory border-b border-gold/20 sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
        <Link
          href="/"
          className="font-serif text-xl font-semibold tracking-tight text-gold"
        >
          Finlingo
        </Link>

        {/* Desktop links */}
        <div className="hidden sm:flex items-center gap-8">
          {navLinks.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className={`text-sm font-medium tracking-wide transition-colors ${
                pathname.startsWith(href)
                  ? "text-gold"
                  : "text-ivory/70 hover:text-ivory"
              }`}
            >
              {label}
            </Link>
          ))}
          <Link
            href="/lessons"
            className="text-sm bg-gold text-navy font-semibold px-4 py-1.5 hover:bg-gold-light transition-colors"
          >
            Start Learning
          </Link>
        </div>

        {/* Mobile hamburger */}
        <button
          className="sm:hidden text-ivory/70 hover:text-ivory"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            {open ? (
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="sm:hidden border-t border-gold/20 bg-navy px-4 py-4 flex flex-col gap-4">
          {navLinks.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              onClick={() => setOpen(false)}
              className="text-sm font-medium text-ivory/80 hover:text-gold transition-colors"
            >
              {label}
            </Link>
          ))}
          <Link
            href="/lessons"
            onClick={() => setOpen(false)}
            className="text-sm bg-gold text-navy font-semibold px-4 py-2 text-center hover:bg-gold-light transition-colors"
          >
            Start Learning
          </Link>
        </div>
      )}
    </nav>
  );
}

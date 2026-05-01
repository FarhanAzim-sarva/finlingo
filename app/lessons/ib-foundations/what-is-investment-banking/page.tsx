import Link from "next/link";
import Quiz, { Question } from "@/components/Quiz";

const questions: Question[] = [
  {
    question:
      "Which of the following is the primary role of an investment bank's advisory division?",
    options: [
      "Lending money directly to retail consumers",
      "Advising corporations on mergers, acquisitions, and capital raises",
      "Managing index funds for retail investors",
      "Issuing government bonds on behalf of central banks",
    ],
    correctIndex: 1,
    explanation:
      "Investment banks in their advisory capacity — the M&A and ECM/DCM coverage desks — advise corporate clients on strategic transactions, capital structure, and how to access public or private capital markets. They do not lend to retail consumers (that's commercial banking) or manage passive funds.",
  },
  {
    question:
      "What does the 'buy-side' refer to in the context of financial markets?",
    options: [
      "Banks that underwrite securities for issuers",
      "Firms that purchase securities, such as hedge funds, PE firms, and asset managers",
      "Stock exchanges that facilitate trading",
      "Regulators that approve financial products",
    ],
    correctIndex: 1,
    explanation:
      "The buy-side encompasses institutions that deploy capital to purchase securities — private equity firms, hedge funds, mutual funds, sovereign wealth funds, and endowments. The sell-side (banks) creates and distributes products; the buy-side evaluates and acquires them.",
  },
  {
    question:
      "What is a 'pitch book' in investment banking?",
    options: [
      "A regulatory filing submitted to the SEC",
      "An internal compliance document listing client restrictions",
      "A presentation prepared by bankers to win or support a deal mandate",
      "A standardized pricing model for derivatives",
    ],
    correctIndex: 2,
    explanation:
      "A pitch book (or 'deck') is a presentation — typically prepared in PowerPoint — that investment bankers use to win new business (a 'pitch') or to advise clients through a transaction. It typically includes market context, comparable transactions, valuation analysis, and the bank's proposed approach.",
  },
];

export default function WhatIsIBPage() {
  return (
    <main className="min-h-screen bg-ivory">
      {/* Breadcrumb + header */}
      <section className="bg-navy text-ivory">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
          <nav className="text-xs text-ivory/40 mb-6 flex items-center gap-2">
            <Link href="/lessons" className="hover:text-gold transition-colors">
              Lessons
            </Link>
            <span>/</span>
            <span className="text-ivory/60">IB Foundations</span>
            <span>/</span>
            <span className="text-ivory/80">What Is Investment Banking?</span>
          </nav>
          <p className="text-gold text-xs font-semibold uppercase tracking-[0.2em] mb-3">
            IB Foundations · Lesson 1
          </p>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-ivory mb-4">
            What Is Investment Banking?
          </h1>
          <p className="text-ivory/60 text-sm">
            ~8 min read · 3-question quiz at the end
          </p>
        </div>
      </section>

      <div className="h-px bg-gradient-to-r from-transparent via-gold/40 to-transparent" />

      {/* Lesson content */}
      <article className="max-w-3xl mx-auto px-4 sm:px-6 py-14 sm:py-20 prose-custom">
        <div className="text-charcoal leading-8 text-[1.05rem] flex flex-col gap-7">
          <p>
            Investment banking is a segment of the financial services industry
            that assists corporations, governments, and other institutions in
            raising capital and executing complex financial transactions. Unlike
            commercial banks — which take deposits and make loans — investment
            banks operate primarily as financial intermediaries and advisors.
            Their core value proposition is expertise: deal structuring, market
            access, valuation judgment, and the relationships to bring the right
            counterparties to the table.
          </p>

          <p>
            At the center of most investment banking activity is the concept of
            capital markets. When a company wants to grow, it has two broad
            options: raise equity (sell ownership stakes) or raise debt (borrow
            money). Investment banks facilitate both. An <strong>equity capital
            market</strong> (ECM) desk manages initial public offerings (IPOs)
            and secondary equity offerings. A <strong>debt capital market</strong>{" "}
            (DCM) desk helps companies issue bonds or arrange leveraged loans.
            In both cases, the bank underwrites the transaction — it commits to
            placing the securities with investors — and earns a fee for doing so.
          </p>

          <p>
            The other major revenue stream is <strong>advisory</strong>, predominantly
            M&A. When Company A wants to acquire Company B, both sides typically
            hire investment bankers to advise them. The sell-side advisor helps the
            target maximize price and navigate the sale process; the buy-side
            advisor helps the acquirer assess valuation, structure the deal, and
            secure financing. Fees on large M&A transactions can run into the tens
            of millions of dollars, which is why a single deal can materially move
            a bank&apos;s quarterly revenue.
          </p>

          <p>
            Internally, investment banks are organized into two broad categories:
            coverage groups and product groups. <strong>Coverage groups</strong>{" "}
            (e.g., Technology, Healthcare, Consumer Retail) own client
            relationships within a specific industry. <strong>Product groups</strong>{" "}
            (M&A, Leveraged Finance, ECM, DCM) provide specialized execution
            expertise across all industries. When a deal is live, coverage bankers
            bring the client relationship and industry context; product bankers
            execute the transaction mechanics. This matrix structure is how bulge
            bracket banks — Goldman Sachs, Morgan Stanley, JPMorgan — organize
            thousands of bankers into coherent deal teams.
          </p>

          <p>
            Understanding this ecosystem matters for anyone entering IB or
            evaluating banks as a counterparty. The incentives, workflows, and
            career paths of investment banking are all downstream of this
            structure: coverage groups drive origination; product groups drive
            execution; and the entire engine runs on transaction fees, which means
            deal volume and market conditions determine everything from revenue to
            headcount to bonus pools. Master this structure first — everything
            else in IB flows from it.
          </p>
        </div>

        {/* Key Terms sidebar */}
        <div className="mt-12 bg-navy/5 border-l-4 border-gold px-6 py-5">
          <h3 className="font-serif text-base font-bold text-navy mb-3">
            Key Terms
          </h3>
          <dl className="flex flex-col gap-2 text-sm text-charcoal">
            {[
              ["Underwriting", "A bank's commitment to place securities with investors, taking on the pricing risk."],
              ["Bulge Bracket", "The largest, most prestigious global investment banks: Goldman, MS, JPMorgan, BofA, Citi, Barclays, etc."],
              ["Buy-Side / Sell-Side", "Sell-side banks create and distribute products. Buy-side firms (PE, hedge funds) purchase and manage them."],
              ["Coverage Group", "A team organized by industry vertical that owns client relationships."],
            ].map(([term, def]) => (
              <div key={term} className="flex gap-2">
                <dt className="font-semibold text-navy shrink-0">{term}:</dt>
                <dd className="text-muted">{def}</dd>
              </div>
            ))}
          </dl>
        </div>

        {/* Quiz */}
        <Quiz questions={questions} />

        {/* Navigation */}
        <div className="mt-14 pt-8 border-t border-gold/20 flex items-center justify-between">
          <Link
            href="/lessons"
            className="text-sm text-muted hover:text-charcoal transition-colors"
          >
            ← Back to Lessons
          </Link>
          <span className="text-xs text-muted border border-muted/30 px-3 py-1">
            Next Lesson — Coming Soon
          </span>
        </div>
      </article>

      <footer className="border-t border-gold/20 py-8 text-center text-xs text-muted">
        © {new Date().getFullYear()} Finlingo. All rights reserved.
      </footer>
    </main>
  );
}

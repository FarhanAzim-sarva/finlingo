"use client";

import { useState, useRef, useEffect } from "react";

interface Message {
  role: "user" | "assistant";
  content: string;
}

const STARTERS = [
  "What's the difference between EV and equity value?",
  "Walk me through a DCF model.",
  "How does an LBO work?",
  "What is EBITDA and why do bankers use it?",
];

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  async function sendMessage(text?: string) {
    const content = (text ?? input).trim();
    if (!content || loading) return;

    const userMsg: Message = { role: "user", content };
    const next = [...messages, userMsg];
    setMessages(next);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: next }),
      });
      const data = await res.json();
      setMessages([...next, { role: "assistant", content: data.reply ?? data.error }]);
    } catch {
      setMessages([...next, { role: "assistant", content: "Something went wrong. Please try again." }]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-ivory flex flex-col">
      {/* Header */}
      <section className="bg-navy text-ivory shrink-0">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-10 sm:py-14">
          <p className="text-gold text-xs font-semibold uppercase tracking-[0.2em] mb-3">
            AI Tutor
          </p>
          <h1 className="font-serif text-2xl sm:text-3xl font-bold text-ivory mb-2">
            Ask Anything in IB
          </h1>
          <p className="text-ivory/50 text-sm">
            Valuation, M&A, modeling, markets — concise, professional answers.
          </p>
        </div>
      </section>

      <div className="h-px bg-gradient-to-r from-transparent via-gold/40 to-transparent shrink-0" />

      {/* Chat area */}
      <div className="flex-1 overflow-y-auto">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8 flex flex-col gap-6">
          {messages.length === 0 && (
            <div className="flex flex-col gap-4">
              <p className="text-muted text-sm text-center mb-2">
                Suggested questions
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {STARTERS.map((s) => (
                  <button
                    key={s}
                    onClick={() => sendMessage(s)}
                    className="text-left border border-gold/30 px-4 py-3 text-sm text-charcoal hover:border-gold hover:bg-gold/5 transition-colors"
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          )}

          {messages.map((msg, i) => (
            <div
              key={i}
              className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-[85%] text-sm leading-relaxed px-5 py-4 ${
                  msg.role === "user"
                    ? "bg-navy text-ivory"
                    : "bg-white border border-gold/20 text-charcoal"
                }`}
              >
                {msg.role === "assistant" && (
                  <p className="text-gold text-xs font-semibold uppercase tracking-wider mb-2">
                    Finlingo Tutor
                  </p>
                )}
                <p className="whitespace-pre-wrap">{msg.content}</p>
              </div>
            </div>
          ))}

          {loading && (
            <div className="flex justify-start">
              <div className="bg-white border border-gold/20 px-5 py-4 text-sm text-muted flex items-center gap-2">
                <span className="inline-block w-1.5 h-1.5 bg-gold animate-pulse" />
                <span className="inline-block w-1.5 h-1.5 bg-gold animate-pulse delay-75" />
                <span className="inline-block w-1.5 h-1.5 bg-gold animate-pulse delay-150" />
              </div>
            </div>
          )}

          <div ref={bottomRef} />
        </div>
      </div>

      {/* Input */}
      <div className="shrink-0 border-t border-gold/20 bg-ivory">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-4">
          <form
            onSubmit={(e) => { e.preventDefault(); sendMessage(); }}
            className="flex gap-3"
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about IB, M&A, valuation, modeling…"
              className="flex-1 border border-navy/20 bg-white px-4 py-3 text-sm text-charcoal placeholder-muted focus:outline-none focus:border-gold"
              disabled={loading}
            />
            <button
              type="submit"
              disabled={!input.trim() || loading}
              className="bg-navy text-ivory font-semibold text-sm px-5 py-3 hover:bg-navy-light transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
            >
              Send
            </button>
          </form>
          <p className="text-xs text-muted/60 mt-2 text-center">
            Powered by Llama 3.1 via Groq · For educational purposes only.
          </p>
        </div>
      </div>
    </main>
  );
}

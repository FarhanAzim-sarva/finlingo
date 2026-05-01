"use client";

import { useState } from "react";

export interface Question {
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

interface QuizProps {
  questions: Question[];
}

export default function Quiz({ questions }: QuizProps) {
  const [answers, setAnswers] = useState<(number | null)[]>(
    Array(questions.length).fill(null)
  );
  const [submitted, setSubmitted] = useState(false);

  function select(qIdx: number, optIdx: number) {
    if (submitted) return;
    setAnswers((prev) => {
      const next = [...prev];
      next[qIdx] = optIdx;
      return next;
    });
  }

  function handleSubmit() {
    if (answers.some((a) => a === null)) return;
    setSubmitted(true);
  }

  const score = submitted
    ? answers.filter((a, i) => a === questions[i].correctIndex).length
    : 0;

  return (
    <div className="border-t-2 border-gold mt-12 pt-10">
      <h2 className="font-serif text-2xl font-bold text-charcoal mb-2">
        Knowledge Check
      </h2>
      <p className="text-muted text-sm mb-8">
        Answer all questions, then submit to see your results.
      </p>

      <div className="flex flex-col gap-10">
        {questions.map((q, qIdx) => {
          const selected = answers[qIdx];
          return (
            <div key={qIdx}>
              <p className="font-medium text-charcoal mb-4">
                <span className="text-gold font-serif font-bold mr-2">
                  {qIdx + 1}.
                </span>
                {q.question}
              </p>
              <div className="flex flex-col gap-2">
                {q.options.map((opt, optIdx) => {
                  const isSelected = selected === optIdx;
                  const isCorrect = optIdx === q.correctIndex;
                  let style =
                    "border border-navy/20 px-4 py-3 text-sm text-left transition-colors cursor-pointer ";

                  if (!submitted) {
                    style += isSelected
                      ? "bg-navy text-ivory border-navy"
                      : "hover:border-navy/50 hover:bg-ivory-dark";
                  } else {
                    if (isCorrect) {
                      style += "bg-emerald-50 border-emerald-400 text-emerald-900";
                    } else if (isSelected && !isCorrect) {
                      style += "bg-red-50 border-red-400 text-red-900";
                    } else {
                      style += "text-muted";
                    }
                  }

                  return (
                    <button
                      key={optIdx}
                      className={style}
                      onClick={() => select(qIdx, optIdx)}
                    >
                      {opt}
                    </button>
                  );
                })}
              </div>

              {submitted && (
                <div className="mt-3 bg-gold/10 border-l-2 border-gold px-4 py-3 text-sm text-charcoal">
                  <span className="font-semibold">Explanation: </span>
                  {q.explanation}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {!submitted ? (
        <button
          onClick={handleSubmit}
          disabled={answers.some((a) => a === null)}
          className="mt-10 bg-navy text-ivory font-semibold text-sm px-8 py-3 hover:bg-navy-light transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
        >
          Submit Answers
        </button>
      ) : (
        <div className="mt-10 flex items-center gap-4">
          <div className="border-2 border-gold px-6 py-3">
            <p className="font-serif text-3xl font-bold text-navy">
              {score}/{questions.length}
            </p>
            <p className="text-xs text-muted uppercase tracking-wider">Score</p>
          </div>
          <div>
            <p className="font-semibold text-charcoal text-sm">
              {score === questions.length
                ? "Perfect. You've mastered this lesson."
                : score >= questions.length / 2
                ? "Good work — review the explanations above."
                : "Review this lesson and try again."}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

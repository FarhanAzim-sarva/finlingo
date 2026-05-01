import Groq from "groq-sdk";
import { NextRequest, NextResponse } from "next/server";

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

const SYSTEM_PROMPT = `You are an investment banking tutor at Finlingo — a professional finance education platform.

Your role: Answer questions about investment banking, M&A, valuation, financial modeling, capital markets, and related finance topics. You are concise, precise, and professional. You use real finance terminology and cite real-world examples when helpful.

Guidelines:
- Keep answers focused and under ~200 words unless a longer explanation is genuinely required.
- Use industry-standard terminology (e.g., EBITDA, LTM, NTM, accretion/dilution, levered/unlevered free cash flow, WACC, EV/EBITDA).
- When walking through mechanics (e.g., building a DCF), be stepwise and specific — not vague.
- If a concept has nuance (e.g., EV vs equity value bridge), call it out explicitly.
- Do not hedge excessively. Give direct, confident answers.
- If a question is outside finance/IB, politely redirect: "I'm focused on IB and finance topics — happy to help with those."
- Do not fabricate specific deal figures or proprietary data. Say "as of my training data" when relevant.

Tone: Think Goldman Sachs first-year analyst explaining something to a summer analyst — clear, fast, no hand-holding, but not condescending.`;

export async function POST(req: NextRequest) {
  try {
    const { messages } = await req.json();

    if (!Array.isArray(messages)) {
      return NextResponse.json({ error: "Invalid messages format" }, { status: 400 });
    }

    const completion = await groq.chat.completions.create({
      model: "llama-3.1-8b-instant",
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        ...messages,
      ],
      temperature: 0.5,
      max_tokens: 600,
    });

    const reply = completion.choices[0]?.message?.content ?? "";
    return NextResponse.json({ reply });
  } catch (err) {
    console.error("[chat/route] error:", err);
    return NextResponse.json(
      { error: "Failed to get response from AI tutor." },
      { status: 500 }
    );
  }
}

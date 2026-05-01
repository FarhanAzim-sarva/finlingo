import { NextRequest, NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";

const WAITLIST_PATH = path.join(process.cwd(), "data", "waitlist.json");

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

interface WaitlistEntry {
  email: string;
  track: string;
  message: string;
  submittedAt: string;
}

export async function POST(req: NextRequest) {
  let body: { email?: string; track?: string; message?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ success: false, error: "Invalid request body." }, { status: 400 });
  }

  const { email = "", track = "", message = "" } = body;

  if (!EMAIL_RE.test(email)) {
    return NextResponse.json({ success: false, error: "Please enter a valid email address." }, { status: 422 });
  }

  if (message.length > 500) {
    return NextResponse.json({ success: false, error: "Message must be 500 characters or fewer." }, { status: 422 });
  }

  const entry: WaitlistEntry = {
    email: email.trim().toLowerCase(),
    track: track.trim(),
    message: message.trim(),
    submittedAt: new Date().toISOString(),
  };

  try {
    await fs.mkdir(path.dirname(WAITLIST_PATH), { recursive: true });
    let existing: WaitlistEntry[] = [];
    try {
      const raw = await fs.readFile(WAITLIST_PATH, "utf-8");
      existing = JSON.parse(raw);
    } catch {
      // file missing or empty — start fresh
    }
    existing.push(entry);
    await fs.writeFile(WAITLIST_PATH, JSON.stringify(existing, null, 2), "utf-8");
  } catch {
    return NextResponse.json({ success: false, error: "Could not save your entry. Please try again." }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}

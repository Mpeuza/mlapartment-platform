import { NextRequest, NextResponse } from "next/server";

const SYSTEM_PROMPT = `You are the pre-signup assistant for MLApartment, a South
African apartment rent & communication platform built by MLData. You help
website visitors, prospective tenants or landlords, understand how the
platform works: tenants browse and apply for apartments, pay rent online, an
AI agent handles routine WhatsApp conversations, and owners get a dashboard
plus a Power BI report.
Keep answers to 2-3 short sentences. Never invent pricing, legal, or POPIA
compliance details you don't know, for those, tell the visitor to message
the team on WhatsApp instead.`;

export async function POST(req: NextRequest) {
  const { messages } = await req.json();

  if (!process.env.ANTHROPIC_API_KEY) {
    return NextResponse.json(
      { reply: "Chat isn't configured yet — message us on WhatsApp instead." },
      { status: 200 }
    );
  }

  const res = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {
      "x-api-key": process.env.ANTHROPIC_API_KEY,
      "anthropic-version": "2023-06-01",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "claude-haiku-4-5-20251001",
      max_tokens: 300,
      system: SYSTEM_PROMPT,
      messages: (messages ?? []).map((m: { role: string; content: string }) => ({
        role: m.role,
        content: m.content,
      })),
    }),
  });

  if (!res.ok) {
    return NextResponse.json({ reply: "I'm having trouble right now — try WhatsApp instead." }, { status: 200 });
  }

  const data = await res.json();
  const reply = data?.content?.[0]?.text ?? "Sorry, I didn't catch that — try again?";
  return NextResponse.json({ reply });
}
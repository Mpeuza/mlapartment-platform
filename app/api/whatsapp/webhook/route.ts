import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase/admin";

// Meta webhook verification (GET), required once when you register the webhook URL
export async function GET(req: NextRequest) {
  const params = req.nextUrl.searchParams;
  const mode = params.get("hub.mode");
  const token = params.get("hub.verify_token");
  const challenge = params.get("hub.challenge");

  if (mode === "subscribe" && token === process.env.WHATSAPP_VERIFY_TOKEN) {
    return new NextResponse(challenge, { status: 200 });
  }
  return new NextResponse("Forbidden", { status: 403 });
}

// Inbound WhatsApp messages land here
export async function POST(req: NextRequest) {
  const body = await req.json();
  const db = supabaseAdmin();

  // TODO: parse the real Meta Cloud API payload shape:
  // body.entry[0].changes[0].value.messages[0]
  const messageText = "TODO: extract from body";
  const fromNumber = "TODO: extract from body";

  await db.from("agent_logs").insert({
    event: "message_received",
    detail: { from: fromNumber, text: messageText },
  });

  // TODO: call the Claude API here with tenant/lease context to generate a reply,
  // then send it back via the WhatsApp Cloud API send-message endpoint,
  // and log the reply with db.from("agent_logs").insert({ event: "ai_reply_sent", ... })

  return NextResponse.json({ ok: true });
}
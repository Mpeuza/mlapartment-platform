"use client";

import { useState } from "react";

type Msg = { role: "user" | "assistant"; content: string };
const GRADIENT = "linear-gradient(135deg, #22D3C5, #152A44)";

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Msg[]>([
    { role: "assistant", content: "Hi — I can answer questions about paying rent, applying for a place, the WhatsApp agent, or how the dashboard works. What do you need?" },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  async function send() {
    const text = input.trim();
    if (!text || loading) return;
    const next: Msg[] = [...messages, { role: "user", content: text }];
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
      setMessages([...next, { role: "assistant", content: data.reply }]);
    } catch {
      setMessages([...next, { role: "assistant", content: "Something went wrong on my end — try WhatsApp instead." }]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <button
        onClick={() => setOpen((o) => !o)}
        aria-label={open ? "Close chat" : "Open chat"}
        className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full text-white shadow-xl shadow-[#152A44]/30 transition hover:scale-105 focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
        style={{ background: GRADIENT }}
      >
        {open ? "✕" : "💬"}
      </button>

      {open && (
        <div className="fixed bottom-24 right-6 z-50 flex h-[28rem] w-[calc(100vw-3rem)] max-w-sm flex-col overflow-hidden rounded-2xl border border-line bg-white shadow-2xl">
          <div className="flex items-center justify-between px-4 py-3 text-white" style={{ background: GRADIENT }}>
            <p className="font-display text-sm">Ask MLApartment</p>
            <span className="font-mono text-[10px] uppercase tracking-widest text-white/60">by MLData</span>
          </div>
          <div className="flex-1 space-y-3 overflow-y-auto p-4 text-sm">
            {messages.map((m, i) => (
              <div key={i} className={m.role === "user" ? "text-right" : "text-left"}>
                <span
                  className={`inline-block max-w-[85%] rounded-lg px-3 py-2 text-left ${m.role === "user" ? "text-white" : "bg-paper text-ink"}`}
                  style={m.role === "user" ? { background: GRADIENT } : undefined}
                >
                  {m.content}
                </span>
              </div>
            ))}
            {loading && <p className="text-xs text-ink/40">Typing…</p>}
          </div>
          <div className="flex gap-2 border-t border-line p-2">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && send()}
              placeholder="Type a question…"
              className="flex-1 rounded-lg border border-line px-3 py-2 text-sm outline-none focus:border-ink"
            />
            <button onClick={send} disabled={loading} className="rounded-lg px-3 py-2 text-sm font-medium text-white transition disabled:opacity-50" style={{ background: GRADIENT }}>
              Send
            </button>
          </div>
        </div>
      )}
    </>
  );
}
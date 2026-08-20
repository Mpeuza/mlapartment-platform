"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";

const GRADIENT = "linear-gradient(135deg, #22D3C5, #152A44)";

export default function OnboardingPage() {
  const [role, setRole] = useState<"tenant" | "owner" | null>(null);
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const router = useRouter();
  const supabase = createClient();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!role) {
      setError("Choose whether you're a tenant or an owner.");
      return;
    }
    setSubmitting(true);
    setError(null);

    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      router.push("/login");
      return;
    }

    const { error } = await supabase.from("profiles").insert({
      id: user.id,
      full_name: fullName,
      role,
      phone_number: phone,
    });

    if (error) {
      setError(error.message);
      setSubmitting(false);
      return;
    }

    router.push(role === "owner" ? "/owner/dashboard" : "/customer/dashboard");
  }

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden px-6">
      <div className="pointer-events-none absolute -left-40 -top-24 h-[30rem] w-[30rem] rounded-full opacity-20 blur-3xl" style={{ background: GRADIENT }} />
      <div className="relative w-full max-w-md">
        <div className="mb-8 flex items-center justify-center gap-2">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/mldata-logo.jpg" alt="MLData" className="h-6 w-auto" />
          <span className="font-display text-xl tracking-tight">MLApartment</span>
        </div>

        <div className="rounded-2xl border border-line bg-white p-8 shadow-xl shadow-ink/5">
          <h1 className="font-display text-2xl">Complete your profile</h1>
          <p className="mt-2 text-ink/60">One-time setup, takes a few seconds.</p>

          <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-3">
            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => setRole("tenant")}
                className={`flex-1 rounded-lg border px-4 py-3 font-medium transition ${role === "tenant" ? "border-transparent text-white" : "border-line text-ink/70"}`}
                style={role === "tenant" ? { background: GRADIENT } : undefined}
              >
                I'm a tenant
              </button>
              <button
                type="button"
                onClick={() => setRole("owner")}
                className={`flex-1 rounded-lg border px-4 py-3 font-medium transition ${role === "owner" ? "border-transparent text-white" : "border-line text-ink/70"}`}
                style={role === "owner" ? { background: GRADIENT } : undefined}
              >
                I'm an owner
              </button>
            </div>

            <input
              required
              placeholder="Full name"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="rounded-lg border border-line px-4 py-2.5 outline-none focus:border-ink"
            />
            <PhoneInput
              international
              defaultCountry="ZA"
              placeholder="WhatsApp number"
              value={phone}
              onChange={(value) => setPhone(value || "")}
            />

            <button
              type="submit"
              disabled={submitting}
              className="rounded-lg px-4 py-2.5 font-medium text-white transition hover:opacity-90 disabled:opacity-50"
              style={{ background: GRADIENT }}
            >
              {submitting ? "Saving…" : "Continue"}
            </button>
            {error && <p className="text-sm text-overdue">{error}</p>}
          </form>
        </div>
      </div>
    </main>
  );
}
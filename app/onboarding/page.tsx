"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

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
    <main className="mx-auto flex min-h-screen max-w-md flex-col justify-center p-8">
      <h1 className="mb-2 text-2xl font-semibold">Complete your profile</h1>
      <p className="mb-6 text-slate-500">One-time setup, takes a few seconds.</p>

      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <div className="flex gap-3">
          <button type="button" onClick={() => setRole("tenant")} className={`flex-1 rounded-lg border px-4 py-3 ${role === "tenant" ? "border-slate-900 bg-slate-900 text-white" : "border-slate-300"}`}>
            I'm a tenant
          </button>
          <button type="button" onClick={() => setRole("owner")} className={`flex-1 rounded-lg border px-4 py-3 ${role === "owner" ? "border-slate-900 bg-slate-900 text-white" : "border-slate-300"}`}>
            I'm an owner
          </button>
        </div>

        <input required placeholder="Full name" value={fullName} onChange={(e) => setFullName(e.target.value)} className="rounded-lg border border-slate-300 px-4 py-2.5" />
        <input placeholder="WhatsApp number (e.g. +27 82 123 4567)" value={phone} onChange={(e) => setPhone(e.target.value)} className="rounded-lg border border-slate-300 px-4 py-2.5" />

        <button type="submit" disabled={submitting} className="rounded-lg bg-slate-900 px-4 py-2.5 text-white disabled:opacity-50">
          {submitting ? "Saving…" : "Continue"}
        </button>
        {error && <p className="text-sm text-red-600">{error}</p>}
      </form>
    </main>
  );
}
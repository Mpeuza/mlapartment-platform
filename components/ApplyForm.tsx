"use client";

import { useState } from "react";

type Listing = { id: string; address: string; monthly_rent: number };

export default function ApplyForm({ listing }: { listing: Listing }) {
  const [step, setStep] = useState<1 | 2>(1);
  const [form, setForm] = useState({ fullName: "", email: "", phone: "", employmentInfo: "", moveInDate: "" });
  const [contractAccepted, setContractAccepted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  function update(field: keyof typeof form, value: string) {
    setForm((f) => ({ ...f, [field]: value }));
  }

  async function submit() {
    if (!contractAccepted) {
      setError("Please accept the lease terms to continue.");
      return;
    }
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/applications", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ listingId: listing.id, ...form, contractAccepted }),
      });
      const data = await res.json();
      if (data.authorizationUrl) {
        window.location.href = data.authorizationUrl;
      } else {
        setError(data.error ?? "Something went wrong, please try again.");
      }
    } catch {
      setError("Something went wrong, please try again.");
    } finally {
      setLoading(false);
    }
  }

  if (step === 1) {
    return (
      <div className="rounded-2xl border border-line bg-white p-6">
        <h2 className="font-display text-xl">Your details</h2>
        <div className="mt-4 grid gap-4">
          <input placeholder="Full name" value={form.fullName} onChange={(e) => update("fullName", e.target.value)} className="rounded-lg border border-line px-3 py-2 outline-none focus:border-ink" />
          <input placeholder="Email" type="email" value={form.email} onChange={(e) => update("email", e.target.value)} className="rounded-lg border border-line px-3 py-2 outline-none focus:border-ink" />
          <input placeholder="Phone (WhatsApp number)" value={form.phone} onChange={(e) => update("phone", e.target.value)} className="rounded-lg border border-line px-3 py-2 outline-none focus:border-ink" />
          <input placeholder="Employment / income info" value={form.employmentInfo} onChange={(e) => update("employmentInfo", e.target.value)} className="rounded-lg border border-line px-3 py-2 outline-none focus:border-ink" />
          <label className="text-sm text-ink/60">
            Preferred move-in date
            <input type="date" value={form.moveInDate} onChange={(e) => update("moveInDate", e.target.value)} className="mt-1 w-full rounded-lg border border-line px-3 py-2 outline-none focus:border-ink" />
          </label>
        </div>
        <button onClick={() => setStep(2)} disabled={!form.fullName || !form.email || !form.phone} className="mt-6 w-full rounded-lg bg-ink px-5 py-3 font-medium text-white disabled:opacity-40">
          Continue to lease terms
        </button>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-line bg-white p-6">
      <h2 className="font-display text-xl">Lease terms</h2>
      <div className="mt-4 max-h-64 overflow-y-auto rounded-lg border border-line bg-paper p-4 text-sm text-ink/70">
        {/* TODO: replace with your real lease agreement text, or generate per-listing */}
        <p>
          This is placeholder lease text for {listing.address}. Monthly rent is
          R {listing.monthly_rent}. Replace this block with your actual lease
          agreement. For a legally binding e-signature (not just a checkbox),
          consider a provider like SignWell or DocuSign later.
        </p>
      </div>
      <label className="mt-4 flex items-start gap-2 text-sm">
        <input type="checkbox" checked={contractAccepted} onChange={(e) => setContractAccepted(e.target.checked)} className="mt-1" />
        I have read and agree to the lease terms above.
      </label>

      {error && <p className="mt-3 text-sm text-overdue">{error}</p>}

      <div className="mt-6 flex items-center gap-3">
        <button onClick={() => setStep(1)} className="text-sm text-ink/50 hover:text-ink">Back</button>
        <button onClick={submit} disabled={loading || !contractAccepted} className="flex-1 rounded-lg bg-teal px-5 py-3 font-medium text-white disabled:opacity-40">
          {loading ? "Redirecting to payment…" : "Accept & pay application fee"}
        </button>
      </div>
    </div>
  );
}
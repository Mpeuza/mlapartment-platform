export default function PrivacyPage() {
  return (
    <main className="mx-auto max-w-2xl px-6 py-20">
      <p className="mb-3 font-mono text-xs uppercase tracking-[0.2em] text-brass">Legal</p>
      <h1 className="font-display text-4xl">Privacy Policy</h1>

      <div className="mt-6 rounded-lg border border-brass/40 bg-brass/5 p-4 text-sm text-ink/70">
        <strong>Placeholder content.</strong> This is a generic template, not
        legal advice. This platform collects personal information (names,
        contact details, ID/financial info for applications, payment
        references), which brings it under South Africa's POPIA. Have this
        reviewed by an attorney before launch, especially the sections on
        data storage, third parties, and user rights.
      </div>

      <div className="mt-8 space-y-6 text-ink/70">
        <section>
          <h2 className="font-display text-xl text-ink">What we collect</h2>
          <p className="mt-2">Name, contact details, and, for tenant applications, employment and payment information needed to process a rental application or collect rent.</p>
        </section>
        <section>
          <h2 className="font-display text-xl text-ink">Where it's stored</h2>
          <p className="mt-2">Data is stored with Supabase (database) and processed for payments via Paystack. WhatsApp messages are processed via Meta's WhatsApp Cloud API.</p>
        </section>
        <section>
          <h2 className="font-display text-xl text-ink">Your rights</h2>
          <p className="mt-2">Under POPIA, you can request access to, correction of, or deletion of your personal information. Contact the landlord or MLData to make a request.</p>
        </section>
      </div>
    </main>
  );
}
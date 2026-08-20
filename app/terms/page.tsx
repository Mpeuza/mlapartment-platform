export default function TermsPage() {
  return (
    <main className="mx-auto max-w-2xl px-6 py-20">
      <p className="mb-3 font-mono text-xs uppercase tracking-[0.2em] text-brass">Legal</p>
      <h1 className="font-display text-4xl">Terms of Service</h1>

      <div className="mt-6 rounded-lg border border-brass/40 bg-brass/5 p-4 text-sm text-ink/70">
        <strong>Placeholder content.</strong> This is a generic template, not
        legal advice. Have a South African attorney review and finalise these
        terms, especially the payment, cancellation, and liability sections,
        before this platform handles real money or real leases.
      </div>

      <div className="mt-8 space-y-6 text-ink/70">
        <section>
          <h2 className="font-display text-xl text-ink">1. Who these terms cover</h2>
          <p className="mt-2">These terms apply to anyone using MLApartment, whether as a landlord managing units or a tenant applying for or renting a unit.</p>
        </section>
        <section>
          <h2 className="font-display text-xl text-ink">2. Payments</h2>
          <p className="mt-2">Rent, deposits, and application fees are processed through a third-party payment provider. MLApartment is not itself a bank or payment institution.</p>
        </section>
        <section>
          <h2 className="font-display text-xl text-ink">3. The WhatsApp AI agent</h2>
          <p className="mt-2">Messages sent through the platform's WhatsApp agent may be handled by an AI system. Responses are provided as a convenience and are not a substitute for the lease agreement itself.</p>
        </section>
        <section>
          <h2 className="font-display text-xl text-ink">4. Changes to these terms</h2>
          <p className="mt-2">These terms may be updated from time to time. Continued use of the platform after a change means you accept the updated terms.</p>
        </section>
      </div>
    </main>
  );
}
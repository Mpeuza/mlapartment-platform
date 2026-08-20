const GRADIENT = "linear-gradient(135deg, #22D3C5, #152A44)";

export default function AboutPage() {
  return (
    <main>
      <section className="relative overflow-hidden">
        <div className="pointer-events-none absolute -right-40 -top-24 h-[30rem] w-[30rem] rounded-full opacity-20 blur-3xl" style={{ background: GRADIENT }} />
        <div className="relative mx-auto max-w-3xl px-6 py-20">
          <p className="mb-3 font-mono text-xs uppercase tracking-[0.2em] text-brass">About</p>
          <h1 className="font-display text-5xl leading-tight tracking-tight">
            Property management shouldn't<br />need a second app.
          </h1>
          <p className="mt-6 max-w-xl text-lg text-ink/70">
            Landlords in South Africa run their business on WhatsApp already.
            Tenants message on WhatsApp already. MLApartment exists because
            the tools that manage the money and the paperwork should live in
            the same place as the conversation, not in a separate portal
            nobody opens.
          </p>
        </div>
      </section>

      <section className="border-t border-line bg-paper py-16">
        <div className="mx-auto grid max-w-3xl gap-10 px-6 md:grid-cols-2">
          <div className="border-t-2 pt-4" style={{ borderImage: "linear-gradient(90deg, #22D3C5, #152A44) 1" }}>
            <h2 className="font-display text-xl">The problem</h2>
            <p className="mt-2 text-ink/70">Rent gets chased over SMS and phone calls. Proof of payment gets sent as a screenshot, then lost. Tenant questions sit unanswered because there's no system behind the conversation, just a phone.</p>
          </div>
          <div className="border-t-2 pt-4" style={{ borderImage: "linear-gradient(90deg, #22D3C5, #152A44) 1" }}>
            <h2 className="font-display text-xl">The approach</h2>
            <p className="mt-2 text-ink/70">Keep WhatsApp as the front door, since that's where people already are, and put a real system behind it: payments that reconcile themselves, applications that don't need printing, and a dashboard that tells you what's actually going on.</p>
          </div>
        </div>
      </section>

      <section className="border-t border-line py-16">
        <div className="mx-auto flex max-w-3xl flex-col items-start gap-6 px-6 sm:flex-row sm:items-center">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/mldata-logo.jpg" alt="MLData" className="h-10 w-auto" />
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-brass">Built by</p>
            <h2 className="mt-1 font-display text-2xl">MLData</h2>
            <p className="mt-2 max-w-md text-ink/70">MLData is a data, machine learning, and strategy consultancy. MLApartment is its first product: a proof point for the same approach MLData brings to client work, using real data engineering to solve an everyday operational problem.</p>
          </div>
        </div>
      </section>
    </main>
  );
}
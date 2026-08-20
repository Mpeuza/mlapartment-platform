import ChatWidget from "@/components/ChatWidget";

const WHATSAPP_NUMBER = "27629609907";
const WHATSAPP_LINK = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
  "Hi, I'd like to know more about MLApartment"
)}`;
const GRADIENT = "linear-gradient(135deg, #22D3C5, #152A44)";

// The actual stack running this app — not aspirational.
const STACK = ["Next.js", "TypeScript", "Tailwind CSS", "Supabase", "Paystack", "WhatsApp Cloud API", "Claude", "Vercel"];

export default function Home() {
  return (
    <>
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-6">
        <div className="flex items-center gap-2">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/mldata-logo.jpg" alt="MLData" className="h-6 w-auto" />
          <span className="font-display text-xl tracking-tight">MLApartment</span>
        </div>
        <div className="flex items-center gap-6 text-sm">
          <a href="#for-landlords" className="hidden text-ink/70 hover:text-ink sm:inline">For landlords</a>
          <a href="#for-tenants" className="hidden text-ink/70 hover:text-ink sm:inline">For tenants</a>
          <a href="/apartments" className="hidden text-ink/70 hover:text-ink sm:inline">Browse apartments</a>
          <a href="/about" className="hidden text-ink/70 hover:text-ink sm:inline">About</a>
          <a href="/login" className="rounded-full border border-ink px-4 py-2 font-medium hover:bg-ink hover:text-white transition">Log in</a>
        </div>
      </nav>

      <section className="relative overflow-hidden">
        <div className="pointer-events-none absolute -right-40 -top-24 h-[36rem] w-[36rem] rounded-full opacity-20 blur-3xl" style={{ background: GRADIENT }} />
        <div className="relative mx-auto grid max-w-6xl items-center gap-12 px-6 py-16 md:grid-cols-2 md:py-24">
          <div>
            <p className="mb-4 font-mono text-xs uppercase tracking-[0.2em] text-brass">Property management, rebuilt for WhatsApp</p>
            <h1 className="font-display text-5xl leading-[1.05] tracking-tight md:text-6xl">
              Run every unit<br />from your pocket.
            </h1>
            <p className="mt-6 max-w-md text-lg text-ink/70">
              MLApartment collects rent, screens and onboards new tenants, and
              handles routine tenant conversations with an AI agent, all
              without either side leaving WhatsApp.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <a href="#for-landlords" className="rounded-full px-6 py-3 font-medium text-white shadow-lg shadow-[#152A44]/20 transition hover:opacity-90" style={{ background: GRADIENT }}>
                I manage properties
              </a>
              <a href="/apartments" className="rounded-full border border-ink/20 px-6 py-3 font-medium hover:border-ink transition">
                I'm looking for a place
              </a>
            </div>
          </div>

          <div className="relative rounded-2xl border border-line bg-white p-6 shadow-2xl shadow-ink/10">
            <div className="mb-4 flex items-center justify-between border-b border-line pb-3">
              <span className="font-mono text-xs uppercase tracking-widest text-ink/50">Map view</span>
              <span className="rounded-full bg-paper px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider text-ink/40">Preview</span>
            </div>
            <div className="overflow-hidden rounded-lg">
              <iframe
                src="https://www.google.com/maps?q=South+Africa&output=embed"
                width="100%"
                height="280"
                style={{ border: 0 }}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="MLApartment coverage map"
              />
            </div>
            <p className="mt-3 border-t border-line pt-3 font-mono text-[10px] uppercase tracking-wider text-ink/30">
              Apartments in your area will be pinned here
            </p>
          </div>
        </div>
      </section>

      <section className="border-b border-line py-20">
        <div className="mx-auto max-w-6xl px-6">
          <div className="grid gap-6 md:grid-cols-2">
            <div id="for-landlords" className="rounded-2xl border border-line bg-white p-8">
              <p className="mb-3 font-mono text-xs uppercase tracking-[0.2em] text-brass">For landlords</p>
              <h2 className="font-display text-2xl">Stop chasing. Start collecting.</h2>
              <p className="mt-3 text-ink/70">
                List your units, screen applicants, collect rent, and message
                tenants, all from one dashboard, backed by an AI agent that
                handles the routine stuff on WhatsApp.
              </p>
              <a href="/login" className="mt-6 inline-block rounded-full px-6 py-3 font-medium text-white transition hover:opacity-90" style={{ background: GRADIENT }}>
                Get started
              </a>
            </div>
            <div id="for-tenants" className="rounded-2xl border border-line bg-white p-8">
              <p className="mb-3 font-mono text-xs uppercase tracking-[0.2em] text-brass">For tenants</p>
              <h2 className="font-display text-2xl">Find a place. Apply in minutes.</h2>
              <p className="mt-3 text-ink/70">
                Browse real listings, apply and pay online, and reach your
                landlord on WhatsApp instead of waiting on hold or emailing
                into the void.
              </p>
              <a href="/apartments" className="mt-6 inline-block rounded-full border border-ink px-6 py-3 font-medium hover:bg-ink hover:text-white transition">
                Browse apartments
              </a>
            </div>
          </div>
        </div>
      </section>

      <section id="features" className="py-20">
        <div className="mx-auto max-w-6xl px-6">
          <p className="mb-12 font-mono text-xs uppercase tracking-[0.2em] text-brass">What it does</p>
          <div className="grid gap-10 md:grid-cols-3">
            <div className="border-t-2 pt-4" style={{ borderImage: "linear-gradient(90deg, #22D3C5, #152A44) 1" }}>
              <h3 className="font-display text-2xl">Collect</h3>
              <p className="mt-3 text-ink/70">Tenants pay rent, deposits, and application fees online. Every payment reconciles automatically, so there's no more chasing proof of payment.</p>
            </div>
            <div className="border-t-2 pt-4" style={{ borderImage: "linear-gradient(90deg, #22D3C5, #152A44) 1" }}>
              <h3 className="font-display text-2xl">Communicate</h3>
              <p className="mt-3 text-ink/70">An AI agent handles routine WhatsApp conversations: reminders, questions, requests, and hands off to you the moment it matters.</p>
            </div>
            <div className="border-t-2 pt-4" style={{ borderImage: "linear-gradient(90deg, #22D3C5, #152A44) 1" }}>
              <h3 className="font-display text-2xl">Understand</h3>
              <p className="mt-3 text-ink/70">A live dashboard and a full Power BI report show collections, arrears, occupancy, and activity across every unit you manage.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-line bg-paper py-20">
        <div className="mx-auto max-w-6xl px-6">
          <p className="mb-12 font-mono text-xs uppercase tracking-[0.2em] text-brass">How applying works</p>
          <div className="grid gap-10 md:grid-cols-3">
            {[
              { n: "01", t: "Browse", d: "See real listings with photos, rent, and availability." },
              { n: "02", t: "Apply & pay", d: "Fill in your details, accept the lease, and pay the application fee online." },
              { n: "03", t: "Move in", d: "Once approved, you're set up in the tenant portal and on WhatsApp with your landlord." },
            ].map((step) => (
              <div key={step.n}>
                <p className="font-mono text-sm text-ink/30">{step.n}</p>
                <h3 className="mt-2 font-display text-xl">{step.t}</h3>
                <p className="mt-2 text-ink/70">{step.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-line bg-paper py-8">
        <p className="mb-4 text-center font-mono text-xs uppercase tracking-[0.2em] text-ink/40">The stack</p>
        <div className="overflow-hidden">
          <div className="marquee-track flex w-max items-center gap-16">
            {[...STACK, ...STACK].map((name, i) => (
              <span key={i} className="whitespace-nowrap font-display text-xl text-ink/30">{name}</span>
            ))}
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden py-16 text-white" style={{ background: "linear-gradient(120deg, #152A44 0%, #0F1B2D 60%)" }}>
        <div className="pointer-events-none absolute -left-20 bottom-0 h-72 w-72 rounded-full opacity-30 blur-3xl" style={{ background: "#22D3C5" }} />
        <div className="relative mx-auto flex max-w-6xl flex-col items-start justify-between gap-6 px-6 md:flex-row md:items-center">
          <div>
            <h2 className="font-display text-3xl">Prefer WhatsApp? So do we.</h2>
            <p className="mt-2 text-white/60">Message us directly, no forms, no waiting on hold.</p>
          </div>
          <a href={WHATSAPP_LINK} target="_blank" className="whitespace-nowrap rounded-full px-6 py-3 font-medium transition hover:opacity-90" style={{ background: "linear-gradient(135deg, #22D3C5, #12263F)" }}>
            Open WhatsApp chat
          </a>
        </div>
      </section>

      <section id="app" className="py-20">
        <div className="mx-auto max-w-6xl px-6 text-center">
          <p className="mb-4 font-mono text-xs uppercase tracking-[0.2em] text-brass">Get the app</p>
          <h2 className="font-display text-3xl">The mobile app is on its way.</h2>
          <p className="mx-auto mt-3 max-w-md text-ink/70">For now, the web app works fully on your phone. Add it to your home screen and it behaves like an app.</p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <span className="cursor-not-allowed rounded-lg border border-ink/20 px-5 py-3 text-sm text-ink/40">App Store: coming soon</span>
            <span className="cursor-not-allowed rounded-lg border border-ink/20 px-5 py-3 text-sm text-ink/40">Google Play: coming soon</span>
            <a href="/login" className="rounded-lg px-5 py-3 text-sm font-medium text-white transition hover:opacity-90" style={{ background: GRADIENT }}>
              Use the web app now
            </a>
          </div>
        </div>
      </section>

      <section className="border-t border-line py-20 text-center">
        <h2 className="font-display text-3xl">Ready when you are.</h2>
        <p className="mx-auto mt-3 max-w-md text-ink/70">Whether you're managing units or looking for your next place, it starts here.</p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <a href="/login" className="rounded-full px-6 py-3 font-medium text-white transition hover:opacity-90" style={{ background: GRADIENT }}>
            I manage properties
          </a>
          <a href="/apartments" className="rounded-full border border-ink/20 px-6 py-3 font-medium hover:border-ink transition">
            I'm looking for a place
          </a>
        </div>
      </section>

      <footer className="border-t border-line py-10">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-6 sm:flex-row">
          <div className="flex items-center gap-3">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/mldata-logo.jpg" alt="MLData" className="h-6 w-auto opacity-80" />
            <span className="text-sm text-ink/50">&copy; {new Date().getFullYear()} MLApartment, built by MLData</span>
          </div>
          <div className="flex items-center gap-5 text-sm text-ink/50">
            <a href="/about" className="hover:text-ink">About</a>
            <a href="/terms" className="hover:text-ink">Terms</a>
            <a href="/privacy" className="hover:text-ink">Privacy</a>
            <a href={WHATSAPP_LINK} target="_blank" className="hover:text-ink">WhatsApp</a>
          </div>
        </div>
      </footer>

      <ChatWidget />
    </>
  );
}
import { createServerSupabase } from "@/lib/supabase/server";

export default async function ApartmentsPage() {
  const supabase = createServerSupabase();
  const { data: listings } = await supabase
    .from("listings")
    .select("*")
    .eq("status", "available")
    .order("created_at", { ascending: false });

  return (
    <main className="mx-auto max-w-6xl px-6 py-16">
      <p className="mb-3 font-mono text-xs uppercase tracking-[0.2em] text-brass">Available now</p>
      <h1 className="font-display text-4xl">Find your next place.</h1>
      <p className="mt-3 max-w-xl text-ink/70">Apply online in a few minutes, no printing, no office visit.</p>

      <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {(listings ?? []).map((l) => (
          <a key={l.id} href={`/apartments/${l.id}`} className="group overflow-hidden rounded-2xl border border-line bg-white transition hover:shadow-lg">
            <div className="aspect-[4/3] w-full overflow-hidden bg-paper">
              {l.photos?.[0] ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={l.photos[0]} alt={l.address} className="h-full w-full object-cover transition group-hover:scale-105" />
              ) : (
                <div className="flex h-full items-center justify-center text-ink/30">No photo yet</div>
              )}
            </div>
            <div className="p-5">
              <p className="font-display text-lg">{l.address}</p>
              <p className="mt-1 font-mono text-sm text-ink/60">{l.bedrooms} bed · {l.bathrooms} bath</p>
              <p className="mt-3 font-mono text-lg">R {l.monthly_rent} / mo</p>
            </div>
          </a>
        ))}
        {(!listings || listings.length === 0) && (
          <p className="text-ink/50">No listings available right now, check back soon.</p>
        )}
      </div>
    </main>
  );
}
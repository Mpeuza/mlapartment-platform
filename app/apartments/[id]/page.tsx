import { createServerSupabase } from "@/lib/supabase/server";
import { notFound } from "next/navigation";

export default async function ApartmentDetail({ params }: { params: { id: string } }) {
  const supabase = createServerSupabase();
  const { data: listing } = await supabase.from("listings").select("*").eq("id", params.id).single();

  if (!listing) return notFound();

  return (
    <main className="mx-auto max-w-4xl px-6 py-16">
      <div className="grid gap-2 sm:grid-cols-2">
        {(listing.photos?.length ? listing.photos : [null]).map((src: string | null, i: number) => (
          <div key={i} className="aspect-[4/3] overflow-hidden rounded-xl bg-paper">
            {src ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={src} alt={listing.address} className="h-full w-full object-cover" />
            ) : (
              <div className="flex h-full items-center justify-center text-ink/30">No photo yet</div>
            )}
          </div>
        ))}
      </div>

      <div className="mt-8 flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
        <div>
          <h1 className="font-display text-3xl">{listing.address}</h1>
          <p className="mt-1 font-mono text-sm text-ink/60">{listing.bedrooms} bed · {listing.bathrooms} bath</p>
        </div>
        <p className="font-mono text-2xl">R {listing.monthly_rent} / mo</p>
      </div>

      {listing.description && <p className="mt-6 max-w-2xl text-ink/70">{listing.description}</p>}

      <a href={`/apply/${listing.id}`} className="mt-8 inline-block rounded-full bg-teal px-6 py-3 font-medium text-white hover:bg-teal/90 transition">
        Apply for this apartment
      </a>
    </main>
  );
}
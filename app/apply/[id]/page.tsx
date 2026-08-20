import { createServerSupabase } from "@/lib/supabase/server";
import { notFound } from "next/navigation";
import ApplyForm from "@/components/ApplyForm";

export default async function ApplyPage({ params }: { params: { id: string } }) {
  const supabase = createServerSupabase();
  const { data: listing } = await supabase.from("listings").select("id, address, monthly_rent").eq("id", params.id).single();

  if (!listing) return notFound();

  return (
    <main className="mx-auto max-w-lg px-6 py-16">
      <p className="mb-2 font-mono text-xs uppercase tracking-[0.2em] text-brass">Applying for</p>
      <h1 className="font-display text-2xl">{listing.address}</h1>
      <p className="mt-1 mb-8 font-mono text-ink/60">R {listing.monthly_rent} / mo</p>
      <ApplyForm listing={listing} />
    </main>
  );
}
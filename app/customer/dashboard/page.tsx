import { createServerSupabase } from "@/lib/supabase/server";

export default async function CustomerDashboard() {
  const supabase = createServerSupabase();
  const { data: { user } } = await supabase.auth.getUser();

  const { data: leases } = await supabase
    .from("leases")
    .select("id, units(address, monthly_rent, currency)")
    .eq("tenant_id", user?.id);

  const leaseIds = (leases ?? []).map((l) => l.id);

  const { data: payments } = await supabase
    .from("payments")
    .select("*")
    .in("lease_id", leaseIds.length ? leaseIds : ["00000000-0000-0000-0000-000000000000"])
    .order("created_at", { ascending: false })
    .limit(10);

  const unit = leases?.[0]?.units as any;

  return (
    <main className="mx-auto max-w-2xl p-8">
      <h1 className="mb-6 text-2xl font-semibold">My Rent & Payments</h1>

      <div className="mb-8 rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
        <p className="text-slate-500">{unit?.address ?? "No lease linked yet"}</p>
        <p className="text-3xl font-bold">{unit ? `R ${unit.monthly_rent}` : "—"}</p>
        <button className="mt-4 rounded-lg bg-slate-900 px-5 py-2.5 text-white">Pay now</button>
      </div>

      <h2 className="mb-3 text-lg font-medium">Payment history</h2>
      <ul className="divide-y divide-slate-200 rounded-xl border border-slate-200 bg-white">
        {(payments ?? []).map((p) => (
          <li key={p.id} className="flex justify-between p-4">
            <span>{p.type}</span>
            <span className="text-slate-500">{p.status}</span>
          </li>
        ))}
        {(!payments || payments.length === 0) && <li className="p-4 text-slate-400">No payments yet</li>}
      </ul>
    </main>
  );
}
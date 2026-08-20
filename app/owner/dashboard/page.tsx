import { createServerSupabase } from "@/lib/supabase/server";

export default async function OwnerDashboard() {
  const supabase = createServerSupabase();
  const { data: { user } } = await supabase.auth.getUser();

  const { data: units } = await supabase.from("units").select("id, monthly_rent").eq("owner_id", user?.id);

  const { data: agentLogs } = await supabase
    .from("agent_logs")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(20);

  const { data: paidThisMonth } = await supabase.from("payments").select("amount").eq("status", "paid");

  const collected = (paidThisMonth ?? []).reduce((sum, p) => sum + Number(p.amount), 0);

  return (
    <main className="mx-auto max-w-4xl p-8">
      <h1 className="mb-6 text-2xl font-semibold">Owner Dashboard</h1>

      <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <p className="text-slate-500">Units</p>
          <p className="text-2xl font-bold">{units?.length ?? 0}</p>
        </div>
        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <p className="text-slate-500">Rent collected</p>
          <p className="text-2xl font-bold">R {collected.toFixed(2)}</p>
        </div>
        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <p className="text-slate-500">Outstanding</p>
          <p className="text-2xl font-bold">R —</p>
        </div>
      </div>

      {/* Replace href with your published Power BI report link (Publish to web) */}
      <a href="#" target="_blank" className="mb-8 inline-block rounded-lg bg-slate-900 px-5 py-2.5 text-white">
        Open full Power BI dashboard →
      </a>

      <h2 className="mb-3 text-lg font-medium">MLData log — agent activity</h2>
      <ul className="divide-y divide-slate-200 rounded-xl border border-slate-200 bg-white">
        {(agentLogs ?? []).map((log) => (
          <li key={log.id} className="flex items-center justify-between p-4">
            <span className="font-mono text-sm text-slate-700">{log.event}</span>
            <span className="text-xs text-slate-400">{new Date(log.created_at).toLocaleString()}</span>
          </li>
        ))}
        {(!agentLogs || agentLogs.length === 0) && <li className="p-4 text-slate-400">No agent activity yet</li>}
      </ul>
    </main>
  );
}
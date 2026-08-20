import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase/admin";

// Paystack (or PayFast) sends payment status updates here
export async function POST(req: NextRequest) {
  // TODO: verify the provider's signature header before trusting this payload.
  const event = await req.json();
  const db = supabaseAdmin();

  if (event.event === "charge.success") {
    const reference: string = event.data.reference;

    if (reference.startsWith("APP-")) {
      await db.from("applications").update({ payment_status: "paid" }).eq("paystack_reference", reference);
    } else {
      await db.from("payments").update({ status: "paid", paid_at: new Date().toISOString() }).eq("provider_reference", reference);
    }
  }

  return NextResponse.json({ received: true });
}
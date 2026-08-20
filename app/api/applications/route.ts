import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase/admin";
import { initPaystackPayment } from "@/lib/payments";

const APPLICATION_FEE_ZAR_CENTS = 35000; // R 350.00, adjust or make per-listing

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { listingId, fullName, email, phone, employmentInfo, moveInDate, contractAccepted } = body;

  if (!contractAccepted) return NextResponse.json({ error: "Lease terms must be accepted." }, { status: 400 });
  if (!listingId || !fullName || !email || !phone) return NextResponse.json({ error: "Missing required fields." }, { status: 400 });

  const db = supabaseAdmin();

  const { data: application, error: insertError } = await db
    .from("applications")
    .insert({
      listing_id: listingId,
      full_name: fullName,
      email,
      phone,
      employment_info: employmentInfo,
      move_in_date: moveInDate || null,
      contract_accepted_at: new Date().toISOString(),
    })
    .select()
    .single();

  if (insertError || !application) return NextResponse.json({ error: "Could not save application." }, { status: 500 });

  const reference = `APP-${application.id}`;

  const paystackRes = await initPaystackPayment({ email, amountZarCents: APPLICATION_FEE_ZAR_CENTS, reference });

  await db.from("applications").update({ paystack_reference: reference }).eq("id", application.id);

  if (!paystackRes?.data?.authorization_url) {
    return NextResponse.json({ error: "Payment could not be started, please try again." }, { status: 502 });
  }

  return NextResponse.json({ authorizationUrl: paystackRes.data.authorization_url });
}
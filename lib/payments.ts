// Payment provider helpers. Paystack supports ZAR + recurring billing.
// PayFast is a common South African alternative, swap in if preferred.

export async function initPaystackPayment(params: {
  email: string;
  amountZarCents: number; // Paystack uses the smallest currency unit
  reference: string;
}) {
  const res = await fetch("https://api.paystack.co/transaction/initialize", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: params.email,
      amount: params.amountZarCents,
      currency: "ZAR",
      reference: params.reference,
    }),
  });
  return res.json();
}

// TODO: implement verifyPaystackWebhookSignature() before trusting webhook payloads
// Paystack sends an x-paystack-signature header (HMAC SHA512 of the raw body with your secret key)
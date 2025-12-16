// /api/events/[eventId]/pay/route.ts
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest, { params }: { params: { eventId: string } }) {
  const body = await req.json();
  const { eventTitle, amount, email, phone, callback_url } = body;

  try {
    const response = await fetch("https://api.chapa.co/v1/transaction/initialize", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.CHAPA_SECRET_KEY}`,
      },
      body: JSON.stringify({
        amount,
        currency: "ETB",
        email,
        first_name: body.name,
        tx_ref: `event_${params.eventId}_${Date.now()}`,
        callback_url, // Where Chapa redirects after payment
        custom_fields: [
          { name: "eventId", value: params.eventId, display_name: "Event ID" }
        ]
      }),
    });

    const data = await response.json();

    if (!data.status) {
      return NextResponse.json({ error: "Failed to initialize payment" }, { status: 400 });
    }

    // Send back checkout URL
    return NextResponse.json({ checkout_url: data.data.checkout_url });

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    console.error(err);
    return NextResponse.json({ error: err.message || "Payment initialization failed" }, { status: 500 });
  }
}

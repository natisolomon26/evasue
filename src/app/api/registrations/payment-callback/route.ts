import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Registration from "@/models/Registration";

const CHAPA_SECRET_KEY = process.env.CHAPA_SECRET_KEY;

export async function GET(req: NextRequest) {
  try {
    await connectDB();

    const url = new URL(req.url);

    // ✅ Chapa callback sends trx_ref, not tx_ref
    const trx_ref = url.searchParams.get("trx_ref");
    const status = url.searchParams.get("status"); // optional quick status

    if (!trx_ref) {
      return NextResponse.json({ error: "trx_ref is required" }, { status: 400 });
    }

    // 1️⃣ Find registration
    const registration = await Registration.findById(trx_ref);
    if (!registration) {
      return NextResponse.json({ error: "Registration not found" }, { status: 404 });
    }

    // 2️⃣ Verify payment with Chapa
    const verifyRes = await fetch(`https://api.chapa.co/v1/transaction/verify/${trx_ref}`, {
      headers: { Authorization: `Bearer ${CHAPA_SECRET_KEY}` },
    });

    const verifyData = await verifyRes.json();
    console.log("Chapa Verify Response:", verifyData);

    if (!verifyData.status || !verifyData.data) {
      registration.paymentStatus = "failed";
      await registration.save();
      return NextResponse.json({ error: "Payment verification failed" }, { status: 500 });
    }

    // 3️⃣ Update registration with verified payment
    registration.paymentStatus = verifyData.data.status === "success" ? "completed" : "failed";
    registration.paymentType = verifyData.data.payment_type || "unknown";
    registration.transactionId = verifyData.data.id;
    registration.amountPaid = verifyData.data.amount;

    await registration.save();

    // 4️⃣ Redirect user to a thank-you page or payment status page
    const redirectUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/event/thank-you?status=${registration.paymentStatus}`;
    return NextResponse.redirect(redirectUrl);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    console.error("Payment Callback Error:", err);
    return NextResponse.json({ error: err.message || "Callback failed" }, { status: 500 });
  }
}

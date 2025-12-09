// app/api/registrations/payment-callback/route.ts
import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Registration from "@/models/Registration";

const CHAPA_SECRET_KEY = process.env.CHAPA_SECRET_KEY;

export async function GET(req: NextRequest) {
  try {
    await connectDB();
    const url = new URL(req.url);
    const baseUrl = req.nextUrl.origin;

    // Chapa callback sends trx_ref
    const trx_ref = url.searchParams.get("trx_ref");
    if (!trx_ref) {
      return NextResponse.json({ error: "trx_ref is required" }, { status: 400 });
    }

    // Extract registration ID from trx_ref
    const regId = trx_ref.split("-")[0];
    const registration = await Registration.findById(regId);
    if (!registration) {
      return NextResponse.json({ error: "Registration not found" }, { status: 404 });
    }

    // Verify payment with Chapa
    const verifyRes = await fetch(`https://api.chapa.co/v1/transaction/verify/${trx_ref}`, {
      headers: { Authorization: `Bearer ${CHAPA_SECRET_KEY}` },
    });

    const verifyData = await verifyRes.json();
    console.log("Chapa Verify Response:", verifyData);

    if (!verifyData.status || !verifyData.data) {
      registration.paymentStatus = "failed";
      await registration.save();
      
      // Redirect to thank-you page with failed status
      const redirectUrl = new URL('/event/thank-you', baseUrl);
      redirectUrl.searchParams.set('status', 'failed');
      redirectUrl.searchParams.set('transaction_ref', trx_ref);
      redirectUrl.searchParams.set('registration_id', regId);
      return NextResponse.redirect(redirectUrl);
    }

    // Safely set paymentType
    const chapaPaymentType =
      verifyData.data.payment_type || verifyData.data.mode || "Not specified";

    // Update registration with verified payment
    const paymentStatus = verifyData.data.status === "success" ? "completed" : "failed";
    registration.paymentStatus = paymentStatus;
    registration.paymentType = chapaPaymentType;
    registration.transactionId = verifyData.data.id || trx_ref;
    registration.amountPaid = verifyData.data.amount || 0;

    await registration.save();

    // Create redirect URL with all parameters
    const redirectUrl = new URL('/event/thank-you', baseUrl);
    redirectUrl.searchParams.set('status', paymentStatus);
    redirectUrl.searchParams.set('transaction_ref', trx_ref);
    redirectUrl.searchParams.set('registration_id', regId);
    redirectUrl.searchParams.set('amount', verifyData.data.amount?.toString() || '0');

    console.log("Redirecting to:", redirectUrl.toString());
    return NextResponse.redirect(redirectUrl);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    console.error("Payment Callback Error:", err);
    
    const baseUrl = req.nextUrl.origin;
    const redirectUrl = new URL('/thank-you', baseUrl);
    redirectUrl.searchParams.set('status', 'error');
    redirectUrl.searchParams.set('message', encodeURIComponent(err.message || 'Payment processing failed'));
    
    return NextResponse.redirect(redirectUrl);
  }
}
// app/api/registrations/payment-callback/route.ts
import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Registration from "@/models/Registration";

const CHAPA_SECRET_KEY = process.env.CHAPA_SECRET_KEY;
const WEBHOOK_SECRET = process.env.CHAPA_WEBHOOK_SECRET; // Add to .env

export async function POST(req: NextRequest) {
  // This handles Chapa webhook POST requests
  try {
    // Verify webhook signature (if configured)
    const signature = req.headers.get('x-chapa-signature');
    if (WEBHOOK_SECRET && signature) {
      // Verify signature here
      console.log('Webhook signature:', signature);
    }

    const body = await req.json();
    console.log('Chapa Webhook Received:', body);

    // Extract data from webhook
    const { tx_ref, status, amount, currency, customer } = body;
    
    if (!tx_ref) {
      console.error('No tx_ref in webhook');
      return NextResponse.json({ error: 'Missing tx_ref' }, { status: 400 });
    }

    await connectDB();
    
    // Extract registration ID from tx_ref
    const regId = tx_ref.split("-")[0];
    const registration = await Registration.findById(regId);
    
    if (!registration) {
      console.error('Registration not found for tx_ref:', tx_ref);
      return NextResponse.json({ error: 'Registration not found' }, { status: 404 });
    }

    // Update registration based on webhook
    const paymentStatus = status === 'success' ? 'completed' : 'failed';
    registration.paymentStatus = paymentStatus;
    registration.amountPaid = amount || 0;
    
    if (customer) {
      // Update with customer info from webhook
      registration.email = customer.email || registration.email;
    }
    
    await registration.save();
    
    console.log(`Registration ${regId} updated via webhook: ${paymentStatus}`);
    
    // You could also trigger other actions here:
    // - Send confirmation email
    // - Update analytics
    // - Notify admin
    
    return NextResponse.json({ 
      success: true, 
      message: 'Webhook processed',
      registrationId: regId,
      status: paymentStatus
    });

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    console.error('Webhook processing error:', err);
    return NextResponse.json({ 
      error: err.message || 'Webhook processing failed' 
    }, { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  // This handles the redirect from Chapa (for users)
  try {
    await connectDB();
    const url = new URL(req.url);
    const baseUrl = req.nextUrl.origin;

    const trx_ref = url.searchParams.get("trx_ref");
    if (!trx_ref) {
      return NextResponse.json({ error: "trx_ref is required" }, { status: 400 });
    }

    const regId = trx_ref.split("-")[0];
    const registration = await Registration.findById(regId);
    
    if (!registration) {
      return NextResponse.json({ error: "Registration not found" }, { status: 404 });
    }

    // Verify payment with Chapa API
    const verifyRes = await fetch(`https://api.chapa.co/v1/transaction/verify/${trx_ref}`, {
      headers: { Authorization: `Bearer ${CHAPA_SECRET_KEY}` },
    });

    const verifyData = await verifyRes.json();
    console.log("Chapa Verify Response:", verifyData);

    if (!verifyData.status || !verifyData.data) {
      registration.paymentStatus = "failed";
      await registration.save();
      
      const redirectUrl = new URL('/event/thank-you', baseUrl);
      redirectUrl.searchParams.set('status', 'failed');
      redirectUrl.searchParams.set('transaction_ref', trx_ref);
      redirectUrl.searchParams.set('registration_id', regId);
      return NextResponse.redirect(redirectUrl);
    }

    // Update registration
    const paymentStatus = verifyData.data.status === "success" ? "completed" : "failed";
    registration.paymentStatus = paymentStatus;
    registration.paymentType = verifyData.data.payment_type || verifyData.data.mode || "Not specified";
    registration.transactionId = verifyData.data.id || trx_ref;
    registration.amountPaid = verifyData.data.amount || 0;

    await registration.save();

    // Redirect to thank you page
    const redirectUrl = new URL('/event/thank-you', baseUrl);
    redirectUrl.searchParams.set('status', paymentStatus);
    redirectUrl.searchParams.set('transaction_ref', trx_ref);
    redirectUrl.searchParams.set('registration_id', regId);
    redirectUrl.searchParams.set('amount', verifyData.data.amount?.toString() || '0');
    
    if (verifyData.data.customer?.email) {
      redirectUrl.searchParams.set('email', verifyData.data.customer.email);
    }

    console.log("Redirecting to:", redirectUrl.toString());
    return NextResponse.redirect(redirectUrl);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    console.error("Payment Callback Error:", err);
    
    const baseUrl = req.nextUrl.origin;
    const redirectUrl = new URL('/event/thank-you', baseUrl);
    redirectUrl.searchParams.set('status', 'error');
    redirectUrl.searchParams.set('message', encodeURIComponent(err.message || 'Payment processing failed'));
    
    return NextResponse.redirect(redirectUrl);
  }
}
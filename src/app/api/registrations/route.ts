import { NextRequest, NextResponse } from "next/server";
import mongoose from "mongoose";
import { connectDB } from "@/lib/db";
import Registration from "@/models/Registration";

const CHAPA_SECRET_KEY = process.env.CHAPA_SECRET_KEY;
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export async function POST(req: NextRequest) {
  try {
    await connectDB();
    const body = await req.json();

    const { eventId, answers, isGuest, email, amount } = body;

    if (!eventId || !answers || !email || !amount) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    // 1️⃣ Create registration in DB
    const registration = await Registration.create({
      eventId: new mongoose.Types.ObjectId(eventId),
      answers: new Map(Object.entries(answers)),
      isGuest: isGuest ?? true,
      paymentStatus: "pending",
    });

    // 2️⃣ Initialize Chapa payment
    const response = await fetch("https://api.chapa.co/v1/transaction/initialize", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${CHAPA_SECRET_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        amount,
        currency: "ETB",
        email,
        tx_ref: registration._id.toString(),
        callback_url: `${BASE_URL}/api/registrations/payment-callback`,
        first_name: answers["Full Name"] || "Guest",
        last_name: "",
      }),
    });

    const chapaData = await response.json();
    console.log("Chapa Response:", chapaData); // ✅ log for debugging

    // 3️⃣ Check response safely
    if (!chapaData.status || !chapaData.data || !chapaData.data.checkout_url) {
      return NextResponse.json({
        error: chapaData.message || "Failed to initialize payment",
        chapaData,
      }, { status: 500 });
    }

    // 4️⃣ Return registration ID + checkout URL
    return NextResponse.json({
      registrationId: registration._id,
      checkoutUrl: chapaData.data.checkout_url,
    });

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    console.error("Registration / Chapa Error:", err);
    return NextResponse.json({ error: err.message || "Failed to create registration" }, { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  try {
    await connectDB();

    const url = new URL(req.url);
    const eventId = url.searchParams.get("eventId");

    if (!eventId) {
      return NextResponse.json({ error: "eventId query param is required" }, { status: 400 });
    }

    const registrations = await Registration.find({ eventId }).sort({ registeredAt: -1 });

    return NextResponse.json(registrations);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    console.error("Get Registrations Error:", err);
    return NextResponse.json({ error: err.message || "Failed to fetch registrations" }, { status: 500 });
  }
}
import { NextRequest, NextResponse } from "next/server";
import mongoose from "mongoose";
import { connectDB } from "@/lib/db";
import Registration from "@/models/Registration";
import Event from "@/models/Event";

const CHAPA_SECRET_KEY = process.env.CHAPA_SECRET_KEY;
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

// --------------------
// POST: Create registration + initialize Chapa payment
// --------------------
export async function POST(req: NextRequest) {
  try {
    await connectDB();
    const body = await req.json();
    const { eventId, answers, isGuest, email, amount } = body;

    // 1️⃣ Validate required fields
    if (!eventId || !answers || !email || !amount || isNaN(Number(amount))) {
      return NextResponse.json({ error: "Missing or invalid fields" }, { status: 400 });
    }

    // 2️⃣ Validate that the event exists
    const eventExists = await Event.findById(eventId);
    if (!eventExists) {
      return NextResponse.json({ error: "Event not found" }, { status: 404 });
    }

    // 3️⃣ Normalize answers safely
    const answersMap = new Map<string, string>(
      Object.entries(answers).map(([k, v]) => [k, String(v)])
    );

    // 4️⃣ Create registration
    const registration = await Registration.create({
    eventId: new mongoose.Types.ObjectId(eventId),
    answers: answersMap,
    isGuest: isGuest ?? true,
    paymentStatus: eventExists.isPaid ? "pending" : "completed", // 🔥 This line!
    registeredAt: new Date(),
});

    // 5️⃣ Generate unique transaction reference
    const txRef = `${registration._id.toString()}-${Date.now()}`;

    // 6️⃣ Initialize Chapa payment
    let firstName = "Guest";
    let lastName = "";
    let phoneNumber = "";

    // Find name field - look for fields with "name" in the label
    const nameFieldId = Object.keys(answers).find(key => {
      // Get the field label from event formFields
      const field = eventExists.formFields.find((f: { _id: { toString: () => string; }; }) => f._id.toString() === key);
      return field?.label.toLowerCase().includes('name');
    });

    if (nameFieldId && answers[nameFieldId]) {
      const fullName = answers[nameFieldId];
      // Split full name into first and last name
      const nameParts = fullName.trim().split(' ');
      firstName = nameParts[0] || "Guest";
      lastName = nameParts.slice(1).join(' ') || "";
    }

    // Find phone field
    const phoneFieldId = Object.keys(answers).find(key => {
      const field = eventExists.formFields.find((f: { _id: { toString: () => string; }; }) => f._id.toString() === key);
      return field?.label.toLowerCase().includes('phone');
    });

    if (phoneFieldId && answers[phoneFieldId]) {
      phoneNumber = answers[phoneFieldId];
    }

    // Prepare Chapa request data
    const chapaData = {
      amount: Number(amount),
      currency: "ETB",
      email,
      tx_ref: txRef,
      callback_url: `${BASE_URL}/api/registrations/payment-callback`,
      first_name: firstName,
      last_name: lastName,
      phone_number: phoneNumber || undefined, // Only include if available
      customizations: {
        title: eventExists.title,
        description: `Registration for ${eventExists.title}`
      }
    };

    const response = await fetch("https://api.chapa.co/v1/transaction/initialize", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${CHAPA_SECRET_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(chapaData),
    });

    const chapaDataResponse = await response.json();

    // ✅ CRITICAL FIX: Return response to frontend
    if (!chapaDataResponse.status || !chapaDataResponse.data?.checkout_url) {
      return NextResponse.json({
        error: chapaDataResponse.message || "Failed to initialize payment",
        chapaData: chapaDataResponse,
      }, { status: 500 });
    }

    // ✅ Return registration info + checkout URL
    return NextResponse.json({
      registrationId: registration._id,
      checkoutUrl: chapaDataResponse.data.checkout_url,
      txRef,
    });

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    console.error("Registration / Chapa Error:", err);
    return NextResponse.json({ error: err.message || "Failed to create registration" }, { status: 500 });
  }
}

// --------------------
// GET: List registrations by eventId
// --------------------
export async function GET(req: NextRequest) {
  try {
    await connectDB();
    const url = new URL(req.url);
    const eventId = url.searchParams.get("eventId");

    if (!eventId) {
      return NextResponse.json({ error: "eventId query param is required" }, { status: 400 });
    }

    const registrations = await Registration.find({
      eventId: new mongoose.Types.ObjectId(eventId),
    }).sort({ registeredAt: -1 });

    // Convert Map -> Object for frontend
    const registrationsJSON = registrations.map(reg => ({
      ...reg.toObject(),
      answers: Object.fromEntries(reg.answers),
    }));

    return NextResponse.json({ registrations: registrationsJSON });

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    console.error("Get Registrations Error:", err);
    return NextResponse.json({ error: err.message || "Failed to fetch registrations" }, { status: 500 });
  }
}
import { NextRequest, NextResponse } from "next/server";
import mongoose from "mongoose";
import Event from "@/models/Event";
import { connectDB } from "@/lib/db";
import Registration from "@/models/Registration";

// Normalize AND assign _id for NEW events
const CHAPA_SECRET_KEY = process.env.CHAPA_SECRET_KEY;
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

// eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unused-vars
const normalizeFormFields = (formFields: any) => {
  if (!formFields) return [];

  if (typeof formFields === "string") {
    formFields = JSON.parse(formFields);
  }

  if (!Array.isArray(formFields)) return [];

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return formFields.map((f: any) => ({
    _id: f._id || new mongoose.Types.ObjectId(),   // 👈 FIX 1: always create _id
    label: f.label ?? "",
    type: f.type ?? "text",
    required: f.required ?? false,
    options: Array.isArray(f.options) ? f.options : []
  }));
};

// --------------------------
// POST: Create a new event
// --------------------------
// app/api/registrations/route.ts
export async function POST(req: NextRequest) {
  try {
    await connectDB();
    const body = await req.json();
    const { eventId, answers, isGuest, email, amount } = body;

    // 1️⃣ Validate required fields
    if (!eventId || !answers || !email) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    // 2️⃣ Validate that the event exists
    const eventExists = await Event.findById(eventId);
    if (!eventExists) {
      return NextResponse.json({ error: "Event not found" }, { status: 404 });
    }

    // 3️⃣ For paid events, validate amount
    if (eventExists.isPaid) {
      if (!amount || isNaN(Number(amount)) || Number(amount) <= 0) {
        return NextResponse.json({ 
          error: "Valid amount is required for paid events" 
        }, { status: 400 });
      }
    }

    // 4️⃣ Normalize answers safely
    const answersMap = new Map<string, string>(
      Object.entries(answers).map(([k, v]) => [k, String(v)])
    );

    // 5️⃣ Create registration with appropriate payment status
    const registration = await Registration.create({
      eventId: new mongoose.Types.ObjectId(eventId),
      answers: answersMap,
      isGuest: isGuest ?? true,
      paymentStatus: eventExists.isPaid ? "pending" : "completed", // 🔥 Fixed!
      registeredAt: new Date(),
    });

    // 6️⃣ Generate unique transaction reference
    const txRef = `${registration._id.toString()}-${Date.now()}`;

    // 7️⃣ Check if payment is required
    if (eventExists.isPaid) {
      // Initialize Chapa payment for paid events
      let firstName = "Guest";
      let lastName = "";
      let phoneNumber = "";

      // Find name field
      const nameFieldId = Object.keys(answers).find(key => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const field = eventExists.formFields.find((f: any) => f._id.toString() === key);
        return field?.label.toLowerCase().includes('name');
      });

      if (nameFieldId && answers[nameFieldId]) {
        const fullName = answers[nameFieldId];
        const nameParts = fullName.trim().split(' ');
        firstName = nameParts[0] || "Guest";
        lastName = nameParts.slice(1).join(' ') || "";
      }

      // Find phone field
      const phoneFieldId = Object.keys(answers).find(key => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const field = eventExists.formFields.find((f: any) => f._id.toString() === key);
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
        phone_number: phoneNumber || undefined,
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

      if (!chapaDataResponse.status || !chapaDataResponse.data?.checkout_url) {
        // If Chapa fails, update registration status
        registration.paymentStatus = "failed";
        await registration.save();
        
        return NextResponse.json({
          error: chapaDataResponse.message || "Failed to initialize payment",
          chapaData: chapaDataResponse,
        }, { status: 500 });
      }

      // ✅ Return registration info + checkout URL for paid events
      return NextResponse.json({
        registrationId: registration._id,
        checkoutUrl: chapaDataResponse.data.checkout_url,
        txRef,
        isPaid: true,
      });
    } else {
      // ✅ Return success for free events
      return NextResponse.json({
        registrationId: registration._id,
        isPaid: false,
        message: "Registration successful",
        registeredAt: registration.registeredAt,
      });
    }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    console.error("Registration Error:", err);
    return NextResponse.json({ 
      error: err.message || "Failed to create registration" 
    }, { status: 500 });
  }
}

// --------------------------
// GET: List all events + registration count
// --------------------------
export async function GET() {
  try {
    await connectDB();

    const events = await Event.aggregate([
      {
        $lookup: {
          from: "registrations",
          localField: "_id",
          foreignField: "eventId",
          as: "registrations"
        }
      },
      {
        $addFields: {
          registrationsCount: { $size: "$registrations" }
        }
      },
      {
        $project: {
          registrations: 0
        }
      },
      {
        $sort: { date: 1 }
      }
    ]);

    // ✅ Wrap in { events: [...] } for frontend
    return NextResponse.json({ events }, { status: 200 });

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    console.error("Get Events Error:", err);
    return NextResponse.json(
      { error: err.message || "Failed to get events" },
      { status: 500 }
    );
  }
}

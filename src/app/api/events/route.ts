import { NextRequest, NextResponse } from "next/server";
import mongoose from "mongoose";
import Event from "@/models/Event";
import { connectDB } from "@/lib/db";

// Normalize AND assign _id for NEW events
// eslint-disable-next-line @typescript-eslint/no-explicit-any
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
export async function POST(req: NextRequest) {
  try {
    await connectDB();
    const body = await req.json();

    const event = await Event.create({
      title: body.title,
      description: body.description || "",
      date: body.date,
      location: body.location || "",
      isPaid: Boolean(body.isPaid),               // 👈 FIX 2
      price: Number(body.price) || 0,             // 👈 FIX 3
      formFields: normalizeFormFields(body.formFields)
    });

    return NextResponse.json(event, { status: 201 });

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    console.error("Create Event Error:", err);
    return NextResponse.json(
      { error: err.message || "Failed to create event" },
      { status: 500 }
    );
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

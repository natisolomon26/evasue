import { NextRequest, NextResponse } from "next/server";
import Event from "@/models/Event";
import { connectDB } from "@/lib/db";

// Helper: normalize formFields
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const normalizeFormFields = (formFields: any) => {
  if (!Array.isArray(formFields) && typeof formFields === "string") {
    formFields = JSON.parse(formFields);
  }
  if (!Array.isArray(formFields)) return [];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return formFields.map((f: any) => ({
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
      isPaid: body.isPaid ?? false,
      price: body.price ?? 0,
      formFields: normalizeFormFields(body.formFields)
    });

    return NextResponse.json(event, { status: 201 });
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    console.error("Create Event Error:", err);
    return NextResponse.json({ error: err.message || "Failed to create event" }, { status: 500 });
  }
}

// --------------------------
// GET: List all events
// --------------------------
export async function GET() {
  try {
    await connectDB();
    const events = await Event.find().sort({ date: 1 });
    return NextResponse.json(events, { status: 200 });
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    console.error("Get Events Error:", err);
    return NextResponse.json({ error: err.message || "Failed to get events" }, { status: 500 });
  }
}

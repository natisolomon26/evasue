import { NextRequest, NextResponse } from "next/server";
import Event from "@/models/Event";
import { connectDB } from "@/lib/db";

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

// Helper to get id from request
const getId = async (req: NextRequest) => {
  const url = new URL(req.url);
  const parts = url.pathname.split("/");
  return parts[parts.length - 1]; // last segment is the ID
};

// --------------------------
// GET single event
// --------------------------
export async function GET(req: NextRequest) {
  try {
    await connectDB();
    const id = await getId(req);
    const event = await Event.findById(id);
    if (!event) return NextResponse.json({ error: "Event not found" }, { status: 404 });
    return NextResponse.json(event, { status: 200 });
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    console.error("Get Event Error:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

// --------------------------
// PUT update event
// --------------------------
export async function PUT(req: NextRequest) {
  try {
    await connectDB();
    const body = await req.json();
    const id = await getId(req);

    const updatedEvent = await Event.findByIdAndUpdate(
      id,
      {
        ...body,
        formFields: body.formFields ? normalizeFormFields(body.formFields) : undefined
      },
      { new: true }
    );

    if (!updatedEvent) return NextResponse.json({ error: "Event not found" }, { status: 404 });
    return NextResponse.json(updatedEvent, { status: 200 });
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    console.error("Update Event Error:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

// --------------------------
// DELETE event
// --------------------------
export async function DELETE(req: NextRequest) {
  try {
    await connectDB();
    const id = await getId(req);

    const deleted = await Event.findByIdAndDelete(id);
    if (!deleted) return NextResponse.json({ error: "Event not found" }, { status: 404 });
    return NextResponse.json({ message: "Event deleted" }, { status: 200 });
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    console.error("Delete Event Error:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

import { NextRequest, NextResponse } from "next/server";
import Event from "@/models/Event";
import mongoose from "mongoose";
import { connectDB } from "@/lib/db";

// Normalize AND preserve _id for formFields
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const normalizeFormFields = (incomingFields: any, existingFields: any[] = []) => {
  if (!incomingFields) return [];

  if (typeof incomingFields === "string") {
    incomingFields = JSON.parse(incomingFields);
  }

  if (!Array.isArray(incomingFields)) return [];

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return incomingFields.map((field: any) => {
    // Try to preserve existing _id
    const found = existingFields.find((f) => f._id?.toString() === field._id);

    return {
      _id: found?._id || new mongoose.Types.ObjectId(),
      label: field.label ?? "",
      type: field.type ?? "text",
      required: field.required ?? false,
      options: Array.isArray(field.options) ? field.options : []
    };
  });
};

// Extract event ID from URL
const getId = async (req: NextRequest) => {
  const url = new URL(req.url);
  const parts = url.pathname.split("/");
  return parts[parts.length - 1];
};

// --------------------------
// GET single event
// --------------------------
export async function GET(req: NextRequest) {
  try {
    await connectDB();
    const id = await getId(req);

    const event = await Event.findById(id);
    if (!event) {
      return NextResponse.json({ error: "Event not found" }, { status: 404 });
    }

    return NextResponse.json(event, { status: 200 });
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    console.error("Get Event Error:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

// --------------------------
// PUT update event (fixed & safe)
// --------------------------
export async function PUT(req: NextRequest) {
  try {
    await connectDB();
    const id = await getId(req);
    const body = await req.json();

    const existingEvent = await Event.findById(id);
    if (!existingEvent) {
      return NextResponse.json({ error: "Event not found" }, { status: 404 });
    }

    // Preserve old fields + generate new ones
    const updatedFields = normalizeFormFields(
      body.formFields,
      existingEvent.formFields
    );

    existingEvent.title = body.title ?? existingEvent.title;
    existingEvent.description = body.description ?? existingEvent.description;
    existingEvent.date = body.date ?? existingEvent.date;
    existingEvent.location = body.location ?? existingEvent.location;
    existingEvent.isPaid = body.isPaid ?? existingEvent.isPaid;
    existingEvent.price = body.price ?? existingEvent.price;

    if (body.formFields) {
      existingEvent.formFields = updatedFields;
    }

    const saved = await existingEvent.save();

    return NextResponse.json(saved, { status: 200 });
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
    if (!deleted) {
      return NextResponse.json({ error: "Event not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Event deleted" }, { status: 200 });
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    console.error("Delete Event Error:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

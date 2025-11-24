// src/app/api/events/[id]/route.ts
import { NextRequest, NextResponse } from "next/server";
import Event from "@/models/Event";
import { connectToDatabase } from "@/lib/mongoose";
import { authMiddleware } from "@/lib/authMiddleware";

// -----------------------
// GET SINGLE EVENT
// -----------------------
export async function GET(req: NextRequest, context: { params: Promise<{ id: string }> }) {
  try {
    await connectToDatabase();

    // Unwrap params
    const { id } = await context.params;

    const event = await Event.findById(id);
    if (!event) return NextResponse.json({ error: "Event not found" }, { status: 404 });

    return NextResponse.json({ event });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Failed to fetch event" }, { status: 500 });
  }
}

// -----------------------
// UPDATE EVENT
// -----------------------
export async function PUT(req: NextRequest, context: { params: Promise<{ id: string }> }) {
  try {
    await connectToDatabase();

    // Check permission
    const user = authMiddleware(req, { requirePermission: { resource: "events", action: "update" } });
    if (user instanceof NextResponse) return user;

    // Unwrap params
    const { id } = await context.params;
    const body = await req.json();

    const event = await Event.findByIdAndUpdate(id, body, { new: true });
    if (!event) return NextResponse.json({ error: "Event not found" }, { status: 404 });

    return NextResponse.json({ message: "Event updated", event });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Failed to update event" }, { status: 500 });
  }
}

// -----------------------
// DELETE EVENT
// -----------------------
export async function DELETE(req: NextRequest, context: { params: Promise<{ id: string }> }) {
  try {
    await connectToDatabase();

    // Check permission
    const user = authMiddleware(req, { requirePermission: { resource: "events", action: "delete" } });
    if (user instanceof NextResponse) return user;

    // Unwrap params
    const { id } = await context.params;

    const event = await Event.findByIdAndDelete(id);
    if (!event) return NextResponse.json({ error: "Event not found" }, { status: 404 });

    return NextResponse.json({ message: "Event deleted" });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Failed to delete event" }, { status: 500 });
  }
}

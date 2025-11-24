import { NextRequest, NextResponse } from "next/server";
import Event from "@/models/Event";
import { authMiddleware } from "@/lib/authMiddleware";

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const event = await Event.findById(params.id).populate("createdBy", "name email");
    if (!event) return NextResponse.json({ error: "Event not found" }, { status: 404 });
    return NextResponse.json({ event });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Failed to fetch event" }, { status: 500 });
  }
}

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const user = authMiddleware(req, { requirePermission: { resource: "events", action: "update" } });
    if (user instanceof NextResponse) return user;

    const body = await req.json();
    const event = await Event.findByIdAndUpdate(params.id, body, { new: true });

    if (!event) return NextResponse.json({ error: "Event not found" }, { status: 404 });

    return NextResponse.json({ message: "Event updated", event });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Failed to update event" }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const user = authMiddleware(req, { requirePermission: { resource: "events", action: "delete" } });
    if (user instanceof NextResponse) return user;

    const event = await Event.findByIdAndDelete(params.id);
    if (!event) return NextResponse.json({ error: "Event not found" }, { status: 404 });

    return NextResponse.json({ message: "Event deleted" });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Failed to delete event" }, { status: 500 });
  }
}

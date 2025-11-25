// src/app/api/events/[id]/register/route.ts
import { NextResponse } from "next/server";
import { authMiddleware } from "@/lib/authMiddleware";
import Event from "@/models/Event";
import { connectToDatabase } from "@/lib/mongoose";

export async function POST(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  await connectToDatabase();

  const user = authMiddleware(req);
  if (user instanceof NextResponse) return user;

  const { id } = await context.params;
  const { answers } = await req.json();

  if (!answers || typeof answers !== "object") {
    return NextResponse.json({ error: "Invalid registration data" }, { status: 400 });
  }

  const event = await Event.findById(id);
  if (!event) return NextResponse.json({ error: "Event not found" }, { status: 404 });

  // Validate required fields
  for (const field of event.formFields) {
    if (field.required && !answers[field.label]) {
      return NextResponse.json({ error: `Missing required field: ${field.label}` }, { status: 400 });
    }
  }

  const existing = event.registrations.find((r) => r.userId === user.id);
  if (existing) return NextResponse.json({ error: "User already registered" }, { status: 400 });

  event.registrations.push({ userId: user.id, answers, registeredAt: new Date() });
  await event.save();

  return NextResponse.json({ message: "Registered successfully" });
}

// -----------------------
// GET all registrations for an event
// -----------------------
export async function GET(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  await connectToDatabase();

  // Check permission if needed
  const user = authMiddleware(req, { requirePermission: { resource: "events", action: "read" } });
  if (user instanceof NextResponse) return user;

  const { id } = await context.params;

  const event = await Event.findById(id);
  if (!event) return NextResponse.json({ error: "Event not found" }, { status: 404 });

  return NextResponse.json({ registrations: event.registrations || [] }, { status: 200 });
}

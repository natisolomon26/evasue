// src/app/api/events/[id]/register/route.ts
import { NextResponse } from "next/server";
import { authMiddleware } from "@/lib/authMiddleware";
import Event from "@/models/Event";
import { connectToDatabase } from "@/lib/mongoose";


// src/app/api/events/[id]/register/route.ts
// Updated registration route
export async function POST(req: Request, context: { params: Promise<{ id: string }> }) {
  await connectToDatabase();

  // ✅ Authenticate user first
  const user = await authMiddleware(req);
  if (user instanceof NextResponse) return user;

  const { id } = await context.params;
  const { answers, isGuest } = await req.json();

  console.log("📝 REGISTRATION API - Received:", { answers, isGuest });

  const event = await Event.findById(id);
  if (!event) return NextResponse.json({ error: "Event not found" }, { status: 404 });

  try {
    // ✅ Store as plain object and include userId
    event.registrations.push({ 
      answers: answers,  // Plain object, not Map
      registeredAt: new Date(),
      isGuest: isGuest || false,
      userId: user.id   // ✅ Critical for receipt lookup
    });

    console.log("💾 Saving event with user registration...");
    await event.save();
    console.log("✅ Registration saved successfully");

    return NextResponse.json({ message: "Registered successfully" });
  } catch (error) {
    console.error("❌ Registration error:", error);
    return NextResponse.json({ error: "Failed to save registration" }, { status: 500 });
  }
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

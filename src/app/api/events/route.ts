// src/app/api/events/route.ts
import { NextResponse } from "next/server";
import Event from "@/models/Event";
import { connectToDatabase } from "@/lib/mongoose";
import { authMiddleware } from "@/lib/authMiddleware";

export async function POST(req: Request) {
  await connectToDatabase();

  // Authenticate user
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const user = await authMiddleware(req as any);
  if (user instanceof NextResponse) return user;

  try {
    const body = await req.json();

    // Validate required fields
    if (!body.title || !body.date) {
      return NextResponse.json(
        { error: "Missing required fields: title or date" },
        { status: 400 }
      );
    }

    // DEBUG: Log what we're receiving
    console.log("Creating event with formFields:", body.formFields);

    // Create event WITH formFields
    const event = await Event.create({
      title: body.title,
      description: body.description || "",
      location: body.location || "",
      date: new Date(body.date),
      createdBy: user.id,
      formFields: body.formFields || [], // ⚠️ ADD THIS LINE ⚠️
    });

    // DEBUG: Log what was saved
    console.log("Event created with formFields:", event.formFields);

    return NextResponse.json({ message: "Event created", event }, { status: 201 });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Failed to create event" }, { status: 500 });
  }
}

// GET all events
// GET all events
export async function GET() {
  await connectToDatabase();
  try {
    const events = await Event.find()
      .select('title description date location createdBy formFields registrations createdAt updatedAt')
      .sort({ date: -1 });
    return NextResponse.json({ events }, { status: 200 });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Failed to fetch events" }, { status: 500 });
  }
}
// src/app/api/events/route.ts
import { NextResponse } from "next/server";
import Event from "@/models/Event";
import { connectToDatabase } from "@/lib/mongoose";
import { authMiddleware } from "@/lib/authMiddleware";

export async function POST(req: Request) {
  await connectToDatabase();

  // Authenticate user
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const user = await authMiddleware(req as any); // cast if needed
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

    // Create event
    const event = await Event.create({
      title: body.title,
      description: body.description || "",
      location: body.location || "",
      date: new Date(body.date), // ensure Date object
      createdBy: user.id, // set the authenticated user as creator
    });

    return NextResponse.json({ message: "Event created", event }, { status: 201 });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Failed to create event" }, { status: 500 });
  }
}

// GET all events
export async function GET() {
  await connectToDatabase();
  try {
    const events = await Event.find().sort({ date: -1 });
    return NextResponse.json({ events }, { status: 200 });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Failed to fetch events" }, { status: 500 });
  }
}

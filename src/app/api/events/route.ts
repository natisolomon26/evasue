// src/app/api/events/route.ts
import { connectToDatabase } from "@/lib/mongoose";
import Event from "@/models/Event"; // create Event model
import { authMiddleware } from "@/lib/authMiddleware";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  await connectToDatabase();

  // ✅ Check user and permissions
  const userOrResponse = authMiddleware(req, true); // admin required
  if (userOrResponse instanceof NextResponse) return userOrResponse;
  const user = userOrResponse;

  // Check if user has permission to create events
  if (!user.permissions?.events?.create) {
    return NextResponse.json({ error: "Forbidden: No permission to create events" }, { status: 403 });
  }

  try {
    const body = await req.json();
    const { title, description, eventDate } = body;

    if (!title || !eventDate) {
      return NextResponse.json({ error: "Title and date are required" }, { status: 400 });
    }

    const event = await Event.create({
      title,
      description: description || "",
      eventDate: new Date(eventDate),
      createdBy: user.id,
    });

    return NextResponse.json({ message: "Event created successfully", event }, { status: 201 });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

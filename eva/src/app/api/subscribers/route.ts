// /app/api/subscribers/route.ts
import { NextResponse } from "next/server";
import Subscriber from "@/models/Subsciber";
import { connectDB } from "@/lib/db";

export async function GET() {
  try {
    await connectDB();

    const subscribers = await Subscriber.find().sort({ createdAt: -1 });

    return NextResponse.json(subscribers);
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

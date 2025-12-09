// /app/api/subscribe/route.ts
import { NextResponse } from "next/server";
import Subscriber from "@/models/Subsciber";
import { connectDB } from "@/lib/db";

export async function POST(req: Request) {
  try {
    await connectDB();
    const { email, categories } = await req.json();

    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    // If subscriber exists → update categories + reactivate
    const existing = await Subscriber.findOne({ email });

    if (existing) {
      existing.categories = categories || existing.categories;
      existing.status = "active";
      await existing.save();

      return NextResponse.json({
        message: "Subscription updated",
        subscriber: existing,
      });
    }

    // Create new subscriber
    const newSub = await Subscriber.create({
      email,
      categories: categories || ["newsletter"],
    });

    return NextResponse.json({
      message: "Subscribed successfully",
      subscriber: newSub,
    });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

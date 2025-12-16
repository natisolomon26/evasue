// /app/api/unsubscribe/route.ts
import { NextResponse } from "next/server";
import Subscriber from "@/models/Subsciber";
import { connectDB } from "@/lib/db";

export async function POST(req: Request) {
  try {
    await connectDB();
    const { email } = await req.json();

    if (!email) {
      return NextResponse.json({ error: "Email required" }, { status: 400 });
    }

    await Subscriber.findOneAndUpdate(
      { email },
      { status: "unsubscribed" }
    );

    return NextResponse.json({ message: "Unsubscribed successfully" });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Staff from "@/models/Staff";

export async function GET() {
  try {
    await connectDB();
    const staff = await Staff.find().sort({ createdAt: -1 });
    return NextResponse.json({ success: true, data: staff });
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    return NextResponse.json({ success: false }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    await connectDB();
    const body = await req.json();
    const staff = await Staff.create(body);
    return NextResponse.json({ success: true, data: staff }, { status: 201 });
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    return NextResponse.json({ success: false }, { status: 500 });
  }
}

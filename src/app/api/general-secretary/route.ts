import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import GeneralSecretary from "@/models/GeneralSecretary";

export async function GET() {
  await connectDB();
  const secretaries = await GeneralSecretary.find().sort({ createdAt: -1 });
  return NextResponse.json({ success: true, data: secretaries });
}

export async function POST(req: Request) {
  await connectDB();
  const body = await req.json();

  // Automatically deactivate old secretary when adding new one
  await GeneralSecretary.updateMany({ isActive: true }, { isActive: false });

  const sec = await GeneralSecretary.create(body);

  return NextResponse.json({ success: true, data: sec }, { status: 201 });
}

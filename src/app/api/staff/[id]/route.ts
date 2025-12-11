import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Staff from "@/models/Staff";

export async function GET(_req: Request, context: { params: Promise<{ id: string }> }) {
  const { id } = await context.params;
  await connectDB();

  const staff = await Staff.findById(id);
  if (!staff) return NextResponse.json({ message: "Not found" }, { status: 404 });

  return NextResponse.json({ success: true, data: staff });
}

export async function PUT(req: Request, context: { params: Promise<{ id: string }> }) {
  const { id } = await context.params;
  await connectDB();

  const body = await req.json();
  const updated = await Staff.findByIdAndUpdate(id, body, { new: true });

  return NextResponse.json({ success: true, data: updated });
}

export async function DELETE(_req: Request, context: { params: Promise<{ id: string }> }) {
  const { id } = await context.params;
  await connectDB();

  await Staff.findByIdAndDelete(id);
  return NextResponse.json({ success: true });
}

import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import GeneralSecretary from "@/models/GeneralSecretary";

export async function GET(_req: Request, context: { params: Promise<{ id: string }> }) {
  const { id } = await context.params;
  await connectDB();

  const sec = await GeneralSecretary.findById(id);
  if (!sec) return NextResponse.json({ message: "Not found" }, { status: 404 });

  return NextResponse.json({ success: true, data: sec });
}

export async function PUT(req: Request, context: { params: Promise<{ id: string }> }) {
  const { id } = await context.params;
  await connectDB();

  const body = await req.json();
  const updated = await GeneralSecretary.findByIdAndUpdate(id, body, { new: true });

  return NextResponse.json({ success: true, data: updated });
}

export async function DELETE(_req: Request, context: { params: Promise<{ id: string }> }) {
  const { id } = await context.params;
  await connectDB();

  await GeneralSecretary.findByIdAndDelete(id);
  return NextResponse.json({ success: true });
}

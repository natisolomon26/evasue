import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Registration from "@/models/Registration";

// Helper to get ID from URL
const getId = (req: NextRequest) => {
  const url = new URL(req.url);
  const parts = url.pathname.split("/");
  return parts[parts.length - 1];
};

// GET single registration
export async function GET(req: NextRequest) {
  try {
    await connectDB();
    const id = getId(req);
    const registration = await Registration.findById(id);
    if (!registration) return NextResponse.json({ error: "Registration not found" }, { status: 404 });
    return NextResponse.json(registration, { status: 200 });
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    console.error("Get Registration Error:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

// PUT update registration (e.g., paymentStatus)
export async function PUT(req: NextRequest) {
  try {
    await connectDB();
    const id = getId(req);
    const body = await req.json();

    const updated = await Registration.findByIdAndUpdate(id, { ...body }, { new: true });
    if (!updated) return NextResponse.json({ error: "Registration not found" }, { status: 404 });

    return NextResponse.json(updated, { status: 200 });
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    console.error("Update Registration Error:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

// DELETE registration
export async function DELETE(req: NextRequest) {
  try {
    await connectDB();
    const id = getId(req);

    const deleted = await Registration.findByIdAndDelete(id);
    if (!deleted) return NextResponse.json({ error: "Registration not found" }, { status: 404 });

    return NextResponse.json({ message: "Registration deleted" }, { status: 200 });
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    console.error("Delete Registration Error:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Registration from "@/models/Registration";
import mongoose from "mongoose";

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

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json({ error: "Invalid registration ID" }, { status: 400 });
    }

    const registration = await Registration.findById(id);
    if (!registration) return NextResponse.json({ error: "Registration not found" }, { status: 404 });

    // Convert answers Map to object for frontend
    const registrationJSON = {
      ...registration.toObject(),
      answers: Object.fromEntries(registration.answers),
    };

    return NextResponse.json(registrationJSON, { status: 200 });
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

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json({ error: "Invalid registration ID" }, { status: 400 });
    }

    const body = await req.json();

    // Validate paymentStatus if provided
    if (body.paymentStatus && !["pending", "completed", "failed"].includes(body.paymentStatus)) {
      return NextResponse.json({ error: "Invalid paymentStatus value" }, { status: 400 });
    }

    // Normalize answers if provided
    if (body.answers) {
      body.answers = new Map(Object.entries(body.answers));
    }

    const updated = await Registration.findByIdAndUpdate(id, { ...body }, { new: true });
    if (!updated) return NextResponse.json({ error: "Registration not found" }, { status: 404 });

    const updatedJSON = {
      ...updated.toObject(),
      answers: Object.fromEntries(updated.answers),
    };

    return NextResponse.json(updatedJSON, { status: 200 });
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

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json({ error: "Invalid registration ID" }, { status: 400 });
    }

    const deleted = await Registration.findByIdAndDelete(id);
    if (!deleted) return NextResponse.json({ error: "Registration not found" }, { status: 404 });

    return NextResponse.json({ message: "Registration deleted" }, { status: 200 });
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    console.error("Delete Registration Error:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

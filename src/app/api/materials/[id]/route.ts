import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Materials from "@/models/Materials";

export async function GET(
  request: Request,
  context: { params: Promise<{ id: string }> }
) {
  await connectDB();

  const { id } = await context.params; // ✅ IMPORTANT

  const material = await Materials.findById(id);

  if (!material) {
    return NextResponse.json(
      { message: "Material not found" },
      { status: 404 }
    );
  }

  return NextResponse.json(material);
}

export async function PUT(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();

    const { id } = await context.params; // ✅ FIX
    const body = await req.json();

    const material = await Materials.findByIdAndUpdate(id, body, {
      new: true,
      runValidators: true,
    });

    if (!material) {
      return NextResponse.json(
        { message: "Material not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(material);
  } catch (error) {
    console.error("PUT MATERIAL ERROR:", error);
    return NextResponse.json(
      { message: "Failed to update material" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();

    const { id } = await context.params; // ✅ FIX

    const deletedMaterial = await Materials.findByIdAndDelete(id);

    if (!deletedMaterial) {
      return NextResponse.json(
        { message: "Material not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("DELETE MATERIAL ERROR:", error);
    return NextResponse.json(
      { message: "Failed to delete material" },
      { status: 500 }
    );
  }
}
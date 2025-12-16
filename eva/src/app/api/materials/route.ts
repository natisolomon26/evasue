import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Materials from "@/models/Materials";

export async function GET() {
  await connectDB();
  const materials = await Materials.find({ isPublished: true }).sort({ createdAt: -1 });
  return NextResponse.json({ data: materials });
}

export async function POST(req: Request) {
  try {
    await connectDB();
    const body = await req.json();

    const { title, fileUrl, fileType, category } = body;
    if (!title || !fileUrl || !fileType) {
      return NextResponse.json({ message: "Missing fields" }, { status: 400 });
    }

    const material = await Materials.create(body);
    return NextResponse.json({ success: true, data: material }, { status: 201 });
  } catch (error) {
    console.error("POST MATERIAL ERROR:", error);
    return NextResponse.json({ message: "Failed to create material" }, { status: 500 });
  }
}

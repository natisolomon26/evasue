// src/app/api/materials/download/[id].ts
import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongoose";
import Material, { IMaterial } from "@/models/Materials";
import { authMiddleware } from "@/lib/authMiddleware";

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    await connectToDatabase();

    // -------------------------------
    // 1. Check if user is logged in
    // -------------------------------
    const user = authMiddleware(req); // only login required
    if (user instanceof NextResponse) return user; // unauthorized response

    // -------------------------------
    // 2. Get material by ID
    // -------------------------------
    const { id } = params;
    const material: IMaterial | null = await Material.findById(id);

    if (!material) {
      return NextResponse.json({ error: "Material not found" }, { status: 404 });
    }

    // -------------------------------
    // 3. Return file URL or data
    // -------------------------------
    // If using Google Drive link, just return the URL
    return NextResponse.json({ material }, { status: 200 });

    // Optional: if you want to proxy download, you can fetch the file and stream it
    // But for Drive URLs, frontend can just use material.fileUrl
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

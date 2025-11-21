// src/app/api/materials/route.ts
import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongoose";
import Material from "@/models/Materials";
import { authMiddleware } from "@/lib/authMiddleware";


export async function POST(req: NextRequest) {
  await connectToDatabase();

  const user = authMiddleware(req, true); // admin only
  if (user instanceof NextResponse) return user; // blocked

  const { title, description, fileUrl } = await req.json();

  const material = await Material.create({
    title,
    description,
    fileUrl,
    createdBy: user.id,
  });

  return NextResponse.json({ message: "Material created", material }, { status: 201 });
}

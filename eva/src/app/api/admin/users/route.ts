// src/app/api/admin/users/route.ts
import { NextRequest, NextResponse } from "next/server";
import { authMiddleware } from "@/lib/authMiddleware";
import User from "@/models/User";
import { connectToDatabase } from "@/lib/mongoose";

export async function GET(req: NextRequest) {
  await connectToDatabase();

  // Auth check
  const authResult = authMiddleware(req, { requireAdmin: true });
  if (authResult instanceof NextResponse) return authResult;

  const users = await User.find().select("-password"); // exclude password
  return NextResponse.json(users);
}

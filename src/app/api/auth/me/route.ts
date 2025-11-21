// src/app/api/auth/me/route.ts
import { connectToDatabase } from "@/lib/mongoose";
import { verifyJwt } from "@/lib/jwt";
import User from "@/models/User";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET() {
  await connectToDatabase();

  const cookieStore = cookies(); // ✅ synchronous
  const token = (await cookieStore).get("auth_token")?.value;

  if (!token) return NextResponse.json({ user: null });

  const decoded = verifyJwt(token);
  if (!decoded) return NextResponse.json({ user: null });

  const user = await User.findById(decoded.id).select("-password");

  return NextResponse.json({ user });
}

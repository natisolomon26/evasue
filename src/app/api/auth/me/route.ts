// src/app/api/auth/me/route.ts
import { connectToDatabase } from "@/lib/mongoose";
import { verifyJwt } from "@/lib/jwt";
import User from "@/models/User";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET() {
  await connectToDatabase();

  const cookieStore = cookies(); // synchronous
  const token = (await cookieStore).get("auth_token")?.value;

  if (!token) return NextResponse.json({ user: null });

  const decoded = verifyJwt(token);
  if (!decoded) return NextResponse.json({ user: null });

  const user = await User.findById(decoded.id).select("-password");

  if (!user) return NextResponse.json({ user: null });

  // ✅ If system-protected, override all permissions to true
  const permissions = user.isSystemProtected
    ? {
        events: { create: true, read: true, update: true, delete: true },
        newsletter: { create: true, read: true, update: true, delete: true },
        emails: { create: true, read: true, update: true, delete: true },
        materials: { create: true, read: true, update: true, delete: true },
      }
    : user.permissions;

  const userWithPermissions = {
    ...user.toObject(),
    permissions,
  };

  return NextResponse.json({ user: userWithPermissions });
}

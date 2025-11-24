// src/app/api/auth/me/route.ts
import { NextRequest, NextResponse } from "next/server";
import { authMiddleware } from "@/lib/authMiddleware";

export async function GET(req: NextRequest) {
  const userOrResponse = authMiddleware(req);

  // If authMiddleware returns NextResponse, it means unauthorized
  if (userOrResponse instanceof NextResponse) return userOrResponse;

  const user = userOrResponse;

  // Superadmin → all permissions
  if (user.isSystemProtected) {
    user.permissions = {
      events: { create: true, read: true, update: true, delete: true },
      newsletter: { create: true, read: true, update: true, delete: true },
      emails: { create: true, read: true, update: true, delete: true },
      materials: { create: true, read: true, update: true, delete: true },
    };
  }

  return NextResponse.json({ user });
}

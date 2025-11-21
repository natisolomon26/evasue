// src/middleware/authMiddleware.ts
import { NextRequest, NextResponse } from "next/server";
import { verifyJwt, AuthTokenPayload } from "@/lib/jwt";

export const authMiddleware = (
  req: NextRequest,
  requireAdmin: boolean = false
): AuthTokenPayload | NextResponse => {
  try {
    const token = req.cookies.get("auth_token")?.value; // ✅ synchronous
    if (!token) {
      return NextResponse.json({ error: "Unauthorized: No token" }, { status: 401 });
    }

    const user = verifyJwt(token);
    if (!user) {
      return NextResponse.json({ error: "Unauthorized: Invalid token" }, { status: 401 });
    }

    // Check admin access if required
    if (requireAdmin && !user.isAdmin) {
      return NextResponse.json({ error: "Forbidden: Admin only" }, { status: 403 });
    }

    return user; // ✅ decoded JWT payload
  } catch (err) {
    console.error("Auth middleware error:", err);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
};

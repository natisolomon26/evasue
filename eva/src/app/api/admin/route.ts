// src/app/api/admin/route.ts
import { NextResponse } from "next/server";
import { authMiddleware } from "@/lib/authMiddleware";

export async function GET(req: Request) {
  try {
    // Check user & require login
    const user = authMiddleware(req); // returns payload or NextResponse
    if (user instanceof NextResponse) return user;

    // Return user info including permissions
    return NextResponse.json({ user }, { status: 200 });
  } catch (err) {
    console.error("Admin route error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

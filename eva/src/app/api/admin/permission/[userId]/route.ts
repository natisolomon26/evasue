// src/app/api/admin/permissions/[userId]/route.ts
import { NextResponse } from "next/server";
import { verifyJwt } from "@/lib/jwt";
import User from "@/models/User";
import { connectToDatabase } from "@/lib/mongoose";

export async function GET(req: Request, { params }: { params: { userId: string } }) {
  try {
    await connectToDatabase();

    // Check auth
    const token = req.headers.get("Authorization")?.replace("Bearer ", "");
    if (!token) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const payload = verifyJwt(token);
    if (!payload || payload.role !== "superadmin") {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const { userId } = params;
    const user = await User.findById(userId).select("-password");
    if (!user) return NextResponse.json({ error: "User not found" }, { status: 404 });

    return NextResponse.json({ user });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

export async function PUT(req: Request, { params }: { params: { userId: string } }) {
  try {
    await connectToDatabase();

    // Check auth
    const token = req.headers.get("Authorization")?.replace("Bearer ", "");
    if (!token) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const payload = verifyJwt(token);
    if (!payload || payload.role !== "superadmin") {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const { userId } = params;
    const { role, permissions } = await req.json();

    const user = await User.findById(userId);
    if (!user) return NextResponse.json({ error: "User not found" }, { status: 404 });

    // Update role & permissions
    if (role && ["admin", "staff"].includes(role)) user.role = role;
    if (permissions) user.permissions = permissions;

    await user.save();

    return NextResponse.json({ message: "Permissions updated", user });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

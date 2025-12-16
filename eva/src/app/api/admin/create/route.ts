// src/app/api/admin/create/route.ts
import { connectToDatabase } from "@/lib/mongoose";
import User from "@/models/User";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";
import { authMiddleware } from "@/lib/authMiddleware";

export async function POST(req: Request) {
  try {
    await connectToDatabase();

    // Check superadmin
    const user = authMiddleware(req, true); // requireAdmin = true
    if ("status" in user) return user; // Not authorized

    const { name, email, password, role, permissions } = await req.json();

    // Validate role
    if (!["admin", "staff"].includes(role)) {
      return NextResponse.json({ error: "Invalid role" }, { status: 400 });
    }

    const exists = await User.findOne({ email });
    if (exists) {
      return NextResponse.json({ error: "User already exists" }, { status: 400 });
    }

    const hashed = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      name,
      email,
      password: hashed,
      role,
      isSystemProtected: false,
      permissions,
    });

    return NextResponse.json({ message: "User created", user: newUser }, { status: 201 });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

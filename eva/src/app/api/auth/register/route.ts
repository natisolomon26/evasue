// src/app/api/auth/register/route.ts
import { connectToDatabase } from "@/lib/mongoose";
import { signJwt, setAuthCookie } from "@/lib/jwt";
import User from "@/models/User";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    await connectToDatabase();

    const { name, email, password, isAdmin } = await req.json();

    if (!name || !email || !password) {
      return NextResponse.json({ error: "Name, email, and password are required" }, { status: 400 });
    }

    // Check if user exists
    const exists = await User.findOne({ email });
    if (exists) {
      return NextResponse.json({ error: "User already exists" }, { status: 400 });
    }

    // Hash password
    const hashed = await bcrypt.hash(password, 10);

    // Determine if first user → system-protected superadmin
    const userCount = await User.countDocuments({});
    const isSystemProtected = userCount === 0;

    // Determine role
    let role: "superadmin" | "admin" | "staff" = "staff";
    if (isSystemProtected) role = "superadmin";
    else if (isAdmin) role = "admin";

    // Set default permissions
    const defaultPermissions = {
      events: { create: role === "superadmin", read: true, update: role === "superadmin", delete: role === "superadmin" },
      newsletter: { create: role === "superadmin", read: true, update: role === "superadmin", delete: role === "superadmin" },
      emails: { create: role === "superadmin", read: true, update: role === "superadmin", delete: role === "superadmin" },
      materials: { create: role === "superadmin", read: true, update: role === "superadmin", delete: role === "superadmin" },
    };

    // Create user
    const user = await User.create({
      name,
      email,
      password: hashed,
      role,
      isSystemProtected,
      permissions: defaultPermissions,
    });

    // Sign JWT
    const token = signJwt({
      id: user._id.toString(),
      email: user.email,
      name: user.name,
      role: user.role,
      isSystemProtected: user.isSystemProtected,
      permissions: user.permissions,
    });

    // Response
    const res = NextResponse.json(
      { message: "User registered successfully", user },
      { status: 201 }
    );

    // Set HTTP-only cookie
    setAuthCookie(res, token);

    return res;
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

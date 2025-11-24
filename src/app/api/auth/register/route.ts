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

    // Check if user exists
    const exists = await User.findOne({ email });
    if (exists) {
      return NextResponse.json(
        { error: "User already exists" },
        { status: 400 }
      );
    }

    // Hash password
    const hashed = await bcrypt.hash(password, 10);

    // Check if first user → make system-protected Super Admin
    const userCount = await User.countDocuments({});
    const isSystemProtected = userCount === 0;

    // Create user
    const user = await User.create({
      name,
      email,
      password: hashed,
      isAdmin: isAdmin || isSystemProtected, // Super Admin is automatically admin
      isSystemProtected,
      permissions: {
        events: { create: isSystemProtected, read: true, update: isSystemProtected, delete: isSystemProtected },
        newsletter: { create: isSystemProtected, read: true, update: isSystemProtected, delete: isSystemProtected },
        emails: { create: isSystemProtected, read: true, update: isSystemProtected, delete: isSystemProtected },
        materials: { create: isSystemProtected, read: true, update: isSystemProtected, delete: isSystemProtected },
      },
    });

    // Sign JWT
    const token = signJwt({
      id: user._id.toString(),
      email: user.email,
      name: user.name,
      isAdmin: user.isAdmin,
      isSystemProtected: user.isSystemProtected,
      permissions: user.permissions,
    });

    // Response
    const res = NextResponse.json(
      { message: "User registered successfully", user },
      { status: 201 }
    );

    // Set cookie
    setAuthCookie(res, token);

    return res;
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

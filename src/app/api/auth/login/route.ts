// src/app/api/auth/login/route.ts
import { connectToDatabase } from "@/lib/mongoose";
import { signJwt } from "@/lib/jwt";
import User from "@/models/User";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    await connectToDatabase();

    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and password are required" },
        { status: 400 }
      );
    }

    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json(
        { error: "Invalid email or password" },
        { status: 400 }
      );
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return NextResponse.json(
        { error: "Invalid email or password" },
        { status: 400 }
      );
    }

    // If system-protected, override permissions to true
    const permissions = user.isSystemProtected
      ? {
          events: { create: true, read: true, update: true, delete: true },
          newsletter: { create: true, read: true, update: true, delete: true },
          emails: { create: true, read: true, update: true, delete: true },
          materials: { create: true, read: true, update: true, delete: true },
        }
      : user.permissions;

    const token = signJwt({
      id: user._id.toString(),
      email: user.email,
      name: user.name,
      isAdmin: user.isAdmin,
      isSystemProtected: user.isSystemProtected,
      permissions,
    });

    const res = NextResponse.json({
      message: "Login successful",
      user: {
        ...user.toObject(),
        permissions,
      },
    });

    res.cookies.set({
      name: "auth_token",
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7,
      path: "/",
    });

    return res;
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

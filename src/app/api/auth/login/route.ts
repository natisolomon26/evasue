import { connectToDatabase } from "@/lib/mongoose";
import { signJwt } from "@/lib/jwt";
import User from "@/models/User";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    await connectToDatabase();

    const { email, password } = await req.json();

    // Basic validation
    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and password are required" },
        { status: 400 }
      );
    }

    // Find user
    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json(
        { error: "Invalid email or password" },
        { status: 400 }
      );
    }

    // Validate password
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return NextResponse.json(
        { error: "Invalid email or password" },
        { status: 400 }
      );
    }

    // ----------------------------
    // Create JWT payload
    // ----------------------------
    const token = signJwt({
      id: user._id.toString(),
      email: user.email,
      permissions: [],           // placeholder for future permission system
    });

    // Response
    const res = NextResponse.json({
      message: "Login successful",
      user: { id: user._id, email: user.email },
    });

    // ----------------------------
    // Set secure HTTP-only cookie
    // ----------------------------
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
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json(
      { error: "Server error, please try again" },
      { status: 500 }
    );
  }
}

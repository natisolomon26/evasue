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

    // Create user
    const user = await User.create({
      name,
      email,
      password: hashed,
      isAdmin: isAdmin || false, // defaults to false
    });

    // Sign JWT (NO role)
    const token = signJwt({
      id: user._id.toString(),
      email: user.email,
      isAdmin: user.isAdmin,
    });

    // Create response
    const res = NextResponse.json(
      { message: "User registered successfully" },
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

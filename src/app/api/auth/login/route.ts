import { connectToDatabase } from "@/lib/mongoose";
import { signJwt } from "@/lib/jwt";
import User from "@/models/User";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  await connectToDatabase();

  const { email, password } = await req.json();
  const user = await User.findOne({ email });
  if (!user) return NextResponse.json({ error: "Invalid credentials" }, { status: 400 });

  const match = await bcrypt.compare(password, user.password);
  if (!match) return NextResponse.json({ error: "Invalid credentials" }, { status: 400 });

  const token = signJwt({ id: user._id, email: user.email, role: user.role });

  const res = NextResponse.json({ message: "Logged in" });
  res.cookies.set("auth_token", token, {
    httpOnly: true,
    maxAge: 60 * 60 * 24 * 7,
    path: "/",
  });

  return res;
}

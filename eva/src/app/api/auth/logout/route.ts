import { clearAuthCookie } from "@/lib/jwt";
import { NextResponse } from "next/server";

export async function POST() {
  const res = NextResponse.json({ message: "Logged out" });
  clearAuthCookie(res); // pass the response object
  return res;
}

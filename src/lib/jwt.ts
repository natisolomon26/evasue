import jwt, { SignOptions, JwtPayload } from "jsonwebtoken";
import { NextResponse } from "next/server";


const JWT_SECRET: string = process.env.JWT_SECRET!; // ⚡ Type assertion to string
if (!JWT_SECRET) throw new Error("❌ Missing JWT_SECRET");

export const signJwt = (payload: object, expiresIn: SignOptions["expiresIn"] = "7d"): string => {
  return jwt.sign(payload, JWT_SECRET, { expiresIn });
};

// ----------------------
// VERIFY JWT
// ----------------------
export const verifyJwt = (token: string): JwtPayload | null => {
  try {
    return jwt.verify(token, JWT_SECRET) as JwtPayload;
  } catch {
    return null;
  }
};


// ----------------------
// SET COOKIE
// ----------------------
export const setAuthCookie = (res: NextResponse, token: string) => {
  res.cookies.set({
    name: "auth_token",
    value: token,
    httpOnly: true,
    path: "/",
    maxAge: 60 * 60 * 24 * 7, // 7 days
  });
};

// ----------------------
// CLEAR COOKIE
// ----------------------
export const clearAuthCookie = (res: NextResponse) => {
  res.cookies.set({
    name: "auth_token",
    value: "",
    httpOnly: true,
    path: "/",
    maxAge: 0,
  });
};

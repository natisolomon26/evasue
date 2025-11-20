// jwt.ts
import jwt, { SignOptions, JwtPayload } from "jsonwebtoken";
import { NextResponse } from "next/server";

// ----------------------
// SIGN JWT
// ----------------------
export const signJwt = (payload: object, expiresIn: string | number = "7d"): string => {
  const JWT_SECRET = process.env.JWT_SECRET;
  if (!JWT_SECRET) throw new Error("❌ Missing JWT_SECRET");

  const options: SignOptions = { expiresIn: expiresIn as SignOptions["expiresIn"] };
  return jwt.sign(payload, JWT_SECRET, options);
};


// ----------------------
// VERIFY JWT
// ----------------------
export const verifyJwt = (token: string): JwtPayload | null => {
  const JWT_SECRET = process.env.JWT_SECRET;
  if (!JWT_SECRET) throw new Error("❌ Missing JWT_SECRET");

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
    maxAge: 60 * 60 * 24 * 7,
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

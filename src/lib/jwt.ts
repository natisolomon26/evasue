// src/lib/jwt.ts
import jwt, { SignOptions, JwtPayload } from "jsonwebtoken";
import { NextResponse } from "next/server";

export interface AuthTokenPayload extends JwtPayload {
  id: string;
  email: string;
  name?: string;
  role?: string;
  isSystemProtected?: boolean;
  permissions?: Record<
    string,
    { create: boolean; read: boolean; update: boolean; delete: boolean }
  >;
}

export const signJwt = (
  payload: AuthTokenPayload,
  expiresIn: string | number = "7d"
): string => {
  const JWT_SECRET = process.env.JWT_SECRET;
  if (!JWT_SECRET) throw new Error("Missing JWT_SECRET");

  const options: SignOptions = {
    expiresIn: expiresIn as SignOptions["expiresIn"],
  };

  return jwt.sign(payload, JWT_SECRET, options);
};

export const verifyJwt = (token: string): AuthTokenPayload | null => {
  const JWT_SECRET = process.env.JWT_SECRET;
  if (!JWT_SECRET) throw new Error("Missing JWT_SECRET");

  try {
    return jwt.verify(token, JWT_SECRET) as AuthTokenPayload;
  } catch {
    return null;
  }
};

export const setAuthCookie = (res: NextResponse, token: string) => {
  res.cookies.set({
    name: "auth_token",
    value: token,
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });
};

export const clearAuthCookie = (res: NextResponse) => {
  res.cookies.set({
    name: "auth_token",
    value: "",
    httpOnly: true,
    path: "/",
    maxAge: 0,
  });
};

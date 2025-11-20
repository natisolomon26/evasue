import { NextRequest, NextResponse } from "next/server";
import { verifyJwt } from "@/lib/jwt";

export const authMiddleware = async (req: NextRequest, allowedRoles: string[] = []) => {
  const token = req.cookies.get("auth_token")?.value;
  if (!token) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const user = verifyJwt(token);
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  if (allowedRoles.length && !allowedRoles.includes(user.role)) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  return user;
};

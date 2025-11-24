// src/middleware/authMiddleware.ts

import { NextRequest, NextResponse } from "next/server";
import { verifyJwt, AuthTokenPayload } from "@/lib/jwt";

type PermissionCategory = "events" | "newsletter" | "emails" | "materials";
type PermissionAction = "create" | "read" | "update" | "delete";

interface PermissionCheckOptions {
  requireAdmin?: boolean; // requires admin OR super-admin
  category?: PermissionCategory;
  action?: PermissionAction;
}

export const authMiddleware = (
  req: NextRequest,
  options: PermissionCheckOptions = {}
): AuthTokenPayload | NextResponse => {
  try {
    const token = req.cookies.get("auth_token")?.value;

    if (!token) {
      return NextResponse.json(
        { error: "Unauthorized: No token provided" },
        { status: 401 }
      );
    }

    const user = verifyJwt(token);
    if (!user) {
      return NextResponse.json(
        { error: "Unauthorized: Invalid or expired token" },
        { status: 401 }
      );
    }

    // SUPER ADMIN always allowed
    if (user.role === "super_admin") return user;

    // ADMIN CHECK
    if (options.requireAdmin && user.role !== "admin") {
      return NextResponse.json(
        { error: "Forbidden: Admin access required" },
        { status: 403 }
      );
    }

    // PERMISSION CHECK (CRUD)
    if (options.category && options.action) {
      const categoryPermissions = user.permissions[options.category];

      if (!categoryPermissions || !categoryPermissions[options.action]) {
        return NextResponse.json(
          {
            error: `Forbidden: Missing '${options.category}' permission '${options.action}'`,
          },
          { status: 403 }
        );
      }
    }

    return user; // authenticated + allowed

  } catch (err) {
    console.error("Auth middleware error:", err);
    return NextResponse.json(
      { error: "Server Error" },
      { status: 500 }
    );
  }
};

// src/middleware/authMiddleware.ts
import { NextRequest, NextResponse } from "next/server";
import { verifyJwt, AuthTokenPayload } from "@/lib/jwt";

/**
 * Middleware to check authentication and authorization.
 * @param req NextRequest
 * @param options Optional object:
 *  - requireAdmin: boolean (default false) → allows only admin/superadmin
 *  - requirePermission: { resource: string; action: 'create' | 'read' | 'update' | 'delete' } (optional)
 */
interface AuthOptions {
  requireAdmin?: boolean;
  requirePermission?: {
    resource: keyof AuthTokenPayload["permissions"];
    action: keyof AuthTokenPayload["permissions"][keyof AuthTokenPayload["permissions"]];
  };
}

export const authMiddleware = (
  req: NextRequest,
  options: AuthOptions = {}
): AuthTokenPayload | NextResponse => {
  try {
    const token = req.cookies.get("auth_token")?.value;
    if (!token) {
      return NextResponse.json({ error: "Unauthorized: No token" }, { status: 401 });
    }

    const user = verifyJwt(token);
    if (!user) {
      return NextResponse.json({ error: "Unauthorized: Invalid token" }, { status: 401 });
    }

    // Superadmin bypass: has all access
    if (user.isSystemProtected) return user;

    // Role-based access
    if (options.requireAdmin && user.role !== "admin" && user.role !== "superadmin") {
      return NextResponse.json({ error: "Forbidden: Admin only" }, { status: 403 });
    }

    // Permission-based access
    if (options.requirePermission) {
      const { resource, action } = options.requirePermission;

      const resourcePerm = user.permissions[resource];
      if (!resourcePerm || !resourcePerm[action]) {
        return NextResponse.json({ error: `Forbidden: No permission to ${action} ${resource}` }, { status: 403 });
      }
    }

    return user;
  } catch (err) {
    console.error("Auth middleware error:", err);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
};

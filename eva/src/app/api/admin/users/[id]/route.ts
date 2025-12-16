// src/app/api/admin/users/[id]/route.ts
import { NextRequest, NextResponse } from "next/server";
import User from "@/models/User";
import { authMiddleware } from "@/lib/authMiddleware";
import { connectToDatabase } from "@/lib/mongoose";

export async function PUT(req: NextRequest, context: { params: { id: string } }) {
  await connectToDatabase();

  // Check authentication & authorization
  const authResult = authMiddleware(req, { requireAdmin: true });
  if (authResult instanceof NextResponse) return authResult; // Unauthorized/Forbidden

  const userId = context.params.id;
  const body = await req.json();

  // Prevent staff from updating role/permissions if they are not superadmin
  if (!authResult.isSystemProtected) {
    delete body.role;
    delete body.permissions;
    delete body.isSystemProtected;
  }

  const user = await User.findByIdAndUpdate(userId, body, { new: true });
  if (!user) return NextResponse.json({ error: "User not found" }, { status: 404 });

  return NextResponse.json({ message: "User updated successfully", user });
}

export async function DELETE(req: NextRequest, context: { params: { id: string } }) {
  await connectToDatabase();

  const authResult = authMiddleware(req, { requireAdmin: true });
  if (authResult instanceof NextResponse) return authResult; // Unauthorized/Forbidden

  const userId = context.params.id;

  // Prevent deletion of superadmin/system-protected users
  const userToDelete = await User.findById(userId);
  if (!userToDelete) return NextResponse.json({ error: "User not found" }, { status: 404 });
  if (userToDelete.isSystemProtected)
    return NextResponse.json({ error: "Cannot delete system-protected user" }, { status: 403 });

  await User.findByIdAndDelete(userId);
  return NextResponse.json({ message: "User deleted successfully" });
}

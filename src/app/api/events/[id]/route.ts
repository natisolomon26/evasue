import { connectToDatabase } from "@/lib/mongoose";
import Event from "@/models/Event";
import { cookies } from "next/headers";
import { verifyJwt } from "@/lib/jwt";

export async function GET(req: Request, context: { params: Promise<{ id: string }> }) {
  const { id } = await context.params; // ← unwrap the promise

  await connectToDatabase();

  const event = await Event.findById(id);
  if (!event) return Response.json({ error: "Event not found" }, { status: 404 });

  return Response.json({ event });
}


export async function PUT(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;

  await connectToDatabase();

  const cookieStore = await cookies();
  const token = cookieStore.get("auth_token")?.value;
  if (!token) return Response.json({ error: "Unauthorized" }, { status: 401 });

  const user = verifyJwt(token);
  if (!user || user.role !== "admin") {
    return Response.json({ error: "Only admin can update events" }, { status: 403 });
  }

  const data = await req.json();

  const updated = await Event.findByIdAndUpdate(id, data, { new: true });
  if (!updated)
    return Response.json({ error: "Event not found" }, { status: 404 });

  return Response.json({ message: "Event updated", event: updated });
}

export async function DELETE(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;

  await connectToDatabase();

  const cookieStore = await cookies();
  const token = cookieStore.get("auth_token")?.value;
  if (!token) return Response.json({ error: "Unauthorized" }, { status: 401 });

  const user = verifyJwt(token);
  if (!user || user.role !== "admin") {
    return Response.json({ error: "Only admin can delete events" }, { status: 403 });
  }

  const deleted = await Event.findByIdAndDelete(id);
  if (!deleted)
    return Response.json({ error: "Event not found" }, { status: 404 });

  return Response.json({ message: "Event deleted" });
}
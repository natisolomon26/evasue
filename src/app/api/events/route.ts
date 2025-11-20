import { connectToDatabase } from "@/lib/mongoose";
import Event from "@/models/Event";
import { cookies } from "next/headers";
import { verifyJwt } from "@/lib/jwt";

export async function GET() {
  await connectToDatabase();
  const events = await Event.find().sort({ createdAt: -1 });
  return Response.json({ events });
}

export async function POST(req: Request) {
  await connectToDatabase();

  const cookieStore = await cookies();
  const token = cookieStore.get("auth_token")?.value;
  if (!token) return Response.json({ error: "Unauthorized" }, { status: 401 });

  const user = verifyJwt(token);
  if (!user || user.role !== "admin") {
    return Response.json({ error: "Only admin can create events" }, { status: 403 });
  }

  const { title, description, eventDate } = await req.json();

  const event = await Event.create({
    title,
    description,
    eventDate,
    createdBy: user.id,
  });

  return Response.json({ message: "Event created", event }, { status: 201 });
}

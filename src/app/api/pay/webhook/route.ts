import Registration from "@/models/Registration";
import { connectDB } from "@/lib/db";

export async function POST(req: Request) {
  await connectDB();

  const { registrationId } = await req.json();

  await Registration.findOneAndUpdate(
    { registrationId },
    { paymentStatus: "PAID" }
  );

  return Response.json({ ok: true });
}

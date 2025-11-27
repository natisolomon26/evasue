// app/api/events/[id]/receipt/route.ts
import { NextResponse } from "next/server";
import Event from "@/models/Event";
import { connectToDatabase } from "@/lib/mongoose";
import { authMiddleware } from "@/lib/authMiddleware";
import { generateReceiptPDF } from "@/lib/pdfGenerator";

export async function GET(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  await connectToDatabase();

  const user = authMiddleware(req);
  if (user instanceof NextResponse) return user;

  const { id } = await context.params;

  try {
    const event = await Event.findById(id);
    if (!event) {
      return NextResponse.json({ error: "Event not found" }, { status: 404 });
    }

    // Find user's registration
    const registration = event.registrations.find(
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (reg: any) => reg.userId === user.id
    );

    if (!registration) {
      return NextResponse.json({ error: "Registration not found" }, { status: 404 });
    }

    // Generate PDF receipt
    const pdfBuffer = await generateReceiptPDF({
      event,
      registration,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      user: user as any
    });

    // Return PDF as download
    return new Response(pdfBuffer, {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="receipt-${event.title}-${registration._id}.pdf"`,
      },
    });
  } catch (error) {
    console.error("Receipt generation error:", error);
    return NextResponse.json(
      { error: "Failed to generate receipt" },
      { status: 500 }
    );
  }
}
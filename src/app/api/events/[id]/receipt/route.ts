// app/api/events/[id]/receipt/route.ts - FIXED TYPES
import { NextRequest, NextResponse } from "next/server";
import Event from "@/models/Event";
import { connectToDatabase } from "@/lib/mongoose";
import { authMiddleware } from "@/lib/authMiddleware";
import { generateReceiptPDF } from "@/lib/pdfGenerator";

export async function GET(
  req: NextRequest, // Changed from Request to NextRequest
  context: { params: Promise<{ id: string }> }
) {
  await connectToDatabase();

  const user = await authMiddleware(req);
  if (user instanceof NextResponse) return user;

  const { id } = await context.params;
  const url = new URL(req.url);
  
  const showUserEmail = url.searchParams.get('showEmail') === 'true';

  try {
    const event = await Event.findById(id);
    if (!event) {
      return NextResponse.json({ error: "Event not found" }, { status: 404 });
    }

    // Find user's registration
    const registration = event.registrations.find(
      (reg) => reg.userId && reg.userId.toString() === user.id
    );

    if (!registration) {
      return NextResponse.json({ error: "Registration not found" }, { status: 404 });
    }

    console.log("📄 Receipt Data Debug:", {
      eventFormFields: event.formFields.map(f => f.label),
      registrationAnswers: Object.fromEntries(registration.answers),
      showUserEmail
    });

    // Convert MongoDB data to proper types for PDF generator
    const pdfBuffer = await generateReceiptPDF({
      event: {
        _id: event._id.toString(), // Convert ObjectId to string
        title: event.title,
        description: event.description,
        date: event.date.toISOString(), // Convert Date to string
        location: event.location,
        isPaid: event.isPaid,
        price: event.price,
        formFields: event.formFields
      },
      registration: {
        _id: registration._id.toString(), // Convert ObjectId to string
        answers: registration.answers,
        registeredAt: registration.registeredAt.toISOString(), // Convert Date to string
        isGuest: registration.isGuest || false, // Ensure boolean
        userId: registration.userId || '' // Ensure string
      },
      user: {
        id: user.id,
        name: user.name || '', // Ensure string
        email: user.email
      }
    }, {
      showUserEmail,
      showEventDescription: true,
      showCustomHeader: true
    });

    // Return PDF as download - Fixed Response type
    return new NextResponse(pdfBuffer, {
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
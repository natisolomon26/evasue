// /app/api/campaign/send/route.ts
import { NextResponse } from "next/server";
import Subscriber from "@/models/Subsciber";
import Campaign from "@/models/Campaign";
import { connectDB } from "@/lib/db";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    await connectDB();

    const { subject, htmlBody, category } = await req.json();

    if (!subject || !htmlBody || !category) {
      return NextResponse.json(
        { error: "subject, htmlBody and category are required" },
        { status: 400 }
      );
    }

    // Get all active subscribers in this category
    const subscribers = await Subscriber.find({
      status: "active",
      categories: category,
    });

    const emails = subscribers.map((s) => s.email);

    if (!emails.length) {
      return NextResponse.json({ message: "No subscribers found" });
    }

    // Send email to all
    for (const email of emails) {
      await resend.emails.send({
        from: "Org <support.team@evasue.net >",
        to: email,
        subject,
        html: htmlBody,
      });
    }

    // Save campaign history
    await Campaign.create({
      subject,
      htmlBody,
      category,
      sentTo: emails,
      sentAt: new Date(),
    });

    return NextResponse.json({
      message: "Campaign sent successfully",
      count: emails.length,
      sentTo: emails,
    });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

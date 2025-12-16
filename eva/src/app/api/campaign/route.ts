import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Campaign from "@/models/Campaign";

export async function GET() {
  try {
    await connectDB();

    const campaigns = await Campaign.find().sort({ createdAt: -1 });

    return NextResponse.json({ campaigns });
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.error("Error fetching campaigns:", error);
    return NextResponse.json(
      { message: "Failed to load campaigns" },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    await connectDB();

    const body = await req.json();

    const campaign = await Campaign.create(body);

    return NextResponse.json({ campaign });
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to create campaign" },
      { status: 500 }
    );
  }
}

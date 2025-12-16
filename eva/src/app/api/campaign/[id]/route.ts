import { NextResponse, NextRequest } from "next/server";
import { connectDB } from "@/lib/db";
import Campaign from "@/models/Campaign";

// GET /api/campaign/:id
export async function GET(req: NextRequest) {
  try {
    await connectDB();

    // Extract id from the URL
    const url = new URL(req.url);
    const id = url.pathname.split("/").pop(); // get the last part

    if (!id) {
      return NextResponse.json({ message: "Campaign ID is required" }, { status: 400 });
    }

    const campaign = await Campaign.findById(id);
    if (!campaign) {
      return NextResponse.json({ message: "Campaign not found" }, { status: 404 });
    }

    return NextResponse.json({ campaign });
  } catch (error) {
    console.error("Error fetching campaign by ID:", error);
    return NextResponse.json({ message: "Failed to fetch campaign" }, { status: 500 });
  }
}

// DELETE /api/campaign/:id
export async function DELETE(req: NextRequest) {
  try {
    await connectDB();

    const url = new URL(req.url);
    const id = url.pathname.split("/").pop();

    if (!id) {
      return NextResponse.json({ message: "Campaign ID is required" }, { status: 400 });
    }

    const campaign = await Campaign.findByIdAndDelete(id);
    if (!campaign) {
      return NextResponse.json({ message: "Campaign not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Campaign deleted successfully" });
  } catch (error) {
    console.error("Error deleting campaign:", error);
    return NextResponse.json({ message: "Failed to delete campaign" }, { status: 500 });
  }
}

// PUT /api/campaign/:id
export async function PUT(req: NextRequest) {
  try {
    await connectDB();

    const url = new URL(req.url);
    const id = url.pathname.split("/").pop();

    if (!id) {
      return NextResponse.json({ message: "Campaign ID is required" }, { status: 400 });
    }

    const body = await req.json();
    const campaign = await Campaign.findByIdAndUpdate(id, body, { new: true });

    if (!campaign) {
      return NextResponse.json({ message: "Campaign not found" }, { status: 404 });
    }

    return NextResponse.json({ campaign });
  } catch (error) {
    console.error("Error updating campaign:", error);
    return NextResponse.json({ message: "Failed to update campaign" }, { status: 500 });
  }
}

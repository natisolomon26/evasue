import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import TrainingVideo from "@/models/TrainingVideo";

// Helper function to extract YouTube ID
function extractYouTubeId(url: string): string | null {
  const regExp =
    /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]{11}).*/;
  const match = url.match(regExp);
  return match ? match[2] : null;
}

export async function POST(req: Request) {
  try {
    await connectDB();

    const body = await req.json();
    console.log("Received POST body:", body);

    const { title, description, youtubeUrl, category, isPublished } = body;

    if (!title || !description || !youtubeUrl || !category) {
      return NextResponse.json({ message: "Missing fields" }, { status: 400 });
    }

    const youtubeId = extractYouTubeId(youtubeUrl);
    if (!youtubeId) {
      return NextResponse.json({ message: "Invalid YouTube URL" }, { status: 400 });
    }

    const newVideo = await TrainingVideo.create({
      title,
      description,
      youtubeUrl,
      youtubeId,
      category,
      isPublished: isPublished ?? false,
    });

    return NextResponse.json({ success: true, data: newVideo }, { status: 201 });
  } catch (error) {
    console.error("POST ERROR:", error);
    return NextResponse.json(
      { success: false, message: "Failed to create video" },
      { status: 500 }
    );
  }
}


export async function GET() {
  await connectDB();

  const videos = await TrainingVideo.find().sort({ createdAt: -1 });

  return NextResponse.json({
    success: true,
    data: videos,
  });
}

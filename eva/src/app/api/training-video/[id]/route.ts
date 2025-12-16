import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import TrainingVideo from "@/models/TrainingVideo";
import { extractYouTubeId } from "@/lib/youtube";

/* =========================
   UPDATE VIDEO
========================= */
export async function PUT(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  await connectDB();

  const { id } = await context.params;
  const body = await req.json();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const updateData: any = {
    title: body.title,
    description: body.description,
    category: body.category,
    isPublished: body.isPublished,
  };

  if (body.youtubeUrl) {
    const youtubeId = extractYouTubeId(body.youtubeUrl);
    if (!youtubeId) {
      return NextResponse.json(
        { success: false, message: "Invalid YouTube URL" },
        { status: 400 }
      );
    }
    updateData.youtubeId = youtubeId;
  }

  const video = await TrainingVideo.findByIdAndUpdate(id, updateData, {
    new: true,
  });

  if (!video) {
    return NextResponse.json(
      { success: false, message: "Video not found" },
      { status: 404 }
    );
  }

  return NextResponse.json({ success: true, data: video });
}

/* =========================
   DELETE VIDEO
========================= */
export async function DELETE(
  _: Request,
  context: { params: Promise<{ id: string }> }
) {
  await connectDB();

  const { id } = await context.params;

  const deleted = await TrainingVideo.findByIdAndDelete(id);

  if (!deleted) {
    return NextResponse.json(
      { success: false, message: "Video not found" },
      { status: 404 }
    );
  }

  return NextResponse.json({ success: true });
}

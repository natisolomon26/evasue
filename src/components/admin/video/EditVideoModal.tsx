"use client";

import { useState, useEffect } from "react";

interface Video {
  _id: string;
  title: string;
  description: string;
  youtubeId: string;
  category: string;
  isPublished: boolean;
}

interface EditVideoModalProps {
  open: boolean;
  video: Video | null;
  onClose: () => void;
  onSave: () => void;
}

export default function EditVideoModal({ open, video, onClose, onSave }: EditVideoModalProps) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [youtubeUrl, setYoutubeUrl] = useState("");
  const [category, setCategory] = useState("");
  const [isPublished, setIsPublished] = useState(true);

  useEffect(() => {
    if (video) {
      setTitle(video.title);
      setDescription(video.description);
      setCategory(video.category);
      setYoutubeUrl(`https://www.youtube.com/watch?v=${video.youtubeId}`);
      setIsPublished(video.isPublished);
    }
  }, [video]);

  const handleUpdate = async () => {
    if (!video) return;
    const youtubeId = extractYouTubeId(youtubeUrl);
    if (!youtubeId) return alert("Invalid YouTube URL");

    await fetch(`/api/training-video/${video._id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, description, category, youtubeId, isPublished }),
    });

    onSave();
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-xl w-full max-w-md space-y-4">
        <h2 className="text-xl font-bold">Edit Training Video</h2>

        <input type="text" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} className="w-full border p-2 rounded"/>
        <input type="text" placeholder="Category" value={category} onChange={(e) => setCategory(e.target.value)} className="w-full border p-2 rounded"/>
        <textarea placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} className="w-full border p-2 rounded"/>
        <input type="text" placeholder="YouTube URL" value={youtubeUrl} onChange={(e) => setYoutubeUrl(e.target.value)} className="w-full border p-2 rounded"/>
        <label className="flex items-center gap-2">
          <input type="checkbox" checked={isPublished} onChange={(e) => setIsPublished(e.target.checked)} />
          Published
        </label>

        <div className="flex justify-end gap-2">
          <button onClick={onClose} className="px-4 py-2 bg-gray-300 rounded">Cancel</button>
          <button onClick={handleUpdate} className="px-4 py-2 bg-blue-600 text-white rounded">Update</button>
        </div>
      </div>
    </div>
  );
}

function extractYouTubeId(url: string): string | null {
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]{11}).*/;
  const match = url.match(regExp);
  return match ? match[2] : null;
}

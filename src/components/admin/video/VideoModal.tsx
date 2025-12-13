"use client";

import { useState, useEffect } from "react";
import toast from "react-hot-toast";

interface Video {
  _id?: string;
  title: string;
  description: string;
  youtubeUrl: string;
  category: string;
  isPublished: boolean;
}

interface VideoModalProps {
  open: boolean;
  video?: Video;
  onClose: () => void;
  onSave: () => void;
}

export default function VideoModal({ open, video, onClose, onSave }: VideoModalProps) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [youtubeUrl, setYoutubeUrl] = useState("");
  const [category, setCategory] = useState("");
  const [isPublished, setIsPublished] = useState(true);

  useEffect(() => {
    if (video) {
      setTitle(video.title);
      setDescription(video.description);
      setYoutubeUrl(video.youtubeUrl);
      setCategory(video.category);
      setIsPublished(video.isPublished);
    } else {
      setTitle("");
      setDescription("");
      setYoutubeUrl("");
      setCategory("");
      setIsPublished(true);
    }
  }, [video]);

  const handleSubmit = async () => {
    const method = video?._id ? "PUT" : "POST";
    const url = video?._id
      ? `/api/training-video/${video._id}`
      : "/api/training-video";

    try {
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, description, youtubeUrl, category, isPublished }),
      });

      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.message || "Failed to save video");
      }

      onSave();
      onClose();

      toast.success(video?._id ? "Video updated successfully!" : "Video added successfully!");
    } catch (err: any) {
      toast.error(err.message || "Something went wrong!");
      console.error(err);
    }
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-xl w-full max-w-lg space-y-4">
        <h2 className="text-xl font-bold">{video?._id ? "Edit Video" : "Add Video"}</h2>

        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full border p-2 rounded"
        />
        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full border p-2 rounded"
        />
        <input
          type="text"
          placeholder="YouTube URL"
          value={youtubeUrl}
          onChange={(e) => setYoutubeUrl(e.target.value)}
          className="w-full border p-2 rounded"
        />
        <input
          type="text"
          placeholder="Category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full border p-2 rounded"
        />
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={isPublished}
            onChange={(e) => setIsPublished(e.target.checked)}
          />
          Published
        </label>

        <div className="flex justify-end gap-2">
          <button onClick={onClose} className="px-4 py-2 bg-gray-300 rounded">
            Cancel
          </button>
          <button onClick={handleSubmit} className="px-4 py-2 bg-blue-600 text-white rounded">
            {video?._id ? "Update" : "Add"}
          </button>
        </div>
      </div>
    </div>
  );
}

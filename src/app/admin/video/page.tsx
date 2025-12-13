"use client";

import { useState, useEffect } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import VideoModal from "@/components/admin/video/VideoModal";
import EditVideoModal from "@/components/admin/video/EditVideoModal";
import DeleteVideoModal from "@/components/admin/video/DeleteVideoModal";

interface Video {
  _id: string;
  title: string;
  description: string;
  youtubeId: string;
  category: string;
  isPublished: boolean;
}

export default function AdminVideoPage() {
  const [videos, setVideos] = useState<Video[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [editVideo, setEditVideo] = useState<Video | null>(null);
  const [deleteVideo, setDeleteVideo] = useState<Video | null>(null);

  const fetchVideos = async () => {
    try {
      const res = await fetch("/api/training-video");
      const data = await res.json();
      if (data.success) setVideos(data.data);
    } catch (error) {
      console.error("Failed to fetch videos:", error);
    }
  };

  useEffect(() => {
    fetchVideos();
  }, []);

  return (
    <div className="p-6 md:p-12 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Training Videos</h1>
        <button
          onClick={() => setModalOpen(true)}
          className="px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
        >
          + Add Video
        </button>
      </div>

      {/* Video Table */}
      <div className="overflow-x-auto bg-white rounded-xl shadow-md p-4 mt-6">
        <table className="min-w-full text-left text-gray-800">
          <thead className="border-b">
            <tr>
              <th className="px-4 py-2">Title</th>
              <th className="px-4 py-2">Category</th>
              <th className="px-4 py-2">Published</th>
              <th className="px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {videos.map((video) => (
              <tr key={video._id} className="border-b hover:bg-gray-100">
                <td className="px-4 py-2">{video.title}</td>
                <td className="px-4 py-2">{video.category}</td>
                <td className="px-4 py-2">{video.isPublished ? "Yes" : "No"}</td>
                <td className="px-4 py-2 flex gap-3">
                  <button
                    onClick={() => setEditVideo(video)}
                    className="text-blue-600 hover:text-blue-800"
                    title="Edit"
                  >
                    <FaEdit />
                  </button>
                  <button
                    onClick={() => setDeleteVideo(video)}
                    className="text-red-600 hover:text-red-800"
                    title="Delete"
                  >
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modals */}
      <VideoModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onSave={() => {
          setModalOpen(false);
          fetchVideos();
        }}
      />

      <EditVideoModal
        open={!!editVideo}
        video={editVideo}
        onClose={() => setEditVideo(null)}
        onSave={() => {
          setEditVideo(null);
          fetchVideos();
        }}
      />

      <DeleteVideoModal
        open={!!deleteVideo}
        videoTitle={deleteVideo?.title}
        onClose={() => setDeleteVideo(null)}
        onDelete={async () => {
          if (!deleteVideo) return;
          await fetch(`/api/training-video/${deleteVideo._id}`, { method: "DELETE" });
          setDeleteVideo(null);
          fetchVideos();
        }}
      />
    </div>
  );
}

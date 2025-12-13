"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import VideoTable from "@/components/admin/video/VideoTable";
import VideoModal from "@/components/admin/video/VideoModal";
import EditVideoModal from "@/components/admin/video/EditVideoModal";
import DeleteVideoModal from "@/components/admin/video/DeleteVideoModal";
import VideoStats from "@/components/admin/video/VideoStats";
import { 
  Youtube, 
  Upload, 
  Filter, 
  Search, 
  Sparkles
} from "lucide-react";

interface Video {
  _id: string;
  title: string;
  description: string;
  youtubeId: string;
  category: string;
  isPublished: boolean;
  views?: number;
  likes?: number;
  duration?: string;
  uploadDate?: string;
}

export default function AdminVideoPage() {
  const [videos, setVideos] = useState<Video[]>([]);
  const [filteredVideos, setFilteredVideos] = useState<Video[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [editVideo, setEditVideo] = useState<Video | null>(null);
  const [deleteVideo, setDeleteVideo] = useState<Video | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [stats, setStats] = useState({
    totalVideos: 0,
    publishedVideos: 0,
    totalViews: 0,
    totalLikes: 0,
  });

  const fetchVideos = async () => {
    try {
      setIsLoading(true);
      const res = await fetch("/api/training-video");
      const data = await res.json();
      if (data.success) {
        setVideos(data.data);
        setFilteredVideos(data.data);
        
        // Calculate stats
        const published = data.data.filter((v: Video) => v.isPublished).length;
        const totalViews = data.data.reduce((acc: number, v: Video) => acc + (v.views || 0), 0);
        const totalLikes = data.data.reduce((acc: number, v: Video) => acc + (v.likes || 0), 0);
        
        setStats({
          totalVideos: data.data.length,
          publishedVideos: published,
          totalViews,
          totalLikes,
        });
      }
    } catch (error) {
      console.error("Failed to fetch videos:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchVideos();
  }, []);

  // Filter videos based on search
  useEffect(() => {
    if (!searchQuery.trim()) {
      setFilteredVideos(videos);
      return;
    }
    
    const query = searchQuery.toLowerCase();
    const filtered = videos.filter(video =>
      video.title.toLowerCase().includes(query) ||
      video.description.toLowerCase().includes(query) ||
      video.category.toLowerCase().includes(query)
    );
    
    setFilteredVideos(filtered);
  }, [searchQuery, videos]);

  const handleRefresh = () => {
    fetchVideos();
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Header */}
      <div className="bg-gradient-to-r from-sky-800 via-sky-900 to-sky-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
            <div>
              <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full mb-4">
                <Sparkles className="w-4 h-4 text-white" />
                <span className="text-white text-sm font-medium">Video Management</span>
              </div>
              
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                Training Videos Dashboard
              </h1>
              <p className="text-white/90 text-lg max-w-2xl">
                Manage your training video library, track performance, and engage your audience.
              </p>
            </div>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setModalOpen(true)}
              className="group relative overflow-hidden bg-gradient-to-r from-red-600 to-red-700 text-white font-bold px-8 py-4 rounded-2xl shadow-2xl hover:shadow-3xl transition-all duration-300"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/0 via-purple-500/0 to-pink-500/0 group-hover:from-red-600/20 group-hover:via-red-500/20 group-hover:to-red-500/60 transition-all duration-500" />
              <div className="relative flex items-center gap-3">
                <Upload className="w-5 h-5" />
                <span>Upload New Video</span>
              </div>
            </motion.button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <VideoStats stats={stats} />

        {/* Search and Controls */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 mb-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            {/* Search Bar */}
            <div className="flex-1 max-w-xl">
              <div className="relative group">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-400 to-purple-400 rounded-xl blur opacity-0 group-focus-within:opacity-30 transition duration-300" />
                <div className="relative flex items-center">
                  <Search className="absolute left-4 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search videos by title, description, or category..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white/50 transition-colors"
                  />
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-4">
              <button
                onClick={handleRefresh}
                className="flex items-center gap-2 px-4 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl transition-colors font-medium"
              >
                <span>Refresh</span>
              </button>
              
              <div className="relative group">
                <button className="flex items-center gap-2 px-4 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-xl hover:shadow-lg transition-all">
                  <Filter className="w-5 h-5" />
                  <span>Filter</span>
                </button>
              </div>
            </div>
          </div>
          
          {/* Results Info */}
          <div className="flex items-center justify-between mt-6 pt-6 border-t border-gray-200">
            <div>
              <span className="text-gray-700 font-medium">
                {filteredVideos.length} videos
              </span>
              <span className="text-gray-500 ml-2">
                {searchQuery ? `matching "${searchQuery}"` : "in total"}
              </span>
            </div>
            <div className="text-sm text-gray-500">
              {stats.publishedVideos} published • {stats.totalVideos - stats.publishedVideos} drafts
            </div>
          </div>
        </div>

        {/* Video Table */}
        <VideoTable
          videos={filteredVideos}
          isLoading={isLoading}
          onEdit={setEditVideo}
          onDelete={setDeleteVideo}
          onRefresh={fetchVideos}
        />

        {/* Empty State */}
        {filteredVideos.length === 0 && !isLoading && (
          <div className="text-center py-16">
            <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
              <Youtube className="w-12 h-12 text-gray-400" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-3">No videos found</h3>
            <p className="text-gray-600 mb-8 max-w-md mx-auto">
              {searchQuery 
                ? `No videos match "${searchQuery}". Try a different search term.`
                : "You haven't added any training videos yet."}
            </p>
            <button
              onClick={() => setModalOpen(true)}
              className="px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-xl hover:shadow-lg transition-all font-medium"
            >
              Add Your First Video
            </button>
          </div>
        )}


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
        video={deleteVideo}
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
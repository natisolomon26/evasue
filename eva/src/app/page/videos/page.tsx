"use client";

import { useEffect, useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Play, 
  Youtube, 
  Filter, 
  Search, 
  Clock, 
  Calendar, 
  Tag, 
  Eye,
  ThumbsUp,
  ChevronRight,
  Grid,
  List,
  Sparkles,
  TrendingUp,
  BookOpen,
  Share2
} from "lucide-react";

interface Video {
  _id: string;
  title: string;
  description: string;
  youtubeId: string;
  category: string;
  isPublished: boolean;
  duration?: string;
  uploadDate?: string;
  views?: number;
  likes?: number;
}

export default function TrainingVideoPage() {
  const [videos, setVideos] = useState<Video[]>([]);
  const [filteredVideos, setFilteredVideos] = useState<Video[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [isLoading, setIsLoading] = useState(true);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [hoveredVideo, setHoveredVideo] = useState<string | null>(null);
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);

  const fetchVideos = async () => {
    try {
      setIsLoading(true);
      const res = await fetch("/api/training-video");
      const data = await res.json();
      if (data.success) {
        setVideos(data.data);
        setFilteredVideos(data.data.filter((v: Video) => v.isPublished));
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

  const categories = useMemo(() => {
    const cats = Array.from(new Set(videos.map(v => v.category).filter(Boolean)));
    return ["all", ...cats];
  }, [videos]);

  useEffect(() => {
    let result = videos.filter(video => video.isPublished);
    
    if (selectedCategory !== "all") {
      result = result.filter(video => video.category === selectedCategory);
    }
    
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      result = result.filter(video =>
        video.title.toLowerCase().includes(query) ||
        video.description.toLowerCase().includes(query) ||
        video.category.toLowerCase().includes(query)
      );
    }
    
    setFilteredVideos(result);
  }, [videos, selectedCategory, searchQuery]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const cardVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100
      }
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            <p className="mt-4 text-gray-600">Loading training videos...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-r from-sky-800 via-sky-900 to-sky-800 py-16">
        <div className="absolute inset-0 bg-black/20" />
        <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-black/30 to-transparent" />
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full mb-6"
            >
              <Sparkles className="w-4 h-4 text-white" />
              <span className="text-white text-sm font-medium">Videos</span>
            </motion.div>
            
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Watch Our Videos
            </h1>
            <p className="text-xl text-white/90 max-w-3xl mx-auto mb-10">
              Access premium training videos, tutorials, and resources to accelerate your professional growth.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Controls */}
        <div className="mb-12">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
            {/* Search */}
            <div className="relative flex-1 max-w-xl">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search videos by title, description, or category..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-white border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 shadow-sm"
              />
            </div>
            
            {/* View Toggle */}
            <div className="flex items-center gap-4">
              <div className="flex bg-gray-100 rounded-lg p-1">
                <button
                  onClick={() => setViewMode("grid")}
                  className={`p-2 rounded-md transition-colors ${
                    viewMode === "grid" 
                      ? "bg-white shadow" 
                      : "hover:bg-gray-200"
                  }`}
                >
                  <Grid className="w-5 h-5 text-gray-700" />
                </button>
                <button
                  onClick={() => setViewMode("list")}
                  className={`p-2 rounded-md transition-colors ${
                    viewMode === "list" 
                      ? "bg-white shadow" 
                      : "hover:bg-gray-200"
                  }`}
                >
                  <List className="w-5 h-5 text-gray-700" />
                </button>
              </div>
            </div>
          </div>
          
          {/* Categories */}
          <div className="flex flex-wrap gap-3">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-5 py-2.5 rounded-full font-medium transition-all ${
                  selectedCategory === category
                    ? "bg-gradient-to-r from-sky-800 to-sky-900 text-white shadow-lg"
                    : "bg-white text-gray-700 hover:bg-gray-100 border border-gray-300"
                }`}
              >
                {category === "all" ? "All Categories" : category}
              </button>
            ))}
          </div>
        </div>

        {/* Videos Grid/List */}
        {filteredVideos.length === 0 ? (
          <div className="text-center py-20">
            <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
              <Search className="w-12 h-12 text-gray-400" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-3">No videos found</h3>
            <p className="text-gray-600 mb-6">
              {searchQuery 
                ? `No videos match "${searchQuery}"`
                : "No videos in selected category"}
            </p>
            {(searchQuery || selectedCategory !== "all") && (
              <button
                onClick={() => {
                  setSearchQuery("");
                  setSelectedCategory("all");
                }}
                className="px-6 py-3 bg-gradient-to-r from-sky-800 to-sky-900 text-white rounded-xl hover:shadow-lg transition-all"
              >
                Reset Filters
              </button>
            )}
          </div>
        ) : (
          <>
            {/* Grid View */}
            {viewMode === "grid" && (
              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
              >
                {filteredVideos.map((video) => (
                  <motion.div
                    key={video._id}
                    variants={cardVariants}
                    onMouseEnter={() => setHoveredVideo(video._id)}
                    onMouseLeave={() => setHoveredVideo(null)}
                    className="group relative"
                  >
                    {/* Glow Effect */}
                    <div className={`absolute -inset-0.5 bg-gradient-to-r from-sky-600 to-red-600 rounded-2xl blur opacity-0 group-hover:opacity-30 transition duration-500 ${
                      hoveredVideo === video._id ? "opacity-30" : ""
                    }`} />
                    
                    <div className="relative bg-white rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 border border-gray-100">
                      {/* Thumbnail Container */}
                      <div className="relative aspect-video overflow-hidden bg-gradient-to-br from-gray-900 to-gray-800">
                        <iframe
                          src={`https://www.youtube.com/embed/${video.youtubeId}?autoplay=0&modestbranding=1&rel=0`}
                          title={video.title}
                          allowFullScreen
                          className="w-full h-full"
                        />
                        
                        {/* Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        
                        {/* Play Button */}
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className={`transform transition-all duration-300 ${
                            hoveredVideo === video._id ? "scale-110" : "scale-100"
                          }`}>
                            <div className="w-16 h-16 bg-gradient-to-r from-red-500 to-red-600 rounded-full flex items-center justify-center shadow-2xl">
                              <Play className="w-8 h-8 text-white ml-1" />
                            </div>
                          </div>
                        </div>
                        
                        {/* Duration Badge */}
                        {video.duration && (
                          <div className="absolute bottom-4 right-4 bg-black/80 text-white px-3 py-1 rounded-full text-sm font-medium">
                            {video.duration}
                          </div>
                        )}
                      </div>
                      
                      {/* Content */}
                      <div className="p-6">
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              {video.category && (
                                <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-medium">
                                  {video.category}
                                </span>
                              )}
                            </div>
                            
                            <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors line-clamp-2">
                              {video.title}
                            </h3>
                            
                            <p className="text-gray-600 mb-4 line-clamp-2">
                              {video.description}
                            </p>
                          </div>
                        </div>
                        
                        {/* Stats */}
                        <div className="flex items-center justify-between text-sm text-gray-500 pt-4 border-t border-gray-100">
                          <div className="flex items-center gap-4">
                            {video.views && (
                              <div className="flex items-center gap-1">
                                <Eye className="w-4 h-4" />
                                <span>{video.views.toLocaleString()}</span>
                              </div>
                            )}
                            
                            {video.likes && (
                              <div className="flex items-center gap-1">
                                <ThumbsUp className="w-4 h-4" />
                                <span>{video.likes.toLocaleString()}</span>
                              </div>
                            )}
                            
                            {video.uploadDate && (
                              <div className="flex items-center gap-1">
                                <Calendar className="w-4 h-4" />
                                <span>{video.uploadDate}</span>
                              </div>
                            )}
                          </div>
                          
                          <a
                            href={`https://youtube.com/watch?v=${video.youtubeId}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-1 text-sky-600 hover:text-sky-800 font-medium group/link"
                          >
                            <span>Watch</span>
                            <ChevronRight className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
                          </a>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            )}
            
            {/* List View */}
            {viewMode === "list" && (
              <div className="space-y-6">
                {filteredVideos.map((video) => (
                  <div
                    key={video._id}
                    className="group bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all overflow-hidden border border-gray-100"
                  >
                    <div className="flex flex-col md:flex-row">
                      {/* Thumbnail */}
                      <div className="md:w-64 flex-shrink-0 relative">
                        <div className="aspect-video md:aspect-auto md:h-full bg-gradient-to-br from-gray-900 to-gray-800 relative overflow-hidden">
                          <iframe
                            src={`https://www.youtube.com/embed/${video.youtubeId}?autoplay=0&modestbranding=1&rel=0`}
                            title={video.title}
                            allowFullScreen
                            className="w-full h-full"
                          />
                          <div className="absolute inset-0 bg-gradient-to-r from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                        </div>
                      </div>
                      
                      {/* Content */}
                      <div className="flex-1 p-6">
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-3">
                              {video.category && (
                                <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-medium">
                                  {video.category}
                                </span>
                              )}
                              {video.duration && (
                                <span className="flex items-center gap-1 text-gray-500">
                                  <Clock className="w-4 h-4" />
                                  {video.duration}
                                </span>
                              )}
                            </div>
                            
                            <h3 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
                              {video.title}
                            </h3>
                            
                            <p className="text-gray-600 mb-6">
                              {video.description}
                            </p>
                            
                            {/* Stats */}
                            <div className="flex items-center gap-6 text-sm text-gray-500">
                              {video.views && (
                                <div className="flex items-center gap-2">
                                  <Eye className="w-4 h-4" />
                                  <span>{video.views.toLocaleString()} views</span>
                                </div>
                              )}
                              
                              {video.likes && (
                                <div className="flex items-center gap-2">
                                  <ThumbsUp className="w-4 h-4" />
                                  <span>{video.likes.toLocaleString()} likes</span>
                                </div>
                              )}
                              
                              {video.uploadDate && (
                                <div className="flex items-center gap-2">
                                  <Calendar className="w-4 h-4" />
                                  <span>Uploaded {video.uploadDate}</span>
                                </div>
                              )}
                            </div>
                          </div>
                          
                          <div className="flex flex-col gap-3 ml-6">
                            <a
                              href={`https://youtube.com/watch?v=${video.youtubeId}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-sky-800 to-sky-900 text-white rounded-xl hover:shadow-lg transition-all group/watch"
                            >
                              <Play className="w-4 h-4" />
                              <span className="font-semibold">Watch Now</span>
                            </a>
                            
                            <a
                              href={`https://youtube.com/watch?v=${video.youtubeId}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center justify-center gap-2 px-6 py-3 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-colors"
                            >
                              <Youtube className="w-4 h-4" />
                              <span>YouTube</span>
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        )}

        {/* Featured Playlist */}
        
      </div>
    </div>
  );
}
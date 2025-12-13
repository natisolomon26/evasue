"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  X, 
  Youtube, 
  Upload, 
  Save, 
  Eye, 
  EyeOff,
  Tag,
  FileText,
  Globe,
  CheckCircle,
  AlertCircle,
  Sparkles,
  Link,
  Clock,
  Hash
} from "lucide-react";
import toast from "react-hot-toast";

interface Video {
  _id?: string;
  title: string;
  description: string;
  youtubeUrl: string;
  category: string;
  isPublished: boolean;
  duration?: string;
  views?: number;
  thumbnail?: string;
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
  const [duration, setDuration] = useState("");
  const [thumbnail, setThumbnail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [activeTab, setActiveTab] = useState<"basic" | "advanced">("basic");
  
  // Common categories for suggestions
  const categorySuggestions = [
    "Tutorial", "Training", "Webinar", "Workshop", "Guide", 
    "Interview", "Presentation", "Demo", "Q&A", "Case Study"
  ];

  useEffect(() => {
    if (video) {
      setTitle(video.title);
      setDescription(video.description);
      setYoutubeUrl(video.youtubeUrl);
      setCategory(video.category);
      setIsPublished(video.isPublished);
      setDuration(video.duration || "");
      setThumbnail(video.thumbnail || "");
    } else {
      setTitle("");
      setDescription("");
      setYoutubeUrl("");
      setCategory("");
      setIsPublished(true);
      setDuration("");
      setThumbnail("");
      setActiveTab("basic");
    }
  }, [video]);

  // Extract YouTube ID from URL
  const extractYoutubeId = (url: string) => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return match && match[2].length === 11 ? match[2] : null;
  };

  // Generate YouTube thumbnail URL
  const getYoutubeThumbnail = (url: string) => {
    const videoId = extractYoutubeId(url);
    return videoId ? `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg` : "";
  };

  // Handle YouTube URL change
  const handleYoutubeUrlChange = (url: string) => {
    setYoutubeUrl(url);
    const videoId = extractYoutubeId(url);
    if (videoId && !thumbnail) {
      setThumbnail(`https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`);
    }
  };

  const handleSubmit = async () => {
    if (!title.trim() || !youtubeUrl.trim() || !category.trim()) {
      toast.error("Please fill in all required fields");
      return;
    }

    const videoId = extractYoutubeId(youtubeUrl);
    if (!videoId) {
      toast.error("Please enter a valid YouTube URL");
      return;
    }

    setIsSubmitting(true);

    const method = video?._id ? "PUT" : "POST";
    const url = video?._id
      ? `/api/training-video/${video._id}`
      : "/api/training-video";

    const videoData = {
      title,
      description,
      youtubeUrl,
      youtubeId: videoId,
      category,
      isPublished,
      duration: duration || undefined,
      thumbnail: thumbnail || undefined,
    };

    try {
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(videoData),
      });

      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.message || "Failed to save video");
      }

      onSave();
      onClose();
      toast.success(
        video?._id ? "Video updated successfully!" : "Video added successfully!",
        {
          icon: <CheckCircle className="w-5 h-5 text-green-500" />,
          style: {
            background: '#10B981',
            color: '#fff',
          },
        }
      );
    } catch (err: any) {
      toast.error(err.message || "Something went wrong!", {
        icon: <AlertCircle className="w-5 h-5 text-red-500" />,
      });
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const modalVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: {
        type: "spring",
        damping: 25,
        stiffness: 300
      }
    },
    exit: { opacity: 0, scale: 0.95 }
  };

  const backdropVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
    exit: { opacity: 0 }
  };

  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          {/* Backdrop */}
          <motion.div
            variants={backdropVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="fixed inset-0 bg-black/60 backdrop-blur-sm"
            onClick={onClose}
          />

          {/* Modal */}
          <div className="flex min-h-screen items-center justify-center p-4">
            <motion.div
              variants={modalVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="relative w-full max-w-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Decorative Elements */}
              <div className="absolute -top-6 -right-6 w-32 h-32 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full blur-3xl" />
              <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-gradient-to-r from-pink-500/20 to-orange-500/20 rounded-full blur-3xl" />

              {/* Main Modal Card */}
              <div className="relative bg-gradient-to-b from-white to-gray-50 rounded-2xl shadow-2xl border border-gray-200/50 backdrop-blur-sm overflow-hidden">
                {/* Header */}
                <div className="relative p-6 border-b border-gray-200">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-gradient-to-r from-blue-100 to-purple-100 rounded-lg">
                        {video?._id ? (
                          <Upload className="w-6 h-6 text-blue-600" />
                        ) : (
                          <Youtube className="w-6 h-6 text-red-600" />
                        )}
                      </div>
                      <div>
                        <h2 className="text-2xl font-bold text-gray-900">
                          {video?._id ? "Edit Video" : "Add New Video"}
                        </h2>
                        <p className="text-gray-600 text-sm">
                          {video?._id ? "Update video details" : "Add a new training video to your library"}
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={onClose}
                      className="p-2 hover:bg-gray-100 rounded-lg transition-colors group"
                    >
                      <X className="w-5 h-5 text-gray-500 group-hover:text-gray-700" />
                    </button>
                  </div>

                  {/* Tabs */}
                  <div className="flex gap-2 mt-6">
                    <button
                      onClick={() => setActiveTab("basic")}
                      className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
                        activeTab === "basic"
                          ? "bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-md"
                          : "text-gray-600 hover:bg-gray-100"
                      }`}
                    >
                      <Sparkles className="w-4 h-4" />
                      Basic Info
                    </button>
                    <button
                      onClick={() => setActiveTab("advanced")}
                      className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
                        activeTab === "advanced"
                          ? "bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-md"
                          : "text-gray-600 hover:bg-gray-100"
                      }`}
                    >
                      <Globe className="w-4 h-4" />
                      Advanced
                    </button>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 space-y-6 max-h-[60vh] overflow-y-auto">
                  {/* Basic Tab */}
                  {activeTab === "basic" && (
                    <div className="space-y-6">
                      {/* Title */}
                      <div className="space-y-2">
                        <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                          <FileText className="w-4 h-4" />
                          Video Title *
                        </label>
                        <input
                          type="text"
                          placeholder="Enter video title"
                          value={title}
                          onChange={(e) => setTitle(e.target.value)}
                          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white/50 transition-colors placeholder:text-gray-400"
                        />
                      </div>

                      {/* YouTube URL */}
                      <div className="space-y-2">
                        <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                          <Youtube className="w-4 h-4 text-red-600" />
                          YouTube URL *
                        </label>
                        <div className="relative">
                          <Link className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                          <input
                            type="text"
                            placeholder="https://www.youtube.com/watch?v=..."
                            value={youtubeUrl}
                            onChange={(e) => handleYoutubeUrlChange(e.target.value)}
                            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white/50 transition-colors placeholder:text-gray-400"
                          />
                        </div>
                        {extractYoutubeId(youtubeUrl) && (
                          <div className="flex items-center gap-2 text-xs text-green-600 bg-green-50 px-3 py-1.5 rounded-lg">
                            <CheckCircle className="w-3 h-3" />
                            Valid YouTube URL detected
                          </div>
                        )}
                      </div>

                      {/* Category */}
                      <div className="space-y-2">
                        <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                          <Tag className="w-4 h-4" />
                          Category *
                        </label>
                        <input
                          type="text"
                          placeholder="Select or enter category"
                          value={category}
                          onChange={(e) => setCategory(e.target.value)}
                          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white/50 transition-colors placeholder:text-gray-400"
                          list="category-suggestions"
                        />
                        <datalist id="category-suggestions">
                          {categorySuggestions.map((cat) => (
                            <option key={cat} value={cat} />
                          ))}
                        </datalist>
                        <div className="flex flex-wrap gap-2 mt-2">
                          {categorySuggestions.slice(0, 5).map((cat) => (
                            <button
                              key={cat}
                              type="button"
                              onClick={() => setCategory(cat)}
                              className={`px-3 py-1.5 text-sm rounded-full transition-colors ${
                                category === cat
                                  ? "bg-gradient-to-r from-blue-500 to-purple-500 text-white"
                                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                              }`}
                            >
                              {cat}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Description */}
                      <div className="space-y-2">
                        <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                          <FileText className="w-4 h-4" />
                          Description
                        </label>
                        <textarea
                          placeholder="Enter video description (supports markdown)"
                          value={description}
                          onChange={(e) => setDescription(e.target.value)}
                          rows={4}
                          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white/50 transition-colors placeholder:text-gray-400 resize-none"
                        />
                        <div className="text-xs text-gray-500 flex justify-between">
                          <span>{description.length}/500 characters</span>
                          <span>Markdown supported</span>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Advanced Tab */}
                  {activeTab === "advanced" && (
                    <div className="space-y-6">
                      {/* Duration */}
                      <div className="space-y-2">
                        <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                          <Clock className="w-4 h-4" />
                          Duration (Optional)
                        </label>
                        <input
                          type="text"
                          placeholder="e.g., 15:30"
                          value={duration}
                          onChange={(e) => setDuration(e.target.value)}
                          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white/50 transition-colors placeholder:text-gray-400"
                        />
                      </div>

                      {/* Thumbnail Preview */}
                      {thumbnail && (
                        <div className="space-y-2">
                          <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                            <Hash className="w-4 h-4" />
                            Thumbnail Preview
                          </label>
                          <div className="relative aspect-video rounded-xl overflow-hidden border border-gray-300 bg-gradient-to-br from-gray-900 to-gray-800">
                            <img
                              src={thumbnail}
                              alt="Video thumbnail"
                              className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                            <div className="absolute bottom-4 left-4">
                              <div className="w-12 h-12 bg-gradient-to-r from-red-500 to-red-600 rounded-full flex items-center justify-center">
                                <Youtube className="w-6 h-6 text-white" />
                              </div>
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Publish Status */}
                      <div className="space-y-4">
                        <label className="flex items-center justify-between cursor-pointer group">
                          <div className="flex items-center gap-3">
                            <div className={`p-2 rounded-lg transition-colors ${
                              isPublished 
                                ? "bg-gradient-to-r from-green-100 to-emerald-100" 
                                : "bg-gradient-to-r from-gray-100 to-gray-200"
                            }`}>
                              {isPublished ? (
                                <Eye className="w-5 h-5 text-green-600" />
                              ) : (
                                <EyeOff className="w-5 h-5 text-gray-600" />
                              )}
                            </div>
                            <div>
                              <div className="font-medium text-gray-900">
                                {isPublished ? "Published" : "Draft"}
                              </div>
                              <div className="text-sm text-gray-500">
                                {isPublished 
                                  ? "Video is visible to all users" 
                                  : "Video is only visible to admins"}
                              </div>
                            </div>
                          </div>
                          <div className="relative">
                            <input
                              type="checkbox"
                              checked={isPublished}
                              onChange={(e) => setIsPublished(e.target.checked)}
                              className="sr-only"
                            />
                            <div className={`w-12 h-6 rounded-full transition-colors ${
                              isPublished ? "bg-green-500" : "bg-gray-300"
                            }`} />
                            <div className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-transform ${
                              isPublished ? "translate-x-7" : "translate-x-1"
                            }`} />
                          </div>
                        </label>
                      </div>
                    </div>
                  )}
                </div>

                {/* Footer */}
                <div className="p-6 border-t border-gray-200 bg-gray-50/50">
                  <div className="flex items-center justify-between">
                    <div className="text-sm text-gray-500">
                      * Required fields
                    </div>
                    <div className="flex items-center gap-3">
                      <button
                        onClick={onClose}
                        className="px-6 py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-100 transition-colors font-medium"
                        disabled={isSubmitting}
                      >
                        Cancel
                      </button>
                      <button
                        onClick={handleSubmit}
                        disabled={isSubmitting}
                        className="group relative px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-xl hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed font-medium"
                      >
                        <div className="flex items-center justify-center gap-2">
                          {isSubmitting ? (
                            <>
                              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                              <span>Saving...</span>
                            </>
                          ) : (
                            <>
                              <Save className="w-5 h-5 group-hover:scale-110 transition-transform" />
                              <span>{video?._id ? "Update Video" : "Add Video"}</span>
                            </>
                          )}
                        </div>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
}
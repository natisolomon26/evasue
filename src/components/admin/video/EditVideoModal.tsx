"use client";

import { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  X, 
  Save, 
  Youtube, 
  FileText, 
  Tag, 
  Eye, 
  EyeOff,
  Link,
  Clock,
  CheckCircle,
  AlertCircle,
  Sparkles,
  BarChart3,
  Calendar,
  RefreshCw,
  ExternalLink
} from "lucide-react";
import toast from "react-hot-toast";

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
  const [duration, setDuration] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Category suggestions
  const categorySuggestions = [
    "Tutorial", "Training", "Webinar", "Workshop", "Guide", 
    "Interview", "Presentation", "Demo", "Q&A", "Case Study",
    "Technical", "Soft Skills", "Leadership", "Development", "Marketing"
  ];

  // Extract YouTube ID from URL
  const extractYouTubeId = (url: string): string | null => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]{11}).*/;
    const match = url.match(regExp);
    return match ? match[2] : null;
  };

  // Initialize form with video data
  useEffect(() => {
    if (video) {
      setTitle(video.title);
      setDescription(video.description);
      setCategory(video.category);
      setYoutubeUrl(`https://www.youtube.com/watch?v=${video.youtubeId}`);
      setIsPublished(video.isPublished);
      setDuration(video.duration || "");
    }
  }, [video]);

  // Get YouTube thumbnail URL
  const thumbnailUrl = useMemo(() => {
    const youtubeId = extractYouTubeId(youtubeUrl);
    return youtubeId ? `https://img.youtube.com/vi/${youtubeId}/maxresdefault.jpg` : null;
  }, [youtubeUrl]);

  // Handle YouTube URL change
  const handleYoutubeUrlChange = (url: string) => {
    setYoutubeUrl(url);
  };

  // Validate form
  const validateForm = () => {
    if (!title.trim()) {
      toast.error("Please enter a video title");
      return false;
    }
    if (!category.trim()) {
      toast.error("Please enter a category");
      return false;
    }
    if (!youtubeUrl.trim()) {
      toast.error("Please enter a YouTube URL");
      return false;
    }
    const youtubeId = extractYouTubeId(youtubeUrl);
    if (!youtubeId) {
      toast.error("Please enter a valid YouTube URL");
      return false;
    }
    return true;
  };

  // Handle update
  const handleUpdate = async () => {
    if (!video || !validateForm()) return;

    const youtubeId = extractYouTubeId(youtubeUrl);
    if (!youtubeId) return;

    setIsSubmitting(true);

    const videoData = {
      title,
      description,
      category,
      youtubeUrl,
      youtubeId,
      isPublished,
      duration: duration || undefined,
    };

    try {
      const res = await fetch(`/api/training-video/${video._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(videoData),
      });

      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.message || "Failed to update video");
      }

      onSave();
      onClose();
      
      toast.success("Video updated successfully!", {
        icon: <CheckCircle className="w-5 h-5 text-green-500" />,
        style: {
          background: '#10B981',
          color: '#fff',
          padding: '16px',
          borderRadius: '12px',
        },
        duration: 3000,
      });
    } catch (err: any) {
      toast.error(err.message || "Something went wrong!", {
        icon: <AlertCircle className="w-5 h-5 text-red-500" />,
      });
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Modal variants for animation
  const modalVariants = {
    hidden: { opacity: 0, scale: 0.95, y: 20 },
    visible: { 
      opacity: 1, 
      scale: 1,
      y: 0,
      transition: {
        type: "spring",
        damping: 25,
        stiffness: 300,
        duration: 0.3
      }
    },
    exit: { 
      opacity: 0, 
      scale: 0.95,
      y: 20,
      transition: { duration: 0.2 }
    }
  };

  const backdropVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
    exit: { opacity: 0 }
  };

  if (!video) return null;

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
              className="relative w-full max-w-4xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Decorative Elements */}
              <div className="absolute -top-8 -right-8 w-40 h-40 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-full blur-3xl" />
              <div className="absolute -bottom-8 -left-8 w-40 h-40 bg-gradient-to-r from-green-500/10 to-cyan-500/10 rounded-full blur-3xl" />

              {/* Main Modal Card */}
              <div className="relative bg-gradient-to-b from-white to-gray-50 rounded-2xl shadow-2xl border border-gray-200/50 backdrop-blur-sm overflow-hidden">
                {/* Header */}
                <div className="relative p-6 border-b border-gray-200 bg-gradient-to-r from-blue-50/50 to-purple-50/50">
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-gradient-to-r from-red-600 to-red-600 rounded-lg">
                        <Youtube className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h2 className="text-2xl font-bold text-gray-900">
                          Edit Training Video
                        </h2>
                        <p className="text-gray-600 text-sm">
                          Update video details and metadata
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
                </div>

                {/* Tabs */}
                

                {/* Content */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 p-6 max-h-[60vh] overflow-y-auto">
                  {/* Left Column - Form */}
                  <div className="space-y-6">
                      <>
                        {/* Title */}
                        <div className="space-y-2">
                          <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                            <FileText className="w-4 h-4" />
                            Video Title *
                          </label>
                          <input
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white transition-colors"
                            placeholder="Enter video title"
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
                              value={youtubeUrl}
                              onChange={(e) => handleYoutubeUrlChange(e.target.value)}
                              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white transition-colors"
                              placeholder="https://www.youtube.com/watch?v=..."
                            />
                          </div>
                          {extractYouTubeId(youtubeUrl) ? (
                            <div className="flex items-center gap-2 text-xs text-green-600 bg-green-50 px-3 py-1.5 rounded-lg">
                              <CheckCircle className="w-3 h-3" />
                              Valid YouTube URL
                            </div>
                          ) : (
                            <div className="flex items-center gap-2 text-xs text-amber-600 bg-amber-50 px-3 py-1.5 rounded-lg">
                              <AlertCircle className="w-3 h-3" />
                              Enter a valid YouTube URL
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
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white transition-colors"
                            placeholder="Select or enter category"
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
                      </>
                    
                      <>
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
                      </>
                    

                    {/* Description */}
                    <div className="space-y-2">
                      <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                        <FileText className="w-4 h-4" />
                        Description
                      </label>
                      <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        rows={4}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white transition-colors resize-none"
                        placeholder="Enter video description..."
                      />
                      <div className="text-xs text-gray-500 flex justify-between">
                        <span>{description.length}/1000 characters</span>
                        <span>Supports markdown formatting</span>
                      </div>
                    </div>
                  </div>

                  {/* Right Column - Preview */}
                  <div className="space-y-6">
                    {/* Video Preview */}
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <label className="text-sm font-medium text-gray-700">
                          Video Preview
                        </label>
                        {thumbnailUrl && (
                          <a
                            href={youtubeUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-1 text-sm text-blue-600 hover:text-blue-800"
                          >
                            <ExternalLink className="w-3 h-3" />
                            Open on YouTube
                          </a>
                        )}
                      </div>
                      {thumbnailUrl ? (
                        <div className="relative aspect-video rounded-xl overflow-hidden border border-gray-300 bg-gradient-to-br from-gray-900 to-gray-800 group">
                          <img
                            src={thumbnailUrl}
                            alt="Video thumbnail"
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                          <div className="absolute inset-0 flex items-center justify-center">
                            <div className="w-16 h-16 bg-gradient-to-r from-red-500 to-red-600 rounded-full flex items-center justify-center shadow-2xl transform group-hover:scale-110 transition-transform">
                              <Youtube className="w-8 h-8 text-white" />
                            </div>
                          </div>
                          {duration && (
                            <div className="absolute bottom-4 right-4 bg-black/80 text-white px-3 py-1 rounded-full text-sm font-medium">
                              {duration}
                            </div>
                          )}
                        </div>
                      ) : (
                        <div className="aspect-video rounded-xl border-2 border-dashed border-gray-300 flex flex-col items-center justify-center bg-gray-50">
                          <Youtube className="w-12 h-12 text-gray-400 mb-3" />
                          <p className="text-gray-500 text-sm">Enter a YouTube URL to preview</p>
                        </div>
                      )}
                    </div>
                  </div>
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
                        onClick={handleUpdate}
                        disabled={isSubmitting}
                        className="group relative px-6 py-3 bg-gradient-to-r from-red-600 to-red-700 text-white rounded-xl hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed font-medium"
                      >
                        <div className="flex items-center justify-center gap-2">
                          {isSubmitting ? (
                            <>
                              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                              <span>Updating...</span>
                            </>
                          ) : (
                            <>
                              <Save className="w-5 h-5 group-hover:scale-110 transition-transform" />
                              <span>Update Video</span>
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
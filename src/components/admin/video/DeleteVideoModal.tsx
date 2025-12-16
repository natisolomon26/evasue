"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  X, 
  Trash2, 
  AlertTriangle, 
  ShieldAlert, 
  CheckCircle,
  EyeOff,
  Clock,
  BarChart3,
  Calendar,
  Video,
  AlertCircle
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

interface DeleteVideoModalProps {
  open: boolean;
  video?: Video;
  onClose: () => void;
  onDelete: () => Promise<void> | void;
}

export default function DeleteVideoModal({ open, video, onClose, onDelete }: DeleteVideoModalProps) {
  const [isDeleting, setIsDeleting] = useState(false);
  const [confirmationText, setConfirmationText] = useState("");

  const handleDelete = async () => {
    if (confirmationText !== video?.title) {
      toast.error("Please type the video title to confirm deletion", {
        icon: <AlertCircle className="w-5 h-5 text-red-500" />,
        style: {
          background: '#FEF3F2',
          color: '#D92D20',
          border: '1px solid #FDA29B',
        }
      });
      return;
    }

    setIsDeleting(true);
    
    try {
      await onDelete();
      
      toast.success("Video deleted successfully!", {
        icon: <CheckCircle className="w-5 h-5 text-green-500" />,
        style: {
          background: '#D1FADF',
          color: '#039855',
          border: '1px solid #A6F4C5',
          padding: '16px',
          borderRadius: '12px',
        },
        duration: 4000,
      });
      
      onClose();
      setConfirmationText("");
    } catch (error) {
      toast.error("Failed to delete video. Please try again.", {
        icon: <AlertCircle className="w-5 h-5 text-red-500" />,
        style: {
          background: '#FEF3F2',
          color: '#D92D20',
          border: '1px solid #FDA29B',
        }
      });
    } finally {
      setIsDeleting(false);
    }
  };

  const modalVariants = {
    hidden: { opacity: 0, scale: 0.9, y: 20 },
    visible: { 
      opacity: 1, 
      scale: 1,
      y: 0,
      transition: {
        type: "spring",
        damping: 25,
        stiffness: 300
      }
    },
    exit: { 
      opacity: 0, 
      scale: 0.9,
      y: 20,
      transition: { duration: 0.2 }
    }
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
              className="relative w-full max-w-md"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Decorative Elements */}
              <div className="absolute -inset-2 bg-gradient-to-r from-red-500/20 to-orange-500/20 rounded-2xl blur-xl opacity-50" />

              {/* Main Modal Card */}
              <div className="relative bg-gradient-to-b from-white to-gray-50 rounded-2xl shadow-2xl border border-red-200/50 backdrop-blur-sm overflow-hidden">
                {/* Header */}
                <div className="relative p-6 border-b border-red-200 bg-gradient-to-r from-red-50/50 to-orange-50/50">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-gradient-to-r from-red-500 to-orange-500 rounded-lg">
                        <Trash2 className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h2 className="text-2xl font-bold text-gray-900">
                          Delete Video
                        </h2>
                        <p className="text-gray-600 text-sm">
                          Permanent action - cannot be undone
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={onClose}
                      className="p-2 hover:bg-red-100 text-gray-500 hover:text-gray-700 rounded-lg transition-colors"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>

                  {/* Warning Banner */}
                  <div className="flex items-start gap-3 p-4 bg-gradient-to-r from-red-100 to-orange-100 rounded-xl border border-red-200">
                    <AlertTriangle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <div className="font-medium text-red-800 mb-1">
                        This action cannot be undone
                      </div>
                      <p className="text-red-700 text-sm">
                        All video data, statistics, and associated content will be permanently deleted.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 space-y-6">
                  {/* Video Information */}
                  {video && (
                    <div className="space-y-4">
                      <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-xl border border-gray-200">
                        {/* Thumbnail */}
                        <div className="relative flex-shrink-0 w-20 aspect-video rounded-lg overflow-hidden bg-gradient-to-br from-gray-900 to-gray-800">
                          <img
                            src={`https://img.youtube.com/vi/${video.youtubeId}/mqdefault.jpg`}
                            alt={video.title}
                            className="w-full h-full object-cover"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                        </div>
                        
                        {/* Video Details */}
                        <div className="flex-1 min-w-0">
                          <h3 className="font-semibold text-gray-900 truncate mb-2">
                            {video.title}
                          </h3>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Confirmation */}
                  <div className="space-y-4">
                    <div className="text-center">
                      <p className="text-gray-700 font-medium mb-2">
                        Type the video title to confirm deletion:
                      </p>
                      <p className="text-sm text-gray-500 mb-4">
                        Type <span className="font-mono font-semibold text-red-600">{video?.title}</span> to proceed
                      </p>
                    </div>
                    
                    <div className="relative">
                      <input
                        type="text"
                        value={confirmationText}
                        onChange={(e) => setConfirmationText(e.target.value)}
                        className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:outline-none transition-all ${
                          confirmationText === video?.title
                            ? "border-red-500 focus:ring-red-500/20 bg-red-50/50"
                            : "border-red-300 focus:ring-red-500/20 bg-white"
                        }`}
                        placeholder={`Type "${video?.title}" here`}
                        disabled={isDeleting}
                      />
                      {confirmationText === video?.title && (
                        <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                          <CheckCircle className="w-5 h-5 text-red-500" />
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Final Warning */}
                  <div className="p-4 bg-gradient-to-r from-red-50 to-orange-50 rounded-xl border border-red-100">
                    <div className="flex items-start gap-3">
                      <EyeOff className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="text-sm text-red-700">
                          This video will be immediately removed from all playlists and user access. 
                          The YouTube video itself will not be affected.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Footer */}
                <div className="p-6 border-t border-gray-200 bg-gray-50/50">
                  <div className="flex items-center justify-between">
                    <button
                      onClick={onClose}
                      className="px-6 py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-100 transition-colors font-medium"
                      disabled={isDeleting}
                    >
                      Cancel
                    </button>
                    
                    <button
                      onClick={handleDelete}
                      disabled={isDeleting || confirmationText !== video?.title}
                      className="group relative px-6 py-3 bg-gradient-to-r from-red-600 to-red-700 text-white rounded-xl hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed font-medium"
                    >
                      {isDeleting ? (
                        <div className="flex items-center justify-center gap-2">
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                          <span>Deleting...</span>
                        </div>
                      ) : (
                        <div className="flex items-center justify-center gap-2">
                          <Trash2 className="w-5 h-5 group-hover:scale-110 transition-transform" />
                          <span>Delete Permanently</span>
                        </div>
                      )}
                    </button>
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
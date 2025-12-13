"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { 
  Edit2, 
  Trash2, 
  Eye, 
  EyeOff, 
  Play, 
  Youtube, 
  Clock,
  TrendingUp,
  ChevronDown,
  ChevronUp
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

interface VideoTableProps {
  videos: Video[];
  isLoading: boolean;
  onEdit: (video: Video) => void;
  onDelete: (video: Video) => void;
  onRefresh: () => void;
}

export default function VideoTable({ videos, isLoading, onEdit, onDelete, onRefresh }: VideoTableProps) {
  const [sortConfig, setSortConfig] = useState<{ key: keyof Video; direction: 'asc' | 'desc' }>({ 
    key: 'title', 
    direction: 'asc' 
  });
  const [expandedRow, setExpandedRow] = useState<string | null>(null);

  const handleSort = (key: keyof Video) => {
    setSortConfig(prev => ({
      key,
      direction: prev.key === key && prev.direction === 'asc' ? 'desc' : 'asc'
    }));
  };

  const sortedVideos = [...videos].sort((a, b) => {
    if (sortConfig.key === 'views' || sortConfig.key === 'likes') {
      const aVal = a[sortConfig.key] || 0;
      const bVal = b[sortConfig.key] || 0;
      return sortConfig.direction === 'asc' ? aVal - bVal : bVal - aVal;
    }
    
    const aVal = String(a[sortConfig.key] || '');
    const bVal = String(b[sortConfig.key] || '');
    return sortConfig.direction === 'asc' 
      ? aVal.localeCompare(bVal) 
      : bVal.localeCompare(aVal);
  });

  const SortIcon = ({ columnKey }: { columnKey: keyof Video }) => {
    if (sortConfig.key !== columnKey) return <ChevronDown className="w-4 h-4 opacity-30" />;
    return sortConfig.direction === 'asc' 
      ? <ChevronUp className="w-4 h-4" /> 
      : <ChevronDown className="w-4 h-4" />;
  };

  if (isLoading) {
    return (
      <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
        <div className="p-8 text-center">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          <p className="mt-4 text-gray-600">Loading videos...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
      {/* Table Header */}
      <div className="px-6 py-4 border-b border-gray-200 bg-gradient-to-r from-gray-50 to-gray-100/50">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Play className="w-5 h-5 text-blue-600" />
            <h2 className="text-lg font-semibold text-gray-900">Video Library</h2>
          </div>
          <div className="text-sm text-gray-500">
            {sortedVideos.length} videos
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-200">
              <th 
                className="px-6 py-4 text-left text-sm font-semibold text-gray-900 cursor-pointer hover:bg-gray-100 transition-colors"
                onClick={() => handleSort('title')}
              >
                <div className="flex items-center gap-2">
                  Title
                  <SortIcon columnKey="title" />
                </div>
              </th>
              <th 
                className="px-6 py-4 text-left text-sm font-semibold text-gray-900 cursor-pointer hover:bg-gray-100 transition-colors"
                onClick={() => handleSort('category')}
              >
                <div className="flex items-center gap-2">
                  Category
                  <SortIcon columnKey="category" />
                </div>
              </th>
              <th 
                className="px-6 py-4 text-left text-sm font-semibold text-gray-900 cursor-pointer hover:bg-gray-100 transition-colors"
                onClick={() => handleSort('views')}
              >
                <div className="flex items-center gap-2">
                  Views
                  <SortIcon columnKey="views" />
                </div>
              </th>
              <th 
                className="px-6 py-4 text-left text-sm font-semibold text-gray-900 cursor-pointer hover:bg-gray-100 transition-colors"
                onClick={() => handleSort('isPublished')}
              >
                Status
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {sortedVideos.map((video, index) => (
              <motion.tr
                key={video._id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className={`border-b border-gray-100 hover:bg-gray-50/50 transition-colors ${
                  expandedRow === video._id ? 'bg-blue-50/30' : ''
                }`}
              >
                <td className="px-6 py-4">
                  <div className="flex items-start gap-4">
                    {/* Thumbnail */}
                    <div className="relative flex-shrink-0 w-32 aspect-video rounded-lg overflow-hidden bg-gradient-to-br from-gray-900 to-gray-800">
                      <img
                        src={`https://img.youtube.com/vi/${video.youtubeId}/mqdefault.jpg`}
                        alt={video.title}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                      <div className="absolute bottom-2 right-2">
                        {video.duration && (
                          <span className="bg-black/80 text-white px-2 py-1 rounded text-xs font-medium">
                            {video.duration}
                          </span>
                        )}
                      </div>
                    </div>
                    
                    {/* Title and Description */}
                    <div className="flex-1 min-w-0">
                      <div 
                        className="font-medium text-gray-900 cursor-pointer hover:text-blue-600 transition-colors line-clamp-2 mb-1"
                        onClick={() => setExpandedRow(expandedRow === video._id ? null : video._id)}
                      >
                        {video.title}
                      </div>
                      <p className="text-sm text-gray-500 line-clamp-2">
                        {video.description}
                      </p>
                      
                      {/* Expanded Content */}
                      {expandedRow === video._id && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          className="mt-3 pt-3 border-t border-gray-200"
                        >
                          <div className="flex items-center gap-4 text-sm text-gray-600">
                            <a
                              href={`https://youtube.com/watch?v=${video.youtubeId}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center gap-1 text-blue-600 hover:text-blue-800"
                            >
                              <Youtube className="w-4 h-4" />
                              <span>Watch on YouTube</span>
                            </a>
                            {video.uploadDate && (
                              <span className="flex items-center gap-1">
                                <Clock className="w-4 h-4" />
                                {video.uploadDate}
                              </span>
                            )}
                          </div>
                        </motion.div>
                      )}
                    </div>
                  </div>
                </td>
                
                <td className="px-6 py-4">
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                    {video.category}
                  </span>
                </td>
                
                <td className="px-6 py-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <Eye className="w-4 h-4 text-gray-400" />
                      <span className="font-medium">{video.views?.toLocaleString() || 0}</span>
                    </div>
                    {video.likes && (
                      <div className="flex items-center gap-2">
                        <TrendingUp className="w-4 h-4 text-gray-400" />
                        <span className="text-sm text-gray-600">{video.likes.toLocaleString()} likes</span>
                      </div>
                    )}
                  </div>
                </td>
                
                <td className="px-6 py-4">
                  <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium ${
                    video.isPublished
                      ? 'bg-green-100 text-green-800'
                      : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {video.isPublished ? (
                      <>
                        <Eye className="w-3 h-3" />
                        Published
                      </>
                    ) : (
                      <>
                        <EyeOff className="w-3 h-3" />
                        Draft
                      </>
                    )}
                  </div>
                </td>
                
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => onEdit(video)}
                      className="p-2 hover:bg-blue-100 text-blue-600 rounded-lg transition-colors group"
                      title="Edit Video"
                    >
                      <Edit2 className="w-4 h-4 group-hover:scale-110 transition-transform" />
                    </motion.button>
                    
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => onDelete(video)}
                      className="p-2 hover:bg-red-100 text-red-600 rounded-lg transition-colors group"
                      title="Delete Video"
                    >
                      <Trash2 className="w-4 h-4 group-hover:scale-110 transition-transform" />
                    </motion.button>
                    
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => setExpandedRow(expandedRow === video._id ? null : video._id)}
                      className="p-2 hover:bg-gray-100 text-gray-600 rounded-lg transition-colors"
                      title="Toggle Details"
                    >
                      {expandedRow === video._id ? (
                        <ChevronUp className="w-4 h-4" />
                      ) : (
                        <ChevronDown className="w-4 h-4" />
                      )}
                    </motion.button>
                  </div>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Table Footer */}
      {sortedVideos.length > 0 && (
        <div className="px-6 py-4 border-t border-gray-200 bg-gray-50">
          <div className="flex items-center justify-between text-sm text-gray-600">
            <div>
              Showing <span className="font-medium">{sortedVideos.length}</span> videos
            </div>
            <button
              onClick={onRefresh}
              className="text-blue-600 hover:text-blue-800 font-medium"
            >
              Refresh Data
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
"use client";

import { motion } from "framer-motion";
import { Play } from "lucide-react";

interface VideoStatsProps {
  stats: {
    totalVideos: number;
    publishedVideos: number;
    totalViews: number;
    totalLikes: number;
  };
}

export default function VideoStats({ stats }: VideoStatsProps) {
  const statCards = [
    {
      icon: Play,
      label: "Total Videos",
      value: stats.totalVideos,
      color: "grey-400",
      gradient: "from-red-600 to-red-600/90",
      bgGradient: "from-red-50 to-red-50",
      borderColor: "border-red-200"
    },
 
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {statCards.map((stat, index) => (
        <motion.div
          key={stat.label}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          whileHover={{ y: -5 }}
          className={`relative overflow-hidden rounded-2xl border ${stat.borderColor} bg-gradient-to-br ${stat.bgGradient} p-6 shadow-lg hover:shadow-xl transition-all`}
        >
          {/* Decorative Element */}
          <div className={`absolute top-0 right-0 w-20 h-20 bg-gradient-to-br ${stat.gradient} rounded-full blur-2xl opacity-10`} />
          
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-4">
              <div className={`p-3 rounded-xl bg-gradient-to-br ${stat.gradient} bg-opacity-10`}>
                <stat.icon className={`w-6 h-6 text-${stat.color}-600`} />
              </div>
              <div className="text-sm font-medium text-gray-500">{stat.label}</div>
            </div>
            
            <div className="text-3xl font-bold text-gray-900 mb-2">
              {stat.value}
            </div>
            
            {/* Progress bar for published videos */}
            {stat.label === "Published Videos" && stats.totalVideos > 0 && (
              <div className="mt-4">
                <div className="flex items-center justify-between text-sm mb-1">
                  <span className="text-gray-600">Publish Rate</span>
                  <span className="font-semibold text-green-600">
                    {Math.round((stats.publishedVideos / stats.totalVideos) * 100)}%
                  </span>
                </div>
                <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${(stats.publishedVideos / stats.totalVideos) * 100}%` }}
                    transition={{ delay: 0.5, duration: 1 }}
                    className="h-full bg-gradient-to-r from-green-500 to-emerald-500 rounded-full"
                  />
                </div>
              </div>
            )}
          </div>
        </motion.div>
      ))}
    </div>
  );
}
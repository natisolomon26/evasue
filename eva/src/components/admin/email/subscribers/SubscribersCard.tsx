"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  TrendingUp, 
  TrendingDown, 
  Users, 
  UserCheck, 
  UserX, 
  Mail,
  Sparkles,
  AlertCircle,
  Clock,
  RefreshCw,
  ChevronRight,
  MoreVertical
} from "lucide-react";

interface SubscriberCardProps {
  title: string;
  value: number | string;
  icon?: React.ReactNode;
  color: string;
  change?: string; // e.g., "+12%", "-5%"
  description?: string;
  loading?: boolean;
  onClick?: () => void;
  variant?: 'default' | 'compact' | 'detailed';
  data?: { label: string; value: number }[]; // For detailed charts
}

export default function SubscriberCard({ 
  title, 
  value, 
  icon,
  color,
  change,
  description,
  loading = false,
  onClick,
  variant = 'default',
  data = []
}: SubscriberCardProps) {
  const [showDetails, setShowDetails] = useState(false);
  const [animatedValue, setAnimatedValue] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  // Animate the value counter
  useEffect(() => {
    if (loading) return;
    
    const numericValue = typeof value === 'number' ? value : parseInt(value) || 0;
    const duration = 1500; // Animation duration in ms
    const steps = 60; // Number of animation steps
    const increment = numericValue / steps;
    let current = 0;
    let step = 0;

    const timer = setInterval(() => {
      current += increment;
      step += 1;
      setAnimatedValue(Math.min(current, numericValue));
      
      if (step >= steps) {
        clearInterval(timer);
        setAnimatedValue(numericValue);
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, [value, loading]);

  // Parse color prop to get gradients
  const getGradient = () => {
    const colorMap: Record<string, { from: string; to: string; text: string }> = {
      'bg-blue-500': { from: 'from-blue-500', to: 'to-cyan-500', text: 'text-blue-50' },
      'bg-green-500': { from: 'from-emerald-500', to: 'to-green-500', text: 'text-emerald-50' },
      'bg-red-500': { from: 'from-red-500', to: 'to-rose-500', text: 'text-red-50' },
      'bg-purple-500': { from: 'from-purple-500', to: 'to-pink-500', text: 'text-purple-50' },
      'bg-amber-500': { from: 'from-amber-500', to: 'to-orange-500', text: 'text-amber-50' },
      'bg-indigo-500': { from: 'from-indigo-500', to: 'to-blue-500', text: 'text-indigo-50' },
      'bg-emerald-500': { from: 'from-emerald-500', to: 'to-teal-500', text: 'text-emerald-50' },
      'bg-rose-500': { from: 'from-rose-500', to: 'to-pink-500', text: 'text-rose-50' },
    };

    const defaultGradient = { from: 'from-blue-500', to: 'to-cyan-500', text: 'text-white' };
    return colorMap[color] || { ...defaultGradient, text: 'text-white' };
  };

  const gradient = getGradient();

  // Default icon based on title
  const getDefaultIcon = () => {
    const iconMap: Record<string, React.ReactNode> = {
      'Total Subscribers': <Users className="w-5 h-5" />,
      'Active Subscribers': <UserCheck className="w-5 h-5" />,
      'Inactive Subscribers': <UserX className="w-5 h-5" />,
      'Engagement Rate': <Sparkles className="w-5 h-5" />,
      'Open Rate': <Mail className="w-5 h-5" />,
      'Growth Rate': <TrendingUp className="w-5 h-5" />,
    };
    return icon || iconMap[title] || <Users className="w-5 h-5" />;
  };

  const renderCompact = () => (
    <motion.div
      whileHover={{ y: -2 }}
      className={`bg-gradient-to-br ${gradient.from} ${gradient.to} rounded-xl p-4 relative overflow-hidden group cursor-pointer transition-all duration-300 ${
        onClick ? 'hover:shadow-xl' : ''
      }`}
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Animated background elements */}
      <motion.div
        className="absolute -right-8 -top-8 w-24 h-24 bg-white/10 rounded-full"
        animate={{
          scale: isHovered ? [1, 1.2, 1] : 1,
          rotate: isHovered ? [0, 180, 360] : 0,
        }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      />
      
      <div className="relative z-10">
        <div className="flex items-center justify-between">
          <div className={`p-2 rounded-lg bg-white/20 ${gradient.text}`}>
            {getDefaultIcon()}
          </div>
          <div className="text-xs font-medium bg-white/20 px-2 py-1 rounded-full">
            {title}
          </div>
        </div>
        
        <div className="mt-3">
          {loading ? (
            <div className="h-8 bg-white/20 rounded animate-pulse"></div>
          ) : (
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-2xl font-bold"
            >
              {typeof value === 'number' ? animatedValue.toLocaleString() : value}
            </motion.p>
          )}
        </div>

        {change && (
          <div className="flex items-center gap-1 mt-1">
            {change.startsWith('+') ? (
              <TrendingUp className="w-3 h-3" />
            ) : change.startsWith('-') ? (
              <TrendingDown className="w-3 h-3" />
            ) : null}
            <span className="text-xs font-medium opacity-90">
              {change}
            </span>
          </div>
        )}
      </div>
    </motion.div>
  );

  const renderDetailed = () => (
    <motion.div
      whileHover={{ y: -4, scale: 1.02 }}
      className="bg-white rounded-2xl border border-gray-200 shadow-lg overflow-hidden group cursor-pointer"
      onClick={() => setShowDetails(!showDetails)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Header */}
      <div className={`p-6 bg-gradient-to-r ${gradient.from} ${gradient.to} relative overflow-hidden`}>
        {/* Floating elements */}
        <motion.div
          className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16"
          animate={{
            scale: [1, 1.1, 1],
            rotate: [0, 90, 180],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
        />
        
        <div className="relative z-10">
          <div className="flex items-start justify-between mb-4">
            <div className={`p-3 rounded-xl bg-white/20 ${gradient.text}`}>
              {getDefaultIcon()}
            </div>
            <button className="p-2 rounded-lg bg-white/20 hover:bg-white/30 transition-colors">
              <MoreVertical className="w-4 h-4" />
            </button>
          </div>
          
          <div className="mb-2">
            {loading ? (
              <>
                <div className="h-8 bg-white/20 rounded animate-pulse mb-2 w-32"></div>
                <div className="h-4 bg-white/20 rounded animate-pulse w-20"></div>
              </>
            ) : (
              <>
                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-3xl font-bold mb-1"
                >
                  {typeof value === 'number' ? animatedValue.toLocaleString() : value}
                </motion.p>
                <p className="text-sm font-medium opacity-90">{title}</p>
              </>
            )}
          </div>

          {change && (
            <div className="flex items-center gap-2">
              <div className={`px-3 py-1 rounded-full text-xs font-semibold ${
                change.startsWith('+') 
                  ? 'bg-emerald-500/20 text-emerald-100' 
                  : change.startsWith('-')
                  ? 'bg-rose-500/20 text-rose-100'
                  : 'bg-white/20'
              }`}>
                <span className="flex items-center gap-1">
                  {change.startsWith('+') ? (
                    <TrendingUp className="w-3 h-3" />
                  ) : change.startsWith('-') ? (
                    <TrendingDown className="w-3 h-3" />
                  ) : null}
                  {change}
                </span>
              </div>
              <span className="text-xs opacity-75">from last period</span>
            </div>
          )}
        </div>
      </div>

      {/* Body */}
      <div className="p-6">
        {description && (
          <p className="text-white text-sm mb-4">{description}</p>
        )}

        {/* Mini Chart */}
        {data.length > 0 && (
          <div className="mb-4">
            <div className="flex items-center justify-between text-xs text-gray-500 mb-2">
              <span>Trend</span>
              <span>Last 7 days</span>
            </div>
            <div className="h-12 flex items-end gap-1">
              {data.map((item, index) => {
                const maxValue = Math.max(...data.map(d => d.value));
                const height = maxValue > 0 ? (item.value / maxValue) * 100 : 0;
                return (
                  <motion.div
                    key={index}
                    initial={{ height: 0 }}
                    animate={{ height: `${height}%` }}
                    transition={{ duration: 0.8, delay: index * 0.1 }}
                    className={`flex-1 rounded-t-lg ${height > 70 ? 'bg-gradient-to-t from-emerald-400 to-emerald-500' :
                                     height > 40 ? 'bg-gradient-to-t from-blue-400 to-blue-500' :
                                     'bg-gradient-to-t from-gray-300 to-gray-400'}`}
                  />
                );
              })}
            </div>
          </div>
        )}

        {/* Additional Info */}
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-gray-50 rounded-lg p-3">
            <p className="text-xs text-gray-500 mb-1">Avg. Daily</p>
            <p className="font-semibold text-gray-900">
              {typeof value === 'number' ? Math.round(animatedValue / 30) : '0'}
            </p>
          </div>
          <div className="bg-gray-50 rounded-lg p-3">
            <p className="text-xs text-gray-500 mb-1">Growth</p>
            <p className="font-semibold text-gray-900">
              {change || '0%'}
            </p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="px-6 py-4 border-t border-gray-100 bg-gray-50/50">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-gray-600">
            <Clock className="w-3 h-3" />
            <span className="text-xs">Updated just now</span>
          </div>
          <motion.div
            animate={{ x: isHovered ? 5 : 0 }}
            transition={{ duration: 0.2 }}
            className="text-gray-400"
          >
            <ChevronRight className={`w-4 h-4 transition-transform ${showDetails ? 'rotate-90' : ''}`} />
          </motion.div>
        </div>
      </div>

      {/* Expanded Details */}
      <AnimatePresence>
        {showDetails && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="border-t border-gray-100"
          >
            <div className="p-6">
              <h4 className="font-semibold text-gray-900 mb-3">Detailed Breakdown</h4>
              <div className="space-y-3">
                {[
                  { label: 'New This Week', value: Math.round(animatedValue * 0.1), change: '+5.2%' },
                  { label: 'Active Rate', value: '85%', change: '+1.3%' },
                  { label: 'Churn Rate', value: '2.1%', change: '-0.4%' },
                ].map((stat, index) => (
                  <div key={index} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-0">
                    <span className="text-sm text-gray-700">{stat.label}</span>
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-gray-900">{stat.value}</span>
                      <span className={`text-xs ${
                        stat.change.startsWith('+') ? 'text-emerald-600' : 'text-rose-600'
                      }`}>
                        {stat.change}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );

  const renderDefault = () => (
    <motion.div
      whileHover={{ y: -4, scale: 1.02 }}
      className={`bg-gradient-to-br ${gradient.from} ${gradient.to} rounded-2xl shadow-xl p-6 relative overflow-hidden group cursor-pointer transition-all duration-300 ${
        onClick ? 'hover:shadow-2xl' : ''
      }`}
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Animated background elements */}
      <motion.div
        className="absolute -right-12 -top-12 w-40 h-40 bg-white/10 rounded-full"
        animate={{
          scale: isHovered ? [1, 1.3, 1] : 1,
          rotate: isHovered ? [0, 90, 180, 270, 360] : 0,
        }}
        transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
      />
      <motion.div
        className="absolute -left-8 -bottom-8 w-32 h-32 bg-white/5 rounded-full"
        animate={{
          scale: [1, 1.2, 1],
          y: [0, -10, 0],
        }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="relative z-10">
        <div className="flex items-center justify-between mb-6">
          <div className={`p-3 rounded-xl bg-white/20 ${gradient.text}`}>
            {getDefaultIcon()}
          </div>
          
          {loading ? (
            <div className="h-6 w-20 bg-white/20 rounded animate-pulse"></div>
          ) : change ? (
            <div className={`px-3 py-1.5 rounded-full text-sm font-semibold backdrop-blur-sm ${
              change.startsWith('+') 
                ? 'bg-emerald-500/20 text-emerald-100 border border-emerald-500/30' 
                : change.startsWith('-')
                ? 'bg-rose-500/20 text-rose-100 border border-rose-500/30'
                : 'bg-white/20 border border-white/30'
            }`}>
              <span className="flex items-center gap-1">
                {change.startsWith('+') ? (
                  <TrendingUp className="w-4 h-4" />
                ) : change.startsWith('-') ? (
                  <TrendingDown className="w-4 h-4" />
                ) : null}
                {change}
              </span>
            </div>
          ) : null}
        </div>
        
        <div className="mb-2">
          {loading ? (
            <>
              <div className="h-10 bg-white/20 rounded animate-pulse mb-2"></div>
              <div className="h-4 bg-white/20 rounded animate-pulse w-32"></div>
            </>
          ) : (
            <>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-4xl font-bold mb-1"
              >
                {typeof value === 'number' ? animatedValue.toLocaleString() : value}
              </motion.p>
              <p className="text-lg font-medium opacity-90">{title}</p>
            </>
          )}
        </div>

        {description && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: loading ? 0 : 0.8 }}
            className="text-sm mt-4"
          >
            {description}
          </motion.p>
        )}

        {/* Progress indicator (if applicable) */}
        {typeof value === 'number' && value > 0 && (
          <div className="mt-6">
            <div className="flex justify-between text-xs mb-1">
              <span>Progress</span>
              <span>{Math.min(100, Math.round((animatedValue / 1000) * 100))}%</span>
            </div>
            <div className="h-2 bg-white/20 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${Math.min(100, (animatedValue / 1000) * 100)}%` }}
                transition={{ duration: 2, ease: "easeOut" }}
                className="h-full bg-white/40 rounded-full"
              />
            </div>
          </div>
        )}

        {/* Hover action */}
        {onClick && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : 10 }}
            className="mt-4 flex items-center gap-2 text-sm"
          >
            <span>View details</span>
            <ChevronRight className="w-4 h-4" />
          </motion.div>
        )}
      </div>
    </motion.div>
  );

  // Render based on variant
  switch (variant) {
    case 'compact':
      return renderCompact();
    case 'detailed':
      return renderDetailed();
    default:
      return renderDefault();
  }
}
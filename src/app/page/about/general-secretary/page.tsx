"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { 
  Award, 
  GraduationCap, 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Calendar, 
  BookOpen,
  Shield,
  Globe,
  Linkedin,
  Twitter,
  Star,
  ChevronRight,
  Sparkles,
  Quote,
  Target,
  Zap,
  BarChart3,
  TrendingUp,
  Users,
  Clock,
  Briefcase,
  Heart,
  Flag,
  X
} from "lucide-react";

interface GeneralSecretary {
  _id: string;
  fullName: string;
  role: string;
  description?: string;
  education?: string;
  personal?: string;
  image?: string;
  email?: string;
  phone?: string;
  location?: string;
  yearsInRole?: number;
  achievements?: string[];
  linkedin?: string;
  twitter?: string;
  vision?: string;
  coreValues?: string[];
  dateAppointed?: string;
  previousRoles?: string[];
  hobbies?: string[];
}

export default function GeneralSecretaryPage() {
  const [gsData, setGsData] = useState<GeneralSecretary | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<"overview" | "education" | "personal" | "leadership">("overview");

  const fetchGS = async () => {
    try {
      setIsLoading(true);
      const res = await fetch("/api/general-secretary");
      const data = await res.json();
      if (data.data && data.data.length > 0) {
        setGsData(data.data[0]);
      }
    } catch (error) {
      console.error("Error fetching General Secretary:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchGS();
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-50 to-white">
        <div className="text-center">
          <div className="relative">
            <div className="w-16 h-16 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
            <Shield className="w-8 h-8 text-blue-600 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
          </div>
          <p className="mt-6 text-lg text-gray-600 font-medium">Loading leadership profile...</p>
        </div>
      </div>
    );
  }

  if (!gsData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-50 to-white">
        <div className="text-center max-w-md p-8">
          <Shield className="w-20 h-20 text-gray-300 mx-auto mb-6" />
          <h2 className="text-2xl font-bold text-gray-900 mb-3">Profile Not Found</h2>
          <p className="text-gray-600 mb-6">
            The General Secretary profile is currently unavailable.
          </p>
        </div>
      </div>
    );
  }

  // Calculate stats
  const stats = {
    yearsInRole: gsData.yearsInRole || 0,
    achievements: gsData.achievements?.length || 0,
    coreValues: gsData.coreValues?.length || 0,
    previousRoles: gsData.previousRoles?.length || 0,
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Banner - Full Width */}
      <div className="relative overflow-hidden bg-gradient-to-r from-sky-800 via-sky-900 to-sky-800">
        <div className="absolute inset-0 bg-black/20" />
        <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-black/30 to-transparent" />
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-white/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-rose-300/20 rounded-full blur-3xl" />
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full mb-6"
            >
              
            </motion.div>
            
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
              General Secretary
            </h1>
            
            <div className="inline-flex items-center gap-3 bg-gradient-to-r from-white/20 to-white/10 backdrop-blur-sm px-6 py-3 rounded-full mb-10">
              <Award className="w-5 h-5 text-amber-300" />
              <span className="text-xl text-white font-semibold">{gsData.fullName}</span>
            </div>

          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column - Profile Card */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="lg:col-span-1"
          >
            <div className="sticky top-8">
              <div className="relative group">
                {/* Glow effect */}
                <div className="absolute -inset-0.5 bg-gradient-to-r from-red-400 to-rose-400 rounded-2xl blur opacity-20 group-hover:opacity-30 transition duration-500" />
                
                {/* Main Card */}
                <div className="relative bg-gradient-to-b from-white to-gray-50/50 rounded-2xl overflow-hidden shadow-2xl border border-gray-200 backdrop-blur-sm">
                  {/* Profile Image */}
                  <div className="relative p-6">
                    <div className="relative w-full aspect-square max-w-64 mx-auto">
                      {gsData.image ? (
                        <motion.div
                          whileHover={{ scale: 1.05 }}
                          transition={{ type: "spring", stiffness: 300 }}
                          className="w-full h-full"
                        >
                          <Image
                            src={gsData.image}
                            alt={gsData.fullName}
                            fill
                            className="rounded-2xl object-cover border-4 border-white shadow-2xl"
                            sizes="256px"
                          />
                        </motion.div>
                      ) : (
                        <div className="w-full h-full rounded-2xl bg-gradient-to-br from-red-400 to-rose-600 flex items-center justify-center text-white text-8xl font-bold shadow-2xl">
                          {gsData.fullName.charAt(0)}
                        </div>
                      )}
                      
                      {/* Badge */}
                      <div className="absolute -bottom-3 -right-3 bg-gradient-to-r from-red-500 to-rose-500 text-white px-4 py-2 rounded-full shadow-lg">
                        <div className="flex items-center gap-2 text-sm font-bold">
                          <Star className="w-4 h-4 fill-current" />
                          General Secretary
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Basic Info */}
                  <div className="px-6 pb-6 space-y-4">
                    <div className="text-center">
                      <h2 className="text-2xl font-bold text-gray-900">{gsData.fullName}</h2>
                      <p className="text-red-600 font-medium">{gsData.role}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Leadership Philosophy */}
              <div className="mt-8 bg-gradient-to-br from-red-50 to-rose-50/50 rounded-2xl p-6 border border-red-200">
                <div className="flex items-center gap-3 mb-4">
                  <Target className="w-5 h-5 text-red-600" />
                  <h3 className="font-semibold text-gray-900">Leadership Philosophy</h3>
                </div>
                <p className="text-sm text-gray-600 italic">
                  "Leadership is not about being in charge. It's about taking care of those in your charge."
                </p>
              </div>
            </div>
          </motion.div>

          {/* Right Column - Detailed Information */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-2 space-y-8"
          >
            {/* Tab Navigation */}
            <div className="flex gap-2 p-2 bg-white/50 backdrop-blur-sm rounded-2xl border border-gray-200">
              {[
                { id: "overview", label: "Overview", icon: User },
                { id: "education", label: "Education", icon: GraduationCap },
                { id: "personal", label: "Personal", icon: BookOpen }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`flex-1 flex items-center justify-center gap-3 px-4 py-3 rounded-xl transition-all ${
                    activeTab === tab.id
                      ? "bg-gradient-to-r from-red-500 to-rose-500 text-white shadow-lg"
                      : "text-gray-700 hover:bg-white/80"
                  }`}
                >
                  <tab.icon className="w-4 h-4" />
                  <span className="font-semibold text-sm">{tab.label}</span>
                </button>
              ))}
            </div>

            {/* Tab Content */}
            <div className="space-y-8">
              {/* Overview Tab */}
              {activeTab === "overview" && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-8"
                >
                  {/* Description */}
                  {gsData.description && (
                    <div className="bg-white/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-200 shadow-lg">
                      <div className="flex items-center gap-3 mb-6">
                        <Quote className="w-8 h-8 text-red-600" />
                        <h2 className="text-2xl font-bold text-gray-900">Profile Summary</h2>
                      </div>
                      <p className="text-gray-700 text-lg leading-relaxed">
                        {gsData.description}
                      </p>
                    </div>
                  )}

                  {/* Vision & Mission */}
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {gsData.vision && (
                      <div className="bg-gradient-to-br from-blue-50 to-cyan-50/50 rounded-2xl p-6 border border-blue-200">
                        <div className="flex items-center gap-3 mb-4">
                          <Globe className="w-6 h-6 text-blue-600" />
                          <h3 className="text-xl font-bold text-gray-900">Vision</h3>
                        </div>
                        <p className="text-gray-700 leading-relaxed italic">
                          "{gsData.vision}"
                        </p>
                      </div>
                    )}

                    {/* Appointed Date */}
                    {gsData.dateAppointed && (
                      <div className="bg-gradient-to-br from-amber-50 to-orange-50/50 rounded-2xl p-6 border border-amber-200">
                        <div className="flex items-center gap-3 mb-4">
                          <Calendar className="w-6 h-6 text-amber-600" />
                          <h3 className="text-xl font-bold text-gray-900">Appointed</h3>
                        </div>
                        <div className="text-3xl font-bold text-gray-900 mb-2">
                          {new Date(gsData.dateAppointed).getFullYear()}
                        </div>
                        <p className="text-gray-600">
                          Serving as General Secretary since {new Date(gsData.dateAppointed).toLocaleDateString('en-US', { 
                            month: 'long', 
                            year: 'numeric' 
                          })}
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Previous Roles */}
                  {gsData.previousRoles && gsData.previousRoles.length > 0 && (
                    <div className="bg-gradient-to-br from-gray-50 to-gray-100/50 rounded-2xl p-8 border border-gray-200">
                      <h2 className="text-2xl font-bold text-gray-900 mb-6">Previous Leadership Roles</h2>
                      <div className="space-y-4">
                        {gsData.previousRoles.map((role, index) => (
                          <motion.div
                            key={index}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="flex items-center gap-4 p-4 bg-white rounded-xl shadow-sm border border-gray-200"
                          >
                            <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-r from-red-100 to-rose-100 rounded-lg flex items-center justify-center">
                              <Briefcase className="w-5 h-5 text-red-600" />
                            </div>
                            <div className="flex-1">
                              <div className="font-semibold text-gray-900">{role}</div>
                              <div className="text-sm text-gray-500">Leadership Experience</div>
                            </div>
                            <ChevronRight className="w-5 h-5 text-gray-400" />
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  )}
                </motion.div>
              )}

              {/* Leadership Tab */}
              {activeTab === "leadership" && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-8"
                >
                  

                  
                </motion.div>
              )}

              {/* Education Tab */}
              {activeTab === "education" && gsData.education && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-6"
                >
                  <div className="bg-white/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-200 shadow-lg">
                    <div className="flex items-center gap-3 mb-6">
                      <GraduationCap className="w-8 h-8 text-blue-600" />
                      <h2 className="text-2xl font-bold text-gray-900">Educational Background</h2>
                    </div>
                    <div className="prose prose-lg max-w-none">
                      <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                        {gsData.education}
                      </p>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Personal Tab */}
              {activeTab === "personal" && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-8"
                >
                  {gsData.personal && (
                    <div className="bg-gradient-to-br from-purple-50/50 to-pink-50/30 rounded-2xl p-8 border border-purple-200">
                      <div className="flex items-center gap-3 mb-6">
                        <User className="w-8 h-8 text-purple-600" />
                        <h2 className="text-2xl font-bold text-gray-900">Personal Insights</h2>
                      </div>
                      <div className="prose prose-lg max-w-none">
                        <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                          {gsData.personal}
                        </p>
                      </div>
                    </div>
                  )}

                </motion.div>
              )}
            </div>

            {/* Leadership Quote */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-red-800 to-rose-800 p-8 shadow-2xl"
            >
              <div className="absolute top-0 right-0 w-40 h-40 bg-white/5 rounded-full blur-3xl" />
              <Quote className="absolute bottom-4 right-4 w-16 h-16 text-white/10" />
              
              <div className="relative z-10">
                <div className="text-white/80 text-lg leading-relaxed mb-4">
                  "True leadership is not about wielding authority but about empowering others, 
                  creating opportunities, and building a legacy that inspires generations to come."
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-r from-white to-white/80 flex items-center justify-center">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-r from-red-500 to-rose-600 flex items-center justify-center">
                      <Flag className="w-4 h-4 text-white" />
                    </div>
                  </div>
                  <div>
                    <div className="text-white font-semibold">{gsData.fullName}</div>
                    <div className="text-white/60 text-sm">General Secretary</div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
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
  Quote
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
}

export default function GeneralSecretaryPage() {
  const [gsData, setGsData] = useState<GeneralSecretary | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<"overview" | "education" | "personal">("overview");

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
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-slate-50 to-blue-50/30">
        <div className="text-center">
          <div className="relative">
            <div className="w-16 h-16 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
            <Shield className="w-8 h-8 text-blue-600 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
          </div>
          <p className="mt-6 text-lg text-slate-600 font-medium">Loading leadership profile...</p>
        </div>
      </div>
    );
  }

  if (!gsData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-slate-50 to-blue-50/30">
        <div className="text-center max-w-md p-8">
          <Shield className="w-20 h-20 text-slate-300 mx-auto mb-6" />
          <h2 className="text-2xl font-bold text-slate-800 mb-3">Profile Not Found</h2>
          <p className="text-slate-600 mb-6">
            The General Secretary profile is currently unavailable.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-blue-50/30">
      {/* Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-300/10 rounded-full blur-3xl" />
        <div className="absolute top-1/2 -left-40 w-80 h-80 bg-blue-300/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 right-1/4 w-80 h-80 bg-indigo-300/10 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 bg-gradient-to-r from-sky-600/10 to-sky-500/10 px-6 py-3 rounded-full border border-blue-200/50 mb-6"
          >
            <Shield className="w-5 h-5 text-blue-600" />
            <span className="text-sm font-semibold text-blue-700">General Secretary</span>
          </motion.div>
          
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-6xl font-bold mb-6"
          >
            <span className="bg-gradient-to-r from-sky-600 via-sky-800 to-sky-700 bg-clip-text text-transparent">
              {gsData.fullName}
            </span>
          </motion.h1>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full backdrop-blur-sm"
          >
            <Award className="w-5 h-5 text-amber-500" />
            <span className="text-xl font-semibold text-sky-800">{gsData.role}</span>
          </motion.div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column - Profile Card */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="lg:col-span-1"
          >
            <div className="sticky top-8">
              <div className="relative group">
                {/* Glow effect */}
                <div className="absolute -inset-1 bg-gradient-to-r from-blue-400 to-purple-400 rounded-3xl blur opacity-20 group-hover:opacity-30 transition duration-500" />
                
                {/* Main Card */}
                <div className="relative bg-gradient-to-b from-white to-slate-50/50 rounded-2xl overflow-hidden shadow-2xl border border-slate-200/50 backdrop-blur-sm">
                  {/* Decorative Top */}
                  <div className="h-32 bg-gradient-to-r from-sky-800/90 via-sky-900 to-sky-800 relative">
                    <div className="absolute inset-0 bg-[radial-gradient(#000_1px,transparent_1px)] [background-size:16px_16px] opacity-5" />
                    <div className="absolute top-4 right-4">
                      <Sparkles className="w-8 h-8 text-red-400/60" />
                    </div>
                  </div>

                  {/* Profile Image */}
                  <div className="relative px-6 -mt-20 mb-6">
                    <div className="relative w-48 h-48 mx-auto">
                      {gsData.image ? (
                        <motion.div
                          whileHover={{ scale: 1.05 }}
                          transition={{ type: "spring", stiffness: 300 }}
                        >
                          <Image
                            src={gsData.image}
                            alt={gsData.fullName}
                            fill
                            className="rounded-full object-cover border-4 border-red-500 shadow-2xl"
                            sizes="192px"
                          />
                        </motion.div>
                      ) : (
                        <div className="w-full h-full rounded-full bg-gradient-to-br from-blue-400 to-purple-600 flex items-center justify-center text-white text-6xl font-bold shadow-2xl">
                          {gsData.fullName.charAt(0)}
                        </div>
                      )}
                      
                      {/* Badge */}
                      <div className="absolute -bottom-2 -right-2 bg-gradient-to-r from-red-400 to-red-500 text-white px-4 py-2 rounded-full shadow-lg">
                        <div className="flex items-center gap-2 text-sm font-bold">
                          <Star className="w-4 h-4 fill-current" />
                          General Secretary
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Basic Info */}
                  <div className="px-6 space-y-4">
                    <div className="text-center">
                      <h2 className="text-2xl font-bold text-sky-900">{gsData.fullName}</h2>
                      <p className="text-sky-600 font-medium">{gsData.role}</p>
                    </div>

                    {/* Stats */}
                    <div className="grid grid-cols-3 gap-4 py-4 border-y border-slate-200/50">
                      
                     
                    </div>

                    {/* Contact Info */}
                    <div className="space-y-3">
                      {gsData.email && (
                        <div className="flex items-center gap-3 p-3 bg-slate-100/50 rounded-xl">
                          <Mail className="w-5 h-5 text-blue-600" />
                          <div>
                            <div className="text-sm text-slate-500">Email</div>
                            <div className="font-medium text-slate-900">{gsData.email}</div>
                          </div>
                        </div>
                      )}

                      {gsData.phone && (
                        <div className="flex items-center gap-3 p-3 bg-slate-100/50 rounded-xl">
                          <Phone className="w-5 h-5 text-green-600" />
                          <div>
                            <div className="text-sm text-slate-500">Phone</div>
                            <div className="font-medium text-slate-900">{gsData.phone}</div>
                          </div>
                        </div>
                      )}

                      {gsData.location && (
                        <div className="flex items-center gap-3 p-3 bg-slate-100/50 rounded-xl">
                          <MapPin className="w-5 h-5 text-red-600" />
                          <div>
                            <div className="text-sm text-slate-500">Location</div>
                            <div className="font-medium text-slate-900">{gsData.location}</div>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Social Links */}
                    {(gsData.linkedin || gsData.twitter) && (
                      <div className="pt-4 border-t border-slate-200/50">
                        <div className="text-sm font-medium text-slate-700 mb-3">Connect</div>
                        <div className="flex gap-3">
                          {gsData.linkedin && (
                            <a
                              href={gsData.linkedin}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-blue-100 hover:bg-blue-200 text-blue-700 rounded-xl transition-colors"
                            >
                              <Linkedin className="w-5 h-5" />
                              <span className="font-medium">LinkedIn</span>
                            </a>
                          )}
                          {gsData.twitter && (
                            <a
                              href={gsData.twitter}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-sky-100 hover:bg-sky-200 text-sky-700 rounded-xl transition-colors"
                            >
                              <Twitter className="w-5 h-5" />
                              <span className="font-medium">Twitter</span>
                            </a>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Column - Detailed Information */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="lg:col-span-2 space-y-8"
          >
            {/* Tab Navigation */}
            <div className="flex gap-2 p-2 bg-white/50 backdrop-blur-sm rounded-2xl border border-slate-200/50">
              {[
                { id: "overview", label: "Overview", icon: User },
                { id: "education", label: "Education", icon: GraduationCap },
                { id: "personal", label: "Personal", icon: BookOpen }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`flex-1 flex items-center justify-center gap-3 px-6 py-4 rounded-xl transition-all ${
                    activeTab === tab.id
                      ? "bg-gradient-to-r from-sky-500 to-sky-600 text-white shadow-lg"
                      : "text-slate-700 hover:bg-white/80"
                  }`}
                >
                  <tab.icon className="w-5 h-5" />
                  <span className="font-semibold">{tab.label}</span>
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
                    <div className="bg-white/50 backdrop-blur-sm rounded-2xl p-8 border border-slate-200/50 shadow-lg">
                      <div className="flex items-center gap-3 mb-6">
                        <Quote className="w-8 h-8 text-blue-500" />
                        <h2 className="text-2xl font-bold text-sky-900">Profile Summary</h2>
                      </div>
                      <p className="text-slate-700 text-lg leading-relaxed">
                        {gsData.description}
                      </p>
                    </div>
                  )}

                  {/* Vision */}
                  {gsData.vision && (
                    <div className="bg-gradient-to-br from-blue-50 to-purple-50/50 rounded-2xl p-8 border border-blue-200/50">
                      <div className="flex items-center gap-3 mb-6">
                        <Globe className="w-8 h-8 text-blue-600" />
                        <h2 className="text-2xl font-bold text-slate-900">Vision & Mission</h2>
                      </div>
                      <p className="text-slate-700 text-lg leading-relaxed italic">
                        "{gsData.vision}"
                      </p>
                    </div>
                  )}

                  {/* Core Values */}
                  {gsData.coreValues && gsData.coreValues.length > 0 && (
                    <div className="bg-white/50 backdrop-blur-sm rounded-2xl p-8 border border-slate-200/50">
                      <h2 className="text-2xl font-bold text-slate-900 mb-6">Core Values</h2>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {gsData.coreValues.map((value, index) => (
                          <motion.div
                            key={index}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="flex items-center gap-4 p-4 bg-white rounded-xl shadow-sm border border-slate-200/50"
                          >
                            <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-r from-blue-100 to-purple-100 rounded-lg flex items-center justify-center">
                              <Shield className="w-6 h-6 text-blue-600" />
                            </div>
                            <div>
                              <div className="font-semibold text-slate-900">{value}</div>
                              <div className="text-sm text-slate-500">Guiding Principle</div>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Achievements */}
                  {gsData.achievements && gsData.achievements.length > 0 && (
                    <div className="bg-gradient-to-br from-amber-50/50 to-orange-50/30 rounded-2xl p-8 border border-amber-200/50">
                      <h2 className="text-2xl font-bold text-slate-900 mb-6">Notable Achievements</h2>
                      <div className="space-y-4">
                        {gsData.achievements.map((achievement, index) => (
                          <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="flex items-start gap-4"
                          >
                            <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-r from-amber-400 to-orange-500 rounded-full flex items-center justify-center mt-1">
                              <Award className="w-4 h-4 text-white" />
                            </div>
                            <p className="text-slate-700">{achievement}</p>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  )}
                </motion.div>
              )}

              {/* Education Tab */}
              {activeTab === "education" && gsData.education && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-6"
                >
                  <div className="bg-white/50 backdrop-blur-sm rounded-2xl p-8 border border-slate-200/50 shadow-lg">
                    <div className="flex items-center gap-3 mb-6">
                      <GraduationCap className="w-8 h-8 text-blue-600" />
                      <h2 className="text-2xl font-bold text-slate-900">Educational Background</h2>
                    </div>
                    <div className="prose prose-lg max-w-none">
                      <p className="text-slate-700 leading-relaxed whitespace-pre-line">
                        {gsData.education}
                      </p>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Personal Tab */}
              {activeTab === "personal" && gsData.personal && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-6"
                >
                  <div className="bg-gradient-to-br from-purple-50/50 to-pink-50/30 rounded-2xl p-8 border border-purple-200/50">
                    <div className="flex items-center gap-3 mb-6">
                      <User className="w-8 h-8 text-purple-600" />
                      <h2 className="text-2xl font-bold text-slate-900">Personal Insights</h2>
                    </div>
                    <div className="prose prose-lg max-w-none">
                      <p className="text-slate-700 leading-relaxed whitespace-pre-line">
                        {gsData.personal}
                      </p>
                    </div>
                  </div>
                </motion.div>
              )}
            </div>

            {/* Leadership Quote */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-sky-900 to-sky-800 p-8 shadow-2xl"
            >
              <div className="absolute top-0 right-0 w-40 h-40 bg-white/5 rounded-full blur-3xl" />
              <Quote className="absolute bottom-4 right-4 w-16 h-16 text-white/10" />
              
              <div className="relative z-10">
                <div className="text-white/80 text-lg leading-relaxed mb-4">
                  "True leadership is about empowering others, creating opportunities, 
                  and building a legacy that inspires generations to come."
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-r from-red-500 to-red-600" />
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
"use client";

import { useState, useEffect, useMemo } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { 
  Camera, 
  Video, 
  Mic, 
  PenTool, 
  Sparkles, 
  Users, 
  Target,
  Award,
  TrendingUp,
  Zap,
  Globe,
  Heart,
  Play,
  Instagram,
  Youtube,
  Twitter,
  Facebook,
  Linkedin,
  Filter,
  Search,
  Calendar,
  Clock,
  ChevronRight,
  Star,
  Lightbulb,
  BarChart3,
  Shield,
  Coffee
} from "lucide-react";

interface TeamMember {
  _id: string;
  name: string;
  role: string;
  department: "video" | "photo" | "audio" | "design" | "writing" | "social";
  image?: string;
  bio?: string;
  expertise?: string[];
  socialLinks?: {
    instagram?: string;
    youtube?: string;
    twitter?: string;
    linkedin?: string;
  };
  yearsOfExperience?: number;
  isFeatured?: boolean;
}

interface MediaProject {
  _id: string;
  title: string;
  description: string;
  category: "video" | "photo" | "campaign" | "event";
  thumbnail?: string;
  date: string;
  views?: number;
  likes?: number;
  client?: string;
}

export default function MediaTeamPage() {
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const [projects, setProjects] = useState<MediaProject[]>([]);
  const [filteredMembers, setFilteredMembers] = useState<TeamMember[]>([]);
  const [selectedDept, setSelectedDept] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [hoveredMember, setHoveredMember] = useState<string | null>(null);
  const [activeProject, setActiveProject] = useState<number>(0);

  const fetchTeamData = async () => {
    try {
      setIsLoading(true);
      
      // Fetch team members
      const teamRes = await fetch("/api/media-team");
      const teamData = await teamRes.json();
      if (teamData.success) {
        setTeamMembers(teamData.data);
        setFilteredMembers(teamData.data);
      }
      
      // Fetch projects
      const projectsRes = await fetch("/api/media-projects");
      const projectsData = await projectsRes.json();
      if (projectsData.success) {
        setProjects(projectsData.data);
      }
    } catch (error) {
      console.error("Error fetching media team data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchTeamData();
  }, []);

  // Filter team members
  useEffect(() => {
    let result = [...teamMembers];
    
    if (selectedDept !== "all") {
      result = result.filter(member => member.department === selectedDept);
    }
    
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      result = result.filter(member =>
        member.name.toLowerCase().includes(query) ||
        member.role.toLowerCase().includes(query) ||
        member.bio?.toLowerCase().includes(query) ||
        member.expertise?.some(exp => exp.toLowerCase().includes(query))
      );
    }
    
    setFilteredMembers(result);
  }, [teamMembers, selectedDept, searchQuery]);

  const departments = useMemo(() => {
    const depts = [
      { id: "all", label: "All Departments", icon: Users, color: "gray" },
      { id: "video", label: "Video Production", icon: Video, color: "red" },
      { id: "photo", label: "Photography", icon: Camera, color: "blue" },
      { id: "audio", label: "Audio Engineering", icon: Mic, color: "purple" },
      { id: "design", label: "Graphic Design", icon: PenTool, color: "pink" },
      { id: "writing", label: "Content Writing", icon: PenTool, color: "green" },
      { id: "social", label: "Social Media", icon: Globe, color: "orange" },
    ];
    return depts;
  }, []);

  const featuredMembers = useMemo(() => {
    return teamMembers.filter(member => member.isFeatured).slice(0, 3);
  }, [teamMembers]);

  const stats = useMemo(() => {
    const totalExperience = teamMembers.reduce((sum, member) => 
      sum + (member.yearsOfExperience || 0), 0
    );
    const avgExperience = teamMembers.length > 0 
      ? Math.round(totalExperience / teamMembers.length) 
      : 0;
    
    const totalProjects = projects.length;
    const totalViews = projects.reduce((sum, project) => sum + (project.views || 0), 0);
    
    return {
      teamSize: teamMembers.length,
      departmentsCount: new Set(teamMembers.map(m => m.department)).size,
      avgExperience,
      totalProjects,
      totalViews: totalViews.toLocaleString(),
      totalExpertise: new Set(teamMembers.flatMap(m => m.expertise || [])).size,
    };
  }, [teamMembers, projects]);

  const getDepartmentColor = (department: string) => {
    switch (department) {
      case "video": return "from-red-500 to-pink-500";
      case "photo": return "from-blue-500 to-cyan-500";
      case "audio": return "from-purple-500 to-violet-500";
      case "design": return "from-pink-500 to-rose-500";
      case "writing": return "from-green-500 to-emerald-500";
      case "social": return "from-orange-500 to-amber-500";
      default: return "from-gray-500 to-gray-600";
    }
  };

  const getDepartmentIcon = (department: string) => {
    switch (department) {
      case "video": return Video;
      case "photo": return Camera;
      case "audio": return Mic;
      case "design": return PenTool;
      case "writing": return PenTool;
      case "social": return Globe;
      default: return Users;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900">
      {/* Hero Banner - Dark Theme */}
      <div className="relative overflow-hidden bg-gradient-to-r from-sky-800 via-sky-900 to-sky-900">
        <div className="absolute inset-0 bg-black/40" />
        <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-black/50 to-transparent" />
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-white/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-pink-500/20 rounded-full blur-3xl" />
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full mb-6"
            >
              <Sparkles className="w-4 h-4 text-white" />
              <span className="text-white text-sm font-medium">Creative Division</span>
            </motion.div>
            
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Media & Creative Team
            </h1>
            
            <p className="text-xl text-white/90 max-w-3xl mx-auto mb-10">
              Where creativity meets innovation. We're the storytellers, visual artists, 
              and digital architects crafting compelling narratives that captivate audiences worldwide.
            </p>
            
            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-5 gap-6 max-w-4xl mx-auto mb-10">
              <div className="text-center">
                <div className="text-3xl font-bold text-white">{stats.teamSize}</div>
                <div className="text-white/80 text-sm">Creative Minds</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-white">{stats.departmentsCount}</div>
                <div className="text-white/80 text-sm">Specialized Departments</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-white">{stats.avgExperience}+</div>
                <div className="text-white/80 text-sm">Avg Years Experience</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-white">{stats.totalProjects}</div>
                <div className="text-white/80 text-sm">Projects Completed</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-white">{stats.totalViews}</div>
                <div className="text-white/80 text-sm">Content Views</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Our Story Section */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-500/10 to-pink-500/10 px-4 py-2 rounded-full mb-6">
            <Heart className="w-4 h-4 text-purple-400" />
            <span className="text-sm font-medium text-purple-300">Our Story</span>
          </div>
          
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-8">
            Crafting Digital Experiences Since 2015
          </h2>
          
          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="text-left">
                <p className="text-lg text-gray-300 mb-6 leading-relaxed">
                  What started as a small group of passionate creatives has evolved into a 
                  powerhouse media team of 50+ specialists. We began with just a camera, 
                  a microphone, and a dream to tell compelling stories.
                </p>
                
                <p className="text-lg text-gray-300 mb-6 leading-relaxed">
                  Over the years, we've mastered the art of blending technology with creativity, 
                  pioneering innovative approaches to digital storytelling that resonate with 
                  modern audiences.
                </p>
                
                <div className="flex items-center gap-6 mt-8">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-white">1500+</div>
                    <div className="text-sm text-gray-400">Projects Delivered</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-white">98%</div>
                    <div className="text-sm text-gray-400">Client Satisfaction</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-white">50+</div>
                    <div className="text-sm text-gray-400">Industry Awards</div>
                  </div>
                </div>
              </div>
              
              <div className="relative">
                <div className="relative aspect-video rounded-2xl overflow-hidden shadow-2xl">
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 opacity-20" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Play className="w-8 h-8 text-white" />
                      </div>
                      <p className="text-white text-lg font-semibold">Watch Our Story</p>
                    </div>
                  </div>
                </div>
                
                {/* Floating Elements */}
                <div className="absolute -top-4 -left-4 w-20 h-20 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 rounded-full blur-xl" />
                <div className="absolute -bottom-4 -right-4 w-20 h-20 bg-gradient-to-r from-pink-500/20 to-rose-500/20 rounded-full blur-xl" />
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Featured Projects */}
      {projects.length > 0 && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="mb-12">
            <div className="flex items-center justify-between mb-8">
              <div>
                <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 px-4 py-2 rounded-full mb-3">
                  <Award className="w-4 h-4 text-blue-400" />
                  <span className="text-sm font-medium text-blue-300">Featured Work</span>
                </div>
                <h2 className="text-2xl font-bold text-white">Spotlight Projects</h2>
              </div>
              <button className="text-blue-400 hover:text-blue-300 font-medium flex items-center gap-2">
                <span>View All Projects</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {projects.slice(0, 3).map((project, index) => (
                <motion.div
                  key={project._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="group relative"
                >
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-2xl blur opacity-0 group-hover:opacity-30 transition duration-500" />
                  
                  <div className="relative bg-gray-800 rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 border border-gray-700">
                    {/* Thumbnail */}
                    <div className="relative h-48 bg-gradient-to-r from-gray-900 to-gray-800">
                      {project.thumbnail ? (
                        <Image
                          src={project.thumbnail}
                          alt={project.title}
                          fill
                          className="object-cover opacity-60"
                        />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-r from-blue-900/30 to-cyan-900/30" />
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                      <div className="absolute top-4 left-4">
                        <span className="px-3 py-1 bg-black/50 backdrop-blur-sm rounded-full text-xs font-medium text-white">
                          {project.category}
                        </span>
                      </div>
                    </div>
                    
                    {/* Content */}
                    <div className="p-6">
                      <h3 className="text-xl font-bold text-white mb-3 group-hover:text-blue-400 transition-colors">
                        {project.title}
                      </h3>
                      
                      <p className="text-gray-400 text-sm mb-4 line-clamp-2">
                        {project.description}
                      </p>
                      
                      <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center gap-4 text-gray-400">
                          <span className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            {new Date(project.date).toLocaleDateString('en-US', {
                              month: 'short',
                              year: 'numeric'
                            })}
                          </span>
                          {project.views && (
                            <span className="flex items-center gap-1">
                              <BarChart3 className="w-4 h-4" />
                              {project.views.toLocaleString()}
                            </span>
                          )}
                        </div>
                        
                        {project.client && (
                          <span className="text-blue-400 font-medium">{project.client}</span>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Team Members */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Controls */}
        <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl border border-gray-700 p-6 mb-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-6">
            <div>
              <div className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-500/10 to-pink-500/10 px-4 py-2 rounded-full mb-3">
                <Users className="w-4 h-4 text-purple-400" />
                <span className="text-sm font-medium text-purple-300">Meet The Team</span>
              </div>
              <h2 className="text-2xl font-bold text-white">Our Creative Minds</h2>
            </div>
            
            {/* Search */}
            <div className="flex-1 max-w-md">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search team members by name, role, or expertise..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 bg-gray-900 border border-gray-700 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-white placeholder-gray-500"
                />
              </div>
            </div>
          </div>
          
          {/* Department Filters */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Filter className="w-4 h-4 text-gray-400" />
              <span className="text-sm font-medium text-gray-300">Filter by Department</span>
            </div>
            <div className="flex flex-wrap gap-3">
              {departments.map((dept) => {
                const Icon = dept.icon;
                return (
                  <button
                    key={dept.id}
                    onClick={() => setSelectedDept(dept.id)}
                    className={`group relative px-5 py-2.5 rounded-xl font-medium transition-all ${
                      selectedDept === dept.id
                        ? "text-white shadow-lg"
                        : "text-gray-300 hover:text-white bg-gray-900/50 hover:bg-gray-900 border border-gray-700"
                    }`}
                  >
                    {selectedDept === dept.id && (
                      <div className={`absolute inset-0 rounded-xl bg-gradient-to-r ${getDepartmentColor(dept.id)}`} />
                    )}
                    <span className="relative flex items-center gap-2">
                      <Icon className="w-4 h-4" />
                      {dept.label}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Loading State */}
        {isLoading ? (
          <div className="text-center py-20">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
            <p className="mt-4 text-gray-400">Loading creative team...</p>
          </div>
        ) : filteredMembers.length === 0 ? (
          <div className="text-center py-20">
            <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center">
              <Users className="w-12 h-12 text-gray-600" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-3">No team members found</h3>
            <p className="text-gray-400 mb-6">
              {searchQuery ? `No members match "${searchQuery}"` : "No members in selected department"}
            </p>
            {(searchQuery || selectedDept !== "all") && (
              <button
                onClick={() => {
                  setSearchQuery("");
                  setSelectedDept("all");
                }}
                className="px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl hover:shadow-lg transition-all"
              >
                Reset Filters
              </button>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {filteredMembers.map((member) => {
              const DepartmentIcon = getDepartmentIcon(member.department);
              return (
                <motion.div
                  key={member._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  onMouseEnter={() => setHoveredMember(member._id)}
                  onMouseLeave={() => setHoveredMember(null)}
                  className="group relative"
                >
                  <div className={`absolute -inset-0.5 bg-gradient-to-r ${getDepartmentColor(member.department)} rounded-2xl blur opacity-0 group-hover:opacity-30 transition duration-500 ${
                    hoveredMember === member._id ? "opacity-30" : ""
                  }`} />
                  
                  <div className="relative bg-gray-800 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-700">
                    {/* Header */}
                    <div className={`h-24 bg-gradient-to-r ${getDepartmentColor(member.department)} relative`}>
                      <div className="absolute inset-0 bg-black/20" />
                      {member.isFeatured && (
                        <div className="absolute top-4 right-4">
                          <span className="px-3 py-1 bg-black/50 backdrop-blur-sm rounded-full text-xs font-bold text-yellow-300 flex items-center gap-1">
                            <Star className="w-3 h-3 fill-current" />
                            Featured
                          </span>
                        </div>
                      )}
                    </div>
                    
                    {/* Profile */}
                    <div className="relative px-6 -mt-12 mb-6">
                      <div className={`relative w-24 h-24 mx-auto rounded-full border-4 border-gray-800 shadow-xl transition-transform duration-500 ${
                        hoveredMember === member._id ? "scale-110" : ""
                      }`}>
                        {member.image ? (
                          <Image
                            src={member.image}
                            alt={member.name}
                            fill
                            className="object-cover rounded-full"
                            sizes="96px"
                          />
                        ) : (
                          <div className={`w-full h-full rounded-full bg-gradient-to-r ${getDepartmentColor(member.department)} flex items-center justify-center text-white text-3xl font-bold`}>
                            {member.name.charAt(0)}
                          </div>
                        )}
                      </div>
                      
                      <div className="text-center mt-6">
                        <h3 className="text-xl font-bold text-white mb-1 group-hover:text-purple-300 transition-colors">
                          {member.name}
                        </h3>
                        <div className="flex items-center justify-center gap-2 mb-3">
                          <DepartmentIcon className="w-4 h-4 text-gray-400" />
                          <p className="text-lg font-medium text-gray-300">{member.role}</p>
                        </div>
                        
                        {/* Expertise */}
                        {member.expertise && member.expertise.length > 0 && (
                          <div className="flex flex-wrap justify-center gap-2 mb-4">
                            {member.expertise.slice(0, 3).map((skill) => (
                              <span
                                key={skill}
                                className="px-3 py-1 bg-gray-900/50 text-gray-300 rounded-full text-xs font-medium border border-gray-700"
                              >
                                {skill}
                              </span>
                            ))}
                            {member.expertise.length > 3 && (
                              <span className="px-2 py-1 bg-gray-900 text-gray-500 rounded-full text-xs">
                                +{member.expertise.length - 3}
                              </span>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                    
                    {/* Bio */}
                    {member.bio && (
                      <div className="px-6 mb-6">
                        <p className="text-gray-400 text-sm text-center line-clamp-3 leading-relaxed">
                          {member.bio}
                        </p>
                      </div>
                    )}
                    
                    {/* Stats & Social */}
                    <div className="px-6 pb-6">
                      <div className="flex items-center justify-between mb-4">
                        {member.yearsOfExperience && (
                          <div className="text-center">
                            <div className="text-lg font-bold text-white">{member.yearsOfExperience}</div>
                            <div className="text-xs text-gray-400">Years</div>
                          </div>
                        )}
                        
                        {member.socialLinks && (
                          <div className="flex items-center gap-2">
                            {member.socialLinks.instagram && (
                              <a
                                href={member.socialLinks.instagram}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-2 hover:bg-gray-700 rounded-lg transition-colors"
                              >
                                <Instagram className="w-4 h-4 text-pink-400" />
                              </a>
                            )}
                            {member.socialLinks.youtube && (
                              <a
                                href={member.socialLinks.youtube}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-2 hover:bg-gray-700 rounded-lg transition-colors"
                              >
                                <Youtube className="w-4 h-4 text-red-400" />
                              </a>
                            )}
                            {member.socialLinks.linkedin && (
                              <a
                                href={member.socialLinks.linkedin}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-2 hover:bg-gray-700 rounded-lg transition-colors"
                              >
                                <Linkedin className="w-4 h-4 text-blue-400" />
                              </a>
                            )}
                          </div>
                        )}
                      </div>
                      
                      <div className={`h-1 bg-gradient-to-r ${getDepartmentColor(member.department)} transform origin-left transition-transform duration-500 ${
                        hoveredMember === member._id ? "scale-x-100" : "scale-x-0"
                      }`} />
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>

      {/* Core Values */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-500/10 to-orange-500/10 px-4 py-2 rounded-full mb-6">
            <Lightbulb className="w-4 h-4 text-amber-400" />
            <span className="text-sm font-medium text-amber-300">Our Philosophy</span>
          </div>
          
          <h2 className="text-3xl font-bold text-white mb-8">What Drives Our Creativity</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            {
              icon: Zap,
              title: "Innovation First",
              description: "We embrace cutting-edge technology and creative approaches to stay ahead of trends.",
              color: "from-blue-500 to-cyan-500"
            },
            {
              icon: Target,
              title: "Precision & Quality",
              description: "Every pixel, every frame, every word is crafted with meticulous attention to detail.",
              color: "from-green-500 to-emerald-500"
            },
            {
              icon: Heart,
              title: "Passion-Driven",
              description: "We don't just work with media – we live and breathe creative storytelling.",
              color: "from-pink-500 to-rose-500"
            },
            {
              icon: Shield,
              title: "Reliability",
              description: "Consistent delivery of exceptional results, project after project.",
              color: "from-purple-500 to-violet-500"
            }
          ].map((value, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="group"
            >
              <div className="relative h-full bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-700 hover:border-gray-600 transition-colors">
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${value.color} flex items-center justify-center mb-6`}>
                  <value.icon className="w-6 h-6 text-white" />
                </div>
                
                <h3 className="text-xl font-bold text-white mb-3">{value.title}</h3>
                <p className="text-gray-400">{value.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-gradient-to-r from-purple-900/30 to-pink-900/30 rounded-2xl p-8 md:p-12 border border-purple-700/30">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
            <div>
              <h2 className="text-3xl font-bold text-white mb-4">Ready to Create Magic Together?</h2>
              <p className="text-gray-300 max-w-2xl">
                Let's bring your vision to life with our award-winning media team. 
                Whether it's a brand campaign, documentary, or digital transformation, 
                we have the talent and passion to make it extraordinary.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <button className="group inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-2xl hover:shadow-2xl transition-all duration-300">
                <Coffee className="w-5 h-5" />
                <span className="font-semibold">Start a Project</span>
              </button>
              <button className="group inline-flex items-center gap-2 px-8 py-4 bg-white/10 backdrop-blur-sm text-white rounded-2xl hover:bg-white/20 transition-all duration-300 border border-white/20">
                <span className="font-semibold">Join Our Team</span>
                <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
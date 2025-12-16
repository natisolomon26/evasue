"use client";

import { useEffect, useState, useMemo } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { 
  Search, 
  Filter, 
  Mail, 
  Linkedin, 
  Award, 
  Sparkles, 
  Users,
  BarChart3,
  TrendingUp,
  ChevronRight,
  Globe, 
  Phone, 
  Building, 
  Calendar,
  Star,
  Shield,
  Target,
  Zap,
  ChevronLeft,
  ChevronRight as ChevronRightIcon,
  X
} from "lucide-react";

interface Staff {
  _id: string;
  fullName: string;
  role: string;
  email: string;
  image?: string;
  department?: string;
  bio?: string;
  linkedin?: string;
  phone?: string;
  yearsAtCompany?: number;
  expertise?: string[];
  order?: number;
}

export default function LeadershipPage() {
  const [staffList, setStaffList] = useState<Staff[]>([]);
  const [filteredStaff, setFilteredStaff] = useState<Staff[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDept, setSelectedDept] = useState<string>("all");
  const [isLoading, setIsLoading] = useState(true);
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);
  const [expandedBio, setExpandedBio] = useState<string | null>(null);
  const [selectedLeader, setSelectedLeader] = useState<Staff | null>(null);
  const [activeCarouselIndex, setActiveCarouselIndex] = useState(0);

  const fetchStaff = async () => {
    try {
      setIsLoading(true);
      const res = await fetch("/api/staff");
      if (!res.ok) throw new Error("Failed to fetch staff");
      const data = await res.json();
      const sortedStaff = data.data?.sort((a: Staff, b: Staff) => (a.order || 0) - (b.order || 0)) || [];
      setStaffList(sortedStaff);
      setFilteredStaff(sortedStaff);
    } catch (error) {
      console.error("Error fetching staff:", error);
      setStaffList([]);
      setFilteredStaff([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchStaff();
  }, []);

  // Filter staff
  useEffect(() => {
    let result = [...staffList];
    
    if (selectedDept !== "all") {
      result = result.filter(staff => staff.department === selectedDept);
    }
    
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      result = result.filter(staff =>
        staff.fullName.toLowerCase().includes(query) ||
        staff.role.toLowerCase().includes(query) ||
        (staff.department?.toLowerCase().includes(query) || false) ||
        (staff.bio?.toLowerCase().includes(query) || false) ||
        (staff.expertise?.some(exp => exp.toLowerCase().includes(query)) || false)
      );
    }
    
    setFilteredStaff(result);
  }, [staffList, selectedDept, searchQuery]);

  const departments = useMemo(() => {
    const depts = new Set(staffList.map(staff => staff.department).filter(Boolean));
    return ["all", ...Array.from(depts)] as string[];
  }, [staffList]);

  const featuredLeaders = useMemo(() => {
    return filteredStaff.slice(0, 3);
  }, [filteredStaff]);

  // Carousel auto-rotate
  useEffect(() => {
    if (featuredLeaders.length > 0) {
      const interval = setInterval(() => {
        setActiveCarouselIndex((prev) => 
          prev === featuredLeaders.length - 1 ? 0 : prev + 1
        );
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [featuredLeaders.length]);

  const nextCarousel = () => {
    setActiveCarouselIndex((prev) => 
      prev === featuredLeaders.length - 1 ? 0 : prev + 1
    );
  };

  const prevCarousel = () => {
    setActiveCarouselIndex((prev) => 
      prev === 0 ? featuredLeaders.length - 1 : prev - 1
    );
  };

  const stats = useMemo(() => {
    const totalYears = staffList.reduce((sum, staff) => sum + (staff.yearsAtCompany || 0), 0);
    const avgYears = staffList.length > 0 ? Math.round(totalYears / staffList.length) : 0;
    
    return {
      totalLeaders: staffList.length,
      departmentsCount: departments.length - 1,
      avgExperience: avgYears,
      totalExpertise: [...new Set(staffList.flatMap(staff => staff.expertise || []))].length,
    };
  }, [staffList, departments]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Banner - Full Width */}
      <div className="relative overflow-hidden bg-gradient-to-r from-sky-800 via-sky-900 to-sky-800">
        <div className="absolute inset-0 bg-black/20" />
        <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-black/30 to-transparent" />
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-white/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-300/20 rounded-full blur-3xl" />
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full mb-6"
            >
              <Sparkles className="w-4 h-4 text-white" />
              <span className="text-white text-sm font-medium">Leadership Team</span>
            </motion.div>
            
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Meet Our Visionary Leaders
            </h1>
            
            <p className="text-xl text-white/90 max-w-3xl mx-auto mb-10">
              Exceptional minds driving innovation and excellence across all departments with strategic vision and expertise.
            </p>
            
            
            {/* Search Bar */}
            <div className="max-w-2xl mx-auto">
              <div className="relative group">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl blur opacity-30 group-hover:opacity-50 transition duration-300" />
                <div className="relative flex items-center bg-white rounded-xl shadow-lg">
                  <Search className="w-5 h-5 text-gray-400 ml-4" />
                  <input
                    type="text"
                    placeholder="Search leaders by name, role, department, or expertise..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full px-4 py-4 bg-transparent focus:outline-none text-gray-700 placeholder-gray-400"
                  />
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery("")}
                      className="px-4 text-gray-400 hover:text-gray-600"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Department Filter */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        
                

        {/* Leadership Grid */}
        {isLoading ? (
          <div className="text-center py-20">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            <p className="mt-4 text-gray-600">Loading our leadership team...</p>
          </div>
        ) : filteredStaff.length === 0 ? (
          <div className="text-center py-20">
            <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
              <Users className="w-12 h-12 text-gray-400" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-3">No leaders found</h3>
            <p className="text-gray-600 mb-6">
              {searchQuery ? `No leaders match "${searchQuery}"` : "No leaders in selected department"}
            </p>
            {(searchQuery || selectedDept !== "all") && (
              <button
                onClick={() => {
                  setSearchQuery("");
                  setSelectedDept("all");
                }}
                className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-xl hover:shadow-lg transition-all"
              >
                Reset Filters
              </button>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredStaff.map((staff) => (
              <motion.div
                key={staff._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                onMouseEnter={() => setHoveredCard(staff._id)}
                onMouseLeave={() => setHoveredCard(null)}
                className="group relative"
              >
                <div className={`absolute -inset-0.5 bg-gradient-to-r from-sky-700 to-red-700 rounded-2xl blur opacity-0 group-hover:opacity-30 transition duration-500 ${
                  hoveredCard === staff._id ? "opacity-30" : ""
                }`} />
                
                <div className="relative h-full bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-200">
                  {/* Card Header */}
                  <div className="relative h-32 bg-gradient-to-r from-amber-500 via-amber-600 to-amber-500">
                    <div className="absolute inset-0 bg-[radial-gradient(#000_1px,transparent_1px)] [background-size:16px_16px] opacity-5" />
                    
                    {staff.department && (
                      <div className="absolute top-4 left-4">
                        <span className="px-3 py-1.5 bg-white/90 backdrop-blur-sm rounded-full text-xs font-semibold text-gray-700 shadow-sm flex items-center gap-1">
                          <Building className="w-3 h-3" />
                          {staff.department}
                        </span>
                      </div>
                    )}
                    
                    {staff.yearsAtCompany && (
                      <div className="absolute top-4 right-4">
                        <span className="px-3 py-1.5 bg-white/90 backdrop-blur-sm rounded-full text-xs font-semibold text-gray-700 shadow-sm flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          {staff.yearsAtCompany} years
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Profile */}
                  <div className="relative px-6 -mt-16 mb-6">
                    <div className={`relative w-32 h-32 mx-auto rounded-full border-4 border-white shadow-xl transition-transform duration-500 ${
                      hoveredCard === staff._id ? "scale-110" : ""
                    }`}>
                      {staff.image ? (
                        <Image
                          src={staff.image}
                          alt={staff.fullName}
                          fill
                          className="object-cover rounded-full"
                          sizes="128px"
                        />
                      ) : (
                        <div className="w-full h-full rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-white text-4xl font-bold">
                          {staff.fullName.charAt(0)}
                        </div>
                      )}
                    </div>
                    
                    <div className="text-center mt-6">
                      <h3 className="text-xl font-bold text-gray-900 mb-1 group-hover:text-blue-600 transition-colors">
                        {staff.fullName}
                      </h3>
                      <div className="flex items-center justify-center gap-2 mb-3">
                        <Award className="w-4 h-4 text-amber-500" />
                        <p className="text-lg font-medium text-gray-700">{staff.role}</p>
                      </div>
                      
                      {staff.expertise && staff.expertise.length > 0 && (
                        <div className="flex flex-wrap justify-center gap-2 mb-4">
                          {staff.expertise.slice(0, 3).map((skill) => (
                            <span
                              key={skill}
                              className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-medium"
                            >
                              {skill}
                            </span>
                          ))}
                          {staff.expertise.length > 3 && (
                            <span className="px-2 py-1 bg-gray-100 text-gray-600 rounded-full text-xs">
                              +{staff.expertise.length - 3}
                            </span>
                          )}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Bio */}
                  {staff.bio && (
                    <div className="px-6 mb-6">
                      <div
                        onClick={() => setExpandedBio(expandedBio === staff._id ? null : staff._id)}
                        className="cursor-pointer"
                      >
                        <p className={`text-gray-600 text-sm leading-relaxed transition-all ${
                          expandedBio === staff._id ? '' : 'line-clamp-3'
                        }`}>
                          {staff.bio}
                        </p>
                        {staff.bio.length > 150 && (
                          <button className="mt-2 text-blue-600 hover:text-blue-800 text-sm font-medium flex items-center gap-1">
                            {expandedBio === staff._id ? 'Show Less' : 'Read More'}
                            <ChevronRight className={`w-4 h-4 transition-transform ${
                              expandedBio === staff._id ? 'rotate-90' : ''
                            }`} />
                          </button>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Contact */}
                  <div className="px-6 pb-6">
                    <div className="grid grid-cols-2 gap-3">
                      <a
                        href={`mailto:${staff.email}`}
                        className="flex items-center justify-center gap-2 px-4 py-3 bg-gray-100 hover:bg-blue-50 text-gray-700 hover:text-blue-600 rounded-xl transition-all group/contact"
                      >
                        <Mail className="w-4 h-4" />
                        <span className="text-sm font-medium">Email</span>
                      </a>
                      
                      {staff.linkedin ? (
                        <a
                          href={staff.linkedin}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center justify-center gap-2 px-4 py-3 bg-blue-100 hover:bg-blue-200 text-blue-700 hover:text-blue-800 rounded-xl transition-all group/social"
                        >
                          <Linkedin className="w-4 h-4" />
                          <span className="text-sm font-medium">LinkedIn</span>
                        </a>
                      ) : staff.phone ? (
                        <a
                          href={`tel:${staff.phone}`}
                          className="flex items-center justify-center gap-2 px-4 py-3 bg-green-100 hover:bg-green-200 text-green-700 hover:text-green-800 rounded-xl transition-all group/contact"
                        >
                          <Phone className="w-4 h-4" />
                          <span className="text-sm font-medium">Call</span>
                        </a>
                      ) : (
                        <div className="flex items-center justify-center gap-2 px-4 py-3 bg-gray-100 text-gray-400 rounded-xl">
                          <Globe className="w-4 h-4" />
                          <span className="text-sm font-medium">Contact</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Hover Bar */}
                  <div className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 to-purple-500 transform origin-left transition-transform duration-500 ${
                    hoveredCard === staff._id ? "scale-x-100" : "scale-x-0"
                  }`} />
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
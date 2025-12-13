"use client";

import { useEffect, useState, useMemo } from "react";
import Image from "next/image";
import { Search, Filter, Mail, Linkedin, Award, ExternalLink, Sparkles, ChevronRight, Globe, Phone, Building, Calendar } from "lucide-react";

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
}

export default function LeadershipPage() {
  const [staffList, setStaffList] = useState<Staff[]>([]);
  const [filteredStaff, setFilteredStaff] = useState<Staff[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDept, setSelectedDept] = useState<string>("all");
  const [isLoading, setIsLoading] = useState(true);
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

  const fetchStaff = async () => {
    try {
      setIsLoading(true);
      const res = await fetch("/api/staff");
      if (!res.ok) throw new Error("Failed to fetch staff");
      const data = await res.json();
      setStaffList(data.data || []);
      setFilteredStaff(data.data || []);
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
        (staff.bio?.toLowerCase().includes(query) || false)
      );
    }
    
    setFilteredStaff(result);
  }, [staffList, selectedDept, searchQuery]);

  const departments = useMemo(() => {
    const depts = new Set(staffList.map(staff => staff.department).filter(Boolean));
    return ["all", ...Array.from(depts)] as string[];
  }, [staffList]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50/30 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Hero Header with Glass Effect */}
        <div className="relative mb-16 text-center">
          <div className="absolute -top-10 -right-10 w-40 h-40 bg-purple-300/20 rounded-full blur-3xl" />
          <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-blue-300/20 rounded-full blur-3xl" />
          
          <div className="relative backdrop-blur-sm bg-white/70 rounded-3xl p-8 md:p-12 shadow-xl border border-white/50">
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded-full mb-6">
              <Sparkles className="w-4 h-4" />
              <span className="text-sm font-medium">Leadership Team</span>
            </div>
            
            <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-slate-900 via-blue-900 to-slate-900 bg-clip-text text-transparent">
              Meet Our Leaders
            </h1>
            
            <p className="text-xl text-slate-600 max-w-3xl mx-auto mb-8">
              Visionary minds shaping the future with innovation, expertise, and unwavering commitment to excellence.
            </p>
            
            {/* Search Bar */}
            <div className="max-w-2xl mx-auto">
              <div className="relative group">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl blur opacity-30 group-hover:opacity-50 transition duration-300" />
                <div className="relative flex items-center bg-white rounded-xl shadow-lg">
                  <Search className="w-5 h-5 text-slate-400 ml-4" />
                  <input
                    type="text"
                    placeholder="Search leaders by name, role, or expertise..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full px-4 py-4 bg-transparent focus:outline-none text-slate-700 placeholder-slate-400"
                  />
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery("")}
                      className="px-4 text-slate-400 hover:text-slate-600"
                    >
                      Clear
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Department Filter */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-slate-800">Filter by Department</h2>
            <span className="text-slate-500">{filteredStaff.length} leaders</span>
          </div>
          <div className="flex flex-wrap gap-3">
            {departments.map((dept) => (
              <button
                key={dept}
                onClick={() => setSelectedDept(dept)}
                className={`group relative px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
                  selectedDept === dept
                    ? "text-white shadow-lg"
                    : "text-slate-700 hover:text-slate-900 bg-white/80 hover:bg-white"
                }`}
              >
                {selectedDept === dept && (
                  <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-500 to-purple-500" />
                )}
                <span className="relative flex items-center gap-2">
                  {dept === "all" ? "All Departments" : dept}
                  <span className={`text-sm ${
                    selectedDept === dept ? "text-white/80" : "text-slate-400"
                  }`}>
                    ({dept === "all" ? staffList.length : staffList.filter(s => s.department === dept).length})
                  </span>
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Loading State */}
        {isLoading ? (
          <div className="text-center py-20">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            <p className="mt-4 text-slate-600">Loading our amazing team...</p>
          </div>
        ) : (
          <>
            {/* Empty State */}
            {filteredStaff.length === 0 ? (
              <div className="text-center py-20">
                <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center">
                  <Search className="w-12 h-12 text-blue-500" />
                </div>
                <h3 className="text-2xl font-bold text-slate-800 mb-3">No results found</h3>
                <p className="text-slate-600 mb-6">
                  {searchQuery ? `No leaders match "${searchQuery}"` : "No leaders in selected department"}
                </p>
                <button
                  onClick={() => {
                    setSearchQuery("");
                    setSelectedDept("all");
                  }}
                  className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-xl hover:shadow-lg transition-all"
                >
                  Reset Filters
                </button>
              </div>
            ) : (
              /* Enhanced Cards Grid */
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredStaff.map((staff) => (
                  <div
                    key={staff._id}
                    onMouseEnter={() => setHoveredCard(staff._id)}
                    onMouseLeave={() => setHoveredCard(null)}
                    className="group relative"
                  >
                    {/* Glow effect */}
                    <div className={`absolute -inset-0.5 bg-gradient-to-r from-sky-600 to-sky-700 rounded-2xl blur opacity-0 group-hover:opacity-30 transition duration-500 ${
                      hoveredCard === staff._id ? "opacity-30" : ""
                    }`} />
                    
                    <div className="relative h-full bg-gradient-to-b from-white to-slate-50/50 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 border border-slate-200/50">
                      
                      {/* Card Header with Gradient */}
                      <div className="relative h-32 bg-gradient-to-r from-sky-700/80 via-sky-800/80 to-sky-700/80">
                        {/* Pattern overlay */}
                        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px]" />
                        
                        {/* Department Badge */}
                        {staff.department && (
                          <div className="absolute top-4 left-4">
                            <span className="px-3 py-1.5 bg-white/90 backdrop-blur-sm rounded-full text-xs font-semibold text-slate-700 shadow-sm flex items-center gap-1">
                              <Building className="w-3 h-3" />
                              {staff.department}
                            </span>
                          </div>
                        )}
                        
                        {/* Experience Badge */}
                        {staff.yearsAtCompany && (
                          <div className="absolute top-4 right-4">
                            <span className="px-3 py-1.5 bg-white/90 backdrop-blur-sm rounded-full text-xs font-semibold text-slate-700 shadow-sm flex items-center gap-1">
                              <Calendar className="w-3 h-3" />
                              {staff.yearsAtCompany} years
                            </span>
                          </div>
                        )}
                      </div>

                      {/* Profile Section */}
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
                          {/* Online status indicator */}
                          <div className="absolute bottom-3 right-3 w-4 h-4 bg-green-500 rounded-full border-2 border-white" />
                        </div>
                        
                        {/* Name and Role */}
                        <div className="text-center mt-6">
                          <h3 className="text-2xl font-bold text-slate-900 mb-1 group-hover:text-blue-600 transition-colors">
                            {staff.fullName}
                          </h3>
                          <div className="flex items-center justify-center gap-2 mb-3">
                            <Award className="w-4 h-4 text-amber-500" />
                            <p className="text-lg font-medium text-slate-700">{staff.role}</p>
                          </div>
                          
                          {/* Expertise Tags */}
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
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Bio */}
                      {staff.bio && (
                        <div className="px-6 mb-6">
                          <p className="text-slate-600 text-center line-clamp-3 leading-relaxed">
                            {staff.bio}
                          </p>
                        </div>
                      )}

                      {/* Contact & Social */}
                      <div className="px-6 pb-6">
                        <div className="grid grid-cols-2 gap-3">
                          <a
                            href={`mailto:${staff.email}`}
                            className="flex items-center justify-center gap-2 px-4 py-3 bg-slate-100 hover:bg-blue-50 text-slate-700 hover:text-blue-600 rounded-xl transition-all group/contact"
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
                            <div className="flex items-center justify-center gap-2 px-4 py-3 bg-slate-100 text-slate-400 rounded-xl">
                              <Globe className="w-4 h-4" />
                              <span className="text-sm font-medium">Contact</span>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Hover Reveal Bottom Bar */}
                      <div className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 to-purple-500 transform origin-left transition-transform duration-500 ${
                        hoveredCard === staff._id ? "scale-x-100" : "scale-x-0"
                      }`} />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        )}

        {/* Footer CTA */}
        
      </div>
    </div>
  );
}
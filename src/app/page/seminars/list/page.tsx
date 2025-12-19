"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { 
  Calendar, 
  MapPin, 
  Users, 
  Search, 
  Filter, 
  BookOpen,
  X,
  Clock,
  Award,
  ChevronRight
} from "lucide-react";
import SeminarRegistrationModal from "@/components/seminars/SeminarRegistrationModal";

interface Seminar {
  _id: string;
  title: string;
  description?: string;
  date: string;
  location: string;
  instructor: string;
  instructorTitle?: string;
  capacity: number;
  currentRegistrations: number;
  isOpen: boolean;
  category?: string;
  price?: number;
  duration?: string;
  tags?: string[];
  featured?: boolean;
}

export default function SeminarsPage() {
  const [seminars, setSeminars] = useState<Seminar[]>([]);
  const [filteredSeminars, setFilteredSeminars] = useState<Seminar[]>([]);
  const [selectedSeminar, setSelectedSeminar] = useState<Seminar | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [isLoading, setIsLoading] = useState(true);
  const [sortBy, setSortBy] = useState<"date" | "popularity" | "seats">("date");

  const fetchSeminars = async () => {
    try {
      setIsLoading(true);
      const res = await fetch('/api/seminars?isOpen=true');
      if (!res.ok) throw new Error('Failed to fetch seminars');
      const data = await res.json();
      setSeminars(data.data);
      setFilteredSeminars(data.data);
    } catch (error) {
      console.error('Error fetching seminars:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchSeminars();
  }, []);

  // Filter and sort seminars
  useEffect(() => {
    let result = [...seminars];
    
    // Apply category filter
    if (selectedCategory !== "all") {
      result = result.filter(seminar => seminar.category === selectedCategory);
    }
    
    // Apply search filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      result = result.filter(seminar =>
        seminar.title.toLowerCase().includes(query) ||
        seminar.description?.toLowerCase().includes(query) ||
        seminar.instructor.toLowerCase().includes(query) ||
        seminar.location.toLowerCase().includes(query) ||
        seminar.tags?.some(tag => tag.toLowerCase().includes(query))
      );
    }
    
    // Apply sorting
    result.sort((a, b) => {
      switch (sortBy) {
        case "date":
          return new Date(a.date).getTime() - new Date(b.date).getTime();
        case "popularity":
          return (b.currentRegistrations / b.capacity) - (a.currentRegistrations / a.capacity);
        case "seats":
          return (a.capacity - a.currentRegistrations) - (b.capacity - b.currentRegistrations);
        default:
          return 0;
      }
    });
    
    setFilteredSeminars(result);
  }, [seminars, selectedCategory, searchQuery, sortBy]);

  // Get unique categories
  const categories = ["all", ...new Set(seminars.map(s => s.category).filter(Boolean)) as string[]];

  // Calculate statistics for banner
  const stats = {
    totalSeminars: seminars.length,
    upcomingSeminars: seminars.filter(s => new Date(s.date) > new Date()).length,
    totalSeats: seminars.reduce((sum, s) => sum + (s.capacity - s.currentRegistrations), 0),
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Clean Banner */}
      <div className="relative overflow-hidden bg-gradient-to-r from-sky-800 to-sky-900">
        <div className="absolute inset-0 bg-black/20" />
        <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-black/30 to-transparent" />
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Professional Seminars
            </h1>
            
            <p className="text-xl text-white/90 max-w-2xl mx-auto mb-8">
              Expand your knowledge with expert-led seminars and workshops
            </p>
            
            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 max-w-md mx-auto">
              <div className="text-center">
                <div className="text-2xl font-bold text-white">{stats.totalSeminars}</div>
                <div className="text-white/80 text-sm">Seminars</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-white">{stats.upcomingSeminars}</div>
                <div className="text-white/80 text-sm">Upcoming</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-white">{stats.totalSeats}</div>
                <div className="text-white/80 text-sm">Seats Available</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search and Filter Section */}
        <div className="mb-8 space-y-4">
          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search seminars by title, instructor, or location..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white transition-colors"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                <X className="w-5 h-5" />
              </button>
            )}
          </div>

          {/* Filters Row */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            {/* Category Filter */}
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-lg font-medium transition-all ${
                    selectedCategory === category
                      ? "bg-blue-600 text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  {category === "all" ? "All" : category}
                </button>
              ))}
            </div>

            {/* Sort Dropdown */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
            >
              <option value="date">Sort by: Date</option>
              <option value="popularity">Sort by: Popularity</option>
              <option value="seats">Sort by: Available Seats</option>
            </select>
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-6 text-sm text-gray-600">
          {filteredSeminars.length} seminar{filteredSeminars.length !== 1 ? 's' : ''} found
          {searchQuery && ` for "${searchQuery}"`}
          {selectedCategory !== "all" && ` in ${selectedCategory}`}
        </div>

        {/* Loading State */}
        {isLoading ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            <p className="mt-4 text-gray-600">Loading seminars...</p>
          </div>
        ) : filteredSeminars.length === 0 ? (
          <div className="text-center py-12">
            <BookOpen className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No seminars found</h3>
            <p className="text-gray-600 mb-4">
              {searchQuery 
                ? `No seminars match "${searchQuery}"`
                : "No seminars available in the selected category"}
            </p>
            {(searchQuery || selectedCategory !== "all") && (
              <button
                onClick={() => {
                  setSearchQuery("");
                  setSelectedCategory("all");
                }}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Reset Filters
              </button>
            )}
          </div>
        ) : (
          /* Seminars Grid */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredSeminars.map((seminar) => (
              <motion.div
                key={seminar._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="group bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden"
              >
                {/* Card Header */}
                <div className="p-6 border-b border-gray-100">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        {seminar.category && (
                          <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs font-medium rounded">
                            {seminar.category}
                          </span>
                        )}
                        {seminar.featured && (
                          <span className="px-2 py-1 bg-amber-100 text-amber-700 text-xs font-medium rounded">
                            Featured
                          </span>
                        )}
                      </div>
                      <h3 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-2">
                        {seminar.title}
                      </h3>
                    </div>
                  </div>
                  
                  {seminar.description && (
                    <p className="text-gray-600 text-sm line-clamp-2 mb-4">
                      {seminar.description}
                    </p>
                  )}
                </div>
                
                {/* Card Details */}
                <div className="p-6">
                  <div className="space-y-3">
                    {/* Date & Time */}
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Calendar className="w-4 h-4" />
                      <span>{formatDate(seminar.date)}</span>
                      <span className="text-gray-400">•</span>
                      <Clock className="w-4 h-4" />
                      <span>{formatTime(seminar.date)}</span>
                    </div>
                    
                    {/* Location */}
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <MapPin className="w-4 h-4" />
                      <span>{seminar.location}</span>
                    </div>
                    
                    {/* Instructor */}
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Award className="w-4 h-4" />
                      <span>{seminar.instructor}</span>
                    </div>
                    
                    {/* Duration & Price */}
                    <div className="flex items-center justify-between text-sm">
                      {seminar.duration && (
                        <span className="text-gray-600">{seminar.duration}</span>
                      )}
                      {seminar.price !== undefined && (
                        <span className="font-semibold text-gray-900">
                          {seminar.price > 0 ? `$${seminar.price}` : 'Free'}
                        </span>
                      )}
                    </div>
                    
                    {/* Seats Progress */}
                    <div className="pt-3 border-t border-gray-100">
                      <div className="flex items-center justify-between text-xs mb-2">
                        <span className="text-gray-600">
                          {seminar.capacity - seminar.currentRegistrations} of {seminar.capacity} seats available
                        </span>
                        <span className="font-medium">
                          {Math.round((seminar.currentRegistrations / seminar.capacity) * 100)}% full
                        </span>
                      </div>
                      <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div 
                          className={`h-full rounded-full transition-all ${
                            (seminar.currentRegistrations / seminar.capacity) > 0.8
                              ? "bg-red-500"
                              : (seminar.currentRegistrations / seminar.capacity) > 0.5
                              ? "bg-amber-500"
                              : "bg-green-500"
                          }`}
                          style={{ width: `${(seminar.currentRegistrations / seminar.capacity) * 100}%` }}
                        />
                      </div>
                    </div>
                    
                    {/* Register Button */}
                    <button
                      onClick={() => setSelectedSeminar(seminar)}
                      disabled={!seminar.isOpen || seminar.currentRegistrations >= seminar.capacity}
                      className={`w-full mt-4 py-3 rounded-lg font-medium transition-all flex items-center justify-center gap-2 ${
                        seminar.currentRegistrations >= seminar.capacity
                          ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                          : seminar.isOpen
                          ? "bg-sky-800 text-white hover:bg-sky-900"
                          : "bg-gray-200 text-gray-500 cursor-not-allowed"
                      }`}
                    >
                      {seminar.currentRegistrations >= seminar.capacity ? (
                        "Sold Out"
                      ) : seminar.isOpen ? (
                        <>
                          <span>Register Now</span>
                          <ChevronRight className="w-4 h-4" />
                        </>
                      ) : (
                        "Registration Closed"
                      )}
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {/* Registration Modal */}
      {selectedSeminar && (
        <SeminarRegistrationModal
          seminar={selectedSeminar}
          onClose={() => setSelectedSeminar(null)}
          onSuccess={() => {
            setSelectedSeminar(null);
            fetchSeminars();
          }}
        />
      )}
    </div>
  );
}
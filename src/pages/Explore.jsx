import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import MainLayout from "../components/layout/MainLayout";
import HeroSection from "../components/layout/HeroSection";
import Tracker from "../context/TrackerContext";
import CourseCard from "../components/streams/CourseCard";
import ViewDetails from "../components/coursePage/ViewDetails";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { BookOpen, Target, Landmark, Filter, ChevronDown } from "lucide-react";
import StreamHeroSection from "../components/streams/StreamHeroSection";
import TrackerMini from "../components/tracker/TrackerMini";
import { useSearch } from "../context/SearchContext";
import { useTracker } from "../context/TrackerContext";
import MargaLoader from "../components/Loader";

export default function Explore() {
  const { id } = useParams();
  const { searchQuery, setSearchQuery } = useSearch();
  const { addStep } = useTracker();

  const [selectedStream, setSelectedStream] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [streamLoaded, setStreamLoaded] = useState(false);
  const [coursesLoaded, setCoursesLoaded] = useState(false);
  // const [loading, setLoading] = useState(true);
  const ITEMS_PER_PAGE = 9;

  useEffect(() => {
  fetch(`http://localhost:5000/api/streams/${id}`)
    .then((res) => res.json())
    .then((data) => {
      setSelectedStream(data);
      setStreamLoaded(true);
    });
}, [id]);

  const [courses, setCourses] = useState([]);

  useEffect(() => {
  fetch("http://localhost:5000/api/courses")
    .then((res) => res.json())
    .then((data) => {
      setCourses(data);
      setCoursesLoaded(true);
    });
}, []);

const loading = !streamLoaded || !coursesLoaded;

  useEffect(() => {
    if (searchQuery) {
      setSelectedCluster("all"); // reset cluster when searching
    }
  }, [searchQuery]);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery]);

  

  const [activeTab, setActiveTab] = useState("courses");
  const [selectedCluster, setSelectedCluster] = useState("all");
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  const handleClick = (courseId) => {
    navigate(`/explore/${id}/${courseId}`);
  };

  const tabs = [
    { id: "courses", label: "Explore Courses", icon: BookOpen },
    { id: "careers", label: "Career Orbits", icon: Target },
    { id: "colleges", label: "Top Institutes", icon: Landmark },
  ];

  const filteredCourses = courses.filter(
    (course) => course.streams?.includes(id) && course.levelFilter === "ug",
  );

  const query = searchQuery.toLowerCase();

  const searchFilteredCourses = filteredCourses.filter(
    (course) =>
      course.name?.toLowerCase().includes(query) ||
      course.tags?.some((tag) => tag.toLowerCase().includes(query)) ||
      course.cluster?.toLowerCase().includes(query),
  );

  const filteredByClusterCourses = filteredCourses.filter(
    (course) => selectedCluster === "all" || course.cluster === selectedCluster,
  );

  const isSearching = searchQuery.trim() !== "";

  const finalCourses = isSearching
    ? searchFilteredCourses
    : filteredByClusterCourses;

  const totalPages = Math.ceil(finalCourses.length / ITEMS_PER_PAGE);

  const paginatedCourses = finalCourses.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE,
  );

  const scienceClusters = [
    "Software",
    "Engineering",
    "Medical",
    "Science",
    "Design",
    "Management",
    "Law",
    "Defence",
    "Aviation",
  ];

  const artsClusters = [...scienceClusters];
  const commerceClusters = [...scienceClusters];

  const clustersByStream = {
    science: scienceClusters,
    arts: artsClusters,
    commerce: commerceClusters,
  };

  const handleViewDetails = (course) => {
    setSelectedCourse(course);
  };

  function handleCloseModal() {
    setShowModal(false);
    setSelectedCourse(null);
  }

  if (selectedCourse) {
    return (
      <AnimatePresence>
        {selectedCourse && (
          <div className="fixed inset-0 z-[999] bg-[#000807] overflow-y-auto">
            {/* 🔥 OPTIONAL GLOW BACKGROUND */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-cyan-500/10 blur-[140px] rounded-full" />

              <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-emerald-500/10 blur-[140px] rounded-full" />
            </div>

            {/* 🔥 CONTENT */}
            <div className="relative z-10 min-h-screen">
              <ViewDetails
                selectedCourse={selectedCourse}
                handleCloseModal={handleCloseModal}
              />
            </div>
          </div>
        )}
      </AnimatePresence>
    );
  }

  return (
    <MainLayout>
      {/* <HeroSection /> */}

      <div className="space-y-10">
        {/* <TrackerMini /> */}

        {loading && (
          <MargaLoader />
        )}

        <Tracker />

        {selectedStream && (
          <StreamHeroSection selectedStream={selectedStream} />
        )}

        <div className="relative mt-8 p-6 rounded-2xl bg-[#00FFD1]/5 border border-[#00FFD1]/20 backdrop-blur-xl">
  <div className="flex items-start gap-4">
    {/* Animated Compass Icon (Replaces AI Pulse) */}
    <div className="relative flex-shrink-0 mt-1">
      <div className="absolute inset-0 bg-[#00FFD1] blur-md opacity-20 animate-pulse" />
      <div className="w-3 h-3 rounded-full bg-[#00FFD1]" />
    </div>

    <div className="space-y-6">
      <div>
        <h3 className="text-base font-bold text-[#00FFD1] tracking-wide">
          Your Success Roadmap: How to use this page
        </h3>
        <p className="text-xs text-slate-400 mt-1">
          Currently viewing: <span className="text-white font-semibold">PUC Graduation Pathways</span>
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        
        {/* Step 1: Context */}
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#00FFD1]/10 text-[10px] font-bold text-[#00FFD1] border border-[#00FFD1]/20">1</span>
            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Your Journey</span>
          </div>
          <p className="text-xs text-slate-300 leading-relaxed">
            You are finishing your <span className="text-white font-medium">PUC (Pre-University)</span> level. Every course you see here is a <span className="text-white font-medium">Undergraduate (UG) Degree</span> you can join after you graduate.
          </p>
        </div>

        {/* Step 2: Clusters */}
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#00FFD1]/10 text-[10px] font-bold text-[#00FFD1] border border-[#00FFD1]/20">2</span>
            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Pick a "Cluster"</span>
          </div>
          <p className="text-xs text-slate-300 leading-relaxed">
            A <span className="text-[#00FFD1] font-medium">Cluster</span> is just a professional field. If you love technology, pick <span className="text-white">Software</span>. If you love hospitals, pick <span className="text-white">Medical</span>. This helps filter the list to only what you love.
          </p>
        </div>

        {/* Step 3: Explore & Details */}
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#00FFD1]/10 text-[10px] font-bold text-[#00FFD1] border border-[#00FFD1]/20">3</span>
            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Discover & Learn</span>
          </div>
          <p className="text-xs text-slate-300 leading-relaxed">
            Click <span className="text-white font-medium">"Explore"</span> to see a course's timeline, or use <span className="text-[#00FFD1] font-medium">"View Details"</span> to see everything about that specific degree in one place.
          </p>
        </div>

      </div>
    </div>
  </div>
</div>

        {/* 🔥 CONTROL HEADER (TAB + FILTER) */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-6 bg-white/[0.02] p-4 rounded-[28px] border border-white/5">
          {/* 🔹 TABS */}
          <div className="grid grid-cols-2 sm:flex sm:flex-wrap items-center gap-3 md:gap-4">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`group relative flex items-center gap-3 px-5 py-3 md:px-6 md:py-3.5 rounded-2xl transition-all duration-300 border ${
                  activeTab === tab.id
                    ? "bg-white/5 border-[#00FFD1]/50 text-white shadow-[0_0_20px_rgba(0,255,209,0.1)]"
                    : "bg-transparent border-white/5 text-slate-500 hover:border-white/20"
                }`}
              >
                <tab.icon
                  size={18}
                  className={
                    activeTab === tab.id
                      ? "text-[#00FFD1]"
                      : "group-hover:text-white"
                  }
                />

                <span className="text-[11px] md:text-xs font-bold uppercase tracking-wider">
                  {tab.label}
                </span>

                {activeTab === tab.id && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-8 md:w-10 h-1 bg-[#00FFD1] rounded-full shadow-[0_0_10px_#00FFD1]"
                  />
                )}
              </button>
            ))}
          </div>

          {/* 🔹 FILTER */}
          <div className="relative group w-full md:w-64">
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-[#00FFD1] pointer-events-none">
              <Filter size={16} />
            </div>

            <select
              value={selectedCluster}
              onChange={(e) => {
                setSelectedCluster(e.target.value);
                setSearchQuery("");
              }}
              className="w-full bg-[#0B0E11] text-slate-300 text-xs font-bold uppercase tracking-widest pl-12 pr-10 py-4 rounded-2xl border border-white/10 appearance-none focus:border-[#00FFD1]/50 focus:outline-none transition-all cursor-pointer "
            >
              <option value="all">All Clusters</option>
              {(clustersByStream[id] || []).map((cluster) => {
                return (
                  <option key={cluster} value={cluster}>
                    {cluster}
                  </option>
                );
              })}
            </select>

            <div className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none group-hover:text-[#00FFD1] transition-colors">
              <ChevronDown size={16} />
            </div>
          </div>
        </div>

        {/* 🔥 CONTENT */}
        {activeTab === "courses" && (
          <>
            {/* notice card for search context  */}
            {searchQuery && (
              <div className="max-w-6xl mx-auto px-4 mb-8">
                <div className="relative group inline-flex items-center">
                  {/* 1. THE GLASS PANEL BASE */}
                  <div
                    className="relative flex items-center gap-4 px-6 py-2.5 
                    bg-gradient-to-r from-[#00F2FF]/[0.08] to-transparent 
                    backdrop-blur-xl rounded-tr-2xl rounded-bl-2xl 
                    border-l-2 border-[#00F2FF] shadow-[20px_0_40px_-20px_rgba(0,242,255,0.2)]"
                  >
                    {/* 2. RADAR PULSE INDICATOR */}
                    <div className="relative flex h-3 w-3">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00F2FF] opacity-40"></span>
                      <span className="relative inline-flex rounded-full h-3 w-3 bg-[#00F2FF] shadow-[0_0_10px_#00F2FF]"></span>
                    </div>

                    {/* 3. THE CONTENT */}
                    <div className="flex flex-col">
                      <span className="text-[9px] font-black text-[#00F2FF] uppercase tracking-[0.3em] leading-none mb-1 opacity-80">
                        Active Filter Context
                      </span>
                      <p className="text-sm font-bold text-white/90 tracking-wide">
                        Searching within 
                        <span className="text-[#00F2FF] font-black drop-shadow-[0_0_8px_rgba(0,242,255,0.6)] capitalize">
                          {id}
                        </span> 
                        <span className="text-gray-500 font-medium">
                          stream only
                        </span>
                      </p>
                    </div>

                    {/* 4. DECORATIVE CORNER ELEMENT */}
                    <div className="absolute top-0 right-0 w-4 h-4 border-t border-r border-[#00F2FF]/40 rounded-tr-2xl"></div>
                  </div>

                  {/* 5. BOTTOM GLOW STREAK */}
                  <div className="absolute -bottom-[1px] left-0 w-full h-[1px] bg-gradient-to-r from-[#00F2FF] via-[#00F2FF]/20 to-transparent"></div>
                </div>
              </div>
            )}

            {isSearching && searchFilteredCourses.length === 0 ? (
              <div className="text-center text-gray-500 py-16 text-sm">
                No courses found for 
                <span className="text-white font-semibold">
                  "{searchQuery}"
                </span>
                <div className="mt-2 text-xs text-gray-600">
                  Try different keywords or explore clusters
                </div>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {paginatedCourses.map((course) => (
                    <CourseCard
                      key={course._id}
                      course={course}
                      handleViewDetails={handleViewDetails}
                      handleClick={handleClick}
                      addStep={addStep}
                    />
                  ))}
                </div>
                <div className="flex justify-center items-center gap-6 mt-12 pb-10">
                  {/* PREVIOUS BUTTON */}
                  <button
                    disabled={currentPage === 1}
                    onClick={() => setCurrentPage((prev) => prev - 1)}
                    className="group relative px-6 py-2 bg-[#00F2FF]/[0.03] border border-[#00F2FF]/20 rounded-md transition-all duration-300 hover:border-[#00F2FF] hover:bg-[#00F2FF]/10 disabled:opacity-20 disabled:pointer-events-none"
                  >
                    <div className="flex items-center gap-2">
                      <svg
                        className="w-3 h-3 text-[#00F2FF]"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="3"
                          d="M15 19l-7-7 7-7"
                        />
                      </svg>
                      <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-gray-400 group-hover:text-white">
                        Prev
                      </span>
                    </div>
                    {/* Corner Accent */}
                    <div className="absolute -top-[1px] -left-[1px] w-2 h-2 border-t border-l border-[#00F2FF] rounded-tl-sm opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  </button>

                  {/* PAGE INDICATOR */}
                  <div className="relative px-4 py-1.5 bg-white/[0.02] border-x border-white/10 flex items-baseline gap-2">
                    <span className="text-[9px] uppercase tracking-widest text-[#00F2FF]/50 font-black">
                      Sector
                    </span>
                    <div className="flex items-baseline gap-1">
                      <span className="text-lg font-black text-white leading-none tracking-tighter">
                        {currentPage.toString().padStart(2, "0")}
                      </span>
                      <span className="text-[10px] text-gray-600 font-bold">
                        / {totalPages.toString().padStart(2, "0")}
                      </span>
                    </div>
                    {/* Subtle Glow Background */}
                    <div className="absolute inset-0 bg-[#00F2FF]/5 blur-xl -z-10"></div>
                  </div>

                  {/* NEXT BUTTON */}
                  <button
                    disabled={currentPage === totalPages}
                    onClick={() => setCurrentPage((prev) => prev + 1)}
                    className="group relative px-6 py-2 bg-[#00F2FF]/[0.03] border border-[#00F2FF]/20 rounded-md transition-all duration-300 hover:border-[#00F2FF] hover:bg-[#00F2FF]/10 disabled:opacity-20 disabled:pointer-events-none"
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-gray-400 group-hover:text-white">
                        Next
                      </span>
                      <svg
                        className="w-3 h-3 text-[#00F2FF]"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="3"
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    </div>
                    {/* Corner Accent */}
                    <div className="absolute -bottom-[1px] -right-[1px] w-2 h-2 border-b border-r border-[#00F2FF] rounded-br-sm opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  </button>
                </div>
              </>
            )}
          </>
        )}

        {activeTab === "careers" && (
          <div className="text-center text-slate-400 py-20">
            🚀 Careers coming soon...
          </div>
        )}

        {activeTab === "colleges" && (
          <div className="text-center text-slate-400 py-20">
            🏫 Colleges data coming soon...
          </div>
        )}
      </div>
    </MainLayout>
  );
}

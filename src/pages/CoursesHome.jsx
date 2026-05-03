import { useEffect, useState } from "react";
import MainLayout from "../components/layout/MainLayout";
import { motion, AnimatePresence } from "framer-motion";
import {
  BookOpen,
  Clock,
  ArrowRight,
  ChevronRight,
  ChevronLeft,
  X,
  Search,
  Zap,
  Globe,
  Landmark,
  GraduationCap,
  Award,
  Crown,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import ViewDetails from "../components/coursePage/ViewDetails";
import HeroStreamsPage from "../components/coursePage/HeroStreamsPage";
import { useTracker } from "../context/TrackerContext";
import { useSearch } from "../context/SearchContext";

const CoursesHome = () => {
  const navigate = useNavigate();
  const { searchQuery } = useSearch();
  const { addStep } = useTracker();

  const [streams, setStreams] = useState([]);

  useEffect(() => {
    fetch("https://margaveda.onrender.com/api/streams")
      .then((res) => res.json())
      .then((data) => setStreams(data));
  }, []);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery]);

  const [selectedCourse, setSelectedCourse] = useState(null);
  const [selectedCareer, setSelectedCareer] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [open, setOpen] = useState(false);
  const [showCareerCard, setShowCareerCard] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 6;

  const priorityOrder = [
    "Science (PUC)",
    "Arts / Humanities (PUC)",
    "Commerce (PUC)",
  ];

  const orderedStreams = [...streams].sort((a, b) => {
    const aIndex = priorityOrder.indexOf(a.name);
    const bIndex = priorityOrder.indexOf(b.name);

    if (aIndex === -1 && bIndex === -1) return 0;
    if (aIndex === -1) return 1;
    if (bIndex === -1) return -1;

    return aIndex - bIndex;
  });

  const query = searchQuery.toLowerCase().trim();
  const isSearching = query.length > 0;

  // 🔥 SORT ONLY WHEN SEARCHING
  const displayedStreams = isSearching
    ? [
        ...orderedStreams.filter((s) => s.name.toLowerCase().includes(query)),
        ...orderedStreams.filter((s) => !s.name.toLowerCase().includes(query)),
      ]
    : orderedStreams;

  // Pagination Logic
  const totalPages = Math.ceil(displayedStreams.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  const currentBatch = displayedStreams.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  const hasMatches = displayedStreams.some((s) =>
    s.name.toLowerCase().includes(query),
  );

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
  };

  const handlePrev = () => {
    if (currentPage > 1) setCurrentPage((prev) => prev - 1);
  };

  function handleCloseModal() {
    setShowModal(false);
    setSelectedCourse(null);
  }

  function handleCareerCardClose() {
    setShowCareerCard(true);
    setSelectedCareer(null);
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
    <>
      <MainLayout>
        <HeroStreamsPage />

        <div className="space-y-12">
          {isSearching && (
            <div className="max-w-6xl mx-auto px-4 mb-4">
              {hasMatches ? (
                // 🔵 SCOPE MESSAGE (UNCHANGED BEAUTIFUL VERSION)
                <div className="relative overflow-hidden inline-flex items-center gap-3 px-5 py-2.5 rounded-md bg-[#00F2FF]/[0.02] border border-[#00F2FF]/10 backdrop-blur-xl">
                  <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-[#00F2FF] shadow-[0_0_12px_#00F2FF]"></div>

                  <div className="relative flex items-center justify-center h-3 w-3">
                    <div className="animate-ping absolute h-full w-full rounded-full bg-[#00F2FF] opacity-40"></div>
                    <div className="h-1.5 w-1.5 rounded-sm bg-[#00F2FF] rotate-45 shadow-[0_0_8px_#00F2FF]"></div>
                  </div>

                  <p className="text-[10px] uppercase tracking-[0.2em] font-bold text-gray-400">
                    <span className="text-[#00F2FF]/60">Current Focus:</span>
                    <span className="text-white ml-2">
                      Showing results within
                    </span>
                    <span className="text-[#00F2FF] font-black drop-shadow-[0_0_8px_rgba(0,242,255,0.5)]">
                      Streams
                    </span>
                  </p>
                  <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-[#00F2FF]/30"></div>
                </div>
              ) : (
                // 🔴 NEW BEAUTIFUL NO MATCH MESSAGE
                <div className="relative overflow-hidden inline-flex items-center gap-4 px-6 py-2.5 rounded-lg bg-[#00F2FF]/[0.03] backdrop-blur-xl border border-white/5 shadow-[0_0_30px_rgba(0,242,255,0.1)]">
                  {/* Full Cyan Accent Bar */}
                  <div className="absolute left-0 top-1/2 -translate-y-1/2 h-4 w-[2px] bg-[#00F2FF] shadow-[0_0_8px_#00F2FF]"></div>

                  {/* The Fallback Indicator (A wider soft pulse) */}
                  <div className="relative flex h-3 w-3 items-center justify-center">
                    <span className="animate-pulse absolute inline-flex h-full w-full rounded-md bg-[#00F2FF]/40"></span>
                    <span className="relative inline-flex rounded-sm h-1.5 w-1.5 bg-gray-500"></span>
                  </div>

                  <div className="flex flex-col">
                    <span className="text-[9px] font-black text-[#00F2FF] uppercase tracking-[0.3em] leading-none mb-1 opacity-70">
                      Total Stream Access:
                    </span>

                    <p className="text-sm font-medium text-gray-400">
                      No streams found for
                      <span className="text-white font-bold tracking-wide italic">
                        "{searchQuery}"
                      </span>
                      . try other keywords.
                    </p>
                  </div>
                </div>
              )}
            </div>
          )}
          {/* 1. GRID SYSTEM (Renders exactly 6 cards) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 p-4">
            <AnimatePresence mode="wait">
              {currentBatch.map((course) => (
                <motion.div
                  key={course.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  whileHover={{ y: -10, scale: 1.02 }}
                  className="group relative bg-gradient-to-b from-white/5 to-transparent backdrop-blur-2xl border border-white/10 p-7 rounded-[32px] transition-all duration-500 shadow-[0_20px_50px_rgba(0,0,0,0.5)] overflow-hidden"
                >
                  {/* TOP ICON */}
                  <div className="relative z-10 flex justify-between items-start mb-2">
                    <div className="p-3.5 rounded-2xl bg-black/40 border border-[#00FFD1]/30 group-hover:border-[#00FFD1] transition-all duration-500">
                      <BookOpen className="text-[#00FFD1]" size={22} />
                    </div>
                    <div className="px-3 py-1 rounded-full bg-[#00FFD1]/10 border border-[#00FFD1]/20">
                      <span className="text-[9px] font-black text-[#00FFD1] tracking-[0.2em] uppercase">
                        Verified Path
                      </span>
                    </div>
                  </div>

                  {/* CONTENT */}
                  <div className="relative z-10 space-y-4">
                    <h3 className="text-2xl font-black text-white leading-tight group-hover:text-[#00FFD1] transition-colors duration-300">
                      {course.name}
                    </h3>
                    <p className="text-slate-400 text-[13px] leading-relaxed line-clamp-2 font-medium">
                      {course.description}
                    </p>
                  </div>

                  {/* DATA TELEMETRY */}
                  <div className="relative z-10 grid grid-cols-2 gap-4 my-8 p-4 rounded-2xl bg-white/5 border border-white/5 group-hover:bg-[#00FFD1]/5 group-hover:border-[#00FFD1]/10 transition-all">
                    <div className="flex flex-col border-r border-white/10">
                      <span className="text-[9px] text-slate-500 uppercase tracking-[0.2em] font-black mb-1">
                        Duration
                      </span>
                      <span className="text-white text-sm font-bold flex items-center gap-2">
                        <Clock size={12} className="text-[#00FFD1]" />
                        {course.duration}
                      </span>
                    </div>
                    <div className="flex flex-col pl-2">
                      <span className="text-[9px] text-slate-500 uppercase tracking-[0.2em] font-black mb-1">
                        Eligibility
                      </span>
                      <span className="text-[#00FFD1] text-sm font-bold truncate">
                        {course.after}
                      </span>
                    </div>
                  </div>

                  {/* ACTION BUTTONS */}
                  <div className="relative z-10 flex gap-4">
                    <button
                      onClick={() => setSelectedCourse(course)}
                      className="flex-1 text-[10px] font-black py-4 rounded-xl border border-white/10 text-slate-300 hover:bg-white/10 hover:text-white transition-all uppercase tracking-[0.15em] backdrop-blur-md"
                    >
                      View Intel
                    </button>

                    <button
                      onClick={() => {
                        addStep({
                          _id: course._id,
                          title: course.name,
                        });

                        navigate(`/explore/${course._id}`);
                      }}
                      className="flex-1 text-[10px] font-black py-4 rounded-xl bg-gradient-to-r from-[#00FFD1] to-[#00E6BC] text-[#080B0D] hover:shadow-[0_0_30px_rgba(0,255,209,0.4)] transition-all active:scale-95 uppercase tracking-[0.15em] flex items-center justify-center gap-2 group/btn"
                    >
                      Explore
                      <ArrowRight
                        size={14}
                        className="group-hover/btn:translate-x-1 transition-transform"
                      />
                    </button>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* 2. CYAN BATCH TRACKER (The "Image 3" style) */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 px-6 py-8 border-t border-white/5">
            {/* Progress Stats */}
            <div className="flex flex-col">
              <span className="text-slate-500 text-[10px] font-black uppercase tracking-[0.3em] mb-1">
                Current Intelligence Batch
              </span>
              <div className="text-white font-mono text-sm">
                Showing
                <span className="text-[#00FFD1]">
                  {startIndex + 1}-{Math.min(endIndex, streams.length)}
                </span>
                of {streams.length} streams
              </div>
            </div>

            {/* Numeric Pagination (Cyan Theme) */}
            <div className="flex items-center gap-2">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                (page) => (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`w-10 h-10 rounded-xl font-black text-xs transition-all duration-300 border ${
                      currentPage === page
                        ? "bg-[#00FFD1] text-black border-[#00FFD1] shadow-[0_0_20px_rgba(0,255,209,0.3)]"
                        : "bg-white/5 text-slate-500 border-white/10 hover:border-[#00FFD1]/50 hover:text-white"
                    }`}
                  >
                    {page < 10 ? `0${page}` : page}
                  </button>
                ),
              )}
            </div>

            {/* Navigation Controls */}
            <div className="flex items-center gap-3">
              <button
                onClick={handlePrev}
                disabled={currentPage === 1}
                className={`flex items-center gap-2 px-6 py-3 rounded-xl font-black text-[10px] uppercase tracking-widest transition-all border ${
                  currentPage === 1
                    ? "opacity-20 cursor-not-allowed border-white/5 text-slate-600"
                    : "border-white/10 text-white hover:bg-white/5 active:scale-95"
                }`}
              >
                <ChevronLeft size={16} /> Prev
              </button>

              <button
                onClick={handleNext}
                disabled={currentPage === totalPages}
                className={`flex items-center gap-2 px-6 py-3 rounded-xl font-black text-[10px] uppercase tracking-widest transition-all border ${
                  currentPage === totalPages
                    ? "opacity-20 cursor-not-allowed border-white/5 text-slate-600"
                    : "bg-[#00FFD1] text-black border-[#00FFD1] hover:shadow-[0_0_25px_rgba(0,255,209,0.4)] active:scale-95"
                }`}
              >
                Next <ChevronRight size={16} />
              </button>
            </div>
          </div>
        </div>

      </MainLayout>
    </>
  );
};

export default CoursesHome;

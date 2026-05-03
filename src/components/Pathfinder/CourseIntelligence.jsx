import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Zap, Briefcase, Search, Globe, LayoutGrid, Share2, ArrowUpRight, Info, ShieldCheck, Cpu, Layers, Compass, TrendingUp,} from "lucide-react";
import CareerTree from "./CareerTree";
import { useTracker } from "../../context/TrackerContext";
import CareerCardShow from "./CareerCardShow";
import { useSearch } from "../../context/SearchContext";
import MargaLoader from "../Loader";

const CourseIntelligence = ({ handleViewDetails, careers }) => {
  const navigate = useNavigate();
  const { streamId, courseId } = useParams();
  const { searchQuery } = useSearch();
  const { addStep } = useTracker();

  const query = searchQuery.toLowerCase().trim();
  const isSearching = query !== "";

  const [selectedCareer, setSelectedCareer] = useState(null);
  const [showCareerCard, setShowCareerCard] = useState(false);
  const [viewMode, setViewMode] = useState("cards");
  const [nextCoursesDetails, setNextCoursesDetails] = useState([]);
  const [allCourses, setAllCourses] = useState([]);
  const [currentCourse, setCurrentCourse] = useState(null);

  useEffect(() => {
    if (!currentCourse || !allCourses.length) return;

    const next = (currentCourse.nextCourses || [])
      .map((id) => allCourses.find((c) => c._id === id))
      .filter(Boolean);

    setNextCoursesDetails(next);
  }, [currentCourse, allCourses]);

  // 🔥 1. Fetch ALL courses (single source of truth)
  useEffect(() => {
    fetch("https://margaveda.onrender.com/api/courses")
      .then((res) => res.json())
      .then((data) => {
        setAllCourses(data);

        // also set current course from same data
        const found = data.find((c) => c._id === courseId);
        setCurrentCourse(found);
      })
      .catch((err) => console.error(err));
  }, [courseId]);

  const filteredNextCourses = nextCoursesDetails.filter(
    (course) =>
      course.name?.toLowerCase().includes(query) ||
      course.tags?.some((tag) => tag.toLowerCase().includes(query)),
  );

  const filteredCareers = careers.filter(
    (career) =>
      career.name?.toLowerCase().includes(query) ||
      career.tags?.some((tag) => tag.toLowerCase().includes(query)) ||
      career.sector?.some((sec) => sec.toLowerCase().includes(query)),
  );

  const finalCourses =
    isSearching && viewMode === "cards"
      ? filteredNextCourses
      : nextCoursesDetails;

  // Careers → only for jobs
  const finalCareers =
    isSearching && viewMode === "jobs" ? filteredCareers : careers;

  // 🔥 2. Recursive tree builder (SAFE)
  const getCourseWithNext = (id, visited = new Set()) => {
    if (!id || visited.has(id)) return null;

    visited.add(id);

    const course = allCourses.find((c) => c._id === id);
    if (!course) return null;

    const nextCourses = (course.nextCourses || [])
      .map((nextId) => getCourseWithNext(nextId, visited))
      .filter(Boolean);

    return {
      ...course,
      nextCourses,
    };
  };

  // 🔥 3. Build full tree
  const fullTree = getCourseWithNext(courseId);

  // 🔥 4. Loading state (AFTER hooks only)
  if (!allCourses.length || !currentCourse) {
    return <MargaLoader/>;
  }

  // 🔥 5. Handlers
  function handleCareerCardClose() {
    setShowCareerCard(false);
    setSelectedCareer(null);
  }

  return (
    <div className="min-h-screen text-white selection:bg-[#00FFD1] selection:text-black z-0 mt-[100px]">
      {/* 1. HERO SECTION: THE "NEURAL COMMAND" HEADER */}
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        className="relative w-full min-h-[200px] flex items-stretch overflow-hidden rounded-[50px] bg-[#05070A] border border-white/10 shadow-[0_0_50px_rgba(0,0,0,1)]"
      >
        {/* Left Accent: The "Power Rail" */}
        <div className="w-2 md:w-4 bg-gradient-to-b from-[#00FFD1] via-[#00A3FF] to-transparent shadow-[4px_0_20px_rgba(0,255,209,0.3)]" />

        <div className="flex-1 p-8 md:p-8 flex flex-col md:flex-row gap-12 relative">
          {/* Background Decal */}
          <div className="absolute top-0 text-[12vw] sm:text-[10vw] md:text-[8vw] lg:text-[85px] font-black text-white/[0.05] uppercase select-none pointer-events-none translate-x-1/4 -translate-y-1/4 italic">
            {currentCourse.cluster}
          </div>

          {/* Identity Block */}
          <div className="relative z-10 flex-1 flex flex-col justify-center">
            <div className="inline-flex items-center gap-2 mb-6">
              <span className="w-8 h-[1px] bg-[#00FFD1]" />
              <span className="text-[#00FFD1] font-mono text-xs tracking-[0.5em] uppercase">
                {currentCourse._id}
              </span>
            </div>
            <h1 className="text-2xl md:text-2xl font-black tracking-tightest leading-none mb-8 italic">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-white/40">
                {currentCourse.name}
              </span>
            </h1>
            <div className="max-w-md p-6 bg-white/[0.03] backdrop-blur-md rounded-3xl border-l-4 border-[#00FFD1] text-slate-400 text-sm italic">
              {currentCourse.description}
            </div>
          </div>

          {/* Technical Spec Orbit */}
          <div className="relative z-10 w-full md:w-1/3 flex flex-col justify-center gap-8 py-4">
            {[
              {
                icon: <Zap size={12} />,
                label: "DURATION",
                val: currentCourse.duration,
                color: "from-cyan-500/20 to-transparent",
                shadow: "shadow-[0_0_15px_rgba(34,211,238,0.3)]",
                iconColor: "text-cyan-400",
              },
              {
                icon: <TrendingUp size={12} />,
                label: "DEMAND",
                val: currentCourse.demandTrend,
                color: "from-blue-500/20 to-transparent",
                shadow: "shadow-[0_0_15px_rgba(59,130,246,0.3)]",
                iconColor: "text-blue-400",
              },
              {
                icon: <ShieldCheck size={12} />,
                label: "ELIGIBILITY",
                val: currentCourse.after,
                color: "from-emerald-500/20 to-transparent",
                shadow: "shadow-[0_0_15px_rgba(16,185,129,0.3)]",
                iconColor: "text-emerald-400",
              },
            ].map((item, i) => (
              <div
                key={i}
                className="flex items-center gap-6 group cursor-default"
              >
                {/* Icon Container with Glassmorphism */}
                <div
                  className={`relative p-4 rounded-xl bg-white/5 border border-white/10 backdrop-blur-md transition-all duration-500 group-hover:scale-110 group-hover:border-cyan-400/50 bg-gradient-to-br ${item.color} ${item.shadow} ${item.iconColor}`}
                >
                  {/* Glow Effect behind icon */}
                  <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-40 transition-opacity duration-500 bg-cyan-400 blur-xl" />
                  <div className="relative z-10">{item.icon}</div>
                </div>

                {/* Text Section */}
                <div className="space-y-1">
                  <p className="text-[11px] font-black text-slate-400 tracking-[0.2em] uppercase opacity-70 group-hover:text-cyan-300 transition-colors">
                    {item.label}
                  </p>
                  <p className="text-base font-bold text-slate-200 tracking-wide leading-none group-hover:translate-x-1 group-hover:text-cyan-50 transition-all duration-300">
                    {item.val}
                  </p>
                  {/* Animated Underline */}
                  <div className="h-[2px] w-0 group-hover:w-full bg-gradient-to-r from-cyan-500 to-transparent transition-all duration-500 rounded-full" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* 2. MODE SWITCHER */}
      <div className="sticky top-6 flex justify-center px-4 mt-10 mb-5">
        <div className="relative flex items-center p-1.5 md:p-2 rounded-[18px] bg-white/[0.03] border border-white/10 backdrop-blur-3xl shadow-[0_20px_50px_rgba(0,0,0,0.8)] w-full max-w-[450px]">
          {/* 🔥 SLIDER (SINGLE COLOR) */}
          <div
            className="absolute top-1.5 bottom-1.5 md:top-2 md:bottom-2 rounded-[14px] bg-[#00FFD1] transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] shadow-[0_0_15px_rgba(0,255,209,0.3)]"
            style={{
              width: "calc(33.33% - 8px)",
              left:
                viewMode === "cards"
                  ? "4px"
                  : viewMode === "graph"
                    ? "33.33%"
                    : "66.66%",
              transform:
                viewMode === "graph" || viewMode === "jobs"
                  ? "translateX(4px)"
                  : "none",
            }}
          />

          {/* 🔹 BUTTON 1: CARDS */}
          <button
            onClick={() => setViewMode("cards")}
            className={`relative z-10 flex flex-1 flex-col md:flex-row items-center justify-center gap-1 md:gap-2 py-2 md:py-4 transition-all duration-300 ${
              viewMode === "cards" ? "text-black" : "text-slate-400"
            }`}
          >
            <Layers size={16} />
            <span className="text-[10px] md:text-[11px] font-bold tracking-wide">
              Cards
            </span>
          </button>

          {/* 🔹 BUTTON 2: TREE GRAPH */}
          <button
            onClick={() => setViewMode("graph")}
            className={`relative z-10 flex flex-1 flex-col md:flex-row items-center justify-center gap-1 md:gap-2 py-2 md:py-4 transition-all duration-300 ${
              viewMode === "graph" ? "text-black" : "text-slate-400"
            }`}
          >
            <Compass size={16} />
            <span className="text-[10px] md:text-[11px] font-bold tracking-wide">
              Tree Graph
            </span>
          </button>

          {/* 🔹 BUTTON 3: JOBS */}
          <button
            onClick={() => setViewMode("jobs")}
            className={`relative z-10 flex flex-1 flex-col md:flex-row items-center justify-center gap-1 md:gap-2 py-2 md:py-4 transition-all duration-300 ${
              viewMode === "jobs" ? "text-black" : "text-slate-400"
            }`}
          >
            <Briefcase size={16} />
            <span className="text-[10px] md:text-[11px] font-bold tracking-wide">
              Jobs
            </span>
          </button>
        </div>
      </div>

      {viewMode === "cards" && (
        <>
          <div className="animate-in fade-in slide-in-from-top-6 duration-700">
            {/* 1. MATRIX SYSTEM BACKGROUND (Ambient Cyan) */}
            <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
              <div className="absolute top-[15%] right-[5%] w-[400px] h-[400px] bg-[#00FFD1]/[0.02] blur-[120px] rounded-full"></div>
              <div className="absolute bottom-[20%] left-[10%] w-[300px] h-[300px] bg-[#00FFD1]/[0.01] blur-[100px] rounded-full"></div>
            </div>

            {/* 2. INSTRUCTIONAL TERMINAL */}
            <div className="relative z-10 max-w-5xl mx-auto px-6 mb-12">
              <div className="relative group p-8 rounded-[2rem] border border-white/5 bg-gradient-to-br from-white/[0.02] to-transparent backdrop-blur-md overflow-hidden">
                {/* Animated Scanning Light (Subtle) */}
                <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#00FFD1]/30 to-transparent animate-scan-horizontal"></div>

                <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
                  {/* Left: The "What" */}
                  <div className="flex-grow space-y-3">
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 rounded-full bg-[#00FFD1] shadow-[0_0_10px_#00FFD1]"></div>
                      <span className="text-[10px] font-black text-[#00FFD1] uppercase tracking-[0.4em]">
                        Course Explorer
                      </span>
                    </div>

                    <h2 className="text-3xl font-black text-white tracking-tighter uppercase">
                      Course <span className="text-[#00FFD1]">Cards</span>
                    </h2>

                    <p className="text-gray-500 text-xs md:text-sm leading-relaxed max-w-xl">
                      Each screen shows the next available courses after your
                      current course. For example, if your current course has 6
                      possible options, you will see 6 cards here — this is its
                      “next step” group. Click “Explore” on any card to move
                      forward and see the next set of options for that course.
                    </p>
                  </div>

                  {/* Right: The "How" (Brief Action Guide) */}
                  {/* Right: The "How" */}
                  <div className="flex flex-col gap-4 border-l border-white/10 pl-8">
                    <div className="flex items-center gap-4">
                      <div className="p-2 rounded-lg bg-[#00FFD1]/10 text-[#00FFD1]">
                        <ShieldCheck size={16} />
                      </div>
                      <div className="flex flex-col">
                        <span className="text-white text-[11px] font-bold uppercase tracking-tight">
                          View Details
                        </span>
                        <span className="text-gray-500 text-[9px] uppercase font-medium">
                          See full course information
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-4">
                      <div className="p-2 rounded-lg bg-white/[0.05] text-white">
                        <Search size={16} />
                      </div>
                      <div className="flex flex-col">
                        <span className="text-white text-[11px] font-bold uppercase tracking-tight">
                          Explore More
                        </span>
                        <span className="text-gray-500 text-[9px] uppercase font-medium">
                          Discover related courses
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* notice card for search context  */}
          {searchQuery && viewMode === "cards" && (
            <div className="max-w-6xl mx-auto px-4 mb-8">
              <div className="relative group inline-flex items-center">
                {/* Cyan Glass Panel */}
                <div
                  className="relative flex items-center gap-4 px-6 py-2.5 
                              bg-[#00F2FF]/[0.06] backdrop-blur-xl 
                              rounded-tr-2xl rounded-bl-2xl 
                              border-l-2 border-[#00F2FF] 
                              shadow-[20px_0_40px_-20px_rgba(0,242,255,0.2)]"
                >
                  {/* Pulsing Cyan Radar */}
                  <div className="relative flex h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00F2FF] opacity-40"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-[#00F2FF] shadow-[0_0_10px_#00F2FF]"></span>
                  </div>

                  <div className="flex flex-col">
                    <span className="text-[9px] font-black text-[#00F2FF] uppercase tracking-[0.3em] leading-none mb-1 opacity-80">
                      Academic Protocol
                    </span>
                    <p className="text-sm font-bold text-white/90 tracking-wide">
                      Searching next courses for 
                      <span className="text-[#00F2FF] font-black drop-shadow-[0_0_8px_rgba(0,242,255,0.6)]">
                        {currentCourse?.name}
                      </span>
                    </p>
                  </div>

                  {/* HUD Corner Detail */}
                  <div className="absolute top-0 right-0 w-4 h-4 border-t border-r border-[#00F2FF]/40 rounded-tr-2xl"></div>
                </div>
              </div>
            </div>
          )}

          <div className="flex flex-col gap-4">
            {isSearching && finalCourses.length === 0 ? (
              <div className="text-center text-gray-500 py-10">
                No next courses found like "{searchQuery}"
              </div>
            ) : (
              finalCourses.map((course) => (
                <div className="relative w-full p-[1px] rounded-[25px] bg-gradient-to-br from-cyan-400/20 via-transparent to-transparent group transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_10px_40px_-10px_rgba(34,211,238,0.2)]">
                  {/* Glow */}
                  <div className="absolute inset-0 rounded-[25px] bg-cyan-400/5 opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-700"></div>

                  <div className="relative bg-black/60 backdrop-blur-2xl rounded-[25px] p-4 md:p-5 overflow-hidden border border-white/5">
                    {/* LEVEL BADGE */}
                    <div className="absolute top-3 right-3 flex items-center gap-2 px-2 py-1 rounded-md border border-white/10 bg-black group-hover:border-cyan-400/30 transition-all">
                      <div className="w-2 h-2 rounded-sm bg-cyan-400 animate-pulse"></div>
                      <span className="text-[9px] font-black text-white uppercase tracking-wider">
                        {course.levelFilter}
                      </span>
                    </div>

                    {/* BACKGROUND PATTERN */}
                    <div
                      className="absolute inset-0 opacity-5 group-hover:scale-105 group-hover:opacity-10 transition-all duration-1000"
                      style={{
                        backgroundImage:
                          "repeating-linear-gradient(45deg, rgba(34,211,238,0.3) 0, rgba(34,211,238,0.3) 1px, transparent 0, transparent 50%)",
                        backgroundSize: "20px 20px",
                      }}
                    ></div>

                    <div className="relative z-10">
                      {/* ID */}
                      <p className="text-[9px] font-bold text-gray-500 uppercase mb-1">
                        {course.id}
                      </p>

                      {/* TITLE */}
                      <h3 className="text-lg md:text-xl font-extrabold text-white mb-3 group-hover:text-cyan-300 transition-colors">
                        {course.name}
                      </h3>

                      {/* META */}
                      <div className="flex flex-wrap gap-2 mb-3">
                        <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white/5 border border-white/10">
                          <div className="p-1.5 rounded-md bg-cyan-400/10 text-cyan-400">
                            {/* icon */}
                          </div>
                          <div>
                            <p className="text-[8px] uppercase text-gray-500 font-bold">
                              Focus
                            </p>
                            <p className="text-white text-xs font-semibold">
                              {course.cluster}
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white/5 border border-white/10">
                          <div className="p-1.5 rounded-md bg-cyan-400/10 text-cyan-400">
                            {/* icon */}
                          </div>
                          <div>
                            <p className="text-[8px] uppercase text-gray-500 font-bold">
                              Length
                            </p>
                            <p className="text-white text-xs font-semibold">
                              {course.duration}
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* BUTTONS */}

                      <div className="flex items-center justify-end gap-3 mt-2">
                        <button
                          className="text-[10px] font-bold text-gray-300 hover:text-white uppercase tracking-wider relative group/btn-alt"
                          onClick={() => handleViewDetails(course)}
                        >
                          View Course Intelligence
                          <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-cyan-400 group-hover/btn-alt:w-full transition-all duration-300"></div>
                        </button>

                        <button
                          className="px-4 py-2 rounded-lg bg-cyan-400 text-black font-black text-[10px] uppercase tracking-wider hover:shadow-[0_0_20px_rgba(34,211,238,0.6)] transition-all"
                          onClick={() => {
                            addStep({
                              _id: course._id,
                              title: course.name,
                            });

                            navigate(`/explore/${streamId}/${course._id}`);
                            window.scrollTo(0, 0);
                          }}
                        >
                          explore
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </>
      )}

      {viewMode === "graph" && (
        <div className="animate-in fade-in zoom-in-95 duration-700">
          {/* NEURAL SYSTEM HEADER */}
          <div className="relative mb-16 px-4 py-10 overflow-hidden">
            {/* Background Pulse Effect */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-[#00FFD1]/5 blur-[100px] rounded-full animate-pulse"></div>

            <div className="max-w-4xl mx-auto text-center relative z-10">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#00FFD1]/30 bg-[#00FFD1]/5 mb-6">
                <div className="w-1.5 h-1.5 rounded-full bg-[#00FFD1] animate-ping"></div>
                <span className="text-[10px] font-black text-[#00FFD1] uppercase tracking-[0.4em]">
                  Neural Link Established
                </span>
              </div>

              <h2 className="text-xl md:text-2xl font-bold text-white tracking-tight mb-4">
                Explore Your <span className="text-[#00FFD1]">Course Path</span> 
                With <span className="text-[#00FFD1]">Tree Structure</span>
              </h2>

              {/* GUIDANCE SYSTEM: Step-by-Step Instructions */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left border-t border-white/5 pt-8">
                {/* STEP 1 */}
                <div className="space-y-2">
                  <span className="text-[#00FFD1] font-mono text-xs">
                    01. UNDERSTAND THE MAP
                  </span>
                  <p className="text-gray-500 text-[14px] leading-relaxed">
                    This graph shows a complete path from your current course to
                    all possible next options. It starts from one course (root)
                    and expands step by step to show where you can go next.
                  </p>
                </div>

                {/* STEP 2 */}
                <div className="space-y-2">
                  <span className="text-[#00FFD1] font-mono text-xs">
                    02. EXPLORE THE PATH
                  </span>
                  <p className="text-gray-500 text-[14px] leading-relaxed">
                    Click on any course to highlight its full path from start to
                    that course. This helps you clearly see how that option fits
                    into your journey.
                  </p>
                </div>

                {/* STEP 3 */}
                <div className="space-y-2">
                  <span className="text-[#00FFD1] font-mono text-xs">
                    03. NAVIGATE & SAVE
                  </span>
                  <p className="text-gray-500 text-[14px] leading-relaxed">
                    Use zoom and drag to explore the map. If you like a path,
                    save it to your tracker and continue exploring other
                    options.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* THE NEURAL TREE COMPONENT */}
          <CareerTree courseId={courseId} />
        </div>
      )}

      {viewMode === "jobs" && (
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
          {/* TACTICAL HEADER DESIGN */}
          <div className="relative mb-12 px-4 py-8 border-y border-white/[0.03] bg-gradient-to-r from-transparent via-white/[0.01] to-transparent">
            {/* Decorative Corner Brackets */}
            <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-[#ffca28]/30 rounded-tl-lg"></div>
            <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-[#ffca28]/30 rounded-br-lg"></div>

            <div className="max-w-4xl mx-auto text-center space-y-4">
              {/* Top Status Tag */}
              <div className="flex items-center justify-center gap-2 mb-2">
                <span className="w-8 h-[1px] bg-[#ffca28]/20"></span>
                <span className="text-[10px] font-black text-[#ffca28] uppercase tracking-[0.5em]">
                  Career Options
                </span>
                <span className="w-8 h-[1px] bg-[#ffca28]/20"></span>
              </div>

              {/* The Main Narrative Title */}
              <h2 className="text-2xl md:text-4xl font-black text-white tracking-tighter leading-tight">
                What you can do after <br className="hidden md:block" />
                <span className="text-[#ffca28] italic px-2 bg-[#ffca28]/5 rounded-lg border border-[#ffca28]/10 shadow-[0_0_20px_rgba(255,202,40,0.05)]">
                  {currentCourse.name}
                </span>
              </h2>

              {/* Sub-Instruction with Terminal Glow */}
              <p className="text-gray-500 text-xs md:text-sm font-medium tracking-wide max-w-2xl mx-auto">
                Here are the possible career paths and next options available
                after this course. Click 
                <span className="text-white font-bold border-b border-[#ffca28]">
                  {" "} View Intel
                </span> 
                on any card to see salary, demand, and what skills are required.
              </p>
            </div>

            {/* Decorative Background Watermark */}
            <div className="absolute -top-4 left-1/2 -translate-x-1/2 text-[100px] font-black text-white/[0.02] select-none pointer-events-none whitespace-nowrap">
              OPPORTUNITIES
            </div>
          </div>

          {searchQuery && viewMode === "jobs" && (
            <div className="max-w-6xl mx-auto px-4 mb-8">
              <div className="relative group inline-flex items-center">
                {/* Amber Gold Glass Panel */}
                <div
                  className="relative flex items-center gap-4 px-6 py-2.5 
                              bg-[#FFBF00]/[0.06] backdrop-blur-xl 
                              rounded-tr-2xl rounded-bl-2xl 
                              border-l-2 border-[#FFBF00] 
                              shadow-[20px_0_40px_-20px_rgba(255,191,0,0.2)]"
                >
                  {/* Pulsing Amber Radar */}
                  <div className="relative flex h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#FFBF00] opacity-40"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-[#FFBF00] shadow-[0_0_10px_#FFBF00]"></span>
                  </div>

                  <div className="flex flex-col">
                    <span className="text-[9px] font-black text-[#FFBF00] uppercase tracking-[0.3em] leading-none mb-1 opacity-80">
                      Career Intelligence
                    </span>
                    <p className="text-sm font-bold text-white/90 tracking-wide">
                      Exploring career paths for 
                      <span className="text-[#FFBF00] font-black ">
                        {currentCourse?.name}
                      </span>
                    </p>
                  </div>

                  {/* HUD Corner Detail */}
                  <div className="absolute top-0 right-0 w-4 h-4 border-t border-r border-[#FFBF00]/40 rounded-tr-2xl"></div>
                </div>
              </div>
            </div>
          )}

          {/* YOUR EXISTING CARD COMPONENT */}
          {isSearching && finalCareers.length === 0 ? (
            <div className="text-center text-gray-500 py-10">
              No careers found like "{searchQuery}"
            </div>
          ) : (
            <CareerCardShow
              careers={finalCareers} 
              setSelectedCareer={setSelectedCareer}
              selectedCareer={selectedCareer}
              handleCareerCardClose={handleCareerCardClose}
            />
          )}
        </div>
      )}

    </div>
  );
};

export default CourseIntelligence;
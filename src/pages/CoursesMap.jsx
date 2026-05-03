import MapHeader from "../components/coursesMap/MapHeader";
import MainLayout from "../components/layout/MainLayout";
// import CourseNode from "../components/coursesMap/CourseNode";
import { useEffect, useState, useMemo } from "react";
import axios from "axios";
import { useTracker } from "../context/TrackerContext";
import MargaLoader from "../components/Loader";
import { ChevronLeft, ChevronRight, ArrowRight, ArrowLeft } from "lucide-react";
import React from "react";
import { Compass, Map as MapIcon, Search } from "lucide-react";
import DetailedMapView from "../components/coursesMap/DetailedMapView";

export default function CoursesMap() {
  const { tracker, setTracker, removePath } = useTracker();

  const [streams, setStreams] = useState([]);
  const [courses, setCourses] = useState([]);
  const [careers, setCareers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [startIndex, setStartIndex] = useState(0);
  const [selectedPath, setSelectedPath] = useState(null);
  const [activeTab, setActiveTab] = useState("explored");
  const [favoritePaths, setFavoritePaths] = useState([]);

  // 🔥 CHECK LOGGED USER
  const userData = localStorage.getItem("user");

  const user =
    userData && userData !== "undefined" ? JSON.parse(userData) : null;

  const paths = tracker.paths;

  // 🔹 FETCH ALL DATA (once)
  useEffect(() => {
    console.log("CoursesMap mounted");

    const fetchStreams = async () => {
      try {
        const res = await axios.get("https://margaveda.onrender.com/api/streams");

        const data = Array.isArray(res.data) ? res.data : res.data?.data || [];
        setStreams(data);
      } catch (err) {
        console.error("❌ STREAMS ERROR:", err);
      }
    };

    const fetchCourses = async () => {
      try {
        const res = await axios.get("https://margaveda.onrender.com/api/courses");

        const data = Array.isArray(res.data) ? res.data : res.data?.data || [];
        setCourses(data);
      } catch (err) {
        console.error("❌ COURSES ERROR:", err);
      }
    };

    const fetchCareers = async () => {
      try {
        const res = await axios.get("https://margaveda.onrender.com/api/jobs");

        const data = Array.isArray(res.data) ? res.data : res.data?.data || [];
        setCareers(data);
      } catch (err) {
        console.error("❌ CAREERS ERROR:", err);
      }
    };

    const loadAll = async () => {
      await fetchStreams();
      await fetchCourses();
      await fetchCareers();

      setLoading(false);
    };

    loadAll();
  }, []);

  useEffect(() => {
    const fetchSavedPaths = async () => {
      try {
        const token = localStorage.getItem("token");

        // 🔥 no login
        if (!token) return;

        const res = await axios.get("https://margaveda.onrender.com/api/auth/me", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        // 🔥 saved paths from DB
        setFavoritePaths(res.data.user.savedPaths || []);
      } catch (error) {
        console.log(error);
      }
    };

    fetchSavedPaths();
  }, []);

  // 🔥 1. CREATE FAST LOOKUP MAP (ONLY ONCE)
  const streamMap = useMemo(() => {
    const map = {};
    streams.forEach((item) => {
      map[item._id] = item;
    });
    return map;
  }, [streams]);

  const courseMap = useMemo(() => {
    const map = {};
    courses.forEach((item) => {
      map[item._id] = item;
    });
    return map;
  }, [courses]);

  const resolvedPaths = useMemo(() => {
    if (!paths || paths.length === 0) return [];

    return paths.map((path) => {
      const fullSteps = path.steps.map((step) => {
        if (step.type === "stream") {
          return streamMap[step._id] || step;
        }

        if (step.type === "course") {
          return courseMap[step._id] || step;
        }

        return step; // fallback
      });

      return {
        ...path,
        steps: fullSteps,
      };
    });
  }, [paths, streamMap, courseMap]);

  const resolvedFavoritePaths = useMemo(() => {
    if (!favoritePaths.length) return [];

    return favoritePaths.map((path) => {
      const fullSteps = path.steps
        .map((stepId) => {
          // 🔥 stream
          if (streamMap[stepId]) {
            return streamMap[stepId];
          }

          // 🔥 course
          if (courseMap[stepId]) {
            return courseMap[stepId];
          }

          return null;
        })
        .filter(Boolean);

      return {
        ...path,
        steps: fullSteps,
      };
    });
  }, [favoritePaths, streamMap, courseMap]);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsPerView, setItemsPerView] = useState(1);

  // 🔹 Handle Responsive Logic: 1 card for mobile, 3 for laptop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setItemsPerView(3);
      } else {
        setItemsPerView(1);
      }
    };

    handleResize(); // Initial check
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const loadExploredPaths = () => {
    const user = JSON.parse(localStorage.getItem("user"));

    // 🔥 guest paths
    const guestPaths = JSON.parse(localStorage.getItem("guest_tracker")) || [];

    console.log("my guest", guestPaths);

    // 🔥 logged user paths
    let userPaths = [];

    if (user) {
      userPaths = JSON.parse(localStorage.getItem(`tracker_${user._id}`)) || [];
    }

    // 🔥 combine both
    const combinedPaths = [...guestPaths, ...userPaths];

    // 🔥 remove duplicates
    const uniquePaths = [];

    combinedPaths.forEach((path) => {
      const alreadyExists = uniquePaths.find((saved) => {
        return JSON.stringify(saved.steps) === JSON.stringify(path.steps);
      });

      if (!alreadyExists) {
        uniquePaths.push(path);
      }
    });

    // 🔥 update tracker state
    setTracker(uniquePaths);

    // 🔥 also persist merged data for logged user
    if (user) {
      localStorage.setItem(`tracker_${user._id}`, JSON.stringify(uniquePaths));
    }
  };

  // 🔹 Navigation Logics
  const nextSlide = () => {
    if (currentIndex + itemsPerView < resolvedPaths.length) {
      setCurrentIndex((prev) => prev + 1);
    }
  };

  const prevSlide = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    }
  };

  const handleRemoveFavorite = async (pathId) => {
    try {
      const token = localStorage.getItem("token");

      await axios.delete("https://margaveda.onrender.com/api/auth/remove-path", {
        headers: {
          Authorization: `Bearer ${token}`,
        },

        data: {
          pathId,
        },
      });

      // 🔥 instant UI update
      setFavoritePaths((prev) => prev.filter((path) => path.id !== pathId));
    } catch (error) {
      console.log(error);
    }
  };

  if (selectedPath) {
    return (
      <DetailedMapView
        selectedPath={selectedPath}
        onClose={() => setSelectedPath(null)}
        onAuthSuccess={loadExploredPaths}
        careers={careers}
      />
    );
  }

  return (
    <>
      <MainLayout>
        {loading && <MargaLoader />}

        <div className="relative pt-10 pb-16 md:pt-28 md:pb-24 overflow-hidden">
          {/* 🔹 BACKGROUND ARCHITECTURE */}
          <div className="absolute inset-0 -z-10">
            {/* Radial Mesh Gradient */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full " />

            {/* Animated Grid Lines (CSS only) */}
            <div
              className="absolute inset-0 opacity-[0.05]"
              style={{
                backgroundImage: `linear-gradient(to right, #22d3ee 1px, transparent 1px), linear-gradient(to bottom, #22d3ee 1px, transparent 1px)`,
                backgroundSize: "60px 60px",
              }}
            />
          </div>

          <div className="max-w-7xl mx-auto px-6 relative">
            <div className="flex flex-col items-center text-center space-y-8">
              {/* 🔹 BREADCRUMB / BADGE */}
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-500/5 border border-cyan-500/20 backdrop-blur-md animate-fade-in">
                <Compass className="w-4 h-4 text-cyan-400" />
                <span className="text-[10px] font-black tracking-[0.2em] text-cyan-400 uppercase">
                  Marga Veda • Your Selected Journey
                </span>
              </div>

              {/* 🔹 MAIN TITLE */}
              <div className="space-y-4 max-w-4xl">
                <h1 className="text-4xl font-black italic text-white uppercase tracking-tighter">
                  YOUR SAVED <br />
                  <span
                    className="text-transparent"
                    style={{ WebkitTextStroke: "1px #fff" }}
                  >
                    LEARNING PATHS
                  </span>
                </h1>
                <p className="mt-6 text-sm md:text-lg text-gray-400 max-w-2xl leading-relaxed">
                  These are the course paths you explored and saved while
                  discovering different career options. Compare your paths,
                  review each step, and continue exploring the journey that
                  feels right for you.
                </p>
              </div>

              {/* 🔹 QUICK STATS / METRICS */}
              <div className="grid grid-cols-2 md:grid-cols-3 gap-8 pt-8 w-full max-w-3xl border-t border-white/5">
                <div>
                  <p className="text-[10px] font-mono text-gray-500 uppercase tracking-widest mb-1">
                    Selected Paths
                  </p>
                  <p className="text-2xl font-black text-white">
                    {activeTab === "favorites"
                      ? resolvedFavoritePaths.length
                      : resolvedPaths.length}
                  </p>
                </div>
                <div>
                  <p className="text-[10px] font-mono text-gray-500 uppercase tracking-widest mb-1">
                    Success Ratio
                  </p>
                  <p className="text-2xl font-black text-white">
                    99.2<span className="text-emerald-500">%</span>
                  </p>
                </div>
                <div className="hidden md:block">
                  <p className="text-[10px] font-mono text-gray-500 uppercase tracking-widest mb-1">
                    Sync Status
                  </p>
                  <div className="flex items-center justify-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_8px_#10b981]" />
                    <p className="text-lg font-black text-white uppercase italic">
                      Live
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 🔥 SHOW TABS ONLY FOR LOGGED USER */}
        {user && (
          <div className="flex w-full gap-4 mb-12 h-64">
            {/* Box 1: Explored Paths */}
            <div
              onClick={() => setActiveTab("explored")}
              className={`
        flex-1 relative overflow-hidden rounded-3xl cursor-pointer
        transition-all duration-500 border group
        ${
          activeTab === "explored"
            ? "bg-cyan-500/10 border-cyan-500/50 shadow-[0_0_30px_-10px_rgba(6,182,212,0.3)]"
            : "bg-white/5 border-white/10 hover:border-white/20"
        }
      `}
            >
              <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
                <span className="text-white/40 text-[10px] uppercase tracking-[0.3em] mb-2 font-bold">
                  Session History
                </span>
                <h3 className="text-xl font-black text-white mb-6 uppercase tracking-wider">
                  Explored Paths
                </h3>

                <button
                  className={`
          px-6 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all
          ${
            activeTab === "explored"
              ? "bg-cyan-500 text-black scale-105"
              : "bg-white/10 text-white/70 group-hover:bg-white/20"
          }
        `}
                >
                  View History
                </button>
              </div>
              {/* Background Accent Glow */}
              <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-cyan-500/10 blur-[50px] rounded-full" />
            </div>

            {/* Box 2: Saved Paths */}
            <div
              onClick={() => setActiveTab("favorites")}
              className={`
        flex-1 relative overflow-hidden rounded-3xl cursor-pointer
        transition-all duration-500 border group
        ${
          activeTab === "favorites"
            ? "bg-emerald-500/10 border-emerald-500/50 shadow-[0_0_30px_-10px_rgba(16,185,129,0.3)]"
            : "bg-white/5 border-white/10 hover:border-white/20"
        }
      `}
            >
              <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
                <span className="text-white/40 text-[10px] uppercase tracking-[0.3em] mb-2 font-bold">
                  Cloud Storage
                </span>
                <h3 className="text-xl font-black text-white mb-6 uppercase tracking-wider">
                  Saved Paths
                </h3>

                <button
                  className={`
          px-6 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all
          ${
            activeTab === "favorites"
              ? "bg-emerald-500 text-black scale-105"
              : "bg-white/10 text-white/70 group-hover:bg-white/20"
          }
        `}
                >
                  Access DB
                </button>
              </div>
              {/* Background Accent Glow */}
              <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-emerald-500/10 blur-[50px] rounded-full" />
            </div>
          </div>
        )}

        {user && activeTab === "explored" && (
          <div className="w-full max-w-7xl mx-auto px-4 relative group">
            <button
              onClick={prevSlide}
              disabled={currentIndex === 0}
              className="absolute left-0 top-1/2 -translate-y-1/2 z-30 p-3 rounded-full border border-cyan-500/30 bg-[#0a0a0a]/80 backdrop-blur-md text-cyan-400 hover:border-cyan-400 hover:shadow-[0_0_15px_rgba(6,182,212,0.4)] disabled:opacity-0 transition-all duration-300"
            >
              <ChevronLeft size={28} strokeWidth={2.5} />
            </button>

            <button
              onClick={nextSlide}
              disabled={currentIndex + itemsPerView >= resolvedPaths.length}
              className="absolute right-0 top-1/2 -translate-y-1/2 z-30 p-3 rounded-full border border-cyan-500/30 bg-[#0a0a0a]/80 backdrop-blur-md text-cyan-400 hover:border-cyan-400 hover:shadow-[0_0_15px_rgba(6,182,212,0.4)] disabled:opacity-0 transition-all duration-300"
            >
              <ChevronRight size={28} strokeWidth={2.5} />
            </button>

            {/* 🔹 Carousel Viewport */}
            <div className="overflow-hidden px-2 md:px-0">
              <div
                className="flex transition-transform duration-500 ease-[cubic-bezier(0.25,1,0.5,1)]"
                style={{
                  transform: `translateX(-${currentIndex * (100 / itemsPerView)}%)`,
                }}
              >
                {resolvedPaths.map((path) => (
                  <div
                    key={path._id || path.id}
                    className="flex-shrink-0 px-3 transition-all duration-500"
                    style={{ width: `${100 / itemsPerView}%` }}
                  >
                    {/* 🔹 Your Exact Card Design */}
                    <div className="relative group bg-white/[0.03] border border-white/10 rounded-[32px] p-8 transition-all duration-500 hover:border-cyan-500/50 hover:shadow-[0_0_30px_-10px_rgba(6,182,212,0.3)] flex flex-col h-[600px] justify-between">
                      {/* 🔹 Internal Scrollable Content */}
                      <div className="overflow-y-auto pr-4 custom-card-scrollbar">
                        <div className="relative space-y-8">
                          {/* The Connecting Line */}
                          <div className="absolute left-[11px] top-2 bottom-2 w-[2px] bg-gradient-to-b from-cyan-500/80 via-cyan-500/20 to-transparent" />

                          {path.steps.map((step, index) => (
                            <div
                              key={step._id || index}
                              className="relative flex items-start gap-4 group/step"
                            >
                              {/* Animated Dot */}
                              <div className="relative z-10 mt-1.5">
                                <div className="h-[24px] w-[24px] rounded-full bg-[#0a0a0a] border-2 border-cyan-500 flex items-center justify-center shadow-[0_0_10px_rgba(6,182,212,0.5)]">
                                  <div className="h-2 w-2 rounded-full bg-cyan-400 animate-pulse" />
                                </div>
                              </div>

                              {/* Content */}
                              <div className="flex-1">
                                <h4 className="text-sm font-semibold text-cyan-100/90 leading-tight">
                                  {step.name}
                                </h4>
                                {step.duration && (
                                  <span className="text-[10px] uppercase tracking-widest text-cyan-500/70">
                                    {step.duration}
                                  </span>
                                )}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* 🔹 Action Footer */}
                      <div className="mt-6 pt-6 border-t border-white/5 flex justify-between items-center">
                        <button
                          onClick={() => removePath(path.id)}
                          className="text-gray-500 hover:text-red-400 text-xs font-medium transition-colors uppercase tracking-widest"
                        >
                          Remove
                        </button>

                        <button
                          onClick={() => setSelectedPath(path)}
                          className="relative overflow-hidden group/btn px-4 md:px-6 py-2 md:py-2.5 rounded-lg md:rounded-xl bg-cyan-600/10 border border-cyan-500/50 text-cyan-400 text-[11px] md:text-sm font-bold transition-all hover:bg-cyan-500 hover:text-black"
                        >
                          <span className="relative z-10">VIEW DETAILS</span>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {user && activeTab === "favorites" && (
          <div className="w-full max-w-7xl mx-auto px-4 relative group">
            <button
              onClick={prevSlide}
              disabled={currentIndex === 0}
              className="absolute left-0 top-1/2 -translate-y-1/2 z-30 p-3 rounded-full border border-cyan-500/30 bg-[#0a0a0a]/80 backdrop-blur-md text-cyan-400 hover:border-cyan-400 hover:shadow-[0_0_15px_rgba(6,182,212,0.4)] disabled:opacity-0 transition-all duration-300"
            >
              <ChevronLeft size={28} strokeWidth={2.5} />
            </button>

            <button
              onClick={nextSlide}
              disabled={
                currentIndex + itemsPerView >= resolvedFavoritePaths.length
              }
              className="absolute right-0 top-1/2 -translate-y-1/2 z-30 p-3 rounded-full border border-cyan-500/30 bg-[#0a0a0a]/80 backdrop-blur-md text-cyan-400 hover:border-cyan-400 hover:shadow-[0_0_15px_rgba(6,182,212,0.4)] disabled:opacity-0 transition-all duration-300"
            >
              <ChevronRight size={28} strokeWidth={2.5} />
            </button>

            {/* 🔹 Carousel Viewport */}
            <div className="overflow-hidden px-2 md:px-0">
              <div
                className="flex transition-transform duration-500 ease-[cubic-bezier(0.25,1,0.5,1)]"
                style={{
                  transform: `translateX(-${currentIndex * (100 / itemsPerView)}%)`,
                }}
              >
                {resolvedFavoritePaths.map((path) => (
                  <div
                    key={path._id || path.id}
                    className="flex-shrink-0 px-3 transition-all duration-500"
                    style={{ width: `${100 / itemsPerView}%` }}
                  >
                    {/* 🔹 Your Exact Card Design */}
                    <div className="relative group bg-white/[0.03] border border-white/10 rounded-[32px] p-8 transition-all duration-500 hover:border-cyan-500/50 hover:shadow-[0_0_30px_-10px_rgba(6,182,212,0.3)] flex flex-col h-[600px] justify-between">
                      {/* 🔹 Internal Scrollable Content */}
                      <div className="overflow-y-auto pr-4 custom-card-scrollbar">
                        <div className="relative space-y-8">
                          {/* The Connecting Line */}
                          <div className="absolute left-[11px] top-2 bottom-2 w-[2px] bg-gradient-to-b from-cyan-500/80 via-cyan-500/20 to-transparent" />

                          {path.steps.map((step, index) => (
                            <div
                              key={step._id || index}
                              className="relative flex items-start gap-4 group/step"
                            >
                              {/* Animated Dot */}
                              <div className="relative z-10 mt-1.5">
                                <div className="h-[24px] w-[24px] rounded-full bg-[#0a0a0a] border-2 border-cyan-500 flex items-center justify-center shadow-[0_0_10px_rgba(6,182,212,0.5)]">
                                  <div className="h-2 w-2 rounded-full bg-cyan-400 animate-pulse" />
                                </div>
                              </div>

                              {/* Content */}
                              <div className="flex-1">
                                <h4 className="text-sm font-semibold text-cyan-100/90 leading-tight">
                                  {step.name}
                                </h4>
                                {step.duration && (
                                  <span className="text-[10px] uppercase tracking-widest text-cyan-500/70">
                                    {step.duration}
                                  </span>
                                )}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* 🔹 Action Footer */}
                      <div className="mt-6 pt-6 border-t border-white/5 flex justify-between items-center">
                        <button
                          onClick={() => handleRemoveFavorite(path.id)}
                          className="text-gray-500 hover:text-red-400 text-xs font-medium transition-colors uppercase tracking-widest"
                        >
                          Remove
                        </button>

                        <button
                          onClick={() => setSelectedPath(path)}
                          className="relative overflow-hidden group/btn px-4 md:px-6 py-2 md:py-2.5 rounded-lg md:rounded-xl bg-cyan-600/10 border border-cyan-500/50 text-cyan-400 text-[11px] md:text-sm font-bold transition-all hover:bg-cyan-500 hover:text-black"
                        >
                          <span className="relative z-10">VIEW DETAILS</span>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </MainLayout>
    </>
  );
}

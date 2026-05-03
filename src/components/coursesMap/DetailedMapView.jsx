import React, { useState, useRef } from "react";
import { ExternalLink, GraduationCap, Briefcase, TrendingUp, Landmark, ChevronRight, X, Cpu, Globe, Zap, Shield, LayoutGrid, } from "lucide-react";
import axios from "axios";
import AuthModal from "../Authentication/AuthModal";
import ViewDetails from "../coursePage/ViewDetails";
import autoTable from "jspdf-autotable";
// import marga_veda_name from "../../../public/assets/marga_veda_name.png";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

const DetailedMapView = ({ selectedPath, onClose, onAuthSuccess, careers }) => {
  if (!selectedPath) return null;

  const [showAuthPopup, setShowAuthPopup] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showPDFPreview, setShowPDFPreview] = useState(false);

  const pdfRef = useRef();

  const nodeWidth = 900;
  const gap = 120;

  const totalWidth =
    (selectedPath?.steps?.length || 0) * nodeWidth +
    ((selectedPath?.steps?.length || 1) - 1) * gap;

  const handleSavePath = async () => {
    // 🔥 get token
    const token = localStorage.getItem("token");

    // ❌ user not logged in
    if (!token) {
      setShowAuthPopup(true);
      return;
    }

    try {
      // 🔥 CLEAN PATH DATA
      const cleanedPath = {
        id: selectedPath.id,

        // store only ids
        steps: selectedPath.steps.map((step) => step._id),
      };

      // 🔥 SAVE PATH
      const response = await axios.post(
        "https://margaveda.onrender.com/api/auth/save",
        {
          path: cleanedPath,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      alert("Path saved successfully");
    } catch (error) {
      alert(
        error.response?.data?.message ||
          error.message ||
          "Something went wrong",
      );
    }
  };

  function handleCloseModal() {
    setShowModal(false);
    setSelectedCourse(null);
  }

  const handleDownloadPDF = async () => {
    const scaleWrapper = document.getElementById("pdf-preview-scale");

    scaleWrapper.style.transform = "scale(1)";

    await new Promise((resolve) => setTimeout(resolve, 300));

    const pdf = new jsPDF("p", "mm", "a4");

    const pages = document.querySelectorAll(".pdf-page");

    for (let i = 0; i < pages.length; i++) {
      const canvas = await html2canvas(pages[i], {
        scale: 3,
        useCORS: true,
        backgroundColor: "#ffffff",
      });

      const imgData = canvas.toDataURL("image/jpeg", 0.72);

      const imgWidth = 210;

      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      if (i > 0) {
        pdf.addPage();
      }

      pdf.addImage(
        imgData,
        "JPEG",
        0,
        0,
        imgWidth,
        imgHeight,
        undefined,
        "FAST",
      );
    }

    // 🔥 restore scaling
    scaleWrapper.style.transform = "";

    pdf.save("marga-veda-roadmap.pdf");
  };

  const getJobsForCourse = (courseId) => {
    return careers.filter((career) => {
      return career.education?.recommendedCourses?.includes(courseId);
    });
  };

  return (
    <>
      <div className="fixed inset-0 z-[999] bg-[#000807] flex flex-col animate-in fade-in duration-300">
        {/* 🔹 DYNAMIC BACKGROUND SYSTEM */}
        <div className="absolute inset-0 -z-10 overflow-hidden">
          {/* Subtle Grid Base */}
          <div
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage: `linear-gradient(to right, #22d3ee 1px, transparent 1px), linear-gradient(to bottom, #22d3ee 1px, transparent 1px)`,
              backgroundSize: "80px 80px",
            }}
          />
          {/* Glowing Orbs for Depth */}
          <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-cyan-500/10 blur-[120px] rounded-full" />
          <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-emerald-500/10 blur-[120px] rounded-full" />
        </div>

        {/* 🔹 TOP NAVIGATION BAR (Sticky) */}
        <header className="flex items-center justify-between px-6 md:px-12 py-6 border-b border-white/5 bg-black/40 backdrop-blur-2xl">
          <div className="flex items-center gap-6">
            <div className="relative">
              <div className="absolute -inset-2 bg-cyan-500/20 blur-lg rounded-full animate-pulse" />
              <div className="relative p-3 rounded-xl bg-cyan-950 border border-cyan-500/40">
                <Cpu className="w-6 h-6 text-cyan-400" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="h-[1px] w-4 bg-cyan-500/50" />
                <p className="text-[10px] font-mono text-cyan-500 uppercase tracking-[0.4em]">
                  Map Intelligence
                </p>
              </div>
              <h2 className="text-xl md:text-3xl font-black text-white tracking-tighter uppercase italic">
                {selectedPath.name || "Educational & Career Pathway"}
              </h2>
            </div>
          </div>

          {/* ❌ FULL SCREEN CLOSE BUTTON */}
          <button
            onClick={onClose}
            className="group flex items-center gap-3 px-4 py-2 rounded-xl border border-white/10 bg-white/5 hover:bg-red-500/10 hover:border-red-500/50 transition-all duration-300"
          >
            <span className="text-[10px] font-bold text-gray-500 group-hover:text-red-400 uppercase tracking-widest hidden md:block">
              Close Session
            </span>
            <X className="w-6 h-6 text-gray-400 group-hover:text-red-500 group-hover:rotate-90 transition-all" />
          </button>
        </header>

        {/* 🔹 MAIN CONTENT VIEWPORT */}
        <main className="flex-1 overflow-y-auto custom-detailed-scrollbar">
          <div className="w-full max-w-6xl mx-auto py-2 px-4 md:px-6">
            <div className="relative py-10 md:p-20 min-h-screen overflow-x-hidden">
              {/* 🔹 NODES LOOP */}
              <div
                className="flex flex-col items-center w-full"
                style={{
                  gap: `${gap}px`,
                }}
              >
                {selectedPath?.steps?.map((course, index) => {
                  const isLast = index === selectedPath.steps.length - 1;
                  const availableJobs = getJobsForCourse(course._id);

                  return (
                    <div
                      key={index}
                      className="relative w-full max-w-5xl mx-auto py-10 px-4 md:px-6"
                    >
                      {/* 🔹 THE CORE SYSTEM HEADER */}
                      <div className="flex flex-col items-center mb-12 md:mb-20">
                        <div className="flex items-center gap-3 mb-6">
                          <span className="h-[1px] w-8 md:w-12 bg-gradient-to-r from-transparent to-cyan-500/50" />
                          <div className="px-3 md:px-4 py-1 rounded-full border border-cyan-500/20 bg-cyan-500/5">
                            <p className="text-[9px] md:text-[10px] font-black tracking-[0.3em] md:tracking-[0.4em] text-cyan-400 uppercase italic">
                              Step {index + 1} // Learning Milestone
                            </p>
                          </div>
                          <span className="h-[1px] w-8 md:w-12 bg-gradient-to-l from-transparent to-cyan-500/50" />
                        </div>

                        <h2 className="text-2xl md:text-4xl font-light text-white tracking-[0.1em] md:tracking-[0.2em] uppercase text-center mb-8">
                          {course?.name}
                        </h2>

                        <div className="flex flex-wrap justify-center gap-4 md:gap-8 items-center text-[10px] md:text-[11px] font-medium text-gray-500 tracking-widest uppercase">
                          <div className="flex items-center gap-2">
                            <Zap size={14} className="text-cyan-500" />
                            {course?.level}
                          </div>
                          <div className="hidden md:block w-1 h-1 rounded-full bg-white/20" />
                          <div className="flex items-center gap-2">
                            Duration:{" "}
                            <span className="text-white">
                              {course?.duration}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* 🔹 DATA MODULES GRID */}
                      {/* Removed w-64 to let the grid occupy full width on mobile */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative z-10 w-full">
                        {/* Module 1: Institutions */}
                        <div className="group relative p-6 md:p-8 rounded-[24px] md:rounded-[32px] border border-[#576A8F] hover:border-cyan-500/30 transition-all duration-500 overflow-hidden bg-black/20 backdrop-blur-sm">
                          <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:opacity-10 transition-opacity hidden md:block">
                            <GraduationCap size={80} />
                          </div>

                          <h4 className="text-[10px] font-black text-cyan-500 tracking-[0.3em] uppercase mb-6 flex items-center gap-2">
                            <div className="w-1.5 h-1.5 rounded-full bg-cyan-500 animate-pulse" />
                            Top Institutions
                          </h4>

                          <div className="space-y-3 mb-8">
                            {course?.topColleges?.slice(0, 3).map((col, i) => (
                              <div
                                key={i}
                                className="text-sm font-medium text-white/70 group-hover:text-white transition-colors"
                              >
                                {col}
                              </div>
                            ))}
                          </div>

                          <button className="w-full md:w-auto flex items-center justify-between md:justify-start gap-2 text-[10px] font-black text-white/40 hover:text-cyan-400 transition-all uppercase tracking-widest group/btn">
                            Explore Colleges
                            <ChevronRight
                              size={14}
                              className="group-hover/btn:translate-x-1 transition-transform"
                            />
                          </button>
                        </div>

                        {/* Module 2: Market Opportunities */}
                        <div className="group relative p-6 md:p-8 rounded-[24px] md:rounded-[32px] border border-[#576A8F] hover:border-emerald-500/30 transition-all duration-500 overflow-hidden bg-black/20 backdrop-blur-sm">
                          <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:opacity-10 transition-opacity hidden md:block">
                            <Briefcase size={80} />
                          </div>

                          <h4 className="text-[10px] font-black text-emerald-500 tracking-[0.3em] uppercase mb-6 flex items-center gap-2">
                            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                            Job Roles
                          </h4>

                          <div className="flex flex-wrap gap-2 mb-8">
                            {availableJobs?.slice(0, 3).map((job, i) => (
                              <span
                                key={i}
                                className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-[11px] font-bold text-gray-400 italic"
                              >
                                {job.title}
                              </span>
                            ))}
                          </div>

                          <button className="w-full md:w-auto flex items-center justify-between md:justify-start gap-2 text-[10px] font-black text-white/40 hover:text-emerald-400 transition-all uppercase tracking-widest group/btn">
                            View Opportunities
                            <ChevronRight
                              size={14}
                              className="group-hover/btn:translate-x-1 transition-transform"
                            />
                          </button>
                        </div>
                      </div>

                      {/* 🔹 ACTION CENTER */}
                      <div className="mt-12 flex justify-center w-full px-4">
                        <button
                          onClick={() => setSelectedCourse(course)}
                          className="w-full md:w-auto relative px-12 py-4 rounded-xl bg-white text-black font-black text-[11px] uppercase tracking-[0.2em] hover:scale-105 transition-all shadow-[0_20px_40px_rgba(255,255,255,0.1)]"
                        >
                          Explore Course Details
                        </button>
                      </div>

                      {/* 🔹 THE REFINED CONNECTION LINE */}
                      {!isLast && (
                        <div className="absolute -bottom-32 left-1/2 -translate-x-1/2 flex flex-col items-center z-0">
                          <div className="w-[2px] h-32 bg-white/5 relative overflow-hidden rounded-full">
                            <div className="absolute top-0 left-0 w-full h-1/3 bg-gradient-to-b from-transparent via-cyan-400 to-transparent animate-data-flow" />
                            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4 h-4 bg-cyan-500/20 blur-xl rounded-full" />
                          </div>
                          <div className="relative -mt-1">
                            <div className="w-3 h-3 rounded-full border border-white/20 flex items-center justify-center animate-spin-slow">
                              <div className="w-1 h-1 bg-white rounded-full shadow-[0_0_8px_rgba(255,255,255,0.8)]" />
                            </div>
                            <div className="absolute inset-0 w-3 h-3 bg-white/40 rounded-full animate-ping opacity-20" />
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              <div className="mt-20 flex flex-col items-center text-center">
                <button
                  onClick={handleSavePath}
                  className=" fixed top-[120px] right-10 px-4 py-2 bg-cyan-500/10 border border-cyan-500/20 rounded-xl text-[10px] sm:text-xs font-black uppercase tracking-[0.2em] text-cyan-400 hover:bg-cyan-500 hover:text-black transition-all duration-300 shadow-[0_0_20px_rgba(6,182,212,0.15)] z-30 "
                >
                  Save Path to Memory
                </button>

                <button
                  onClick={() => setShowPDFPreview(true)}
                  className=" px-5 py-3 rounded-2xl bg-cyan-500 text-black font-black uppercase"
                >
                  Export PDF
                </button>
                <h3 className="text-xl md:text-2xl font-black text-white/20 uppercase italic tracking-tighter mt-10">
                  Core Roadmap Visualizer
                </h3>
                <p className="text-gray-700 font-mono text-[10px] mt-2 uppercase tracking-widest">
                  Ready for your roadmap data stream
                </p>
              </div>
            </div>
          </div>
        </main>

        {/* 🔹 SYSTEM STATUS FOOTER */}
        <footer className="px-6 md:px-12 py-4 border-t border-white/5 bg-black/60 backdrop-blur-xl flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-8">
            <div className="flex items-center gap-2">
              <Shield className="w-3 h-3 text-emerald-500" />
              <span className="text-[9px] font-mono text-gray-400 uppercase tracking-widest">
                Security: encrypted
              </span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-cyan-500 animate-ping" />
              <span className="text-[9px] font-mono text-gray-400 uppercase tracking-widest">
                Status: Data Optimized
              </span>
            </div>
          </div>

          <p className="text-[9px] font-mono text-gray-700 uppercase tracking-[0.2em]">
            Marga Darshika Intelligence Hub © 2026
          </p>
        </footer>
      </div>

      {showAuthPopup && (
        <div className="fixed inset-0 z-[999] bg-black/70 backdrop-blur-2xl flex items-center justify-center p-4">
          {/* 🔥 POPUP CARD (Immersive Glassmorph Aesthetics) */}
          <div className="relative w-full max-w-md overflow-hidden rounded-[32px] border border-cyan-500/10 bg-[#051110] shadow-[0_0_100px_rgba(6,182,212,0.15)] animate-fade-in custom-startup-border">
            {/* 🔥 DEEP DEPTH GLOW EFFECTS */}
            <div className="absolute inset-0 opacity-15 pointer-events-none -z-10">
              {/* Subtle, moving glow in the top-left */}
              <div className="absolute -top-32 -left-32 w-80 h-80 bg-cyan-500 rounded-full blur-[140px] animate-breathe" />
              {/* Subtle, warm glow in the bottom-right */}
              <div className="absolute -bottom-16 -right-16 w-80 h-80 bg-emerald-500 rounded-full blur-[140px] opacity-60" />
            </div>

            {/* 🔥 REFINED GRID BACKGROUND (More subtle) */}
            <div
              className="absolute inset-0 opacity-[0.03] pointer-events-none -z-10"
              style={{
                backgroundImage: `
            linear-gradient(#22d3ee 1px, transparent 1px),
            linear-gradient(90deg, #22d3ee 1px, transparent 1px)
          `,
                backgroundSize: "32px 32px", // Adjusted for tighter logic look
              }}
            />

            {/* 🔥 CONTENT AREA */}
            <div className="relative z-10 p-8 sm:p-10">
              {/* ❌ REFINED CLOSE BUTTON (Centered in context) */}
              <button
                onClick={() => setShowAuthPopup(false)}
                className="absolute top-6 right-6 p-2 rounded-xl border border-white/5 bg-black/40 text-gray-500 hover:text-white hover:border-red-500/40 hover:bg-red-500/10 transition-all duration-300 group"
              >
                ✕
                <span className="absolute -bottom-8 right-0 text-[9px] font-bold text-red-500 uppercase opacity-0 group-hover:opacity-100 transition-opacity">
                  Abort
                </span>
              </button>

              {/* 🔹 NEW ICON DESIGN (Layered) */}
              <div className="relative w-20 h-20 mb-8 flex items-center justify-center">
                {/* Background Glow */}
                <div className="absolute inset-0 w-full h-full rounded-3xl bg-cyan-500/10 border border-cyan-500/30 shadow-[0_0_40px_rgba(6,182,212,0.2)]" />

                {/* Decorative Outer Ring */}
                <div className="absolute inset-[-8px] w-[calc(100%+16px)] h-[calc(100%+16px)] rounded-[32px] border border-cyan-500/5 animate-spin-slow" />

                {/* The Lock Icon */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-10 h-10 text-cyan-400 relative z-10"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={1.5}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z"
                  />
                </svg>
              </div>

              {/* 🏷️ TOP LABEL (Tighter spacing) */}
              <p className="text-[10px] font-bold tracking-[0.4em] uppercase text-cyan-500 mb-2 italic">
                Intelligence Protocol // Secure
              </p>

              {/* ✍️ TITLE (Refined font weight) */}
              <h2 className="text-3xl sm:text-4xl font-light uppercase italic text-white leading-none tracking-tight mb-5">
                Archive Your <br />
                <span className="font-black text-white group-hover:text-cyan-300 transition-colors">
                  Evolution
                </span>
              </h2>

              {/* 📖 DESCRIPTION (Clearer spacing) */}
              <p className="text-sm font-medium text-gray-500 leading-relaxed mb-8 max-w-sm">
                A secure connection is required to permanently synchronize and
                access your multidimensional career roadmap. Archive your
                achievements and continue your development from any node.
              </p>

              {/* ✅ FEATURES (Cleaner list) */}
              <div className="space-y-4 mb-10 border-t border-b border-white/5 py-6">
                <div className="flex items-center gap-3.5 text-sm text-gray-300">
                  <div className="w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_10px_#06b6d4] animate-pulse" />
                  Archive unlimited career streams
                </div>
                <div className="flex items-center gap-3.5 text-sm text-gray-300 opacity-60">
                  <div className="w-2 h-2 rounded-full bg-gray-600" />
                  Resume mapping anywhere, anytime
                </div>
                <div className="flex items-center gap-3.5 text-sm text-gray-300 opacity-60">
                  <div className="w-2 h-2 rounded-full bg-gray-600" />
                  Personalized intelligence updates
                </div>
              </div>

              {/* 🔘 BUTTONS (Enhanced Micro-Interactions) */}
              <div className=" sm:grid-cols-2 gap-4">
                {/* SIGNUP */}
                <button
                  onClick={() => {
                    setShowAuthPopup(false);
                    setIsAuthOpen(true);
                  }}
                  className=" relative w-full py-4 rounded-xl border border-white/10 bg-white/5 text-white font-black text-[11px] uppercase tracking-[0.2em] hover:border-emerald-500/40 hover:bg-emerald-500/10 hover:text-emerald-300 transition-all duration-300 active:scale-95 "
                >
                  Create / login Profile
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <AuthModal
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
        onAuthSuccess={onAuthSuccess}
      />

      {selectedCourse && (
        <ViewDetails
          selectedCourse={selectedCourse}
          handleCloseModal={handleCloseModal}
        />
      )}

      {showPDFPreview && (
        <div className="fixed inset-0 z-[99999] bg-black/90 backdrop-blur-xl overflow-y-auto">
          {/* TOP BAR */}
          <div className=" sticky top-0 z-50 flex items-center justify-between px-6 py-4 border-b border-white/10 bg-black/60 backdrop-blur-xl ">
            <h2 className="text-white text-xl font-black uppercase">
              PDF Preview
            </h2>

            <div className="flex items-center gap-3">
              {/* DOWNLOAD */}
              <button
                onClick={handleDownloadPDF}
                className=" px-5 py-3 rounded-2xl bg-emerald-500 text-black font-black uppercase"
              >
                Download
              </button>

              {/* CLOSE */}
              <button
                onClick={() => setShowPDFPreview(false)}
                className=" px-5 py-3 rounded-2xl border border-white/10 text-white"
              >
                Close
              </button>
            </div>
          </div>
          gradient
          {/* PDF CONTENT */}
          <div className="py-10 flex flex-col items-center">
            <div
              id="pdf-preview-scale"
              className=" origin-top scale-[0.42] md:scale-[0.65] lg:scale-100"
            >
              <div ref={pdfRef} className=" space-y-10 ">
                {/* PAGE 1 */}
                <div className="pdf-page w-[794px] min-h-[1123px] bg-white text-black rounded-md overflow-hidden shadow-2xl">
                  {/* HEADER */}
                  <div className="flex justify-between items-center border-b border-slate-50 pb-1">
                    <div className="flex items-center gap-4">
                      <img
                        src="assets/marga_veda_name.png"
                        alt="Marga Darshika Logo"
                        className="h-[200px] w-auto object-contain"
                      />

                      {/* Optional: Minimal vertical divider and sub-text to keep the brand clear */}
                      <div className="h-6 w-[1px] bg-slate-200 ml-1" />
                      <p className="text-[8px] font-black text-slate-400 uppercase tracking-[0.3em]">
                        Career <br /> Intelligence
                      </p>
                    </div>
                    <div className="text-[10px] font-bold text-amber-500 bg-amber-50 px-3 py-1 rounded-full border border-amber-100">
                      PATH REF:{" "}
                      {String(selectedPath?.id || "000").toUpperCase()}
                    </div>
                  </div>

                  {/* CONTENT */}
                  <div className="p-12 max-w-[210mm] mx-auto bg-white text-slate-800 font-sans border border-slate-100 shadow-sm h-[940px] flex flex-col">
                    {" "}
                    <div className="mb-10 p-6 bg-amber-50/50 border-l-4 border-amber-400 rounded-r-xl">
                      <div className="flex items-center gap-2 mb-2">
                        <svg
                          width="14"
                          height="14"
                          viewBox="0 0 24 24"
                          fill="none"
                          className="text-amber-600"
                        >
                          <path
                            d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                        <span className="text-[10px] font-black text-amber-700 uppercase tracking-widest">
                          Marga Veda Strategy Note
                        </span>
                      </div>

                      <p className="text-[11px] leading-relaxed text-slate-600 font-medium">
                        Education is a journey, not just a destination. It is
                        important to note that completion of
                        <span className="text-slate-900 font-bold">
                          {" "}
                          every course{" "}
                        </span>
                        in this sequence is not a mandatory requirement for
                        success. At any level within this roadmap, you have the
                        flexibility to pause your formal education and
                        transition into the workforce. Our system is designed to
                        guide you toward specific
                        <span className="text-emerald-600 font-bold">
                          {" "}
                          job opportunities{" "}
                        </span>
                        available at your current milestone, ensuring you choose
                        the right professional path whenever you decide to start
                        your career.
                      </p>
                    </div>
                    {/* THE FLOW CONTAINER */}
                    <div className="relative">
                      {/* Thin Gradient Flow Line */}
                      <div className="absolute left-[15px] top-2 bottom-2 w-[1.5px] bg-gradient-to-b from-cyan-400 via-emerald-400 to-amber-300 opacity-40" />

                      <div className="space-y-6">
                        {selectedPath.steps.map((course, index) => (
                          <div key={index} className="relative pl-10">
                            {/* MICRO STEP NODE - Amber Gold Accent */}
                            <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[32px] h-[32px] flex items-center justify-center">
                              <div className="w-2.5 h-2.5 rounded-full bg-white border-2 border-amber-500 z-10 shadow-sm" />
                              <div className="absolute w-full h-full rounded-full bg-amber-50 opacity-50" />
                            </div>

                            {/* COMPACT CARD - White/Slate Aesthetic */}
                            <div className="bg-slate-50/50 border border-slate-100 rounded-xl p-4 flex items-center justify-between shadow-sm">
                              <div className="flex-1 pr-6">
                                <div className="flex items-center gap-2 mb-1.5">
                                  <span className="text-[8px] font-black text-cyan-600 uppercase tracking-widest">
                                    Phase {index + 1}
                                  </span>
                                  <span className="h-[1px] w-4 bg-slate-200" />
                                  <span className="text-[8px] font-bold text-emerald-500 uppercase">
                                    {course.level}
                                  </span>
                                </div>

                                <h3 className="text-sm font-extrabold text-slate-800 tracking-tight leading-tight">
                                  {course.name}
                                </h3>
                              </div>

                              {/* DURATION BADGE - Amber Gold Highlight */}
                              <div className="text-right border-l border-slate-200 pl-4">
                                <p className="text-[10px] font-black text-amber-600 leading-none">
                                  {course.duration}
                                </p>
                                <p className="text-[7px] font-bold text-slate-400 uppercase mt-1 tracking-tighter">
                                  Duration
                                </p>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                    {/* REFINED ARCHITECTURAL FOOTER */}
                    <div className=" mt-auto pt-8 border-t border-slate-100 flex justify-between items-end">
                      <div className="space-y-3">
                        <div className="flex items-center gap-3">
                          <div className="flex flex-col gap-0.5">
                            <div className="w-4 h-[2px] bg-cyan-500 rounded-full" />
                            <div className="w-6 h-[2px] bg-emerald-500 rounded-full" />
                            <div className="w-3 h-[2px] bg-amber-500 rounded-full" />
                          </div>
                          <span className="text-[9px] font-black text-slate-800 uppercase tracking-[0.2em]">
                            Marga Veda Intelligence
                          </span>
                        </div>
                        <p className="text-[7px] text-slate-400 font-bold uppercase tracking-widest max-w-[250px]">
                          Algorithmically generated based on industry demand and
                          verified educational sequences.
                        </p>
                      </div>

                      <div className="text-right space-y-1">
                        <p className="text-[9px] font-black text-slate-900 uppercase">
                          Generated: {new Date().toLocaleDateString()}
                        </p>
                        <p className="text-[8px] text-slate-400 font-bold uppercase tracking-[0.1em]">
                          © 2026 • MV SEQUENCE REPORT • PAGE 01
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* COURSE PAGES */}
                {selectedPath.steps.map((course, index) => {
                  // Filter and limit to only 5 career roles
                  const availableJobs = careers
                    .filter((career) =>
                      career.education?.recommendedCourses?.includes(
                        course._id,
                      ),
                    )
                    .slice(0, 5);

                  return (
                    <div
                      key={index}
                      className="pdf-page w-[794px] min-h-[1123px] bg-white text-slate-800 flex flex-col border border-slate-100 shadow-2xl overflow-hidden mb-10"
                    >
                      {/* --- HEADER SECTION --- */}
                      <div className="bg-[#030712] text-white px-10 py-10 relative">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-cyan-500/10 to-transparent" />

                        <div className="flex justify-between items-start relative z-10">
                          <div className="space-y-2">
                            <p className="text-[10px] font-black text-cyan-400 uppercase tracking-[0.4em]">
                              Marga Veda Intelligence • Page {index + 2}
                            </p>
                            <h2 className="text-2xl font-black leading-tight max-w-[550px] tracking-tight">
                              {course.name}
                            </h2>
                            <div className="flex gap-3 pt-2">
                              <span className="text-[9px] font-bold bg-white/10 px-2 py-1 rounded border border-white/10 text-slate-300">
                                Level: {course.level}
                              </span>
                              <span className="text-[9px] font-bold bg-amber-500/20 px-2 py-1 rounded border border-amber-500/30 text-amber-400">
                                Demand: {course.demandTrend}
                              </span>
                            </div>
                          </div>

                          <div className="text-right border-l border-white/10 pl-8">
                            <p className="text-[10px] font-bold text-white/40 uppercase tracking-widest mb-1">
                              Duration
                            </p>
                            <h3 className="text-2xl font-black text-emerald-400 leading-none">
                              {course.duration}
                            </h3>
                            <p className="text-[10px] font-bold text-cyan-400 mt-2 uppercase tracking-tighter italic">
                              Difficulty: {course.difficultyLevel}
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* --- MAIN BODY GRID --- */}
                      <div className="flex-1 p-10 grid grid-cols-12 gap-5 content-start">
                        {/* 1. DESCRIPTION */}
                        <div className="col-span-12 bg-slate-50 border border-slate-100 rounded-2xl p-5">
                          <h4 className="text-[10px] font-black text-cyan-600 uppercase tracking-widest mb-2">
                            Program Overview
                          </h4>
                          <p className="text-[12px] text-slate-600 leading-relaxed italic">
                            {course.description}
                          </p>
                        </div>

                        {/* 2. ELIGIBILITY & FEES */}
                        <div className="col-span-8 border border-slate-100 rounded-2xl p-5">
                          <h4 className="text-[10px] font-black text-cyan-600 uppercase tracking-widest mb-2">
                            Eligibility & Criteria
                          </h4>
                          <p className="text-[11px] text-slate-700 leading-snug">
                            {course.eligibility}
                          </p>
                        </div>
                        <div className="col-span-4 bg-emerald-50 border border-emerald-100 rounded-2xl p-5 flex flex-col justify-center">
                          <h4 className="text-[10px] font-black text-emerald-700 uppercase tracking-widest mb-1">
                            Avg. Annual Fees
                          </h4>
                          <p className="text-xl font-black text-emerald-600">
                            ₹ {course.avgFees?.toLocaleString()}
                          </p>
                        </div>

                        {/* 3. SUBJECTS & SKILLS */}
                        <div className="col-span-6 space-y-5">
                          <div className="border border-slate-100 rounded-2xl p-5">
                            <h4 className="text-[10px] font-black text-cyan-600 uppercase tracking-widest mb-3">
                              Core Subjects
                            </h4>
                            <div className="grid grid-cols-1 gap-y-1">
                              {/* Limited to 5 subjects for readability */}
                              {[
                                ...(course.subjects1 || []),
                                ...(course.subjects2 || []),
                              ]
                                .slice(0, 5)
                                .map((sub, i) => (
                                  <p
                                    key={i}
                                    className="text-[11px] text-slate-600"
                                  >
                                    • {sub}
                                  </p>
                                ))}
                            </div>
                          </div>
                          <div className="border border-slate-100 rounded-2xl p-5">
                            <h4 className="text-[10px] font-black text-emerald-600 uppercase tracking-widest mb-3">
                              Professional Skills
                            </h4>
                            <div className="flex flex-wrap gap-1.5">
                              {course.skillsGained
                                ?.slice(0, 6)
                                .map((skill, i) => (
                                  <span
                                    key={i}
                                    className="text-[9px] font-bold px-2 py-1 bg-emerald-50 text-emerald-700 rounded border border-emerald-100"
                                  >
                                    {skill}
                                  </span>
                                ))}
                            </div>
                          </div>
                        </div>

                        {/* 4. ENTRANCE EXAMS & TOP COLLEGES */}
                        <div className="col-span-6 space-y-5">
                          <div className="bg-amber-50/50 border border-amber-100 rounded-2xl p-5">
                            <h4 className="text-[10px] font-black text-amber-600 uppercase tracking-widest mb-3">
                              Entrance Exams
                            </h4>
                            <div className="flex flex-wrap gap-2">
                              {course.entranceExams?.map((exam, i) => (
                                <span
                                  key={i}
                                  className="text-[10px] font-black text-slate-700 bg-white border border-amber-200 px-2 py-0.5 rounded shadow-sm"
                                >
                                  {exam}
                                </span>
                              ))}
                            </div>
                          </div>
                          <div className="border border-slate-100 rounded-2xl p-5">
                            <h4 className="text-[10px] font-black text-cyan-600 uppercase tracking-widest mb-3">
                              Top Institutions
                            </h4>
                            <ul className="space-y-1">
                              {course.topColleges?.slice(0, 5).map((clg, i) => (
                                <li
                                  key={i}
                                  className="text-[11px] text-slate-600 flex items-center gap-2"
                                >
                                  <div className="w-1 h-1 bg-cyan-400 rounded-full" />{" "}
                                  {clg}
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>

                        {/* 5. FUTURE PATHS & SEQUENCE */}
                        <div className="col-span-12 grid grid-cols-2 gap-5 border-t border-slate-100 pt-5 mt-2">
                          <div className="space-y-2">
                            <h4 className="text-[9px] font-black text-slate-400 uppercase tracking-widest">
                              Future Scope
                            </h4>
                            <p className="text-[10px] font-medium text-slate-600">
                              {course.futureScope?.join(", ")}
                            </p>
                          </div>
                          <div className="space-y-2">
                            <h4 className="text-[9px] font-black text-slate-400 uppercase tracking-widest">
                              Next Career Sequence
                            </h4>
                            <div className="flex flex-wrap gap-1">
                              {course.nextCourses?.map((next, i) => (
                                <span
                                  key={i}
                                  className="text-[9px] font-mono font-bold text-cyan-700 bg-cyan-50 px-1 rounded"
                                >
                                  {next
                                    .replace("course_", "")
                                    .replace(/_/g, " ")}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>

                        {/* 6. JOBS & CAREERS (ACCENT BOX) */}
                        <div className="col-span-12 mt-4 bg-slate-900 rounded-2xl p-6 text-white relative overflow-hidden">
                          {/* Decorative neon accent */}
                          <div className="absolute top-0 right-0 w-24 h-1 bg-gradient-to-l from-emerald-400 to-transparent" />

                          <div className="flex justify-between items-center mb-4">
                            <h4 className="text-[10px] font-black text-emerald-400 uppercase tracking-[0.3em]">
                              Industry Roles (Top 5)
                            </h4>
                            <span className="text-[9px] font-bold text-white/40 italic">
                              Placement Intelligence
                            </span>
                          </div>

                          <div className="flex flex-wrap gap-2 mb-6">
                            {availableJobs.map((job, i) => (
                              <span
                                key={i}
                                className="text-[11px] font-bold border border-emerald-500/30 px-3 py-1.5 rounded bg-emerald-500/5 text-emerald-50"
                              >
                                {job.title}
                              </span>
                            ))}
                          </div>

                          <div className="border-t border-white/10 pt-4 flex justify-between items-center">
                            <p className="text-[10px] text-white/50">
                              For specialized job roles and salary insights:
                            </p>
                            <a
                              href="https://margaveda.com"
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <p className="text-[11px] font-black text-cyan-400 animate-pulse hover:underline cursor-pointer">
                                Visit MARGA VEDA
                              </p>
                            </a>
                          </div>
                        </div>
                      </div>

                      {/* --- FOOTER --- */}
                      <div className="px-10 py-6 border-t border-slate-100 flex justify-between items-center bg-slate-50/50">
                        <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">
                          Educational Roadmap Platform[cite: 1]
                        </span>
                        <div className="text-right">
                          <p className="text-[9px] font-black text-slate-900 uppercase">
                            Generated: {new Date().toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default DetailedMapView;

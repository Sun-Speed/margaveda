import { motion } from "framer-motion";
import ViewDetails from "../coursePage/ViewDetails";
import { useState } from "react";

const StreamHeroSection = ({ selectedStream }) => {
  const [showModal, setShowModal] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(null);

  function handleCloseModal() {
    setShowModal(false);
    setSelectedCourse(null);
  }
  return (
    <>
      <div className="flex flex-col gap-10 ">
        {/* TOP DASHBOARD-STYLE TITLE (Matching Dashboard Layout) */}
        <header className="flex justify-between items-center px-4 mt-[40px]">
          <div>
            <span className="text-gray-500 font-mono text-[10px] tracking-[0.4em] uppercase font-black">
              PUC Stream Overview
            </span>
            <h1 className="text-5xl font-black text-white tracking-tighter mt-1 leading-none">
              The <span className="text-[#00FFD1]">{selectedStream.name}</span> 
              Stream
            </h1>
          </div>

          {/* Decorative System Status (Matching Dashboard Vibe) */}
          <div className="flex items-center gap-2 p-2 px-4 rounded-xl bg-white/[0.03] border border-white/5 backdrop-blur-md">
            <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></div>
            <span className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">
               
              Active Course
            </span>
          </div>
        </header>

        {/* THE MAIN HERO CARD */}
        <section className="relative group p-1 bg-gradient-to-br from-[#0a0a0a] via-[#111] to-black rounded-[2.5rem] border border-white/5 overflow-hidden">
          {/* Layer 1: The Glassmorphic Data Panel */}
          <div className="relative z-10 p-10 md:p-12 backdrop-blur-md bg-white/[0.02] rounded-[2.4rem] flex flex-col md:flex-row md:items-center gap-10">
            {/* LEFT: Core Identity Module */}
            <div className="flex-grow space-y-6">
              {/* DEMAND TAG */}
              <div className="flex items-center gap-3">
                <span className="px-3 py-1 md:px-4 md:py-1.5 border border-[#00FFD1]/40 text-[#00FFD1] text-[8px] md:text-[9px] font-black rounded-full tracking-[0.2em] md:tracking-[0.3em] bg-[#ffca28]/5 uppercase">
                  {selectedStream.demandTrend} Demand
                </span>
              </div>

              {/* DESCRIPTION */}
              <div className="relative group max-w-xl">
                <div className="absolute left-0 top-0 bottom-0 w-[2px] bg-white/5 overflow-hidden rounded-full">
                  <div className="w-full h-24 bg-gradient-to-b from-transparent via-[#00FFD1] to-transparent animate-data-flow"></div>
                </div>

                <p className="pl-6 md:pl-10 text-gray-400 text-xs md:text-[15px] leading-[1.7] md:leading-[1.8] font-medium tracking-tight transition-all duration-500 group-hover:text-gray-200">
                  {selectedStream.description}
                </p>
              </div>

              {/* INFO + BUTTON */}
              <div className="flex flex-col md:flex-row md:items-center gap-6 pt-4">
                {/* INFO SECTION */}
                <div className="flex flex-wrap items-center gap-4 md:gap-6">
                  <div className="flex flex-col">
                    <span className="text-[8px] md:text-[9px] text-gray-600 font-bold uppercase tracking-widest mb-1">
                      Duration
                    </span>
                    <span className="text-xs md:text-sm font-black text-white uppercase tracking-tighter">
                      {selectedStream.duration}
                    </span>
                  </div>

                  <div className="hidden md:block w-[2px] h-10 bg-gray-800"></div>

                  <div className="flex flex-col">
                    <span className="text-[8px] md:text-[9px] text-gray-600 font-bold uppercase tracking-widest mb-1">
                      Pre-Requisite
                    </span>
                    <span className="text-xs md:text-sm font-black text-white uppercase tracking-tighter">
                      Pass in {selectedStream.after}
                    </span>
                  </div>
                </div>

                {/* BUTTON */}
                <div className="w-full md:w-auto">
                  <button
                    onClick={() => setSelectedCourse(selectedStream)}
                    className="w-full md:w-auto px-6 py-2.5 bg-[#0A0A0A] border border-white/5 rounded-lg relative group flex items-center justify-center"
                  >
                    <div className="absolute inset-0 border border-[#00FFD1]/10 rounded-lg group-hover:border-[#fff]/50 transition-colors" />

                    <span className="relative z-20 text-white text-[10px] md:text-xs font-black tracking-[0.15em] md:tracking-[0.2em] uppercase">
                      Details
                    </span>

                    <div className="absolute -bottom-[1px] -right-[1px] w-2 h-2 border-b-2 border-r-2 border-[#fff] rounded-br-lg" />
                  </button>
                </div>
              </div>
            </div>

            {/* RIGHT: High-Impact Specialization (The Data Stream Visual) */}
            <div className="w-full md:w-[350px] flex-shrink-0">
              <div className="p-1 rounded-2xl bg-gradient-to-br from-white/10 to-transparent">
                <div className="p-8 bg-[#0a0a0a] rounded-[1.3rem] border border-white/5 flex flex-col gap-6 relative shadow-[0_20px_40px_rgba(0,0,0,0.5)]">
                  {/* Visual Connector - The "Trunk Line" */}
                  <div className="absolute left-[20px] top-6 bottom-6 w-[1px] bg-gradient-to-b from-[#00FFD1] via-[#00FFD1]/20 to-transparent"></div>

                  {[
                    ...selectedStream.subjects1.slice(0, 2),
                    ...selectedStream.subjects2.slice(0, 2),
                  ].map((subject, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-4 pl-10 relative group/subject"
                    >
                      <div className="absolute left-0 w-8 h-8 flex items-center justify-center">
                        <div className="w-2.5 h-2.5 rounded-full bg-[#1a1a1a] border border-white/20 group-hover/subject:border-[#ffca28] group-hover/subject:scale-125 transition-all duration-300"></div>
                      </div>

                      <div className="flex flex-col flex-1">
                        <span className="text-[9px] text-gray-600 font-bold uppercase tracking-widest mb-0.5">
                          Primary Core
                        </span>
                        <h4 className="text-sm font-black text-gray-300 group-hover/subject:text-white transition-colors uppercase tracking-tight">
                          {subject.replace(/(\(|\))/g, "")}
                        </h4>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Layer 2: Cyber-Text Background (Matching image_3.png edge details) */}
          <div className="absolute left-6 bottom-6 text-[110px] md:text-[200px] font-black font-mono text-white/[0.04] select-none uppercase tracking-tighter leading-none pointer-events-none">
            {selectedStream.subjects1[0]} // {selectedStream.subjects2[0]}
          </div>

          {/* Layer 3: Dynamic Edge Glows */}
          <div className="absolute -top-10 -right-10 w-48 h-48 bg-[#ffca28]/5 blur-[80px] rounded-full group-hover:bg-[#ffca28]/10 transition-all duration-1000"></div>
          <div className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-[#ffca28]/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
        </section>
      </div>

      {selectedCourse && (
        <ViewDetails
          selectedCourse={selectedStream}
          handleCloseModal={handleCloseModal}
        />
      )}
    </>
  );
};

export default StreamHeroSection;

import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";


const NextPaths = ({ jobid }) => {

  const navigate = useNavigate();

  const [allCareers, setAllCareers] = useState([]);
  const [allPaths, setAllPaths] = useState([]);

  // 🔥 Fetch careers
  useEffect(() => {
    fetch("http://localhost:5000/api/jobs")
      .then(res => res.json())
      .then(data => {
        // console.log("Careers:", data);
        setAllCareers(data);
      })
      .catch(err => console.error(err));
  }, []);

  // 🔥 Fetch paths
  useEffect(() => {
    fetch("http://localhost:5000/api/paths")
      .then(res => res.json())
      .then(data => {

        setAllPaths(data);
      })
      .catch(err => console.error(err));
  }, []);

  // 🔥 Selected career (IMPORTANT: _id not id)
  const selectedCareer = useMemo(() => {
    return allCareers.find(career => career._id === jobid);
  }, [allCareers, jobid]);

  // 🔥 Selected paths
  const selectedPaths = useMemo(() => {
    if (!selectedCareer) return [];

    return allPaths.filter(
      path => path.careerId === selectedCareer._id
    );
  }, [allPaths, selectedCareer]);


  // 🔥 Helpers (same as before)
  const formatStep = (step) => {
    return step
      .replace("course_", "")
      .replace("_11_12", "")
      .replaceAll("_", " ")
      .replace(/\b\w/g, (c) => c.toUpperCase());
  };

  const getStream = (steps) => {
    return steps[0]
      .replace("_11_12", "")
      .split("_")[0];
  };

  const handleStepClick = (step, path) => {
    const stream = path.steps[0]
      .replace("_11_12", "")
      .split("_")[0];

    if (step.startsWith("course_")) {
      navigate(`/explore/${stream}/${step}`);
    } else {
      navigate(`/explore/${stream}`);
    }
  };

  // 🔥 Loading state (important)
  if (!allCareers.length || !allPaths.length) {
    return <div className="text-white">Loading paths...</div>;
  }

  return (
    <>
      {/* PAGE HEADER SECTION */}
      <header className="max-w-7xl mx-auto px-6 pt-24 pb-2">
        <div className="relative">
          {/* Decorative Ghost Text */}
          <div className="absolute -top-12 -left-8 text-[80px] md:text-[140px] font-black text-white/[0.04] select-none uppercase tracking-tighter">
            Road map
          </div>

          <div className="relative z-10">
            <p className="text-[#ffca28] font-mono tracking-[0.4em] text-[10px] md:text-xs mb-4 uppercase font-black">
              Strategic Career Navigation
            </p>
            <h1 className="text-4xl md:text-7xl font-black text-white mb-8 tracking-tighter leading-[0.9]">
              Pathways to <br />
              <span className="text-[#ffca28] italic">
                {selectedCareer.name}
              </span>
            </h1>
            <p className="max-w-2xl text-gray-400 text-sm md:text-base leading-relaxed border-l-2 border-[#ffca28]/30 pl-6 backdrop-blur-sm">
              We’ve decoded the industry entry points. Below are {" "}
              <span className="text-white font-bold">
                {selectedPaths.length} distinct routes {" "}
              </span> 
              to reach this role. Choose the blueprint that matches your current
              academic standing.
            </p>
          </div>
        </div>
      </header>

      <main className="max-w-[100vw] overflow-hidden">
        {/* The pt-12 is enough now that the box is smaller */}
        <div className="flex flex-col md:flex-row md:overflow-x-auto pt-12 pb-20 px-6 md:px-12 gap-6 md:gap-6 custom-scrollbar items-stretch">
          {selectedPaths.map((path, index) => (
            <div
              key={path.id}
              className="flex-shrink-0 w-full md:w-[350px] group relative"
            >
              {/* SMALLER FLOATING NUMBER - Slimmed down to 12x12 */}
              <div className="absolute -top-5 left-6 w-12 h-12 rounded-2xl bg-black border border-[#ffca28]/30 flex items-center justify-center z-[30] shadow-[0_10px_20px_rgba(0,0,0,0.5)] group-hover:border-[#ffca28] group-hover:shadow-[0_0_15px_rgba(255,202,40,0.3)] transition-all duration-500">
                <span className="text-[#ffca28] font-black font-mono text-xl">
                  0{index + 1}
                </span>
              </div>

              {/* REFINED CARD CONTAINER - Reduced padding to p-8 */}
              <div className="h-full bg-black border border-white/5 rounded-[2rem] p-7 md:p-8 transition-all duration-500 hover:border-[#ffca28]/40 relative flex flex-col overflow-hidden">
                {/* Animated Edge Glow - New Design Element */}
                <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#ffca28]/40 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>

                {/* Path Meta Tags - Smaller gap */}
                <div className="flex justify-between items-center mb-2">
                  <span
                    className={`text-[8px] font-black uppercase tracking-[0.2em] px-3 py-1 rounded-lg border backdrop-blur-md ${
                      path.type === "direct"
                        ? "bg-green-500/5 border-green-500/20 text-green-400"
                        : path.type === "advanced"
                          ? "bg-purple-500/5 border-purple-500/20 text-purple-400"
                          : "bg-blue-500/5 border-blue-500/20 text-blue-400"
                    }`}
                  >
                    {path.type}
                  </span>
                  <span className="text-[9px] font-mono text-gray-600 uppercase tracking-widest">
                    {path.duration}
                  </span>
                </div>

                <p className="text-xs text-gray-400 mb-2 ml-2 flex items-center gap-2 opacity-80">
                  <span className="w-1.5 h-1.5 rounded-full bg-yellow-400 animate-pulse"></span>
                  Tap below <span className="text-yellow-400 font-medium">courses</span> to explore
                </p>



                {/* THE JOURNEY STEPS - Tighter spacing */}
                <div className="relative space-y-6 mb-2 flex-grow">
                  {/* The Vertical Connection Line with Pulse Animation */}
                  <div className="absolute left-[11px] top-2 bottom-2 w-[1px] bg-white/5">
                    <div className="w-full h-1/2 bg-gradient-to-b from-transparent via-[#ffca28]/40 to-transparent animate-infinite-scroll"></div>
                  </div>

                  {/* <div className="max-h-[220px] overflow-y-auto pr-2 custom-scrollbar"> */}

                  {path.steps.map((step, sIndex) => (
                    <div
                      key={sIndex}
                      onClick={() => handleStepClick(step, path)}
                      className={`relative flex items-center gap-5 pl-10 group/step cursor-pointer ${step.startsWith("course_") ? "hover:text-yellow-400" : "cursor-default"}`}
                    >
                      {/* Node Dot - Reduced size */}
                      <div className="absolute left-0 w-6 h-6 flex items-center justify-center">
                        <div className="w-2 h-2 rounded-full bg-[#1a1a1a] border border-white/20 group-hover/step:border-[#ffca28] group-hover/step:shadow-[0_0_10px_#ffca28] transition-all duration-300"></div>
                      </div>

                      <div className="flex flex-col">
                        <span className="text-[7px] text-gray-600 font-bold uppercase tracking-[0.15em]">
                          Phase 0{sIndex + 1}
                        </span>
                        <span className="text-xs md:text-sm text-gray-400 font-bold group-hover/step:text-white transition-colors capitalize">
                          {step.replace(/_/g, " ")}
                        </span>
                      </div>
                    </div>
                  ))}


                  {/* Final Destination - Icon replaced with simple Circle */}
                  <div className="relative flex items-center gap-5 pl-10">
                    <div className="absolute left-0 w-6 h-6 rounded-full bg-[#ffca28]/10 border border-[#ffca28]/40 flex items-center justify-center">
                      <div className="w-1 h-1 rounded-full bg-[#ffca28] animate-pulse"></div>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[7px] text-[#ffca28] font-bold uppercase tracking-[0.15em]">
                        Goal
                      </span>
                      <span className="text-xs md:text-sm text-[#ffca28] font-black uppercase tracking-tight">
                        {selectedCareer.name}
                      </span>
                    </div>
                  </div>
                </div>

                {/* PRIMARY BUTTON - Slimmer height (py-3.5) */}
                <button className="group/btn relative w-full py-1.5 rounded-xl bg-white/[0.03] border border-white/10 overflow-hidden transition-all duration-300 hover:border-[#ffca28]/50">
                  <div className="absolute inset-0 bg-[#ffca28] translate-y-[101%] group-hover/btn:translate-y-0 transition-transform duration-500 ease-out"></div>
                  <span className="relative z-10 text-gray-400 group-hover/btn:text-black font-black text-[9px] uppercase tracking-[0.2em] transition-colors duration-300">
                    Analyze Syllabus
                  </span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </main>

      <style jsx>{`
        @keyframes infinite-scroll {
          from {
            transform: translateY(-100%);
          }
          to {
            transform: translateY(200%);
          }
        }
        .animate-infinite-scroll {
          animation: infinite-scroll 3s linear infinite;
        }
      `}</style>
    </>
  );
};

export default NextPaths;

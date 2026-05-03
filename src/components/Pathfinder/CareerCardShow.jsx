import { GitBranch } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import CareerOverlayCard from "../careersPage/careerOvelayCard";

const CareerCardShow = ({ careers, selectedCareer, setSelectedCareer, handleCareerCardClose }) => {

  const navigate = useNavigate();

  const [currentBatch, setCurrentBatch] = useState(0);

  const batchSize = 9;

  const total = careers.length;
  const totalBatches = Math.ceil(total / batchSize);

  const startIndex = currentBatch * batchSize;
  const endIndex = startIndex + batchSize;

  const visibleCareers = careers.slice(startIndex, endIndex);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [currentBatch]);

  return (<>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
      {visibleCareers.map((job, index) => (
        <div
          key={index}
          className="group relative bg-black border border-white/5 rounded-[1.5rem] p-6 md:p-7 overflow-hidden transition-all duration-500 hover:border-[#ffca28]/30 hover:bg-black"
        >
          <div className="relative z-10 flex flex-col justify-between h-full">

            {/* TOP ROW: Career Title & EST. Salary */}
            <div className="flex justify-between items-start mb-6 gap-4">
              <div className="flex flex-col flex-grow">
                {/* The small '8px' metadata label from the previous idea - kept for premium feel */}
                <span className="text-[9px] text-gray-600 font-bold uppercase tracking-[0.2em] mb-1.5">Jobs Classification</span>
                <h3 className="text-base md:text-lg font-black text-white leading-tight tracking-tight group-hover:text-[#ffca28] transition-colors capitalize">
                  {job.title}
                </h3>
              </div>
              <div className="text-right flex-shrink-0">
                {/* Gold Salary Label */}
                <span className="text-[10px] text-[#ffca28] font-black uppercase tracking-widest block mb-1">Est. Salary</span>
                <span className="text-sm md:text-base font-mono font-bold text-white tracking-tighter">
                  {job.avgSalary}
                </span>
              </div>
            </div>

            {/* BOTTOM ROW: The Action Interface */}
            <div className="flex flex-row items-center gap-4 pt-6 w-full border-t border-white/5">
              {/* PRIMARY: VIEW INTEL */}
              <button
                onClick={() => setSelectedCareer(job)}
                className="flex-1 relative py-4 px-2 rounded-xl overflow-hidden group transition-all duration-300 transform active:scale-95"
              >
                {/* Solid Amber/Gold Background */}
                <div className="absolute inset-0 bg-gradient-to-r from-[#ffca28] to-[#f59e0b]" />

                <span className="relative z-10 flex items-center justify-center text-black text-[11px] font-extrabold uppercase tracking-widest">
                  View Intel
                </span>
              </button>

              {/* SECONDARY: MAP ALTERNATIVE PATHS */}
              <button
                onClick={() => navigate(`/career/${job._id}`)}
                className="flex-1 py-4 px-2 flex items-center justify-center gap-3 rounded-xl bg-black border border-[#ffca28]/30 group transition-all duration-300 hover:border-[#ffca28] hover:bg-[#ffca28]/5 active:scale-95"
              >
                <GitBranch
                  size={16}
                  className="text-[#ffca28] group-hover:rotate-12 transition-transform"
                />
                <span className="text-[11px] font-extrabold tracking-widest uppercase text-[#ffca28]">
                  other Paths
                </span>
              </button>
            </div>
          </div>

          {/* DYNAMIC HOVER EFFECT: Side Bar Glow (Similar to Recommended Courses left-border in image_3.png) */}
          <div className="absolute left-0 top-6 bottom-6 w-[2px] rounded-full bg-gradient-to-b from-[#ffca28] to-transparent opacity-0 group-hover:opacity-100 group-hover:animate-infinite-scroll transition-opacity pointer-events-none"></div>
        </div>
      ))}
    </div>

    <div className="flex items-center justify-between mt-6">

      {/* LEFT: Progress */}
      <div className="text-xs text-gray-400">
        {Math.min(endIndex, total)} of {total} careers
      </div>

      {/* CENTER: Batch Numbers */}
      <div className="flex gap-2">
        {[...Array(totalBatches)].map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrentBatch(i)}
            className={`w-8 h-8 rounded-md text-xs font-bold ${currentBatch === i
                ? "bg-[#ffca28] text-black"
                : "bg-white/5 text-gray-400 hover:text-white"
              }`}
          >
            {i + 1}
          </button>
        ))}
      </div>

      {/* RIGHT: Next / Prev */}
      <div className="flex gap-2">

        <button
          onClick={() => setCurrentBatch((prev) => Math.max(prev - 1, 0))}
          disabled={currentBatch === 0}
          className="px-3 py-1 text-xs bg-white/5 text-gray-400 rounded disabled:opacity-30"
        >
          Prev
        </button>

        <button
          onClick={() =>
            setCurrentBatch((prev) =>
              Math.min(prev + 1, totalBatches - 1)
            )
          }
          disabled={currentBatch === totalBatches - 1}
          className="px-3 py-1 text-xs bg-[#ffca28] text-black rounded disabled:opacity-30"
        >
          Next
        </button>

      </div>
    </div>

    {selectedCareer && (
      <CareerOverlayCard
        selectedCareer={selectedCareer}
        handleCareerCardClose={handleCareerCardClose}
      />
    )}


    <style jsx>{`
  @keyframes scan-vertical {
    0% { top: 0; }
    100% { top: 100%; }
  }
  .animate-scan-vertical {
    animation: scan-vertical 2s linear infinite;
  }
`}</style>
  </>)
}

export default CareerCardShow;
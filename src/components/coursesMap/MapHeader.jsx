import { Download } from "lucide-react";
import React from "react";
// Download


// components/maps/MapHeader.jsx
const MapHeader = () => {
  return (
    <div className="sticky top-0 z-30 w-full bg-[#0A0A0A]/80 backdrop-blur-md border-b border-[#00FFD1]/20 p-4 mt-10">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
        {/* Path Breadcrumbs */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar">
          <span className="text-[10px] text-slate-500 uppercase font-black tracking-tighter">Live Path:</span>
          <div className="flex items-center gap-2 whitespace-nowrap">
            {["Science", "B.E Computer Science", "M.Tech", "Ph.D"].map((step, i, arr) => (
              <React.Fragment key={i}>
                <span className="text-xs font-bold text-[#00FFD1]">{step}</span>
                {i !== arr.length - 1 && <span className="text-slate-700">/</span>}
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-3">
          <button className="px-4 py-1.5 border border-red-500/30 hover:bg-red-500/10 text-red-500 text-[10px] font-bold uppercase rounded-lg transition-all">
            Remove Path
          </button>
          <button className="px-4 py-1.5 bg-[#00FFD1] text-black text-[10px] font-bold uppercase rounded-lg hover:shadow-[0_0_15px_rgba(0,255,209,0.4)] transition-all">
            Save to Profile
          </button>
          <button className="p-1.5 border border-[#00FFD1]/20 rounded-lg hover:bg-white/5">
            <Download size={16} className="text-[#00FFD1]" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default MapHeader;
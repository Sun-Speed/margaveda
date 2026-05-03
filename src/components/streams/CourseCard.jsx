import { motion } from "framer-motion";
import { Microscope, ChevronRight } from "lucide-react";

const CourseCard = ({ course, handleViewDetails, handleClick, addStep }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -8, transition: { duration: 0.2 } }}
      className="group relative p-[1px] rounded-[32px] overflow-hidden bg-white/5"
    >
      {/* Animated Border Beam */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#00FFD1] to-transparent opacity-0 group-hover:opacity-100 group-hover:animate-shimmer -translate-x-full group-hover:translate-x-full transition-all duration-1000" />
      
      {/* Main Glass Body */}
      <div className="relative h-full w-full bg-[#0B0E11]/80 backdrop-blur-xl rounded-[31px] p-6 border border-white/10 group-hover:border-[#00FFD1]/20 transition-colors">
        
        {/* Floating Icon Container */}
        <div className="absolute top-0 right-0 p-4">
          <div className="relative group-hover:scale-110 transition-transform duration-300">
            <div className="absolute inset-0 bg-[#00FFD1] blur-md opacity-20 group-hover:opacity-40 transition-opacity" />
            <div className="relative p-3 bg-[#080B0D] rounded-2xl border border-[#00FFD1]/30 text-[#00FFD1]">
              <Microscope size={22} />
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="space-y-2 pr-12">
            <span className="inline-block px-2 py-0.5 rounded-md bg-[#00FFD1]/10 text-[10px] font-mono text-[#00FFD1] tracking-widest border border-[#00FFD1]/20 uppercase">
              ID: {course._id}
            </span>
            <h3 className="text-xl font-bold text-white group-hover:text-[#00FFD1] leading-tight transition-colors">
              {course.name} 
            </h3>
          </div>

          {/* Feature Grid */}
          <div className="grid grid-cols-2 gap-3">
            {[
              { label: "Duration", value: course.duration },
              { label: "Level", value: course.after }
            ].map((stat, i) => (
              <div key={i} className="p-3 bg-white/[0.03] rounded-2xl border border-white/5 backdrop-blur-sm">
                <p className="text-[9px] text-slate-500 uppercase font-bold mb-1 tracking-wider">{stat.label}</p>
                <p className="text-xs text-slate-200 font-semibold">{stat.value}</p>
              </div>
            ))}
          </div>

          <div className="flex items-center gap-2 text-[11px] text-slate-400 font-medium italic">
            <span className="w-1.5 h-1.5 rounded-full bg-[#00FFD1] shadow-[0_0_8px_#00FFD1]" />
            <span>Requirement: {course.after}</span>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-4 pt-2">
            <button 
              onClick={() => handleViewDetails(course)}
              className="flex-1 py-3 text-[11px] font-bold text-slate-400 
                        border border-white/10 rounded-xl tracking-widest 
                        hover:text-[#00FFD1] hover:border-[#00FFD1]/40 
                        hover:bg-[#00FFD1]/5 transition-all duration-300"
            >
              VIEW DETAILS
            </button>

            <button 
              className="flex-1 flex items-center justify-center gap-2 py-3.5 bg-[#00FFD1] text-black rounded-xl text-xs font-black hover:shadow-[0_0_20px_rgba(0,255,209,0.4)] transition-all transform active:scale-95"
              onClick={() => {
                addStep({
                  _id: course._id,
                  title: course.name,
                });

                handleClick(course._id);
              }}
            >
              EXPLORE <ChevronRight size={16} strokeWidth={3} />
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};


export default CourseCard;
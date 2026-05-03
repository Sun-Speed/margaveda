import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

const DetailOverlay = ({ selectedCourse, setSelectedCourse, theme }) => (
  <AnimatePresence>
    {selectedCourse && (
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setSelectedCourse(null)} className="absolute inset-0 bg-black/90 backdrop-blur-md" />
        <motion.div 
          initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }}
          className={`relative ${theme.card} border border-white/20 p-8 rounded-[2.5rem] w-full max-w-xl overflow-hidden shadow-2xl`}
        >
          <div className="absolute top-[-50px] right-[-50px] w-40 h-40 bg-[#00FFD1]/10 blur-[60px] rounded-full" />
          <button onClick={() => setSelectedCourse(null)} className="absolute top-6 right-6 text-slate-500 hover:text-white"><X /></button>
          
          <span className="text-[#00FFD1] text-[10px] font-bold tracking-[3px] uppercase">Detailed Path</span>
          <h2 className="text-3xl font-black text-white mt-2 mb-6">{selectedCourse.title}</h2>
          
          <p className="text-slate-400 text-sm leading-relaxed mb-8">
            {selectedCourse.desc}. This path covers 150+ job roles, real-world projects, and a structured syllabus to take you from beginner to expert.
          </p>
          
          <div className="space-y-4 mb-8">
            {['Expert Mentorship', 'Lifetime Access', 'Certification'].map(f => (
              <div key={f} className="flex items-center gap-3 text-white text-sm font-medium">
                <div className="w-1.5 h-1.5 rounded-full bg-[#00FFD1]" /> {f}
              </div>
            ))}
          </div>
          
          <button className="w-full bg-[#00FFD1] py-4 rounded-2xl text-black font-black text-sm uppercase tracking-widest hover:scale-[1.02] transition-transform active:scale-95 shadow-[0_10px_30px_rgba(0,255,209,0.3)]">
            Start Learning
          </button>
        </motion.div>
      </div>
    )}
  </AnimatePresence>
);

export default DetailOverlay;
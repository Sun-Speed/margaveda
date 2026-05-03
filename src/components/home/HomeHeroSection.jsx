import React from "react";
import { motion } from "framer-motion";
import { GraduationCap, Briefcase, Zap, Target, ArrowUpRight, MousePointer2, } from "lucide-react";
import { useNavigate } from "react-router-dom";

const NexusHeroUpdated = () => {
  const navigate = useNavigate();

  return (
    <div className="relative w-full flex items-start lg:items-center justify-center overflow-hidden font-sans py-24 lg:min-h-screen">
      <div className="relative z-10 max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
        {/* LEFT COLUMN */}
        <div className="lg:col-span-7 space-y-8">
          {/* REFINED TITLES (Balanced Scale) */}
          <div className="space-y-4">
            <motion.h1
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-5xl md:text-7xl font-black italic tracking-tighter leading-[0.9] text-white uppercase"
            >
              YOUR CAREER. <br />
              <span className="text-transparent" style={{ WebkitTextStroke: '1px #fff' }}>YOUR PATH</span>
            </motion.h1>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="inline-flex items-center gap-2 px-3 py-1 bg-cyan-500/10 border border-cyan-500/20 rounded"
            >
              <div className="w-1 h-1 bg-cyan-400 rounded-full animate-ping" />
              <p className="text-cyan-400 font-bold text-xs tracking-widest uppercase italic">
                Clearly Guided
              </p>
            </motion.div>
          </div>

          {/* SUBTEXT (Modern Pacing) */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="max-w-lg border-l border-white/10 pl-6 py-2 group"
          >
            <p className="text-slate-400 text-base md:text-lg font-light leading-relaxed italic">
              Discover the right courses and careers based on your interests.
              Marga Veda provides an 
              <span className="text-white">{" "} autonomous roadmap</span> tailored
              for student success.
            </p>
          </motion.div>

          {/* ACTION BUTTONS (Small & Decent) */}
          <div className="flex flex-wrap items-center gap-4">
            <motion.button
              whileHover={{ scale: 1.02, y: -2 }}
              onClick={() => navigate(`/explore`)}
              className="px-6 py-3 bg-cyan-500 text-black text-[11px] font-black uppercase tracking-[0.2em] rounded-lg flex items-center gap-2 shadow-[0_10px_30px_-10px_rgba(6,182,212,0.5)] group"
            >
              <GraduationCap size={16} />
              <span>Explore Courses</span>
              <ArrowUpRight
                size={14}
                className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"
              />
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.02, y: -2 }}
              onClick={() => navigate(`/careers`)}
              className="px-6 py-3 border border-amber-500/50 text-amber-500 text-[11px] font-black uppercase tracking-[0.2em] rounded-lg flex items-center gap-2 hover:bg-amber-500 hover:text-black transition-all group"
            >
              <Briefcase size={16} />
              <span>Explore Careers</span>
            </motion.button>
          </div>
        </div>

        {/* RIGHT COLUMN: FLOATING DATA GLASS */}
        <motion.div
  initial={{ opacity: 0, x: 50 }}
  animate={{ opacity: 1, x: 0 }}
  transition={{ delay: 0.6, duration: 0.8 }}
  className="lg:col-span-5 relative w-full flex flex-col items-center"
>
  {/* --- DESKTOP DECORATIVE BACKDROP --- */}
  {/* This adds a technical "radar" feel behind your image on laptops */}
  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] hidden lg:block">
    <div className="absolute inset-0 border border-white/[0.03] rounded-full" />
    <div className="absolute inset-10 border border-white/[0.02] rounded-full" />
  </div>

  {/* MAIN IMAGE CONTAINER */}
  <div className="relative z-10 w-full max-w-[350px] lg:max-w-[450px] aspect-square flex items-center justify-center group">
    {/* Dynamic Glow that reacts to hover */}
    <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500/10 to-amber-500/10 blur-[80px] rounded-full opacity-50 group-hover:opacity-80 transition-opacity" />
    
    <img 
      src="/assets/marga_darshika_hero.png" 
      alt="Marga Darshika Visualization" 
      className="relative z-10 w-full h-full object-contain drop-shadow-[0_30px_60px_rgba(0,0,0,0.8)] transform group-hover:scale-[1.02] transition-transform duration-700" 
    />

    {/* --- DESKTOP EXCLUSIVE: FLOATING DATA NODES --- */}
    {/* These only show on lg screens and float over the image corners */}
    
    {/* Node 1: Courses (Top Left) */}
    <motion.div 
      animate={{ y: [0, -10, 0] }}
      transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      className="hidden lg:flex absolute -top-4 -left-12 p-4 bg-black/40 border border-white/10 rounded-2xl backdrop-blur-xl items-center gap-4 z-20 shadow-2xl"
    >
      <div className="w-10 h-10 flex items-center justify-center bg-cyan-500/20 rounded-xl text-cyan-400 border border-cyan-500/30">
        <GraduationCap size={18} />
      </div>
      <div>
        <p className="text-[8px] font-black text-white/40 tracking-widest uppercase">courses</p>
        <p className="text-lg font-bold text-white italic">1,200+</p>
      </div>
    </motion.div>

    {/* Node 2: Careers (Bottom Right) */}
    <motion.div 
      animate={{ y: [0, 10, 0] }}
      transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }}
      className="hidden lg:flex absolute -bottom-4 -right-12 p-4 bg-black/40 border border-white/10 rounded-2xl backdrop-blur-xl items-center gap-4 z-20 shadow-2xl"
    >
      <div className="w-10 h-10 flex items-center justify-center bg-amber-500/20 rounded-xl text-amber-500 border border-amber-500/30">
        <Briefcase size={18} />
      </div>
      <div>
        <p className="text-[8px] font-black text-white/40 tracking-widest uppercase">Careers</p>
        <p className="text-lg font-bold text-white italic">850+</p>
      </div>
    </motion.div>
  </div>

  {/* --- MOBILE ONLY CARDS --- */}
  {/* This section only renders on mobile/tablet to keep the clean look we built earlier */}
  <div className="lg:hidden w-full flex items-center gap-4 overflow-x-auto mt-8 pb-4 snap-x snap-mandatory hide-scrollbar">
    <div className="p-5 flex-shrink-0 w-[280px] bg-white/[0.02] border border-white/10 rounded-2xl backdrop-blur-xl flex items-center gap-5 snap-center">
        <GraduationCap className="text-cyan-400" size={20} />
        <div>
            <p className="text-[9px] font-black text-slate-500 uppercase">Academic Database</p>
            <p className="text-xl font-bold text-white italic">1,200+ Courses</p>
        </div>
    </div>
    
    <div className="p-5 flex-shrink-0 w-[280px] bg-white/[0.02] border border-white/10 rounded-2xl backdrop-blur-xl flex items-center gap-5 snap-center">
        <Briefcase className="text-amber-500" size={20} />
        <div>
            <p className="text-[9px] font-black text-slate-500 uppercase">Industry Verticals</p>
            <p className="text-xl font-bold text-white italic">850+ Careers</p>
        </div>
    </div>
  </div>
</motion.div>
      </div>

      <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-cyan-500/20 to-transparent" />
    </div>
  );
};

const StatNode = ({ icon, label, val, pos, color }) => (
  <motion.div 
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    className={`absolute ${pos} p-4 bg-white/[0.03] border border-white/10 backdrop-blur-xl rounded-2xl flex items-center gap-4 shadow-2xl z-30 group hover:border-${color}-500/50 transition-colors`}
  >
    <div className={`w-10 h-10 rounded-xl bg-black flex items-center justify-center text-${color}-400 border border-white/10 group-hover:scale-110 transition-transform`}>
      {icon}
    </div>
    <div className="flex flex-col">
      <span className="text-[8px] font-black uppercase text-white/40 tracking-widest">{label}</span>
      <span className="text-sm font-bold text-white italic">{val}</span>
    </div>
  </motion.div>
);

export default NexusHeroUpdated;

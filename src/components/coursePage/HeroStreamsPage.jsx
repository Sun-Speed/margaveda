import { motion } from "framer-motion";
import { ArrowUpRight, ShieldCheck, Activity, Globe } from "lucide-react";

export default function ExploreHero() {
  return (
    <div className="relative w-full flex flex-col justify-center overflow-hidden selection:bg-[#00FFD1]/30 mt-[75px]">
      {/* 1. KINETIC BACKGROUND ARCHITECTURE */}

      {/* 2. THE COMMAND CORE */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 w-full">
        {/* Status Line with Animated Pulse */}
        <div className="flex items-center gap-4 mb-10">
          <div className="relative flex items-center justify-center">
            <div className="absolute w-2 h-2 bg-[#00FFD1] rounded-full animate-ping" />
            <div className="relative w-2 h-2 bg-[#00FFD1] rounded-full" />
          </div>
          <span className="text-[10px] font-black text-[#00FFD1] uppercase tracking-[0.6em] font-mono antialiased">
            Find the courses that lead you toward your dream career.
          </span>
        </div>

        {/* High-Contrast Typographic Stack */}
       <div className="relative py-24 px-6 overflow-hidden ">
      {/* Background Ambient Glows */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-cyan-500/10 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-600/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Main Title Section */}
        <div className="relative">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-4"
          >
            <h1 className="text-[5vw] md:text-[5.5rem] font-black italic tracking-tighter leading-[0.8] uppercase text-white select-none">
              <span className="block overflow-hidden">
                <motion.span 
                  initial={{ y: "100%" }} 
                  animate={{ y: 0 }} 
                  transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                  className="block"
                >
                  Choose Your
                </motion.span>
              </span>
              
              <span className="relative inline-block text-transparent bg-clip-text bg-gradient-to-r from-white/40 via-white to-white/40 bg-[length:200%_auto] animate-text-shimmer"
                style={{ WebkitTextStroke: "1.5px rgba(255,255,255,0.4)" }}
              >
                Career Stream.
                
                {/* Glowing Underline Decor */}
                <motion.div 
                   initial={{ width: 0 }}
                   animate={{ width: "100%" }}
                   transition={{ delay: 0.5, duration: 1 }}
                   className="absolute -bottom-2 left-0 h-[2px] bg-gradient-to-r from-cyan-400 to-transparent shadow-[0_0_15px_rgba(34,211,238,0.8)]"
                />
              </span>
            </h1>
          </motion.div>

          {/* Floating Micro-Tag with Physics */}
          <motion.div 
            initial={{ scale: 0, rotate: 0 }}
            animate={{ scale: 1, rotate: 12 }}
            whileHover={{ scale: 1.1, rotate: 0 }}
            className="absolute -top-10 right-0 md:right-[55%] bg-[#FFB800] text-black px-4 py-1 text-[12px] font-black uppercase tracking-tighter shadow-[4px_4px_0px_#000] cursor-default"
          >
            start journey
          </motion.div>
        </div>

        {/* Narrative & Action Block */}
        <div className="mt-16 grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left: Technical Context */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="lg:col-span-8 border-l-[1px] border-white/20 pl-8 md:pl-12 space-y-10"
          >
            <p className="text-slate-500 text-xl md:text-3xl font-light leading-[1.1] italic max-w-3xl">
              We’ve meticulously mapped <br className="hidden md:block" />
              <span className="text-white font-medium not-italic relative group">
                high-impact career paths
                <span className="absolute bottom-0 left-0 w-full h-[1px] bg-white/20 origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
              </span> for you. 
              <span className="text-slate-600 block mt-4 text-lg not-italic font-normal">Select a specialized stream to unlock industry-standard roadmaps.</span>
            </p>

            {/* Micro-Features */}
            <div className="flex flex-wrap gap-8">
              {[
                { icon: <ShieldCheck size={14} />, label: "Verified Guidance" },
                { icon: <Activity size={14} />, label: "Real-Time Insights" },
                { icon: <Globe size={14} />, label: "Global Alignment" }
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3 text-[10px] font-bold text-white/40 tracking-[0.2em] uppercase hover:text-cyan-400 transition-colors cursor-crosshair">
                  <span className="p-2 rounded-full border border-white/10 bg-white/5">{item.icon}</span>
                  {item.label}
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right: Abstract CTA visual */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="lg:col-span-4 flex justify-end"
          >
             <div className="group relative p-1">
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-2xl blur opacity-20 group-hover:opacity-40 transition duration-1000" />
                <div className="relative bg-[#030712] border border-white/10 p-8 rounded-2xl">
                    <div className="flex items-center justify-between mb-4">
                        <span className="text-white/20 font-mono text-xs">READY_TO_LAUNCH</span>
                        <ArrowUpRight className="text-cyan-500" size={20} />
                    </div>
                    <div className="text-4xl font-black text-white italic">5000+</div>
                    <div className="text-slate-500 text-[10px] font-bold uppercase tracking-widest mt-1">Industrial Job Roles</div>
                </div>
             </div>
          </motion.div>
        </div>
      </div>
      
    </div>

        {/* 3. BENTO METRIC FOOTER */}
        <div className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {[
            {
              label: "Career Library",
              val: "850+ Paths",
              desc: "Verified industry roles",
              icon: (
                <div className="w-2 h-2 rounded-full bg-cyan-500 shadow-[0_0_8px_rgba(6,182,212,0.5)]" />
              ),
            },
            {
              label: "Course Database",
              val: "1.2K+ Units",
              desc: "Academic roadmaps",
              icon: (
                <div className="w-2 h-2 rounded-full bg-amber-500 shadow-[0_0_8px_rgba(245,158,11,0.5)]" />
              ),
            },
            {
              label: "Student Success",
              val: "Personalized",
              desc: "Tailored to your goals",
              icon: (
                <div className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
              ),
            },
            {
              label: "System Status",
              val: "Always Live",
              desc: "Real-time updates",
              icon: (
                <div className="w-2 h-2 rounded-full bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.5)]" />
              ),
            },
          ].map((item, i) => (
            <div
              key={i}
              className="relative group p-5 bg-gradient-to-b from-white/[0.05] to-transparent border border-white/[0.08] rounded-2xl transition-all duration-300 hover:border-white/20 hover:from-white/[0.08]"
            >
              {/* Label and Status Dot */}
              <div className="flex items-center gap-2 mb-3">
                {item.icon}
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                  {item.label}
                </span>
              </div>

              {/* Main Value */}
              <div className="text-xl font-bold text-white tracking-tight mb-1">
                {item.val}
              </div>

              {/* Helpful Description (Real-world touch) */}
              <p className="text-[10px] text-slate-500 font-medium leading-tight">
                {item.desc}
              </p>

              {/* Subtle Bottom Accent Line */}
              <div className="absolute bottom-0 left-6 right-6 h-[1px] bg-gradient-to-r from-transparent via-white/5 to-transparent group-hover:via-white/20 transition-all" />
            </div>
          ))}
        </div>
      </div>

      {/* SIDE DECORATIVE DATA-STREAM */}
      <div className="absolute right-8 top-1/2 -translate-y-1/2 flex flex-col gap-12 items-center opacity-20 hidden md:flex">
        <div className="h-32 w-[1px] bg-gradient-to-b from-transparent via-[#00FFD1] to-transparent" />
        <span className="rotate-90 text-[10px] font-mono text-cyan-500 tracking-[1em] uppercase">
          Marga_Darshika
        </span>
        <div className="h-32 w-[1px] bg-gradient-to-b from-transparent via-[#00FFD1] to-transparent" />
      </div>
    </div>
  );
}

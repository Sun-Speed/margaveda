import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Compass, GraduationCap, Briefcase, MousePointer2, Radio, Globe, Sparkles, ChevronRight  } from 'lucide-react';

const HeroSection = () => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
    className="relative rounded-3xl overflow-hidden min-h-[300px] flex items-center p-8 md:p-12 border border-white/10"
  >
    <div className="absolute inset-0 bg-gradient-to-r from-cyan-900/40 to-transparent z-10" />
    <img 
      src="/assets/background.png" 
      className="absolute inset-0 w-full h-full object-cover opacity-40 scale-105"
      alt="Hero background"
    />
    
    <div className="relative z-20 max-w-lg space-y-6">
      <span className="bg-[#00FFD1] text-black text-xs font-bold px-3 py-1 rounded-full uppercase tracking-widest">New Release</span>
      <h1 className="text-4xl md:text-5xl font-extrabold text-white leading-tight">Master Full Stack Blockchain</h1>
      <p className="text-slate-300 text-lg">Build decentralized applications from scratch with our elite roadmap.</p>
      <div className="flex flex-wrap gap-4">
        {/* Primary Button: Solid Vibrant Cyan */}
        <button className="bg-[#00FFD1] hover:bg-[#00E6BC] text-[#080B0D] px-8 py-3 rounded-xl font-extrabold transition-all active:scale-95 shadow-[0_0_20px_rgba(0,255,209,0.3)] hover:shadow-[0_0_30px_rgba(0,255,209,0.5)] uppercase tracking-wider text-sm">
          Enroll Now
        </button>

        {/* Secondary Button: Glassmorphism with Cyan Hover */}
        <button className="bg-white/5 hover:bg-[#00FFD1]/10 backdrop-blur-md px-8 py-3 rounded-xl font-bold border border-white/10 hover:border-[#00FFD1]/50 text-white transition-all active:scale-95 text-sm">
          Watch Trailer
        </button>
      </div>
    </div>
  </motion.div>
);

export default HeroSection;
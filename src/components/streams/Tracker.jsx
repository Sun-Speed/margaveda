import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, ChevronLeft, Download, Target, Beaker, GraduationCap, Microscope } from 'lucide-react';
import { useTracker } from "../TrackerContext";

const PathTracker = () => {

  const { trackedCourses } = useTracker();

  console.log("my tracked courses ", trackedCourses);
  

  const [currentStep, setCurrentStep] = useState(1);

  // Define your roadmap nodes
  const roadmap = [
    { id: 1, label: "Science", icon: Beaker, desc: "Foundational PCM/PCB Research" },
    { id: 2, label: "B.Sc", icon: GraduationCap, desc: "Undergraduate Specialization" },
    { id: 3, label: "M.Sc", icon: Microscope, desc: "Advanced Masters Program" },
    { id: 4, label: "PhD / Research", icon: Target, desc: "Doctoral Thesis & Innovation" },
  ];

  const nextStep = () => setCurrentStep((prev) => Math.min(prev + 1, roadmap.length));
  const prevStep = () => setCurrentStep((prev) => Math.max(prev - 1, 1));

  const handleDownload = () => {
    alert("Downloading Mission Roadmap.pdf...");
    // Integration logic for PDF generation goes here
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-6 space-y-8">
      
      {/* 1. THE BREADCRUMB PATH (Science => BSC => MSC) */}
      <div className="flex items-center gap-3 bg-white/5 border border-[#00d4aa]/20 p-4 rounded-2xl overflow-x-auto no-scrollbar">
        {roadmap.map((node, index) => (
          <React.Fragment key={node.id}>
            <div className={`flex items-center gap-2 px-3 py-1 rounded-lg transition-all ${currentStep >= node.id ? 'text-[#00FFD1] bg-[#00FFD1]/10' : 'text-slate-500'}`}>
              <node.icon size={14} />
              <span className="text-xs font-bold uppercase tracking-wider whitespace-nowrap">{node.label}</span>
            </div>
            {index < roadmap.length - 1 && (
              <ChevronRight size={14} className="text-white/20 shrink-0" />
            )}
          </React.Fragment>
        ))}
      </div>

      {/* 2. THE VISUAL STEP TRACKER */}
      <div className="relative py-12">
        {/* Background Line */}
        <div className="absolute top-1/2 left-0 w-full h-[2px] bg-white/5 -translate-y-1/2" />
        
        {/* Active Progress Line */}
        <motion.div 
          initial={{ width: "0%" }}
          animate={{ width: `${((currentStep - 1) / (roadmap.length - 1)) * 100}%` }}
          className="absolute top-1/2 left-0 h-[2px] bg-gradient-to-r from-[#00FFD1] to-cyan-500 -translate-y-1/2 shadow-[0_0_15px_#00FFD1]"
        />

        <div className="relative flex justify-between">
          {roadmap.map((step) => (
            <div key={step.id} className="flex flex-col items-center">
              <button
                onClick={() => setCurrentStep(step.id)}
                className={`relative z-10 w-10 h-10 rounded-full border-2 flex items-center justify-center transition-all duration-500 ${
                  currentStep >= step.id 
                  ? 'bg-[#0B0E11] border-[#00FFD1] text-[#00FFD1] shadow-[0_0_20px_rgba(0,255,209,0.3)]' 
                  : 'bg-[#0B0E11] border-white/10 text-slate-600'
                }`}
              >
                {currentStep > step.id ? (
                  <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }}>✓</motion.div>
                ) : (
                  <span className="text-xs font-mono">{step.id}</span>
                )}
                
                {/* Active Pulse */}
                {currentStep === step.id && (
                  <div className="absolute inset-0 rounded-full bg-[#00FFD1] animate-ping opacity-20" />
                )}
              </button>
              
              <div className="absolute mt-14 text-center w-32">
                <p className={`text-[10px] font-bold uppercase tracking-widest ${currentStep >= step.id ? 'text-white' : 'text-slate-600'}`}>
                  {step.label}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 3. STEP CONTENT CARD */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentStep}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          className="bg-[#0B0E11] border border-white/5 p-8 rounded-[32px] mt-10 relative overflow-hidden group"
        >
          <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
            {React.createElement(roadmap[currentStep-1].icon, { size: 120 })}
          </div>

          <div className="relative z-10 space-y-4">
            <span className="text-[#00FFD1] font-mono text-[10px] tracking-[0.3em]">PHASE_0{currentStep}</span>
            <h2 className="text-2xl font-bold text-white">{roadmap[currentStep-1].label} Overview</h2>
            <p className="text-slate-400 text-sm leading-relaxed max-w-md">
              {roadmap[currentStep-1].desc}. Detailed curriculum and elective choices are ready for deployment in your mission profile.
            </p>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* 4. ACTION CONTROLS */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6">
        <div className="flex items-center gap-3">
          <button 
            onClick={prevStep}
            disabled={currentStep === 1}
            className="flex items-center gap-2 px-6 py-3 bg-white/5 hover:bg-white/10 disabled:opacity-30 disabled:cursor-not-allowed rounded-2xl text-slate-300 text-sm font-bold transition-all border border-white/5"
          >
            <ChevronLeft size={18} /> BACK
          </button>

          <button 
            onClick={nextStep}
            disabled={currentStep === roadmap.length}
            className="flex items-center gap-2 px-6 py-3 bg-[#00FFD1]/10 hover:bg-[#00FFD1]/20 disabled:opacity-30 rounded-2xl text-[#00FFD1] text-sm font-bold transition-all border border-[#00FFD1]/20"
          >
            NEXT PHASE <ChevronRight size={18} />
          </button>
        </div>

        <button 
          onClick={handleDownload}
          className="flex items-center gap-3 px-8 py-3 bg-[#00FFD1] hover:shadow-[0_0_20px_rgba(0,255,209,0.5)] text-black rounded-2xl text-sm font-black transition-all active:scale-95"
        >
          <Download size={18} /> DOWNLOAD ROADMAP
        </button>
      </div>

    </div>
  );
};

export default PathTracker;
import { motion } from "framer-motion";
import {BookOpen, X, Search, Zap, Globe, Landmark, GraduationCap, Award, Crown } from 'lucide-react';

const ViewDetails = ({selectedCourse, handleCloseModal}) => {
    return(
        <div className="fixed top-0 inset-0 z-[9999] flex items-center justify-center  md:p-6  backdrop-blur-sm overflow-hidden">
            {/* Background Glows to match Reference */}
            <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-cyan-500/10 blur-[120px] pointer-events-none" />
            
            <motion.div 
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 50 }}
              className="relative w-full max-w-6xl h-full md:h-[90vh] bg-[#080B0D] border border-white/10 rounded-t-[32px] md:rounded-[32px] overflow-hidden flex flex-col md:flex-row shadow-2xl"
            >
              {/* Close Button */}
              <button 
                onClick={handleCloseModal}
                className="absolute top-6 right-6 z-50 p-2 bg-white/5 hover:bg-white/10 rounded-xl border border-white/10 transition-all"
              >
                <X className="text-slate-400 hover:text-white" size={24} />
              </button>
              <div className="flex flex-col md:flex-row h-full overflow-y-auto md:overflow-hidden custom-scroll">
                {/* LEFT PANEL: Core Mission Specs */}
                <div className="w-full md:w-[35%] bg-[#0B0E11] p-8 flex flex-col justify-start border-r border-white/5 shrink-0">
                  <div className="space-y-6">
                    <div className="space-y-1">
                      <span className="text-[#00FFD1] text-[10px] font-bold tracking-[0.2em] uppercase">PATH ID: {selectedCourse._id}</span>
                      <h1 className="text-2xl font-extrabold text-white leading-tight">{selectedCourse.name}</h1>
                    </div>

                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#00FFD1]/5 border border-[#00FFD1]/20 rounded-xl">
                      <span className="text-[11px] text-slate-300"><strong>Level:</strong> {selectedCourse.level}</span>
                      <div className="w-[1px] h-3 bg-white/10" />
                      <span className="text-[11px] text-slate-300"><strong>Duration:</strong> {selectedCourse.duration}</span>
                    </div>

                    <div className="p-4 bg-white/5 rounded-2xl border-l-2 border-[#00FFD1] text-sm text-slate-400 italic leading-relaxed">
                      Prerequisite: {selectedCourse.after}
                    </div>

                    <div className="relative group">
                      {/* Left Accent Glow Line */}
                      <div className="absolute left-0 top-0 bottom-0 w-[2px] bg-gradient-to-b from-[#00FFD1] via-[#00FFD1]/20 to-transparent rounded-full shadow-[0_0_8px_rgba(0,255,209,0.3)]" />

                      {/* Description Container */}
                      <div className="pl-6 py-2 bg-white/[0.02] border-r border-y border-white/5 rounded-r-2xl transition-all group-hover:bg-white/[0.04]">
                        <h4 className="text-[10px] uppercase font-bold tracking-[0.2em] text-slate-500 mb-2">
                          Mission Briefing
                        </h4>
                        <p className="text-slate-300 text-sm leading-relaxed font-medium selection:bg-[#00FFD1]/30">
                          {selectedCourse.description}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* <button 
                    onClick={() => navigate("/explore")}
                    className="mt-8 group flex items-center justify-center gap-3 w-full bg-transparent border border-[#00FFD1]/30 py-4 rounded-2xl text-[#00FFD1] font-bold hover:bg-[#00FFD1] hover:text-black transition-all duration-300"
                  >
                    EXPLORE DEEP
                  </button> */}
                </div>

                {/* RIGHT PANEL: Intelligence Report */}
                <div className="flex-1 p-6 md:p-10 md:overflow-y-auto custom-scroll space-y-12">
                  
                  {/* Required Pilot Profile */}
                  <section className="space-y-4 bg-[#00d4aa]/5 border border-[#00d4aa]/20 rounded-xl p-5 mt-6;">
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 rounded-full bg-blue-500 pulse-cyan" />
                      <h3 className="text-[#00FFD1] uppercase text-xs font-bold tracking-widest">Required Pilot Profile</h3>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {selectedCourse.recommendedFor.map((trait, index) => (
                        <div key={index} className="flex items-center gap-3 p-4 bg-white/5 border border-white/5 rounded-2xl hover:bg-white/10 transition-all">
                          <div className="text-[#00FFD1] text-xs">◈</div>
                          <span className="text-sm text-slate-300">{trait}</span>
                        </div>
                      ))}
                    </div>
                  </section>

                  {/* Authorization & Communication */}
                  <section className="space-y-6 bg-[#00d4aa]/5 border border-[#00d4aa]/20 rounded-xl p-5 mt-6;">
                    <h3 className="text-[#00FFD1] uppercase text-[10px] font-bold tracking-[0.3em]">Authorization & Communication</h3>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                      <div className="p-6 bg-white/5 border border-white/5 rounded-[24px] space-y-4 hover:border-[#00FFD1]/20">
                        <div className="flex items-center gap-3 text-yellow-500/80">
                          <Zap size={18} /> <h4 className="text-sm font-bold">Mission Eligibility</h4>
                        </div>
                        <div className="bg-[#00FFD1]/10 text-[#00FFD1] text-[10px] px-2 py-1 rounded w-fit font-bold">REQUIRED</div>
                        <p className="text-slate-400 text-sm">{selectedCourse.eligibility}</p>
                      </div>

                      <div className="p-6 bg-white/5 border border-white/5 rounded-[24px] space-y-4 hover:border-[#00FFD1]/20">
                        <div className="flex items-center gap-3 text-blue-500/80">
                          <Globe size={18} /> <h4 className="text-sm font-bold">Communication Protocols</h4>
                        </div>
                        {selectedCourse.languages.map((lang, i) => (
                          <div key={i} className="flex items-center gap-4 text-sm bg-black/20 p-3 rounded-xl">
                            <span className="text-[10px] text-cyan-500 font-mono">LN_0{i+1}</span>
                            <span className="text-slate-300">{lang}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </section>

                  {/* Market Analysis */}
                  <section className="space-y-6 p-6 bg-[#00d4aa]/5 border border-[#00d4aa]/20 rounded-xl p-5 mt-6; ">
                    <h3 className="text-[#00FFD1] uppercase text-[10px] font-bold tracking-[0.3em]">Market Analysis & Demands</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                      <div className="space-y-2">
                        <div className="flex items-center gap-2 text-[10px] text-slate-500 uppercase font-bold"><div className="w-1.5 h-1.5 rounded-full bg-red-500" /> Complexity</div>
                        <div className="bg-white/5 p-4 rounded-xl border-l-4 border-orange-500 text-white font-bold">{selectedCourse.difficultyLevel}</div>
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center gap-2 text-[10px] text-slate-500 uppercase font-bold"><div className="w-1.5 h-1.5 rounded-full bg-green-500" /> Current Demand</div>
                        <div className="text-1xl font-bold text-[#00FFD1] ">{selectedCourse.demandTrend}</div>
                      </div>
                      <div className="space-y-2">
                        <p className="text-[10px] text-slate-500 uppercase font-bold">Financial Estimate</p>
                        <div className="text-2xl font-bold text-white flex items-baseline gap-1">
                          <span className="text-[#00FFD1] text-lg">₹</span>{selectedCourse.avgFees.toLocaleString()}<span className="text-[10px] text-slate-500">/year</span>
                        </div>
                      </div>
                    </div>
                  </section>

                  {/* Subjects & Career Orbit */}
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 bg-[#00d4aa]/5 border border-[#00d4aa]/20 rounded-xl p-5 mt-6;">
                    {/* SECTION 1: SUBJECTS & MODULES */}
                    <section className="p-6 bg-[#01120c8c]/5 border border-white/5 rounded-[10px] space-y-6 hover:border-[#00FFD1]/20">
                      <div className="flex flex-col gap-1">
                        <h3 className="text-[#00FFD1] uppercase text-[10px] font-bold tracking-[0.3em]">Subjects & Modules</h3>
                        <div className="h-[1px] w-12 bg-[#00FFD1]/50" />
                      </div>

                      <div className="space-y-6">
                        {/* Core Subjects Sub-Group */}
                        <div className="space-y-3">
                          <h4 className="text-[11px] text-slate-500 uppercase font-bold tracking-wider flex items-center gap-2 ">
                            <span className="w-1 h-1 bg-[#00FFD1] rounded-full text-[#00FFD1]" /> Core Subjects
                          </h4>
                          <div className="flex flex-wrap gap-2">
                            {selectedCourse.subjects1.map((s) => (
                              <span key={s} className="px-3 py-1.5 bg-white/5 border border-white/10 rounded-lg text-[11px] text-slate-300 hover:border-white/20 transition-colors">
                                {s}
                              </span>
                            ))}
                          </div>
                        </div>

                        {/* Electives Sub-Group */}
                        <div className="space-y-3">
                          <h4 className="text-[11px] text-slate-500 uppercase font-bold tracking-wider flex items-center gap-2">
                            <span className="w-1 h-1 bg-[#00FFD1] rounded-full text-[#00FFD1]" /> Electives
                          </h4>
                          <div className="flex flex-wrap gap-2">
                            {selectedCourse.subjects2.map((s) => (
                              <span key={s} className="px-3 py-1.5 bg-cyan-500/5 border border-cyan-500/20 rounded-lg text-[11px] text-cyan-400 hover:bg-cyan-500/10 transition-all">
                                {s}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </section>

                    {/* SECTION 2: CAREER ORBIT */}
                    <section className="p-6 bg-[#01120c8c]/5 border border-white/5 space-y-6 rounded-[10px] hover:border-[#00FFD1]/20">
                      <div className="flex flex-col gap-1">
                        <h3 className="text-[#00FFD1] uppercase text-[10px] font-bold tracking-[0.3em]">Career Orbit</h3>
                        <div className="h-[1px] w-12 bg-blue-500/50" />
                      </div>

                      <div className="grid gap-2">
                        {selectedCourse.futureScope.map((job) => (
                          <div 
                            key={job} 
                            className="group flex items-center justify-between p-3.5 bg-white/[0.02] border border-white/5 rounded-xl hover:bg-white/5 hover:border-[#00FFD1]/20 transition-all duration-300"
                          >
                            <div className="flex items-center gap-4">
                              <div className="relative">
                                <div className="w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_10px_#00FFD1]" />
                                <div className="absolute inset-0 w-2 h-2 rounded-full bg-cyan-400 animate-ping opacity-20" />
                              </div>
                              <span className="text-sm font-medium text-slate-200 group-hover:text-white transition-colors">{job}</span>
                            </div>
                            
                            {/* Subtle "Arrow" element to match dashboard feel */}
                            <div className="opacity-0 group-hover:opacity-100 transition-opacity text-[#00FFD1] text-[10px] font-mono">
                              NEXT_LEVEL &gt;
                            </div>
                          </div>
                        ))}
                      </div>
                    </section>
                  </div>

                  <section className="p-8 space-y-8 bg-[#00d4aa]/5 border border-[#00d4aa]/20 rounded-xl p-5 mt-6;">
                    <div className="flex flex-col gap-1">
                      <h3 className="text-[#00FFD1] uppercase text-[10px] font-bold tracking-[0.3em]">Entrance Gateways & Global Reach</h3>
                      <div className="h-[1px] w-12 bg-cyan-500/50" />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* Local Mission: Exams */}
                      <div className="group p-6 bg-white/[0.03] border border-white/10 rounded-[24px] hover:border-red-500/30 transition-all">
                        <div className="flex items-center gap-3 mb-4">
                          <div className="w-2 h-2 rounded-full bg-red-500 pulse-red" />
                          <h4 className="text-sm font-bold text-slate-200">Required Entrance Exams</h4>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {selectedCourse.entranceExams.map((exam, i) => (
                            <span key={i} className="text-xs font-mono text-slate-400 bg-black/40 px-3 py-1.5 rounded-lg border border-white/5 group-hover:text-white transition-colors">
                              {exam}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Global Mission: Abroad */}
                      <div className="group p-6 bg-white/[0.03] border border-white/10 rounded-[24px] hover:border-blue-500/30 transition-all">
                        <div className="flex items-center gap-3 mb-4">
                          <div className="w-2 h-2 rounded-full bg-blue-500 pulse-blue" />
                          <h4 className="text-sm font-bold text-slate-200">Abroad Opportunities</h4>
                        </div>
                        <p className="text-sm text-slate-400 leading-relaxed group-hover:text-slate-200 transition-colors">
                          {selectedCourse.abroadOptions.join(" • ")}
                        </p>
                      </div>
                    </div>
                  </section>

                  <section className="p-8 space-y-8 bg-[#00d4aa]/5 border border-[#00d4aa]/20 rounded-xl p-5 mt-6;">
                    <div className="flex flex-col gap-1">
                      <h3 className="text-[#00FFD1] uppercase text-[10px] font-bold tracking-[0.3em]">Academic Infrastructure & Support</h3>
                      <div className="h-[1px] w-12 bg-[#00FFD1]/50" />
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                      {/* Pillar 1: Top Colleges (Karnataka focus) */}
                      <div className="space-y-4">
                        <div className="flex items-center gap-3 text-slate-400">
                          <Landmark size={18} className="text-cyan-400" />
                          <h4 className="text-[11px] uppercase font-bold tracking-widest">Top Colleges (Karnataka)</h4>
                        </div>
                        <div className="grid grid-cols-1 gap-2">
                          {selectedCourse.topColleges.map((college, i) => (
                            <div key={i} className="flex items-center justify-between p-3 bg-white/5 border border-white/5 rounded-xl hover:bg-[#00FFD1]/5 transition-all group">
                              <span className="text-sm text-slate-300 group-hover:text-white">{college}</span>
                              <span className="text-[10px] font-mono text-slate-600 group-hover:text-[#00FFD1]">INST_REF_{i+1}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Pillar 2: Scholarships */}
                      <div className="space-y-4">
                        <div className="flex items-center gap-3 text-slate-400">
                          <Award size={18} className="text-yellow-500" />
                          <h4 className="text-[11px] uppercase font-bold tracking-widest">Available Scholarships</h4>
                        </div>
                        <div className="space-y-3">
                          {selectedCourse.scholarships.map((award, i) => (
                            <div key={i} className="relative p-4 bg-gradient-to-r from-white/5 to-transparent border-l-2 border-yellow-500/50 rounded-r-xl">
                              <div className="flex items-start gap-3">
                                <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-yellow-500 shadow-[0_0_8px_rgba(234,179,8,0.5)]" />
                                <p className="text-sm text-slate-300 leading-tight">{award}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </section>

                  {/* Final Mission Dossier (Skills Gained) */}
                  <section className="p-8 space-y-8 bg-[#00d4aa]/5 border border-[#00d4aa]/20 rounded-xl p-5 mt-6;">
                    <h3 className="text-[#00FFD1] uppercase text-[10px] font-bold tracking-[0.3em]">Final Mission Dossier</h3>
                    <div className="space-y-6">
                      <h4 className="flex items-center gap-3 text-sm font-bold text-slate-200">
                        <Zap size={16} className="text-yellow-500" /> Neural Enhancements (Skills Gained)
                      </h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6">
                        {selectedCourse.skillsGained.map((skill, i) => (
                          <div key={i} className="group flex items-center justify-between">
                            <span className="text-xs text-slate-400 group-hover:text-white transition-colors">{skill}</span>
                            <div className="flex-1 mx-4 h-[1px] bg-white/10 relative">
                              <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-cyan-500 shadow-[0_0_10px_#00FFD1]" />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Famous Legends */}
                    <div className="mt-10 p-6 bg-cyan-500/5 border border-cyan-500/20 rounded-[24px]">
                      <div className="flex items-center gap-3 mb-3 text-orange-400">
                        <Crown size={18} /> <h4 className="text-xs font-bold uppercase tracking-widest">Vanguard Legends</h4>
                      </div>
                      <p className="text-sm text-slate-400 leading-relaxed">
                        This path was pioneered by: <span className="text-white font-bold">{selectedCourse.famousPeople.join(" • ")}</span>
                      </p>
                    </div>
                  </section>

                </div>
              </div>
            </motion.div>
          </div>
    )
}

export default ViewDetails;
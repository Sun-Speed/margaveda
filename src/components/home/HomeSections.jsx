import React from "react";
import { motion } from "framer-motion";
import {
  Fingerprint,
  Map,
  Target,
  ArrowRight,
  Layers,
  Shovel,
  Cpu,
  ShieldCheck,
} from "lucide-react";
import {
  Share2,
  Zap,
  Layout,
  GraduationCap,
  Search,
  MapPin,
  Flag,
  Briefcase,
  Compass,
  Route,
  Trophy,
  ArrowRightLeft,
  AlertCircle,
  FolderOpen,
  FileDown,
  CheckCircle,
  Filter,
  University,
  Sparkles,
} from "lucide-react";
import {
  FileText,
  Download,
  Database,
  CheckCircle2,
  Trash2,
  Shield,
  ArrowDown,
  ChevronRight,
} from "lucide-react";

const NextSections = () => {
  const Step = ({ icon: Icon, title, desc, color }) => (
    <div className="flex gap-4 group">
      <div
        className={`mt-1 p-2 rounded-lg bg-${color}-500/5 border border-${color}-500/10 text-${color}-400 group-hover:bg-${color}-500 group-hover:text-black transition-all duration-300`}
      >
        <Icon size={16} />
      </div>
      <div>
        <h4 className="text-[11px] font-black uppercase tracking-widest text-white mb-1">
          {title}
        </h4>
        <p className="text-slate-500 text-[12px] leading-snug font-light">
          {desc}
        </p>
      </div>
    </div>
  );

  const rootNode = {
    header: "ACADEMIC STATUS (REQUIRED)",
    title: "10th Standard Completed",
  };

  const streamNodes = [
    {
      header: "HIGHER SECONDARY (ACADEMIC PATH)",
      title: "Science Stream (PCM/PCB)",
    },
    {
      header: "HIGHER SECONDARY (ACADEMIC PATH)",
      title: "Commerce Stream",
    },
    {
      header: "HIGHER SECONDARY (ACADEMIC PATH)",
      title: "Arts / Humanities Stream",
    },
  ];

  // 2. COMPONENT: The "Nexus Card" UI
  const NexusCard = ({ header, title, isRoot = false }) => (
    <div
      className={`relative p-5 bg-[#0a0c10] border border-white/10 rounded-2xl text-left ${isRoot ? "w-80" : "w-full"}`}
    >
      {/* Decorative Connecting Dots from Image */}
      <div className="absolute top-1/2 left-0 -translate-x-1/2 -translate-y-1/2 w-3 h-3 bg-cyan-500 rounded-full border-2 border-[#0a0c10]" />
      <div className="absolute top-1/2 right-0 translate-x-1/2 -translate-y-1/2 w-3 h-3 bg-cyan-500 rounded-full border-2 border-[#0a0c10]" />

      {/* Top Accent Line */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-16 h-[2px] bg-cyan-500 shadow-[0_0_15px_#06b6d4]" />

      <div className="space-y-1 mb-4">
        <div className="text-[10px] font-black text-slate-500 uppercase tracking-[0.15em] font-sans selection:bg-cyan-500">
          {header}
        </div>
        <div className="text-base md:text-lg font-black text-white uppercase tracking-tight antialiased leading-tight">
          {title}
        </div>
      </div>

      {/* THE "VIEW INTELLIGENCE" BUTTON from Image */}
      <motion.button
        whileHover={{ bg: "rgba(34,211,238,0.1)" }}
        className="w-full py-2.5 px-4 bg-black border border-white/10 rounded-lg text-center transition-colors"
      >
        <span className="text-[10px] font-black uppercase tracking-[0.3em] text-cyan-400">
          View Intelligence
        </span>
      </motion.button>
    </div>
  );

  const MiniNexusCard = ({ header, title, isRoot = false }) => (
    <div
      className={`relative p-3 bg-[#0a0c10] border border-white/10 rounded-xl text-left ${isRoot ? "w-56" : "w-48"} group hover:border-cyan-500/50 transition-all duration-300`}
    >
      {/* Side Connection Points */}
      <div className="absolute top-1/2 left-0 -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-cyan-500 rounded-full border border-[#05070a] shadow-[0_0_8px_#22d3ee]" />
      <div className="absolute top-1/2 right-0 translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-cyan-500 rounded-full border border-[#05070a] shadow-[0_0_8px_#22d3ee]" />

      {/* Top Cyber Accent */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-10 h-[1.5px] bg-cyan-500 shadow-[0_0_10px_#06b6d4] opacity-70" />

      <div className="mb-3">
        <div className="text-[8px] font-black text-slate-500 uppercase tracking-widest mb-0.5 antialiased">
          {header}
        </div>
        <div className="text-[11px] font-black text-white uppercase tracking-tight leading-tight italic">
          {title}
        </div>
      </div>

      <button className="w-full py-1.5 bg-black/40 border border-white/5 rounded-md group-hover:border-cyan-500/30 transition-all">
        <span className="text-[8px] font-black uppercase tracking-[0.2em] text-cyan-400/80 group-hover:text-cyan-400">
          View Intelligence
        </span>
      </button>
    </div>
  );

  return (
    <>
      <section className="relative w-full py-12 overflow-hidden antialiased">
        {/* 1. SECTION HEADER */}
        <div className="max-w-7xl mx-auto px-6 mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-col gap-4 text-center"
          >
            <h2 className="text-4xl font-black italic text-white uppercase tracking-tighter">
              What is{" "}
              <span
                className="text-transparent"
                style={{ WebkitTextStroke: "1px #fff" }}
              >
                Marga Veda?
              </span>
            </h2>
            <p className="text-[10px] font-mono text-cyan-500 uppercase tracking-[0.5em] font-bold">
              Bridging the Guidance Gap
            </p>
          </motion.div>
        </div>

        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-12 gap-4">
          {/* NEW: THE "WHY" CARD (Addressing the Lack of Guidance) */}
          <motion.div className="md:col-span-12 p-6 bg-red-500/[0.02] border border-red-500/10 rounded-2xl flex flex-col md:flex-row items-center gap-8 group">
            <div className="p-4 bg-red-500/5 rounded-xl border border-red-500/10 text-red-400">
              <AlertCircle size={22} />
            </div>
            <div className="flex-grow">
              <p className="text-lg text-white font-bold italic leading-tight mb-1 uppercase tracking-tight">
                The Problem:{" "}
                <span className="text-red-400/80 text-base font-medium">
                  The Guidance Crisis
                </span>
              </p>
              <p className="text-slate-500 text-sm font-light max-w-4xl leading-relaxed">
                In an era of endless information, students face a severe{" "}
                <span className="text-white font-medium">
                  {" "}lack of authentic career guidance
                </span>
                . This leads to choice-paralysis, wasted years, and mismatched
                career paths. Most students choose careers based on trend, not
                talent.
              </p>
            </div>
          </motion.div>

          {/* THE SOLUTION: SLIM CORE DEFINITION */}
          <motion.div className="md:col-span-12 p-6 bg-white/[0.01] border border-white/5 rounded-2xl flex flex-col md:flex-row items-center gap-8 group hover:bg-white/[0.03] transition-all">
            <div className="p-4 bg-cyan-500/5 rounded-xl border border-cyan-500/10 text-cyan-400 group-hover:bg-cyan-500 group-hover:text-black transition-all">
              <Fingerprint size={22} />
            </div>
            <div className="flex-grow">
              <p className="text-xl text-white font-bold italic leading-tight mb-2 uppercase">
                The Solution:{" "}
                <span className="text-cyan-400">Next-Gen Guidance</span>
              </p>
              <p className="text-slate-500 text-sm font-light max-w-3xl leading-relaxed">
                Marga Veda decodes this complexity. We synthesize vast
                industrial data into{" "}
                <span className="text-white">
                  actionable roadmap intelligence
                </span>
                , ensuring your transition from school to career is backed by
                logic, not luck.
              </p>
            </div>
            <div className="hidden lg:block w-[1px] h-12 bg-white/10" />
            <div className="flex flex-col items-end shrink-0">
              <span className="text-[9px] font-mono text-slate-600 uppercase tracking-widest">
                Logic_Backing
              </span>
              <span className="text-sm font-black text-white italic uppercase tracking-tighter">
                Data-Driven
              </span>
            </div>
          </motion.div>

          {/* FEATURE 2 & 3: Remaining the same for consistency */}
          <motion.div className="md:col-span-6 p-6 bg-white/[0.01] border border-white/5 rounded-2xl flex items-start gap-5 group hover:border-amber-500/30 transition-all">
            <div className="p-3 bg-amber-500/5 rounded-lg text-amber-500 border border-amber-500/10 group-hover:bg-amber-500 group-hover:text-black transition-all">
              <Map size={18} />
            </div>
            <div>
              <h3 className="text-sm font-black text-white uppercase italic tracking-widest mb-1 group-hover:text-amber-500 transition-colors">
                Clarity Engine
              </h3>
              <p className="text-slate-500 text-[13px] font-medium italic leading-snug">
                Replace choice-paralysis with a singular, high-definition career
                roadmap.
              </p>
            </div>
          </motion.div>

          <motion.div className="md:col-span-6 p-6 bg-white/[0.01] border border-white/5 rounded-2xl flex items-start gap-5 group hover:border-white/20 transition-all">
            <div className="p-3 bg-white/5 rounded-lg text-white/40 border border-white/10 group-hover:bg-white group-hover:text-black transition-all">
              <Target size={18} />
            </div>
            <div>
              <h3 className="text-sm font-black text-white uppercase italic tracking-widest mb-1">
                Phase_Mapping
              </h3>
              <p className="text-slate-500 text-[13px] font-medium leading-snug uppercase">
                Charting the direct path from your current stage to your
                professional destination.
              </p>
            </div>
          </motion.div>
        </div>

        <div className="mt-12 flex justify-center">
          <div className="h-[1px] w-64 bg-gradient-to-r from-transparent via-cyan-500/40 to-transparent" />
        </div>
      </section>

      <section className="relative w-full py-8 ">
        <div className="max-w-7xl mx-auto px-6">
          {/* HEADER */}
          <div className="flex flex-col items-center text-center mb-16">
            <div className="flex items-center gap-2 mb-4 px-3 py-1 bg-white/5 border border-white/10 rounded-full">
              <ArrowRightLeft size={12} className="text-cyan-400" />
              <span className="text-[9px] font-mono text-white/50 uppercase tracking-[0.4em]">
                Dual_Path_Logic
              </span>
            </div>
            <h2 className="text-4xl font-black italic text-white uppercase tracking-tighter">
              How it{" "}
              <span
                className="text-transparent"
                style={{ WebkitTextStroke: "1px #fff" }}
              >
                Works
              </span>
            </h2>
          </div>

          {/* THE DUAL PATH CONTAINER */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-px bg-white/5 border border-white/10 rounded-[2.5rem] overflow-hidden backdrop-blur-sm">
            {/* LEFT SIDE: COURSES → CAREER */}
            <div className="p-10 md:p-14 bg-[#030507] relative group">
              <div className="absolute top-0 left-0 w-full h-1 bg-cyan-500/20" />
              <div className="mb-10">
                <span className="text-cyan-400 font-mono text-[10px] tracking-widest uppercase">
                  Protocol_Alpha
                </span>
                <h3 className="text-2xl font-black italic text-white uppercase mt-2">
                  Courses <span className="text-cyan-400">→</span> Career
                </h3>
              </div>

              <div className="space-y-8 font-inter">
                <Step
                  icon={GraduationCap}
                  color="cyan"
                  title="Select Status"
                  desc="Choose your current qualification (10th / 12th / Degree)."
                />
                <Step
                  icon={Search}
                  color="cyan"
                  title="Discovery"
                  desc="Explore available courses based on your selection."
                />
                <Step
                  icon={MapPin}
                  color="cyan"
                  title="Outcome Mapping"
                  desc="See where each course leads in the professional world."
                />
                <Step
                  icon={Flag}
                  color="cyan"
                  title="Final Arrival"
                  desc="Follow a structured path till your goal is reached."
                />
              </div>
            </div>

            {/* RIGHT SIDE: CAREER → PATH */}
            <div className="p-10 md:p-14 bg-[#030507] relative group">
              <div className="absolute top-0 left-0 w-full h-1 bg-amber-500/20" />
              <div className="mb-10">
                <span className="text-amber-500 font-mono text-[10px] tracking-widest uppercase">
                  Protocol_Omega
                </span>
                <h3 className="text-2xl font-black italic text-white uppercase mt-2">
                  Career <span className="text-amber-500">→</span> Path
                </h3>
              </div>

              <div className="space-y-8 font-inter">
                <Step
                  icon={Trophy}
                  color="amber"
                  title="Define Goal"
                  desc="Select the dream job or career title you wish to achieve."
                />
                <Step
                  icon={Briefcase}
                  color="amber"
                  title="Market Analysis"
                  desc="Understand the skills and degrees required for that role."
                />
                <Step
                  icon={Compass}
                  color="amber"
                  title="Reverse Roadmap"
                  desc="We guide you on exactly what to study to reach it."
                />
                <Step
                  icon={Route}
                  color="amber"
                  title="Guided Ascent"
                  desc="Follow the milestones calculated by Marga Veda."
                />
              </div>
            </div>
          </div>

          {/* END LINE */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="mt-16 flex flex-col items-center gap-4"
          >
            <p className="text-white font-black italic uppercase tracking-[0.5em] text-[12px]">
              No confusion.{" "}
              <span className="text-cyan-500 underline decoration-cyan-500/30 underline-offset-4">
                Just clarity.
              </span>
            </p>
            <div className="mt-8 flex justify-center">
              <div className="h-[1px] w-64 bg-gradient-to-r from-transparent via-cyan-500/40 to-transparent" />
            </div>
          </motion.div>
        </div>
      </section>

      <section className="relative w-full py-2 lg:py-4">
        <div className="max-w-6xl mx-auto px-6">
          {/* --- HEADER --- */}
          <div className="text-center space-y-4 mb-12 lg:mb-20">
            <div className="flex justify-center items-center gap-2">
              <Zap size={14} className="text-cyan-500 animate-pulse" />
              <span className="text-[10px] font-mono text-cyan-500 uppercase tracking-[0.5em] font-black">
                System_Preview_v2
              </span>
            </div>
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-black italic text-white uppercase tracking-tighter leading-none">
              The{" "}
              <span
                className="text-transparent"
                style={{ WebkitTextStroke: "1.5px #fff" }}
              >
                Neural Map
              </span>
            </h2>
            <p className="text-slate-500 text-xs md:text-sm font-medium italic max-w-xl mx-auto leading-relaxed">
              Experience your career as a{" "}
              <span className="text-white">connected ecosystem</span>. Complex
              data translated into a fluid visual journey.
            </p>
          </div>

          {/* --- THE VISUAL CONTAINER --- */}
          <div className="relative w-full border border-white/5 bg-white/[0.01] rounded-[2.5rem] p-8 lg:p-16 overflow-hidden">
            {/* Enhanced Background Tech-Grid */}
            <div
              className="absolute inset-0 opacity-20 [mask-image:radial-gradient(ellipse_at_center,black_40%,transparent_110%)]"
              style={{
                backgroundImage:
                  "radial-gradient(circle, #22d3ee 0.5px, transparent 0.5px)",
                backgroundSize: "30px 30px",
              }}
            />

            {/* Visual Layout: Vertical on Mobile, Horizontal on Desktop */}
            <div className="relative z-10 flex flex-col lg:flex-row items-center justify-center gap-10 lg:gap-24">
              {/* ROOT NODE */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                className="relative"
              >
                <MiniNexusCard
                  header="ENTRY POINT"
                  title="10th Standard"
                  isRoot={true}
                />

                {/* Connector Line: Vertical on Mobile, Horizontal on Desktop */}
                <div className="absolute top-full left-1/2 -translate-x-1/2 h-10 w-[1px] bg-gradient-to-b from-cyan-500 to-transparent lg:hidden" />
                <div className="absolute left-full top-1/2 -translate-y-1/2 w-24 h-[1px] bg-gradient-to-r from-cyan-500 to-transparent hidden lg:block" />
              </motion.div>

              {/* BRANCHES (Vertical Stack) */}
              <div className="flex flex-col gap-4 w-full max-w-[280px] lg:max-w-none lg:w-auto">
                {[
                  { label: "SCIENCE", title: "Science (PCM/B)", delay: 0.1 },
                  { label: "COMMERCE", title: "Commerce Stream", delay: 0.2 },
                  { label: "ARTS", title: "Arts & Humanities", delay: 0.3 },
                ].map((branch, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: branch.delay }}
                    className="flex items-center gap-4"
                  >
                    {/* Small pointer for mobile */}
                    <ChevronRight
                      size={14}
                      className="text-cyan-500 hidden lg:block"
                    />
                    <MiniNexusCard header={branch.label} title={branch.title} />
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Improved System Tag */}
            <div className="mt-12 flex justify-center">
              <div className="px-4 py-1.5 border border-white/10 rounded-full bg-black/40 backdrop-blur-md flex items-center gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-cyan-500 animate-pulse" />
                <span className="text-[9px] font-mono text-white/40 uppercase tracking-[0.3em] font-bold">
                  10th_Standard_Mapping // Active
                </span>
              </div>
            </div>
          </div>

          {/* --- SYSTEM SPECS (3-Column Grid) --- */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-12 mt-20 border-t border-white/5 pt-12">
            <SpecItem
              icon={<Share2 size={18} />}
              title="Neural Nodes"
              desc="Connected paths showing career progression."
            />
            <SpecItem
              icon={<Layout size={18} />}
              title="Intelligence"
              desc="Dossiers for every course and job title."
            />
            <SpecItem
              icon={<Zap size={18} />}
              title="Live Logic"
              desc="Roadmaps that evolve with industry demand."
            />
          </div>
        </div>
      </section>

      <section className="relative w-full py-8 ">
        <div className="max-w-4xl mx-auto px-6 text-center">
          {/* TOP BADGE */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-3 py-1 bg-cyan-500/5 border border-cyan-500/10 rounded-full mb-6"
          >
            <Sparkles size={12} className="text-cyan-400" />
            <span className="text-[9px] font-mono text-cyan-400 uppercase tracking-[0.4em] font-black">
              Curated_Intelligence
            </span>
          </motion.div>

          {/* CENTERED TEXT HEADER */}
          <div className="space-y-6 mb-12">
            <h2 className="text-4xl md:text-5xl font-black italic text-white uppercase tracking-tighter">
              🎓 Find the{" "}
              <span
                className="text-transparent"
                style={{ WebkitTextStroke: "1px #fff" }}
              >
                Right College
              </span>
            </h2>

            <p className="text-slate-400 text-base md:text-lg font-medium leading-relaxed italic max-w-2xl mx-auto">
              We don’t just show you paths; we show you the{" "}
              <span className="text-white">best places to walk them</span>.
              Marga Veda provides a curated list of top colleges for every
              course, mapped by excellence and location.
            </p>
          </div>

          {/* CURATION INDICATORS (Not Buttons, just Visual Guides) */}
          <div className="flex flex-wrap justify-center gap-4 mb-16">
            <div className="flex items-center gap-3 px-5 py-3 bg-white/[0.02] border border-white/10 rounded-2xl">
              <MapPin size={16} className="text-cyan-500" />
              <span className="text-[10px] font-black uppercase tracking-widest text-slate-300">
                Filtered by Location
              </span>
            </div>
            <div className="flex items-center gap-3 px-5 py-3 bg-white/[0.02] border border-white/10 rounded-2xl">
              <GraduationCap size={16} className="text-amber-500" />
              <span className="text-[10px] font-black uppercase tracking-widest text-slate-300">
                Categorized by Course
              </span>
            </div>
            <div className="flex items-center gap-3 px-5 py-3 bg-white/[0.02] border border-white/10 rounded-2xl">
              <ShieldCheck size={16} className="text-green-500" />
              <span className="text-[10px] font-black uppercase tracking-widest text-slate-300">
                Verified Institutions
              </span>
            </div>
          </div>

          {/* THE "HOW WE LIST THEM" PREVIEW CONTAINER */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className="relative p-1 bg-gradient-to-b from-white/10 to-transparent rounded-[2.5rem]"
          >
            <div className="bg-[#05070a] rounded-[2.4rem] p-8 md:p-12 border border-white/5">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Feature 1 */}
                <div className="space-y-3">
                  <div className="text-cyan-400 font-black italic tracking-tighter text-lg uppercase">
                    Top Tier Only
                  </div>
                  <p className="text-[12px] text-slate-500 leading-relaxed font-medium">
                    We filter the noise to provide only the highest-ranking
                    colleges for your specific career path.
                  </p>
                </div>

                {/* Feature 2 (Center) */}
                <div className="space-y-3 border-y md:border-y-0 md:border-x border-white/10 py-6 md:py-0 px-0 md:px-8">
                  <div className="text-white font-black italic tracking-tighter text-lg uppercase">
                    Course Specific
                  </div>
                  <p className="text-[12px] text-slate-500 leading-relaxed font-medium">
                    Every course roadmap in Marga Veda ends with a direct
                    list of specialized colleges.
                  </p>
                </div>

                {/* Feature 3 */}
                <div className="space-y-3">
                  <div className="text-amber-500 font-black italic tracking-tighter text-lg uppercase">
                    Geographic Hubs
                  </div>
                  <p className="text-[12px] text-slate-500 leading-relaxed font-medium">
                    Colleges are organized by major education hubs to help you
                    find the best fit nearby.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          <div className="mt-8 flex justify-center">
            <div className="h-[1px] w-64 bg-gradient-to-r from-transparent via-cyan-500/40 to-transparent" />
          </div>
        </div>
      </section>

      <section className="relative w-full py-8">
        <div className="max-w-4xl mx-auto px-6 text-center">
          {/* TOP BADGE */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-3 py-1 bg-amber-500/5 border border-amber-500/10 rounded-full mb-6"
          >
            <FolderOpen size={12} className="text-amber-400" />
            <span className="text-[9px] font-mono text-amber-400 uppercase tracking-[0.4em] font-black">
              Persistence_Layer
            </span>
          </motion.div>

          {/* CENTERED TEXT HEADER (Matches College Section Style) */}
          <div className="space-y-6 mb-12">
            <h2 className="text-4xl md:text-5xl font-black italic text-white uppercase tracking-tighter">
              Your Future,{" "}
              <span
                className="text-transparent"
                style={{ WebkitTextStroke: "1px #fff" }}
              >
                Archived & Exported
              </span>
            </h2>

            <p className="text-slate-400 text-base md:text-lg font-medium leading-relaxed italic max-w-2xl mx-auto">
              Get a comprehensive, downloadable{" "}
              <span className="text-white">Career Dossier</span>—a complete
              roadmap including selected careers and college comparisons in an
              easy-to-understand PDF.
            </p>
          </div>

          {/* STATUS BADGES (Not buttons, just features) */}
          <div className="flex flex-wrap justify-center gap-4 mb-16">
            <div className="flex items-center gap-3 px-5 py-3 bg-white/[0.02] border border-white/10 rounded-2xl">
              <FileDown size={16} className="text-cyan-500" />
              <span className="text-[10px] font-black uppercase tracking-widest text-slate-300">
                Instant PDF Export
              </span>
            </div>
            <div className="flex items-center gap-3 px-5 py-3 bg-white/[0.02] border border-white/10 rounded-2xl">
              <Database size={16} className="text-amber-500" />
              <span className="text-[10px] font-black uppercase tracking-widest text-slate-300">
                Permanent Record
              </span>
            </div>
            <div className="flex items-center gap-3 px-5 py-3 bg-white/[0.02] border border-white/10 rounded-2xl">
              <Shield size={16} className="text-blue-500" />
              <span className="text-[10px] font-black uppercase tracking-widest text-slate-300">
                Secure Storage
              </span>
            </div>
          </div>

          {/* PERSISTENCE FEATURE PREVIEW (Single Block Content) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className="relative p-1 bg-gradient-to-b from-white/10 to-transparent rounded-[2.5rem]"
          >
            <div className="bg-[#05070a] rounded-[2.4rem] p-8 md:p-12 border border-white/5">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Feature 1: Export */}
                <div className="space-y-3">
                  <div className="text-cyan-400 font-black italic tracking-tighter text-lg uppercase underline decoration-cyan-500/20 underline-offset-4">
                    Complete Excellence
                  </div>
                  <p className="text-[12px] text-slate-500 leading-relaxed font-medium">
                    Download a high-definition roadmap including tactical steps,
                    detailed college comparisons, and career milestones.
                  </p>
                </div>

                {/* Feature 2: Tracking (Center) */}
                <div className="space-y-3 border-y md:border-y-0 md:border-x border-white/10 py-6 md:py-0 px-0 md:px-8">
                  <div className="text-white font-black italic tracking-tighter text-lg uppercase">
                    Progress Sync
                  </div>
                  <div className="flex flex-col gap-2 items-center md:items-start">
                    <div className="flex items-center gap-2 text-[10px] text-green-500/80 font-bold uppercase tracking-widest">
                      <CheckCircle size={14} /> Mark as Target Completed
                    </div>
                    <p className="text-[12px] text-slate-500 leading-relaxed font-medium text-center md:text-left">
                      Track your journey in real-time by marking off milestones
                      as you reach them.
                    </p>
                  </div>
                </div>

                {/* Feature 3: Management */}
                <div className="space-y-3">
                  <div className="text-amber-500 font-black italic tracking-tighter text-lg uppercase">
                    Smart Archive
                  </div>
                  <div className="flex flex-col gap-2 items-center md:items-start">
                    <div className="flex items-center gap-2 text-[10px] text-red-500/50 font-bold uppercase tracking-widest">
                      <Trash2 size={14} /> Delete & Reset Records
                    </div>
                    <p className="text-[12px] text-slate-500 leading-relaxed font-medium text-center md:text-left">
                      Your roadmaps are stored safely in Marga Veda. You
                      have total control to manage or clear your history.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          <div className="mt-8 flex justify-center">
            <div className="h-[1px] w-64 bg-gradient-to-r from-transparent via-cyan-500/40 to-transparent" />
          </div>
        </div>
      </section>
    </>
  );
};

const MiniNexusCard = ({ header, title, isRoot = false }) => (
  <div
    className={`p-4 min-w-[220px] rounded-2xl border ${isRoot ? "border-cyan-500 bg-cyan-500/5" : "border-white/10 bg-white/5"} backdrop-blur-md group hover:border-white/30 transition-all cursor-default`}
  >
    <p className="text-[8px] font-black text-slate-500 tracking-widest uppercase mb-1">
      {header}
    </p>
    <p className="text-sm font-bold text-white tracking-tight italic uppercase">
      {title}
    </p>
  </div>
);

const SpecItem = ({ icon, title, desc }) => (
  <div className="flex flex-col items-center lg:items-start text-center lg:text-left gap-3 group">
    <div className="text-cyan-500 group-hover:scale-110 transition-transform">
      {icon}
    </div>
    <div className="text-[11px] font-black text-white uppercase tracking-widest">
      {title}
    </div>
    <p className="text-[11px] text-slate-500 leading-relaxed max-w-[200px]">
      {desc}
    </p>
  </div>
);

export default NextSections;

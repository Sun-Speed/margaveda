import React from "react";
import { motion } from "framer-motion";
import { LayoutGrid, Binary, Network, Map, Activity, Briefcase, Star, TrendingUp, Globe, ShieldCheck } from "lucide-react";

const CareerDossierHero = () => {
  return (
    <section className="relative w-full flex flex-col justify-center overflow-hidden selection:bg-cyan-500/30 mt-[70px]">
      {/* 1. LAYERED BACKGROUND ARCHITECTURE */}

      {/* 2. THE CONTENT CORE */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 w-full">
        {/* System Status Line with Pulse */}
        <div className="flex items-center gap-4 mb-10">
          <div className="relative flex items-center justify-center">
            <div className="absolute w-2.5 h-2.5 bg-amber-500 rounded-full animate-pulse" />
            <div className="relative w-2 h-2 bg-amber-500 rounded-full" />
          </div>
          <span className="text-[10px] font-black text-amber-500 uppercase tracking-[0.5em] font-mono antialiased">
            Active • Career Dossier • Q2 2026
          </span>
        </div>

        {/* The Decent & Crisp Header Stack */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 items-start mb-10">
          {/* Typographic Anchor (Simplified Scale) */}
          <div className="md:col-span-6 space-y-4">
            <h1 className="text-5xl md:text-7xl font-black italic tracking-tighter leading-[0.9] uppercase antialiased text-white">
              <span className="block text-white">Discover Your</span>
              <span
                className="text-transparent"
                style={{ WebkitTextStroke: "1px rgba(255,255,255,0.2)" }}
              >
                Future Career
              </span>
            </h1>
          </div>

          {/* Core Content: Content-Driven & Guided */}
          <div className="md:col-span-6 max-w-lg border-l-2 border-white/5 pl-6 md:pl-10 space-y-6">
            {/* MAIN TEXT */}
            <p className="text-gray-500 text-sm md:text-xl font-medium leading-relaxed italic antialiased">
              Discover career paths beyond the basics. <br />
              Explore the full 
              <span className="text-amber-500">{" "}Career Vector Registry</span> —
              compare roles, understand growth paths, and see what it takes to reach your goals.
            </p>

            {/* BADGES */}
            <div className="flex flex-col gap-3 ">
              <div className="flex items-center gap-3 px-4 py-2 bg-amber-500/5 rounded-xl border border-amber-500/10 text-amber-500 hover:bg-amber-500/10 transition-all">
                <Briefcase size={16} />
                <span className="text-[10px] font-black uppercase tracking-widest">
                  Curated Career Insights
                </span>
              </div>

              <div className="flex items-center gap-3 px-4 py-2 bg-amber-500/5 rounded-xl border border-amber-500/10 text-amber-500 hover:bg-amber-500/10 transition-all">
                <Binary size={16} />
                <span className="text-[10px] font-black uppercase tracking-widest">
                  Step-by-Step Career Paths
                </span>
              </div>

              <div className="flex items-center gap-3 px-4 py-2 bg-amber-500/5 rounded-xl border border-amber-500/10 text-amber-500 hover:bg-amber-500/10 transition-all">
                <Map size={16} />
                <span className="text-[10px] font-black uppercase tracking-widest">
                  Personalized Career Guidance
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* 3. BENTO TELEMETRY DECK (Special & Cool Data View) */}
        {/* We use your favorite metadata footer style from the cards but larger */}
        <div className="mt-12 grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 w-full max-w-6xl mx-auto px-6">
          {[
            {
              label: "Industry Coverage",
              val: "500+ Sectors",
              desc: "Deep analysis across global markets.",
              icon: Network,
              accent: "cyan",
            },
            {
              label: "Earnings Potential",
              val: "Market Rates",
              desc: "Real-time salary benchmarking data.",
              icon: TrendingUp,
              accent: "amber",
            },
            {
              label: "Accreditation",
              val: "Global Standards",
              desc: "Verified by industrial ISO benchmarks.",
              icon: Globe,
              accent: "emerald",
            },
            {
              label: "Market Outlook",
              val: "Growth Index",
              desc: "Future-proof career trajectory scores.",
              icon: ShieldCheck,
              accent: "blue",
            },
          ].map((item, i) => (
            <div
              key={i}
              className="group relative flex flex-col items-start p-3 md:p-2 transition-all duration-300"
            >
              {/* ICON */}
              <div className="mb-4 md:mb-6 relative">
                <div className="w-10 h-10 md:w-12 md:h-12 flex items-center justify-center bg-white/[0.03] border border-white/10 rounded-2xl group-hover:border-white/30 transition-all duration-500 shadow-2xl">
                  <item.icon
                    size={18}
                    className="text-slate-400 group-hover:text-white transition-colors md:size-[22px]"
                  />
                </div>

                {/* STATUS DOT */}
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-[#050505] rounded-full flex items-center justify-center">
                  <div
                    className={`w-1.5 h-1.5 rounded-full animate-pulse ${
                      item.accent === "cyan"
                        ? "bg-cyan-500"
                        : item.accent === "amber"
                          ? "bg-amber-500"
                          : item.accent === "emerald"
                            ? "bg-emerald-500"
                            : "bg-blue-500"
                    }`}
                  />
                </div>
              </div>

              {/* TEXT */}
              <div className="space-y-1 md:space-y-2">
                <div className="flex items-center gap-2">
                  <span className="text-[8px] md:text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">
                    {item.label}
                  </span>
                  <span className="h-[1px] w-3 md:w-4 bg-white/10" />
                </div>

                <h3 className="text-sm md:text-xl font-bold text-white tracking-tight italic uppercase">
                  {item.val}
                </h3>

                <p className="text-[9px] md:text-[11px] text-slate-500 font-medium leading-relaxed">
                  {item.desc}
                </p>
              </div>

              {/* UNDERLINE */}
              <div className="mt-4 md:mt-6 w-6 md:w-8 h-[2px] bg-white/10 group-hover:w-full group-hover:bg-white/40 transition-all duration-700" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CareerDossierHero;

import { useNavigate } from "react-router-dom";

export default function Documentation() {
  const navigate = useNavigate();

  return (
    <div>
      <section className="relative px-6 md:px-20 py-24 md:py-32 bg-[#030712] overflow-hidden border-b border-white/5">
        {/* Abstract Background Grid */}
        <div className="absolute inset-0 opacity-[0.05] [mask-image:linear-gradient(to_bottom,black,transparent)] pointer-events-none">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px]"></div>
        </div>

        {/* Soft Background Glows */}
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-cyan-500/10 blur-[120px] rounded-full pointer-events-none" />
        <div className="absolute top-1/2 -left-24 w-72 h-72 bg-blue-600/5 blur-[100px] rounded-full pointer-events-none" />

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-16">
            <div className="flex-1 space-y-8 text-center lg:text-left">
              {/* Version Badge */}
              <div className="inline-flex items-center gap-3 px-3 py-1 rounded-full border border-cyan-500/20 bg-cyan-500/5 backdrop-blur-sm">
                <span className="flex h-2 w-2 rounded-full bg-cyan-400" />
                <span className="text-[10px] font-bold uppercase tracking-widest text-cyan-300">
                  Documentation v1.0
                </span>
              </div>

              <h1 className="text-5xl md:text-7xl font-black text-white leading-tight tracking-tighter">
                Master the <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400">
                  Roadmap.
                </span>
              </h1>

              <p className="max-w-2xl mx-auto lg:mx-0 text-slate-400 text-lg md:text-xl leading-relaxed">
                Marga Veda is your{" "}
                <span className="text-white font-medium">
                  intelligent career navigation system.
                </span>{" "}
                Use this guide to explore structured domains, track your
                progress, and architect your professional future.
              </p>
            </div>

            {/* Right Side: What users can do (Quick Cards) */}
            <div className="flex-1 w-full max-w-md lg:max-w-none">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  {
                    label: "Explore",
                    desc: "Discover 150+ Career Paths",
                    color: "from-cyan-500",
                  },
                  {
                    label: "Map",
                    desc: "Visualize Skill Connections",
                    color: "from-blue-500",
                  },
                  {
                    label: "Track",
                    desc: "Save & Resume Learning",
                    color: "from-amber-500",
                  },
                  {
                    label: "Grow",
                    desc: "Personalized Career Steps",
                    color: "from-purple-500",
                  },
                ].map((item, idx) => (
                  <div
                    key={idx}
                    className="p-6 rounded-3xl border border-white/5 bg-white/[0.02] backdrop-blur-sm group hover:border-white/20 transition-all cursor-default"
                  >
                    <div
                      className={`h-1 w-8 bg-gradient-to-r ${item.color} to-transparent mb-4 rounded-full`}
                    />
                    <h4 className="text-white font-bold mb-1">{item.label}</h4>
                    <p className="text-slate-500 text-xs leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="px-6 md:px-20 py-24 bg-[#030712] relative overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            {/* CONTENT SIDE */}
            <div className="order-2 lg:order-1 space-y-8">
              <div className="space-y-4">
                <h2 className="text-4xl md:text-5xl font-black text-white tracking-tight">
                  What is <span className="text-cyan-400">Marga Veda?</span>
                </h2>
                <div className="h-1 w-20 bg-gradient-to-r from-cyan-500 to-transparent rounded-full" />
              </div>

              <div className="space-y-6">
                <p className="text-slate-300 text-lg leading-relaxed">
                  Marga Veda is a{" "}
                  <span className="text-white font-semibold">
                    modern career guidance ecosystem
                  </span>{" "}
                  engineered to bridge the gap between academic learning and
                  industry reality. We’ve replaced static advice with a dynamic,
                  data-driven navigation system.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <h4 className="text-cyan-400 font-bold uppercase tracking-tighter text-sm">
                      Roadmap Exploration
                    </h4>
                    <p className="text-slate-500 text-sm">
                      Visualizing career paths as logical sequences of
                      milestones and achievements.
                    </p>
                  </div>
                  <div className="space-y-2">
                    <h4 className="text-amber-400 font-bold uppercase tracking-tighter text-sm">
                      Skill Navigation
                    </h4>
                    <p className="text-slate-500 text-sm">
                      Identifying critical skill nodes and how they connect
                      across different industries.
                    </p>
                  </div>
                </div>

                <p className="text-slate-400 text-md border-l-2 border-white/10 pl-6 italic font-light">
                  "Our focus is on future-focused learning—equipping students
                  with the direction needed to navigate a rapidly evolving job
                  market with absolute confidence."
                </p>
              </div>
            </div>

            {/* VISUAL SIDE - FUTURISTIC ROADMAP ILLUSTRATION */}
            <div className="order-1 lg:order-2 relative group">
              {/* Glow Effects */}
              <div className="absolute -inset-4 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-[3rem] blur-2xl group-hover:opacity-100 opacity-50 transition-opacity" />

              <div className="relative aspect-square md:aspect-video lg:aspect-square rounded-[3rem] border border-white/10 bg-[#0a0f1a] flex items-center justify-center overflow-hidden">
                {/* Mockup of a Roadmap UI */}
                <div className="absolute inset-0 p-8 flex flex-col justify-center gap-6">
                  {/* Step 1 */}
                  <div className="flex items-center gap-4 animate-[pulse_3s_infinite]">
                    <div className="w-12 h-12 rounded-full border-2 border-cyan-500 bg-cyan-500/10 flex items-center justify-center shadow-[0_0_15px_rgba(34,211,238,0.4)]">
                      <div className="w-3 h-3 bg-cyan-400 rounded-full" />
                    </div>
                    <div className="h-0.5 flex-1 bg-gradient-to-r from-cyan-500/50 to-transparent" />
                  </div>

                  {/* Step 2 (Branching) */}
                  <div className="ml-16 flex flex-col gap-6">
                    <div className="flex items-center gap-4 opacity-60 translate-x-4">
                      <div className="w-10 h-10 rounded-xl border border-white/20 bg-white/5" />
                      <div className="space-y-1">
                        <div className="w-24 h-2 bg-white/10 rounded-full" />
                        <div className="w-16 h-1.5 bg-white/5 rounded-full" />
                      </div>
                    </div>

                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-xl border border-amber-500/50 bg-amber-500/10" />
                      <div className="space-y-1">
                        <div className="w-32 h-2 bg-amber-400/20 rounded-full" />
                        <div className="w-20 h-1.5 bg-amber-400/10 rounded-full" />
                      </div>
                    </div>
                  </div>

                  {/* Floating Nodes Decoration */}
                  <div className="absolute top-10 right-10 w-2 h-2 bg-blue-400 rounded-full blur-[1px]" />
                  <div className="absolute bottom-20 left-10 w-3 h-3 bg-purple-500/30 rounded-full blur-[2px]" />
                </div>

                {/* Subtle Grid Overlay */}
                <div className="absolute inset-0 bg-[radial-gradient(#ffffff05_1px,transparent_1px)] bg-[size:20px_20px]" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="px-6 md:px-10 py-4 bg-[#030712] relative">
        <div className="max-w-7xl mx-auto space-y-16">
          {/* Section Header */}
          <div className="space-y-4 max-w-2xl">
            <h2 className="text-4xl font-black text-white tracking-tight">
              Core{" "}
              <span className="text-cyan-400 font-outline-2">Systems.</span>
            </h2>
            <p className="text-slate-400">
              Marga Veda is built on four primary pillars designed to take you
              from curiosity to career mastery.
            </p>
          </div>

          {/* Feature Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
            {/* CARD 1: CAREER ROADMAPS */}
            <div className="group relative p-8 rounded-[2.5rem] bg-white/[0.02] border border-white/5 hover:border-cyan-500/40 transition-all duration-500 overflow-hidden">
              <div className="absolute -right-8 -top-8 w-32 h-32 bg-cyan-500/10 blur-[50px] group-hover:bg-cyan-500/20 transition-all" />

              <div className="relative z-10 space-y-6">
                <div className="w-14 h-14 rounded-2xl bg-cyan-500/10 flex items-center justify-center text-cyan-400 group-hover:scale-110 transition-transform">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-7 w-7"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M9 20l-5.447-2.724A2 2 0 013 15.483V8.517a2 2 0 011.553-1.943L9 4m6 16l5.447-2.724A2 2 0 0021 15.483V8.517a2 2 0 00-1.553-1.943L15 4m-6 16V4m6 16V4"
                    />
                  </svg>
                </div>

                <div className="space-y-3">
                  <h3 className="text-2xl font-bold text-white">
                    Career Roadmaps
                  </h3>
                  <p className="text-slate-400 leading-relaxed">
                    Experience{" "}
                    <span className="text-white font-medium">
                      structured paths
                    </span>{" "}
                    that break down complex careers into manageable milestones.
                    Every roadmap is built with logical learning progression,
                    ensuring you master prerequisites before moving to advanced
                    topics.
                  </p>
                </div>
              </div>
            </div>

            {/* CARD 2: SKILL GRAPH */}
            <div className="group relative p-8 rounded-[2.5rem] bg-white/[0.02] border border-white/5 hover:border-amber-500/40 transition-all duration-500 overflow-hidden">
              <div className="absolute -right-8 -top-8 w-32 h-32 bg-amber-500/10 blur-[50px] group-hover:bg-amber-500/20 transition-all" />

              <div className="relative z-10 space-y-6">
                <div className="w-14 h-14 rounded-2xl bg-amber-500/10 flex items-center justify-center text-amber-400 group-hover:scale-110 transition-transform">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-7 w-7"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z"
                    />
                  </svg>
                </div>

                <div className="space-y-3">
                  <h3 className="text-2xl font-bold text-white">Skill Graph</h3>
                  <p className="text-slate-400 leading-relaxed">
                    Navigate the{" "}
                    <span className="text-white font-medium">
                      interconnected skills
                    </span>{" "}
                    required in the modern economy. Our graph visualization
                    helps you understand how a single skill can unlock multiple
                    career doors, providing a clear growth mapping for your
                    future.
                  </p>
                </div>
              </div>
            </div>

            {/* CARD 3: PROGRESS TRACKER */}
            <div className="group relative p-8 rounded-[2.5rem] bg-white/[0.02] border border-white/5 hover:border-blue-500/40 transition-all duration-500 overflow-hidden">
              <div className="absolute -right-8 -top-8 w-32 h-32 bg-blue-500/10 blur-[50px] group-hover:bg-blue-500/20 transition-all" />

              <div className="relative z-10 space-y-6">
                <div className="w-14 h-14 rounded-2xl bg-blue-500/10 flex items-center justify-center text-blue-400 group-hover:scale-110 transition-transform">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-7 w-7"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                    />
                  </svg>
                </div>

                <div className="space-y-3">
                  <h3 className="text-2xl font-bold text-white">
                    Progress Tracker
                  </h3>
                  <p className="text-slate-400 leading-relaxed">
                    Never lose your place.{" "}
                    <span className="text-white font-medium">Save paths</span>{" "}
                    to your personal dashboard, monitor growth in real-time, and
                    pick up exactly where you left off. It's your personal vault
                    for educational advancement.
                  </p>
                </div>
              </div>
            </div>

            {/* CARD 4: GUIDED EXPLORATION */}
            <div className="group relative p-8 rounded-[2.5rem] bg-white/[0.02] border border-white/5 hover:border-purple-500/40 transition-all duration-500 overflow-hidden">
              <div className="absolute -right-8 -top-8 w-32 h-32 bg-purple-500/10 blur-[50px] group-hover:bg-purple-500/20 transition-all" />

              <div className="relative z-10 space-y-6">
                <div className="w-14 h-14 rounded-2xl bg-purple-500/10 flex items-center justify-center text-purple-400 group-hover:scale-110 transition-transform">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-7 w-7"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                </div>

                <div className="space-y-3">
                  <h3 className="text-2xl font-bold text-white">
                    Guided Exploration
                  </h3>
                  <p className="text-slate-400 leading-relaxed">
                    Step into the unknown with confidence.{" "}
                    <span className="text-white font-medium">
                      Explore careers
                    </span>{" "}
                    across various domains and discover opportunities you didn't
                    know existed, all through our intelligent search and
                    discovery interface.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="px-6 md:px-20 py-4 bg-[#030712] relative overflow-hidden">
        {/* Background Atmospheric Glow */}
        <div className="absolute top-1/2 left-0 w-64 h-64 bg-cyan-500/5 blur-[120px] rounded-full pointer-events-none" />

        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="mb-20 space-y-4">
            <h2 className="text-4xl font-black text-white tracking-tight">
              Getting{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
                Started.
              </span>
            </h2>
            <p className="text-slate-400">
              Follow these four phases to master your career trajectory.
            </p>
          </div>

          {/* Vertical Timeline */}
          <div className="relative">
            {/* The Central Connector Line */}
            <div className="absolute left-[19px] md:left-1/2 md:-translate-x-1/2 top-2 bottom-2 w-[2px] bg-gradient-to-b from-cyan-500 via-blue-500/20 to-transparent" />

            <div className="space-y-24">
              {/* STEP 1 */}
              <div className="relative flex flex-col md:flex-row items-start md:items-center group">
                <div className="md:flex-1 md:text-right pr-0 md:pr-16 order-2 md:order-1 mt-4 md:mt-0">
                  <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-cyan-400 transition-colors">
                    Explore Domains
                  </h3>
                  <p className="text-slate-400 text-sm md:text-base leading-relaxed">
                    Browse through our extensive library of career domains. From
                    Blockchain to Healthcare, find the field that aligns with
                    your passion.
                  </p>
                </div>

                <div className="relative z-10 w-10 h-10 rounded-full bg-slate-900 border-2 border-cyan-500 flex items-center justify-center shadow-[0_0_15px_rgba(34,211,238,0.5)] order-1 md:order-2 shrink-0">
                  <span className="text-cyan-400 font-black text-xs">01</span>
                </div>

                <div className="md:flex-1 pl-0 md:pl-16 order-3" />
              </div>

              {/* STEP 2 */}
              <div className="relative flex flex-col md:flex-row items-start md:items-center group">
                <div className="md:flex-1 order-3 md:order-1" />

                <div className="relative z-10 w-10 h-10 rounded-full bg-slate-900 border-2 border-blue-500 flex items-center justify-center shadow-[0_0_15px_rgba(59,130,246,0.5)] order-1 md:order-2 shrink-0">
                  <span className="text-blue-400 font-black text-xs">02</span>
                </div>

                <div className="md:flex-1 pl-0 md:pl-16 mt-4 md:mt-0 order-2 md:order-3">
                  <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-blue-400 transition-colors">
                    Select a Roadmap
                  </h3>
                  <p className="text-slate-400 text-sm md:text-base leading-relaxed">
                    Dive into a specific career path. View the prerequisites,
                    required tools, and industry-standard skills needed to
                    excel.
                  </p>
                </div>
              </div>

              {/* STEP 3 */}
              <div className="relative flex flex-col md:flex-row items-start md:items-center group">
                <div className="md:flex-1 md:text-right pr-0 md:pr-16 order-2 md:order-1 mt-4 md:mt-0">
                  <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-amber-400 transition-colors">
                    Track Progress
                  </h3>
                  <p className="text-slate-400 text-sm md:text-base leading-relaxed">
                    Mark milestones as "Completed" and save your roadmap to your
                    personal dashboard to monitor your growth over time.
                  </p>
                </div>

                <div className="relative z-10 w-10 h-10 rounded-full bg-slate-900 border-2 border-amber-500 flex items-center justify-center shadow-[0_0_15px_rgba(245,158,11,0.5)] order-1 md:order-2 shrink-0">
                  <span className="text-amber-400 font-black text-xs">03</span>
                </div>

                <div className="md:flex-1 pl-0 md:pl-16 order-3" />
              </div>

              {/* STEP 4 */}
              <div className="relative flex flex-col md:flex-row items-start md:items-center group">
                <div className="md:flex-1 order-3 md:order-1" />

                <div className="relative z-10 w-10 h-10 rounded-full bg-slate-900 border-2 border-purple-500 flex items-center justify-center shadow-[0_0_15px_rgba(168,85,247,0.5)] order-1 md:order-2 shrink-0">
                  <span className="text-purple-400 font-black text-xs">04</span>
                </div>

                <div className="md:flex-1 pl-0 md:pl-16 mt-4 md:mt-0 order-2 md:order-3">
                  <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-purple-400 transition-colors">
                    Evolve Skills
                  </h3>
                  <p className="text-slate-400 text-sm md:text-base leading-relaxed">
                    Continuously update your knowledge as industry trends shift.
                    Marga Veda keeps your roadmap dynamic and future-ready.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="px-6 md:px-20 py-32 bg-[#030712] relative">
        <div className="max-w-7xl mx-auto space-y-16">
          {/* Section Header */}
          <div className="text-center space-y-4">
            <h2 className="text-4xl font-black text-white tracking-tight">
              The <span className="text-cyan-400">Core</span> Stack.
            </h2>
            <p className="text-slate-500 max-w-xl mx-auto">
              Built with industry-leading technologies to ensure high
              performance, security, and a seamless user experience.
            </p>
          </div>

          {/* Tech Stack Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
            {[
              {
                name: "React",
                role: "Frontend",
                desc: "Dynamic UI with responsive state management.",
                color: "border-cyan-500/20",
              },
              {
                name: "Node.js",
                role: "Backend",
                desc: "High-performance server-side logic and API handling.",
                color: "border-green-500/20",
              },
              {
                name: "MongoDB",
                role: "Database",
                desc: "Scalable NoSQL storage for flexible career data.",
                color: "border-emerald-500/20",
              },
              {
                name: "OTP Auth",
                role: "Authentication",
                desc: "Secure, passwordless access for every student.",
                color: "border-blue-500/20",
              },
              {
                name: "Google Analytics",
                role: "Engagement",
                desc: "Data-driven insights to refine platform flow.",
                color: "border-amber-500/20",
              },
              {
                name: "Tailwind CSS",
                role: "Styling",
                desc: "Clean, futuristic design system and layout.",
                color: "border-indigo-500/20",
              },
            ].map((tech, idx) => (
              <div
                key={idx}
                className={`group relative p-8 rounded-3xl bg-white/[0.02] border ${tech.color} hover:bg-white/[0.04] transition-all duration-300`}
              >
                {/* Subtle tech-label */}
                <div className="flex justify-between items-start mb-6">
                  <div className="px-3 py-1 rounded-lg bg-white/5 border border-white/5 text-[10px] font-bold uppercase tracking-widest text-slate-400">
                    {tech.role}
                  </div>
                  {/* Minimalist Tech Icon (Conceptual) */}
                  <div className="w-2 h-2 rounded-full bg-white/20 group-hover:bg-cyan-400 transition-colors" />
                </div>

                <h3 className="text-2xl font-bold text-white mb-2">
                  {tech.name}
                </h3>
                <p className="text-slate-500 text-sm leading-relaxed font-light">
                  {tech.desc}
                </p>
              </div>
            ))}
          </div>

          {/* Final System Note */}
          <div className="mt-16 p-8 rounded-3xl border border-dashed border-white/10 text-center">
            <p className="text-slate-500 text-xs tracking-widest uppercase font-semibold">
              Marga Veda Ecosystem — Engineered for Scalability
            </p>
          </div>
        </div>
      </section>

      <section className="px-6 md:px-20 py-8 bg-[#030712] relative overflow-hidden">
        {/* Security Grid Mask */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-500 via-transparent to-transparent" />

        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Visual Side - The Security Shield */}
            <div className="relative flex justify-center lg:justify-start">
              <div className="relative w-64 h-64 md:w-80 md:h-80">
                {/* Animated Rotating Rings */}
                <div className="absolute inset-0 rounded-full border border-cyan-500/20 animate-[spin_10s_linear_infinite]" />
                <div className="absolute inset-4 rounded-full border border-blue-500/10 animate-[spin_15s_linear_infinite_reverse]" />

                {/* Center Shield Icon */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="p-8 rounded-full bg-gradient-to-br from-cyan-500/10 to-blue-600/10 backdrop-blur-xl border border-white/10 shadow-[0_0_50px_rgba(34,211,238,0.1)]">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-16 w-16 text-cyan-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                      />
                    </svg>
                  </div>
                </div>
              </div>
            </div>

            {/* Content Side */}
            <div className="space-y-10">
              <div className="space-y-4 text-center lg:text-left">
                <h2 className="text-4xl md:text-5xl font-black text-white tracking-tight">
                  Safety by <span className="text-cyan-400">Design.</span>
                </h2>
                <p className="text-slate-400 text-lg leading-relaxed">
                  Your learning journey is protected through secure
                  authentication systems and encrypted session management. We
                  prioritize your privacy at every node.
                </p>
              </div>

              {/* Security Checklist */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  {
                    title: "Email OTP",
                    desc: "Passwordless, multi-factor verification.",
                  },
                  {
                    title: "Encrypted Auth",
                    desc: "Industry-standard hashing protocols.",
                  },
                  {
                    title: "Secure Sessions",
                    desc: "JWT-based protected user sessions.",
                  },
                  {
                    title: "Data Protection",
                    desc: "Isolated and encrypted database storage.",
                  },
                ].map((item, index) => (
                  <div
                    key={index}
                    className="flex gap-4 p-4 rounded-2xl bg-white/[0.02] border border-white/5 group hover:border-cyan-500/30 transition-all"
                  >
                    <div className="mt-1">
                      <div className="w-2 h-2 rounded-full bg-cyan-500 shadow-[0_0_8px_rgba(34,211,238,0.8)]" />
                    </div>
                    <div className="space-y-1">
                      <h4 className="text-white font-bold text-sm uppercase tracking-wider">
                        {item.title}
                      </h4>
                      <p className="text-slate-500 text-xs">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Bottom Lock Indicator */}
              <div className="pt-4 flex items-center justify-center lg:justify-start gap-3 opacity-40">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 text-slate-400"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                    clipRule="evenodd"
                  />
                </svg>
                <span className="text-[10px] uppercase font-bold tracking-widest text-slate-400">
                  SSL Encrypted Connections Only
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="px-6 md:px-20 py-32 bg-[#030712] relative overflow-hidden">
        {/* Perspective Grid Floor Effect */}
        <div className="absolute bottom-0 left-0 w-full h-[300px] bg-[linear-gradient(to_bottom,transparent,#030712),linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:60px_60px] [transform:perspective(1000px)_rotateX(60deg)] pointer-events-none opacity-40" />

        <div className="max-w-7xl mx-auto relative z-10">
          {/* Section Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-20">
            <div className="space-y-4">
              <div className="inline-block px-3 py-1 rounded-md bg-amber-500/10 border border-amber-500/20 text-amber-500 text-[10px] font-black uppercase tracking-[0.3em]">
                Next Phase
              </div>
              <h2 className="text-4xl md:text-6xl font-black text-white tracking-tight">
                Future{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-500">
                  Roadmap.
                </span>
              </h2>
            </div>
            <p className="text-slate-500 max-w-sm text-sm md:text-right">
              Expanding the ecosystem with deep intelligence and seamless
              accessibility.
            </p>
          </div>

          {/* Futuristic Roadmap Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* FEATURE 1: AI RECOMMENDATIONS */}
            <div className="group relative p-8 rounded-[2rem] bg-white/[0.02] border border-white/5 hover:border-amber-500/30 transition-all duration-500 overflow-hidden">
              <div className="absolute top-0 right-0 p-4">
                <div className="text-[10px] font-bold text-amber-500/40 uppercase tracking-widest">
                  v2.0 Preview
                </div>
              </div>
              <div className="space-y-6">
                <div className="w-12 h-12 rounded-2xl bg-amber-500/10 flex items-center justify-center text-amber-400 group-hover:shadow-[0_0_20px_rgba(245,158,11,0.3)] transition-all">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M13 10V3L4 14h7v7l9-11h-7z"
                    />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-white">
                  AI Career Recommendations
                </h3>
                <p className="text-slate-500 text-sm leading-relaxed">
                  Integrating machine learning models to analyze user skills and
                  suggest optimal career paths with high precision.
                </p>
              </div>
            </div>

            {/* FEATURE 2: INTERNSHIP SYSTEMS */}
            <div className="group relative p-8 rounded-[2rem] bg-white/[0.02] border border-white/5 hover:border-blue-500/30 transition-all duration-500">
              <div className="space-y-6">
                <div className="w-12 h-12 rounded-2xl bg-blue-500/10 flex items-center justify-center text-blue-400 group-hover:shadow-[0_0_20px_rgba(59,130,246,0.3)] transition-all">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-white">
                  Internship Discovery
                </h3>
                <p className="text-slate-500 text-sm leading-relaxed">
                  Directly connecting roadmap milestones to real-world
                  internship opportunities, closing the gap between learning and
                  work.
                </p>
              </div>
            </div>

            {/* FEATURE 3: MOBILE ECOSYSTEM */}
            <div className="group relative p-8 rounded-[2rem] bg-white/[0.02] border border-white/5 hover:border-purple-500/30 transition-all duration-500">
              <div className="space-y-6">
                <div className="w-12 h-12 rounded-2xl bg-purple-500/10 flex items-center justify-center text-purple-400 group-hover:shadow-[0_0_20px_rgba(168,85,247,0.3)] transition-all">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"
                    />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-white">
                  Mobile Application
                </h3>
                <p className="text-slate-500 text-sm leading-relaxed">
                  Full support for iOS and Android, allowing students to explore
                  their learning paths and track progress on the go.
                </p>
              </div>
            </div>

            {/* FEATURE 4: SMART GUIDANCE ENGINE */}
            <div className="lg:col-span-2 group relative p-8 rounded-[2.5rem] bg-gradient-to-br from-white/[0.03] to-transparent border border-white/5 hover:border-cyan-500/30 transition-all duration-500">
              <div className="flex flex-col md:flex-row gap-8 items-center">
                <div className="w-20 h-20 shrink-0 rounded-3xl bg-cyan-500/10 flex items-center justify-center text-cyan-400 group-hover:rotate-12 transition-transform">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-10 w-10"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.364-6.364l-.707-.707M6.343 17.657l-.707.707m12.728 0l-.707-.707M12 13a4 4 0 110-8 4 4 0 010 8z"
                    />
                  </svg>
                </div>
                <div className="space-y-2 text-center md:text-left">
                  <h3 className="text-2xl font-bold text-white">
                    Smart Guidance Engine
                  </h3>
                  <p className="text-slate-400 leading-relaxed max-w-lg">
                    A centralized intelligence hub that provides context-aware
                    guidance, helping users pivot between careers as industry
                    demands evolve.
                  </p>
                </div>
              </div>
            </div>

            {/* FEATURE 5: PERSONALIZED LEARNING */}
            <div className="group relative p-8 rounded-[2.5rem] bg-white/[0.02] border border-white/5 hover:border-pink-500/30 transition-all duration-500 flex flex-col justify-center">
              <h3 className="text-xl font-bold text-white mb-2 group-hover:text-pink-400 transition-colors">
                Personalized Learning
              </h3>
              <p className="text-slate-500 text-xs leading-relaxed">
                Custom-tailored resource aggregation based on your specific
                learning speed and preferred content types.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="px-6 md:px-20 py-4 bg-[#030712] relative">
        <div className="max-w-3xl mx-auto space-y-12">
          {/* Section Header */}
          <div className="text-center space-y-4">
            <h2 className="text-4xl font-black text-white tracking-tight italic">
              Frequently Asked <span className="text-cyan-400">Questions.</span>
            </h2>
            <p className="text-slate-500 text-sm uppercase tracking-widest">
              Everything you need to know
            </p>
          </div>

          {/* Accordion Container */}
          <div className="space-y-4">
            {[
              {
                q: "Is Marga Veda free to use?",
                a: "Yes, Marga Veda is currently free for students. Our goal is to democratize career guidance and provide high-quality roadmaps to everyone without initial barriers.",
              },
              {
                q: "Can I save multiple career paths?",
                a: "Absolutely. Once you are authenticated, you can save as many roadmaps as you like to your personal dashboard and switch between them at any time.",
              },
              {
                q: "How does the tracking system work?",
                a: "Our tracking system allows you to mark individual 'nodes' or milestones as complete. This data is synced to your profile, giving you a visual percentage of your progress toward a specific career goal.",
              },
              {
                q: "Is my data secure?",
                a: "Security is a core pillar of our stack. We use encrypted session management and secure OTP-based authentication to ensure that your learning history and personal data remain private.",
              },
            ].map((item, index) => (
              <details
                key={index}
                className="group rounded-2xl bg-white/[0.02] border border-white/5 overflow-hidden transition-all duration-300 open:bg-white/[0.04] open:border-cyan-500/30"
              >
                <summary className="flex items-center justify-between p-6 cursor-pointer list-none">
                  <span className="text-lg font-bold text-white group-open:text-cyan-400 transition-colors leading-tight">
                    {item.q}
                  </span>
                  <div className="ml-4 transition-transform duration-300 group-open:rotate-180">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 text-slate-500 group-open:text-cyan-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </div>
                </summary>
                <div className="px-6 pb-6 text-slate-400 leading-relaxed text-md animate-fadeIn">
                  {item.a}
                </div>
              </details>
            ))}
          </div>

          {/* Bottom Contact CTA */}
          <div className="mt-20 p-8 rounded-[2rem] bg-gradient-to-br from-cyan-500/5 to-transparent border border-white/5 text-center">
            <p className="text-slate-300 mb-4">Still have questions?</p>
            <button className="px-6 py-2 rounded-full border border-cyan-500/30 text-cyan-400 font-bold text-sm hover:bg-cyan-500 hover:text-black transition-all">
              Contact Support
            </button>
          </div>
        </div>

        {/* CSS Animation for the expand effect */}
        <style jsx>{`
          @keyframes fadeIn {
            from {
              opacity: 0;
              transform: translateY(-10px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
          .animate-fadeIn {
            animation: fadeIn 0.4s ease-out forwards;
          }
        `}</style>
      </section>

      <section className="px-6 md:px-20 py-32 bg-[#030712] relative overflow-hidden">
        {/* Decorative Radial Background */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[150%] h-[500px] bg-gradient-to-t from-cyan-900/20 via-transparent to-transparent blur-[120px] pointer-events-none" />

        <div className="max-w-7xl mx-auto border border-white/10 rounded-[3rem] bg-white/[0.02] backdrop-blur-xl overflow-hidden relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2">
            {/* LEFT COLUMN: THE MESSAGE */}
            <div className="p-8 md:p-16 space-y-8 border-b lg:border-b-0 lg:border-r border-white/10">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20">
                <div className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
                <span className="text-[10px] font-bold uppercase tracking-widest text-cyan-400">
                  Support Hub
                </span>
              </div>

              <h2 className="text-5xl md:text-6xl font-black text-white leading-tight">
                Need <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
                  Assistance?
                </span>
              </h2>

              <p className="text-slate-400 text-lg leading-relaxed max-w-md">
                Our guidance systems are continuously evolving to improve your
                learning experience. If you encounter an issue or have feedback,
                our team is ready to assist.
              </p>
            </div>

            {/* RIGHT COLUMN: THE ACTION */}
            <div className="p-8 md:p-16 flex flex-col justify-center items-center lg:items-start space-y-10 bg-white/[0.01]">
              {/* Email Card */}
              <div className="w-full group">
                <p className="text-slate-500 text-xs font-bold uppercase tracking-[0.2em] mb-4">
                  Direct Channel
                </p>
                <a
                  href="mailto:support@margaveda.com"
                  className="block w-full p-6 rounded-2xl border border-white/5 bg-white/5 hover:border-cyan-500/50 hover:bg-white/10 transition-all duration-300 group"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-xl md:text-2xl font-black text-white group-hover:text-cyan-400 transition-colors">
                        support@margaveda.com
                      </span>
                      <p className="text-slate-500 text-sm mt-1">
                        Typical response time: &lt; 24h
                      </p>
                    </div>
                    <div className="h-10 w-10 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-cyan-500 group-hover:text-black transition-all">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M14 5l7 7m0 0l-7 7m7-7H3"
                        />
                      </svg>
                    </div>
                  </div>
                </a>
              </div>

              {/* System Status Indicator */}
              <div className="flex items-center gap-6 pt-4">
                <div className="flex flex-col">
                  <span className="text-white font-bold text-sm">
                    System Status
                  </span>
                  <span className="text-green-500 text-xs flex items-center gap-1.5 font-medium">
                    <span className="h-1.5 w-1.5 rounded-full bg-green-500 animate-ping" />
                    All Systems Operational
                  </span>
                </div>
                <div className="h-8 w-[1px] bg-white/10" />
                <div className="flex flex-col">
                  <span className="text-white font-bold text-sm">
                    Documentation
                  </span>
                  <span className="text-slate-500 text-xs">
                    Updated May 2026
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Credit */}
      </section>

      <section className="px-6 md:px-20 py-4 bg-[#030712] relative flex flex-col items-center justify-center text-center overflow-hidden">
        {/* The "Future" Portal Background */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl h-[400px] bg-cyan-500/10 blur-[160px] rounded-full pointer-events-none opacity-50" />

        {/* Animated Floating Particles (Optional CSS) */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/4 left-1/3 w-1 h-1 bg-cyan-400 rounded-full animate-pulse shadow-[0_0_10px_#22d3ee]" />
          <div className="absolute bottom-1/3 right-1/4 w-1 h-1 bg-blue-500 rounded-full animate-pulse delay-700 shadow-[0_0_10px_#3b82f6]" />
        </div>

        <div className="relative z-10 space-y-10">
          {/* Big Closing Statement */}
          <div className="space-y-2">
            <p className="text-cyan-500 text-xs font-black uppercase tracking-[0.4em] mb-4">
              Your Journey Starts Here
            </p>
            <h2 className="text-6xl md:text-8xl font-black text-white tracking-tighter leading-none">
              Right{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-b from-white to-white/40">
                Guidance.
              </span>
              <br />
              Better{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
                Future.
              </span>
            </h2>
          </div>

          {/* The Primary CTA Button */}
          <div className="flex flex-col items-center gap-6">
            <button
              onClick={() => navigate(`/explore`)}
              className="group relative px-12 py-5 rounded-full bg-cyan-500 text-black font-black text-lg uppercase tracking-widest hover:scale-105 transition-all duration-300 shadow-[0_0_30px_rgba(34,211,238,0.4)] hover:shadow-[0_0_50px_rgba(34,211,238,0.6)]"
            >
              <span className="relative z-10 flex items-center gap-3">
                Start Exploring
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 transition-transform group-hover:translate-x-1"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </span>
              {/* Glow Effect Layer */}
              <div className="absolute inset-0 rounded-full bg-cyan-400 blur-md opacity-0 group-hover:opacity-50 transition-opacity" />
            </button>

            {/* Meta Text */}
            <div className="flex items-center gap-4 text-slate-500 text-[10px] font-bold uppercase tracking-[0.2em]">
              <span>No Sign-up Required to Browse</span>
              <span className="w-1 h-1 rounded-full bg-slate-700" />
              <span>70+ Career Domains</span>
            </div>
          </div>
        </div>

        <div className="mt-20 text-center">
          <p className="text-slate-600 text-[10px] uppercase tracking-[0.6em] font-bold">
            Marga Veda Ecosystem • Unified Career Navigation
          </p>
        </div>
      </section>
    </div>
  );
}

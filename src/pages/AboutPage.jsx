import { useNavigate } from "react-router-dom";

export default function About() {

  const navigate = useNavigate();

  return (
    <div className="bg-[#030712] text-white overflow-hidden">

      <section className="relative px-6 md:px-20 py-8 md:py-8 bg-[#030712] overflow-hidden">
        {/* Atmospheric Background Elements */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-gradient-to-b from-cyan-500/10 to-transparent blur-[120px] rounded-full pointer-events-none" />
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-amber-500/5 blur-[100px] rounded-full pointer-events-none" />

        <div className="max-w-6xl mx-auto relative z-10 text-center md:text-left">
          <div className="flex flex-col md:flex-row items-center md:items-end justify-between gap-12">
            <div className="flex-1 space-y-8">
              {/* Animated Badge */}
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/5 backdrop-blur-md">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
                </span>
                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-300">
                  About Marga Veda
                </span>
              </div>

              <h1 className="text-3xl md:text-5xl lg:text-6xl font-black text-white leading-[0.95] tracking-tight">
                Designing Smarter
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-amber-400">
                  Career Journeys
                </span>
                for the Next Gen
              </h1>

              <p className="max-w-xl text-slate-400 text-lg md:text-xl leading-relaxed font-light">
                Marga Veda is an{" "}
                <span className="text-white font-medium">
                  intelligent career guidance platform
                </span>{" "}
                built to help students explore domains, discover opportunities,
                and navigate their future with clarity.
              </p>
            </div>

            {/* Visual Accent - Abstract Navigation UI Element */}
            <div className="hidden lg:block relative w-1/3">
              <div className="aspect-square rounded-full border-[1px] border-white/10 flex items-center justify-center relative animate-[spin_20s_linear_infinite]">
                <div className="absolute -top-2 left-1/2 w-4 h-4 bg-cyan-400 rounded-full shadow-[0_0_20px_rgba(34,211,238,0.8)]" />
                <div className="w-4/5 h-4/5 rounded-full border-[1px] border-dashed border-white/20" />
              </div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-white/20 font-black text-9xl select-none italic tracking-tighter">
                  MV
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="relative px-6 md:px-20 py-20 bg-[#030712] overflow-hidden">
        {/* Subtle Background Accent */}
        <div className="absolute top-1/2 right-0 -translate-y-1/2 w-1/2 h-full bg-cyan-500/[0.02] rounded-full blur-[120px] pointer-events-none" />

        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            {/* Left Side: The "Why" */}
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="h-[1px] w-12 bg-cyan-500/50" />
                <span className="text-cyan-400 font-bold tracking-[0.3em] text-xs uppercase">
                  Our Mission
                </span>
              </div>

              <h2 className="text-4xl md:text-5xl font-black text-white leading-[1.1]">
                Clarity is the <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-slate-500">
                  Greatest Shortcut.
                </span>
              </h2>

              <p className="text-slate-400 text-lg leading-relaxed">
                We believe students should not feel lost while choosing careers,
                skills, or educational paths. Uncertainty is a barrier we are
                determined to break.
              </p>
            </div>

            {/* Right Side: The Solution Card */}
            <div className="relative group">
              {/* Glow Effect behind the card */}
              <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 to-amber-500 rounded-[2rem] blur opacity-20 group-hover:opacity-40 transition duration-1000"></div>

              <div className="relative bg-slate-900/50 border border-white/10 p-8 md:p-12 rounded-[2rem] backdrop-blur-xl">
                <p className="text-white text-xl md:text-2xl font-medium leading-snug italic opacity-90">
                  "Marga Veda was created to{" "}
                  <span className="text-cyan-400">
                    simplify career exploration
                  </span>{" "}
                  using structured roadmaps, skill tracking, and guided
                  experiences that help students move toward the right future
                  with confidence."
                </p>

                <div className="mt-10 flex gap-4">
                  {/* Visual Indicators of the "Simplification" */}
                  <div className="flex -space-x-3">
                    {[1, 2, 3].map((i) => (
                      <div
                        key={i}
                        className={`h-10 w-10 rounded-full border-2 border-slate-900 bg-slate-800 flex items-center justify-center`}
                      >
                        <div className="h-1.5 w-1.5 rounded-full bg-cyan-400 animate-pulse" />
                      </div>
                    ))}
                  </div>
                  <div className="text-xs text-slate-500 flex flex-col justify-center">
                    <span className="font-bold text-slate-300 uppercase tracking-tighter">
                      Unified Guidance
                    </span>
                    <span>100% Student-Centric</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="px-6 md:px-20 py-8 bg-[#030712] relative">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="mb-16 space-y-4">
            <h2 className="text-4xl md:text-5xl font-black text-white tracking-tight">
              What We <span className="text-cyan-400">Do.</span>
            </h2>
            <p className="text-slate-400 max-w-lg">
              We’ve engineered a multi-layered approach to career navigation,
              turning overwhelming choices into clear, actionable steps.
            </p>
          </div>

          {/* Bento Grid */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 lg:gap-6">
            {/* 1. Career Roadmaps - Large Featured Card */}
            <div className="md:col-span-8 group relative overflow-hidden rounded-[2.5rem] border border-white/10 bg-white/[0.02] p-8 md:p-12 hover:border-cyan-500/50 transition-all duration-500">
              <div className="relative z-10 flex flex-col h-full justify-between">
                <div className="space-y-4">
                  <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 flex items-center justify-center text-cyan-400">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-6 h-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M9 6.75V15m6-10.5v.75m.001 8.25v.75m0 0a3 3 0 8.25-3 3m3-3a3 3 0 0 0-3-3m-12 3a3 3 0 0 0 3 3m0 0a3 3 0 0 0 3-3m-3 3v.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                      />
                    </svg>
                  </div>
                  <h3 className="text-3xl font-bold text-white">
                    Career Roadmaps
                  </h3>
                  <p className="text-slate-400 max-w-md text-lg">
                    Explore structured learning paths across technology, design,
                    business, healthcare, engineering, and emerging industries.
                  </p>
                </div>
                {/* Decorative Path Visual */}
                <div className="mt-12 flex gap-2">
                  {[1, 2, 3, 4].map((i) => (
                    <div
                      key={i}
                      className="h-1 flex-1 rounded-full bg-gradient-to-r from-cyan-500/40 to-transparent"
                    />
                  ))}
                </div>
              </div>
              {/* Background Glow */}
              <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-cyan-500/10 blur-[80px] rounded-full group-hover:bg-cyan-500/20 transition-colors" />
            </div>

            {/* 2. Skill Graphs - Tall Card */}
            <div className="md:col-span-4 group relative overflow-hidden rounded-[2.5rem] border border-white/10 bg-white/[0.02] p-8 hover:border-amber-500/50 transition-all duration-500">
              <div className="relative z-10 space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-amber-500/10 flex items-center justify-center text-amber-400">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 0 1 3 19.875v-6.75ZM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V8.625ZM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V4.125Z"
                    />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-white">Skill Graphs</h3>
                <p className="text-slate-400 text-sm leading-relaxed">
                  Understand how skills connect with careers and identify
                  exactly what to learn next in your sequence.
                </p>
              </div>
            </div>

            {/* 3. Guided Progress - Small Card */}
            <div className="md:col-span-6 group relative overflow-hidden rounded-[2.5rem] border border-white/10 bg-white/[0.02] p-8 hover:border-blue-500/50 transition-all duration-500">
              <div className="flex flex-col md:flex-row gap-6 items-start">
                <div className="w-12 h-12 shrink-0 rounded-2xl bg-blue-500/10 flex items-center justify-center text-blue-400">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="m3.75 13.5 10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75Z"
                    />
                  </svg>
                </div>
                <div className="space-y-2">
                  <h3 className="text-2xl font-bold text-white">
                    Guided Tracking
                  </h3>
                  <p className="text-slate-400 text-sm leading-relaxed">
                    Track your growth, save personalized paths, and continue
                    your journey without ever losing momentum.
                  </p>
                </div>
              </div>
            </div>

            {/* 4. Intelligent Exploration - Small Card */}
            <div className="md:col-span-6 group relative overflow-hidden rounded-[2.5rem] border border-white/10 bg-white/[0.02] p-8 hover:border-purple-500/50 transition-all duration-500">
              <div className="flex flex-col md:flex-row gap-6 items-start">
                <div className="w-12 h-12 shrink-0 rounded-2xl bg-purple-500/10 flex items-center justify-center text-purple-400">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0 0-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 0 1 8.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0 1 11.964-3.07M12 6.375a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0Zm8.25 2.25a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z"
                    />
                  </svg>
                </div>
                <div className="space-y-2">
                  <h3 className="text-2xl font-bold text-white">
                    Intelligent Discovery
                  </h3>
                  <p className="text-slate-400 text-sm leading-relaxed">
                    Find careers and domains tailored to evolving industry
                    trends using our data-driven insight engine.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="px-6 md:px-20 py-20  relative overflow-hidden">
        {/* Decorative Divider Line */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1px] h-full bg-gradient-to-b from-transparent via-white/10 to-transparent hidden lg:block" />

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-32 items-center">
            {/* LEFT SIDE: THE CHALLENGE */}
            <div className="space-y-10">
              <div className="space-y-4">
                <h2 className="text-4xl md:text-5xl font-black text-white tracking-tight">
                  The Student <br />
                  <span className="text-slate-500 italic">Dilemma.</span>
                </h2>
                <p className="text-slate-400 text-lg">
                  Traditional career exploration is fragmented and overwhelming.
                </p>
              </div>

              <ul className="space-y-6">
                {[
                  "Confusion while choosing careers",
                  "Information overload",
                  "Unclear learning direction",
                  "Disconnected resources",
                  "Lack of structured guidance",
                ].map((item, index) => (
                  <li key={index} className="flex items-center gap-4 group">
                    <div className="w-1.5 h-1.5 rounded-full bg-slate-700 group-hover:bg-red-400 transition-colors" />
                    <span className="text-slate-400 group-hover:text-slate-200 transition-colors duration-300">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {/* RIGHT SIDE: THE EVOLUTION */}
            <div className="relative">
              {/* Glow behind the solution content */}
              <div className="absolute inset-0 bg-cyan-500/20 blur-[100px] rounded-full pointer-events-none" />

              <div className="relative space-y-8 p-8 md:p-12 rounded-[3rem] border border-white/10 bg-white/[0.03] backdrop-blur-md">
                <div className="inline-block px-4 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-[10px] font-bold uppercase tracking-widest">
                  The Solution
                </div>

                <h3 className="text-4xl md:text-6xl font-black text-white leading-tight">
                  Why <span className="text-cyan-400">Marga Veda?</span>
                </h3>

                <p className="text-slate-300 text-xl leading-relaxed font-light italic">
                  "We solve the noise by creating a{" "}
                  <span className="text-white font-medium">
                    single intelligent ecosystem
                  </span>{" "}
                  for career navigation."
                </p>

                <div className="pt-6 grid grid-cols-2 gap-4">
                  <div className="p-4 rounded-2xl bg-white/5 border border-white/5">
                    <div className="text-cyan-400 font-bold text-xl">
                      Integrated
                    </div>
                    <div className="text-slate-500 text-xs uppercase tracking-tighter">
                      Resources
                    </div>
                  </div>
                  <div className="p-4 rounded-2xl bg-white/5 border border-white/5">
                    <div className="text-amber-400 font-bold text-xl">
                      Structured
                    </div>
                    <div className="text-slate-500 text-xs uppercase tracking-tighter">
                      Direction
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="relative px-6 md:px-20 py-8  overflow-hidden">
        {/* Radial Center Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-[600px] bg-gradient-to-r from-cyan-500/10 via-blue-600/5 to-amber-500/10 blur-[140px] rounded-full opacity-50" />

        <div className="max-w-5xl mx-auto relative z-10 text-center">
          {/* Decorative Top Line */}
          <div className="flex justify-center mb-12">
            <div className="h-24 w-[1px] bg-gradient-to-b from-transparent via-cyan-500/50 to-cyan-400" />
          </div>

          <div className="space-y-10">
            <h2 className="text-cyan-400 font-bold tracking-[0.4em] text-xs uppercase">
              Our Vision
            </h2>

            <h3 className="text-4xl md:text-7xl font-black text-white leading-[1.1] tracking-tight">
              Empowering the <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-white to-white/40">
                Architects of Tomorrow.
              </span>
            </h3>

            <p className="max-w-3xl mx-auto text-slate-400 text-xl md:text-2xl leading-relaxed font-light">
              To become a{" "}
              <span className="text-white">
                modern digital guidance ecosystem
              </span>{" "}
              that empowers students to make informed career decisions and
              continuously evolve their skills for the future.
            </p>

            {/* Modern Tech-Themed Visual Divider */}
            <div className="pt-16 flex items-center justify-center gap-6">
              <div className="h-[1px] w-16 bg-gradient-to-r from-transparent to-white/20" />
              <div className="flex gap-2">
                <div className="h-1.5 w-1.5 rounded-full bg-cyan-400 shadow-[0_0_10px_rgba(34,211,238,0.8)]" />
                <div className="h-1.5 w-1.5 rounded-full bg-white/20" />
                <div className="h-1.5 w-1.5 rounded-full bg-white/20" />
              </div>
              <div className="h-[1px] w-16 bg-gradient-to-l from-transparent to-white/20" />
            </div>
          </div>
        </div>
      </section>

      <section className="px-6 md:px-20 py-8  relative overflow-hidden">
        <div className="max-w-7xl mx-auto space-y-32">
          {/* PLATFORM HIGHLIGHTS - GRID LAYOUT */}
          <div className="space-y-16">
            <div className="text-center space-y-4">
              <h2 className="text-4xl md:text-5xl font-black text-white">
                Platform <span className="text-cyan-400">Highlights</span>
              </h2>
              <p className="text-slate-500 uppercase tracking-[0.3em] text-xs font-bold">
                The Core of the Ecosystem
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  title: "150+ Career Tracks",
                  desc: "A vast library of structured paths across every major industry.",
                },
                {
                  title: "Skill Mapping",
                  desc: "Interactive visualization of how skills interlock and evolve.",
                },
                {
                  title: "Progress Systems",
                  desc: "Granular tracking to ensure you never lose your learning momentum.",
                },
                {
                  title: "Exploration Engine",
                  desc: "Smart search and discovery tools to find your next passion.",
                },
                {
                  title: "Growth Direction",
                  desc: "Data-driven insights to help you move in the right direction.",
                },
                {
                  title: "Futuristic UX",
                  desc: "A seamless, glass-morphic interface built for the next generation.",
                },
              ].map((item, index) => (
                <div
                  key={index}
                  className="p-8 rounded-[2rem] border border-white/5 bg-white/[0.02] hover:bg-white/[0.05] hover:border-cyan-500/30 transition-all duration-300"
                >
                  <div className="h-1 w-8 bg-cyan-500 mb-6 rounded-full" />
                  <h4 className="text-xl font-bold text-white mb-2">
                    {item.title}
                  </h4>
                  <p className="text-slate-400 text-sm leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* FUTURE GOALS - VERTICAL ROADMAP */}
          <div className="max-w-4xl mx-auto space-y-16">
            <div className="text-center space-y-4">
              <h2 className="text-4xl md:text-5xl font-black text-white italic underline underline-offset-8 decoration-amber-500/30">
                Future <span className="text-amber-400">Goals</span>
              </h2>
              <p className="text-slate-400 text-lg">
                What we are building for the next phase of Marga Veda.
              </p>
            </div>

            <div className="relative border-l-2 border-white/10 ml-4 md:ml-0 space-y-12">
              {[
                {
                  goal: "AI Recommendations",
                  detail:
                    "Leveraging neural networks to suggest careers based on user behavior.",
                },
                {
                  goal: "Internship Discovery",
                  detail:
                    "Bridging the gap between learning a skill and applying it professionally.",
                },
                {
                  goal: "Community Learning",
                  detail:
                    "Peer-to-peer mentorship and collaborative roadmap sharing.",
                },
                {
                  goal: "Mobile Ecosystem",
                  detail:
                    "Full support for Android and iOS for guidance on the go.",
                },
                {
                  goal: "Advanced Analytics",
                  detail:
                    "Deep insights into learning patterns and engagement metrics.",
                },
              ].map((item, index) => (
                <div key={index} className="relative pl-10 group">
                  {/* Roadmap Node */}
                  <div className="absolute -left-[9px] top-1 w-4 h-4 rounded-full border-2 border-slate-900 bg-slate-700 group-hover:bg-amber-400 group-hover:scale-125 transition-all duration-300" />

                  <div className="space-y-1">
                    <h4 className="text-2xl font-bold text-white group-hover:text-amber-400 transition-colors">
                      {item.goal}
                    </h4>
                    <p className="text-slate-500 text-base">{item.detail}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Background Decoration */}
        <div className="absolute -bottom-48 -left-48 w-96 h-96 bg-amber-500/10 blur-[120px] rounded-full" />
      </section>

      <section className="relative px-6 md:px-20 py-8 overflow-hidden">
        <div className="max-w-5xl mx-auto text-center relative z-10 space-y-12">
          {/* Minimalist Divider */}
          <div className="flex items-center justify-center gap-4 mb-8">
            <div className="h-[1px] w-12 bg-white/10" />
            <div className="text-cyan-500 uppercase tracking-[0.5em] text-[10px] font-black">
              The Conclusion
            </div>
            <div className="h-[1px] w-12 bg-white/10" />
          </div>

          {/* Main Headline with Shimmer Effect */}
          <h2 className="text-6xl md:text-8xl font-black leading-tight tracking-tighter text-white">
            Right Guidance
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-white to-amber-400 animate-gradient-x">
              Better Future
            </span>
          </h2>

          {/* The Core Message */}
          <p className="max-w-2xl mx-auto text-slate-400 text-xl md:text-2xl leading-relaxed font-light">
            Marga Veda is more than a platform — it is a{" "}
            <span className="text-white font-medium italic">
              growing ecosystem
            </span>{" "}
            designed to help students discover direction, build skills, and
            shape meaningful futures.
          </p>

          {/* Final Call to Action */}
          <div className="pt-12 flex flex-col md:flex-row items-center justify-center gap-6">
            <button
              onClick={() => navigate(`/explore`)}
              className="group relative px-8 py-4 bg-white text-black font-bold rounded-2xl overflow-hidden transition-all hover:scale-105 active:scale-95"
            >
              <span className="relative z-10">Start Your Journey</span>
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-blue-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </button>

            <div className="text-slate-500 text-sm font-medium tracking-wide">
              Explore 150+ Careers Today
            </div>
          </div>

          {/* Bottom Brand Mark */}
          <div className="pt-24 opacity-20">
            <div className="text-xs tracking-[1em] text-white font-thin uppercase">
              Marga Veda © 2026
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}

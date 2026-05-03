import { useEffect } from "react";

const CareerOverlayCard = ({ selectedCareer, handleCareerCardClose }) => {
    const formatSkill = (skill) =>
        skill.replaceAll("_", " ").replace(/\b\w/g, (c) => c.toUpperCase());

    useEffect(() => {
        document.body.style.overflow = "hidden";
        return () => (document.body.style.overflow = "auto");
    }, []);

    return (
        <>
            {/* <div className="absolute inset-0 bg-black/60 backdrop-blur-lg h-full w-full"
                onClick={handleCareerCardClose}
            ></div> */}
            <div
                className="fixed inset-0 z-50 flex items-center justify-center"
                onClick={handleCareerCardClose}
            >
                {/* Close Button */}
                <button
                    onClick={handleCareerCardClose}
                    className=" fixed top-[40px] right-7 md:right-[15%] lg:right-[20%] z-[100] 
                                w-8 h-8 md:w-10 md:h-10 flex items-center justify-center 
                                bg-[#0a0a0a] backdrop-blur-md rounded-lg
                                border border-[#ffca28] text-[#ffca28]
                                transition-all duration-300
                                hover:bg-[#ffca28]/5 hover:scale-105
                                shadow-lg"
                >
                    <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2.5"
                            d="M6 18L18 6M6 6l12 12"
                        />
                    </svg>
                </button>
                <div className="w-full h-full overflow-y-auto flex items-start justify-center p-4">

                    <div
                        className="relative flex flex-col md:flex-row w-full md:w-[85%] lg:w-[70%] min-h-[90%] md:h-[80%] bg-[#0a0a0a] border border-white/10 rounded-[2.5rem] shadow-[0_0_50px_rgba(0,0,0,0.5)] overflow-hidden"
                        onClick={(e) => e.stopPropagation()}
                    >


                        <div className="flex flex-col md:flex-row w-full h-auto md:h-full">

                            {/* RIGHT SIDE (TOP on mobile) */}
                            <div className="order-1 md:order-2 w-full md:w-[40%] p-8 md:p-12 bg-gradient-to-br from-[#121212] via-[#0a0a0a] to-black flex flex-col justify-start md:justify-center items-center text-center relative border-b md:border-b-0 border-white/5">

                                {/* Background Decorative Elements */}
                                <div className="absolute -top-24 -right-24 w-64 h-64 bg-[#ffca28]/5 blur-[80px] rounded-full"></div>
                                <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-[#ffca28]/5 blur-[80px] rounded-full"></div>

                                {/* Top Badge */}
                                <div className="group cursor-default mb-4 md:mb-6">
                                    <span className="px-3 py-1 border border-[#ffca28]/30 text-[#ffca28] text-[8px] md:text-[9px] font-black rounded-full tracking-[0.3em] bg-[#ffca28]/5 transition-all duration-500 group-hover:bg-[#ffca28] group-hover:text-black">
                                        FEATURED CAREER
                                    </span>
                                </div>

                                {/* Main Title - Balanced scaling for Mobile/Desktop */}
                                <h2 className="text-xl md:text-2xl lg:text-3xl font-black text-white mb-6 md:mb-8 tracking-tighter leading-[1.1]">
                                    {selectedCareer?.title?.split(" ").map((word, i, arr) => (
                                        <span
                                        key={i}
                                        className={`inline ${
                                            i === arr.length - 1 ? "text-[#ffca28]" : ""
                                        }`}
                                        >
                                        {word}{" "}
                                        </span>
                                    ))}
                                </h2>


                                {/* Salary Section */}
                                <div className="mb-6 w-full max-w-[150px]">
                                    <div className="flex items-center justify-center gap-1.5 mb-2">
                                        <div className="h-px w-3 bg-gray-800"></div>
                                        <p className="text-[9px] uppercase tracking-[0.15em] text-gray-500 font-semibold">
                                            Avg Salary
                                        </p>
                                        <div className="h-px w-3 bg-gray-800"></div>
                                    </div>

                                    <div className="relative group">
                                        {/* Subtle Glow */}
                                        <div className="absolute inset-0 bg-[#ffca28]/10 blur-lg rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                                        <div className="relative flex flex-col items-center justify-center py-2.5 px-3 rounded-2xl bg-white/[0.03] border border-white/10 backdrop-blur-md group-hover:border-[#ffca28]/40 transition-all duration-500">

                                            <div className="flex items-center gap-1.5 mb-0.5">
                                                <div className="w-1 h-1 rounded-full bg-[#ffca28] animate-pulse"></div>

                                                <span className="text-base md:text-xl font-black text-white tracking-tight">
  {selectedCareer?.salary?.average}
</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Primary Action Button */}
                                <button className="group relative w-full max-w-[240px] py-4 bg-[#ffca28] text-black font-black text-xs uppercase tracking-[0.2em] rounded-2xl transition-all duration-300 transform hover:-translate-y-1 hover:shadow-[0_20px_40px_rgba(255,202,40,0.3)] active:scale-95 overflow-hidden">
                                    <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]"></div>

                                    <span className="relative z-10 flex items-center justify-center gap-2">
                                        Explore Paths
                                        <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                                        </svg>
                                    </span>
                                </button>

                            </div>

                            {/* LEFT SIDE (BOTTOM on mobile) */}
                            <div className="order-2 md:order-1 w-full md:w-[60%] p-6 md:p-12 overflow-y-auto custom-scrollbar">

                                <div className="mb-10 group">
                                    {/* Header with a decorative glow dot */}
                                    <div className="flex items-center gap-3 mb-5">
                                        <div className="w-1.5 h-1.5 rounded-full bg-[#ffca28] shadow-[0_0_10px_#ffca28]"></div>
                                        <h4 className="text-[10px] uppercase tracking-[0.3em] text-[#ffca28] font-black">
                                            Career Overview
                                        </h4>
                                    </div>

                                    <div className="relative overflow-hidden group">
                                        {/* Decorative Background "Quote" Icon */}
                                        <div className="absolute -top-4 -right-2 text-white/[0.03] select-none pointer-events-none group-hover:text-[#ffca28]/10 transition-colors duration-700">
                                            <svg
                                                className="w-24 h-24"
                                                fill="currentColor"
                                                viewBox="0 0 24 24"
                                            >
                                                <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                                            </svg>
                                        </div>

                                        {/* Main Description Box */}
                                        <div className="relative px-6 py-5 rounded-[2rem] bg-gradient-to-br from-white/[0.05] to-transparent border border-white/10 backdrop-blur-md group-hover:border-[#ffca28]/30 transition-all duration-500">
                                            {/* The Animated Left Border (Energy Bar) */}
                                            <div className="absolute left-0 top-1/2 -translate-y-1/2 h-2/3 w-[3px]">
                                                <div className="h-full w-full bg-[#ffca28] rounded-r-full shadow-[0_0_15px_#ffca28] opacity-70 group-hover:h-full group-hover:opacity-100 transition-all duration-700"></div>
                                            </div>

                                            <p className="text-gray-300 leading-relaxed text-sm md:text-[15px] font-medium tracking-wide font-['Inter'] group-hover:text-white transition-colors duration-500">
                                                <span className="text-[#ffca28] font-black text-xl leading-none mr-1 opacity-50 group-hover:opacity-100">
                                                    “
                                                </span>
                                                {selectedCareer.description}
                                                <span className="text-[#ffca28] font-black text-xl leading-none ml-1 opacity-50 group-hover:opacity-100">
                                                    ”
                                                </span>
                                            </p>

                                            {/* Subtle Bottom Metadata */}
                                            <div className="mt-4 flex items-center gap-2 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-500">
                                                <div className="h-[1px] w-4 bg-[#ffca28]/50"></div>
                                                <span className="text-[9px] text-[#ffca28] uppercase font-bold tracking-[0.2em]">
                                                    Summary insight
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="mb-8 group">
                                    {/* Section Header */}
                                    <div className="flex items-center gap-3 mb-4">
                                        <p className="text-[10px] uppercase tracking-[0.25em] text-[#ffca28] font-black">
                                            Market Demand Signal
                                        </p>
                                        <div className="h-[1px] flex-1 bg-gradient-to-r from-[#ffca28]/20 to-transparent"></div>
                                    </div>

                                    <div className="relative flex items-center justify-between p-4 rounded-2xl bg-gradient-to-br from-white/[0.05] to-transparent border border-white/5 group-hover:border-[#ffca28]/30 transition-all duration-500">
                                        <div className="flex flex-col gap-1">
                                            <div className="flex items-center gap-2">
                                                {/* The Pulsing Signal */}
                                                <div className="relative flex items-center justify-center w-3 h-3">
                                                    <span className="absolute inline-flex w-full h-full rounded-full bg-[#ffca28] opacity-20 animate-ping"></span>
                                                    <span className="relative inline-flex w-1.5 h-1.5 rounded-full bg-[#ffca28]"></span>
                                                </div>

                                                <span className="text-lg font-black tracking-tight text-white uppercase italic">
  {selectedCareer?.overview?.demandTrend
    ?.split("_")
    .join(" ")}
</span>
                                            </div>

                                            <p className="text-[9px] text-gray-500 font-mono tracking-widest uppercase">
                                                Live Industry Status
                                            </p>
                                        </div>

                                        {/* Decorative Mini-Sparkline (Visual Flair) */}
                                        <div className="flex items-end gap-1 h-8 px-2">
                                            {[40, 70, 50, 90, 60, 95, 80].map((height, i) => (
                                                <div
                                                    key={i}
                                                    className="w-1 bg-[#ffca28]/20 rounded-full transition-all duration-700 group-hover:bg-[#ffca28]"
                                                    style={{
                                                        height: `${height}%`,
                                                        transitionDelay: `${i * 50}ms`,
                                                    }}
                                                ></div>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Sub-label for context */}
                                    <div className="mt-3 flex items-center gap-2 px-1">
                                        <svg
                                            className="w-3 h-3 text-gray-600"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="2"
                                                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                            />
                                        </svg>
                                        <p className="text-[10px] text-gray-600 italic">
                                            Based on recent hiring data and industry projections.
                                        </p>
                                    </div>
                                </div>

                                {/* EDUCATION LEVEL SECTION */}
                                <div className="group mb-12">
                                    {/* Section Header - Clean & Minimal */}
                                    <div className="flex items-center gap-3 mb-6">
                                        <p className="text-[10px] uppercase tracking-[0.25em] text-[#ffca28] font-bold">
                                            Required Education
                                        </p>
                                        <div className="h-[1px] flex-1 bg-white/10"></div>
                                    </div>

                                    {/* Education Grid - Highly Responsive */}
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        {selectedCareer?.education?.preferredLevels?.map((edu, index) => (
  <div
    key={index}
    className="group flex items-center gap-5 p-5 rounded-2xl bg-white/[0.03] border border-white/5 hover:border-[#ffca28]/30 hover:bg-[#ffca28]/5 transition-all duration-300"
  >

    {/* ICON */}
    <div className="flex-shrink-0 flex items-center justify-center w-12 h-12 rounded-2xl bg-[#ffca28]/5 border border-[#ffca28]/10 text-[#ffca28] group-hover:scale-110 transition-transform duration-300">

      <svg
        className="w-5 h-5"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M12 14l9-5-9-5-9 5 9 5zm0 0l9-5-9-5-9 5 9 5zm0 0v6"
        />
      </svg>
    </div>

    {/* TEXT */}
    <div className="flex flex-col">

      <span className="text-xl font-black text-white leading-tight uppercase">
        {edu}
      </span>

      <p className="text-[10px] text-gray-500 font-mono uppercase tracking-widest mt-1">

        {edu === "ug" && "Undergraduate"}

        {edu === "pg" && "Postgraduate"}

        {edu === "diploma" && "Diploma"}

        {edu === "phd" && "Doctorate"}

      </p>
    </div>
  </div>
))}
                                    </div>
                                </div>

                                {/* DIFFICULTY LEVEL SECTION */}
                                <div className="group mb-10">
                                    {/* Section Header */}
                                    <div className="flex items-center gap-3 mb-6">
                                        <p className="text-[10px] uppercase tracking-[0.25em] text-[#ffca28] font-black">
                                            Difficulty Level
                                        </p>
                                        <div className="h-[1px] flex-1 bg-gradient-to-r from-[#ffca28]/20 to-transparent"></div>
                                    </div>

                                    {/* Difficulty Meter */}
                                    <div className="relative p-6 rounded-2xl bg-gradient-to-br from-white/[0.04] to-transparent border border-white/5 transition-all duration-300 group-hover:border-[#ffca28]/20">
                                        <div className="flex items-center justify-between mb-3">
                                            <div className="flex items-center gap-2">
                                                <span
  className={`h-2.5 w-2.5 rounded-full ${
    selectedCareer?.overview?.difficultyLevel === "hard"
      ? "bg-[#ffca28]"
      : selectedCareer?.overview?.difficultyLevel === "medium"
      ? "bg-cyan-400"
      : "bg-emerald-400"
  }`}
></span>

<span className="text-xl font-bold text-white capitalize">
  {selectedCareer?.overview?.difficultyLevel}
</span>
                                            </div>
                                            <span className="text-sm text-gray-400">Scale of Difficulty</span>
                                        </div>

                                        {/* Progress Bar with Amber Gradient */}
                                        <div className="w-full bg-white/5 rounded-full h-3.5 relative overflow-hidden">
                                            <div
  className={`absolute inset-0 rounded-full bg-gradient-to-r from-[#ffca28]/40 to-[#ffca28]
    ${
      selectedCareer?.overview?.difficultyLevel === "easy"
        ? "w-1/3"
        : selectedCareer?.overview?.difficultyLevel === "medium"
        ? "w-2/3"
        : "w-full"
    }
  `}
></div>
                                            <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-black to-transparent"></div>
                                        </div>
                                    </div>
                                </div>

                                {/* KEY TAGS SECTION */}
                                <div className="group mb-10">
                                    {/* Section Header */}
                                    <div className="flex items-center gap-3 mb-6">
                                        <p className="text-[10px] uppercase tracking-[0.25em] text-[#ffca28] font-black">
                                            Key Industry Tags
                                        </p>
                                        <div className="h-[1px] flex-1 bg-gradient-to-r from-[#ffca28]/20 to-transparent"></div>
                                    </div>

                                    {/* Flex-wrapping Tags */}
                                    <div className="flex flex-wrap gap-3">

  {selectedCareer?.tags?.map((tag, index) => (

    <div
      key={index}
      className="
        group relative overflow-hidden
        px-4 py-2 rounded-full
        text-xs font-black tracking-[0.15em]
        text-white uppercase
        bg-white/[0.04]
        border border-white/5
        hover:border-[#ffca28]/30
        transition-all duration-300
        hover:scale-105
      "
    >

      {/* Glow Effect */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition bg-[#ffca28]/10" />

      <div className="relative z-10 flex items-center gap-2">

        <div className="w-1.5 h-1.5 rounded-full bg-[#ffca28] animate-pulse" />

        {tag
          ?.split("_")
          .join(" ")
          .toUpperCase()}

      </div>
    </div>
  ))}
</div>
                                </div>

                                <div className="mb-8">
                                    {/* Header with a sleek tech-line */}
                                    <div className="flex items-center gap-3 mb-5">
                                        <div className="p-1.5 rounded-lg bg-[#ffca28]/10 border border-[#ffca28]/20">
                                            <svg
                                                className="w-3.5 h-3.5 text-[#ffca28]"
                                                fill="none"
                                                stroke="currentColor"
                                                viewBox="0 0 24 24"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth="2"
                                                    d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                                                />
                                            </svg>
                                        </div>
                                        <h4 className="text-[10px] uppercase tracking-[0.25em] text-[#ffca28] font-black">
                                            Recommended Courses
                                        </h4>
                                    </div>

                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                        {selectedCareer?.education?.recommendedCourses?.map((course) => (

  <div
    key={course}
    className="
      group relative flex items-center p-4
      bg-white/[0.03]
      border border-white/5
      rounded-2xl
      hover:bg-[#ffca28]/5
      hover:border-[#ffca28]/30
      transition-all duration-500
      cursor-default overflow-hidden
    "
  >

    {/* Hover Glow */}
    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition bg-gradient-to-r from-[#ffca28]/5 to-transparent" />

    {/* Number/Icon */}
    <div
      className="
        relative z-10 flex-shrink-0
        w-9 h-9
        flex items-center justify-center
        rounded-xl
        bg-black
        border border-white/10
        text-[10px] font-mono
        text-gray-500
        group-hover:border-[#ffca28]/40
        group-hover:text-[#ffca28]
        transition-all duration-500
      "
    >
      #
    </div>

    {/* Content */}
    <div className="relative z-10 ml-4">

      <span
        className="
          text-[11px] font-bold tracking-wide
          text-gray-300
          group-hover:text-white
          transition-colors
          block capitalize
        "
      >
        {course
          ?.split("_")
          .join(" ")}
      </span>

      <span
        className="
          text-[9px]
          text-gray-600
          group-hover:text-gray-400
          transition-colors
          uppercase tracking-widest
          mt-0.5 block
        "
      >
        Recommended Learning Path
      </span>
    </div>

    {/* Arrow */}
    <div
      className="
        relative z-10 ml-auto
        opacity-0 -translate-x-2
        group-hover:opacity-100
        group-hover:translate-x-0
        transition-all duration-300
      "
    >
      <svg
        className="w-4 h-4 text-[#ffca28]"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M9 5l7 7-7 7"
        />
      </svg>
    </div>

  </div>
))}
                                    </div>
                                </div>

                                <h4 className="text-[#ffca28] uppercase tracking-widest text-xs font-bold mb-3">
                                    REQUIRED SKILLS
                                </h4>

                                <div className="mb-8">
                                    {/* Header with a subtle count indicator */}

                                    <div className="flex flex-wrap gap-2.5">
                                        {[
  ...(selectedCareer?.skills?.technical || []),
  ...(selectedCareer?.skills?.soft || []),
].map((skill) => (

  <div
    key={skill}
    className="
      group relative flex items-center gap-2.5
      px-4 py-2
      bg-gradient-to-b from-white/[0.07] to-transparent
      border border-white/10
      rounded-xl
      hover:border-[#ffca28]/60
      hover:bg-[#ffca28]/5
      transition-all duration-300
      shadow-sm overflow-hidden
    "
  >

    {/* Glow Overlay */}
    <div className="absolute inset-0 rounded-xl bg-gradient-to-tr from-[#ffca28]/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>

    {/* Dot */}
    <div className="relative z-10">

      <div className="w-2 h-2 bg-[#ffca28] rounded-full shadow-[0_0_8px_#ffca28] group-hover:scale-125 transition-transform duration-300"></div>

      <div className="absolute inset-0 w-2 h-2 bg-[#ffca28] rounded-full animate-ping opacity-0 group-hover:opacity-40"></div>
    </div>

    {/* Skill Name */}
    <span
      className="
        relative z-10
        text-[11px] font-bold tracking-tight
        text-gray-300
        group-hover:text-white
        transition-colors
      "
    >
      {skill
        ?.split("_")
        .join(" ")
        .replace(/\b\w/g, (char) => char.toUpperCase())}
    </span>
  </div>
))}
                                    </div>
                                </div>

                                <div className="mb-8 space-y-6">
                                    {/* Sector Section */}
                                    <div>
                                        <div className="flex items-center gap-2 mb-3">
                                            <div className="w-1 h-3 bg-[#ffca28] rounded-full"></div>
                                            <p className="text-[10px] uppercase tracking-[0.2em] text-[#ffca28] font-black">
                                                Industry Sector
                                            </p>
                                        </div>

                                        <div className="flex flex-wrap gap-2">
                                            {selectedCareer?.industrySectors?.map((sec) => (

  <span
    key={sec}
    className="
      group relative overflow-hidden
      px-4 py-1.5
      text-[11px] font-bold uppercase tracking-wide
      rounded-full
      bg-gradient-to-r from-[#ffca28]/10 to-transparent
      border border-[#ffca28]/20
      text-gray-300
      hover:text-white
      hover:border-[#ffca28]/50
      transition-all duration-300
      cursor-default
    "
  >

    {/* Hover Glow */}
    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition bg-[#ffca28]/10" />

    <span className="relative z-10">
      {sec
        ?.replace(/_/g, " ")
        .replace(/\b\w/g, (char) => char.toUpperCase())}
    </span>

  </span>
))}
                                        </div>
                                    </div>

                                    {/* Qualification Section */}
                                    <div>
                                        <p className="text-[10px] uppercase tracking-[0.2em] text-[#ffca28] font-black mb-3">
                                            Academic Foundation
                                        </p>

                                        <div className="relative overflow-hidden group">
                                            {/* Background decoration */}
                                            <div className="absolute top-0 right-0 p-2 opacity-5">
                                                <svg
                                                    className="w-12 h-12 text-white"
                                                    fill="currentColor"
                                                    viewBox="0 0 24 24"
                                                >
                                                    <path d="M12 2L1 9l11 7 11-7-11-7z" />
                                                    <path d="M1 19l11 7 11-7M1 14l11 7 11-7" />
                                                </svg>
                                            </div>

                                            <div className="px-5 py-4 rounded-2xl bg-[#0a0a0a] border border-white/5 group-hover:border-[#ffca28]/30 transition-colors duration-500">
                                                <div className="flex items-center gap-4">
                                                    {/* Degree Icon */}
                                                    <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-[#ffca28] group-hover:scale-110 transition-transform">
                                                        <svg
                                                            className="w-5 h-5"
                                                            fill="none"
                                                            stroke="currentColor"
                                                            viewBox="0 0 24 24"
                                                        >
                                                            <path
                                                                strokeLinecap="round"
                                                                strokeLinejoin="round"
                                                                strokeWidth="2"
                                                                d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-10V4m0 10V4m-4 6h4"
                                                            />
                                                        </svg>
                                                    </div>

                                                    <div>
                                                        <span className="text-[10px] text-gray-500 block font-mono uppercase tracking-tighter mb-0.5">
                                                            Minimum Required
                                                        </span>
                                                        <span className="text-sm text-gray-200 font-bold tracking-wide">
                                                            {selectedCareer?.education?.minimumQualification}
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="mb-12 group/timeline">
                                    {/* ===== Career Growth Header ===== */}
                                    <div className="flex items-center gap-4 mb-10">
                                        <h4 className="text-[10px] uppercase tracking-[0.3em] text-[#ffca28] font-black whitespace-nowrap">
                                            Career Progression
                                        </h4>
                                        <div className="h-px w-full bg-gradient-to-r from-[#ffca28]/40 via-[#ffca28]/5 to-transparent"></div>
                                    </div>

                                    <div className="relative pl-10 space-y-4">
                                        {/* The Main Vertical Rail */}
                                        <div className="absolute left-[13px] top-2 bottom-2 w-[1px] bg-gradient-to-b from-[#ffca28] via-[#ffca28]/20 to-transparent"></div>

                                        {selectedCareer?.careerPath?.growthRoles?.map((item, index) => {
                                            const title = item.replace(/_/g, " ");
                                            const isFirst = index === 0;

                                            return (
                                                <div className="relative group/step pb-4" key={item}>
                                                    {/* Animated Node Icon */}
                                                    <div
                                                        className={`absolute -left-[35px] z-10 flex items-center justify-center rounded-full transition-all duration-500 
                        ${isFirst
                                                                ? "w-7 h-7 -left-[38px] bg-[#ffca28] text-black shadow-[0_0_15px_#ffca28]"
                                                                : "w-5 h-5 bg-[#0a0a0a] border border-white/20 text-gray-500 group-hover/step:border-[#ffca28] group-hover/step:text-[#ffca28]"
                                                            }`}
                                                    >
                                                        {isFirst ? (
                                                            <svg
                                                                className="w-4 h-4"
                                                                fill="currentColor"
                                                                viewBox="0 0 20 20"
                                                            >
                                                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                                            </svg>
                                                        ) : (
                                                            <span className="text-[9px] font-bold font-mono">
                                                                {index + 1}
                                                            </span>
                                                        )}

                                                        {/* Pulsing Ring for the current/active role */}
                                                        {isFirst && (
                                                            <div className="absolute inset-0 rounded-full animate-ping bg-[#ffca28] opacity-20"></div>
                                                        )}
                                                    </div>

                                                    {/* Step Card Content */}
                                                    <div className="relative p-4 rounded-2xl bg-white/[0.02] border border-white/5 transition-all duration-300 group-hover/step:bg-white/[0.05] group-hover/step:border-white/10 group-hover/step:translate-x-1">
                                                        <h5
                                                            className={`leading-tight capitalize tracking-wide font-bold transition-colors 
                        ${isFirst ? "text-white text-lg" : "text-gray-400 text-base group-hover/step:text-gray-200"}`}
                                                        >
                                                            {title}
                                                        </h5>

                                                        {/* Dynamic Meta Tag */}
                                                        <div className="flex items-center gap-3 mt-2">
                                                            <span className="text-[9px] font-mono py-0.5 px-2 rounded bg-white/5 text-gray-500 uppercase tracking-tighter">
                                                                {isFirst ? "Entry Level" : `Level 0${index + 1}`}
                                                            </span>
                                                            <div className="h-px w-8 bg-white/10"></div>
                                                            <span className="text-[10px] text-gray-600 italic">
                                                                {isFirst
                                                                    ? "Your starting journey"
                                                                    : "Advanced responsibility"}
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>

                                {/* ===== How to Enter ===== */}

                                <div className="mb-10">
                                    {/* Header with futuristic dot-accent */}
                                    <div className="flex items-center gap-3 mb-8">
                                        <div className="relative">
                                            <div className="w-3 h-3 bg-[#ffca28] rounded-full"></div>
                                            <div className="absolute inset-0 w-3 h-3 bg-[#ffca28] rounded-full animate-ping opacity-40"></div>
                                        </div>
                                        <h4 className="text-[10px] uppercase tracking-[0.3em] text-[#ffca28] font-black">
                                            Entry Strategy
                                        </h4>
                                    </div>

                                    <div className="grid grid-cols-1 gap-4">
                                        {selectedCareer?.hiring?.entryMethods?.map((item, index) => {
                                            const title = item.replace(/_/g, " ");

                                            return (
                                                <div
                                                    key={item}
                                                    className="group relative overflow-hidden p-5 rounded-3xl bg-[#0d0d0d] border border-white/5 hover:border-[#ffca28]/40 transition-all duration-500 cursor-pointer"
                                                >
                                                    {/* Subtle Background Glow on Hover */}
                                                    <div className="absolute top-0 right-0 w-32 h-32 bg-[#ffca28]/5 blur-[50px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>

                                                    <div className="relative z-10 flex items-center justify-between">
                                                        <div className="flex items-center gap-5">
                                                            {/* Number Badge */}
                                                            <div className="w-12 h-12 flex flex-col items-center justify-center rounded-2xl bg-white/[0.03] border border-white/10 group-hover:border-[#ffca28]/30 group-hover:bg-[#ffca28]/10 transition-all duration-500">
                                                                <span className="text-[10px] text-gray-500 group-hover:text-[#ffca28] font-mono leading-none mb-1">
                                                                    CH
                                                                </span>
                                                                <span className="text-lg font-black text-gray-300 group-hover:text-white leading-none">
                                                                    {index + 1}
                                                                </span>
                                                            </div>

                                                            <div>
                                                                <span className="text-[9px] text-[#ffca28]/60 font-mono uppercase tracking-widest mb-1 block">
                                                                    Access Route {String(index + 1).padStart(2, "0")}
                                                                </span>
                                                                <h5 className="text-white font-extrabold text-sm md:text-base capitalize tracking-tight group-hover:translate-x-1 transition-transform duration-300">
                                                                    {title}
                                                                </h5>
                                                            </div>
                                                        </div>

                                                        {/* Futuristic Action Button */}
                                                        <div className="relative w-10 h-10 flex items-center justify-center rounded-xl bg-white/5 text-gray-500 group-hover:bg-[#ffca28] group-hover:text-black transition-all duration-500 group-hover:rotate-[-45deg] shadow-lg">
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
                                                                    strokeWidth="2.5"
                                                                    d="M14 5l7 7m0 0l-7 7m7-7H3"
                                                                />
                                                            </svg>
                                                        </div>
                                                    </div>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>

                                <div className="mt-8 group">
                                    {/* Header with an animated accent line */}
                                    <div className="flex items-center gap-3 mb-5">
                                        <p className="text-[10px] uppercase tracking-[0.3em] text-[#ffca28] font-black">
                                            Top Hiring Companies
                                        </p>
                                        <div className="h-[1px] flex-1 bg-gradient-to-r from-[#ffca28]/30 to-transparent"></div>
                                    </div>

                                    {/* Company Badges Container */}
                                    <div className="flex flex-wrap gap-3">
                                        {selectedCareer?.hiring?.topCompanies?.map((company, index) => (
                                            <div
                                                key={company}
                                                className="relative group/item cursor-pointer"
                                            >
                                                {/* Hover Glow Effect Layer */}
                                                <div className="absolute -inset-0.5 bg-gradient-to-r from-[#ffca28] to-amber-600 rounded-xl opacity-0 group-hover/item:opacity-20 blur transition duration-500"></div>

                                                {/* Main Badge */}
                                                <div className="relative flex items-center px-4 py-2 bg-[#0a0a0a] border border-white/10 rounded-xl transition-all duration-300 group-hover/item:border-[#ffca28]/50 group-hover/item:-translate-y-1 shadow-xl">
                                                    {/* Subtle Dot Indicator */}
                                                    <div className="w-1.5 h-1.5 rounded-full bg-[#ffca28]/40 mr-3 group-hover/item:bg-[#ffca28] transition-colors"></div>

                                                    <span className="text-xs font-bold tracking-wide text-gray-400 group-hover/item:text-white transition-colors">
                                                        {company}
                                                    </span>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                            </div>

                        </div>
                    </div>

                    <style jsx>{`
                    @keyframes shimmer {
                        100% {
                            transform: translateX(100%);
                        }
                    }
                `}</style>
                </div>
            </div>
        </>
    );
};

export default CareerOverlayCard;
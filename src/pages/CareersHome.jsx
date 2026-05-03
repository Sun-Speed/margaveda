import { useEffect, useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import MainLayout from "../components/layout/MainLayout";
import CareerOverlayCard from "../components/careersPage/careerOvelayCard";
import CareerHero from "../components/careersPage/HeroCareersPage";
import CareerCardShow from "../components/Pathfinder/CareerCardShow";
import { useSearch } from "../context/SearchContext";

// 🔥 Domain Config
const domainConfig = {
  Software: { title: "💻 Software" },
  Engineering: { title: "⚙️ Engineering" },
  Medical: { title: "🏥 Medical" },
  Science: { title: "🧪 Science" },
  Design: { title: "🎨 Design" },
  Management: { title: "🧑‍💼 Management" },
  Defence: { title: "🛡 Defence" },
};

const CareersHome = () => {
  const navigate = useNavigate();

  const { searchQuery, setSearchQuery } = useSearch();

  const [careers, setCareers] = useState([]);
  const [activeDomain, setActiveDomain] = useState("Software");
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [selectedCareer, setSelectedCareer] = useState(null);

  const ITEMS_PER_PAGE = 9;

  // 🔥 Fetch careers
  useEffect(() => {
    fetch("https://margaveda.onrender.com/api/jobs")
      .then((res) => res.json())
      .then((data) => {
        setCareers(data);
        setLoading(false);
      });
  }, []);

  // 🔥 Search state
  const query = searchQuery.toLowerCase().trim();
  const isSearching = query !== "";

  // 🔥 Reset domain when searching
  useEffect(() => {
    if (searchQuery.trim() !== "") {
      setActiveDomain("");
    } else {
      setActiveDomain("Software");
    }
  }, [searchQuery]);

  // 🔥 Reset pagination
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, activeDomain]);

  // 🔥 Domain filter (safe)
  const domainCareers = useMemo(() => {
    if (!activeDomain) return careers;

    return careers.filter(
      (career) => career.domain?.toLowerCase() === activeDomain.toLowerCase(),
    );
  }, [careers, activeDomain]);

  // 🔥 Global search (ONLY name + sector)
  const searchedCareers = useMemo(() => {
    return careers.filter(
      (career) =>
        career.name?.toLowerCase().includes(query) ||
        career.sector?.some((sec) => sec.toLowerCase().includes(query)),
    );
  }, [careers, query]);

  // 🔥 Final data
  const finalCareers = isSearching ? searchedCareers : domainCareers;

  // 🔥 Pagination
  const paginatedCareers = finalCareers.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE,
  );

  if (loading) {
    return (
      <MainLayout>
        <div className="text-white p-10">Loading...</div>
      </MainLayout>
    );
  }

  if (selectedCareer) {
    return (
      <>
        {selectedCareer && (
          <div className="fixed inset-0 z-[999] bg-[#000807] overflow-y-auto">
            {/* 🔥 OPTIONAL GLOW BACKGROUND */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-cyan-500/10 blur-[140px] rounded-full" />

              <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-emerald-500/10 blur-[140px] rounded-full" />
            </div>

            {/* 🔥 CONTENT */}
            <div className="relative z-10 min-h-screen">
              <CareerOverlayCard
                selectedCareer={selectedCareer}
                handleCareerCardClose={() => setSelectedCareer(null)}
              />
            </div>
          </div>
        )}
      </>
    );
  }

  return (
    <MainLayout>
      <CareerHero />

      {/* 🔥 DOMAIN FILTER */}
      <div className="flex flex-wrap gap-2 mb-8 px-2 max-w-6xl mx-auto justify-start">
        {Object.keys(domainConfig).map((domain) => {
          const isActive = activeDomain === domain;

          return (
            <button
              key={domain}
              onClick={() => {
                setActiveDomain(domain);
                setSearchQuery(""); // 🔥 clear search on domain click
              }}
              className={`
              px-4 py-1.5 rounded-md text-[11px] font-black uppercase tracking-wider
              transition-all duration-300 border
              ${
                isActive
                  ? "bg-[#FFBF00] text-black border-[#FFBF00] shadow-[0_0_15px_rgba(255,191,0,0.4)]"
                  : "bg-[#FFBF00]/5 text-[#FFBF00]/70 border-[#FFBF00]/20 hover:border-[#FFBF00] hover:text-[#FFBF00] backdrop-blur-sm"
              }
            `}
            >
              {domainConfig[domain].title.replace(/^[^\w]+/, "")}
            </button>
          );
        })}
      </div>

      {/* 🔥 SEARCH NOTICE */}
      {isSearching && (
        <div className="max-w-7xl mx-auto px-4 mb-8">
          <div className="relative group inline-flex items-center">
            {/* 1. AMBER GLASS PANEL */}
            <div
              className="relative flex items-center gap-4 px-6 py-2.5 
                    bg-[#FFBF00]/[0.06] backdrop-blur-xl 
                    rounded-tr-2xl rounded-bl-2xl 
                    border-l-2 border-[#FFBF00] 
                    shadow-[20px_0_40px_-20px_rgba(255,191,0,0.2)]"
            >
              {/* 2. SCANNER RADAR PULSE */}
              <div className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#FFBF00] opacity-40"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-[#FFBF00] shadow-[0_0_10px_#FFBF00]"></span>
              </div>

              {/* 3. TEXT CONTENT */}
              <div className="flex flex-col">
                <span className="text-[9px] font-black text-[#FFBF00] uppercase tracking-[0.3em] leading-none mb-1 opacity-80">
                  Total Domain Intelligence
                </span>
                <p className="text-sm font-bold text-white/90 tracking-wide">
                  Showing results across{" "}
                  <span className="text-[#FFBF00] font-black drop-shadow-[0_0_8px_rgba(255,191,0,0.4)]">
                    all available domains
                  </span>
                </p>
              </div>

              {/* 4. HUD DECORATIVE CORNER */}
              <div className="absolute top-0 right-0 w-4 h-4 border-t border-r border-[#FFBF00]/40 rounded-tr-2xl"></div>
            </div>

            {/* 5. BOTTOM GLOW WIRE */}
            <div className="absolute -bottom-[1px] left-0 w-full h-[1px] bg-gradient-to-r from-[#FFBF00] via-[#FFBF00]/20 to-transparent"></div>
          </div>
        </div>
      )}

      {/* 🔥 CARDS */}
      <div className="flex flex-col gap-2 overflow-x-auto pb-4 px-2 scrollbar-hide">
        {/* ❌ NO RESULTS */}
        {isSearching && finalCareers.length === 0 ? (
          <div className="text-center text-gray-500 py-16 text-sm">
            No careers found for
            <span className="text-white font-semibold">"{searchQuery}"</span>
          </div>
        ) : (
          <>
            {/* 🔥 GRID */}
            <div className="columns-1 md:columns-2 lg:columns-3 gap-4 space-y-4 max-w-7xl mx-auto">
              {finalCareers
                .slice(
                  (currentPage - 1) * ITEMS_PER_PAGE,
                  currentPage * ITEMS_PER_PAGE,
                )
                .map((career) => (
                  <div
                    key={career._id}
                    className="break-inside-avoid relative group transition-all duration-500 hover:-translate-y-1"
                  >
                    {/* Glow */}
                    <div className="absolute inset-0 rounded-2xl bg-amber-400/5 opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-700"></div>

                    {/* Card */}
                    <div className="relative bg-[#0a0a0a] backdrop-blur-3xl rounded-2xl p-5 border border-white/5 overflow-hidden shadow-2xl">
                      {/* Background Pattern */}
                      <div
                        className="absolute inset-0 opacity-[0.03]"
                        style={{
                          backgroundImage:
                            "radial-gradient(#FFBF00 1px, transparent 1px)",
                          backgroundSize: "10px 10px",
                        }}
                      ></div>

                      <div className="relative z-10">
                        <h3 className="text-lg font-bold text-white mb-1 group-hover:text-amber-400 transition-colors">
                          {career.title}
                        </h3>

                        <p className="text-[10px] uppercase text-gray-500 font-black tracking-widest mb-4">
                          Est. {career.salary.average}
                        </p>

                        <div className="flex items-center justify-between gap-3 mt-2">
                          <button
                            onClick={() => navigate(`/career/${career._id}`)}
                            className="text-[9px] font-bold text-gray-400 hover:text-amber-400 uppercase tracking-widest relative group/btn"
                          >
                            Explore Path
                            <div className="absolute -bottom-1 left-0 w-0 h-[1px] bg-amber-400 group-hover/btn:w-full transition-all duration-300"></div>
                          </button>

                          <button
                            onClick={() => setSelectedCareer(career)}
                            className="px-4 py-2 rounded-md bg-[#FFBF00] text-black font-black text-[10px] uppercase tracking-tighter hover:shadow-[0_0_15px_rgba(255,191,0,0.5)] transition-all"
                          >
                            View Details
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
            </div>

            {/* 🔥 PAGINATION */}
            <div className="flex w-full items-center justify-between max-w-7xl mx-auto px-6 py-4 bg-black/25 border-t border-white/5">
              {/* Status */}
              <div className="text-gray-500 text-xs font-medium">
                <span className="text-white">
                  {Math.min(currentPage * ITEMS_PER_PAGE, finalCareers.length) } {" "}
                </span>
                of {" "}
                <span className="text-white">{finalCareers.length} {" "}</span>
                careers
              </div>

              {/* Controls */}
              <div className="flex items-center gap-2">
                {/* Page Numbers */}
                <div className="hidden md:flex items-center gap-1.5 mr-4">
                  {[
                    ...Array(Math.ceil(finalCareers.length / ITEMS_PER_PAGE)),
                  ].map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setCurrentPage(i + 1)}
                      className={`w-8 h-8 rounded-md text-xs font-bold transition-all ${
                        currentPage === i + 1
                          ? "bg-[#FFBF00] text-black shadow-[0_0_10px_rgba(255,191,0,0.3)]"
                          : "bg-white/5 text-gray-400 hover:bg-white/10"
                      }`}
                    >
                      {i + 1}
                    </button>
                  ))}
                </div>

                {/* Prev */}
                <button
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage((prev) => prev - 1)}
                  className="px-4 py-2 rounded-md bg-white/5 border border-white/10 text-gray-500 text-xs font-bold hover:bg-white/10 disabled:opacity-30 disabled:cursor-not-allowed"
                >
                  Prev
                </button>

                {/* Next */}
                <button
                  disabled={currentPage * ITEMS_PER_PAGE >= finalCareers.length}
                  onClick={() => setCurrentPage((prev) => prev + 1)}
                  className="px-4 py-2 rounded-md bg-[#FFBF00] text-black text-xs font-black uppercase hover:shadow-[0_0_15px_rgba(255,191,0,0.4)] disabled:opacity-30"
                >
                  Next
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </MainLayout>
  );
};

export default CareersHome;

import { Menu, Search, User } from "lucide-react";
import { useEffect, useState, useRef } from "react";
import { useSearch } from "../../context/SearchContext";
import { useAuth } from "../../context/AuthContext";
import AuthModal from "../Authentication/AuthModal";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
// useNavigate
// import { useLocation } from "react-router-dom";
// const navigate = useNavigate();

const Header = ({ setIsMobileOpen }) => {

  const navigate = useNavigate();
  const { user, loading, setUser } = useAuth();
  const { searchQuery, setSearchQuery } = useSearch();

  const [isScrolled, setIsScrolled] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const menuRef = useRef(null);
  // const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <>
      <header
        className={`fixed top-0 z-50 w-full px-4 md:px-8 py-4 flex items-center justify-even transition-all duration-300 
        ${
          isScrolled
            ? "bg-white/5 backdrop-blur-xl border-b border-white/10 shadow-[0_10px_30px_-10px_rgba(0,0,0,0.6)]"
            : "bg-transparent"
        }`}
      >
        {/* MOBILE MENU */}
        <button
          onClick={() => setIsMobileOpen(true)}
          className="md:hidden text-slate-400 mr-4"
        >
          <Menu size={24} />
        </button>

        {/* RIGHT SIDE (AUTH / PROFILE) */}
        <div ref={menuRef} className="relative">

  {loading ? (
    <div className="hidden md:block w-8 h-8 border-2 border-cyan-400 border-t-transparent rounded-full animate-spin"></div>

  ) : user ? (
    <>
      {/* 🔹 DESKTOP PROFILE */}
      <div
        onClick={(e) => {
          e.stopPropagation();
          setShowMenu((prev) => !prev);
        }}
        className="hidden md:flex items-center gap-4 mr-4 cursor-pointer"
      >
        <div className="flex flex-col items-end text-right">
          <span className="text-sm font-medium text-white">
            {user?.name}
          </span>
          <span className="text-[10px] text-slate-500">
            @{user?.identifier || "verified"}
          </span>
        </div>

        <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-[#00FFD1] to-teal-400 p-[2px]">
          <div className="w-full h-full rounded-full bg-black overflow-hidden border-2 border-black">
            <img src={user?.avatar} alt="profile" />
          </div>
        </div>
      </div>

      {/* 🔹 MOBILE PROFILE (ONLY AVATAR) */}
      <div
        onClick={(e) => {
          e.stopPropagation();
          setShowMenu((prev) => !prev);
        }}
        className="md:hidden flex items-center mr-2 cursor-pointer"
      >
        <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-[#00FFD1] to-teal-400 p-[2px]">
          <div className="w-full h-full rounded-full bg-black overflow-hidden border-2 border-black">
            <img src={user?.avatar} alt="profile" />
          </div>
        </div>
      </div>

      {/* DROPDOWN (COMMON) */}
      {showMenu && (
          <div className="
            fixed md:absolute
            top-20 md:top-14

            left-1/2 md:left-auto
            md:right-0

            -translate-x-1/2 md:translate-x-0

            w-[90vw] md:w-56
            max-w-xs

            bg-[#0a0a0a]/90 backdrop-blur-2xl
            border border-white/10 rounded-2xl
            shadow-[0_20px_50px_rgba(0,0,0,0.5)]
            p-2 z-[999] overflow-hidden
          ">                    
            <div className="px-4 py-3 mb-2 border-b border-white/5">
                        <p className="text-[10px] font-black text-cyan-400 uppercase tracking-widest opacity-70">
                          Authenticated
                        </p>
                        <p className="text-sm font-bold text-white truncate">
                          {user?.name || "Explorer"}
                        </p>
                      </div>

                      {/* MENU ITEMS */}
                      <div className="flex flex-col gap-1">
                        <button className="group flex items-center gap-3 px-4 py-2.5 rounded-xl text-gray-400 hover:text-white hover:bg-white/5 transition-all duration-300">
                          <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center group-hover:bg-cyan-400/10 group-hover:text-cyan-400 transition-colors">
                            <svg
                              className="w-4 h-4"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                              />
                            </svg>
                          </div>
                          <span className="text-sm font-medium">
                            Profile Details
                          </span>
                        </button>

                        <button className="group flex items-center gap-3 px-4 py-2.5 rounded-xl text-gray-400 hover:text-white hover:bg-white/5 transition-all duration-300">
                          <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center group-hover:bg-cyan-400/10 group-hover:text-cyan-400 transition-colors">
                            <svg
                              className="w-4 h-4"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                              />
                            </svg>
                          </div>
                          <button onClick={() => navigate("/maps")} className="text-sm font-medium">
                            Saved Paths
                          </button>
                        </button>

                        {/* SEPARATOR */}
                        <div className="h-[1px] bg-white/5 my-1 mx-2"></div>

                        {/* LOGOUT BUTTON */}
                        <button
                          onClick={() => {
                            localStorage.removeItem("token");
                            localStorage.removeItem("user");
                            setUser(null);
                            setShowMenu(false);

                            navigate("/"); // ✅ smooth navigation
                          }}
                          className="group flex items-center gap-3 px-4 py-3 rounded-xl text-red-400/70 hover:text-red-400 hover:bg-red-400/5 transition-all duration-300"
                        >
                          <div className="w-8 h-8 rounded-lg bg-red-400/5 flex items-center justify-center group-hover:bg-red-400/20 transition-colors">
                            <svg
                              className="w-4 h-4"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                              />
                            </svg>
                          </div>
                          <span className="text-sm font-bold tracking-wide">
                            Disconnect
                          </span>
                        </button>
                      </div>

                      {/* BOTTOM ACCENT */}
                      <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
                    </div>
                  )}
    </>
  ) : (
    <>
      {/* 🔹 DESKTOP SIGN IN */}
      <motion.button
        onClick={() => setIsAuthOpen(true)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="hidden md:flex items-center gap-2 px-5 py-2 bg-white text-black text-[10px] font-black uppercase rounded-md"
      >
        <User size={12} />
        <span>Sign In</span>
      </motion.button>

      {/* 🔹 MOBILE SIGN IN ICON ONLY */}
      <button
        onClick={() => setIsAuthOpen(true)}
        className="md:hidden flex items-center justify-center w-9 h-9 rounded-full bg-white text-black"
      >
        <User size={16} />
      </button>
    </>
  )}

</div>

        {/* SEARCH */}
        <div className="flex-1 max-w-xl mx-4">
          <div className="relative group">
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-cyan-400 transition-colors"
              size={18}
            />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search courses or roadmaps..."
              className="w-full bg-white/5 border border-white/10 rounded-full py-2 pl-10 pr-4 focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/50 transition-all text-sm"
            />
          </div>
        </div>
      </header>

      {/* 🔥 AUTH MODAL */}
      <AuthModal isOpen={isAuthOpen} onClose={() => setIsAuthOpen(false)} />
    </>
  );
};

export default Header;

import React, { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { User, Menu, X } from "lucide-react";
import AuthModal from "../Authentication/AuthModal";
import { useNavigate } from "react-router-dom";

const HomeHeader = ({ onAuthOpen, user, loading, setUser }) => {

  const navigate = useNavigate();

  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
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

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Courses", href: "/explore" },
    { name: "Careers", href: "/careers" },
    { name: "About", href: "/about" },
  ];


  return (
    <>
      {/* HEADER */}
      <header
        className={`
          fixed top-0 left-0 w-full z-[100] h-20 transition-all duration-500
          ${
            scrolled
              ? "bg-white/5 backdrop-blur-xl border-b border-white/10 shadow-[0_10px_30px_-10px_rgba(0,0,0,0.6)]"
              : "bg-transparent"
          }
        `}
      >
        <nav className="max-w-7xl mx-auto px-6 h-full flex items-center justify-between">
          {/* LEFT */}
          <div className="flex items-center gap-6">
            {/* LOGO */}

            <div className="flex items-center cursor-pointer">
              <img
                src="/assets/marga_veda_name.png"
                alt="Marga Darshika Logo"
                className="w-auto h-[170px] object-contain"
              />
            </div>

            {/* DESKTOP NAV */}
          </div>

          {/* RIGHT */}
          <div className="flex items-center gap-4">
            <div className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => (
                <motion.a
                  key={link.name}
                  href={link.href}
                  whileHover={{ y: -1 }}
                  className="text-[10px] font-black uppercase tracking-[0.3em] text-white/40 hover:text-cyan-400 transition-all"
                >
                  {link.name}
                </motion.a>
              ))}
            </div>

            {/* SIGN IN (HIDE ON SMALL) */}
            <div ref={menuRef} className="relative">
              {loading ? (
                <div className="hidden md:block w-8 h-8 border-2 border-cyan-400 border-t-transparent rounded-full animate-spin"></div>
              ) : user ? (
                <>
                  {/* PROFILE (CLICKABLE) */}
                  <div
                    onClick={() => setShowMenu((prev) => !prev)}
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

                  {/* 🔥 DROPDOWN (ONLY IF USER EXISTS) */}
                  {showMenu && (
                    <div className="absolute right-0 top-14 w-56 bg-[#0a0a0a]/90 backdrop-blur-2xl border border-white/10 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] p-2 z-50 overflow-hidden">
                      {/* HEADER SECTION - User Info (Optional but looks premium) */}
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

                            navigate("/");
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
                // ✅ ONLY SIGN IN (NO DROPDOWN AT ALL)
                <motion.button
                  onClick={() => setIsAuthOpen(true)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="hidden md:flex items-center gap-2 px-5 py-2 bg-white text-black text-[10px] font-black uppercase rounded-md"
                >
                  <User size={12} />
                  <span>Sign In</span>
                </motion.button>
              )}
            </div>

            {/* SIGN IN (HIDE ON SMALL) */}

            {/* HAMBURGER (MOBILE) */}
            <button
              onClick={() => setMenuOpen(true)}
              className="md:hidden text-white"
            >
              <Menu size={24} />
            </button>
          </div>
        </nav>
      </header>

      {/* MOBILE SIDEBAR */}
      <AnimatePresence>
        {menuOpen && (
          <>
            {/* OVERLAY */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMenuOpen(false)}
              className="fixed inset-0 bg-black/60 z-[90]"
            />

            {/* SIDEBAR */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "tween" }}
              className="fixed top-0 right-0 h-full w-[75%] bg-white/[0.05] backdrop-blur-2xl border-l border-white/10 shadow-[-10px_0_40px_rgba(0,0,0,0.6)] z-[100] p-6 flex flex-col"
            >
              {/* TOP BAR */}
              <div className="flex items-center justify-between mb-10">
                <span className="text-white font-bold text-lg">Menu</span>

                <button onClick={() => setMenuOpen(false)}>
                  <X size={24} className="text-white" />
                </button>
              </div>

              {/* NAV LINKS */}
              <div className="flex flex-col gap-6">
                {navLinks.map((link) => (
                  <a
                    key={link.name}
                    href={link.href}
                    onClick={() => setMenuOpen(false)}
                    className="text-white text-sm font-bold uppercase tracking-wider hover:text-cyan-400 transition"
                  >
                    {link.name}
                  </a>
                ))}
              </div>

              {/* SIGN IN */}

              {/* AUTH SECTION (BOTTOM) */}
              <div className="mt-auto">
                {loading ? (
                  // 🔥 LOADER
                  <div className="flex justify-center">
                    <div className="w-8 h-8 border-2 border-cyan-400 border-t-transparent rounded-full animate-spin"></div>
                  </div>
                ) : user ? (
                  <div className="flex flex-col gap-2 w-full max-w-[280px]">
                    {/* --- INTEGRATED PROFILE & MENU CONTAINER --- */}
                    <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden shadow-2xl backdrop-blur-xl">
                      {/* 1. TOP PROFILE SECTION */}
                      <div className="p-4 flex items-center gap-4 border-b border-white/5 bg-gradient-to-b from-white/[0.02] to-transparent">
                        <div className="relative">
                          <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-[#00FFD1] to-teal-400 p-[2px] shadow-[0_0_15px_rgba(0,255,209,0.2)]">
                            <div className="w-full h-full rounded-full bg-black overflow-hidden border-2 border-black">
                              <img
                                src={user?.avatar}
                                alt="Identity"
                                className="w-full h-full object-cover"
                              />
                            </div>
                          </div>
                          {/* Online Indicator */}
                          <div className="absolute bottom-0 right-0 w-3 h-3 bg-[#00FFD1] rounded-full border-2 border-[#0a0a0a] shadow-[0_0_10px_#00FFD1]"></div>
                        </div>

                        <div className="flex flex-col min-w-0">
                          <span className="text-sm font-black text-white truncate tracking-tight uppercase">
                            {user?.name}
                          </span>
                          <span className="text-[10px] text-cyan-400/70 font-bold uppercase tracking-widest">
                            {user?.identifier || "Verified Voyager"}
                          </span>
                        </div>
                      </div>

                      {/* 2. MENU ACTIONS SECTION (Directly Visible) */}
                      <div className="p-2 flex flex-col gap-1">
                        <button className="group flex items-center gap-3 px-3 py-2 rounded-xl text-gray-400 hover:text-white hover:bg-white/5 transition-all">
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
                          <span className="text-xs font-bold uppercase tracking-wider">
                            Profile Details
                          </span>
                        </button>

                        <button className="group flex items-center gap-3 px-3 py-2 rounded-xl text-gray-400 hover:text-white hover:bg-white/5 transition-all">
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
                          <button onClick={() => navigate("/maps")} className="text-xs font-bold uppercase tracking-wider">
                            Saved Paths
                          </button>
                        </button>

                        {/* 3. LOGOUT (Always Visible at Bottom) */}
                        <button
                          onClick={() => {
                            localStorage.removeItem("token");
                            localStorage.removeItem("user");
                            setUser(null);
                            setShowMenu(false);

                            navigate("/");
                          }}
                          className="group flex items-center gap-3 px-3 py-3 mt-1 rounded-xl bg-red-500/5 text-red-400/70 hover:text-red-400 hover:bg-red-500/10 transition-all"
                        >
                          <div className="w-8 h-8 rounded-lg bg-red-400/10 flex items-center justify-center group-hover:bg-red-400/20 transition-colors">
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
                          <span className="text-xs font-black uppercase tracking-widest">
                            Disconnect
                          </span>
                        </button>
                      </div>

                      {/* BOTTOM HOLOGRAPHIC ACCENT */}
                      <div className="h-[2px] w-full bg-gradient-to-r from-transparent via-cyan-400/40 to-transparent"></div>
                    </div>
                  </div>
                ) : (
                  // ❌ SIGN IN
                  <button
                    onClick={() => {
                      setMenuOpen(false); // close sidebar
                      setIsAuthOpen(true); // open modal
                    }}
                    className="w-full flex items-center justify-center gap-2 px-5 py-3 bg-white text-black text-sm font-bold uppercase rounded-md"
                  >
                    <User size={16} />
                    Sign In
                  </button>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <AuthModal isOpen={isAuthOpen} onClose={() => setIsAuthOpen(false)} />

      {/* {showMenu && (
        <div className="absolute top-14 right-0 w-48 bg-[#0a0a0a] border border-white/10 rounded-xl shadow-lg p-3 flex flex-col gap-2 z-50">
          <button className="text-left text-sm text-white hover:text-cyan-400">
            Profile
          </button>

          <button
            onClick={() => {
              localStorage.removeItem("token");
              setUser(null);
            }}
            className="text-left text-sm text-red-400 hover:text-red-300"
          >
            Logout
          </button>
        </div>
      )} */}
    </>
  );
};

export default HomeHeader;
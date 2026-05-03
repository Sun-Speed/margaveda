import {
  LayoutGrid,
  BookOpen,
  GraduationCap,
  Compass,
  Settings,
  Briefcase,
  Map,
  Home,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";


const Sidebar = ({
  isExpanded,
  setExpanded,
  isMobileOpen,
  setIsMobileOpen,
}) => {
  const navItems = [
    { icon: Home, label: "Home", path: "/" },
    { icon: BookOpen, label: "Explore Courses", path: "/explore" },
    { icon: Briefcase, label: "Explore Careers", path: "/careers" },
    // { icon: GraduationCap, label: "Certifications", path: "/certs" },
    { icon: Map, label: "My Map", path: "/maps" },
    // { icon: Settings, label: "Settings", path: "/settings" },
  ];

  // We add a 'forceExpand' parameter to show labels on mobile regardless of hover state
  const renderSidebarContent = (forceExpand = false) => {
    const showLabels = forceExpand || isExpanded;

    return (
      <div
        onMouseEnter={() => !forceExpand && setExpanded(true)}
        onMouseLeave={() => !forceExpand && setExpanded(false)}
        className={`h-full  backdrop-blur-xl border-r border-white/5 flex flex-col py-6 transition-all duration-300 ${showLabels ? "w-64" : "w-20"}`}
      >
        <div className="ml-3 mb-10 flex items-center overflow-hidden">
          <div className="relative group">
            <div className="relative group flex items-center justify-center">
              <img
                src="/assets/marga_darshika_hero.png"
                alt="Marga Darshika Small Logo"
                className="w-[52px] h-[52px] lg:w-[50px] lg:h-[50px] object-contain transition-all duration-500 group-hover:scale-110 drop-shadow-md"
              />
            </div>
          </div>
          {showLabels && (
            <div className="flex items-center cursor-pointer">
              <img
                src="/assets/marga_veda_name.png"
                alt="Marga Darshika Logo"
                className="w-auto h-[150px] object-contain"
              />
            </div>
          )}
        </div>

        <nav className="flex-1 space-y-2 px-3">
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.path}
              className="flex items-center gap-4 p-3 rounded-xl hover:bg-white/5 text-slate-400 hover:text-[#00D4AA] transition-colors group"
            >
              <item.icon size={24} strokeWidth={1.5} />
              {showLabels && (
                <motion.span
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="font-medium whitespace-nowrap text-sm"
                >
                  {item.label}
                </motion.span>
              )}
            </a>
          ))}
        </nav>
      </div>
    );
  };

  return (
    <>
      {/* Laptop View: Hover to expand */}
      <aside className="fixed left-0 top-0 h-full z-50 hidden md:block">
        {renderSidebarContent(false)}
      </aside>

      {/* Mobile View: Always expanded when open */}
      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            initial={{ x: -300 }}
            animate={{ x: 0 }}
            exit={{ x: -300 }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-[60] md:hidden"
          >
            {/* Overlay */}
            <div
              className="absolute inset-0 bg-black/80 backdrop-blur-sm"
              onClick={() => setIsMobileOpen(false)}
            />

            {/* Sidebar Content */}
            <div className="relative w-64 h-full shadow-2xl">
              {renderSidebarContent(true)} {/* forceExpand = true */}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Sidebar;

import { useState } from "react";
import Sidebar from "./Sidebar";
import Header from "./CommonHeader";
import Footer from "./Footer";

export default function MainLayout({ children }) {
  const [isSidebarExpanded, setSidebarExpanded] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="relative min-h-screen text-slate-200 overflow-hidden">

      {/* 🔥 GLOBAL BACKGROUND */}
      <div className="fixed inset-0 z-0 bg-[#030507]">

        {/* GRID */}
        <div
          className="absolute inset-0 opacity-[0.15]"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, #22d3ee 1px, transparent 0)`,
            backgroundSize: '40px 40px'
          }}
        />

        {/* GLOW BLOBS */}
        <div className="absolute top-[-20%] left-[-10%] w-[800px] h-[800px] bg-cyan-500/5 blur-[120px] rounded-full" />

        <div className="absolute bottom-[-20%] right-[-10%] w-[800px] h-[800px] bg-amber-500/5 blur-[120px] rounded-full" />
      </div>

      {/* 🔥 CONTENT LAYER */}
      <div className="relative z-10">

        <Sidebar 
          isExpanded={isSidebarExpanded}
          setExpanded={setSidebarExpanded}
          isMobileOpen={isMobileMenuOpen}
          setIsMobileOpen={setIsMobileMenuOpen}
        />

        <div className={`transition-all duration-300 ${isSidebarExpanded ? 'md:ml-64' : 'md:ml-20'}`}>
          
          <Header setIsMobileOpen={setIsMobileMenuOpen} />

          <main className="p-4 md:p-8 space-y-12">
            {children}
          </main>

          <Footer/>

        </div>

      </div>
    </div>
  );
}

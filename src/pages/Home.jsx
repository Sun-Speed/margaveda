import { useEffect, useState } from "react";
import NexusHeroUpdated from "../components/home/HomeHeroSection";
import HomeHeader from "../components/home/HomeHeader";
import NextSections from "../components/home/HomeSections";
import AuthModal from "../components/Authentication/AuthModal";
import { useAuth } from "../context/AuthContext";
import Footer from "../components/layout/Footer";


export default function Home() {

  const { user, setUser, loading } = useAuth();

  const [isAuthOpen, setIsAuthOpen] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  return (
    <div className="relative bg-[#030507] text-white min-h-screen">

      {/* BACKGROUND */}
      <div className="fixed inset-0 z-0">
        <div 
          className="absolute inset-0 opacity-[0.15]"
          style={{ 
            backgroundImage: `radial-gradient(circle at 1px 1px, #22d3ee 1px, transparent 0)`,
            backgroundSize: '40px 40px' 
          }} 
        />
        <div className="absolute top-[-20%] left-[-10%] w-[800px] h-[800px] bg-cyan-500/5 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[800px] h-[800px] bg-amber-500/5 blur-[120px] rounded-full" />
      </div>

      {/* CONTENT */}
      <div className="relative z-10">

        {/* HEADER */}
        <HomeHeader onAuthOpen={() => setIsAuthOpen(true)} user={user} loading={loading} setUser={setUser}/>

        {/* MODAL */}
        <AuthModal 
          isOpen={isAuthOpen} 
          onClose={() => setIsAuthOpen(false)} 
          // onAuthSuccess={(userData) => setUser(userData)} // 🔥 update global user
        />

        {/* HERO */}
        <NexusHeroUpdated />

        <NextSections />

        < Footer />

      </div>

    </div>
  );
}
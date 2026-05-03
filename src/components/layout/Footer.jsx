import { motion } from "framer-motion";
import { Sparkles, Compass, ShieldCheck, Cpu, Mail } from "lucide-react";
// --- REACT ICONS IMPORT ---
import { SiX } from "react-icons/si";
import { IoLogoGithub } from "react-icons/io";
import { FaLinkedin } from "react-icons/fa";
import { IoLogoInstagram } from "react-icons/io5";
import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function Footer() {

  const [feedback, setFeedback] = useState("");
  const [loading, setLoading] = useState(false);

  const socialLinks = [
    { icon: <SiX />, href: "#", color: "hover:text-white" },
    { icon: <IoLogoGithub />, href: "https://github.com/Sun-Speed", color: "hover:text-slate-300" },
    { icon: <FaLinkedin />, href: "https://www.linkedin.com/in/sunspeed/", color: "hover:text-blue-400" },
    { icon: <IoLogoInstagram />, href: "#", color: "hover:text-pink-500" },
  ];

  const handleFeedback = async () => {

  if (!feedback.trim()) {
    return alert("Please enter feedback");
  }

  try {

    setLoading(true);

    const response = await axios.post(

      "http://localhost:5000/api/auth/submit",

      {
        message: feedback,
      }

    );

    alert(response.data.message);

    setFeedback("");

  } catch (error) {

    console.log(error);

    alert("Failed to send feedback");

  } finally {

    setLoading(false);

  }

};

  return (
    <footer className="relative overflow-hidden border-t border-white/10 bg-black text-white font-sans">
      {/* 🔮 Cosmic Atmosphere */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_20%_20%,rgba(0,255,255,0.08),transparent_40%),radial-gradient(circle_at_80%_80%,rgba(168,85,247,0.08),transparent_40%)]" />
        {/* Subtle Scanline Effect */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.03),rgba(0,255,0,0.01),rgba(0,0,255,0.03))] bg-[size:100%_4px,3px_100%] pointer-events-none" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-10 pt-14 pb-4">
        {/* TOP SECTION: BRAND & DIRECTORY */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 mb-4">
          <div className="lg:col-span-5 space-y-10">
            {/* STATUS BADGE */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="group relative flex items-center gap-2 px-4 py-2 rounded-full border border-cyan-400/20 bg-cyan-400/10 backdrop-blur-xl text-cyan-300 text-[10px] uppercase tracking-[0.35em] font-black w-fit overflow-hidden"
            >
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition bg-cyan-400/10" />

              <Sparkles size={12} className="animate-pulse relative z-10" />

              <span className="relative z-10">Career Intelligence System</span>
            </motion.div>

            {/* LOGO + TEXT */}
            <div className="space-y-6">
              {/* LOGO */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.7 }}
                className="relative w-fit"
              >
                {/* Glow */}
                <div className="absolute inset-0 bg-cyan-400/20 blur-3xl scale-125 rounded-full" />

                {/* Logo */}
                <img
                  src="/assets/marga_veda_name.png"
                  alt="Margadarshika"
                  className="relative z-10 w-[190px] md:w-[280px] object-contain drop-shadow-[0_0_45px_rgba(34,211,238,0.35)] hover:scale-[1.02] transition-transform duration-500"
                />
              </motion.div>

              {/* DESCRIPTION */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-slate-400 text-sm md:text-base leading-relaxed max-w-md font-medium"
              >
                Designing intelligent career trajectories for the next
                generation. Explore domains, evolve skills, and navigate the
                future with precision.
              </motion.p>
            </div>
            

            {/* SOCIALS */}
            <div className="flex items-center gap-4">
              {socialLinks.map((social, i) => (
                <motion.a
                  key={i}
                  href={social.href}
                  whileHover={{
                    y: -6,
                    scale: 1.08,
                  }}
                  whileTap={{ scale: 0.95 }}
                  className={` group relative p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xl overflow-hidden transition-all duration-300 hover:border-cyan-400/30 hover:bg-cyan-400/10`}
                >
                  {/* Hover Glow */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition bg-gradient-to-br from-cyan-400/10 to-purple-500/10" />

                  <div className="relative z-10 text-lg text-slate-300 group-hover:text-white transition">
                    {social.icon}
                  </div>
                </motion.a>
              ))}
            </div>
          </div>

          

          {/* SITEMAP DIRECTORY */}
          <div className="lg:col-span-7 flex flex-col justify-between gap-12">

  {/* TOP LINKS */}
  <div className="grid grid-cols-2 md:grid-cols-3 gap-12">

    {[
  {
    title: "Platform",

    links: [
      {
        label: "Career Roadmaps",
        path: "/careers",
      },

      {
        label: "Skill Graph",
        path: "/maps",
      },

      {
        label: "Job Protocols",
        path: "#",
      },

      {
        label: "Verified Nodes",
        path: "#",
      },
    ],
  },

  {
    title: "Resources",

    links: [
      {
        label: "Documentation",
        path: "/docs",
      },

      {
        label: "API Reference",
        path: "/docs",
      },

      {
        label: "System Status",
        path: "#",
      },

      {
        label: "Open Source",
        path: "#",
      },
    ],
  },

  {
    title: "Company",

    links: [
      {
        label: "Our Vision",
        path: "/about",
      },

      {
        label: "Careers",
        path: "/careers",
      },

      {
        label: "Legal Archive",
        path: "#",
      },

      {
        label: "Security",
        path: "#",
      },
    ],
  },
].map((section, idx) => (

  <div key={idx} className="space-y-6">

    <h4 className="
      text-[10px]
      font-black
      uppercase
      tracking-[0.4em]
      text-slate-500
      border-l-2
      border-cyan-500
      pl-3
    ">
      {section.title}
    </h4>

    <ul className="
      space-y-3
      text-[13px]
      text-slate-400
      font-semibold
    ">

      {section.links.map((link) => (

        <li key={link.label}>

          <Link
            to={link.path}

            className="
              hover:text-cyan-400
              transition-colors
              flex
              items-center
              group
            "
          >

            <span className="
              w-0
              group-hover:w-2
              h-[1px]
              bg-cyan-400
              mr-0
              group-hover:mr-2
              transition-all
              duration-300
            " />

            {link.label}

          </Link>

        </li>

      ))}

    </ul>

  </div>

))}

  </div>

  {/* FEEDBACK SECTION */}
  <div className=" rounded-3xl border border-cyan-500/10 bg-white/[0.03] backdrop-blur-2xl p-6 space-y-5">

    <div>

      <h3 className="
        text-xl
        font-black
        text-white
      ">
        Feedback Loop
      </h3>

      <p className=" text-slate-500 text-sm mt-1">
        Help us improve your guidance experience.
      </p>

    </div>

    <textarea
      value={feedback}
      onChange={(e) =>
        setFeedback(e.target.value)
      }
      placeholder="Share your thoughts..."
      className=" w-full h-32 rounded-2xl bg-black/40 border border-white/10 p-4 text-sm text-slate-300 placeholder:text-slate-600 outline-none resize-none focus:border-cyan-400/40 transition-all"
    />

    <button

  onClick={handleFeedback}

  disabled={loading}

  className="
    px-5
    py-3
    rounded-xl
    bg-gradient-to-r
    from-cyan-400
    to-amber-400
    text-black
    font-bold
    text-sm
    hover:scale-[1.02]
    transition-all
    disabled:opacity-50
  "
>

  {loading
    ? "Sending..."
    : "Send Feedback"}

</button>

  </div>

</div>
        </div>

        {/* DATA METRICS STRIP */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          <div className="p-[1px] rounded-2xl bg-gradient-to-r from-white/10 to-transparent">
            <div className="bg-[#050505] rounded-2xl p-6 flex items-center justify-between">
              <div>
                <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mb-1">
                  Career Tracks
                </p>
                <p className="text-2xl font-black italic text-white">150+</p>
              </div>
              <Compass className="text-cyan-500/50" size={24} />
            </div>
          </div>
          <div className="p-[1px] rounded-2xl bg-gradient-to-r from-white/10 to-transparent">
            <div className="bg-[#050505] rounded-2xl p-6 flex items-center justify-between">
              <div>
                <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mb-1">
                  Total Nodes
                </p>
                <p className="text-2xl font-black italic text-white">512</p>
              </div>
              <Cpu className="text-emerald-500/50" size={24} />
            </div>
          </div>
          <div className="p-[1px] rounded-2xl bg-gradient-to-r from-white/10 to-transparent">
            <div className="bg-[#050505] rounded-2xl p-6 flex items-center justify-between">
              <div>
                <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mb-1">
                  Uptime
                </p>
                <p className="text-2xl font-black italic text-emerald-400">
                  99.9%
                </p>
              </div>
              <ShieldCheck className="text-purple-500/50" size={24} />
            </div>
          </div>
        </div>

        {/* FINAL FOOTNOTE */}
        <div className="pt-10 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex flex-col gap-1 text-center md:text-left">
            <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500">
              © 2026 Margaveda Intelligence • All Systems Operational
            </p>
            <p className="text-[9px] text-slate-700 font-bold uppercase tracking-widest">
              Encrypted Career Data Protocol • build_v3.0.4
            </p>
          </div>

          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2 px-3 py-1 rounded-md bg-emerald-500/5 border border-emerald-500/20">
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-[9px] font-bold text-emerald-500 uppercase tracking-tighter">
                Network: Healthy
              </span>
            </div>
            <div className="flex gap-4 text-[10px] font-bold text-slate-500 uppercase tracking-widest">
              <a href="#" className="hover:text-white transition-colors">
                Privacy
              </a>
              <a href="#" className="hover:text-white transition-colors">
                Terms
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

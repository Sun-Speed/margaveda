import React from 'react';
import { motion } from 'framer-motion';
import { BookOpen, School, Briefcase } from 'lucide-react';

const MargaLoader = () => {
  const icons = [
    { Icon: BookOpen, label: "Course", color: "text-cyan-400" },
    { Icon: School, label: "College", color: "text-emerald-400" },
    { Icon: Briefcase, label: "Career", color: "text-cyan-400" },
  ];

  return (
    <div className="flex h-64 w-full flex-col items-center justify-center space-y-8">
      <div className="relative flex items-center justify-between w-64">
        {/* Connecting Path Background */}
        <div className="absolute top-1/2 left-0 h-[2px] w-full -translate-y-1/2 bg-white/10" />
        
        {/* Animated Glowing Path */}
        <motion.div 
          className="absolute top-1/2 left-0 h-[2px] bg-gradient-to-r from-cyan-500 to-emerald-500 shadow-[0_0_15px_rgba(6,182,212,0.5)]"
          initial={{ width: "0%" }}
          animate={{ width: "100%" }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        />

        {icons.map((item, index) => (
          <motion.div
            key={index}
            initial={{ scale: 0.8, opacity: 0.5 }}
            animate={{ 
              scale: [0.8, 1.2, 0.8],
              opacity: [0.5, 1, 0.5],
              boxShadow: ["0 0 0px rgba(34,211,238,0)", "0 0 20px rgba(34,211,238,0.4)", "0 0 0px rgba(34,211,238,0)"]
            }}
            transition={{ 
              duration: 2, 
              repeat: Infinity, 
              delay: index * 0.4,
              ease: "easeInOut" 
            }}
            className="relative z-10 flex h-14 w-14 items-center justify-center rounded-2xl border border-white/20 bg-white/5 backdrop-blur-xl"
          >
            <item.Icon className={`h-6 w-6 ${item.color}`} />
          </motion.div>
        ))}
      </div>

      {/* Loading Text */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 1, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="text-sm font-medium tracking-widest text-cyan-200/70 uppercase"
      >
        Mapping your future...
      </motion.div>
    </div>
  );
};

export default MargaLoader;
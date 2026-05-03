// // components/maps/CourseNode.jsx
// const CourseNode = ({ data, careers }) => {
//   if (!data) return null;

//   // console.log("sirrrrrrr", data);

//   return (
//     <div className="relative flex flex-col items-center group">
      
//       {/* Line */}
//       <div className="absolute top-0 w-px h-full bg-gradient-to-b from-[#00FFD1]/50 to-transparent -z-10" />

//       {/* Card */}
//       <div className="w-full max-w-2xl bg-[#0A0A0A] border border-white/10 rounded-2xl p-6 md:p-8 relative hover:border-[#00FFD1]/40 transition-all duration-500">
        
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

//           {/* LEFT */}
//           <div className="space-y-4">
            
//             {/* Level */}
//             <span className="px-3 py-1 bg-[#00FFD1]/10 text-[#00FFD1] text-[10px] font-bold rounded-full border border-[#00FFD1]/20">
//               {data.level || "Course"}
//             </span>

//             {/* Name */}
//             <h2 className="text-xl md:text-2xl font-black text-white tracking-tight">
//               {data.title}
//             </h2>

//             {/* Description */}
//             <p className="text-xs text-slate-400 leading-relaxed">
//               {data.description || "No description available"}
//             </p>

//             {/* Button */}
//             <div className="pt-3 flex gap-3">
//               <button className="px-5 py-2 bg-[#00FFD1]/5 border border-[#00FFD1]/20 rounded-lg text-[#00FFD1] text-[10px] font-black uppercase tracking-widest hover:bg-[#00FFD1]/10">
//                 View Details
//               </button>
//             </div>
//           </div>

//           {/* RIGHT */}
//           <div className="space-y-5">

//             {/* Colleges */}
//             <div>
//               <h4 className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2">
//                 Top Colleges
//               </h4>

//               <div className="flex flex-wrap gap-2">
//                 {(data.topColleges || []).slice(0, 5).map((clg, i) => (
//                   <span
//                     key={i}
//                     className="text-[10px] text-white/70 bg-white/5 border border-white/10 px-2 py-1 rounded-md"
//                   >
//                     {clg}
//                   </span>
//                 ))}
//               </div>
//             </div>

//             {/* Careers */}
//             <div>
//               <h4 className="text-[10px] font-bold text-cyan-400 uppercase tracking-widest mb-2">
//                 Career Options
//               </h4>

//               <ul className="space-y-1">
//                 {(data.futureScope || []).slice(0, 5).map((job, i) => (
//                   <li key={i} className="flex items-center gap-2 text-xs text-slate-300">
//                     <div className="w-1 h-1 rounded-full bg-[#00FFD1]" />
//                     {job}
//                   </li>
//                 ))}
//               </ul>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CourseNode;
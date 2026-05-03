import React, { useState } from 'react';

const AvatarSelector = ({ onSelect, onClose }) => {
  const [currentPage, setCurrentPage] = useState(0);
  const avatarsPerPage = 10;
  const totalAvatars = 60;
  
  // Generating 60 unique seeds
  const seeds = Array.from({ length: totalAvatars }, (_, i) => `user-id-${i + 100}`);
  const displayedAvatars = seeds.slice(currentPage * avatarsPerPage, (currentPage + 1) * avatarsPerPage);

  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
      {/* Background Blur */}
      <div className="absolute inset-0 bg-black/80 backdrop-blur-xl" onClick={onClose} />
      
      {/* Modal Card */}
      <div className="relative w-full max-w-md bg-[#0a0a0a] border border-white/10 p-8 rounded-[2rem] shadow-2xl">
        <h3 className="text-center text-white font-black text-xs uppercase tracking-[0.3em] mb-8">
          Select Your Identity
        </h3>
        
        {/* The Grid */}
        <div className="grid grid-cols-5 gap-4 mb-10">
          {displayedAvatars.map((seed) => (
            <div key={seed} className="relative group aspect-square">
              <img
                // Using V9 API which is the most stable right now
                src={`https://api.dicebear.com/9.x/avataaars/svg?seed=${seed}&backgroundColor=b6e3f4,c0aede,d1d4f9,ffd5dc,ffdfbf`}
                alt="avatar"
                className="w-full h-full rounded-full bg-white/5 border border-white/5 cursor-pointer 
                           hover:border-[#00F2FF] hover:scale-110 transition-all duration-300 
                           hover:shadow-[0_0_15px_rgba(0,242,255,0.3)]"
                onClick={() => {
                  onSelect(`https://api.dicebear.com/9.x/avataaars/svg?seed=${seed}&backgroundColor=b6e3f4,c0aede,d1d4f9,ffd5dc,ffdfbf`);
                  onClose();
                }}
                // This ensures the image loads properly
                loading="lazy"
              />
            </div>
          ))}
        </div>

        {/* Beautiful Pagination */}
        <div className="flex justify-between items-center px-2">
          <button 
            disabled={currentPage === 0} 
            onClick={() => setCurrentPage(p => p - 1)}
            className="text-[10px] font-black uppercase tracking-widest text-gray-500 hover:text-[#00F2FF] disabled:opacity-20 transition-colors"
          >
            Prev
          </button>
          
          <div className="text-[10px] font-black text-white tracking-[0.2em] bg-white/5 px-4 py-1 rounded-full">
            {currentPage + 1} <span className="text-gray-600 mx-1">/</span> {totalAvatars / avatarsPerPage}
          </div>

          <button 
            disabled={(currentPage + 1) * avatarsPerPage >= totalAvatars} 
            onClick={() => setCurrentPage(p => p + 1)}
            className="text-[10px] font-black uppercase tracking-widest text-gray-500 hover:text-[#00F2FF] disabled:opacity-20 transition-colors"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default AvatarSelector;
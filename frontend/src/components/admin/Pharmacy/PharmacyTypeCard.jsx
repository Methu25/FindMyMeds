import React from 'react';

const PharmacyTypeCard = ({ type, count, isActive, onClick }) => {
  return (
    <div
      onClick={onClick}
      className={`
        relative cursor-pointer transition-all duration-400 ease-out
        p-4 rounded-xl border-y border-r flex flex-col justify-between h-28 group
        ${isActive 
          ? 'bg-[#2FA4A9]/5 border-l-[6px] border-[#2FA4A9] shadow-md -translate-y-1' 
          : 'bg-white border-slate-100 border-l-[6px] border-slate-200 hover:border-l-[#2FA4A9]/50 hover:shadow-sm'
        }
      `}
    >
      {/* Background ID Watermark (Optional: Just for "Epic" feel) */}
      <div className={`absolute right-2 top-2 text-[10px] font-black opacity-[0.05] transition-opacity ${isActive ? 'opacity-20' : ''}`}>
        TYPE_{type.substring(0, 3).toUpperCase()}
      </div>

      <div className="z-10">
        <h4 className={`text-[13px] font-black leading-tight transition-colors duration-300 uppercase tracking-tight
          ${isActive ? 'text-[#2FA4A9]' : 'text-slate-600'}`}>
          {type}
        </h4>
      </div>

      <div className="z-10 flex items-baseline space-x-1">
        <span className={`text-2xl font-black tracking-tighter transition-colors duration-300
          ${isActive ? 'text-[#2FA4A9]' : 'text-slate-800'}`}>
          {count?.toLocaleString() || "0"}
        </span>
        <span className={`text-[10px] font-bold uppercase tracking-widest ${isActive ? 'text-[#2FA4A9]/60' : 'text-slate-400'}`}>
          Units
        </span>
      </div>

      {/* Modern Logic Indicator */}
      {isActive && (
        <div className="absolute bottom-2 right-3">
          <div className="flex items-center space-x-1">
             <div className="w-1 h-1 rounded-full bg-[#2FA4A9] animate-bounce"></div>
             <div className="w-1 h-1 rounded-full bg-[#2FA4A9] animate-bounce [animation-delay:-0.15s]"></div>
             <div className="w-1 h-1 rounded-full bg-[#2FA4A9] animate-bounce [animation-delay:-0.3s]"></div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PharmacyTypeCard;
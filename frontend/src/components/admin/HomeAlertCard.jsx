import React from 'react';
import { Bell } from 'lucide-react';

const HomeAlertCard = () => {
  return (
    <div className="bg-theme rounded-[2rem] p-8 shadow-xl shadow-theme/20 text-white relative overflow-hidden h-full flex flex-col justify-center">
      {/* Decorative Bell Icon */}
      <Bell className="absolute top-6 right-6 opacity-20 rotate-12" size={48} />
      
      <p className="text-sm font-bold opacity-80 mb-2 uppercase tracking-widest">Pending Alerts</p>
      <h2 className="text-6xl font-extrabold mb-4 leading-none tracking-tighter">24</h2>
      
      <div className="space-y-1">
        <p className="text-sm font-medium opacity-90">12 Civilian Appeals</p>
        <p className="text-sm font-medium opacity-90">12 Pharma Requests</p>
      </div>

      <div className="absolute bottom-6 right-8">
        <span className="px-3 py-1 bg-white/20 backdrop-blur-md rounded-full text-[10px] font-bold uppercase tracking-widest">
          Just now
        </span>
      </div>
    </div>
  );
};

export default HomeAlertCard;
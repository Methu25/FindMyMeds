import React from 'react';
import { PlusCircle, FileText, Mail, Zap } from 'lucide-react';

const HomeQuickAccess = () => {
  return (
    <div className="bg-white rounded-[2rem] p-8 shadow-sm border border-slate-100 h-full">
      <div className="flex items-center gap-2 mb-6 text-slate-800 font-bold">
        <Zap size={18} className="text-amber-500 fill-amber-500" />
        <span className="text-sm uppercase tracking-wider">Quick Access</span>
      </div>
      
      <div className="flex flex-col gap-3">
        {/* Super Admin Action */}
        <button className="flex items-center justify-center gap-3 w-full py-4 bg-[#d32f2f] text-white font-bold rounded-2xl hover:bg-red-700 hover:shadow-lg hover:shadow-red-200 transition-all active:scale-95">
          <PlusCircle size={18} />
          Register New Admin
        </button>

        <button className="flex items-center justify-center gap-3 w-full py-4 bg-slate-900 text-white font-bold rounded-2xl hover:bg-slate-800 hover:shadow-lg hover:shadow-slate-200 transition-all active:scale-95">
          <FileText size={18} />
          Generate Reports
        </button>

        <button className="flex items-center justify-center gap-3 w-full py-4 bg-slate-50 text-slate-600 border border-slate-200 font-bold rounded-2xl hover:bg-white hover:border-theme transition-all active:scale-95">
          <Mail size={18} />
          View Inquiries
        </button>
      </div>
    </div>
  );
};

export default HomeQuickAccess;
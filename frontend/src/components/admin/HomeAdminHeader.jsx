import React from 'react';

const HomeAdminHeader = ({ title = "System Dashboard", userName = "Yash", role = "Super Admin" }) => {
  return (
    <header className="flex justify-between items-center py-6 bg-transparent">
      {/* Removed px-2 and sticky. 
          The padding is now controlled by the parent AdminLayout 
          to ensure perfect vertical alignment with your cards. 
      */}
      
      {/* Dynamic Page Title */}
      <h1 className="text-3xl font-[800] text-slate-900 tracking-tight">
        {title}
      </h1>

      {/* User Profile Section */}
      <div className="flex items-center gap-4 bg-white px-5 py-2.5 rounded-full shadow-sm border border-slate-100">
        <div className="text-right">
          <p className="text-sm font-bold text-slate-800 leading-none mb-1">{userName}</p>
          <p className="text-[10px] font-extrabold text-primary uppercase tracking-wider">
            {role}
          </p>
        </div>
        
        {/* Profile Avatar with Initial */}
        <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center text-white font-bold text-lg shadow-inner">
          {userName.charAt(0)}
        </div>
      </div>
    </header>
  );
};

export default HomeAdminHeader;
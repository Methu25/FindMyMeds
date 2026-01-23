import React from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, Users, Pill, ShieldAlert, Bell, User } from 'lucide-react';
import logo from '../assets/logo.jpg';

const AdminSidebar = () => {
  const location = useLocation();

  const navItems = [
    { name: 'Dashboard', path: '/admin', icon: <LayoutDashboard size={20} /> },
    { name: 'Medicine Registry', path: '/admin/medicines', icon: <Pill size={20} /> },
    { name: 'Pharmacy Management', path: '/admin/pharmacies', icon: <Users size={20} /> },
    { name: 'Civilian Management', path: '/admin/civilians', icon: <Users size={20} /> },


    { name: 'Notifications', path: '/admin/notifications', icon: <Bell size={20} /> },
    { name: 'Profile', path: '/admin/profile', icon: <User size={20} /> },
  ];

  return (
    <div className="w-64 bg-white border-r border-gray-200 min-h-screen flex flex-col">
      <div className="p-6 border-b border-gray-100 flex items-center gap-3">
        <img src={logo} alt="Logo" className="h-8 w-8 object-contain" />
        <div>
          <h1 className="text-xl font-bold text-teal-600 leading-none">FindMyMeds</h1>
          <span className="text-xs text-gray-500 uppercase tracking-wider">Super Admin</span>
        </div>
      </div>

      <nav className="flex-1 p-4 space-y-1">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${isActive
                ? 'bg-teal-50 text-teal-700'
                : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                }`}
            >
              {item.icon}
              {item.name}
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-gray-100">
        <button className="flex items-center gap-3 px-4 py-3 w-full text-red-600 hover:bg-red-50 rounded-lg text-sm font-medium transition-colors">
          <ShieldAlert size={20} />
          Logout
        </button>
      </div>
    </div>
  );
};

const AdminLayout = () => {
  return (
    <div className="flex bg-gray-50 min-h-screen">
      <AdminSidebar />
      <main className="flex-1 p-8 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;

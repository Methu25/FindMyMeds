import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, HelpCircle, Calendar, MessageSquare, LogOut, Leaf, MapPin } from 'lucide-react';

const Sidebar = () => {
    const navItems = [
        { name: 'Home', path: '/civilian', end: true, icon: Home },
        { name: 'Inquiries', path: '/civilian/inquiries', icon: HelpCircle },
        { name: 'Reservations', path: '/civilian/reservation', icon: Calendar },
        { name: 'Find Pharmacy', path: '/civilian/find-pharmacy', icon: MapPin },
        { name: 'Feedback', path: '/civilian/feedback', icon: MessageSquare },
    ];

    return (
        <aside className="w-64 bg-white border-r border-gray-100 h-full flex flex-col py-8 px-5">
            {/* Logo Section */}
            <div className="flex items-center gap-2 mb-10 px-2">
                <Leaf className="text-teal-600 transform -rotate-12" size={24} fill="currentColor" strokeWidth={0} />
                <span className="text-2xl font-extrabold text-teal-600 tracking-tight" style={{ color: '#2FA4A9' }}>
                    Findmymeds
                </span>
            </div>

            {/* Navigation Menu */}
            <nav className="flex-1 space-y-2">
                {navItems.map((item) => {
                    const Icon = item.icon;
                    return (
                        <NavLink
                            key={item.path}
                            to={item.path}
                            end={item.end}
                            className={({ isActive }) =>
                                `flex items-center gap-4 px-4 py-3.5 rounded-xl text-sm transition-all duration-200 ${isActive
                                    ? 'bg-teal-50 text-teal-600 font-bold shadow-sm'
                                    : 'text-gray-500 font-medium hover:text-gray-900 shadow-none'
                                }`
                            }
                        >
                            {({ isActive }) => (
                                <>
                                    <Icon
                                        size={20}
                                        strokeWidth={isActive ? 2.5 : 2}
                                        fill={isActive ? "currentColor" : "none"}
                                        className={isActive ? "opacity-100" : "opacity-70"}
                                    />
                                    <span>{item.name}</span>
                                </>
                            )}
                        </NavLink>
                    );
                })}
            </nav>

            {/* Logout Button */}
            <button className="flex items-center gap-4 px-4 py-3.5 rounded-xl text-sm font-bold text-red-500 hover:bg-red-50 transition-all duration-200 mt-auto">
                <LogOut size={20} className="opacity-90" />
                <span>Logout</span>
            </button>
        </aside>
    );
};

export default Sidebar;

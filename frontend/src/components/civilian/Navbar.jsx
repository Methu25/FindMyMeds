import React, { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import {
    LogOut,
    Menu,
    X,
    User
} from 'lucide-react';

const Navbar = () => {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const location = useLocation();

    // Standard nav items
    const navItems = [
        { name: 'Home', path: '/civilian', end: true },
        { name: 'Activity', path: '/civilian/activity' },
        { name: 'Reservations', path: '/civilian/reservation' },
        { name: 'Pharmacy', path: '/civilian/find-pharmacy' },
        { name: 'Feedback', path: '/civilian/feedback' },
    ];

    return (
        <div className="flex flex-col w-full font-sans">
            {/* Main Navbar - Teal Background */}
            <nav className="fixed top-0 left-0 right-0 z-50 bg-[#2FA4A9] text-white shadow-md h-16">
                <div className="w-full h-full max-w-7xl mx-auto flex items-center px-0 md:px-4" style={{ margin: '0 auto' }}>

                    {/* Left Block: "Browse Categories" style (Menu/Brand) */}
                    <div
                        className="bg-[#248286] h-full flex items-center px-6 gap-3 cursor-pointer hover:bg-[#1f7074] transition-colors md:min-w-[240px]"
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    >
                        {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
                        <span className="font-bold tracking-wide text-sm uppercase">FindMyMeds Menu</span>
                    </div>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex flex-1 items-center justify-between pl-8 pr-4 h-full">
                        {/* Center Links */}
                        <div className="flex items-center gap-8 h-full">
                            {navItems.map((item) => (
                                <NavLink
                                    key={item.path}
                                    to={item.path}
                                    end={item.end}
                                    className={({ isActive }) =>
                                        `text-sm font-medium transition-colors hover:text-teal-100 flex items-center h-full border-b-4 ${isActive
                                            ? 'border-white text-white'
                                            : 'border-transparent text-white/90'
                                        }`
                                    }
                                >
                                    {item.name}
                                </NavLink>
                            ))}
                        </div>

                        {/* Right Section */}
                        <div className="flex items-center gap-8">



                            {/* User Profile Hook */}
                            <div className="flex items-center gap-3 pl-6 border-l border-teal-400/50">
                                <span className="text-xs font-semibold text-teal-50">John Doe</span>
                                <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center hover:bg-white/30 transition-colors cursor-pointer">
                                    <User size={16} />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Mobile Right Spacer (if any) */}
                    <div className="md:hidden flex-1 flex justify-end pr-4">
                        <NavLink to="/civilian/inquiries" className="text-xs font-bold uppercase tracking-wider">
                            Inquiries
                        </NavLink>
                    </div>
                </div>

                {/* Mobile Menu Dropdown */}
                <div
                    className={`md:hidden overflow-hidden bg-[#248286] transition-all duration-300 ease-in-out ${mobileMenuOpen ? 'max-h-screen border-t border-teal-700' : 'max-h-0'}`}
                >
                    <div className="flex flex-col text-white">
                        {navItems.map((item) => (
                            <NavLink
                                key={item.path}
                                to={item.path}
                                onClick={() => setMobileMenuOpen(false)}
                                className={({ isActive }) =>
                                    `px-6 py-4 border-b border-teal-700/50 hover:bg-teal-800 transition-colors ${isActive ? 'bg-teal-800 font-bold' : ''}`
                                }
                            >
                                {item.name}
                            </NavLink>
                        ))}
                        <button className="flex items-center gap-2 px-6 py-4 text-teal-200 hover:text-white hover:bg-teal-800 transition-colors">
                            <LogOut size={16} /> Logout
                        </button>
                    </div>
                </div>
            </nav>

            {/* Spacer to prevent content from hiding behind fixed navbar */}
            <div className="h-16"></div>
        </div>
    );
};

export default Navbar;

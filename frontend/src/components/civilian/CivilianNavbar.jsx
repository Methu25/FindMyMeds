import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
    Home,
    LayoutDashboard,
    Search,
    MessageSquare,
    Calendar,
    LogOut,
    Menu,
    X,
    User,
    Bell
} from 'lucide-react';

const CivilianNavbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();

    const menuItems = [
        { icon: Home, label: 'Home', path: '/civilian/home' },
        { icon: LayoutDashboard, label: 'Dashboard', path: '/civilian/dashboard' }, // This might need to point to ActivityPage if dashboard is not distinct
        { icon: Search, label: 'Reserve Medicine', path: '/civilian/reservation' },
        { icon: Calendar, label: 'Reservations', path: '/civilian/reservations' },
        { icon: Bell, label: 'Notifications', path: '/civilian/notifications' },
        { icon: MessageSquare, label: 'Inquiries', path: '/civilian/inquiries' },
    ];

    const isActive = (path) => location.pathname === path;

    const handleLogout = () => {
        // Implement logout logic here
        localStorage.removeItem('token');
        localStorage.removeItem('userRole');
        navigate('/login');
    };

    return (
        <nav className="bg-white shadow-md fixed w-full z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                    <div className="flex items-center">
                        <Link to="/civilian/home" className="flex-shrink-0 flex items-center">
                            <span className="font-bold text-2xl text-emerald-600">FindMyMeds</span>
                        </Link>
                        <div className="hidden md:ml-6 md:flex md:space-x-8">
                            {menuItems.map((item) => (
                                <Link
                                    key={item.path}
                                    to={item.path}
                                    className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${isActive(item.path)
                                        ? 'border-emerald-500 text-gray-900'
                                        : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                                        }`}
                                >
                                    <item.icon className="w-4 h-4 mr-2" />
                                    {item.label}
                                </Link>
                            ))}
                        </div>
                    </div>
                    <div className="hidden md:flex items-center">
                        <button
                            onClick={handleLogout}
                            className="ml-8 inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                        >
                            <LogOut className="w-4 h-4 mr-2" />
                            Logout
                        </button>
                    </div>
                    <div className="-mr-2 flex items-center md:hidden">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-emerald-500"
                        >
                            <span className="sr-only">Open main menu</span>
                            {isOpen ? (
                                <X className="block h-6 w-6" aria-hidden="true" />
                            ) : (
                                <Menu className="block h-6 w-6" aria-hidden="true" />
                            )}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile menu */}
            {isOpen && (
                <div className="md:hidden">
                    <div className="pt-2 pb-3 space-y-1">
                        {menuItems.map((item) => (
                            <Link
                                key={item.path}
                                to={item.path}
                                onClick={() => setIsOpen(false)}
                                className={`block pl-3 pr-4 py-2 border-l-4 text-base font-medium ${isActive(item.path)
                                    ? 'bg-emerald-50 border-emerald-500 text-emerald-700'
                                    : 'border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700'
                                    }`}
                            >
                                <div className="flex items-center">
                                    <item.icon className="w-5 h-5 mr-3" />
                                    {item.label}
                                </div>
                            </Link>
                        ))}
                        <button
                            onClick={() => {
                                setIsOpen(false);
                                handleLogout();
                            }}
                            className="w-full text-left block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-red-600 hover:bg-red-50 hover:border-red-300"
                        >
                            <div className="flex items-center">
                                <LogOut className="w-5 h-5 mr-3" />
                                Logout
                            </div>
                        </button>
                    </div>
                </div>
            )}
        </nav>
    );
};

export default CivilianNavbar;

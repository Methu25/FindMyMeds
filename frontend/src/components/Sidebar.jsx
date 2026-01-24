<<<<<<< HEAD
import { NavLink } from 'react-router-dom'
import { Home, Package, History, Pill, Bell, Settings, MessageSquare } from 'lucide-react'

const menuItems = [
  { name: 'Dashboard', icon: Home, path: '/dashboard' },
  { name: 'Current Reservations', icon: Package, path: '/current-reservations' },
  { name: 'Reservation History', icon: History, path: '/reservation-history' },
  { name: 'Medicine Inventory', icon: Pill, path: '/inventory' },
  { name: 'Notification Center', icon: Bell, path: '/notifications' },
  { name: 'Admin Center', icon: MessageSquare, path: '/admin-center' },
  { name: 'System Settings', icon: Settings, path: '/settings' },
]

export default function Sidebar() {
  return (
    <div className="fixed left-0 top-0 h-screen w-64 bg-primary text-white flex flex-col shadow-xl">
      <div className="p-6 border-b border-primary-dark">
        <h1 className="text-2xl font-bold">FindMyMeds</h1>
        <p className="text-sm opacity-90">Pharmacy Portal</p>
      </div>
      <nav className="flex-1 p-4 space-y-1">
        {menuItems.map((item) => {
          const Icon = item.icon
          return (
            <NavLink
              key={item.name}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                  isActive ? 'bg-primary-dark shadow-md' : 'hover:bg-primary-dark/70'
                }`
              }
            >
              <Icon size={20} />
              <span className="font-medium">{item.name}</span>
            </NavLink>
          )
        })}
      </nav>
      <div className="p-4 text-xs opacity-75 border-t border-primary-dark">
        © 2026 FindMyMeds
      </div>
    </div>
  )
}
=======
import { NavLink, useLocation } from 'react-router-dom';
import { useState } from 'react';
import {
    Home,
    MessageSquare,
    Calendar,
    MessageCircle,
    LogOut,
    Menu,
    X,
    Pill,
    MapPin
} from 'lucide-react';
import '../styles/Sidebar.css';

const navItems = [
    { path: '/civilian/home', label: 'Home', icon: Home },
    { path: '/civilian/inquiries', label: 'Inquiries', icon: MessageSquare },
    { path: '/civilian/reservation', label: 'Reservations', icon: Calendar },
    { path: '/civilian/activity', label: 'Your Activity', icon: Calendar },
    { path: '/civilian/find-pharmacy', label: 'Find Pharmacy', icon: MapPin },
    { path: '/civilian/feedback', label: 'Feedback', icon: MessageCircle },
];

function Sidebar() {
    const [isOpen, setIsOpen] = useState(false);
    const location = useLocation();

    const toggleSidebar = () => setIsOpen(!isOpen);
    const closeSidebar = () => setIsOpen(false);

    return (
        <>
            <button className="sidebar-toggle" onClick={toggleSidebar}>
                {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
            <div
                className={`sidebar-overlay ${isOpen ? 'open' : ''}`}
                onClick={closeSidebar}
            />

            <aside className={`sidebar ${isOpen ? 'open' : ''}`}>
                <div className="sidebar-header">
                    <NavLink to="/civilian/home" className="sidebar-logo" onClick={closeSidebar}>
                        <img src="/logo.jpeg" alt="FindMyMeds Logo" style={{ width: '30px', height: '30px', objectFit: 'contain' }} />
                        <span className="sidebar-logo-text">
                            Findmymeds
                        </span>
                    </NavLink>
                </div>

                <nav className="sidebar-nav">
                    {navItems.map((item) => (
                        <NavLink
                            key={item.path}
                            to={item.path}
                            className={({ isActive }) =>
                                `sidebar-nav-link ${isActive ? 'active' : ''}`
                            }
                            onClick={closeSidebar}
                        >
                            <item.icon />
                            {item.label}
                        </NavLink>
                    ))}
                </nav>

                <div className="sidebar-footer">
                    <button className="sidebar-logout">
                        <LogOut />
                        Logout
                    </button>
                </div>
            </aside>
        </>
    );
}

export default Sidebar;
>>>>>>> origin

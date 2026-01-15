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
    Pill
} from 'lucide-react';
import '../styles/Sidebar.css';

const navItems = [
    { path: '/civilian/home', label: 'Home', icon: Home },
    { path: '/civilian/inquiries', label: 'Inquiries', icon: MessageSquare },
    { path: '/civilian/reservation', label: 'Reservations', icon: Calendar },
    { path: '/civilian/activity', label: 'Your Activity', icon: Calendar },
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

import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Pill, Building2, Users, ShieldCheck, FileText, Bell } from 'lucide-react';

const Sidebar = () => {
    const links = [
        { name: 'Dashboard', path: '/', icon: LayoutDashboard },
        { name: 'Civilian Management', path: '/civilian', icon: Users },
        { name: 'Pharmacy Management', path: '/pharmacy', icon: Building2 },
        { name: 'Admin Management', path: '/admin', icon: ShieldCheck }, // Super Admin only
        { name: 'Reports & Inquiries', path: '/report-submission', icon: FileText }, // Admin only
        { name: 'Notifications', path: '/notifications', icon: Bell },
        { name: 'Medicine Registry', path: '/medicine', icon: Pill },
        { name: 'Profile', path: '/profile', icon: Users }, // Placeholder icon for Profile
        { name: 'Settings', path: '/settings', icon: LayoutDashboard }, // Placeholder icon
        { name: 'Rules & Regulations', path: '/rules', icon: FileText },
    ];

    return (
        <div className="sidebar glass-panel" style={{
            width: 'var(--sidebar-width)',
            height: '95vh',
            position: 'fixed',
            left: '1rem',
            top: '2.5vh',
            display: 'flex',
            flexDirection: 'column',
            padding: '1.5rem'
        }}>
            <div className="brand" style={{ marginBottom: '3rem' }}>
                <h2 style={{ color: 'var(--primary)', fontWeight: 'bold', fontSize: '1.5rem' }}>FindMyMed</h2>
            </div>

            <nav style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                {links.map((link) => (
                    <NavLink
                        key={link.path}
                        to={link.path}
                        className={({ isActive }) =>
                            `nav-link ${isActive ? 'active' : ''}`
                        }
                        style={({ isActive }) => ({
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.75rem',
                            padding: '0.75rem 1rem',
                            borderRadius: '0.5rem',
                            color: isActive ? 'var(--primary)' : 'var(--text-muted)',
                            backgroundColor: isActive ? 'var(--secondary)' : 'transparent',
                            textDecoration: 'none',
                            fontWeight: isActive ? 600 : 500,
                            transition: 'all 0.2s'
                        })}
                    >
                        <link.icon size={20} />
                        {link.name}
                    </NavLink>
                ))}
            </nav>
        </div>
    );
};

export default Sidebar;

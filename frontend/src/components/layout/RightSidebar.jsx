import React, { useState, useEffect } from 'react';
import { UserPlus, FileText, Bell, CheckCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const RightSidebar = () => {
    const navigate = useNavigate();
    const [notifications, setNotifications] = useState({ unreadCount: 0, readCount: 0, recentNotifications: [] });

    useEffect(() => {
        const fetchNotifications = async () => {
            try {
                // Fetch notification data from backend
                const res = await axios.get('http://localhost:8081/api/dashboard/notifications');
                setNotifications(res.data);
            } catch (e) {
                console.warn("Failed to fetch notifications");
                // Mock data for fallback/demo if backend not ready or auth missing
                setNotifications({
                    unreadCount: 5,
                    readCount: 12,
                    recentNotifications: [
                        { id: 1, title: 'New Pharmacy Request', message: 'PharmaPlus requested approval', isRead: false },
                        { id: 2, title: 'Civilian Appeal', message: 'John Doe appealed ban', isRead: true }
                    ]
                });
            }
        };
        fetchNotifications();
    }, []);

    return (
        <div className="right-sidebar glass-panel" style={{
            width: '280px',
            height: '95vh',
            position: 'fixed',
            right: '1rem',
            top: '2.5vh',
            display: 'flex',
            flexDirection: 'column',
            gap: '2rem',
            padding: '1.5rem',
            overflowY: 'auto'
        }}>
            {/* Quick Tools Section */}
            <div>
                <h3 style={{ fontSize: '1.1rem', fontWeight: 'bold', marginBottom: '1rem', color: 'var(--text-primary)' }}>Quick Tools</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                    <button 
                        onClick={() => navigate('/admin')}
                        className="btn-tool"
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.75rem',
                            padding: '0.75rem',
                            borderRadius: '0.5rem',
                            border: 'none',
                            backgroundColor: '#ffebee', // Light red background
                            color: '#d32f2f', // Red accent
                            cursor: 'pointer',
                            fontWeight: '600',
                            transition: 'all 0.2s',
                            width: '100%'
                        }}
                    >
                        <UserPlus size={18} />
                        Add Admin
                    </button>
                    
                    <button 
                        onClick={() => navigate('/reports')}
                        className="btn-tool"
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.75rem',
                            padding: '0.75rem',
                            borderRadius: '0.5rem',
                            border: 'none',
                            backgroundColor: '#e0f2f1', // Light teal
                            color: '#2FA4A9', // Primary accent
                            cursor: 'pointer',
                            fontWeight: '600',
                            transition: 'all 0.2s',
                            width: '100%'
                        }}
                    >
                        <FileText size={18} />
                        Reports & Inquiries
                    </button>
                </div>
            </div>

            {/* Notification Metrics Section */}
            <div>
                <h3 style={{ fontSize: '1.1rem', fontWeight: 'bold', marginBottom: '1rem', color: 'var(--text-primary)' }}>Notifications</h3>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.5rem' }}>
                    <div style={{
                        background: 'rgba(47, 164, 169, 0.1)',
                        padding: '1rem',
                        borderRadius: '0.75rem',
                        textAlign: 'center'
                    }}>
                        <div style={{ color: '#2FA4A9', fontWeight: 'bold', fontSize: '1.25rem' }}>{notifications.unreadCount}</div>
                        <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '4px' }}>
                             <Bell size={12}/> Unread
                        </div>
                    </div>
                    <div style={{
                        background: 'rgba(47, 164, 169, 0.1)',
                        padding: '1rem',
                        borderRadius: '0.75rem',
                        textAlign: 'center'
                    }}>
                        <div style={{ color: '#2FA4A9', fontWeight: 'bold', fontSize: '1.25rem' }}>{notifications.readCount}</div>
                        <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '4px' }}>
                             <CheckCircle size={12}/> Read
                        </div>
                    </div>
                </div>

                {/* Recent Notifications List - simplified */}
                <h4 style={{ fontSize: '0.9rem', fontWeight: '600', marginBottom: '0.75rem', color: 'var(--text-muted)' }}>Recent</h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                    {notifications.recentNotifications && notifications.recentNotifications.length > 0 ? (
                        notifications.recentNotifications.map((notif, idx) => (
                            <div key={idx} style={{
                                padding: '0.75rem',
                                background: 'white',
                                borderRadius: '0.5rem',
                                borderLeft: notif.isRead ? '3px solid #ccc' : '3px solid #2FA4A9',
                                boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
                                fontSize: '0.85rem'
                            }}>
                                <div style={{ fontWeight: '600', marginBottom: '2px' }}>{notif.title}</div>
                                <div style={{ color: 'var(--text-muted)', fontSize: '0.75rem' }}>{notif.message}</div>
                            </div>
                        ))
                    ) : (
                        <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontStyle: 'italic' }}>No recent notifications</div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default RightSidebar;

import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import StatusBadge from '../components/common/StatusBadge';
import { ArrowLeft, CheckCircle, Clock, Tag, User, Hash } from 'lucide-react';

const NotificationDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [notification, setNotification] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchDetails = async () => {
            try {
                const response = await axios.get(`http://localhost:8081/api/notifications/${id}`);
                setNotification(response.data);
            } catch (err) {
                console.error("Error fetching notification details:", err);
                setError("Failed to load notification details. It may not exist or access is denied.");

                // Demo fallback
                if (err.response?.status === 404) {
                    setError("Notification not found.");
                }
            } finally {
                setLoading(false);
            }
        };

        if (id) {
            fetchDetails();
        }
    }, [id]);

    const handleMarkAsRead = async () => {
        try {
            await axios.put(`http://localhost:8081/api/notifications/${id}/read`);
            setNotification(prev => ({ ...prev, isRead: true, readAt: new Date().toISOString() }));
        } catch (err) {
            console.error("Error marking as read", err);
            alert("Failed to mark as read.");
        }
    };

    if (loading) return <div style={{ padding: '2rem' }}>Loading details...</div>;
    if (error) return (
        <div style={{ padding: '2rem' }}>
            <div style={{ color: '#d32f2f', marginBottom: '1rem' }}>{error}</div>
            <button onClick={() => navigate('/notifications')} style={{ padding: '0.5rem 1rem', cursor: 'pointer' }}>
                Back to Notifications
            </button>
        </div>
    );
    if (!notification) return null;

    return (
        <div style={{ maxWidth: '800px', margin: '0 auto', paddingBottom: '2rem' }}>
            <button
                onClick={() => navigate('/notifications')}
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    background: 'transparent',
                    border: 'none',
                    color: '#666',
                    cursor: 'pointer',
                    marginBottom: '1.5rem',
                    fontSize: '1rem'
                }}
            >
                <ArrowLeft size={20} /> Back to Notifications
            </button>

            <div className="glass-panel" style={{ background: 'white', borderRadius: '1rem', padding: '2rem', boxShadow: '0 4px 6px rgba(0,0,0,0.05)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.5rem' }}>
                    <h1 style={{ fontSize: '1.75rem', fontWeight: 'bold', color: 'var(--text-primary)', margin: 0 }}>
                        Notification Details
                    </h1>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        {notification.isRead ? (
                            <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#166534', background: '#dcfce7', padding: '0.5rem 1rem', borderRadius: '2rem', fontSize: '0.9rem', fontWeight: '500' }}>
                                <CheckCircle size={16} /> Read
                            </span>
                        ) : (
                            <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#991b1b', background: '#fee2e2', padding: '0.5rem 1rem', borderRadius: '2rem', fontSize: '0.9rem', fontWeight: '500' }}>
                                Unread
                            </span>
                        )}
                    </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem', marginBottom: '2rem', background: '#f8f9fa', padding: '1.5rem', borderRadius: '0.75rem' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                        <span style={{ fontSize: '0.85rem', color: '#666', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                            <Tag size={14} /> Type
                        </span>
                        <StatusBadge status={notification.notificationType} />
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                        <span style={{ fontSize: '0.85rem', color: '#666', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                            <User size={14} /> Target Role
                        </span>
                        <span style={{ fontWeight: '500' }}>{notification.targetRole}</span>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                        <span style={{ fontSize: '0.85rem', color: '#666', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                            <Clock size={14} /> Created At
                        </span>
                        <span style={{ fontWeight: '500' }}>{new Date(notification.createdAt).toLocaleString()}</span>
                    </div>
                    {notification.relatedEntityId && (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                            <span style={{ fontSize: '0.85rem', color: '#666', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                                <Hash size={14} /> Related Entity ID
                            </span>
                            <span style={{ fontWeight: '500' }}>#{notification.relatedEntityId}</span>
                        </div>
                    )}
                </div>

                <div style={{ marginBottom: '2rem' }}>
                    <h3 style={{ fontSize: '1.1rem', fontWeight: 'bold', marginBottom: '0.5rem', color: '#444' }}>Title</h3>
                    <div style={{ fontSize: '1.1rem', fontWeight: '500', color: '#111' }}>{notification.title}</div>
                </div>

                <div style={{ marginBottom: '2rem' }}>
                    <h3 style={{ fontSize: '1.1rem', fontWeight: 'bold', marginBottom: '0.5rem', color: '#444' }}>Message</h3>
                    <div style={{ fontSize: '1rem', lineHeight: '1.6', color: '#333', background: '#fff', border: '1px solid #eee', padding: '1rem', borderRadius: '0.5rem' }}>
                        {notification.message}
                    </div>
                </div>

                {!notification.isRead && (
                    <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                        <button
                            onClick={handleMarkAsRead}
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.5rem',
                                background: '#2FA4A9',
                                color: 'white',
                                border: 'none',
                                padding: '0.75rem 1.5rem',
                                borderRadius: '0.5rem',
                                cursor: 'pointer',
                                fontSize: '1rem',
                                fontWeight: '500',
                                boxShadow: '0 2px 4px rgba(47, 164, 169, 0.3)'
                            }}
                        >
                            <CheckCircle size={18} /> Mark as Read
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default NotificationDetails;

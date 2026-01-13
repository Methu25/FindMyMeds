import React from 'react';
import { Eye } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import StatusBadge from '../common/StatusBadge';

const NotificationTable = ({ notifications }) => {
    const navigate = useNavigate();

    const formatDate = (dateString) => {
        if (!dateString) return 'N/A';
        return new Date(dateString).toLocaleString();
    };

    return (
        <div className="glass-panel" style={{ background: 'white', borderRadius: '1rem', padding: '1.5rem', overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: '800px' }}>
                <thead>
                    <tr style={{ borderBottom: '2px solid #f0f0f0', color: '#666', fontSize: '0.9rem' }}>
                        <th style={{ padding: '1rem', textAlign: 'left' }}>ID</th>
                        <th style={{ padding: '1rem', textAlign: 'left' }}>Type</th>
                        <th style={{ padding: '1rem', textAlign: 'left' }}>Title</th>
                        <th style={{ padding: '1rem', textAlign: 'left' }}>Description</th>
                        <th style={{ padding: '1rem', textAlign: 'left' }}>Date & Time</th>
                        <th style={{ padding: '1rem', textAlign: 'left' }}>Status</th>
                        <th style={{ padding: '1rem', textAlign: 'left' }}>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {notifications.map((notification) => (
                        <tr key={notification.id} style={{ borderBottom: '1px solid #f0f0f0', fontSize: '0.95rem' }}>
                            <td style={{ padding: '1rem' }}>#{notification.id}</td>
                            <td style={{ padding: '1rem' }}>
                                <StatusBadge status={notification.notificationType} />
                            </td>
                            <td style={{ padding: '1rem', fontWeight: '500' }}>{notification.title}</td>
                            <td style={{ padding: '1rem', maxWidth: '300px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                                {notification.message}
                            </td>
                            <td style={{ padding: '1rem', color: '#666' }}>{formatDate(notification.createdAt)}</td>
                            <td style={{ padding: '1rem' }}>
                                <span style={{
                                    padding: '0.25rem 0.75rem',
                                    borderRadius: '2rem',
                                    fontSize: '0.85rem',
                                    backgroundColor: notification.isRead ? '#e0e0e0' : '#ffebee',
                                    color: notification.isRead ? '#616161' : '#d32f2f',
                                    fontWeight: '500'
                                }}>
                                    {notification.isRead ? 'Read' : 'Unread'}
                                </span>
                            </td>
                            <td style={{ padding: '1rem' }}>
                                <button
                                    onClick={() => navigate(`/notifications/${notification.id}`)}
                                    style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '0.5rem',
                                        background: 'transparent',
                                        border: '1px solid #2FA4A9',
                                        color: '#2FA4A9',
                                        padding: '0.5rem 1rem',
                                        borderRadius: '0.5rem',
                                        cursor: 'pointer',
                                        fontSize: '0.9rem',
                                        transition: 'all 0.2s'
                                    }}
                                    onMouseOver={(e) => { e.currentTarget.style.background = '#2FA4A9'; e.currentTarget.style.color = 'white'; }}
                                    onMouseOut={(e) => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#2FA4A9'; }}
                                >
                                    <Eye size={16} /> View
                                </button>
                            </td>
                        </tr>
                    ))}
                    {notifications.length === 0 && (
                        <tr>
                            <td colSpan="7" style={{ padding: '2rem', textAlign: 'center', color: '#666' }}>
                                No notifications found matching the criteria.
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default NotificationTable;

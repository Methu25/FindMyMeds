import React, { useState, useEffect } from 'react';
import axios from 'axios';
import NotificationMetrics from '../components/notification/NotificationMetrics';
import NotificationTable from '../components/notification/NotificationTable';
import { RefreshCw } from 'lucide-react';

const NotificationCenter = () => {
    const [notifications, setNotifications] = useState([]);
    const [filteredNotifications, setFilteredNotifications] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filterType, setFilterType] = useState(null); // 'PHARMACY', 'ADMIN', 'CIVILIAN', 'SYSTEM'
    const [filterRead, setFilterRead] = useState(null); // true (read), false (unread)

    // Mock role - replace with actual auth logic
    const userRole = 'SUPER_ADMIN'; // or 'ADMIN'

    const fetchNotifications = async () => {
        setLoading(true);
        try {
            // Updated API call to match backend controller
            const response = await axios.get(`http://localhost:8081/api/notifications?role=${userRole}`);
            setNotifications(response.data);
            applyFilters(response.data, filterType, filterRead);
        } catch (error) {
            console.error("Error fetching notifications:", error);
            // Fallback for demo if backend is not running/failing
            setNotifications([]);
            setFilteredNotifications([]);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchNotifications();
    }, []);

    useEffect(() => {
        applyFilters(notifications, filterType, filterRead);
    }, [filterType, filterRead, notifications]);

    const applyFilters = (data, type, read) => {
        let result = data;

        if (type) {
            result = result.filter(n => n.notificationType === type);
        }

        if (read !== null) {
            result = result.filter(n => n.isRead === read);
        }

        setFilteredNotifications(result);
    };

    // Calculate metrics locally from the full list
    const metrics = {
        pharmacyCount: notifications.filter(n => n.notificationType === 'PHARMACY').length,
        adminCount: notifications.filter(n => n.notificationType === 'ADMIN').length,
        civilianCount: notifications.filter(n => n.notificationType === 'CIVILIAN').length,
        systemCount: notifications.filter(n => n.notificationType === 'SYSTEM').length,
        readCount: notifications.filter(n => n.isRead === true).length,
        unreadCount: notifications.filter(n => n.isRead === false).length
    };

    const handleFilterType = (type) => {
        setFilterType(prev => prev === type ? null : type); // Toggle
    };

    const handleFilterRead = (read) => {
        setFilterRead(prev => prev === read ? null : read); // Toggle
    };

    return (
        <div style={{ paddingBottom: '2rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                <h1 style={{ fontSize: '2rem', fontWeight: 'bold', color: 'var(--text-primary)' }}>
                    Notification Center
                </h1>
                <button
                    onClick={fetchNotifications}
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        padding: '0.75rem 1.5rem',
                        background: 'white',
                        border: '1px solid #e0e0e0',
                        borderRadius: '0.5rem',
                        cursor: 'pointer',
                        color: '#666'
                    }}
                >
                    <RefreshCw size={18} /> Refresh
                </button>
            </div>

            <NotificationMetrics
                metrics={metrics}
                onFilterType={handleFilterType}
                onFilterRead={handleFilterRead}
                currentTypeFilter={filterType}
                currentReadFilter={filterRead}
            />

            {loading ? (
                <div style={{ padding: '2rem', textAlign: 'center', color: '#666' }}>Loading Notifications...</div>
            ) : (
                <NotificationTable notifications={filteredNotifications} />
            )}
        </div>
    );
};

export default NotificationCenter;

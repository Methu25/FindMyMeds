import React from 'react';
import MetricCard from '../common/MetricCard';
import { Building2, ShieldCheck, Users, Activity, Mail, MailOpen } from 'lucide-react';

const NotificationMetrics = ({ metrics, onFilterType, onFilterRead, currentTypeFilter, currentReadFilter }) => {
    return (
        <div style={{ marginBottom: '2rem' }}>
            {/* Top Section - Type Metrics */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem', marginBottom: '2rem' }}>
                <div onClick={() => onFilterType('PHARMACY')} style={{ cursor: 'pointer', opacity: currentTypeFilter === 'PHARMACY' ? 1 : 0.7 }}>
                    <MetricCard
                        label="Pharmacy"
                        value={metrics.pharmacyCount || 0}
                        icon={Building2}
                        color="primary"
                    />
                </div>
                <div onClick={() => onFilterType('ADMIN')} style={{ cursor: 'pointer', opacity: currentTypeFilter === 'ADMIN' ? 1 : 0.7 }}>
                    <MetricCard
                        label="Admin"
                        value={metrics.adminCount || 0}
                        icon={ShieldCheck}
                        color="error"
                    />
                </div>
                <div onClick={() => onFilterType('CIVILIAN')} style={{ cursor: 'pointer', opacity: currentTypeFilter === 'CIVILIAN' ? 1 : 0.7 }}>
                    <MetricCard
                        label="Civilian"
                        value={metrics.civilianCount || 0}
                        icon={Users}
                        color="warning"
                    />
                </div>
                <div onClick={() => onFilterType('SYSTEM')} style={{ cursor: 'pointer', opacity: currentTypeFilter === 'SYSTEM' ? 1 : 0.7 }}>
                    <MetricCard
                        label="System"
                        value={metrics.systemCount || 0}
                        icon={Activity}
                        color="primary" // Reusing primary as per design doc usually implying specific colors, defaulting here
                    />
                </div>
            </div>

            {/* Secondary Section - Read Status */}
            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                gap: '1.5rem',
                background: '#f8f9fa',
                padding: '1.5rem',
                borderRadius: '1rem',
                border: '1px solid #e0e0e0'
            }}>
                <div onClick={() => onFilterRead(false)} style={{ cursor: 'pointer', opacity: currentReadFilter === false ? 1 : 0.7 }}>
                    <MetricCard
                        label="Unread Notifications"
                        value={metrics.unreadCount || 0}
                        icon={Mail}
                        color="error" // Highlight unread
                    />
                </div>
                <div onClick={() => onFilterRead(true)} style={{ cursor: 'pointer', opacity: currentReadFilter === true ? 1 : 0.7 }}>
                    <MetricCard
                        label="Read Notifications"
                        value={metrics.readCount || 0}
                        icon={MailOpen}
                        color="primary" // Neutral/Good
                    />
                </div>
            </div>
        </div>
    );
};

export default NotificationMetrics;

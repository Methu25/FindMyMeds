import React from 'react';

const StatusBadge = ({ status }) => {
    const getStyles = (status) => {
        switch (status?.toUpperCase()) {
            case 'ACTIVE':
            case 'RESOLVED':
                return { bg: '#dcfce7', color: '#166534', label: 'Active' }; // Green
            case 'DEACTIVATED':
            case 'PENDING':
                return { bg: '#fef9c3', color: '#854d0e', label: 'Deactivated' }; // Yellow
            case 'REMOVED':
            case 'REJECTED':
                return { bg: '#fee2e2', color: '#991b1b', label: 'Removed' }; // Red
            case 'ONGOING':
            case 'IN_PROGRESS':
                return { bg: '#dbeafe', color: '#1e40af', label: 'Ongoing' }; // Blue
            default:
                return { bg: '#f3f4f6', color: '#374151', label: status }; // Gray
        }
    };

    const style = getStyles(status);

    return (
        <span style={{
            backgroundColor: style.bg,
            color: style.color,
            padding: '0.25rem 0.75rem',
            borderRadius: '9999px',
            fontSize: '0.875rem',
            fontWeight: 600,
            display: 'inline-block'
        }}>
            {status ? (status.charAt(0).toUpperCase() + status.slice(1).toLowerCase()) : 'Unknown'}
        </span>
    );
};

export default StatusBadge;

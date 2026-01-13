import React from 'react';
import StatusBadge from '../common/StatusBadge';
import { Eye, Edit, Trash2, Power } from 'lucide-react';

const AdminTable = ({ admins, onView, onEdit, onStatusChange }) => {
    return (
        <div className="glass-panel" style={{ overflow: 'hidden', background: 'white' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                <thead style={{ backgroundColor: 'rgba(47, 164, 169, 0.05)', borderBottom: '1px solid #e5e7eb' }}>
                    <tr>
                        <th style={{ padding: '1rem', color: 'var(--primary)', fontWeight: 600 }}>Admin ID</th>
                        <th style={{ padding: '1rem', color: 'var(--primary)', fontWeight: 600 }}>Name</th>
                        <th style={{ padding: '1rem', color: 'var(--primary)', fontWeight: 600 }}>Email</th>
                        <th style={{ padding: '1rem', color: 'var(--primary)', fontWeight: 600 }}>Role</th>
                        <th style={{ padding: '1rem', color: 'var(--primary)', fontWeight: 600 }}>Status</th>
                        <th style={{ padding: '1rem', color: 'var(--primary)', fontWeight: 600 }}>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {admins.map((admin) => (
                        <tr key={admin.id} style={{ borderBottom: '1px solid #f3f4f6', transition: 'background-color 0.2s' }} className="hover:bg-gray-50">
                            <td style={{ padding: '1rem', fontWeight: 500 }}>#{admin.id}</td>
                            <td style={{ padding: '1rem' }}>{admin.fullName}</td>
                            <td style={{ padding: '1rem', color: 'var(--text-muted)' }}>{admin.email}</td>
                            <td style={{ padding: '1rem' }}>{admin.role}</td>
                            <td style={{ padding: '1rem' }}>
                                <StatusBadge status={admin.status} />
                            </td>
                            <td style={{ padding: '1rem' }}>
                                <div style={{ display: 'flex', gap: '0.5rem' }}>
                                    <button onClick={() => onView(admin)} className="btn" style={{ padding: '0.4rem', backgroundColor: '#e0f2fe', color: '#0284c7' }} title="View Details">
                                        <Eye size={18} />
                                    </button>
                                    <button onClick={() => onStatusChange(admin)} className="btn" style={{ padding: '0.4rem', backgroundColor: '#f3f4f6', color: '#4b5563' }} title="Manage Status">
                                        <Power size={18} />
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {(!admins || admins.length === 0) && (
                <div style={{ padding: '2rem', textAlign: 'center', color: 'var(--text-muted)' }}>
                    No admins found.
                </div>
            )}
        </div>
    );
};

export default AdminTable;

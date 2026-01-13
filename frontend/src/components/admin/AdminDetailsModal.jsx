import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Mail, Shield, User, Power, Trash2 } from 'lucide-react';
import StatusBadge from '../common/StatusBadge';

const AdminDetailsModal = ({ isOpen, onClose, admin, onUpdateEmail, onStatusChange }) => {
    const [isEditingEmail, setIsEditingEmail] = useState(false);
    const [email, setEmail] = useState(admin?.email || '');

    // Reset email when admin changes
    React.useEffect(() => {
        if (admin) setEmail(admin.email);
    }, [admin]);

    if (!isOpen || !admin) return null;

    const handleEmailSave = () => {
        onUpdateEmail(admin.id, email);
        setIsEditingEmail(false);
    };

    return (
        <AnimatePresence>
            <div style={{
                position: 'fixed', inset: 0, zIndex: 50, display: 'flex',
                alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(4px)'
            }}>
                <motion.div
                    initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 20 }}
                    className="glass-panel"
                    style={{ width: '100%', maxWidth: '700px', background: 'white', padding: '0', overflow: 'hidden' }}
                >
                    {/* Header */}
                    <div style={{ padding: '1.5rem', borderBottom: '1px solid #e5e7eb', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <h2 style={{ fontSize: '1.25rem', fontWeight: 'bold' }}>Admin Details</h2>
                        <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer' }}><X size={24} className="text-muted" /></button>
                    </div>

                    <div style={{ padding: '2rem', display: 'flex', gap: '2rem' }}>
                        {/* Sidebar Info */}
                        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}>
                            <div style={{ width: '100px', height: '100px', borderRadius: '50%', backgroundColor: '#e5f5f6', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2.5rem', color: 'var(--primary)', fontWeight: 'bold' }}>
                                {admin.fullName.charAt(0)}
                            </div>
                            <div style={{ textAlign: 'center' }}>
                                <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold' }}>{admin.fullName}</h3>
                                <p className="text-muted">ID: #{admin.id}</p>
                            </div>
                            <StatusBadge status={admin.status} />
                        </div>

                        {/* Details Form */}
                        <div style={{ flex: 2, display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>

                            {/* Read Only Fields */}
                            <div className="glass-panel" style={{ padding: '1rem', background: '#f9fafb' }}>
                                <label className="text-muted" style={{ fontSize: '0.875rem' }}>Role</label>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 600 }}>
                                    <Shield size={16} className="text-primary" /> {admin.role}
                                </div>
                            </div>

                            {/* Email (Editable) */}
                            <div className="glass-panel" style={{ padding: '1rem', background: isEditingEmail ? 'white' : '#f9fafb', border: isEditingEmail ? '1px solid var(--primary)' : '1px solid transparent' }}>
                                <div className="flex-between" style={{ marginBottom: '0.5rem' }}>
                                    <label className="text-muted" style={{ fontSize: '0.875rem' }}>Email</label>
                                    {!isEditingEmail && (
                                        <button onClick={() => setIsEditingEmail(true)} style={{ fontSize: '0.75rem', color: 'var(--primary)', background: 'none', border: 'none', cursor: 'pointer', fontWeight: 600 }}>Update</button>
                                    )}
                                </div>
                                {isEditingEmail ? (
                                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                                        <input
                                            type="email" value={email} onChange={(e) => setEmail(e.target.value)}
                                            style={{ flex: 1, padding: '0.5rem', borderRadius: '0.25rem', border: '1px solid #d1d5db' }}
                                        />
                                        <button onClick={handleEmailSave} className="btn btn-primary" style={{ padding: '0.25rem 0.5rem', fontSize: '0.75rem' }}>Save</button>
                                        <button onClick={() => setIsEditingEmail(false)} className="btn" style={{ padding: '0.25rem 0.5rem', fontSize: '0.75rem', background: '#f3f4f6' }}>Cancel</button>
                                    </div>
                                ) : (
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 500 }}>
                                        <Mail size={16} className="text-primary" /> {admin.email}
                                    </div>
                                )}
                            </div>

                            {/* Actions */}
                            <div style={{ marginTop: '1rem', borderTop: '1px solid #e5e7eb', paddingTop: '1rem' }}>
                                <h4 className="text-muted" style={{ fontSize: '0.875rem', marginBottom: '0.75rem' }}>Actions</h4>
                                <div style={{ display: 'flex', gap: '1rem' }}>
                                    {admin.status === 'ACTIVE' ? (
                                        <button onClick={() => onStatusChange(admin, 'DEACTIVATED')} className="btn" style={{ flex: 1, backgroundColor: '#fef9c3', color: '#854d0e' }}>
                                            <Power size={18} /> Deactivate
                                        </button>
                                    ) : (
                                        <button onClick={() => onStatusChange(admin, 'ACTIVE')} className="btn" style={{ flex: 1, backgroundColor: '#dcfce7', color: '#166534' }}>
                                            <Power size={18} /> Activate
                                        </button>
                                    )}
                                    <button onClick={() => onStatusChange(admin, 'REMOVED')} className="btn btn-danger" style={{ flex: 1 }}>
                                        <Trash2 size={18} /> Remove
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </AnimatePresence>
    );
};

export default AdminDetailsModal;

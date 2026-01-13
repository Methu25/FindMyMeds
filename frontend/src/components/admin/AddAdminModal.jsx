import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, UserPlus, FileText } from 'lucide-react';
import axios from 'axios';

const AddAdminModal = ({ isOpen, onClose, onSuccess }) => {
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        role: 'ADMIN',
        status: 'ACTIVE',
        password: '',
        confirmPassword: ''
    });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    // Hardcoded for demo if backend offline
    const API_URL = 'http://localhost:8081/api/admin/management';

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        if (formData.password !== formData.confirmPassword) {
            setError("Passwords do not match");
            return;
        }

        setLoading(true);
        try {
            await axios.post(API_URL, {
                fullName: formData.fullName,
                email: formData.email,
                role: formData.role,
                status: formData.status,
                passwordHash: formData.password // Backend expects passwordHash or handle mapping
            }, {
                params: { creatorId: 1 } // Hardcoded ID
            });
            onSuccess();
            onClose();
            setFormData({ fullName: '', email: '', role: 'ADMIN', status: 'ACTIVE', password: '', confirmPassword: '' });
        } catch (err) {
            console.error(err);
            setError("Failed to create admin. Email might be in use.");
        } finally {
            setLoading(false);
        }
    };

    if (!isOpen) return null;

    return (
        <AnimatePresence>
            <div style={{
                position: 'fixed',
                inset: 0,
                zIndex: 50,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: 'rgba(0, 0, 0, 0.5)',
                backdropFilter: 'blur(4px)'
            }}>
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    className="glass-panel"
                    style={{ width: '100%', maxWidth: '600px', background: 'white', padding: '2rem', maxHeight: '90vh', overflowY: 'auto' }}
                >
                    <div className="flex-between" style={{ marginBottom: '1.5rem' }}>
                        <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                            <UserPlus className="text-primary" /> Add New Admin
                        </h2>
                        <button onClick={onClose} style={{ border: 'none', background: 'none', cursor: 'pointer' }}>
                            <X size={24} className="text-muted" />
                        </button>
                    </div>

                    {error && (
                        <div style={{ padding: '0.75rem', backgroundColor: '#fee2e2', color: '#b91c1c', borderRadius: '0.5rem', marginBottom: '1rem' }}>
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        <div>
                            <label style={{ display: 'block', fontWeight: 500, marginBottom: '0.5rem' }}>Full Name</label>
                            <input
                                type="text"
                                name="fullName"
                                value={formData.fullName}
                                onChange={handleChange}
                                required
                                style={{ width: '100%', padding: '0.75rem', borderRadius: '0.5rem', border: '1px solid #d1d5db', outline: 'none' }}
                                placeholder="Ex. John Doe"
                            />
                        </div>

                        <div>
                            <label style={{ display: 'block', fontWeight: 500, marginBottom: '0.5rem' }}>Email</label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                                style={{ width: '100%', padding: '0.75rem', borderRadius: '0.5rem', border: '1px solid #d1d5db', outline: 'none' }}
                                placeholder="Ex. john@example.com"
                            />
                        </div>

                        <div style={{ display: 'flex', gap: '1rem' }}>
                            <div style={{ flex: 1 }}>
                                <label style={{ display: 'block', fontWeight: 500, marginBottom: '0.5rem' }}>Role</label>
                                <select
                                    name="role"
                                    value={formData.role}
                                    onChange={handleChange}
                                    style={{ width: '100%', padding: '0.75rem', borderRadius: '0.5rem', border: '1px solid #d1d5db', outline: 'none' }}
                                >
                                    <option value="ADMIN">Admin</option>
                                    <option value="SUPER_ADMIN">Super Admin</option>
                                </select>
                            </div>
                            <div style={{ flex: 1 }}>
                                <label style={{ display: 'block', fontWeight: 500, marginBottom: '0.5rem' }}>Status</label>
                                <select
                                    name="status"
                                    value={formData.status}
                                    onChange={handleChange}
                                    style={{ width: '100%', padding: '0.75rem', borderRadius: '0.5rem', border: '1px solid #d1d5db', outline: 'none' }}
                                >
                                    <option value="ACTIVE">Active</option>
                                    <option value="DEACTIVATED">Deactivated</option>
                                </select>
                            </div>
                        </div>

                        <div style={{ display: 'flex', gap: '1rem' }}>
                            <div style={{ flex: 1 }}>
                                <label style={{ display: 'block', fontWeight: 500, marginBottom: '0.5rem' }}>Password</label>
                                <input
                                    type="password"
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    required
                                    style={{ width: '100%', padding: '0.75rem', borderRadius: '0.5rem', border: '1px solid #d1d5db', outline: 'none' }}
                                />
                            </div>
                            <div style={{ flex: 1 }}>
                                <label style={{ display: 'block', fontWeight: 500, marginBottom: '0.5rem' }}>Confirm Password</label>
                                <input
                                    type="password"
                                    name="confirmPassword"
                                    value={formData.confirmPassword}
                                    onChange={handleChange}
                                    required
                                    style={{ width: '100%', padding: '0.75rem', borderRadius: '0.5rem', border: '1px solid #d1d5db', outline: 'none' }}
                                />
                            </div>
                        </div>

                        <div style={{ marginTop: '1rem', display: 'flex', justifyContent: 'flex-end', gap: '1rem' }}>
                            <button type="button" onClick={onClose} className="btn" style={{ backgroundColor: '#f3f4f6' }}>Cancel</button>
                            <button type="submit" disabled={loading} className="btn btn-primary">
                                {loading ? 'Adding...' : 'Add Admin'}
                            </button>
                        </div>
                    </form>
                </motion.div>
            </div>
        </AnimatePresence>
    );
};

export default AddAdminModal;

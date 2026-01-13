import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Calendar, AlertCircle, FileText, ChevronRight, MessageSquare } from 'lucide-react';
import StatusBadge from '../common/StatusBadge';
import axios from 'axios';

const ReportDetailsModal = ({ isOpen, onClose, report, onUpdate }) => {
    const [internalNotes, setInternalNotes] = useState('');
    const [loading, setLoading] = useState(false);

    // Hardcoded port 8081
    const API_URL = 'http://localhost:8081/api/admin/reports';

    useEffect(() => {
        if (report) {
            setInternalNotes(report.internalNotes || '');
        }
    }, [report]);

    if (!isOpen || !report) return null;

    const handleStatusChange = async (newStatus) => {
        if (!window.confirm(`Mark this report as ${newStatus}?`)) return;
        try {
            setLoading(true);
            await axios.patch(`${API_URL}/${report.id}/status`, null, {
                params: { status: newStatus, adminId: 1 } // Hardcoded adminId
            });
            onUpdate();
            onClose();
        } catch (error) {
            console.error("Status update failed", error);
            alert("Failed to update status");
        } finally {
            setLoading(false);
        }
    };

    const saveNotes = async () => {
        try {
            setLoading(true);
            await axios.patch(`${API_URL}/${report.id}/notes`, internalNotes, {
                headers: { 'Content-Type': 'text/plain' },
                params: { adminId: 1 }
            });
            onUpdate();
            alert("Notes saved");
        } catch (error) {
            console.error("Notes update failed", error);
            alert("Failed to save notes");
        } finally {
            setLoading(false);
        }
    };

    return (
        <AnimatePresence>
            <div style={{
                position: 'fixed', inset: 0, zIndex: 60, display: 'flex',
                alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(4px)'
            }}>
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }}
                    className="glass-panel"
                    style={{ width: '100%', maxWidth: '800px', height: '80vh', background: 'white', padding: '0', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}
                >
                    {/* Header */}
                    <div className="flex-between" style={{ padding: '1.5rem', borderBottom: '1px solid #e5e7eb' }}>
                        <div>
                            <h2 style={{ fontSize: '1.25rem', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                                Report #{report.id}
                                <StatusBadge status={report.status} />
                            </h2>
                            <span className="text-muted" style={{ fontSize: '0.875rem' }}>Submitted on {new Date(report.createdAt).toLocaleString()}</span>
                        </div>
                        <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer' }}><X size={24} className="text-muted" /></button>
                    </div>

                    <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
                        {/* Left: Details */}
                        <div style={{ flex: 3, padding: '2rem', overflowY: 'auto', borderRight: '1px solid #f3f4f6' }}>
                            <div style={{ marginBottom: '2rem' }}>
                                <label className="text-muted" style={{ fontSize: '0.75rem', fontWeight: 600, letterSpacing: '0.05em', textTransform: 'uppercase' }}>Subject</label>
                                <h3 style={{ fontSize: '1.1rem', fontWeight: 600, marginTop: '0.25rem' }}>{report.title}</h3>
                            </div>

                            <div style={{ marginBottom: '2rem' }}>
                                <label className="text-muted" style={{ fontSize: '0.75rem', fontWeight: 600, letterSpacing: '0.05em', textTransform: 'uppercase' }}>Description</label>
                                <p style={{ marginTop: '0.5rem', lineHeight: '1.6', color: '#374151' }}>{report.description}</p>
                            </div>

                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                                <div>
                                    <label className="text-muted" style={{ fontSize: '0.75rem', fontWeight: 600, letterSpacing: '0.05em', textTransform: 'uppercase' }}>Type</label>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: '0.25rem', fontWeight: 500 }}>
                                        <AlertCircle size={16} className="text-primary" /> {report.type}
                                    </div>
                                </div>
                                <div>
                                    <label className="text-muted" style={{ fontSize: '0.75rem', fontWeight: 600, letterSpacing: '0.05em', textTransform: 'uppercase' }}>Priority</label>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: '0.25rem', fontWeight: 500, color: report.priority === 'HIGH' ? 'var(--danger)' : 'inherit' }}>
                                        {report.priority}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Right: Actions & Notes */}
                        <div style={{ flex: 2, padding: '1.5rem', backgroundColor: '#f9fafb', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>

                            {/* Status Actions */}
                            <div className="glass-panel" style={{ padding: '1.5rem', background: 'white' }}>
                                <h4 style={{ fontWeight: 600, marginBottom: '1rem' }}>Update Status</h4>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                                    {report.status === 'PENDING' && (
                                        <button onClick={() => handleStatusChange('ONGOING')} className="btn btn-primary" style={{ justifyContent: 'center' }}>
                                            Start Investigation
                                        </button>
                                    )}
                                    {(report.status === 'PENDING' || report.status === 'ONGOING') && (
                                        <>
                                            <button onClick={() => handleStatusChange('RESOLVED')} className="btn" style={{ justifyContent: 'center', backgroundColor: '#dcfce7', color: '#166534' }}>
                                                Resolve Report
                                            </button>
                                            <button onClick={() => handleStatusChange('REJECTED')} className="btn" style={{ justifyContent: 'center', backgroundColor: '#fee2e2', color: '#991b1b' }}>
                                                Reject Report
                                            </button>
                                        </>
                                    )}
                                    {(report.status === 'RESOLVED' || report.status === 'REJECTED') && (
                                        <div style={{ textAlign: 'center', color: 'var(--text-muted)', fontSize: '0.875rem' }}>
                                            This report is closed.
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Internal Notes */}
                            <div className="glass-panel" style={{ padding: '1.5rem', background: 'white', flex: 1, display: 'flex', flexDirection: 'column' }}>
                                <h4 style={{ fontWeight: 600, marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                    <MessageSquare size={16} /> Internal Notes
                                </h4>
                                <textarea
                                    value={internalNotes}
                                    onChange={(e) => setInternalNotes(e.target.value)}
                                    placeholder="Add internal notes visible only to admins..."
                                    style={{ flex: 1, width: '100%', padding: '0.75rem', borderRadius: '0.5rem', border: '1px solid #e5e7eb', resize: 'none', outline: 'none', marginBottom: '1rem' }}
                                />
                                <button onClick={saveNotes} disabled={loading} className="btn" style={{ backgroundColor: '#f3f4f6', alignSelf: 'flex-end' }}>
                                    Save Notes
                                </button>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </AnimatePresence>
    );
};

export default ReportDetailsModal;

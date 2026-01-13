import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Users, UserCheck, UserX, Trash, Plus } from 'lucide-react';
import MetricCard from '../components/common/MetricCard';
import AdminTable from '../components/admin/AdminTable';
import ConfirmationModal from '../components/common/ConfirmationModal';
import AddAdminModal from '../components/admin/AddAdminModal';
import AdminDetailsModal from '../components/admin/AdminDetailsModal';

// Configure Axios base URL directly or via proxy (assuming proxy in vite.config.js or direct CORS)
// For now, hardcoding localhost:8080
const API_URL = 'http://localhost:8081/api/admin/management';

const AdminManagement = () => {
    const [metrics, setMetrics] = useState({ total: 0, active: 0, deactivated: 0, removed: 0 });
    const [admins, setAdmins] = useState([]);
    const [loading, setLoading] = useState(true);

    // Modals state
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
    const [isStatusModalOpen, setIsStatusModalOpen] = useState(false);

    const [selectedAdmin, setSelectedAdmin] = useState(null); // For status change modal
    const [detailsAdmin, setDetailsAdmin] = useState(null);   // For details modal

    // Mock fallback data in case backend is offline for demo
    const mockMetrics = { total: 12, active: 8, deactivated: 2, removed: 2 };
    const mockAdmins = [
        { id: 1001, fullName: 'John Doe', email: 'john@example.com', role: 'ADMIN', status: 'ACTIVE' },
        { id: 1002, fullName: 'Jane Smith', email: 'jane@example.com', role: 'ADMIN', status: 'DEACTIVATED' },
    ];

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            setLoading(true);
            const [metricsRes, adminsRes] = await Promise.all([
                axios.get(`${API_URL}/metrics`),
                axios.get(API_URL)
            ]);
            setMetrics(metricsRes.data);
            setAdmins(adminsRes.data);
        } catch (error) {
            console.error("Error fetching data, using mock data for demo", error);
            setMetrics(mockMetrics);
            setAdmins(mockAdmins);
        } finally {
            setLoading(false);
        }
    };

    const handleStatusChangeAction = (admin) => {
        setSelectedAdmin(admin);
        setIsStatusModalOpen(true);
    };

    const handleView = (admin) => {
        setDetailsAdmin(admin);
        setIsDetailsModalOpen(true);
    };

    const updateEmail = async (id, newEmail) => {
        try {
            await axios.patch(`${API_URL}/${id}/email`, null, { params: { email: newEmail, updaterId: 1 } });
            fetchData();
            // Update local details admin logic if needed, or just fetch data
            setDetailsAdmin(prev => ({ ...prev, email: newEmail }));
        } catch (e) {
            console.error("Failed to update email", e);
            alert("Failed to update email");
        }
    };

    const handleModalStatusChange = (admin, status) => {
        // Close details modal and open confirmation logic, or just do it?
        // Let's use the standard confirmation modal
        setIsDetailsModalOpen(false);
        setSelectedAdmin(admin);
        // We need to pass the *intended* status to the confirmation modal logic
        // But currently confirmation modal toggles. Let's make confirmation modal smarter or just separate.
        // For simplicity, I'll just open the confirmation modal which toggles.
        // If we want specific actions (Remove vs Deactivate), we need to update ConfirmationModal logic.
        // Let's hack: The confirmation modal logic below toggles ACTIVE/DEACTIVATED.
        // If 'REMOVED' is requested, we need custom logic.
        if (status === 'REMOVED') {
            // Special case
            if (window.confirm(`Are you sure you want to remove ${admin.fullName}?`)) {
                changeStatus(admin, 'REMOVED');
            }
        } else {
            setIsStatusModalOpen(true);
        }
    };

    const changeStatus = async (admin, status) => {
        try {
            await axios.patch(`${API_URL}/${admin.id}/status`, null, {
                params: { status: status, updaterId: 1 }
            });
            fetchData();
            return true;
        } catch (error) {
            console.error("Failed to update status", error);
            alert("Failed to update status");
            return false;
        }
    };

    const confirmStatusChange = async () => {
        if (!selectedAdmin) return;
        const newStatus = selectedAdmin.status === 'ACTIVE' ? 'DEACTIVATED' : 'ACTIVE';
        const success = await changeStatus(selectedAdmin, newStatus);
        if (success) setIsStatusModalOpen(false);
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>

            {/* Header */}
            <h1 style={{ fontSize: '1.875rem', fontWeight: 'bold', color: 'var(--text-dark)' }}>Admin Management</h1>

            {/* Metrics Row */}
            <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap' }}>
                <MetricCard label="Total Admins" value={metrics.total} icon={Users} color="primary" />
                <MetricCard label="Active Admins" value={metrics.active} icon={UserCheck} color="success" />
                <MetricCard label="Deactivated Admins" value={metrics.deactivated} icon={UserX} color="warning" />
                <MetricCard label="Removed Admins" value={metrics.removed} icon={Trash} color="danger" />
            </div>

            {/* Main Content Area: Table + Right Sidebar Actions */}
            <div style={{ display: 'flex', gap: '2rem', alignItems: 'flex-start' }}>

                {/* Left: Table */}
                <div style={{ flex: 3 }}>
                    <AdminTable
                        admins={admins}
                        onView={handleView}
                        onStatusChange={handleStatusChangeAction}
                    />
                </div>

                {/* Right: Quick Actions */}
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                    {/* Super Admin Tools Card */}
                    <div className="glass-panel" style={{ padding: '1.5rem', backgroundColor: '#fee2e2' }}>
                        <h3 style={{ fontSize: '1.1rem', fontWeight: 'bold', color: '#b91c1c', marginBottom: '1rem' }}>Super Admin Tools</h3>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                            <button onClick={() => setIsAddModalOpen(true)} className="btn btn-danger" style={{ justifyContent: 'center' }}>
                                <Plus size={18} /> Add Admin
                            </button>
                            <button className="btn btn-danger" style={{ justifyContent: 'center', opacity: 0.9 }}>
                                Reports & Inquiries
                            </button>
                        </div>
                    </div>

                    {/* Reports Summary Card (Placeholder) */}
                    <div className="glass-panel" style={{ padding: '1.5rem' }}>
                        <h3 style={{ fontSize: '1.1rem', fontWeight: 'bold', color: 'var(--primary)', marginBottom: '1rem' }}>Reports & Inquiry</h3>
                        {/* Categories */}
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                            {['Pending', 'Ongoing', 'Resolved', 'Rejected'].map(status => (
                                <div key={status} style={{
                                    padding: '0.75rem',
                                    backgroundColor: 'white',
                                    borderRadius: '0.5rem',
                                    fontWeight: 500,
                                    textAlign: 'center',
                                    boxShadow: '0 1px 2px rgba(0,0,0,0.05)'
                                }}>
                                    {status}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Modals */}
            <ConfirmationModal
                isOpen={isStatusModalOpen}
                onClose={() => setIsStatusModalOpen(false)}
                onConfirm={confirmStatusChange}
                title={selectedAdmin?.status === 'ACTIVE' ? "Deactivate Admin?" : "Activate Admin?"}
                message={`Are you sure you want to ${selectedAdmin?.status === 'ACTIVE' ? 'deactivate' : 'activate'} ${selectedAdmin?.fullName}?`}
                type={selectedAdmin?.status === 'ACTIVE' ? "danger" : "primary"}
            />

            <AddAdminModal
                isOpen={isAddModalOpen}
                onClose={() => setIsAddModalOpen(false)}
                onSuccess={fetchData}
            />

            <AdminDetailsModal
                isOpen={isDetailsModalOpen}
                onClose={() => setIsDetailsModalOpen(false)}
                admin={detailsAdmin}
                onUpdateEmail={updateEmail}
                onStatusChange={handleModalStatusChange}
            />
        </div>
    );
};

export default AdminManagement;

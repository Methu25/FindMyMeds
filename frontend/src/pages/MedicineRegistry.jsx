import React, { useState, useEffect } from 'react';
import MetricCard from '../components/common/MetricCard';
import MedicineTable from '../components/medicine/MedicineTable';
import { Pill, Activity, Archive, AlertCircle, Plus, Search, FileText } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const MedicineRegistry = () => {
    const [stats, setStats] = useState({ total: 0, active: 0, inactive: 0, byType: {} });
    const [loading, setLoading] = useState(true);
    const [filterType, setFilterType] = useState(null);
    const [filterStatus, setFilterStatus] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        fetchStats();
    }, []);

    const fetchStats = async () => {
        try {
            const response = await fetch('http://localhost:8080/api/medicines/stats');
            const data = await response.json();
            setStats(data);
        } catch (error) {
            console.error("Error fetching stats:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleCardClick = (type, status = null) => {
        setFilterType(type);
        setFilterStatus(status);
        // Scroll to table if needed
        document.getElementById('medicine-table-section')?.scrollIntoView({ behavior: 'smooth' });
    };

    const medicineTypes = [
        "TABLET", "CAPSULE", "SYRUP", "INJECTION", "CREAM_OINTMENT", "DROPS", "INHALER", "SUSPENSION", "OTHER"
    ];

    return (
        <div className="container-fluid p-4">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h2 className="text-secondary fw-bold">Medicine Registry</h2>
                <div className="text-muted">Manage system-wide medicine database</div>
            </div>

            {/* Top Metric Cards */}
            <div className="row g-3 mb-4">
                <div className="col-md-4" onClick={() => handleCardClick(null, null)} style={{ cursor: 'pointer' }}>
                    <MetricCard
                        label="Total Medicines"
                        value={stats.total}
                        icon={Pill}
                        color="primary"
                    />
                </div>
                <div className="col-md-4" onClick={() => handleCardClick(null, 'ACTIVE')} style={{ cursor: 'pointer' }}>
                    <MetricCard
                        label="Active Medicines"
                        value={stats.active}
                        icon={Activity}
                        color="success"
                    />
                </div>
                <div className="col-md-4" onClick={() => handleCardClick(null, 'INACTIVE')} style={{ cursor: 'pointer' }}>
                    <MetricCard
                        label="Inactive Medicines"
                        value={stats.inactive}
                        icon={Archive}
                        color="danger"
                    />
                </div>
            </div>

            <div className="row">
                {/* Main Content: Type Cards & Table */}
                <div className="col-lg-9">
                    {/* Medicine Type Cards */}
                    <div className="card mb-4 border-0 shadow-sm">
                        <div className="card-header bg-white border-0">
                            <h5 className="mb-0 text-secondary">Browse by Type</h5>
                        </div>
                        <div className="card-body">
                            <div className="row g-2">
                                {medicineTypes.map(type => (
                                    <div key={type} className="col-md-4 col-sm-6">
                                        <div
                                            className={`card h-100 border p-3 hover-shadow ${filterType === type ? 'border-primary bg-light' : ''}`}
                                            style={{ cursor: 'pointer', transition: 'all 0.2s' }}
                                            onClick={() => handleCardClick(type)}
                                        >
                                            <div className="d-flex justify-content-between align-items-center">
                                                <span className="fw-medium text-capitalize">{type.replace('_', ' ').toLowerCase()}</span>
                                                <span className="badge bg-light text-dark border">
                                                    {stats.byType?.[type] || 0}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Table Section */}
                    <div id="medicine-table-section">
                        <MedicineTable
                            filterType={filterType}
                            filterStatus={filterStatus}
                        />
                    </div>
                </div>

                {/* Right Side Panel */}
                <div className="col-lg-3">
                    {/* Notifications Panel */}
                    <div className="card border-0 shadow-sm mb-4">
                        <div className="card-header bg-white">
                            <h6 className="mb-0 fw-bold text-secondary flex items-center gap-2">
                                <AlertCircle size={16} /> Registry Alerts
                            </h6>
                        </div>
                        <div className="card-body">
                            <ul className="list-group list-group-flush fs-7">
                                {/* Mock Data for now */}
                                <li className="list-group-item px-0 border-0">
                                    <small className="text-muted d-block">Today 10:30 AM</small>
                                    <span className="fw-medium">New medicine added:</span> <span className="text-primary">Panadol Extra</span>
                                </li>
                                <li className="list-group-item px-0 border-0">
                                    <small className="text-muted d-block">Yesterday 4:15 PM</small>
                                    <span className="fw-medium text-danger">Deactivated:</span> <span className="text-dark">Cough Syrup X</span>
                                </li>
                                <li className="list-group-item px-0 border-0">
                                    <small className="text-muted d-block">2 days ago</small>
                                    <span className="fw-medium text-warning">Updated:</span> <span className="text-dark">Amoxicillin 500mg</span>
                                </li>
                            </ul>
                        </div>
                    </div>

                    {/* Quick Launcher */}
                    <div className="card border-0 shadow-sm bg-primary text-white">
                        <div className="card-body">
                            <h6 className="fw-bold mb-3">Quick Actions</h6>
                            <div className="d-grid gap-2">
                                <button className="btn btn-light text-primary text-start fw-medium" onClick={() => navigate('/admin/add-medicine')}>
                                    <Plus size={16} className="me-2" /> Add New Medicine
                                </button>
                                <button className="btn btn-outline-light text-start fw-medium border-0 bg-white-opacity">
                                    <Search size={16} className="me-2" /> Search Registry
                                </button>
                                <button className="btn btn-outline-light text-start fw-medium border-0 bg-white-opacity" onClick={() => handleCardClick(null, 'INACTIVE')}>
                                    <Archive size={16} className="me-2" /> View Inactive
                                </button>
                                <button className="btn btn-outline-light text-start fw-medium border-0 bg-white-opacity">
                                    <FileText size={16} className="me-2" /> Audit Logs
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MedicineRegistry;

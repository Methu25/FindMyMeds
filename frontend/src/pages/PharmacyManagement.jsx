import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import MetricCard from '../components/common/MetricCard';
import PharmacyTable from '../components/pharmacy/PharmacyTable';
import { FiActivity, FiSlash, FiTrash2, FiGrid, FiList } from 'react-icons/fi';

const PharmacyManagement = () => {
    const navigate = useNavigate();
    const [metrics, setMetrics] = useState({ total: 0, active: 0, suspended: 0, removed: 0 });
    const [pharmacies, setPharmacies] = useState([]);
    const [loading, setLoading] = useState(false);
    const [selectedFilter, setSelectedFilter] = useState(null);

    // Mock data fetching or real API calls
    useEffect(() => {
        fetchMetrics();
    }, []);

    const fetchMetrics = async () => {
        try {
            const response = await fetch('http://localhost:8080/api/pharmacies/metrics');
            if (response.ok) {
                const data = await response.json();
                setMetrics(data);
            }
        } catch (error) {
            console.error("Failed to fetch metrics", error);
        }
    };

    const fetchPharmacies = async (filterType, filterValue) => {
        setLoading(true);
        setSelectedFilter(filterValue);
        try {
            let url = 'http://localhost:8080/api/pharmacies';
            if (filterType === 'status') {
                if (filterValue === 'TOTAL') {
                    url = 'http://localhost:8080/api/pharmacies';
                } else {
                    url = `http://localhost:8080/api/pharmacies/by-status?status=${filterValue}`;
                }
            } else if (filterType === 'type') {
                url = `http://localhost:8080/api/pharmacies/by-type?type=${filterValue}`;
            }

            const response = await fetch(url);
            if (response.ok) {
                const data = await response.json();
                setPharmacies(data);
            }
        } catch (error) {
            console.error("Failed to fetch pharmacies", error);
        } finally {
            setLoading(false);
        }
    };

    const pharmacyTypes = [
        "RETAIL", "HOSPITAL", "CLINICAL", "COMPOUNDING", "ONLINE",
        "SPECIALTY", "INDUSTRIAL", "GOVERNMENT", "VETERINARY"
    ];

    return (
        <div className="p-6 space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Pharmacy Management</h1>
                    <p className="text-gray-500">Manage all registered pharmacies and their statuses</p>
                </div>
                <div className="space-x-3">
                    <button
                        onClick={() => navigate('/pharmacy/applications')}
                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    >
                        Pharmacy Applications
                    </button>
                </div>
            </div>

            {/* Metric Cards - Top Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div onClick={() => fetchPharmacies('status', 'TOTAL')} className="cursor-pointer">
                    <MetricCard
                        title="Total Pharmacies"
                        value={metrics.total || 0}
                        icon={FiGrid}
                        color="blue"
                    />
                </div>
                <div onClick={() => fetchPharmacies('status', 'ACTIVE')} className="cursor-pointer">
                    <MetricCard
                        title="Active Pharmacies"
                        value={metrics.active || 0}
                        icon={FiActivity}
                        color="green"
                    />
                </div>
                <div onClick={() => fetchPharmacies('status', 'SUSPENDED')} className="cursor-pointer">
                    <MetricCard
                        title="Suspended"
                        value={metrics.suspended || 0}
                        icon={FiSlash}
                        color="orange"
                    />
                </div>
                <div onClick={() => navigate('/pharmacy/removed')} className="cursor-pointer">
                    {/* Removed pharmacies are handled in a separate page as per request, but clicking card could also load them here if we want. 
                         Request says: "Removed Pharmacies Table Page... Accessed by clicking Removed Pharmacy metric card".
                         So I should navigate or show table. The request says "Accessed by clicking... in Home Page".
                         Implemented as separate page '/pharmacy/removed' for clarity, or just filter?
                         Let's navigate to the separate page for REMOVED as requested.
                     */}
                    <MetricCard
                        title="Removed Pharmacies"
                        value={metrics.removed || 0}
                        icon={FiTrash2}
                        color="red"
                    />
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                {/* Main Content Area - Left/Center */}
                <div className="lg:col-span-3 space-y-6">
                    {/* Pharmacy Type Cards */}
                    <div>
                        <h3 className="text-lg font-semibold text-gray-800 mb-3">Browse by Pharmacy Type</h3>
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
                            {pharmacyTypes.map((type) => (
                                <div
                                    key={type}
                                    onClick={() => fetchPharmacies('type', type)}
                                    className={`
                                        p-3 rounded-xl border cursor-pointer transition-all duration-200 text-center
                                        ${selectedFilter === type
                                            ? 'bg-primary-50 border-primary text-primary font-medium shadow-sm'
                                            : 'bg-white border-gray-100 text-gray-600 hover:border-gray-200 hover:shadow-sm'
                                        }
                                    `}
                                >
                                    <div className="text-sm truncate capitalize">{type.toLowerCase().replace('_', ' ')}</div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Pharmacy Table */}
                    <div>
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-lg font-semibold text-gray-800">
                                {selectedFilter ? `Pharmacies - ${selectedFilter}` : 'Select a category to view pharmacies'}
                            </h3>
                        </div>
                        <PharmacyTable pharmacies={pharmacies} loading={loading} />
                    </div>
                </div>

                {/* Right Side Panel - Notifications & Quick Actions */}
                <div className="lg:col-span-1 space-y-6">
                    {/* Notification Panel */}
                    <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
                        <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                            Notifications
                        </h3>
                        <div className="space-y-3">
                            {/* Mock Notifications */}
                            <div className="p-3 bg-blue-50 rounded-lg text-sm text-blue-800">
                                <span className="font-medium block">New Application</span>
                                Sunrise Pharmacy requested registration.
                            </div>
                            <div className="p-3 bg-yellow-50 rounded-lg text-sm text-yellow-800">
                                <span className="font-medium block">Stock Warning</span>
                                City Hospital Pharmacy low stock.
                            </div>
                        </div>
                    </div>

                    {/* Quick Launcher */}
                    <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
                        <h3 className="font-semibold text-gray-900 mb-4">Quick Actions</h3>
                        <div className="space-y-2">
                            <button
                                onClick={() => navigate('/pharmacy/applications')}
                                className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-lg transition-colors border border-dashed border-gray-200"
                            >
                                + Review Applications
                            </button>
                            <button
                                onClick={() => navigate('/reports')}
                                className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-lg transition-colors border border-dashed border-gray-200"
                            >
                                View Reports & Inquiries
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PharmacyManagement;

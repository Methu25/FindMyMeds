import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import MetricCard from '../components/common/MetricCard';
import StatusBadge from '../components/common/StatusBadge';
import { FiClock, FiCheckCircle, FiXCircle, FiFileText } from 'react-icons/fi';

const PharmacyApplications = () => {
    const navigate = useNavigate();
    const [metrics, setMetrics] = useState({ total: 0, pending: 0, tempApproved: 0, rejected: 0, approved: 0 });
    const [applications, setApplications] = useState([]);
    const [loading, setLoading] = useState(false);
    const [filter, setFilter] = useState('PENDING');

    useEffect(() => {
        fetchMetrics();
        fetchApplications('PENDING');
    }, []);

    const fetchMetrics = async () => {
        try {
            const response = await fetch('http://localhost:8080/api/pharmacy-applications/metrics');
            if (response.ok) {
                const data = await response.json();
                setMetrics(data);
            }
        } catch (error) {
            console.error("Failed to fetch metrics", error);
        }
    };

    const fetchApplications = async (status) => {
        setLoading(true);
        setFilter(status);
        try {
            // If fetching 'Rejected', the user request says 'Rejected Applications' page. Not separate page, but separate state same page?
            // "Pharmacy Applications Page ... Action: Manage/View application"
            // "Rejected Pharmacy Application Details Page... Accessed via Pharmacy Applications Page (Rejected metric)"
            // So same list, just filtered.
            const url = `http://localhost:8080/api/pharmacy-applications/by-status?status=${status}`;
            const response = await fetch(url);
            if (response.ok) {
                const data = await response.json();
                setApplications(data);
            }
        } catch (error) {
            console.error("Failed to fetch applications", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="p-6 space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Pharmacy Applications</h1>
                    <p className="text-gray-500">Review pending registrations and statuses</p>
                </div>
                <button
                    onClick={() => navigate('/pharmacy')}
                    className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                    Back to Pharmacy Management
                </button>
            </div>

            {/* Metric Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div onClick={() => fetchApplications('PENDING')} className="cursor-pointer">
                    <MetricCard
                        title="Pending Review"
                        value={metrics.pending || 0}
                        icon={FiClock}
                        color="orange"
                        active={filter === 'PENDING'}
                    />
                </div>
                <div onClick={() => fetchApplications('TEMP_APPROVED')} className="cursor-pointer">
                    <MetricCard
                        title="Temp. Approved"
                        value={metrics.tempApproved || 0}
                        icon={FiCheckCircle}
                        color="blue"
                        active={filter === 'TEMP_APPROVED'}
                    />
                </div>
                <div onClick={() => fetchApplications('APPROVED')} className="cursor-pointer">
                    <MetricCard
                        title="Approved"
                        value={metrics.approved || 0}
                        icon={FiCheckCircle}
                        color="green"
                        active={filter === 'APPROVED'}
                    />
                </div>
                <div onClick={() => fetchApplications('REJECTED')} className="cursor-pointer">
                    <MetricCard
                        title="Rejected"
                        value={metrics.rejected || 0}
                        icon={FiXCircle}
                        color="red"
                        active={filter === 'REJECTED'}
                    />
                </div>
            </div>

            {/* Applications Table */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="p-4 border-b border-gray-100">
                    <h3 className="font-semibold text-gray-800">
                        {filter.replace('_', ' ')} Applications
                    </h3>
                </div>

                {loading ? (
                    <div className="p-8 text-center text-gray-500">Loading...</div>
                ) : applications.length === 0 ? (
                    <div className="p-8 text-center text-gray-500">No applications found with this status.</div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-gray-50 border-b border-gray-100">
                                    <th className="p-4 text-xs font-semibold text-gray-500 uppercase">ID</th>
                                    <th className="p-4 text-xs font-semibold text-gray-500 uppercase">Pharmacy Name</th>
                                    <th className="p-4 text-xs font-semibold text-gray-500 uppercase">Type</th>
                                    <th className="p-4 text-xs font-semibold text-gray-500 uppercase">Submission Date</th>
                                    <th className="p-4 text-xs font-semibold text-gray-500 uppercase">Status</th>
                                    <th className="p-4 text-xs font-semibold text-gray-500 uppercase">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-50">
                                {applications.map((app) => (
                                    <tr key={app.id} className="hover:bg-gray-50">
                                        <td className="p-4 text-sm text-gray-600">#{app.id}</td>
                                        <td className="p-4 font-medium text-gray-900">{app.pharmacyName}</td>
                                        <td className="p-4 text-sm text-gray-600">{app.pharmacyType}</td>
                                        <td className="p-4 text-sm text-gray-600">
                                            {new Date(app.createdAt).toLocaleDateString()}
                                        </td>
                                        <td className="p-4">
                                            <StatusBadge status={app.applicationStatus} />
                                        </td>
                                        <td className="p-4">
                                            <button
                                                onClick={() => navigate(`/pharmacy/applications/${app.id}`)}
                                                className="px-3 py-1 text-sm border border-gray-200 rounded-md hover:bg-gray-100 text-gray-700"
                                            >
                                                View Details
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
};

export default PharmacyApplications;

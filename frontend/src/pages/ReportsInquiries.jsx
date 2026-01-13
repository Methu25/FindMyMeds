import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import MetricCard from '../components/common/MetricCard';
import { FiMessageSquare, FiCheckCircle, FiAlertCircle } from 'react-icons/fi';
import StatusBadge from '../components/common/StatusBadge';

const ReportsInquiries = () => {
    const navigate = useNavigate();
    const [metrics, setMetrics] = useState({ total: 0, pending: 0, resolved: 0 });
    const [reports, setReports] = useState([]);
    const [loading, setLoading] = useState(false);
    const [filter, setFilter] = useState('TOTAL');

    useEffect(() => {
        fetchMetrics();
        fetchReports('TOTAL');
    }, []);

    const fetchMetrics = async () => {
        try {
            const response = await fetch('http://localhost:8080/api/admin/pharmacy-reports/metrics');
            if (response.ok) {
                const data = await response.json();
                setMetrics(data);
            }
        } catch (error) {
            console.error(error);
        }
    };

    const fetchReports = async (status) => {
        setLoading(true);
        setFilter(status);
        try {
            let url = 'http://localhost:8080/api/admin/pharmacy-reports';
            if (status !== 'TOTAL') {
                url = `http://localhost:8080/api/admin/pharmacy-reports/by-status?status=${status}`;
            }
            const response = await fetch(url);
            if (response.ok) {
                const data = await response.json();
                setReports(data);
            }
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="p-6 space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Reports & Inquiries</h1>
                    <p className="text-gray-500">Manage issues and inquiries from pharmacies</p>
                </div>
                <button onClick={() => navigate('/pharmacy')} className="text-sm text-gray-500 hover:text-gray-900">
                    Back to Dashboard
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div onClick={() => fetchReports('TOTAL')} className="cursor-pointer">
                    <MetricCard
                        title="Total Reports"
                        value={metrics.total || 0}
                        icon={FiMessageSquare}
                        color="blue"
                        active={filter === 'TOTAL'}
                    />
                </div>
                <div onClick={() => fetchReports('PENDING')} className="cursor-pointer">
                    <MetricCard
                        title="Pending"
                        value={metrics.pending || 0}
                        icon={FiAlertCircle}
                        color="orange"
                        active={filter === 'PENDING'}
                    />
                </div>
                <div onClick={() => fetchReports('RESOLVED')} className="cursor-pointer">
                    <MetricCard
                        title="Resolved"
                        value={metrics.resolved || 0}
                        icon={FiCheckCircle}
                        color="green"
                        active={filter === 'RESOLVED'}
                    />
                </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-gray-50 border-b border-gray-100">
                                <th className="p-4 text-xs font-semibold text-gray-500 uppercase">ID</th>
                                <th className="p-4 text-xs font-semibold text-gray-500 uppercase">Type</th>
                                <th className="p-4 text-xs font-semibold text-gray-500 uppercase">Title</th>
                                <th className="p-4 text-xs font-semibold text-gray-500 uppercase">Pharmacy</th>
                                <th className="p-4 text-xs font-semibold text-gray-500 uppercase">Status</th>
                                <th className="p-4 text-xs font-semibold text-gray-500 uppercase">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                            {loading ? (
                                <tr><td colSpan="6" className="p-8 text-center text-gray-500">Loading...</td></tr>
                            ) : reports.length === 0 ? (
                                <tr><td colSpan="6" className="p-8 text-center text-gray-500">No reports found.</td></tr>
                            ) : (
                                reports.map(report => (
                                    <tr key={report.id} className="hover:bg-gray-50">
                                        <td className="p-4 text-sm text-gray-600">#{report.id}</td>
                                        <td className="p-4 text-sm text-gray-600">{report.type}</td>
                                        <td className="p-4 font-medium text-gray-900">{report.title}</td>
                                        <td className="p-4 text-sm text-gray-600">
                                            {report.pharmacy?.pharmacyName || 'N/A'}
                                        </td>
                                        <td className="p-4">
                                            <StatusBadge status={report.status} />
                                        </td>
                                        <td className="p-4">
                                            <button
                                                onClick={() => navigate(`/admin/reports/${report.id}`)}
                                                className="text-primary hover:text-primary-dark font-medium text-sm"
                                            >
                                                View
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default ReportsInquiries;

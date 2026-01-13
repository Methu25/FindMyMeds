import React, { useState, useEffect } from 'react';
import MetricCard from '../components/common/MetricCard';
import StatusBadge from '../components/common/StatusBadge';
import { Eye, CheckCircle } from 'lucide-react';

const CivilianManagement = () => {
    const [metrics, setMetrics] = useState({
        totalCivilians: 0,
        activeCivilians: 0,
        tempBannedCivilians: 0,
        permBannedCivilians: 0
    });
    const [civilians, setCivilians] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filterStatus, setFilterStatus] = useState('TEMP_BANNED'); // Default view

    useEffect(() => {
        fetchMetrics();
    }, []);

    useEffect(() => {
        fetchCivilians();
    }, [filterStatus]);

    const fetchMetrics = async () => {
        try {
            const response = await fetch('http://localhost:8080/api/admin/civilians/metrics');
            if (response.ok) {
                const data = await response.json();
                setMetrics(data);
            }
        } catch (error) {
            console.error('Failed to fetch metrics', error);
        }
    };

    const fetchCivilians = async () => {
        setLoading(true);
        try {
            // If filterStatus is 'ALL', maybe don't pass status param? 
            // But requirement says filtered by status.
            // If Total Civilians clicked, maybe we want ALL?
            // User req: "Clicking a card filters the main table"
            let url = 'http://localhost:8080/api/admin/civilians';
            if (filterStatus !== 'ALL') {
                url += `?status=${filterStatus}`;
            }
            const response = await fetch(url);
            if (response.ok) {
                const data = await response.json();
                setCivilians(data);
            }
        } catch (error) {
            console.error('Failed to fetch civilians', error);
        } finally {
            setLoading(false);
        }
    };

    const handleCardClick = (status) => {
        setFilterStatus(status);
    };

    const handleActivate = async (id) => {
        if (!window.confirm("Are you sure you want to activate this account?")) return;
        try {
            // In real app, we might need adminId. Hardcoding for now or getting from context.
            const response = await fetch(`http://localhost:8080/api/admin/civilians/${id}/activate?adminId=1`, {
                method: 'POST'
            });
            if (response.ok) {
                fetchCivilians();
                fetchMetrics();
            } else {
                alert("Failed to activate");
            }
        } catch (e) {
            console.error(e);
        }
    };

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-6 text-gray-800">Civilian Management</h1>

            {/* Metric Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
                <div onClick={() => handleCardClick('ALL')} className="cursor-pointer">
                    <MetricCard title="Total Civilians" value={metrics.totalCivilians} icon="users" color="blue" />
                </div>
                <div onClick={() => handleCardClick('ACTIVE')} className="cursor-pointer">
                    <MetricCard title="Active Civilians" value={metrics.activeCivilians} icon="check" color="green" />
                </div>
                <div onClick={() => handleCardClick('TEMP_BANNED')} className={`cursor-pointer ring-2 ${filterStatus === 'TEMP_BANNED' ? 'ring-yellow-500' : 'ring-transparent'}`}>
                    <MetricCard title="Temp Banned" value={metrics.tempBannedCivilians} icon="alert" color="yellow" />
                </div>
                <div onClick={() => handleCardClick('PERMANENT_BANNED')} className="cursor-pointer">
                    <MetricCard title="Perm Banned" value={metrics.permBannedCivilians} icon="ban" color="red" />
                </div>
            </div>

            {/* Table */}
            <div className="bg-white rounded-lg shadow overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-200">
                    <h2 className="text-lg font-semibold text-gray-700">
                        {filterStatus === 'ALL' ? 'All Civilians' :
                            filterStatus === 'TEMP_BANNED' ? 'Temporarily Banned Civilians' :
                                filterStatus.replace('_', ' ')}
                    </h2>
                </div>
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Temp Bans</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Appeals</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {loading ? (
                                <tr><td colSpan="7" className="px-6 py-4 text-center">Loading...</td></tr>
                            ) : civilians.length === 0 ? (
                                <tr><td colSpan="7" className="px-6 py-4 text-center">No civilians found.</td></tr>
                            ) : (
                                civilians.map((civilian) => (
                                    <tr key={civilian.id} className="hover:bg-gray-50">
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">#{civilian.id}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{civilian.fullName || civilian.maskedName}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{civilian.email || civilian.maskedEmail}</td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <StatusBadge status={civilian.accountStatus} />
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center">{civilian.tempBanCount}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center">{civilian.appealCount}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                            <div className="flex space-x-2">
                                                <button className="text-blue-600 hover:text-blue-900" title="View Details">
                                                    <Eye size={18} />
                                                </button>
                                                {civilian.accountStatus === 'TEMP_BANNED' && (
                                                    <button
                                                        onClick={() => handleActivate(civilian.id)}
                                                        className="text-green-600 hover:text-green-900"
                                                        title="Activate">
                                                        <CheckCircle size={18} />
                                                    </button>
                                                )}
                                            </div>
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
export default CivilianManagement;

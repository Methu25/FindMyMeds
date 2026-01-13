import React from 'react';
import { useNavigate } from 'react-router-dom';
import StatusBadge from '../common/StatusBadge';

const PharmacyTable = ({ pharmacies, loading }) => {
    const navigate = useNavigate();

    if (loading) return <div className="text-center p-4">Loading...</div>;
    if (!pharmacies || pharmacies.length === 0) return <div className="text-center p-4">No pharmacies found. click on a card to view data</div>;

    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="bg-gray-50 border-b border-gray-100">
                            <th className="p-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">ID</th>
                            <th className="p-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Pharmacy Name</th>
                            <th className="p-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Type</th>
                            <th className="p-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
                            <th className="p-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Location</th>
                            <th className="p-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Contact</th>
                            <th className="p-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                        {pharmacies.map((pharmacy) => (
                            <tr key={pharmacy.id} className="hover:bg-gray-50 transition-colors">
                                <td className="p-4 text-sm text-gray-600">#{pharmacy.id}</td>
                                <td className="p-4">
                                    <div className="font-medium text-gray-900">{pharmacy.pharmacyName}</div>
                                    <div className="text-xs text-gray-500">{pharmacy.email}</div>
                                </td>
                                <td className="p-4 text-sm text-gray-600">{pharmacy.pharmacyType}</td>
                                <td className="p-4">
                                    <StatusBadge status={pharmacy.status} />
                                </td>
                                <td className="p-4 text-sm text-gray-600">{pharmacy.address}</td>
                                <td className="p-4 text-sm text-gray-600">{pharmacy.phone}</td>
                                <td className="p-4">
                                    <button
                                        onClick={() => navigate(`/pharmacy/${pharmacy.id}`)}
                                        className="text-primary hover:text-primary-dark font-medium text-sm transition-colors"
                                    >
                                        View / Manage
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default PharmacyTable;

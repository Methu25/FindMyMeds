import React, { useState } from 'react';
import { X, AlertTriangle } from 'lucide-react';

const BanModal = ({ isOpen, onClose, type, civilianId, onSuccess }) => {
    const [reason, setReason] = useState('');
    const [loading, setLoading] = useState(false);

    if (!isOpen) return null;

    const isPerm = type === 'PERM';
    const title = isPerm ? 'Permanently Ban Account' : 'Temporarily Ban Account';
    const endpoint = isPerm ? 'perm' : 'temp';

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!reason.trim()) return;

        setLoading(true);
        try {
            // Hardcoded adminId
            const response = await fetch(`http://localhost:8080/api/admin/civilians/${civilianId}/ban/${endpoint}?reason=${encodeURIComponent(reason)}&adminId=1`, {
                method: 'POST'
            });

            if (response.ok) {
                onSuccess();
            } else {
                const text = await response.text();
                alert("Failed to ban: " + text);
            }
        } catch (error) {
            console.error(error);
            alert("Error banning user");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-md p-6">
                <div className="flex justify-between items-center mb-4">
                    <h2 className={`text-xl font-bold ${isPerm ? 'text-red-600' : 'text-yellow-600'}`}>{title}</h2>
                    <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
                        <X size={24} />
                    </button>
                </div>

                <div className="bg-gray-50 p-4 rounded mb-4 text-sm text-gray-700">
                    <p className="flex items-center font-semibold mb-2">
                        <AlertTriangle size={16} className="mr-2" />
                        Consequences:
                    </p>
                    {isPerm ? (
                        <ul className="list-disc ml-5 space-y-1">
                            <li>Account login disabled immediately.</li>
                            <li>No appeals allowed.</li>
                            <li>Data auto-deleted after 3 months.</li>
                        </ul>
                    ) : (
                        <ul className="list-disc ml-5 space-y-1">
                            <li>User blocked for 14 days or until appeal approved.</li>
                            <li>Max 2 temporary bans allowed lifetime.</li>
                            <li>14-day appeal window.</li>
                        </ul>
                    )}
                </div>

                <form onSubmit={handleSubmit}>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Reason for Ban <span className="text-red-500">*</span>
                    </label>
                    <textarea
                        className="w-full border border-gray-300 rounded-md p-2 h-24 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Enter detailed reason..."
                        value={reason}
                        onChange={(e) => setReason(e.target.value)}
                        required
                    ></textarea>

                    <div className="flex justify-end mt-6 space-x-3">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={loading}
                            className={`px-4 py-2 rounded-md text-white ${isPerm ? 'bg-red-600 hover:bg-red-700' : 'bg-yellow-500 hover:bg-yellow-600'} ${loading ? 'opacity-50' : ''}`}
                        >
                            {loading ? 'Processing...' : 'Confirm Ban'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default BanModal;

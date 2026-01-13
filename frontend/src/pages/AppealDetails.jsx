import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import StatusBadge from '../components/common/StatusBadge';
import { ArrowLeft, CheckCircle, XCircle } from 'lucide-react';

const AppealDetails = () => {
    const { appealId } = useParams();
    const navigate = useNavigate();
    const [appeal, setAppeal] = useState(null);
    const [loading, setLoading] = useState(true);
    const [reason, setReason] = useState('');

    useEffect(() => {
        fetchAppeal();
    }, [appealId]);

    const fetchAppeal = async () => {
        try {
            const response = await fetch(`http://localhost:8080/api/admin/civilians/appeals/${appealId}`);
            if (response.ok) {
                const data = await response.json();
                setAppeal(data);
            }
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const handleDecision = async (approved) => {
        if (!window.confirm(`Are you sure you want to ${approved ? 'APPROVE' : 'REJECT'} this appeal?`)) return;

        try {
            const response = await fetch(`http://localhost:8080/api/admin/civilians/appeals/${appealId}/process?approved=${approved}&reason=${encodeURIComponent(reason || 'Admin Decision')}&adminId=1`, {
                method: 'POST'
            });

            if (response.ok) {
                alert(`Appeal ${approved ? 'Approved' : 'Rejected'} successfully.`);
                navigate(-1);
            } else {
                alert("Failed to process appeal");
            }
        } catch (error) {
            console.error(error);
        }
    };

    if (loading) return <div className="p-6">Loading...</div>;
    if (!appeal) return <div className="p-6">Appeal not found</div>;

    return (
        <div className="p-6">
            <button onClick={() => navigate(-1)} className="flex items-center text-gray-600 mb-4 hover:text-gray-900">
                <ArrowLeft size={20} className="mr-2" /> Back
            </button>

            <div className="bg-white rounded-lg shadow p-6 max-w-3xl mx-auto">
                <h1 className="text-2xl font-bold text-gray-800 mb-6">Appeal Details</h1>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                    <div>
                        <h3 className="text-sm font-medium text-gray-500 uppercase">Appeal Info</h3>
                        <div className="mt-2 space-y-2">
                            <p><span className="font-medium">ID:</span> #{appeal.id}</p>
                            <p><span className="font-medium">Appeal Number:</span> {appeal.appealNumber}</p>
                            <p><span className="font-medium">Submitted:</span> {new Date(appeal.createdAt).toLocaleString()}</p>
                            <p><span className="font-medium">Status:</span> <StatusBadge status={appeal.status} /></p>
                        </div>
                    </div>
                    <div>
                        <h3 className="text-sm font-medium text-gray-500 uppercase">Civilian Info</h3>
                        <div className="mt-2 space-y-2">
                            {/* Assuming civilian object is included in appeal response, otherwise need separate fetch or check model */}
                            <p><span className="font-medium">Name:</span> {appeal.civilian?.fullName || appeal.civilian?.maskedName}</p>
                            <p><span className="font-medium">ID:</span> #{appeal.civilian?.id}</p>
                        </div>
                    </div>
                </div>

                <div className="mb-8">
                    <h3 className="text-sm font-medium text-gray-500 uppercase mb-2">Appeal Message</h3>
                    <div className="bg-gray-50 p-4 rounded border border-gray-200 text-gray-800 whitespace-pre-wrap">
                        {appeal.appealReason}
                    </div>
                </div>

                {appeal.status === 'PENDING' && (
                    <div className="border-t pt-6">
                        <h3 className="text-lg font-medium text-gray-900 mb-4">Admin Decision</h3>
                        <textarea
                            className="w-full border border-gray-300 rounded-md p-2 h-24 mb-4"
                            placeholder="Enter reason for decision (optional)..."
                            value={reason}
                            onChange={(e) => setReason(e.target.value)}
                        ></textarea>
                        <div className="flex gap-4">
                            <button
                                onClick={() => handleDecision(true)}
                                className="flex-1 bg-green-600 hover:bg-green-700 text-white py-2 rounded flex items-center justify-center font-medium">
                                <CheckCircle className="mr-2" size={20} /> Approve Appeal
                            </button>
                            <button
                                onClick={() => handleDecision(false)}
                                className="flex-1 bg-red-600 hover:bg-red-700 text-white py-2 rounded flex items-center justify-center font-medium">
                                <XCircle className="mr-2" size={20} /> Reject Appeal
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AppealDetails;

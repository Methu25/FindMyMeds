import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import StatusBadge from '../components/common/StatusBadge';
import { FiArrowLeft, FiCheck, FiX, FiAlertTriangle } from 'react-icons/fi';

const ApplicationDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [application, setApplication] = useState(null);
    const [loading, setLoading] = useState(true);
    const [showRejectModal, setShowRejectModal] = useState(false);
    const [rejectionReason, setRejectionReason] = useState('');

    useEffect(() => {
        fetchApplication();
    }, [id]);

    const fetchApplication = async () => {
        try {
            const response = await fetch(`http://localhost:8080/api/pharmacy-applications/${id}`);
            if (response.ok) {
                const data = await response.json();
                setApplication(data);
            }
        } catch (error) {
            console.error("Failed to fetch application", error);
        } finally {
            setLoading(false);
        }
    };

    const handleTempApprove = async () => {
        if (!window.confirm("Are you sure you want to temporarily approve this application?")) return;
        try {
            const response = await fetch(`http://localhost:8080/api/pharmacy-applications/${id}/temp-approve`, {
                method: 'POST'
            });
            if (response.ok) {
                alert("Application temporarily approved.");
                fetchApplication();
            }
        } catch (error) {
            console.error("Action failed", error);
        }
    };

    const handleApprove = async () => {
        if (!window.confirm("Are you sure you want to PERMANENTLY approve this application? This will create a live Pharmacy account.")) return;
        try {
            const response = await fetch(`http://localhost:8080/api/pharmacy-applications/${id}/approve`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ adminId: 1 }) // Mock Admin ID
            });
            if (response.ok) {
                alert("Pharmacy approved and created successfully!");
                navigate('/pharmacy');
            }
        } catch (error) {
            console.error("Action failed", error);
        }
    }

    const handleReject = async () => {
        if (!rejectionReason.trim()) return alert("Rejection reason is required");
        try {
            const response = await fetch(`http://localhost:8080/api/pharmacy-applications/${id}/reject`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ reason: rejectionReason, adminId: 1 })
            });
            if (response.ok) {
                alert("Application rejected.");
                setShowRejectModal(false);
                fetchApplication();
            }
        } catch (error) {
            console.error("Action failed", error);
        }
    };

    if (loading) return <div>Loading...</div>;
    if (!application) return <div>Application not found.</div>;

    const isPending = application.applicationStatus === 'PENDING';
    const isTempApproved = application.applicationStatus === 'TEMP_APPROVED';
    const isRejected = application.applicationStatus === 'REJECTED';
    const isApproved = application.applicationStatus === 'APPROVED';

    return (
        <div className="p-6 max-w-5xl mx-auto space-y-6">
            <button onClick={() => navigate('/pharmacy/applications')} className="flex items-center text-gray-500 hover:text-gray-900 transition-colors">
                <FiArrowLeft className="mr-2" /> Back to Applications
            </button>

            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="p-6 border-b border-gray-100 flex justify-between items-start">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900 mb-2">Pharmacy Application Details</h1>
                        <StatusBadge status={application.applicationStatus} />
                    </div>
                    {/* Action Buttons based on status */}
                    <div className="space-x-3">
                        {isPending && (
                            <>
                                <button
                                    onClick={handleTempApprove}
                                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                                >
                                    Temporarily Approve
                                </button>
                                <button
                                    onClick={() => setShowRejectModal(true)}
                                    className="px-4 py-2 border border-red-200 text-red-600 rounded-lg hover:bg-red-50"
                                >
                                    Reject
                                </button>
                            </>
                        )}
                        {isTempApproved && (
                            <>
                                <button
                                    onClick={handleApprove}
                                    className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                                >
                                    Final Approve (Create Pharmacy)
                                </button>
                                <button
                                    onClick={() => setShowRejectModal(true)}
                                    className="px-4 py-2 border border-red-200 text-red-600 rounded-lg hover:bg-red-50"
                                >
                                    Reject
                                </button>
                            </>
                        )}
                        {isRejected && (
                            <div className="text-red-600 font-medium">This application has been rejected.</div>
                        )}
                        {isApproved && (
                            <div className="text-green-600 font-medium">Pharmacy Created.</div>
                        )}
                    </div>
                </div>

                <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Pharmacy Info */}
                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold text-gray-900 border-b pb-2">Pharmacy Information</h3>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-xs text-gray-500">Pharmacy Name</label>
                                <div className="text-gray-900 font-medium">{application.pharmacyName}</div>
                            </div>
                            <div>
                                <label className="block text-xs text-gray-500">Type</label>
                                <div className="text-gray-900 font-medium">{application.pharmacyType}</div>
                            </div>
                            <div>
                                <label className="block text-xs text-gray-500">License Number</label>
                                <div className="text-gray-900 font-medium">{application.licenseNumber}</div>
                            </div>
                            <div>
                                <label className="block text-xs text-gray-500">District</label>
                                <div className="text-gray-900 font-medium">{application.district || 'N/A'}</div>
                            </div>
                            <div className="col-span-2">
                                <label className="block text-xs text-gray-500">Address</label>
                                <div className="text-gray-900 font-medium">{application.address}</div>
                            </div>
                        </div>
                    </div>

                    {/* Owner Info */}
                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold text-gray-900 border-b pb-2">Owner & Contact</h3>
                        <div className="grid grid-cols-1 gap-4">
                            <div>
                                <label className="block text-xs text-gray-500">Owner Name</label>
                                <div className="text-gray-900 font-medium">{application.ownerName}</div>
                            </div>
                            <div>
                                <label className="block text-xs text-gray-500">Email</label>
                                <div className="text-gray-900 font-medium">{application.email}</div>
                            </div>
                            <div>
                                <label className="block text-xs text-gray-500">Phone</label>
                                <div className="text-gray-900 font-medium">{application.phone}</div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Documents Section */}
                <div className="p-6 bg-gray-50 border-t border-gray-100">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Uploaded Documents</h3>
                    <div className="text-sm text-gray-600">
                        {application.documents ? (
                            <div>Documents available (Simulated view)</div>
                        ) : (
                            <div className="italic text-gray-400">No documents uploaded</div>
                        )}
                    </div>
                </div>
            </div>

            {/* Rejection Modal */}
            {showRejectModal && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-xl p-6 w-full max-w-md shadow-2xl">
                        <h3 className="text-xl font-bold text-gray-900 mb-4 text-red-600">Reject Application</h3>
                        <p className="mb-4 text-gray-600 text-sm">Please provide a reason for rejection. This will be sent to the applicant.</p>
                        <textarea
                            className="w-full border border-gray-300 rounded-lg p-3 text-sm focus:ring-2 focus:ring-red-500 outline-none"
                            rows={4}
                            placeholder="Reason for rejection..."
                            value={rejectionReason}
                            onChange={(e) => setRejectionReason(e.target.value)}
                        />
                        <div className="flex justify-end gap-3 mt-4">
                            <button
                                onClick={() => setShowRejectModal(false)}
                                className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleReject}
                                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                            >
                                Confirm Rejection
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ApplicationDetails;

import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import StatusBadge from '../components/common/StatusBadge';
import BanModal from '../components/common/BanModal'; // Will create next
import { ArrowLeft, AlertTriangle } from 'lucide-react';

const CivilianDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [civilian, setCivilian] = useState(null);
    const [loading, setLoading] = useState(true);
    const [showBanModal, setShowBanModal] = useState(false);
    const [banType, setBanType] = useState('TEMP'); // TEMP or PERM

    const [appeals, setAppeals] = useState([]);

    useEffect(() => {
        fetchCivilian();
        fetchAppeals();
    }, [id]);

    const fetchCivilian = async () => {
        try {
            const response = await fetch(`http://localhost:8080/api/admin/civilians/${id}`);
            if (response.ok) {
                const data = await response.json();
                setCivilian(data);
            }
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const fetchAppeals = async () => {
        try {
            const response = await fetch(`http://localhost:8080/api/admin/civilians/${id}/appeals`);
            if (response.ok) {
                const data = await response.json();
                setAppeals(data);
            }
        } catch (error) {
            console.error(error);
        }
    };

    const handleBanClick = (type) => {
        setBanType(type);
        setShowBanModal(true);
    };

    const onBanSuccess = () => {
        setShowBanModal(false);
        fetchCivilian();
    };

    const handleViewAppeal = () => {
        // Find latest appeal
        if (appeals.length > 0) {
            // Assuming sorted or we sort
            const latest = appeals.sort((a, b) => b.id - a.id)[0];
            navigate(`/civilian/appeal/${latest.id}`);
        } else {
            alert("No appeals found. User has not submitted an appeal yet.");
        }
    };

    const handleVIVO = () => {
        if (window.confirm("Perform Data Masking/Anonymization? This cannot be undone.")) {
            // trigger mask
            fetch(`http://localhost:8080/api/admin/civilians/${id}/mask?adminId=1`, { method: 'POST' })
                .then(res => {
                    if (res.ok) {
                        fetchCivilian();
                        alert("Data Masked");
                    } else {
                        alert("Failed to mask data");
                    }
                });
        }
    };

    if (loading) return <div className="p-6">Loading...</div>;
    if (!civilian) return <div className="p-6">Civilian not found</div>;

    return (
        <div className="p-6">
            <button onClick={() => navigate(-1)} className="flex items-center text-gray-600 mb-4 hover:text-gray-900">
                <ArrowLeft size={20} className="mr-2" /> Back
            </button>

            <div className="bg-white rounded-lg shadow p-6 mb-6">
                <div className="flex justify-between items-start">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-800">{civilian.fullName || civilian.maskedName}</h1>
                        <p className="text-gray-500">{civilian.email || civilian.maskedEmail}</p>
                    </div>
                    <StatusBadge status={civilian.accountStatus} />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                    <div>
                        <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-2">Account Overview</h3>
                        <div className="space-y-3">
                            <div className="flex justify-between border-b pb-2">
                                <span className="text-gray-600">Civilian ID</span>
                                <span className="font-medium">#{civilian.id}</span>
                            </div>
                            <div className="flex justify-between border-b pb-2">
                                <span className="text-gray-600">NIC Number</span>
                                <span className="font-medium">{civilian.nicNumber || civilian.maskedNic}</span>
                            </div>
                            <div className="flex justify-between border-b pb-2">
                                <span className="text-gray-600">Contact</span>
                                <span className="font-medium">{civilian.phone || 'N/A'}</span>
                            </div>
                        </div>
                    </div>

                    <div>
                        <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-2">Ban & Appeal Status</h3>
                        <div className="space-y-3">
                            <div className="flex justify-between border-b pb-2">
                                <span className="text-gray-600">Temp Ban Count</span>
                                <span className={`font-medium ${civilian.tempBanCount >= 2 ? 'text-red-600' : 'text-gray-900'}`}>{civilian.tempBanCount} / 2</span>
                            </div>
                            <div className="flex justify-between border-b pb-2">
                                <span className="text-gray-600">Appeal Count</span>
                                <span className={`font-medium ${civilian.appealCount >= 2 ? 'text-red-600' : 'text-gray-900'}`}>{civilian.appealCount} / 2</span>
                            </div>
                            {civilian.banDate && (
                                <div className="flex justify-between border-b pb-2">
                                    <span className="text-gray-600">Last Ban Date</span>
                                    <span className="font-medium">{new Date(civilian.banDate).toLocaleDateString()}</span>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Warnings */}
                {(civilian.tempBanCount >= 2 || civilian.appealCount >= 2) && (
                    <div className="mt-6 bg-red-50 p-4 rounded-md flex items-start text-red-700">
                        <AlertTriangle className="mr-3 flex-shrink-0" />
                        <div>
                            <h4 className="font-bold">Critical Threshold Reached</h4>
                            <p className="text-sm">This account is at or exceeding the maximum limits for bans or appeals. Next violation results in Permanent Ban.</p>
                        </div>
                    </div>
                )}
            </div>

            {/* Actions */}
            <div className="flex gap-4">
                {civilian.accountStatus === 'ACTIVE' && (
                    <>
                        <button
                            onClick={() => handleBanClick('TEMP')}
                            className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded shadow">
                            Temporary Ban
                        </button>
                        <button
                            onClick={() => handleBanClick('PERM')}
                            className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded shadow">
                            Permanent Ban
                        </button>
                    </>
                )}

                {civilian.accountStatus === 'TEMP_BANNED' && (
                    <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded shadow" onClick={handleViewAppeal}>
                        View Appeal Details
                    </button>
                )}

                {civilian.accountStatus === 'PERMANENT_BANNED' && (
                    <button className="bg-gray-800 hover:bg-gray-900 text-white px-4 py-2 rounded shadow" onClick={handleVIVO}>
                        VIVO Manage (Mask Data)
                    </button>
                )}
            </div>

            {showBanModal && <BanModal
                isOpen={showBanModal}
                onClose={() => setShowBanModal(false)}
                type={banType}
                civilianId={civilian.id}
                onSuccess={onBanSuccess}
            />}
        </div>
    );
};
export default CivilianDetails;

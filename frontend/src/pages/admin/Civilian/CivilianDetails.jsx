import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ChevronLeft, User, Phone, Mail, Shield, AlertTriangle, CheckCircle, Clock } from "lucide-react";
import { fetchCivilianDetails, tempBanCivilian, permanentBanCivilian } from "../../../api/civilianAdminApi";

export default function CivilianDetails() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [civilian, setCivilian] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Ban Modal State
    const [showBanModal, setShowBanModal] = useState(false);
    const [banType, setBanType] = useState(""); // 'TEMP' or 'PERMANENT'
    const [banReason, setBanReason] = useState("");
    const [processing, setProcessing] = useState(false);

    useEffect(() => {
        loadDetails();
    }, [id]);

    async function loadDetails() {
        setLoading(true);
        try {
            const data = await fetchCivilianDetails(id);
            setCivilian(data);
        } catch (err) {
            setError("Failed to load civilian details.");
            console.error(err);
        } finally {
            setLoading(false);
        }
    }

    async function handleBanSubmit() {
        if (!banReason.trim()) return;
        setProcessing(true);
        try {
            // TODO: Get actual logged-in admin ID. Assuming 1 for now or from localStorage if available.
            const adminId = localStorage.getItem("adminId") || 1;

            if (banType === 'TEMP') {
                await tempBanCivilian(id, banReason, adminId);
            } else {
                await permanentBanCivilian(id, banReason, adminId);
            }
            setShowBanModal(false);
            setBanReason("");
            loadDetails(); // Refresh data
        } catch (err) {
            alert("Failed to perform action: " + err.message);
        } finally {
            setProcessing(false);
        }
    }

    if (loading) return <div className="p-10 text-center text-slate-500">Loading details...</div>;
    if (error || !civilian) return <div className="p-10 text-center text-red-500">{error || "Civilian not found"}</div>;

    return (
        <div className="space-y-6 font-['Inter'] max-w-5xl mx-auto pb-10">
            {/* Header */}
            <div className="flex items-center gap-4">
                <button onClick={() => navigate(-1)} className="p-2 hover:bg-slate-100 rounded-full text-slate-500 transition-colors">
                    <ChevronLeft size={24} />
                </button>
                <div>
                    <h1 className="text-2xl font-bold text-slate-800">Civilian Profile</h1>
                    <p className="text-slate-400 text-sm">Manage account status and view history</p>
                </div>
            </div>

            {/* Main Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                {/* Left Column: Profile Card */}
                <div className="space-y-6">
                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 text-center relative overflow-hidden">
                        <div className={`absolute top-0 left-0 w-full h-2 ${civilian.accountStatus === 'ACTIVE' ? 'bg-emerald-500' :
                                civilian.accountStatus === 'TEMP_BANNED' ? 'bg-orange-500' : 'bg-rose-500'
                            }`} />

                        <div className="w-24 h-24 bg-slate-100 rounded-full mx-auto mb-4 flex items-center justify-center text-slate-300">
                            <User size={48} />
                        </div>
                        <h2 className="text-xl font-bold text-slate-800">{civilian.fullName}</h2>
                        <p className="text-slate-500 text-sm mb-4">NIC: {civilian.nicNumber}</p>

                        <StatusBadge status={civilian.accountStatus} />

                        <div className="mt-8 space-y-3 text-left">
                            <div className="flex items-center gap-3 text-sm text-slate-600">
                                <Mail size={16} className="text-slate-400" />
                                <span className="truncate">{civilian.email}</span>
                            </div>
                            <div className="flex items-center gap-3 text-sm text-slate-600">
                                <Phone size={16} className="text-slate-400" />
                                <span>{civilian.phone}</span>
                            </div>
                        </div>

                        {/* Actions */}
                        {civilian.accountStatus !== 'PERMANENT_BANNED' && (
                            <div className="grid grid-cols-2 gap-3 mt-8">
                                {civilian.accountStatus === 'ACTIVE' && (
                                    <button
                                        onClick={() => { setBanType('TEMP'); setShowBanModal(true); }}
                                        className="py-2.5 px-4 bg-orange-50 text-orange-600 text-xs font-bold rounded-xl border border-orange-100 hover:bg-orange-100 transition-colors"
                                    >
                                        Temp Ban
                                    </button>
                                )}
                                <button
                                    onClick={() => { setBanType('PERMANENT'); setShowBanModal(true); }}
                                    className={`py-2.5 px-4 bg-rose-50 text-rose-600 text-xs font-bold rounded-xl border border-rose-100 hover:bg-rose-100 transition-colors ${civilian.accountStatus !== 'ACTIVE' ? 'col-span-2' : ''}`}
                                >
                                    Permanent Ban
                                </button>
                            </div>
                        )}
                    </div>

                    {/* Metrics Summary */}
                    <div className="grid grid-cols-2 gap-4">
                        <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-100 text-center">
                            <span className="text-3xl font-bold text-slate-700">{civilian.tempBanCount}</span>
                            <p className="text-xs text-slate-400 uppercase font-bold mt-1">Temp Bans</p>
                        </div>
                        <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-100 text-center">
                            <span className="text-3xl font-bold text-blue-600">{civilian.appealCount}</span>
                            <p className="text-xs text-slate-400 uppercase font-bold mt-1">Appeals</p>
                        </div>
                    </div>
                </div>

                {/* Right Column: History & Details */}
                <div className="lg:col-span-2 space-y-6">

                    {/* Active Ban Info (if any) */}
                    {(civilian.accountStatus === 'TEMP_BANNED' || civilian.accountStatus === 'PERMANENT_BANNED') && (
                        <div className="bg-red-50/50 border border-red-100 rounded-2xl p-6">
                            <h3 className="text-sm font-bold text-red-800 uppercase tracking-wide mb-4 flex items-center gap-2">
                                <AlertTriangle size={16} /> Current Ban Details
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <p className="text-xs text-slate-400 font-bold uppercase mb-1">Reason</p>
                                    <p className="text-sm text-slate-800 font-medium">{civilian.banReason}</p>
                                </div>
                                <div>
                                    <p className="text-xs text-slate-400 font-bold uppercase mb-1">Ban Date</p>
                                    <p className="text-sm text-slate-800 font-medium">{new Date(civilian.banDate).toLocaleString()}</p>
                                </div>
                                {civilian.accountStatus === 'TEMP_BANNED' && (
                                    <>
                                        <div>
                                            <p className="text-xs text-slate-400 font-bold uppercase mb-1">Appeal Deadline</p>
                                            <p className="text-sm text-slate-800 font-medium">{new Date(civilian.appealDeadline).toLocaleDateString()}</p>
                                        </div>
                                        <div>
                                            <p className="text-xs text-slate-400 font-bold uppercase mb-1">Remaining Days for Appeal</p>
                                            <p className="text-sm text-emerald-600 font-bold">{civilian.remainingDays} Days</p>
                                        </div>
                                    </>
                                )}
                            </div>
                        </div>
                    )}

                    {/* Privacy / VIVO Status */}
                    <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
                        <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wide mb-4 flex items-center gap-2">
                            <Shield size={16} className="text-[#2FA4A9]" /> VIVO / Privacy Settings
                        </h3>
                        <div className="space-y-4">
                            <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                                <span className="text-sm text-slate-600 font-medium">Login Access</span>
                                <span className={`px-2 py-1 rounded text-xs font-bold ${!civilian.isLoginDisabled ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-700'}`}>
                                    {!civilian.isLoginDisabled ? 'ENABLED' : 'DISABLED'}
                                </span>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <p className="text-xs text-slate-400 font-bold uppercase mb-1">Masked Name</p>
                                    <p className="text-sm text-slate-600 font-mono bg-slate-50 p-2 rounded">{civilian.maskedName || '-'}</p>
                                </div>
                                <div>
                                    <p className="text-xs text-slate-400 font-bold uppercase mb-1">Masked Email</p>
                                    <p className="text-sm text-slate-600 font-mono bg-slate-50 p-2 rounded">{civilian.maskedEmail || '-'}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Placeholder for future logs */}
                    <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 flex items-center justify-center min-h-[150px] text-slate-400 text-sm border-dashed">
                        <div className="text-center">
                            <Clock size={24} className="mx-auto mb-2 opacity-50" />
                            Account Activity Log (Coming Soon)
                        </div>
                    </div>

                </div>
            </div>

            {/* Ban Action Modal */}
            {showBanModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20 backdrop-blur-sm p-4">
                    <div className="bg-white rounded-2xl shadow-xl max-w-md w-full p-6 animate-in fade-in zoom-in duration-200">
                        <h3 className="text-lg font-bold text-slate-800 mb-2">
                            Confirm {banType === 'TEMP' ? 'Temporary' : 'Permanent'} Ban
                        </h3>
                        <p className="text-sm text-slate-500 mb-4">
                            {banType === 'TEMP'
                                ? "This will restrict the user's account for 14 days. They can appeal within this period."
                                : "This action is irreversible. The user will be permanently blocked from accessing the system."}
                        </p>

                        <textarea
                            className="w-full p-3 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-[#2FA4A9] outline-none min-h-[100px]"
                            placeholder="Enter reason for ban..."
                            value={banReason}
                            onChange={(e) => setBanReason(e.target.value)}
                        />

                        <div className="flex justify-end gap-3 mt-6">
                            <button
                                onClick={() => setShowBanModal(false)}
                                className="px-4 py-2 text-slate-500 font-bold text-sm hover:bg-slate-50 rounded-lg"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleBanSubmit}
                                disabled={processing || !banReason.trim()}
                                className={`px-6 py-2 rounded-lg text-white font-bold text-sm shadow-sm transition-all
                  ${banType === 'TEMP' ? 'bg-orange-500 hover:bg-orange-600' : 'bg-red-500 hover:bg-red-600'}
                  ${(processing || !banReason.trim()) ? 'opacity-50 cursor-not-allowed' : ''}
                `}
                            >
                                {processing ? 'Processing...' : 'Confirm Ban'}
                            </button>
                        </div>
                    </div>
                </div>
            )}

        </div>
    );
}

function StatusBadge({ status }) {
    const configs = {
        ACTIVE: { bg: 'bg-emerald-50', text: 'text-emerald-600', border: 'border-emerald-100', icon: CheckCircle },
        TEMP_BANNED: { bg: 'bg-orange-50', text: 'text-orange-600', border: 'border-orange-100', icon: Clock },
        PERMANENT_BANNED: { bg: 'bg-rose-50', text: 'text-rose-600', border: 'border-rose-100', icon: AlertTriangle },
    };
    const { bg, text, border, icon: Icon } = configs[status] || {};

    return (
        <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[10px] font-extrabold uppercase border ${bg} ${text} ${border}`}>
            {Icon && <Icon size={12} />}
            {status?.replace('_', ' ')}
        </span>
    );
}

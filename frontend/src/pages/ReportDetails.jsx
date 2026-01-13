import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import StatusBadge from '../components/common/StatusBadge';
import { FiArrowLeft } from 'react-icons/fi';

const ReportDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [report, setReport] = useState(null);
    const [loading, setLoading] = useState(true);
    const [response, setResponse] = useState('');

    useEffect(() => {
        fetchReport();
    }, [id]);

    const fetchReport = async () => {
        try {
            const response = await fetch(`http://localhost:8080/api/admin/pharmacy-reports/${id}`);
            if (response.ok) {
                const data = await response.json();
                setReport(data);
            }
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const handleResolve = async () => {
        try {
            const res = await fetch(`http://localhost:8080/api/admin/pharmacy-reports/${id}/status?status=RESOLVED&response=${encodeURIComponent(response)}`, {
                method: 'PATCH'
            });
            if (res.ok) {
                alert("Report marked as resolved.");
                fetchReport();
            }
        } catch (error) {
            console.error(error);
        }
    };

    if (loading) return <div>Loading...</div>;
    if (!report) return <div>Report not found.</div>;

    return (
        <div className="p-6 max-w-4xl mx-auto space-y-6">
            <button onClick={() => navigate('/reports')} className="flex items-center text-gray-500 mb-4">
                <FiArrowLeft className="mr-2" /> Back to Reports
            </button>

            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                <div className="flex justify-between items-start mb-6">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">{report.title}</h1>
                        <div className="flex items-center gap-2 mt-2">
                            <StatusBadge status={report.status} />
                            <span className="text-sm text-gray-500">ID: #{report.id}</span>
                            <span className="text-sm text-gray-500">Type: {report.type}</span>
                        </div>
                    </div>
                </div>

                <div className="space-y-6">
                    <div>
                        <h3 className="font-semibold text-gray-900 mb-2">Description</h3>
                        <div className="p-4 bg-gray-50 rounded-lg text-gray-700 whitespace-pre-wrap">
                            {report.description}
                        </div>
                    </div>

                    <div>
                        <h3 className="font-semibold text-gray-900 mb-2">Pharmacy Info</h3>
                        <div className="text-sm text-gray-600">
                            <div>Name: {report.pharmacy?.pharmacyName}</div>
                            <div>ID: #{report.pharmacy?.id}</div>
                        </div>
                    </div>

                    {report.status !== 'RESOLVED' && (
                        <div>
                            <h3 className="font-semibold text-gray-900 mb-2">Admin Response</h3>
                            <textarea
                                className="w-full border border-gray-300 rounded-lg p-3 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                                rows={4}
                                placeholder="Write a response..."
                                value={response}
                                onChange={(e) => setResponse(e.target.value)}
                            />
                            <div className="mt-4 flex justify-end">
                                <button
                                    onClick={handleResolve}
                                    className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                                >
                                    Resolve Report
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ReportDetails;

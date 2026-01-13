import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import MetricCard from '../components/common/MetricCard';
import { FiTrash2 } from 'react-icons/fi';
import PharmacyTable from '../components/pharmacy/PharmacyTable';

const RemovedPharmacies = () => {
    const navigate = useNavigate();
    const [metrics, setMetrics] = useState({ total: 0, removed: 0 });
    const [pharmacies, setPharmacies] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        // Fetch Removed Metrics specifically or reuse general
        // Using general metrics for now or hardcode if not available separately
        fetchMetrics();
        fetchRemovedPharmacies();
    }, []);

    const fetchMetrics = async () => {
        try {
            const response = await fetch('http://localhost:8080/api/pharmacies/metrics');
            if (response.ok) {
                const data = await response.json();
                setMetrics(data);
            }
        } catch (error) {
            console.error(error);
        }
    };

    const fetchRemovedPharmacies = async () => {
        setLoading(true);
        try {
            const response = await fetch('http://localhost:8080/api/pharmacies/by-status?status=REMOVED');
            if (response.ok) {
                const data = await response.json();
                setPharmacies(data);
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
                    <h1 className="text-2xl font-bold text-gray-900">Removed Pharmacies</h1>
                    <p className="text-gray-500">Archive of removed pharmacies</p>
                </div>
                <button
                    onClick={() => navigate('/pharmacy')}
                    className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-white"
                >
                    Back to Management
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <MetricCard
                    title="Removed Pharmacies"
                    value={metrics.removed || 0}
                    icon={FiTrash2}
                    color="red"
                />
            </div>

            <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Archived Pharmacies</h3>
                <PharmacyTable pharmacies={pharmacies} loading={loading} />
            </div>
        </div>
    );
};

export default RemovedPharmacies;

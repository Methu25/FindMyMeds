import { useState, useEffect } from 'react'
import Layout from '../../components/pharmacy/Layout'
import MetricCard from '../../components/pharmacy/MetricCard'
import { Package, CheckCircle, XCircle, Pill } from 'lucide-react'

export default function Dashboard() {
    const [metrics, setMetrics] = useState({
        todaysReservations: 0,
        completedToday: 0,
        rejectedToday: 0,
        inStockMedicines: 0
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchMetrics = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await fetch('http://localhost:8080/api/pharmacy/dashboard/metrics', {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                if (response.ok) {
                    const data = await response.json();
                    setMetrics(data);
                }
            } catch (error) {
                console.error('Failed to fetch metrics:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchMetrics();
    }, []);

    return (
        <Layout title="Dashboard">
            <div className="grid grid-cols-4 gap-6 mb-10">
                <MetricCard
                    title="Today's Reservations"
                    value={loading ? '...' : metrics.todaysReservations}
                    icon={Package}
                />
                <MetricCard
                    title="Today's Completed"
                    value={loading ? '...' : metrics.completedToday}
                    icon={CheckCircle}
                />
                <MetricCard
                    title="Rejected Today"
                    value={loading ? '...' : metrics.rejectedToday}
                    icon={XCircle}
                />
                <MetricCard
                    title="In Stock Medicines"
                    value={loading ? '...' : metrics.inStockMedicines}
                    icon={Pill}
                />
            </div>

            <div className="grid grid-cols-3 gap-8">
                <div className="bg-white p-6 rounded-xl shadow-sm">
                    <h3 className="text-lg font-semibold mb-4">Quick Launcher</h3>
                    <div className="grid grid-cols-2 gap-4">
                        {['Add Medicine', 'Manage Inventory', 'View Reservations', 'View History', 'Check Inquiries', 'Update Price'].map((action) => (
                            <button key={action} className="bg-teal-50 hover:bg-primary/10 text-primary py-4 rounded-lg font-medium transition">
                                {action}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="bg-white p-6 rounded-xl shadow-sm">
                    <h3 className="text-lg font-semibold mb-4">Stock Health Overview</h3>
                    <div className="h-64 bg-gray-100 rounded-lg flex items-center justify-center text-gray-500">
                        Pie + Bar Chart Here
                    </div>
                </div>

                <div className="bg-white p-6 rounded-xl shadow-sm">
                    <h3 className="text-lg font-semibold mb-4">Recent Alerts</h3>
                    <div className="space-y-3">
                        {['Low Stock: Paracetamol', '5 Medicines Expiring Soon', 'New Reservation Received'].map((alert, i) => (
                            <div key={i} className="flex justify-between items-center py-2 border-b">
                                <p className="text-sm">{alert}</p>
                                <span className="bg-orange-100 text-orange-700 text-xs px-2 py-1 rounded">Warning</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </Layout>
    )
}

import { useState, useEffect } from 'react';
import Layout from '../../components/pharmacy/Layout';
import {
    TrendingUp, Package, Calendar, Clock, CheckCircle2,
    XCircle, AlertTriangle, Pill, FileText, Download,
    ArrowUpRight, ArrowDownRight, DollarSign, Activity
} from 'lucide-react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    BarElement,
    Title,
    Tooltip,
    Legend,
    ArcElement,
} from 'chart.js';
import { Line, Doughnut, Bar } from 'react-chartjs-2';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    BarElement,
    ArcElement,
    Title,
    Tooltip,
    Legend
);

export default function PharmacyReportPage() {
    const [analytics, setAnalytics] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const [timeRange, setTimeRange] = useState('30d');

    useEffect(() => {
        const fetchAnalytics = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await fetch('http://localhost:8080/api/pharmacy/data-summary', {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });

                if (response.ok) {
                    const data = await response.json();
                    setAnalytics({
                        dailyRevenue: [],
                        reservationStatusCounts: {},
                        inventoryStatusCounts: {},
                        topSellingMedicines: [],
                        totalRevenue: 0,
                        ...data
                    });
                } else {
                    const errorText = await response.text();
                    console.error('Analytics API error:', response.status, response.statusText, errorText);
                    setError(`Error ${response.status}: ${response.statusText}`);
                }
            } catch (error) {
                console.error('Failed to fetch analytics:', error);
                setError(error.message || 'Network error or server unreachable');
            } finally {
                setLoading(false);
            }
        };

        fetchAnalytics();
    }, []);

    if (loading) {
        return (
            <Layout title="Reports & Analytics">
                <div className="flex items-center justify-center h-96">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
                </div>
            </Layout>
        );
    }

    if (error || !analytics) {
        return (
            <Layout title="Reports & Analytics">
                <div className="p-20 text-center flex flex-col items-center gap-4">
                    <AlertTriangle className="text-red-500" size={48} />
                    <div className="text-gray-500 italic">
                        {error ? `Failed to load analytics: ${error}` : 'Failed to load analytics data. Please try again later.'}
                    </div>
                    <div className="text-[10px] text-gray-400 mt-2">
                        Tip: Make sure your Spring Boot backend is running on port 8080.
                    </div>
                    <button
                        onClick={() => window.location.reload()}
                        className="mt-4 px-6 py-2 bg-primary text-white rounded-xl font-bold"
                    >
                        Retry
                    </button>
                </div>
            </Layout>
        );
    }

    // Chart Data Preparation
    const revenueLineData = {
        labels: (analytics.dailyRevenue || []).map(item => item.date ? new Date(item.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) : 'N/A'),
        datasets: [
            {
                label: 'Revenue (LKR)',
                data: (analytics.dailyRevenue || []).map(item => item.revenue || 0),
                borderColor: '#2FA4A9',
                backgroundColor: 'rgba(47, 164, 169, 0.1)',
                fill: true,
                tension: 0.4,
                pointRadius: 4,
                pointBackgroundColor: '#2FA4A9',
            },
        ],
    };

    const reservationDoughnutData = {
        labels: Object.keys(analytics.reservationStatusCounts || {}),
        datasets: [
            {
                data: Object.values(analytics.reservationStatusCounts || {}),
                backgroundColor: [
                    '#2FA4A9', // COLLECTED
                    '#FAC005', // PENDING
                    '#F03E3E', // CANCELLED
                    '#7950F2', // READY
                    '#228BE6', // ONGOING
                ],
                hoverOffset: 4,
                borderWidth: 0,
            },
        ],
    };

    const inventoryDoughnutData = {
        labels: Object.keys(analytics.inventoryStatusCounts || {}),
        datasets: [
            {
                data: Object.values(analytics.inventoryStatusCounts || {}),
                backgroundColor: [
                    '#2FA4A9', // In Stock
                    '#FF922B', // Low Stock
                    '#F03E3E', // Out of Stock
                    '#9775FA', // Expired
                    '#FCC419', // Expiring Soon
                    '#ADB5BD', // Deactivated
                ],
                hoverOffset: 4,
                borderWidth: 0,
            },
        ],
    };

    return (
        <Layout title="Business Intelligence Reports">
            <div className="space-y-8 pb-12 animate-in fade-in duration-700">

                {/* Header Actions */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white p-6 rounded-[2rem] shadow-sm border border-gray-100">
                    <div>
                        <h2 className="text-2xl font-black text-gray-800">Pharmacy Performance Dashboard</h2>
                        <p className="text-gray-500 text-sm">Actionable insights from your pharmacy operations</p>
                    </div>
                    <div className="flex gap-3">
                        <select
                            value={timeRange}
                            onChange={(e) => setTimeRange(e.target.value)}
                            className="bg-gray-50 border border-gray-200 text-gray-700 text-sm rounded-xl px-4 py-2 outline-none focus:ring-2 focus:ring-primary/20 transition"
                        >
                            <option value="7d">Last 7 Days</option>
                            <option value="30d">Last 30 Days</option>
                            <option value="90d">Last 90 Days</option>
                        </select>
                        <button className="flex items-center gap-2 bg-primary text-white px-5 py-2 rounded-xl font-bold text-sm shadow-lg shadow-primary/20 hover:-translate-y-0.5 transition">
                            <Download size={16} /> Export Report
                        </button>
                    </div>
                </div>

                {/* Summary Metrics */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <AnalyticCard
                        title="Total Gross Revenue"
                        value={`LKR ${analytics.totalRevenue.toLocaleString()}`}
                        icon={DollarSign}
                        trend="+14.2%"
                        color="text-emerald-600"
                        bg="bg-emerald-50"
                    />
                    <AnalyticCard
                        title="Completed Orders"
                        value={analytics.reservationStatusCounts['COLLECTED'] || 0}
                        icon={CheckCircle2}
                        trend="+8.5%"
                        color="text-blue-600"
                        bg="bg-blue-50"
                    />
                    <AnalyticCard
                        title="Low Stock Warning"
                        value={analytics.inventoryStatusCounts?.['Low Stock'] || 0}
                        icon={AlertTriangle}
                        trend="-2.4%"
                        color="text-orange-600"
                        bg="bg-orange-50"
                        isWarning
                    />
                    <AnalyticCard
                        title="Potential Revenue Loss"
                        value={`LKR ${((analytics.inventoryStatusCounts?.['Out of Stock'] || 0) * 1250).toLocaleString()}`}
                        icon={XCircle}
                        trend="+12%"
                        color="text-red-600"
                        bg="bg-red-50"
                        isNegative
                    />
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Revenue Trend Chart */}
                    <div className="lg:col-span-2 bg-white rounded-[2rem] p-8 shadow-sm border border-gray-100">
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="text-lg font-bold text-gray-800 flex items-center gap-2">
                                <TrendingUp className="text-primary" size={20} />
                                Revenue Growth Trend
                            </h3>
                            <Activity className="text-gray-300" size={18} />
                        </div>
                        <div className="h-80">
                            <Line
                                data={revenueLineData}
                                options={{
                                    responsive: true,
                                    maintainAspectRatio: false,
                                    plugins: { legend: { display: false } },
                                    scales: {
                                        y: { beginAtZero: true, grid: { color: '#f1f3f5' } },
                                        x: { grid: { display: false } }
                                    }
                                }}
                            />
                        </div>
                    </div>

                    {/* Reservation Status Distribution */}
                    <div className="bg-white rounded-[2rem] p-8 shadow-sm border border-gray-100">
                        <h3 className="text-lg font-bold text-gray-800 mb-8 flex items-center gap-2">
                            <Clock className="text-primary" size={20} />
                            Order Fulfillment Status
                        </h3>
                        <div className="h-64 flex items-center justify-center">
                            <Doughnut
                                data={reservationDoughnutData}
                                options={{
                                    responsive: true,
                                    maintainAspectRatio: false,
                                    plugins: { legend: { position: 'bottom', labels: { usePointStyle: true, boxWidth: 6, font: { size: 10 } } } },
                                    cutout: '70%'
                                }}
                            />
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Top Selling Medicines */}
                    <div className="bg-white rounded-[2rem] p-8 shadow-sm border border-gray-100">
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="text-lg font-bold text-gray-800 flex items-center gap-2">
                                <Pill className="text-primary" size={20} />
                                Top Performing Medicines
                            </h3>
                            <span className="text-xs font-bold text-primary bg-primary/10 px-3 py-1 rounded-full uppercase tracking-tighter">By Quantity</span>
                        </div>
                        <div className="overflow-hidden rounded-2xl border border-gray-50">
                            <table className="w-full text-left">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-6 py-4 text-[11px] font-bold text-gray-400 uppercase tracking-wider">Medicine</th>
                                        <th className="px-6 py-4 text-[11px] font-bold text-gray-400 uppercase tracking-wider text-center">Qty Sold</th>
                                        <th className="px-6 py-4 text-[11px] font-bold text-gray-400 uppercase tracking-wider text-right">Revenue</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-50">
                                    {(analytics.topSellingMedicines || []).map((med, idx) => (
                                        <tr key={idx} className="hover:bg-gray-50/50 transition duration-200">
                                            <td className="px-6 py-4 text-sm font-bold text-gray-700">{med.medicineName || 'N/A'}</td>
                                            <td className="px-6 py-4 text-sm text-gray-600 text-center">{med.quantitySold || 0}</td>
                                            <td className="px-6 py-4 text-sm font-black text-primary text-right">LKR {(med.totalRevenue || 0).toLocaleString()}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* Stock Health Overview */}
                    <div className="bg-white rounded-[2rem] p-8 shadow-sm border border-gray-100">
                        <h3 className="text-lg font-bold text-gray-800 mb-8 flex items-center gap-2">
                            <Package className="text-primary" size={20} />
                            Inventory Health Index
                        </h3>
                        <div className="flex flex-col md:flex-row items-center gap-10">
                            <div className="w-48 h-48">
                                <Doughnut
                                    data={inventoryDoughnutData}
                                    options={{
                                        responsive: true,
                                        maintainAspectRatio: false,
                                        plugins: { legend: { display: false } },
                                        cutout: '65%'
                                    }}
                                />
                            </div>
                            <div className="flex-1 grid grid-cols-2 gap-4 w-full">
                                {Object.entries(analytics.inventoryStatusCounts || {}).map(([label, val], idx) => (
                                    <div key={idx} className="flex flex-col p-3 rounded-2xl bg-gray-50 border border-gray-100">
                                        <span className="text-[10px] text-gray-400 uppercase font-bold mb-1">{label}</span>
                                        <span className="text-lg font-black text-gray-800">{val || 0}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Footer Insight */}
                <div className="bg-gradient-to-r from-primary to-primary-dark rounded-[2rem] p-8 text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl shadow-primary/20">
                    <div className="flex items-center gap-6">
                        <div className="p-4 bg-white/20 rounded-3xl backdrop-blur-sm">
                            <Activity size={32} />
                        </div>
                        <div>
                            <h4 className="text-xl font-bold">Optimization Suggestion</h4>
                            <p className="text-white/80 max-w-lg">Based on current trends, restocking <span className="font-bold text-white">Amoxicillin</span> and <span className="font-bold text-white">Paracetamol</span> could increase next month's projected revenue by 12%.</p>
                        </div>
                    </div>
                    <button className="bg-white text-primary px-8 py-3 rounded-2xl font-black text-sm hover:scale-105 transition active:scale-95 whitespace-nowrap">
                        Generate Action Plan
                    </button>
                </div>
            </div>
        </Layout>
    );
}

function AnalyticCard({ title, value, icon: Icon, trend, color, bg, isWarning, isNegative }) {
    return (
        <div className="bg-white p-6 rounded-[2rem] shadow-sm border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition duration-300 group">
            <div className="flex justify-between items-start mb-4">
                <div className={`p-3 rounded-2xl ${bg} ${color} group-hover:scale-110 transition duration-300`}>
                    <Icon size={20} />
                </div>
                {trend && (
                    <div className={`flex items-center gap-1 text-[10px] font-black px-2 py-1 rounded-lg ${isNegative ? 'bg-red-50 text-red-600' :
                        isWarning ? 'bg-orange-50 text-orange-600' :
                            'bg-emerald-50 text-emerald-600'
                        }`}>
                        {trend.startsWith('+') ? <ArrowUpRight size={12} /> : <ArrowDownRight size={12} />}
                        {trend}
                    </div>
                )}
            </div>
            <div>
                <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">{title}</p>
                <h4 className="text-2xl font-black text-gray-800">{value}</h4>
            </div>
        </div>
    );
}

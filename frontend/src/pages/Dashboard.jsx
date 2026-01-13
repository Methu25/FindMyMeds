import React, { useState, useEffect } from 'react';
import MetricCard from '../components/common/MetricCard';
import { Users, AlertTriangle, FileText, Building2, ShieldCheck, Activity } from 'lucide-react';
import axios from 'axios';
import {
    PieChart, Pie, Cell,
    BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
    LineChart, Line
} from 'recharts';

const Dashboard = () => {
    // State for data
    const [metrics, setMetrics] = useState({});
    const [charts, setCharts] = useState({ civilianStatus: [], reservationAnalytics: [], pharmacyStats: [], adminStats: [] });
    const [loading, setLoading] = useState(true);

    // Role simulation (In real app, get from AuthContext)
    const userRole = 'SUPER_ADMIN'; // Change to 'ADMIN' to test role-based view

    useEffect(() => {
        const fetchDashboardData = async () => {
            try {
                const [metricsRes, chartsRes] = await Promise.all([
                    axios.get('http://localhost:8081/api/dashboard/metrics'),
                    axios.get('http://localhost:8081/api/dashboard/charts')
                ]);
                setMetrics(metricsRes.data);
                setCharts(chartsRes.data);
                setLoading(false);
            } catch (e) {
                console.error("Dashboard data fetch failed", e);
                // Fallback mock data for demo if backend fails
                setMetrics({
                    totalCivilians: 120,
                    temporaryBans: 5,
                    pendingAppeals: 2,
                    totalAdmins: 8,
                    activeAdmins: 7,
                    totalPharmacies: 45,
                    pendingPharmacyApprovals: 3
                });
                setCharts({
                    civilianStatus: [
                        { status: 'ACTIVE', count: 100 },
                        { status: 'TEMP_BANNED', count: 5 },
                        { status: 'PERMANENT_BANNED', count: 2 }
                    ],
                    reservationAnalytics: [
                        { reservation_date: '2024-03-01', total: 10 },
                        { reservation_date: '2024-03-02', total: 15 },
                        { reservation_date: '2024-03-03', total: 12 },
                        { reservation_date: '2024-03-04', total: 20 },
                        { reservation_date: '2024-03-05', total: 18 }
                    ],
                    pharmacyStats: [
                        { status: 'ACTIVE', count: 40 },
                        { status: 'SUSPENDED', count: 2 },
                        { status: 'PENDING', count: 3 }
                    ],
                    adminStats: [
                        { status: 'ACTIVE', count: 7 },
                        { status: 'INACTIVE', count: 1 }
                    ]
                });
                setLoading(false);
            }
        };
        fetchDashboardData();
    }, []);

    if (loading) return <div style={{ padding: '2rem' }}>Loading Dashboard...</div>;

    // Chart Colors
    const COLORS = ['#2FA4A9', '#FFBB28', '#FF8042', '#d32f2f'];

    return (
        <div style={{ paddingBottom: '2rem' }}>
            <h1 style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '2rem', color: 'var(--text-primary)' }}>
                Dashboard
            </h1>

            {/* Metric Cards Section */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.5rem', marginBottom: '2rem' }}>
                <MetricCard label="Total Civilians" value={metrics.totalCivilians} icon={Users} color="primary" />
                <MetricCard label="Temporary Bans" value={metrics.temporaryBans} icon={AlertTriangle} color="warning" />
                <MetricCard label="Pending Appeals" value={metrics.pendingAppeals} icon={FileText} color="warning" />

                {userRole === 'SUPER_ADMIN' && (
                    <>
                        <MetricCard label="Total Pharmacies" value={metrics.totalPharmacies} icon={Building2} color="primary" />
                        <MetricCard label="Pending Pharmacies" value={metrics.pendingPharmacyApprovals} icon={Activity} color="warning" />
                        <MetricCard label="Total Admins" value={metrics.totalAdmins} icon={ShieldCheck} color="error" />
                    </>
                )}
            </div>

            {/* Charts Section */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '2rem' }}>

                {/* Civilian Stats */}
                <div className="glass-panel" style={{ padding: '1.5rem', borderRadius: '1rem', background: 'white', minHeight: '350px' }}>
                    <h3 style={{ marginBottom: '1.5rem', fontWeight: 'bold', fontSize: '1.1rem' }}>Civilian Status</h3>
                    <ResponsiveContainer width="100%" height={250}>
                        <PieChart>
                            <Pie
                                data={charts.civilianStatus}
                                cx="50%"
                                cy="50%"
                                innerRadius={60}
                                outerRadius={80}
                                fill="#8884d8"
                                paddingAngle={5}
                                dataKey="count"
                                nameKey="status"
                            >
                                {charts.civilianStatus.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                            </Pie>
                            <Tooltip />
                            <Legend />
                        </PieChart>
                    </ResponsiveContainer>
                </div>

                {/* Reservation Analytics */}
                <div className="glass-panel" style={{ padding: '1.5rem', borderRadius: '1rem', background: 'white', minHeight: '350px' }}>
                    <h3 style={{ marginBottom: '1.5rem', fontWeight: 'bold', fontSize: '1.1rem' }}>Reservations (Last 30 Days)</h3>
                    <ResponsiveContainer width="100%" height={250}>
                        <LineChart data={charts.reservationAnalytics}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="reservation_date" tick={{ fontSize: 12 }} />
                            <YAxis />
                            <Tooltip />
                            <Line type="monotone" dataKey="total" stroke="#2FA4A9" strokeWidth={2} />
                        </LineChart>
                    </ResponsiveContainer>
                </div>

                {userRole === 'SUPER_ADMIN' && (
                    <>
                        {/* Pharmacy Stats */}
                        <div className="glass-panel" style={{ padding: '1.5rem', borderRadius: '1rem', background: 'white', minHeight: '350px' }}>
                            <h3 style={{ marginBottom: '1.5rem', fontWeight: 'bold', fontSize: '1.1rem' }}>Pharmacy Status</h3>
                            <ResponsiveContainer width="100%" height={250}>
                                <BarChart data={charts.pharmacyStats}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="status" tick={{ fontSize: 12 }} />
                                    <YAxis />
                                    <Tooltip />
                                    <Bar dataKey="count" fill="#2FA4A9" radius={[4, 4, 0, 0]} />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>

                        {/* Admin Stats */}
                        <div className="glass-panel" style={{ padding: '1.5rem', borderRadius: '1rem', background: 'white', minHeight: '350px' }}>
                            <h3 style={{ marginBottom: '1.5rem', fontWeight: 'bold', fontSize: '1.1rem' }}>Admin Status</h3>
                            <ResponsiveContainer width="100%" height={250}>
                                <BarChart data={charts.adminStats}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="status" tick={{ fontSize: 12 }} />
                                    <YAxis />
                                    <Tooltip />
                                    <Bar dataKey="count" fill="#d32f2f" radius={[4, 4, 0, 0]} />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default Dashboard;

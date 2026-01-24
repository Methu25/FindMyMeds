// src/pages/pharmacy/NotificationCenter.jsx
import Layout from '../../components/pharmacy/Layout'

export default function NotificationCenter() {
    const categories = [
        { name: 'Reservations', count: 18, color: 'bg-blue-600' },
        { name: 'Inventory', count: 12, color: 'bg-orange-600' },
        { name: 'Expiry & Stock', count: 25, color: 'bg-red-600' },
        { name: 'Admin & System', count: 5, color: 'bg-purple-600' },
    ]

    const notifications = [
        { title: 'New Reservation Received', message: 'RES-2026-089 from Nimal Perera', time: '5 minutes ago', priority: 'High', color: 'bg-red-600' },
        { title: 'Low Stock Alert', message: 'Paracetamol 500mg - Only 8 left', time: '1 hour ago', priority: 'High', color: 'bg-red-600' },
        { title: 'Medicine Expiring Soon', message: 'Amoxicillin - Expires in 15 days', time: '3 hours ago', priority: 'Medium', color: 'bg-orange-600' },
        { title: 'System Update Available', message: 'New features for inventory management', time: '1 day ago', priority: 'Low', color: 'bg-green-600' },
    ]

    return (
        <Layout title="Notification & Alert Center">
            <div className="max-w-7xl mx-auto">
                <h1 className="text-5xl font-bold text-gray-800 mb-12 text-center">Notification and Alert Center</h1>

                {/* 4 Category Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
                    {categories.map((cat) => (
                        <div key={cat.name} className="bg-white rounded-2xl shadow-2xl border border-gray-200 p-12 text-center hover:shadow-3xl transition-all duration-300 transform hover:-translate-y-2">
                            <h3 className="text-2xl font-bold text-gray-800 mb-6">{cat.name}</h3>
                            <div className={`w-32 h-32 mx-auto rounded-full ${cat.color} flex items-center justify-center shadow-2xl`}>
                                <span className="text-6xl font-extrabold text-white">{cat.count}</span>
                            </div>
                            <p className="text-xl text-gray-600 mt-6 font-semibold">Unread Notifications</p>
                        </div>
                    ))}
                </div>

                {/* All Notifications List */}
                <div className="bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden">
                    <div className="p-12 border-b border-gray-200 bg-gradient-to-r from-primary/10 to-primary/5">
                        <h2 className="text-4xl font-bold text-gray-800">All Notifications</h2>
                        <p className="text-xl text-gray-600 mt-4">Grouped by priority • Click to view details</p>
                    </div>

                    <div className="divide-y divide-gray-200">
                        {notifications.map((notif, i) => (
                            <div key={i} className="p-12 hover:bg-primary/5 transition-all duration-300 flex justify-between items-center group">
                                <div>
                                    <h4 className="text-2xl font-bold text-gray-800 group-hover:text-primary transition">{notif.title}</h4>
                                    <p className="text-xl text-gray-600 mt-3">{notif.message}</p>
                                    <p className="text-lg text-gray-500 mt-4">{notif.time}</p>
                                </div>
                                <div className="flex items-center gap-8">
                                    <span className={`px-8 py-4 rounded-full text-white font-bold text-xl ${notif.color} shadow-lg`}>
                                        {notif.priority} Priority
                                    </span>
                                    <button className="bg-primary hover:bg-primary-dark text-white font-bold text-xl px-10 py-5 rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300 transform group-hover:-translate-y-1">
                                        View Details
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </Layout>
    )
}



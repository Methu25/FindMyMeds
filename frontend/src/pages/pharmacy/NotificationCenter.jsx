// src/pages/pharmacy/NotificationCenter.jsx
import { useState, useEffect } from 'react'
import Layout from '../../components/pharmacy/Layout'

export default function NotificationCenter() {
    const [categories, setCategories] = useState([
        { name: 'Reservations', count: 0, color: 'bg-blue-600' },
        { name: 'Inventory', count: 0, color: 'bg-orange-600' },
        { name: 'Expiry & Stock', count: 0, color: 'bg-red-600' },
        { name: 'Admin & System', count: 0, color: 'bg-purple-600' },
    ])
    const [notifications, setNotifications] = useState([])
    const [loading, setLoading] = useState(true)

    // Fetch Categories (Counts)
    useEffect(() => {
        fetch('http://localhost:8080/api/pharmacy/notifications/categories')
            .then(res => res.json())
            .then(data => {
                // Map the dynamic counts to our static visual structure
                const updatedCats = categories.map(cat => {
                    const found = data.find(d => d.category === cat.name)
                    return found ? { ...cat, count: found.unreadCount } : cat
                })
                setCategories(updatedCats)
            })
            .catch(err => console.error("Error fetching notification counts:", err))
    }, [])

    // Fetch Notifications List
    const fetchNotifications = () => {
        setLoading(true)
        fetch('http://localhost:8080/api/pharmacy/notifications?page=0&size=20')
            .then(res => res.json())
            .then(data => {
                if (data.content) {
                    setNotifications(data.content)
                }
                setLoading(false)
            })
            .catch(err => {
                console.error("Error fetching notifications:", err)
                setLoading(false)
            })
    }

    useEffect(() => {
        fetchNotifications()
    }, [])

    const handleViewDetails = (id) => {
        // Mark as read in backend
        fetch(`http://localhost:8080/api/pharmacy/notifications/${id}/read`, { method: 'PUT' })
            .then(res => {
                if (res.ok) {
                    // Refresh list or update local state
                    fetchNotifications()
                    // Also refresh counts ideally, but simplest is page refresh or manual decrement.
                    // For now just re-fetching list.
                }
            })
            .catch(err => console.error("Error marking as read:", err))
    }

    // Heper for Color/Priority based on Type
    const getTypeInfo = (type) => {
        switch (type) {
            case 'RESERVATION': return { priority: 'High', color: 'bg-blue-600' };
            case 'MEDICINE': return { priority: 'Medium', color: 'bg-orange-600' };
            case 'PHARMACY': return { priority: 'High', color: 'bg-red-600' };
            case 'ADMIN':
            case 'SYSTEM': return { priority: 'Low', color: 'bg-green-600' };
            default: return { priority: 'Medium', color: 'bg-gray-600' };
        }
    }

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
                        {loading ? (
                            <div className="p-12 text-center text-xl">Loading notifications...</div>
                        ) : notifications.length === 0 ? (
                            <div className="p-12 text-center text-xl">No notifications found.</div>
                        ) : (
                            notifications.map((notif) => {
                                const info = getTypeInfo(notif.type)
                                return (
                                    <div key={notif.id} className={`p-12 hover:bg-primary/5 transition-all duration-300 flex justify-between items-center group ${notif.read ? 'opacity-50' : ''}`}>
                                        <div>
                                            <h4 className="text-2xl font-bold text-gray-800 group-hover:text-primary transition">{notif.title}</h4>
                                            <p className="text-xl text-gray-600 mt-3">{notif.message}</p>
                                            <p className="text-lg text-gray-500 mt-4">{new Date(notif.createdAt).toLocaleString()}</p>
                                        </div>
                                        <div className="flex items-center gap-8">
                                            <span className={`px-8 py-4 rounded-full text-white font-bold text-xl ${info.color} shadow-lg`}>
                                                {info.priority} Priority
                                            </span>
                                            <button
                                                onClick={() => handleViewDetails(notif.id)}
                                                className="bg-primary hover:bg-primary-dark text-white font-bold text-xl px-10 py-5 rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300 transform group-hover:-translate-y-1">
                                                {notif.read ? 'Read' : 'Mark as Read'}
                                            </button>
                                        </div>
                                    </div>
                                )
                            })
                        )}
                    </div>
                </div>
            </div>
        </Layout>
    )
}



// src/pages/pharmacy/MedicineInventory.jsx
import { useState, useEffect } from 'react'
import Layout from '../../components/pharmacy/Layout'
import MetricCard from '../../components/pharmacy/MetricCard'

export default function MedicineInventory() {
    const [activeFilter, setActiveFilter] = useState('All')
    const [searchQuery, setSearchQuery] = useState('')
    const [inventory, setInventory] = useState([])
    const [metrics, setMetrics] = useState({
        totalMedicines: 0,
        inStock: 0,
        lowStock: 0,
        outOfStock: 0,
        expired: 0,
        expiringSoon: 0,
        deactivated: 0
    })
    const [loading, setLoading] = useState(true)

    // Fetch Metrics
    useEffect(() => {
        fetch('http://localhost:8080/api/pharmacy/inventory/metrics')
            .then(res => res.json())
            .then(data => setMetrics(data))
            .catch(err => console.error("Error fetching metrics:", err))
    }, [])

    // Fetch Inventory
    useEffect(() => {
        setLoading(true)
        const queryParams = new URLSearchParams({
            page: 0,
            size: 100, // Fetching more to allow client-side filtering for now
            search: searchQuery
        })

        fetch(`http://localhost:8080/api/pharmacy/inventory?${queryParams}`)
            .then(res => res.json())
            .then(data => {
                if (data.content) {
                    setInventory(data.content)
                }
                setLoading(false)
            })
            .catch(err => {
                console.error("Error fetching inventory:", err)
                setLoading(false)
            })
    }, [searchQuery])

    // Filter Logic
    const filteredInventory = inventory.filter(item => {
        if (activeFilter === 'All' || activeFilter === 'Total Medicines') return true;
        if (activeFilter === 'In Stock') return item.status === 'In Stock';
        if (activeFilter === 'Low Stock') return item.status === 'Low Stock';
        if (activeFilter === 'Out of Stock') return item.status === 'Out of Stock';
        if (activeFilter === 'Deactivated Medicines') return item.status === 'Deactivated';
        // Expired/Expiring Soon logic handles in backend usually, but for now we look at status or date if available
        return true;
    })

    const metricCards = [
        { title: 'Total Medicines', value: metrics.totalMedicines || 0 },
        { title: 'In Stock', value: metrics.inStock || 0 },
        { title: 'Low Stock', value: metrics.lowStock || 0 },
        { title: 'Out of Stock', value: metrics.outOfStock || 0 },
        { title: 'Expired', value: metrics.expired || 0 }, // Backend limitation: currently 0
        { title: 'Expiring Soon', value: metrics.expiringSoon || 0 }, // Backend limitation: currently 0
        { title: 'Deactivated Medicines', value: metrics.deactivated || 0 },
    ]

    return (
        <Layout title="Medicine Inventory">
            <div className="max-w-8xl mx-auto">
                {/* 7 Metric Cards */}
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-8 mb-16">
                    {metricCards.map((card) => (
                        <MetricCard
                            key={card.title}
                            title={card.title}
                            value={card.value}
                            onClick={() => setActiveFilter(card.title)}
                            isActive={activeFilter === card.title}
                        />
                    ))}
                </div>

                {/* Main Inventory Table Card */}
                <div className="bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden">
                    <div className="p-12 border-b border-gray-200 bg-gradient-to-r from-primary/10 to-primary/5">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-4xl font-bold text-gray-800">Medicine Inventory</h2>
                            <input
                                type="text"
                                placeholder="Search medicines dynamically..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-96 px-8 py-5 rounded-xl border-2 border-gray-300 focus:border-primary focus:ring-4 focus:ring-primary/20 text-lg transition"
                            />
                        </div>
                        <p className="text-gray-600 text-lg">Current Filter: <span className="font-bold text-primary">{activeFilter}</span></p>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-primary/10 sticky top-0">
                                <tr>
                                    <th className="px-10 py-8 text-left text-xl font-bold text-gray-700">Image</th>
                                    <th className="px-10 py-8 text-left text-xl font-bold text-gray-700">Medicine Name</th>
                                    <th className="px-10 py-8 text-left text-xl font-bold text-gray-700">Generic Name</th>
                                    {/* <th className="px-10 py-8 text-left text-xl font-bold text-gray-700">Dosage Form</th> */}
                                    {/* <th className="px-10 py-8 text-left text-xl font-bold text-gray-700">Strength</th> */}
                                    <th className="px-10 py-8 text-left text-xl font-bold text-gray-700">Manufacturer</th>
                                    {/* <th className="px-10 py-8 text-left text-xl font-bold text-gray-700">Requires Prescription</th> */}
                                    <th className="px-10 py-8 text-left text-xl font-bold text-gray-700">Available Quantity</th>
                                    <th className="px-10 py-8 text-left text-xl font-bold text-gray-700">Price (LKR)</th>
                                    <th className="px-10 py-8 text-left text-xl font-bold text-gray-700">Stock Status</th>
                                    {/* <th className="px-10 py-8 text-left text-xl font-bold text-gray-700">Expiry Date</th> */}
                                    <th className="px-10 py-8 text-left text-xl font-bold text-gray-700">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                {loading ? (
                                    <tr><td colSpan="8" className="text-center py-10 text-xl">Loading inventory...</td></tr>
                                ) : filteredInventory.length === 0 ? (
                                    <tr><td colSpan="8" className="text-center py-10 text-xl">No medicines found.</td></tr>
                                ) : (
                                    filteredInventory.map((item) => (
                                        <tr key={item.inventoryId} className="hover:bg-primary/5 transition-all duration-300">
                                            <td className="px-10 py-8">
                                                {item.imageUrl ? (
                                                    <img src={item.imageUrl} alt={item.medicineName} className="w-20 h-20 rounded-xl object-cover border-2 border-gray-200" />
                                                ) : (
                                                    <div className="w-20 h-20 bg-gray-200 rounded-xl border-2 border-dashed border-gray-400 flex items-center justify-center text-gray-400">No Image</div>
                                                )}
                                            </td>
                                            <td className="px-10 py-8 font-bold text-lg">{item.medicineName}</td>
                                            <td className="px-10 py-8 text-gray-700">{item.genericName}</td>
                                            {/* <td className="px-10 py-8">Tablet</td> NOTE: DTO doesn't have form/strength yet, reusing existing layout cols or adjusting. I will adjust columns to match DTO */}
                                            {/* <td className="px-10 py-8">500mg</td> */}
                                            <td className="px-10 py-8">{item.manufacturer}</td>
                                            {/* <td className="px-10 py-8"><span className="bg-yellow-100 text-yellow-800 px-4 py-2 rounded-full font-bold">Yes</span></td> */}
                                            <td className="px-10 py-8 font-bold text-xl text-green-600">{item.stockQuantity}</td>
                                            <td className="px-10 py-8 font-bold text-lg">{item.price}</td>
                                            <td className="px-10 py-8">
                                                <span className={`px-6 py-3 rounded-full font-bold text-white ${item.status === 'In Stock' ? 'bg-green-600' :
                                                        item.status === 'Low Stock' ? 'bg-orange-600' :
                                                            item.status === 'Out of Stock' ? 'bg-red-600' :
                                                                'bg-gray-500' // Deactivated
                                                    }`}>
                                                    {item.status}
                                                </span>
                                            </td>
                                            {/* <td className="px-10 py-8">2026-12-15</td> */}
                                            <td className="px-10 py-8">
                                                <button className="bg-primary hover:bg-primary-dark text-white font-bold text-lg px-10 py-5 rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
                                                    View / Manage
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </Layout>
    )
}





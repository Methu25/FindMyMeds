import { useState, useEffect, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import Layout from '../../components/pharmacy/Layout'
import MetricCard from '../../components/pharmacy/MetricCard'

export default function MedicineInventory() {
    const navigate = useNavigate()
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
    const filteredInventory = useMemo(() => {
        return inventory.filter(item => {
            // Search filter
            const matchesSearch = searchQuery === '' ||
                item.medicineName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                item.genericName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                (item.dosageForm && item.dosageForm.toLowerCase().includes(searchQuery.toLowerCase())) ||
                item.manufacturer.toLowerCase().includes(searchQuery.toLowerCase());

            if (!matchesSearch) return false;

            // Metric card filter
            if (activeFilter === 'All' || activeFilter === 'Total Medicines') return true;
            if (activeFilter === 'In Stock') return item.status === 'In Stock';
            if (activeFilter === 'Low Stock') return item.status === 'Low Stock';
            if (activeFilter === 'Out of Stock') return item.status === 'Out of Stock';
            if (activeFilter === 'Expired') return item.status === 'Expired';
            if (activeFilter === 'Expiring Soon') return item.status === 'Expiring Soon';
            if (activeFilter === 'Deactivated Medicines') return item.status === 'Deactivated';
            return true;
        })
    }, [inventory, activeFilter, searchQuery])

    const metricCards = [
        { title: 'Total Medicines', value: metrics.totalMedicines || 0 },
        { title: 'In Stock', value: metrics.inStock || 0 },
        { title: 'Low Stock', value: metrics.lowStock || 0 },
        { title: 'Out of Stock', value: metrics.outOfStock || 0 },
        { title: 'Expired', value: metrics.expired || 0 },
        { title: 'Expiring Soon', value: metrics.expiringSoon || 0 },
        { title: 'Deactivated Medicines', value: metrics.deactivated || 0 },
    ]

    return (
        <Layout title="Medicine Inventory">
            <div className="max-w-8xl mx-auto">
                {/* 7 Metric Cards */}
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-6 mb-12">
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
                    <div className="p-8 border-b border-gray-200 bg-gradient-to-r from-primary/10 to-primary/5">
                        <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-4">
                            <div>
                                <h2 className="text-3xl font-bold text-gray-800">Medicine Inventory</h2>
                                <p className="text-gray-500 mt-1">Current Filter: <span className="font-bold text-primary">{activeFilter}</span></p>
                            </div>
                            <div className="w-full md:w-auto">
                                <input
                                    type="text"
                                    placeholder="Search by name, generic, form or manufacturer..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="w-full md:w-96 px-6 py-4 rounded-xl border-2 border-gray-200 focus:border-primary focus:ring-4 focus:ring-primary/10 text-lg transition shadow-sm"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-gray-50 border-b border-gray-200 sticky top-0">
                                <tr>
                                    <th className="px-6 py-5 text-left text-sm font-bold text-gray-500 uppercase tracking-wider">Image</th>
                                    <th className="px-6 py-5 text-left text-sm font-bold text-gray-500 uppercase tracking-wider">Medicine Name</th>
                                    <th className="px-6 py-5 text-left text-sm font-bold text-gray-500 uppercase tracking-wider">Generic Name</th>
                                    <th className="px-6 py-5 text-left text-sm font-bold text-gray-500 uppercase tracking-wider">Form & Strength</th>
                                    <th className="px-6 py-5 text-left text-sm font-bold text-gray-500 uppercase tracking-wider">Prescription</th>
                                    <th className="px-6 py-5 text-left text-sm font-bold text-gray-500 uppercase tracking-wider">Quantity</th>
                                    <th className="px-6 py-5 text-left text-sm font-bold text-gray-500 uppercase tracking-wider">Price (LKR)</th>
                                    <th className="px-6 py-5 text-left text-sm font-bold text-gray-500 uppercase tracking-wider">Status</th>
                                    <th className="px-6 py-5 text-left text-sm font-bold text-gray-500 uppercase tracking-wider">Expiry</th>
                                    <th className="px-6 py-5 text-center text-sm font-bold text-gray-500 uppercase tracking-wider">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {loading ? (
                                    <tr><td colSpan="10" className="text-center py-20 text-xl font-medium text-gray-400 italic">Loading inventory...</td></tr>
                                ) : filteredInventory.length === 0 ? (
                                    <tr><td colSpan="10" className="text-center py-20 text-xl font-medium text-gray-400 italic font-medium">No medicines found matching your criteria.</td></tr>
                                ) : (
                                    filteredInventory.map((item) => (
                                        <tr key={item.inventoryId} className="hover:bg-primary/5 transition-colors group">
                                            <td className="px-6 py-6 border-b border-gray-50">
                                                {item.imageUrl ? (
                                                    <img src={item.imageUrl} alt={item.medicineName} className="w-14 h-14 rounded-lg object-cover border border-gray-200 shadow-sm" />
                                                ) : (
                                                    <div className="w-14 h-14 bg-gray-50 rounded-lg border border-dashed border-gray-300 flex items-center justify-center text-gray-400 text-[10px] text-center p-2">No Image</div>
                                                )}
                                            </td>
                                            <td className="px-6 py-6 border-b border-gray-50 font-bold text-gray-900">{item.medicineName}</td>
                                            <td className="px-6 py-6 border-b border-gray-50 text-gray-600 text-sm">{item.genericName}</td>
                                            <td className="px-6 py-6 border-b border-gray-50">
                                                <div className="text-sm font-medium text-gray-900">{item.dosageForm}</div>
                                                <div className="text-xs text-gray-500">{item.strength}</div>
                                            </td>
                                            <td className="px-6 py-6 border-b border-gray-50">
                                                <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase ${item.requiresPrescription ? 'bg-orange-100 text-orange-700' : 'bg-green-100 text-green-700'}`}>
                                                    {item.requiresPrescription ? 'Yes' : 'No'}
                                                </span>
                                            </td>
                                            <td className="px-6 py-6 border-b border-gray-50 font-bold text-lg text-gray-900">{item.stockQuantity}</td>
                                            <td className="px-6 py-6 border-b border-gray-50 font-bold text-gray-900">{item.price}</td>
                                            <td className="px-6 py-6 border-b border-gray-50">
                                                <span className={`inline-flex items-center justify-center px-4 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-wider w-full text-center border-2 ${item.status === 'In Stock' ? 'bg-green-50 text-green-700 border-green-100' :
                                                        item.status === 'Low Stock' ? 'bg-orange-50 text-orange-700 border-orange-100' :
                                                            item.status === 'Out of Stock' ? 'bg-red-50 text-red-700 border-red-100' :
                                                                item.status === 'Expired' ? 'bg-purple-100 text-purple-700 border-purple-200' :
                                                                    item.status === 'Expiring Soon' ? 'bg-yellow-50 text-yellow-700 border-yellow-100' :
                                                                        'bg-gray-100 text-gray-700 border-gray-200'
                                                    }`}>
                                                    {item.status}
                                                </span>
                                            </td>
                                            <td className="px-6 py-6 border-b border-gray-50 text-sm font-medium text-gray-600">
                                                {item.expiryDate ? new Date(item.expiryDate).toLocaleDateString() : 'N/A'}
                                            </td>
                                            <td className="px-6 py-6 border-b border-gray-50">
                                                <button
                                                    onClick={() => navigate(`/pharmacy/medicines/${item.medicineId}`)}
                                                    className="w-full bg-primary/10 hover:bg-primary text-primary hover:text-white font-bold text-sm px-4 py-3 rounded-lg transition-all duration-200 shadow-sm border border-primary/20"
                                                >
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





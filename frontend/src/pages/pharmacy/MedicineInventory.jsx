// src/pages/pharmacy/MedicineInventory.jsx
import { useState } from 'react'
import Layout from '../../components/pharmacy/Layout'
import MetricCard from '../../components/pharmacy/MetricCard'

export default function MedicineInventory() {
    const [activeFilter, setActiveFilter] = useState('All')

    const metricCards = [
        { title: 'Total Medicines', value: 456 },
        { title: 'In Stock', value: 378 },
        { title: 'Low Stock', value: 45 },
        { title: 'Out of Stock', value: 23 },
        { title: 'Expired', value: 10 },
        { title: 'Expiring Soon', value: 28 },
        { title: 'Deactivated Medicines', value: 15 },
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
                                    <th className="px-10 py-8 text-left text-xl font-bold text-gray-700">Dosage Form</th>
                                    <th className="px-10 py-8 text-left text-xl font-bold text-gray-700">Strength</th>
                                    <th className="px-10 py-8 text-left text-xl font-bold text-gray-700">Requires Prescription</th>
                                    <th className="px-10 py-8 text-left text-xl font-bold text-gray-700">Available Quantity</th>
                                    <th className="px-10 py-8 text-left text-xl font-bold text-gray-700">Stock Status</th>
                                    <th className="px-10 py-8 text-left text-xl font-bold text-gray-700">Expiry Date</th>
                                    <th className="px-10 py-8 text-left text-xl font-bold text-gray-700">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                {[1, 2, 3, 4, 5].map((i) => (
                                    <tr key={i} className="hover:bg-primary/5 transition-all duration-300">
                                        <td className="px-10 py-8">
                                            <div className="w-20 h-20 bg-gray-200 rounded-xl border-2 border-dashed border-gray-400"></div>
                                        </td>
                                        <td className="px-10 py-8 font-bold text-lg">Paracetamol {500 + i * 100}mg</td>
                                        <td className="px-10 py-8 text-gray-700">Acetaminophen</td>
                                        <td className="px-10 py-8">Tablet</td>
                                        <td className="px-10 py-8">{500 + i * 100}mg</td>
                                        <td className="px-10 py-8">
                                            <span className="bg-yellow-100 text-yellow-800 px-4 py-2 rounded-full font-bold">Yes</span>
                                        </td>
                                        <td className="px-10 py-8 font-bold text-xl text-green-600">{120 - i * 10}</td>
                                        <td className="px-10 py-8">
                                            <span className={`px-6 py-3 rounded-full font-bold text-white ${i % 3 === 0 ? 'bg-green-600' : i % 3 === 1 ? 'bg-orange-600' : 'bg-red-600'}`}>
                                                {i % 3 === 0 ? 'In Stock' : i % 3 === 1 ? 'Low Stock' : 'Out of Stock'}
                                            </span>
                                        </td>
                                        <td className="px-10 py-8">2026-12-{15 + i}</td>
                                        <td className="px-10 py-8">
                                            <button className="bg-primary hover:bg-primary-dark text-white font-bold text-lg px-10 py-5 rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
                                                View / Manage
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </Layout>
    )
}





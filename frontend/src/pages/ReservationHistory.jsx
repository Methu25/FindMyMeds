// src/pages/pharmacy/ReservationHistory.jsx
import { useState } from 'react'
import Layout from '../../components/pharmacy/Layout'
import MetricCard from '../../components/pharmacy/MetricCard'

export default function ReservationHistory() {
  const [activeType, setActiveType] = useState('Successful')

  const historyCards = [
    { type: 'Successful', title: 'Successful Reservations – Collected by customers', count: 342, color: 'bg-green-500' },
    { type: 'Uncollected', title: 'Uncollected / Expired Reservations – Ready to Pick Up not collected', count: 89, color: 'bg-orange-500' },
    { type: 'Rejected', title: 'Rejected Reservations – Explicitly rejected or canceled', count: 67, color: 'bg-red-500' },
  ]

  return (
    <Layout title="Reservation History">
      <div className="max-w-8xl mx-auto">
        {/* 3 Clickable Metric Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16">
          {historyCards.map((card) => (
            <MetricCard
              key={card.type}
              title={card.title}
              value={card.count}
              onClick={() => setActiveType(card.type)}
            />
          ))}
        </div>

        {/* Read-Only Table Card */}
        <div className="bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden">
          <div className="p-12 border-b border-gray-200 bg-gradient-to-r from-primary/10 to-primary/5">
            <h2 className="text-4xl font-bold text-gray-800">
              {activeType} Reservations (Last 30 Days)
            </h2>
            <p className="text-xl text-gray-600 mt-4">
              Read-only legal pharmacy records • No modification/deletion allowed • Auto-deleted after 30 days for compliance
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-primary/10 sticky top-0">
                <tr>
                  <th className="px-10 py-8 text-left text-xl font-bold text-gray-700">Reservation ID</th>
                  <th className="px-10 py-8 text-left text-xl font-bold text-gray-700">Reservation Date</th>
                  <th className="px-10 py-8 text-left text-xl font-bold text-gray-700">Customer Name</th>
                  <th className="px-10 py-8 text-left text-xl font-bold text-gray-700">Total Medicines (count)</th>
                  <th className="px-10 py-8 text-left text-xl font-bold text-gray-700">Total Quantity</th>
                  <th className="px-10 py-8 text-left text-xl font-bold text-gray-700">Total Amount</th>
                  <th className="px-10 py-8 text-left text-xl font-bold text-gray-700">Status</th>
                  <th className="px-10 py-8 text-left text-xl font-bold text-gray-700">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {[1, 2, 3, 4, 5].map((i) => (
                  <tr key={i} className="hover:bg-primary/5 transition-all duration-300 even:bg-gray-50">
                    <td className="px-10 py-8 font-bold text-lg">RES-2025-{900 + i}</td>
                    <td className="px-10 py-8">2025-12-{20 + i}</td>
                    <td className="px-10 py-8 font-semibold">Customer {i} Silva</td>
                    <td className="px-10 py-8 text-center font-bold">{5 + i}</td>
                    <td className="px-10 py-8 text-center font-bold">{15 + i * 5}</td>
                    <td className="px-10 py-8 font-bold text-xl text-green-600">Rs. {1800 + i * 300}</td>
                    <td className="px-10 py-8">
                      <span className={`px-8 py-4 rounded-full text-white font-bold shadow-md ${
                        activeType === 'Successful' ? 'bg-green-600' :
                        activeType === 'Uncollected' ? 'bg-orange-600' : 'bg-red-600'
                      }`}>
                        {activeType === 'Successful' ? 'Collected' : activeType === 'Uncollected' ? 'Expired' : 'Rejected'}
                      </span>
                    </td>
                    <td className="px-10 py-8">
                      <button className="bg-primary hover:bg-primary-dark text-white font-bold text-lg px-12 py-5 rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300">
                        View Details
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="p-10 border-t border-gray-200 flex justify-center bg-gray-50">
            <div className="flex gap-6">
              <button className="px-10 py-5 rounded-xl bg-gray-300 hover:bg-gray-400 font-bold text-lg">Previous</button>
              <button className="px-10 py-5 rounded-xl bg-primary text-white font-bold text-lg shadow-lg">1</button>
              <button className="px-10 py-5 rounded-xl bg-gray-300 hover:bg-gray-400 font-bold text-lg">2</button>
              <button className="px-10 py-5 rounded-xl bg-gray-300 hover:bg-gray-400 font-bold text-lg">3</button>
              <button className="px-10 py-5 rounded-xl bg-gray-300 hover:bg-gray-400 font-bold text-lg">Next</button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}
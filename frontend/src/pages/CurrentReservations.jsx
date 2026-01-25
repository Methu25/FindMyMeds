// src/pages/pharmacy/CurrentReservations.jsx
import { useState } from 'react'
import Layout from '../../components/pharmacy/Layout'
import MetricCard from '../../components/pharmacy/MetricCard'

export default function CurrentReservations() {
  const [activeStatus, setActiveStatus] = useState('Pending')

  const statusCards = [
    { status: 'Pending', count: 23, color: 'bg-yellow-500' },
    { status: 'Confirmed', count: 15, color: 'bg-blue-500' },
    { status: 'Ongoing', count: 8, color: 'bg-purple-500' },
    { status: 'Ready to Pick Up', count: 18, color: 'bg-orange-500' },
    { status: 'Marked as Collected', count: 12, color: 'bg-green-500' },
    { status: 'Rejected', count: 5, color: 'bg-red-500' },
  ]

  return (
    <Layout title="Current Reservations">
      <div className="max-w-8xl mx-auto">
        {/* 6 Clickable Status Cards */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 mb-16">
          {statusCards.map((card) => (
            <MetricCard
              key={card.status}
              title={card.status}
              value={card.count}
              onClick={() => setActiveStatus(card.status)}
            />
          ))}
        </div>

        {/* Main Table Card */}
        <div className="bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden">
          <div className="p-12 border-b border-gray-200 bg-gradient-to-r from-primary/10 to-primary/5">
            <h2 className="text-4xl font-bold text-gray-800">{activeStatus} Reservations</h2>
            <p className="text-xl text-gray-600 mt-4">
              {activeStatus === 'Pending' && 'These require immediate action from the pharmacy.'}
              {activeStatus === 'Confirmed' && 'Approved but not yet processed.'}
              {activeStatus === 'Ongoing' && 'Currently being prepared.'}
              {activeStatus === 'Ready to Pick Up' && 'Ready for customer pickup.'}
              {activeStatus === 'Marked as Collected' && 'Customer has collected the order.'}
              {activeStatus === 'Rejected' && 'Explicitly rejected or canceled.'}
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-primary/10 sticky top-0">
                <tr>
                  <th className="px-10 py-8 text-left text-xl font-bold text-gray-700">Reservation ID</th>
                  <th className="px-10 py-8 text-left text-xl font-bold text-gray-700">Reservation Date</th>
                  <th className="px-10 py-8 text-left text-xl font-bold text-gray-700">Pickup Date</th>
                  <th className="px-10 py-8 text-left text-xl font-bold text-gray-700">Customer Name</th>
                  <th className="px-10 py-8 text-left text-xl font-bold text-gray-700">Customer Location / Address</th>
                  <th className="px-10 py-8 text-left text-xl font-bold text-gray-700">Total Medicines (count)</th>
                  <th className="px-10 py-8 text-left text-xl font-bold text-gray-700">Total Quantity</th>
                  <th className="px-10 py-8 text-left text-xl font-bold text-gray-700">Total Amount</th>
                  <th className="px-10 py-8 text-left text-xl font-bold text-gray-700">Status (Pending — badge)</th>
                  <th className="px-10 py-8 text-left text-xl font-bold text-gray-700">View Details (button)</th>
                  <th className="px-10 py-8 text-left text-xl font-bold text-gray-700">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {[1, 2, 3, 4, 5].map((i) => (
                  <tr key={i} className="hover:bg-primary/5 transition-all duration-300 even:bg-gray-50">
                    <td className="px-10 py-8 font-bold text-lg">RES-2026-{100 + i}</td>
                    <td className="px-10 py-8">2026-01-{19 + i}</td>
                    <td className="px-10 py-8">2026-01-{20 + i}</td>
                    <td className="px-10 py-8 font-semibold">Customer {i} Perera</td>
                    <td className="px-10 py-8">Colombo 0{i}, Sri Lanka</td>
                    <td className="px-10 py-8 text-center font-bold">{4 + i}</td>
                    <td className="px-10 py-8 text-center font-bold">{12 + i * 3}</td>
                    <td className="px-10 py-8 font-bold text-xl text-green-600">Rs. {3250 + i * 500}</td>
                    <td className="px-10 py-8">
                      <span className="bg-yellow-500 text-white px-6 py-3 rounded-full font-bold shadow-md">
                        {activeStatus}
                      </span>
                    </td>
                    <td className="px-10 py-8">
                      <button className="bg-gray-600 hover:bg-gray-700 text-white font-bold px-8 py-4 rounded-xl shadow-lg hover:shadow-xl transition">
                        View Details
                      </button>
                    </td>
                    <td className="px-10 py-8 space-x-4">
                      {activeStatus === 'Pending' && (
                        <>
                          <button className="bg-primary hover:bg-primary-dark text-white font-bold px-8 py-4 rounded-xl shadow-lg hover:shadow-xl transition">
                            Confirm
                          </button>
                          <button className="bg-red-600 hover:bg-red-700 text-white font-bold px-8 py-4 rounded-xl shadow-lg hover:shadow-xl transition">
                            Reject
                          </button>
                        </>
                      )}
                      {activeStatus === 'Confirmed' && (
                        <button className="bg-purple-600 hover:bg-purple-700 text-white font-bold px-8 py-4 rounded-xl shadow-lg">
                          Mark as Ongoing
                        </button>
                      )}
                      {activeStatus === 'Ongoing' && (
                        <button className="bg-orange-600 hover:bg-orange-700 text-white font-bold px-8 py-4 rounded-xl shadow-lg">
                          Mark as Ready
                        </button>
                      )}
                      {activeStatus === 'Ready to Pick Up' && (
                        <button className="bg-green-600 hover:bg-green-700 text-white font-bold px-8 py-4 rounded-xl shadow-lg">
                          Mark as Collected
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="p-10 border-t border-gray-200 flex justify-center">
            <div className="flex gap-4">
              <button className="px-8 py-4 rounded-xl bg-gray-200 hover:bg-gray-300 font-bold text-lg">Previous</button>
              <button className="px-8 py-4 rounded-xl bg-primary text-white font-bold text-lg shadow-lg">1</button>
              <button className="px-8 py-4 rounded-xl bg-gray-200 hover:bg-gray-300 font-bold text-lg">2</button>
              <button className="px-8 py-4 rounded-xl bg-gray-200 hover:bg-gray-300 font-bold text-lg">Next</button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}
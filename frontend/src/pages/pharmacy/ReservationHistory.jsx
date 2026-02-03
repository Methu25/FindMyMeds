import { useState, useEffect } from 'react'
import Layout from '../../components/pharmacy/Layout'
import MetricCard from '../../components/pharmacy/MetricCard'

export default function ReservationHistory() {
  const [activeType, setActiveType] = useState('COLLECTED')
  const [history, setHistory] = useState([])
  const [counts, setCounts] = useState([0, 0, 0])
  const [loading, setLoading] = useState(true)

  const historyCards = [
    { type: 'COLLECTED', label: 'Successful', title: 'Successful Reservations – Collected by customers', index: 0, color: 'bg-green-500' },
    { type: 'EXPIRED', label: 'Uncollected', title: 'Uncollected / Expired Reservations – Ready to Pick Up not collected', index: 1, color: 'bg-orange-500' },
    { type: 'CANCELLED', label: 'Rejected', title: 'Rejected Reservations – Explicitly rejected or canceled', index: 2, color: 'bg-red-500' },
  ]

  const getHeaders = () => {
    const token = localStorage.getItem('token')
    return {
      'Authorization': `Bearer ${token}`
    }
  }

  const fetchHistoryCounts = async () => {
    try {
      const response = await fetch('http://localhost:8080/api/pharmacy/reservations/history/counts', {
        headers: getHeaders()
      })
      if (response.ok) {
        const data = await response.json()
        setCounts(data)
      }
    } catch (error) {
      console.error('Failed to fetch history counts:', error)
    }
  }

  const fetchHistory = async () => {
    setLoading(true)
    try {
      const response = await fetch(`http://localhost:8080/api/pharmacy/reservations/history?type=${activeType}&page=0&size=10`, {
        headers: getHeaders()
      })
      if (response.ok) {
        const data = await response.json()
        setHistory(data)
      }
    } catch (error) {
      console.error('Failed to fetch history:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchHistoryCounts()
  }, [])

  useEffect(() => {
    fetchHistory()
  }, [activeType])

  return (
    <Layout title="Reservation History">
      <div className="max-w-8xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16">
          {historyCards.map((card) => (
            <MetricCard
              key={card.type}
              title={card.title}
              value={counts[card.index] || 0}
              onClick={() => setActiveType(card.type)}
            />
          ))}
        </div>

        <div className="bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden">
          <div className="p-12 border-b border-gray-200 bg-gradient-to-r from-teal-500/10 to-teal-600/5">
            <h2 className="text-4xl font-bold text-gray-800">
              {activeType} Reservations (Last 30 Days)
            </h2>
            <p className="text-xl text-gray-600 mt-4">
              Read-only legal pharmacy records • No modification/deletion allowed • Auto-deleted after 30 days for compliance
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 sticky top-0">
                <tr>
                  <th className="px-10 py-8 text-left text-xl font-bold text-gray-700">Reservation Code</th>
                  <th className="px-10 py-8 text-left text-xl font-bold text-gray-700">Reservation Date</th>
                  <th className="px-10 py-8 text-left text-xl font-bold text-gray-700">Customer Name</th>
                  <th className="px-10 py-8 text-left text-xl font-bold text-gray-700">Total Amount</th>
                  <th className="px-10 py-8 text-left text-xl font-bold text-gray-700">Status</th>
                  <th className="px-10 py-8 text-left text-xl font-bold text-gray-700">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {loading ? (
                  <tr><td colSpan="6" className="text-center py-20 text-2xl text-gray-500">Loading...</td></tr>
                ) : history.length === 0 ? (
                  <tr><td colSpan="6" className="text-center py-20 text-2xl text-gray-500">No records found.</td></tr>
                ) : (
                  history.map((item) => (
                    <tr key={item.id} className="hover:bg-gray-50 transition-all duration-300 even:bg-gray-50/50">
                      <td className="px-10 py-8 font-bold text-lg">{item.reservationCode}</td>
                      <td className="px-10 py-8">{item.reservationDate}</td>
                      <td className="px-10 py-8 font-semibold">{item.civilianName}</td>
                      <td className="px-10 py-8 font-bold text-xl text-green-600">Rs. {item.totalAmount}</td>
                      <td className="px-10 py-8">
                        <span className={`px-8 py-4 rounded-full text-white font-bold shadow-md ${activeType === 'COLLECTED' ? 'bg-green-600' :
                          activeType === 'EXPIRED' ? 'bg-orange-600' : 'bg-red-600'
                          }`}>
                          {item.status}
                        </span>
                      </td>
                      <td className="px-10 py-8">
                        <button className="bg-teal-600 hover:bg-teal-700 text-white font-bold text-lg px-12 py-5 rounded-xl transition-all duration-300">
                          View Details
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

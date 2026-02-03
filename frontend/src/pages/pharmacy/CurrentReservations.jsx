import { useState, useEffect } from 'react'
import Layout from '../../components/pharmacy/Layout'
import MetricCard from '../../components/pharmacy/MetricCard'

export default function CurrentReservations() {
  const [activeStatus, setActiveStatus] = useState('PENDING')
  const [reservations, setReservations] = useState([])
  const [counts, setCounts] = useState([0, 0, 0, 0, 0, 0])
  const [loading, setLoading] = useState(true)

  const statusCards = [
    { status: 'PENDING', label: 'Pending', color: 'bg-yellow-500', index: 0 },
    { status: 'CONFIRMED', label: 'Confirmed', color: 'bg-blue-500', index: 1 },
    { status: 'ONGOING', label: 'Ongoing', color: 'bg-purple-500', index: 2 },
    { status: 'READY', label: 'Ready', color: 'bg-orange-500', index: 3 },
    { status: 'COLLECTED', label: 'Collected', color: 'bg-green-500', index: 4 },
    { status: 'CANCELLED', label: 'Cancelled', color: 'bg-red-500', index: 5 },
  ]

  const getHeaders = () => {
    const token = localStorage.getItem('token')
    return {
      'Authorization': `Bearer ${token}`
    }
  }

  const fetchCounts = async () => {
    try {
      const response = await fetch('http://localhost:8080/api/pharmacy/reservations/current/counts', {
        headers: getHeaders()
      })
      if (response.ok) {
        const data = await response.json()
        setCounts(data)
      }
    } catch (error) {
      console.error('Failed to fetch counts:', error)
    }
  }

  const fetchReservations = async () => {
    setLoading(true)
    try {
      const response = await fetch(`http://localhost:8080/api/pharmacy/reservations/current?status=${activeStatus}&page=0&size=10`, {
        headers: getHeaders()
      })
      if (response.ok) {
        const data = await response.json()
        setReservations(data)
      }
    } catch (error) {
      console.error('Failed to fetch reservations:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchCounts()
  }, [])

  useEffect(() => {
    fetchReservations()
  }, [activeStatus])

  const handleUpdateStatus = async (id, newStatus) => {
    try {
      const response = await fetch(`http://localhost:8080/api/pharmacy/reservations/current/${id}/status?status=${newStatus}`, {
        method: 'PUT',
        headers: getHeaders()
      })
      if (response.ok) {
        fetchCounts()
        fetchReservations()
      }
    } catch (error) {
      console.error('Failed to update status:', error)
    }
  }

  return (
    <Layout title="Current Reservations">
      <div className="max-w-8xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 mb-16">
          {statusCards.map((card) => (
            <MetricCard
              key={card.status}
              title={card.label}
              value={counts[card.index] || 0}
              onClick={() => setActiveStatus(card.status)}
            />
          ))}
        </div>

        <div className="bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden">
          <div className="p-12 border-b border-gray-200 bg-gradient-to-r from-teal-500/10 to-teal-600/5">
            <h2 className="text-4xl font-bold text-gray-800">{activeStatus} Reservations</h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 sticky top-0">
                <tr>
                  <th className="px-10 py-8 text-left text-xl font-bold text-gray-700">Reservation Code</th>
                  <th className="px-10 py-8 text-left text-xl font-bold text-gray-700">Customer Name</th>
                  <th className="px-10 py-8 text-left text-xl font-bold text-gray-700">Pickup Date</th>
                  <th className="px-10 py-8 text-left text-xl font-bold text-gray-700">Total Amount</th>
                  <th className="px-10 py-8 text-left text-xl font-bold text-gray-700">Status</th>
                  <th className="px-10 py-8 text-left text-xl font-bold text-gray-700">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {loading ? (
                  <tr><td colSpan="6" className="text-center py-20 text-2xl text-gray-500">Loading...</td></tr>
                ) : reservations.length === 0 ? (
                  <tr><td colSpan="6" className="text-center py-20 text-2xl text-gray-500">No reservations found.</td></tr>
                ) : (
                  reservations.map((res) => (
                    <tr key={res.id} className="hover:bg-gray-50 transition-all duration-300 even:bg-gray-50/50">
                      <td className="px-10 py-8 font-bold text-lg">{res.reservationCode}</td>
                      <td className="px-10 py-8 font-semibold">{res.civilianName}</td>
                      <td className="px-10 py-8">{res.pickupDate}</td>
                      <td className="px-10 py-8 font-bold text-xl text-green-600">Rs. {res.totalAmount}</td>
                      <td className="px-10 py-8">
                        <span className="bg-yellow-500 text-white px-6 py-3 rounded-full font-bold shadow-md">
                          {res.status}
                        </span>
                      </td>
                      <td className="px-10 py-8 space-x-4">
                        {activeStatus === 'PENDING' && (
                          <>
                            <button onClick={() => handleUpdateStatus(res.id, 'CONFIRMED')} className="bg-teal-600 hover:bg-teal-700 text-white font-bold px-8 py-4 rounded-xl">Confirm</button>
                            <button onClick={() => handleUpdateStatus(res.id, 'CANCELLED')} className="bg-red-600 hover:bg-red-700 text-white font-bold px-8 py-4 rounded-xl">Reject</button>
                          </>
                        )}
                        {activeStatus === 'CONFIRMED' && (
                          <button onClick={() => handleUpdateStatus(res.id, 'ONGOING')} className="bg-purple-600 hover:bg-purple-700 text-white font-bold px-8 py-4 rounded-xl">Mark Ongoing</button>
                        )}
                        {activeStatus === 'ONGOING' && (
                          <button onClick={() => handleUpdateStatus(res.id, 'READY')} className="bg-orange-600 hover:bg-orange-700 text-white font-bold px-8 py-4 rounded-xl">Mark Ready</button>
                        )}
                        {activeStatus === 'READY' && (
                          <button onClick={() => handleUpdateStatus(res.id, 'COLLECTED')} className="bg-green-600 hover:bg-green-700 text-white font-bold px-8 py-4 rounded-xl">Mark Collected</button>
                        )}
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

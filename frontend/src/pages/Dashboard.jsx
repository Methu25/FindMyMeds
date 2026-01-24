import Layout from '../components/Layout'
import MetricCard from '../components/MetricCard'
import { Package, CheckCircle, XCircle, Pill } from 'lucide-react'

export default function Dashboard() {
  return (
    <Layout title="Dashboard">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-16">
        <MetricCard title="Today's Reservations" value={175} icon={Package} />
        <MetricCard title="Today's Completed" value={74} icon={CheckCircle} />
        <MetricCard title="Rejected Orders" value={29} icon={XCircle} />
        <MetricCard title="In Stock Medicines" value={178} icon={Pill} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        <div className="bg-white rounded-2xl shadow-2xl border border-gray-200 p-12 hover:shadow-3xl transition-all duration-300">
          <h3 className="text-3xl font-bold text-gray-800 mb-10">Quick Launcher</h3>
          <div className="grid grid-cols-2 gap-8">
            {[
              'Add New Medicines',
              'Manage Inventory',
              'View Current Reservations',
              'View Reservation History',
              'Check Inquiries',
              'Update Price'
            ].map((action) => (
              <button
                key={action}
                className="bg-gradient-to-r from-primary-light to-primary/20 hover:from-primary hover:to-primary-dark text-primary hover:text-white font-bold text-lg py-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
              >
                {action}
              </button>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-2xl border border-gray-200 p-12 hover:shadow-3xl transition-all duration-300">
          <h3 className="text-3xl font-bold text-gray-800 mb-10">Stock Health Overview</h3>
          <div className="h-96 bg-gradient-to-br from-primary/10 to-primary/5 rounded-2xl flex items-center justify-center border-4 border-dashed border-primary/30">
            <p className="text-4xl font-bold text-primary">Charts Coming Soon</p>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-2xl border border-gray-200 p-12 hover:shadow-3xl transition-all duration-300">
          <h3 className="text-3xl font-bold text-gray-800 mb-10">Recent Alerts</h3>
          <div className="space-y-8">
            {[
              'Low Stock: Paracetamol (12 left)',
              '5 Medicines Expiring Soon',
              'High-Demand Medicine: Amoxicillin'
            ].map((alert) => (
              <div key={alert} className="p-8 bg-gradient-to-r from-red-50 to-orange-50 rounded-2xl border border-red-200 flex justify-between items-center shadow-lg">
                <p className="text-xl font-bold text-gray-800">{alert}</p>
                <span className="bg-red-600 text-white px-6 py-3 rounded-full font-bold">High Priority</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  )
}
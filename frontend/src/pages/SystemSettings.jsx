// src/pages/SystemSettings.jsx
import Layout from '../components/Layout'

export default function SystemSettings() {
  return (
    <Layout title="System Settings">
      <div className="max-w-7xl mx-auto py-8">
        <h1 className="text-4xl font-bold text-gray-800 mb-12 text-center">
          Pharmacy System Settings
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Card 1: Notification Control */}
          <div className="bg-white rounded-2xl shadow-xl border border-gray-200 p-10">
            <h2 className="text-2xl font-bold text-primary mb-8">Notification Control</h2>
            <div className="space-y-8">
              <label className="flex items-center justify-between cursor-pointer">
                <span className="text-lg text-gray-700">New Reservation Alerts</span>
                <input type="checkbox" defaultChecked className="w-8 h-8 text-primary rounded-lg focus:ring-primary" />
              </label>
              <label className="flex items-center justify-between cursor-pointer">
                <span className="text-lg text-gray-700">Low Stock Warnings</span>
                <input type="checkbox" defaultChecked className="w-8 h-8 text-primary rounded-lg focus:ring-primary" />
              </label>
              <label className="flex items-center justify-between cursor-pointer">
                <span className="text-lg text-gray-700">Expiry Notifications</span>
                <input type="checkbox" defaultChecked className="w-8 h-8 text-primary rounded-lg focus:ring-primary" />
              </label>
              <label className="flex items-center justify-between cursor-pointer">
                <span className="text-lg text-gray-700">System Messages</span>
                <input type="checkbox" className="w-8 h-8 text-primary rounded-lg focus:ring-primary" />
              </label>
            </div>
            <button className="mt-12 w-full bg-primary hover:bg-primary-dark text-white font-bold py-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
              Save Preferences
            </button>
          </div>

          {/* Card 2: Display / UI Preferences */}
          <div className="bg-white rounded-2xl shadow-xl border border-gray-200 p-10">
            <h2 className="text-2xl font-bold text-primary mb-8">Display / UI Preferences</h2>
            <div className="space-y-10">
              <div>
                <label className="block text-lg text-gray-700 mb-3">Theme</label>
                <select className="w-full border-2 border-gray-300 rounded-xl px-6 py-4 text-lg focus:border-primary focus:ring-4 focus:ring-primary/20 transition">
                  <option>Light Mode</option>
                  <option>Dark Mode (Future Scope)</option>
                </select>
              </div>
              <div>
                <label className="block text-lg text-gray-700 mb-3">Default Landing Page</label>
                <select className="w-full border-2 border-gray-300 rounded-xl px-6 py-4 text-lg focus:border-primary focus:ring-4 focus:ring-primary/20 transition">
                  <option>Dashboard</option>
                  <option>Current Reservations</option>
                  <option>Medicine Inventory</option>
                </select>
              </div>
              <div>
                <label className="block text-lg text-gray-700 mb-3">Table Rows Per Page</label>
                <select className="w-full border-2 border-gray-300 rounded-xl px-6 py-4 text-lg focus:border-primary focus:ring-4 focus:ring-primary/20 transition">
                  <option>10</option>
                  <option>25</option>
                  <option>50</option>
                </select>
              </div>
            </div>
            <button className="mt-12 w-full bg-primary hover:bg-primary-dark text-white font-bold py-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
              Apply Settings
            </button>
          </div>

          {/* Card 3: Data Management */}
          <div className="bg-white rounded-2xl shadow-xl border border-gray-200 p-10">
            <h2 className="text-2xl font-bold text-primary mb-8">Data Management</h2>
            <div className="space-y-10">
              <div className="text-center p-8 bg-gray-50 rounded-xl border-2 border-dashed border-gray-300">
                <p className="text-lg text-gray-600 mb-4">Export All Data</p>
                <button className="bg-primary hover:bg-primary-dark text-white font-bold px-8 py-4 rounded-xl shadow-lg hover:shadow-xl transition">
                  Export as CSV
                </button>
                <button className="ml-4 bg-gray-600 hover:bg-gray-700 text-white font-bold px-8 py-4 rounded-xl shadow-lg hover:shadow-xl transition">
                  Export as PDF
                </button>
              </div>
              <div className="text-center p-8 bg-red-50 rounded-xl border-2 border-dashed border-red-300">
                <p className="text-lg text-red-700 mb-4">Clear Cache & Temporary Data</p>
                <button className="bg-red-600 hover:bg-red-700 text-white font-bold px-10 py-4 rounded-xl shadow-lg hover:shadow-xl transition">
                  Clear All Temporary Data
                </button>
              </div>
              <p className="text-sm text-gray-500 text-center mt-8">
                Note: Reservation history is automatically deleted after 30 days for compliance.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-16 text-center">
          <p className="text-sm text-gray-500 italic">
            This page is minimal and academic-friendly as per design guidelines. Advanced features can be added in future scope.
          </p>
        </div>
      </div>
    </Layout>
  )
}
import Layout from '../components/Layout'

export default function SystemSettings() {
  return (
    <Layout title="System Settings">
      <div className="max-w-6xl mx-auto grid grid-cols-3 gap-8">
        <div className="bg-white p-8 rounded-xl shadow-sm border">
          <h3 className="text-xl font-semibold mb-6">Notification Settings</h3>
          {['New Reservations', 'Inventory Alerts', 'Expiry Alerts', 'System Messages'].map((item) => (
            <label key={item} className="flex items-center justify-between py-4">
              <span>{item}</span>
              <input type="checkbox" defaultChecked className="w-6 h-6 text-primary rounded" />
            </label>
          ))}
          <button className="mt-8 w-full bg-primary text-white py-3 rounded-lg">Save</button>
        </div>

        <div className="bg-white p-8 rounded-xl shadow-sm border">
          <h3 className="text-xl font-semibold mb-6">Display Preferences</h3>
          <div className="space-y-6">
            <div>
              <label className="block mb-2">Theme</label>
              <select className="w-full border rounded-lg px-5 py-3">
                <option>Light</option>
                <option>Dark</option>
              </select>
            </div>
            <div>
              <label className="block mb-2">Default Homepage</label>
              <select className="w-full border rounded-lg px-5 py-3">
                <option>Dashboard</option>
                <option>Reservations</option>
              </select>
            </div>
          </div>
          <button className="mt-8 w-full bg-primary text-white py-3 rounded-lg">Save</button>
        </div>

        <div className="bg-white p-8 rounded-xl shadow-sm border">
          <h3 className="text-xl font-semibold mb-6">Data & Privacy</h3>
          <button className="w-full bg-primary text-white py-3 rounded-lg mb-4">Export History</button>
          <button className="w-full border border-red-500 text-red-600 py-3 rounded-lg">Clear Notifications</button>
        </div>
      </div>
    </Layout>
  )
}
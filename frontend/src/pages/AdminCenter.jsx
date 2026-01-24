import Layout from '../components/Layout'

export default function AdminCenter() {
  return (
    <Layout title="Admin Center">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <div className="bg-white rounded-2xl shadow-2xl border border-gray-200 p-12 hover:shadow-3xl transition-all duration-300">
            <h3 className="text-4xl font-bold text-primary mb-12 text-center">Pharmacy Profile</h3>
            <div className="space-y-8 text-xl">
              <div className="flex justify-between py-6 border-b-2 border-gray-100">
                <span className="font-bold text-gray-700">Pharmacy Name</span>
                <span className="font-medium">Healthy Life Pharmacy</span>
              </div>
              <div className="flex justify-between py-6 border-b-2 border-gray-100">
                <span className="font-bold text-gray-700">License Number</span>
                <span className="font-medium">PH-REG-4521</span>
              </div>
              <div className="flex justify-between py-6 border-b-2 border-gray-100">
                <span className="font-bold text-gray-700">Owner</span>
                <span className="font-medium">Dr. Nimal Fernando</span>
              </div>
              <div className="flex justify-between py-6 border-b-2 border-gray-100">
                <span className="font-bold text-gray-700">Phone</span>
                <span className="font-medium">+94 77 123 4567</span>
              </div>
              <div className="flex justify-between py-6 border-b-2 border-gray-100">
                <span className="font-bold text-gray-700">Email</span>
                <span className="font-medium">info@healthylife.lk</span>
              </div>
              <div className="flex justify-between py-6">
                <span className="font-bold text-gray-700">Address</span>
                <span className="font-medium">123 Galle Road, Colombo 03</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-2xl border border-gray-200 p-12 hover:shadow-3xl transition-all duration-300">
            <h3 className="text-4xl font-bold text-primary mb-12 text-center">Contact Admin</h3>
            <form className="space-y-10">
              <div>
                <label className="block text-xl font-bold text-gray-700 mb-4">Type</label>
                <select className="w-full border-2 border-gray-300 rounded-xl px-8 py-5 text-xl focus:border-primary focus:ring-4 focus:ring-primary/20 transition">
                  <option>Report Issue</option>
                  <option>Inquiry</option>
                </select>
              </div>
              <div>
                <label className="block text-xl font-bold text-gray-700 mb-4">Title</label>
                <input type="text" placeholder="Enter title..." className="w-full border-2 border-gray-300 rounded-xl px-8 py-5 text-xl focus:border-primary focus:ring-4 focus:ring-primary/20 transition" />
              </div>
              <div>
                <label className="block text-xl font-bold text-gray-700 mb-4">Description</label>
                <textarea rows="10" placeholder="Describe your issue or inquiry..." className="w-full border-2 border-gray-300 rounded-xl px-8 py-5 text-xl focus:border-primary focus:ring-4 focus:ring-primary/20 transition resize-none"></textarea>
              </div>
              <button className="w-full bg-primary hover:bg-primary-dark text-white font-bold text-2xl py-6 rounded-xl shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:-translate-y-1">
                Submit Report
              </button>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  )
}
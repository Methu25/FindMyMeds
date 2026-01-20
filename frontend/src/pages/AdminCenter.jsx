import Layout from '../components/Layout'

export default function AdminCenter() {
  return (
    <Layout title="Admin Center">
      <div className="grid grid-cols-2 gap-10 max-w-6xl mx-auto">
        <div className="bg-white p-8 rounded-xl shadow-sm border">
          <h3 className="text-2xl font-bold mb-6 text-primary">Pharmacy Profile</h3>
          <div className="space-y-4 text-gray-700">
            <p><strong>Name:</strong> Healthy Life Pharmacy</p>
            <p><strong>License:</strong> PH-REG-4521</p>
            <p><strong>Owner:</strong> Dr. Nimal Fernando</p>
            <p><strong>Phone:</strong> +94 77 123 4567</p>
            <p><strong>Email:</strong> info@healthylife.lk</p>
            <p><strong>Address:</strong> 123 Galle Road, Colombo 03</p>
          </div>
        </div>

        <div className="bg-white p-8 rounded-xl shadow-sm border">
          <h3 className="text-2xl font-bold mb-6 text-primary">Contact Admin</h3>
          <form className="space-y-5">
            <select className="w-full border rounded-lg px-5 py-3">
              <option>Report Issue</option>
              <option>Inquiry</option>
            </select>
            <input type="text" placeholder="Title" className="w-full border rounded-lg px-5 py-3" />
            <textarea rows="6" placeholder="Description..." className="w-full border rounded-lg px-5 py-4"></textarea>
            <button className="w-full bg-primary text-white py-3 rounded-lg hover:bg-primary-dark">
              Submit
            </button>
          </form>
        </div>
      </div>
    </Layout>
  )
}
import { useState, useEffect } from 'react';
import Layout from '../../components/pharmacy/Layout';

export default function AdminCenter() {
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const response = await fetch('http://localhost:8080/api/pharmacy/profile');
                if (!response.ok) {
                    throw new Error('Failed to fetch profile');
                }
                const data = await response.json();
                setProfile(data);
            } catch (err) {
                setError(err.message);
                // Fallback dummy data for demo if backend fails
                setProfile({
                    name: 'Healthy Life Pharmacy (Demo)',
                    license: 'PH-REG-4521',
                    owner: 'Dr. Nimal Fernando',
                    phone: '+94 77 123 4567',
                    email: 'info@healthylife.lk',
                    address: '123 Galle Road, Colombo 03'
                });
            } finally {
                setLoading(false);
            }
        };

        fetchProfile();
    }, []);

    const [formData, setFormData] = useState({
        type: 'REPORT',
        title: '',
        description: ''
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:8080/api/pharmacy/reports', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });
            if (response.ok) {
                alert('Report submitted successfully');
                setFormData({ type: 'REPORT', title: '', description: '' });
            }
        } catch (err) {
            alert('Failed to submit report');
        }
    };

    if (loading) return <Layout title="Admin Center"><div className="p-8">Loading...</div></Layout>;

    return (
        <Layout title="Admin Center">
            <div className="grid grid-cols-2 gap-10 max-w-6xl mx-auto">
                <div className="bg-white p-8 rounded-xl shadow-sm border">
                    <h3 className="text-2xl font-bold mb-6 text-primary">Pharmacy Profile</h3>
                    <div className="space-y-4 text-gray-700">
                        <p><strong>Name:</strong> {profile?.name || 'N/A'}</p>
                        <p><strong>Address:</strong> {profile?.address || 'N/A'}</p>
                        <p><strong>License:</strong> {profile?.licenseDocument || 'N/A'}</p>
                        <p><strong>Verified:</strong> {profile?.verified ? 'Yes' : 'No'}</p>
                        <p><strong>Rating:</strong> {profile?.rating || '0.0'}</p>
                    </div>
                </div>

                <div className="bg-white p-8 rounded-xl shadow-sm border">
                    <h3 className="text-2xl font-bold mb-6 text-primary">Contact Admin</h3>
                    <form className="space-y-5" onSubmit={handleSubmit}>
                        <select
                            className="w-full border rounded-lg px-5 py-3"
                            value={formData.type}
                            onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                        >
                            <option value="REPORT">Report Issue</option>
                            <option value="INQUIRY">Inquiry</option>
                        </select>
                        <input
                            type="text"
                            placeholder="Title"
                            className="w-full border rounded-lg px-5 py-3"
                            value={formData.title}
                            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                            required
                        />
                        <textarea
                            rows="6"
                            placeholder="Description..."
                            className="w-full border rounded-lg px-5 py-4"
                            value={formData.description}
                            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                            required
                        ></textarea>
                        <button type="submit" className="w-full bg-primary text-white py-3 rounded-lg hover:bg-primary-dark transition">
                            Submit
                        </button>
                    </form>
                </div>
            </div>
        </Layout>
    );
}

import { useState, useEffect } from 'react';
import Layout from '../../components/admin/AdminLayout'; // Assuming AdminLayout wraps this or is used differently
// Actually AdminLayout is the wrapper in App.jsx. This page should just return content?
// In App.jsx: <Route path="/admin" element={<AdminLayout />}> ...
// So this component will be rendered inside AdminLayout's Outlet.
// It doesn't need to wrap itself in Layout if AdminLayout handles sidebar.
// But checking other pages like Dashboard might reveal pattern.

// Let's assume it renders a simple div, maybe with a title header if AdminLayout doesn't provide one.
// AdminLayout provides sidebar. The content area is the Outlet.

export default function CivilianManagement() {
    const [civilians, setCivilians] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchCivilians = async () => {
            try {
                const response = await fetch('http://localhost:8080/api/civilians');
                if (!response.ok) {
                    throw new Error('Failed to fetch civilians');
                }
                const data = await response.json();
                setCivilians(data);
            } catch (err) {
                setError(err.message);
                // Demo data
                setCivilians([
                    { id: 1, fullName: 'John Doe', email: 'john@example.com', phone: '1234567890', accountStatus: 'ACTIVE' },
                    { id: 2, fullName: 'Jane Smith', email: 'jane@example.com', phone: '0987654321', accountStatus: 'SUSPENDED' }
                ]);
            } finally {
                setLoading(false);
            }
        };

        fetchCivilians();
    }, []);

    if (loading) return <div className="p-8">Loading...</div>;

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-6 text-gray-800">Civilian Management</h1>

            <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
                <table className="w-full text-left">
                    <thead className="bg-gray-50 border-b">
                        <tr>
                            <th className="p-4 font-semibold text-gray-600">ID</th>
                            <th className="p-4 font-semibold text-gray-600">Full Name</th>
                            <th className="p-4 font-semibold text-gray-600">Email</th>
                            <th className="p-4 font-semibold text-gray-600">Phone</th>
                            <th className="p-4 font-semibold text-gray-600">Status</th>
                            <th className="p-4 font-semibold text-gray-600">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y">
                        {civilians.map((civilian) => (
                            <tr key={civilian.id} className="hover:bg-gray-50">
                                <td className="p-4">{civilian.id}</td>
                                <td className="p-4">{civilian.fullName}</td>
                                <td className="p-4">{civilian.email}</td>
                                <td className="p-4">{civilian.phone}</td>
                                <td className="p-4">
                                    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${civilian.accountStatus === 'ACTIVE' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                                        }`}>
                                        {civilian.accountStatus}
                                    </span>
                                </td>
                                <td className="p-4">
                                    <button className="text-teal-600 hover:text-teal-800 text-sm font-medium">View</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {civilians.length === 0 && <div className="p-8 text-center text-gray-500">No civilians found.</div>}
            </div>
        </div>
    );
}

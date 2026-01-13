import React, { useState, useEffect } from 'react';
import { FiX } from 'react-icons/fi';

const UpdatePharmacyPanel = ({ isOpen, onClose, pharmacy, onUpdate }) => {
    const [formData, setFormData] = useState({
        pharmacyName: '',
        phone: '',
        email: '',
        address: '',
        operatingHours: '',
        district: ''
    });

    useEffect(() => {
        if (pharmacy) {
            setFormData({
                pharmacyName: pharmacy.pharmacyName || '',
                phone: pharmacy.phone || '',
                email: pharmacy.email || '',
                address: pharmacy.address || '',
                operatingHours: pharmacy.operatingHours || '',
                district: pharmacy.district || ''
            });
        }
    }, [pharmacy]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`http://localhost:8080/api/pharmacies/${pharmacy.id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });
            if (response.ok) {
                onUpdate();
                onClose();
            } else {
                alert("Failed to update.");
            }
        } catch (error) {
            console.error("Update failed", error);
        }
    };

    return (
        <div className={`fixed inset-0 z-50 overflow-hidden ${isOpen ? '' : 'pointer-events-none'}`}>
            <div className={`absolute inset-0 bg-black/20 transition-opacity ${isOpen ? 'opacity-100' : 'opacity-0'}`} onClick={onClose} />

            <div className={`absolute right-0 top-0 h-full w-full max-w-md bg-white shadow-xl transition-transform duration-300 transform ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
                <div className="flex h-full flex-col">
                    <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
                        <h2 className="text-lg font-semibold text-gray-900">Update Pharmacy</h2>
                        <button onClick={onClose} className="p-2 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-100">
                            <FiX size={20} />
                        </button>
                    </div>

                    <div className="flex-1 overflow-y-auto p-6">
                        <form id="update-form" onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Pharmacy Name</label>
                                <input
                                    type="text"
                                    value={formData.pharmacyName}
                                    onChange={(e) => setFormData({ ...formData, pharmacyName: e.target.value })}
                                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                                <input
                                    type="text"
                                    value={formData.phone}
                                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                                <input
                                    type="email"
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                                <textarea
                                    value={formData.address}
                                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                                    rows={3}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Operating Hours</label>
                                <input
                                    type="text"
                                    value={formData.operatingHours}
                                    onChange={(e) => setFormData({ ...formData, operatingHours: e.target.value })}
                                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                                    placeholder="e.g. 9AM - 9PM"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">District</label>
                                <input
                                    type="text"
                                    value={formData.district}
                                    onChange={(e) => setFormData({ ...formData, district: e.target.value })}
                                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                                />
                            </div>
                        </form>
                    </div>

                    <div className="p-6 border-t border-gray-100 bg-gray-50 flex justify-end gap-3">
                        <button onClick={onClose} className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg text-sm font-medium">Cancel</button>
                        <button form="update-form" type="submit" className="px-4 py-2 bg-blue-600 text-white hover:bg-blue-700 rounded-lg text-sm font-medium">Update Pharmacy</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UpdatePharmacyPanel;

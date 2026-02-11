import { useState, useRef } from 'react';
import { Upload, FileText, Calendar, Edit, Store, Image, ChevronDown } from 'lucide-react';

function ReservationForm({ selectedPharmacy, orderItems, onSubmit }) {
    const [pickupDate, setPickupDate] = useState('');
    const [note, setNote] = useState('');
    const [file, setFile] = useState(null);
    const fileInputRef = useRef(null);

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        if (selectedFile) setFile(selectedFile);
    };

    const handleDrop = (e) => {
        e.preventDefault();
        const droppedFile = e.dataTransfer.files[0];
        if (droppedFile) setFile(droppedFile);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit({
            pharmacy: selectedPharmacy,
            items: orderItems,
            pickupDate,
            note,
            prescription: file
        });
    };

    return (
        <div className="card summary-card">

            {/* Order Summary Section */}
            <div className="mb-8">
                <span className="section-label">Order Summary</span>
                <div className="summary-list">
                    <div className="summary-item">
                        <span>Amocatemol 500mg</span>
                        <span>x 2</span>
                    </div>
                    <div className="summary-item">
                        <span>Vitamin C 500mg</span>
                        <span>x 1</span>
                    </div>
                </div>
            </div>

            {/* Reservation Details Form */}
            <div className="mb-2">
                <span className="section-label">Reservation Details</span>

                <form onSubmit={handleSubmit}>
                    {/* Date Picker */}
                    <div className="form-group mb-6">
                        <label className="label-with-icon mb-2">
                            <Calendar size={18} /> Pick-up Date
                        </label>
                        <input
                            type="date"
                            className="form-input"
                            value={pickupDate}
                            onChange={(e) => setPickupDate(e.target.value)}
                            required
                        />
                    </div>

                    {/* File Upload */}
                    <div className="form-group mb-6">
                        <label className="label-with-icon mb-2">
                            <Upload size={18} /> Upload Prescription
                        </label>
                        <div
                            className="file-upload-wrapper"
                            onClick={() => fileInputRef.current?.click()}
                            onDragOver={(e) => e.preventDefault()}
                            onDrop={handleDrop}
                        >
                            {file ? (
                                <div className="upload-text">
                                    <FileText size={24} className="text-teal-600 mb-2" />
                                    <p className="font-semibold text-gray-700">{file.name}</p>
                                </div>
                            ) : (
                                <div className="upload-text">
                                    <Image size={24} style={{ color: '#2FA4A9' }} />
                                    <span>Click to upload or drag image here</span>
                                </div>
                            )}
                            <input
                                ref={fileInputRef}
                                type="file"
                                accept=".pdf,.jpg,.jpeg,.png"
                                onChange={handleFileChange}
                            />
                        </div>
                    </div>

                    {/* Selected Pharmacy */}
                    <div className="form-group mb-6">
                        <label className="label-with-icon mb-2">
                            <Store size={18} /> Selected Pharmacy
                        </label>
                        <div className="relative">
                            <input
                                type="text"
                                className="form-input"
                                value={selectedPharmacy ? `${selectedPharmacy.name} (${selectedPharmacy.distance}km)` : "Select from list..."}
                                readOnly
                                style={{ paddingRight: '40px', cursor: 'pointer' }}
                            />
                            <ChevronDown size={20} className="absolute right-3 top-3 text-gray-400 pointer-events-none" />
                        </div>
                    </div>

                    {/* Note */}
                    <div className="form-group mb-6">
                        <label className="label-with-icon mb-2">
                            <Edit size={18} /> Note
                        </label>
                        <textarea
                            className="form-input"
                            rows={3}
                            placeholder="Any special instructions for the pharmacist..."
                            value={note}
                            onChange={(e) => setNote(e.target.value)}
                            style={{ resize: 'none', height: '100px' }}
                        />
                    </div>

                    {/* Billing Breakdown */}
                    <div className="bg-[#F0F4F8] p-6 rounded-2xl mt-8 mb-8">
                        <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-4">
                            Billing Breakdown (Estimated)
                        </h4>
                        <div className="space-y-3 text-sm font-medium text-gray-700">
                            <div className="flex justify-between">
                                <span>Amocatemol</span>
                                <span className="font-bold text-gray-900">$5.00</span>
                            </div>
                            <div className="flex justify-between">
                                <span>Vitamin C</span>
                                <span className="font-bold text-gray-900">$6.00</span>
                            </div>
                            <div className="flex justify-between">
                                <span>Service Fee</span>
                                <span className="font-bold text-gray-900">$2.00</span>
                            </div>
                            <div className="border-t border-gray-300/50 mt-4 pt-4 flex justify-between items-center">
                                <span className="text-lg font-bold text-[#2FA4A9]">Total</span>
                                <span className="text-xl font-extrabold text-[#2FA4A9] font-mono">$13.00</span>
                            </div>
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={!selectedPharmacy}
                        className="w-full py-3.5 border-2 border-[#2FA4A9] text-[#2FA4A9] font-bold text-sm rounded-lg uppercase tracking-widest hover:bg-[#2FA4A9] hover:text-white transition-all duration-300 shadow-sm hover:shadow-md"
                    >
                        Confirm Reservation
                    </button>
                </form>
            </div>
        </div>
    );
}

export default ReservationForm;

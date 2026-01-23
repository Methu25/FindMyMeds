import { useState, useRef } from 'react';
import { Upload, FileText, X, Calendar, Edit, Store, Image, ChevronDown } from 'lucide-react';

function ReservationForm({ selectedPharmacy, orderItems, onSubmit }) {
    const [pickupDate, setPickupDate] = useState('');
    const [note, setNote] = useState('');
    const [file, setFile] = useState(null);
    const [confirmed, setConfirmed] = useState(false);
    const fileInputRef = useRef(null);

    const subtotal = 11.00;
    const serviceFee = 2.00;
    const total = 13.00;

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
        if (!selectedPharmacy) {
            alert("Please select a pharmacy first");
            return;
        }

        onSubmit({
            pharmacy: selectedPharmacy,
            items: orderItems,
            pickupDate,
            note,
            prescription: file,
            total
        });
    };

    return (
        <div className="reservation-form-card">
            <span className="section-label">Order Summary</span>
            <div className="order-summary">
                <div className="summary-list">
                    <div className="order-item" style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0' }}>
                        <span>Amocatemol 500mg</span>
                        <span>x 2</span>
                    </div>
                    <div className="order-item" style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: 'none' }}>
                        <span>Vitamin C 500mg</span>
                        <span>x 1</span>
                    </div>
                </div>
            </div>

            <span className="section-label">Reservation Details</span>

            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label><Calendar size={16} color="var(--color-primary)" /> Pick-up Date</label>
                    <input
                        type="date"
                        value={pickupDate}
                        onChange={(e) => setPickupDate(e.target.value)}
                        required
                    />
                </div>

                <div className="form-group">
                    <label><Upload size={16} color="var(--color-primary)" /> Upload Prescription</label>
                    <div
                        className={`file-upload ${file ? 'has-file' : ''}`}
                        onClick={() => fileInputRef.current?.click()}
                        onDragOver={(e) => e.preventDefault()}
                        onDrop={handleDrop}
                        style={{ position: 'relative', textAlign: 'center', cursor: 'pointer' }}
                    >
                        {file ? (
                            <div className="upload-text">
                                <FileText size={20} style={{ margin: '0 auto', display: 'block' }} />
                                <p>{file.name}</p>
                            </div>
                        ) : (
                            <div className="upload-text">
                                <Image size={24} style={{ margin: '0 auto', display: 'block', color: 'var(--color-primary)', marginBottom: 5 }} />
                                <span>Click to upload or drag image here</span>
                            </div>
                        )}
                        <input
                            ref={fileInputRef}
                            type="file"
                            accept=".pdf,.jpg,.jpeg,.png"
                            onChange={handleFileChange}
                            style={{ display: 'none' }}
                        />
                    </div>
                </div>

                <div className="form-group">
                    <label><Store size={16} color="var(--color-primary)" /> Selected Pharmacy</label>
                    <div style={{ position: 'relative' }}>
                        <input
                            type="text"
                            value={selectedPharmacy ? `${selectedPharmacy.name} (${selectedPharmacy.distance}km)` : "Select from list..."}
                            readOnly
                            style={{ paddingRight: 35, cursor: 'default' }}
                        />
                        <ChevronDown size={16} style={{ position: 'absolute', right: 15, top: 15, color: '#999', pointerEvents: 'none' }} />
                    </div>
                </div>

                <div className="form-group">
                    <label><Edit size={16} color="var(--color-primary)" /> Note</label>
                    <textarea
                        rows={3}
                        placeholder="Any special instructions for the pharmacist..."
                        value={note}
                        onChange={(e) => setNote(e.target.value)}
                        style={{ height: 100 }}
                    />
                </div>

                <div className="billing-section">
                    <span className="section-label" style={{ marginBottom: 10, color: '#64748b' }}>Billing Breakdown (Estimated)</span>
                    <div className="billing-row">
                        <span>Amocatemol</span>
                        <span className="price">$5.00</span>
                    </div>
                    <div className="billing-row">
                        <span>Vitamin C</span>
                        <span className="price">$6.00</span>
                    </div>
                    <div className="billing-row">
                        <span>Service Fee</span>
                        <span className="price">$2.00</span>
                    </div>
                    <div className="billing-row total">
                        <span>Total</span>
                        <span className="price">$13.00</span>
                    </div>
                </div>

                <button type="submit" className="btn-reserve" disabled={!selectedPharmacy}>
                    Confirm Reservation
                </button>
            </form>
        </div>
    );
}

export default ReservationForm;

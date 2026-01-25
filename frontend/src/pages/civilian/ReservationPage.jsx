import { useState, useEffect } from 'react';
import { Search, Plus, Pill, FileText } from 'lucide-react';
import PharmacyCard from '../../components/civilian/PharmacyCard';
import ReservationForm from '../../components/civilian/ReservationForm';
import '../../styles/civilian/ReservationPage.css';

function ReservationPage() {
    const [searchQuery, setSearchQuery] = useState('');
    const [quantity, setQuantity] = useState(1);
    const [selectedPharmacy, setSelectedPharmacy] = useState(null);
    const [medicines, setMedicines] = useState([]);
    const [pharmacies, setPharmacies] = useState([]);
    const [selectedMedicine, setSelectedMedicine] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetchPharmacies();
    }, []);

    useEffect(() => {
        if (searchQuery.length > 2) {
            fetchMedicines(searchQuery);
        } else {
            setMedicines([]);
        }
    }, [searchQuery]);

    const fetchMedicines = async (query) => {
        try {
            const res = await fetch(`http://localhost:8080/api/medicines?search=${query}`);
            if (res.ok) {
                const data = await res.json();
                setMedicines(data.content || data);
            }
        } catch (err) {
            console.error("Failed to fetch medicines", err);
        }
    };

    const fetchPharmacies = async () => {
        try {
            // Using search endpoint without query to get all, or could use nearby if location available
            const res = await fetch('http://localhost:8080/api/pharmacies');
            if (res.ok) {
                const data = await res.json();
                setPharmacies(data.map(p => ({
                    ...p,
                    available: 'N/A', // Availability requires inventory check, mostly static for now
                    distance: p.distance ? parseFloat(p.distance.toFixed(1)) : (Math.random() * 5).toFixed(1) // Mock distance if null
                })));
            }
        } catch (err) {
            console.error("Failed to fetch pharmacies", err);
        }
    };

    const handleMedicineSelect = (med) => {
        setSelectedMedicine(med);
        setSearchQuery(med.medicineName);
        setMedicines([]); // Hide dropdown
    };

    const handlePharmacySelect = (pharmacy) => {
        setSelectedPharmacy(pharmacy);
    };

    const handleSubmit = async (reservationData) => {
        if (!selectedMedicine || !selectedPharmacy) {
            alert("Please select a medicine and a pharmacy.");
            return;
        }

        const payload = {
            pharmacy: { id: selectedPharmacy.id },
            reservationDate: new Date().toISOString(),
            timeframe: "10:00 AM - 12:00 PM", // Default or user selected
            status: "PENDING",
            totalAmount: (selectedMedicine.price || 0) * quantity,
            items: [
                {
                    medicine: { id: selectedMedicine.id },
                    quantity: quantity,
                    price: selectedMedicine.price || 0
                }
            ]
        };

        try {
            const res = await fetch('http://localhost:8080/api/reservations', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });

            if (res.ok) {
                alert('Reservation confirmed! You can view it in your Activity Page.');
                // Reset form
                setSelectedMedicine(null);
                setSelectedPharmacy(null);
                setQuantity(1);
                setSearchQuery('');
            } else {
                alert('Failed to submit reservation.');
            }
        } catch (err) {
            console.error("Error submitting reservation", err);
            alert("An error occurred.");
        }
    };

    const handleCancel = () => {
        setSelectedPharmacy(null);
    };

    return (
        <div className="reservation-page">
            <section className="search-section">
                <h2 className="section-header">Find & Select Medicines</h2>

                <div className="search-container">
                    <div className="search-bar">
                        <div className="search-input-wrapper">
                            <Search />
                            <input
                                type="text"
                                placeholder="Search medicines by name..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </div>
                    </div>

                    {medicines.length > 0 && (
                        <div className="medicine-dropdown bg-white border rounded mt-2 shadow-lg max-h-60 overflow-y-auto">
                            {medicines.map(med => (
                                <div
                                    key={med.id}
                                    className="p-3 hover:bg-gray-100 cursor-pointer border-b"
                                    onClick={() => handleMedicineSelect(med)}
                                >
                                    <div className="font-bold">{med.medicineName}</div>
                                    <div className="text-xs text-gray-500">{med.genericName}</div>
                                </div>
                            ))}
                        </div>
                    )}

                    <span className="section-label">Selected Medicine</span>

                    {selectedMedicine ? (
                        <div className="medicine-suggestion">
                            <div className="suggestion-title">{selectedMedicine.medicineName}</div>
                            <div className="med-tags">
                                <span className="med-tag"><Pill size={12} style={{ marginRight: 5 }} /> {selectedMedicine.dosageForm || 'N/A'}</span>
                                {selectedMedicine.requiresPrescription && (
                                    <span className="med-tag warning"><FileText size={12} style={{ marginRight: 5 }} /> Prescription Required</span>
                                )}
                            </div>
                            <p className="suggestion-desc">
                                {selectedMedicine.description || 'No description available.'}
                            </p>
                            <p className="mt-2 font-bold text-teal-600">Price: Rs. {selectedMedicine.price}</p>
                        </div>
                    ) : (
                        <p className="text-gray-400 italic mb-4">Search and select a medicine to proceed.</p>
                    )}

                    <div className="action-row">
                        <div className="qty-stepper">
                            <button className="qty-btn" onClick={() => setQuantity(Math.max(1, quantity - 1))}>-</button>
                            <input type="text" value={quantity} className="qty-input" readOnly />
                            <button className="qty-btn" onClick={() => setQuantity(quantity + 1)}>+</button>
                        </div>
                        <button
                            className="btn btn-primary"
                            style={{ flex: 1 }}
                            disabled={!selectedMedicine}
                            onClick={() => { }} // Just visual helper here, actual add is in Submit
                        >
                            <Plus size={18} style={{ marginRight: 8 }} /> {selectedMedicine ? 'Ready to Reserve' : 'Select Medicine'}
                        </button>
                    </div>
                </div>

                <h2 className="section-header" style={{ marginTop: 10 }}>Select Pharmacy</h2>
                <div className="pharmacy-list-card">
                    <div className="pharmacy-list">
                        {pharmacies.length === 0 ? (
                            <p className="p-4 text-gray-500">Loading pharmacies or none found...</p>
                        ) : (
                            pharmacies.map((pharmacy) => (
                                <PharmacyCard
                                    key={pharmacy.id}
                                    pharmacy={pharmacy}
                                    isSelected={selectedPharmacy?.id === pharmacy.id}
                                    onSelect={handlePharmacySelect}
                                />
                            ))
                        )}
                    </div>
                </div>
            </section>

            <section className="reservation-section">
                <h2 className="section-header">Your Reservation</h2>
                <ReservationForm
                    selectedPharmacy={selectedPharmacy}
                    orderItems={selectedMedicine ? [{
                        name: selectedMedicine.medicineName,
                        quantity: quantity,
                        price: selectedMedicine.price,
                        requiresPrescription: selectedMedicine.requiresPrescription
                    }] : []}
                    onSubmit={handleSubmit}
                    onCancel={handleCancel}
                />
            </section>
        </div>
    );
}

export default ReservationPage;

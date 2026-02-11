import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Search, Plus, Minus, FileText, Calendar, Upload, Image, ChevronDown, Store, Edit, CircleCheck, TriangleAlert } from 'lucide-react';
import PharmacyCard from '../../components/civilian/PharmacyCard';
import ReservationForm from '../../components/civilian/ReservationForm';
import '../../styles/civilian/ReservationPage.css';

function ReservationPage() {
    const [searchQuery, setSearchQuery] = useState('');
    const [quantity, setQuantity] = useState(1);
    const [selectedPharmacy, setSelectedPharmacy] = useState(null);
    const [medicines, setMedicines] = useState([]);
    const [pharmacies, setPharmacies] = useState([]);
    const [loading, setLoading] = useState(true);

    // Initial state
    const [selectedMedicine, setSelectedMedicine] = useState(null);

    useEffect(() => {
        // Fetch Pharmacies for recommendation
        const fetchPharmacies = async () => {
            try {
                // Fetching nearby or all pharmacies
                const res = await fetch('http://localhost:8080/api/pharmacies?query=');
                if (res.ok) {
                    const data = await res.json();
                    setPharmacies(data.slice(0, 3)); // Just show top 3
                }
            } catch (err) {
                console.error("Failed to fetch pharmacies", err);
            } finally {
                setLoading(false);
            }
        };
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
                // Handle Page<Medicine> or List<Medicine>
                const content = data.content || data;
                setMedicines(content.map(m => ({
                    ...m,
                    dosage: m.strength,
                    form: m.dosageForm
                })));
            }
        } catch (err) {
            console.error("Failed to fetch medicines", err);
        }
    };

    const handleMedicineSelect = (med) => {
        setSelectedMedicine(med);
        setSearchQuery(med.medicineName);
        setMedicines([]);
    };

    const handleSubmit = async (reservationData) => {
        if (!selectedPharmacy) {
            alert("Please select a pharmacy");
            return;
        }

        const payload = {
            pharmacy: { id: selectedPharmacy.id },
            reservationDate: new Date().toISOString(),
            status: 'PENDING',
            totalAmount: (selectedMedicine.price || 0) * quantity,
            items: [
                {
                    medicine: { id: selectedMedicine.id },
                    quantity: quantity,
                    price: selectedMedicine.price || 0
                }
            ]
            // civilian: { id: "..." } // Assuming backend handles current user or optional
        };

        try {
            const res = await fetch('http://localhost:8080/api/reservations', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });

            if (res.ok) {
                alert("Reservation confirmed!");
                setSelectedMedicine(null);
                setQuantity(1);
                setSearchQuery('');
            } else {
                alert("Failed to create reservation");
            }
        } catch (err) {
            console.error("Error creating reservation", err);
            alert("Error creating reservation");
        }
    };

    return (
        <div className="main-content">
            <div className="reservation-container">
                {/* Left Column */}
                <div className="col-section">
                    <h2 className="section-header">Find & Select Medicines</h2>

                    <div className="card search-card">
                        <div className="search-box">
                            <Search className="text-gray-400" size={20} />
                            <input
                                type="text"
                                placeholder="Search medicines by name or generic..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </div>

                        {medicines.length > 0 && (
                            <div className="bg-white border rounded -mt-4 mb-4 shadow-lg max-h-60 overflow-y-auto z-10 relative">
                                {medicines.map(med => (
                                    <div
                                        key={med.id}
                                        className="p-3 hover:bg-gray-100 cursor-pointer border-b text-sm"
                                        onClick={() => handleMedicineSelect(med)}
                                    >
                                        <div className="font-bold">{med.medicineName}</div>
                                        <div className="text-xs text-gray-500">{med.genericName}</div>
                                    </div>
                                ))}
                            </div>
                        )}

                        <span className="section-label">Suggestions</span>

                        {selectedMedicine ? (
                            <div className="medicine-suggestion">
                                <div className="text-xl font-extrabold text-[#2FA4A9] mb-3">
                                    {selectedMedicine.medicineName} {selectedMedicine.dosage}
                                </div>
                                <div className="flex items-center gap-2 mb-4">
                                    <span className="med-tag">
                                        <FileText size={14} className="mr-1" /> {selectedMedicine.form || 'Capsule'}
                                    </span>
                                    {selectedMedicine.requiresPrescription && (
                                        <span className="med-tag warning">
                                            <FileText size={14} className="mr-1" /> Prescription Required
                                        </span>
                                    )}
                                </div>
                                <p className="text-sm text-gray-500 leading-relaxed">
                                    {selectedMedicine.description}
                                </p>
                            </div>
                        ) : (
                            <div className="medicine-suggestion flex items-center justify-center text-gray-400 text-sm italic">
                                Search and select a medicine to see details
                            </div>
                        )}

                        <div className="action-row mt-auto">
                            <div className="qty-stepper">
                                <button className="qty-btn" onClick={() => quantity > 1 && setQuantity(quantity - 1)}>-</button>
                                <input type="text" value={quantity} className="qty-input" readOnly />
                                <button className="qty-btn" onClick={() => setQuantity(quantity + 1)}>+</button>
                            </div>
                            <button className="btn-primary w-full flex items-center justify-center gap-2" disabled={!selectedMedicine}>
                                <Plus size={18} /> Add to Reservation
                            </button>
                        </div>
                    </div>

                    <div className="flex justify-between items-center mt-6 mb-2">
                        <h2 className="section-header mb-0">Recommended Pharmacies</h2>
                        <Link to="/civilian/find-pharmacy" className="text-sm text-teal-600 font-bold hover:underline">
                            Find More
                        </Link>
                    </div>
                    <div className="card pharmacy-list-card">
                        {loading ? (
                            <div className="p-4 text-gray-400 text-center">Loading pharmacies...</div>
                        ) : (
                            pharmacies.map(pharmacy => (
                                <PharmacyCard
                                    key={pharmacy.id}
                                    pharmacy={pharmacy}
                                    isSelected={selectedPharmacy?.id === pharmacy.id}
                                    onSelect={setSelectedPharmacy}
                                />
                            ))
                        )}
                    </div>
                </div>

                {/* Right Column */}
                <div className="col-section">
                    <h2 className="section-header">Your Reservation</h2>

                    {/* ReservationForm acts as the summary card */}
                    <ReservationForm
                        selectedPharmacy={selectedPharmacy}
                        orderItems={selectedMedicine ? [{
                            name: selectedMedicine.medicineName,
                            quantity: quantity,
                            price: selectedMedicine.price || 5.00
                        }] : []}
                        onSubmit={handleSubmit}
                    />
                </div>
            </div>
        </div>
    );
}

export default ReservationPage;

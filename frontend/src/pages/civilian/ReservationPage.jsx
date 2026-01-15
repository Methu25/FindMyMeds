import { useState } from 'react';
import { Search, Plus, Pill, FileText } from 'lucide-react';
import PharmacyCard from '../../components/civilian/PharmacyCard';
import ReservationForm from '../../components/civilian/ReservationForm';
import '../../styles/civilian/ReservationPage.css';

const dummyPharmacies = [
    { id: 1, name: 'Citywide Pharmacy', available: 5, distance: 2.5 },
    { id: 2, name: 'HealthPlus Drugstore', available: 3, distance: 1.2 },
    { id: 3, name: 'MediCare Pharmacy', available: 8, distance: 1.8 },
    { id: 4, name: 'WellLife Chemist', available: 2, distance: 4.2 },
];

const dummyOrderItems = [
    { name: 'Amoxicillin 250mg', quantity: 1, price: 5.00, requiresPrescription: true },
];

function ReservationPage() {
    const [searchQuery, setSearchQuery] = useState('');
    const [quantity, setQuantity] = useState(1);
    const [selectedPharmacy, setSelectedPharmacy] = useState(null);

    const handlePharmacySelect = (pharmacy) => {
        setSelectedPharmacy(pharmacy);
    };

    const handleSubmit = (reservationData) => {
        console.log('Reservation submitted:', reservationData);
        alert('Reservation confirmed! You will receive a confirmation shortly.');
    };

    const handleCancel = () => {
        setSelectedPharmacy(null);
    };

    const filteredPharmacies = dummyPharmacies.filter(p =>
        p.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

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
                                placeholder="Search medicines by name or generic..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </div>
                    </div>

                    <span className="section-label">Suggestions</span>

                    <div className="medicine-suggestion">
                        <div className="suggestion-title">Amoxicillin 250mg</div>
                        <div className="med-tags">
                            <span className="med-tag"><Pill size={12} style={{ marginRight: 5 }} /> Capsule</span>
                            <span className="med-tag warning"><FileText size={12} style={{ marginRight: 5 }} /> Prescription Required</span>
                        </div>
                        <p className="suggestion-desc">
                            Used to treat bacterial infections. Please ensure you have a valid prescription before adding to reservation.
                        </p>
                    </div>

                    <div className="action-row">
                        <div className="qty-stepper">
                            <button className="qty-btn" onClick={() => setQuantity(Math.max(1, quantity - 1))}>-</button>
                            <input type="text" value={quantity} className="qty-input" readOnly />
                            <button className="qty-btn" onClick={() => setQuantity(quantity + 1)}>+</button>
                        </div>
                        <button className="btn btn-primary" style={{ flex: 1 }}>
                            <Plus size={18} style={{ marginRight: 8 }} /> Add to Reservation
                        </button>
                    </div>
                </div>

                <h2 className="section-header" style={{ marginTop: 10 }}>Recommended Pharmacies</h2>
                <div className="pharmacy-list-card">
                    <div className="pharmacy-list">
                        {filteredPharmacies.map((pharmacy) => (
                            <PharmacyCard
                                key={pharmacy.id}
                                pharmacy={pharmacy}
                                isSelected={selectedPharmacy?.id === pharmacy.id}
                                onSelect={handlePharmacySelect}
                            />
                        ))}
                    </div>
                </div>
            </section>

            <section className="reservation-section">
                <h2 className="section-header">Your Reservation</h2>
                <ReservationForm
                    selectedPharmacy={selectedPharmacy}
                    orderItems={dummyOrderItems}
                    onSubmit={handleSubmit}
                    onCancel={handleCancel}
                />
            </section>
        </div>
    );
}

export default ReservationPage;

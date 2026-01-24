import { useState } from 'react';
import { History, Settings } from 'lucide-react';
import ReservationCard from '../../components/civilian/ReservationCard';
import ReservationHistoryItem from '../../components/civilian/ReservationHistoryItem';
import ReservationModal from '../../components/civilian/ReservationModal';
import '../../styles/civilian/ActivityPage.css';

const dummyCurrentReservations = [
    {
        id: 'RES-2024-001',
        pharmacy: 'Citywide Pharmacy',
        total: 970,
        date: 'Jan 18, 2024',
        time: '10:00 AM - 6:00 PM',
        status: 'Ready for Pickup',
        timelineStatus: 'ready',
        items: [
            { name: 'Paracetamol 500mg', quantity: 2, price: 150 },
            { name: 'Amoxicillin 250mg', quantity: 1, price: 450 },
            { name: 'Vitamin D3 1000IU', quantity: 1, price: 320 },
        ]
    },
    {
        id: 'RES-2024-002',
        pharmacy: 'HealthPlus Drugstore',
        total: 650,
        date: 'Jan 20, 2024',
        time: '9:00 AM - 8:00 PM',
        status: 'Pending Confirmation',
        timelineStatus: 'created',
        items: [
            { name: 'Ibuprofen 400mg', quantity: 1, price: 200 },
            { name: 'Omeprazole 20mg', quantity: 2, price: 200 },
        ]
    },
];

const dummyHistoryReservations = [
    { id: 'RES-2023-089', pharmacy: 'MediCare Pharmacy', date: 'Dec 28, 2023', status: 'Completed' },
    { id: 'RES-2023-076', pharmacy: 'WellLife Chemist', date: 'Dec 15, 2023', status: 'Completed' },
    { id: 'RES-2023-062', pharmacy: 'Citywide Pharmacy', date: 'Dec 05, 2023', status: 'Canceled' },
    { id: 'RES-2023-045', pharmacy: 'HealthPlus Drugstore', date: 'Nov 22, 2023', status: 'Expired' },
];

function ActivityPage() {
    const [selectedReservation, setSelectedReservation] = useState(null);

    const handleViewDetails = (reservation) => {
        setSelectedReservation(reservation);
    };

    const closeModal = () => {
        setSelectedReservation(null);
    };

    return (
        <div className="activity-page">
            <div className="activity-header">
                <h1>Your Activity</h1>
                <div className="activity-header-actions">
                    <button className="btn btn-outline">
                        <History size={18} />
                        Reservation History
                    </button>
                    <button className="btn btn-outline">
                        <Settings size={18} />
                        Profile Settings
                    </button>
                </div>
            </div>

            <div className="activity-content">
                <section className="activity-section">
                    <h2>
                        Current Reservations
                        <span className="count">{dummyCurrentReservations.length}</span>
                    </h2>
                    <div className="reservation-cards">
                        {dummyCurrentReservations.map((reservation) => (
                            <ReservationCard
                                key={reservation.id}
                                reservation={reservation}
                                onViewDetails={handleViewDetails}
                            />
                        ))}
                    </div>
                </section>

                <section className="activity-section">
                    <h2>
                        Reservation History
                        <span className="count">{dummyHistoryReservations.length}</span>
                    </h2>
                    <div className="reservation-cards">
                        {dummyHistoryReservations.map((reservation) => (
                            <ReservationHistoryItem
                                key={reservation.id}
                                reservation={reservation}
                            />
                        ))}
                    </div>
                </section>
            </div>

            {selectedReservation && (
                <ReservationModal
                    reservation={selectedReservation}
                    onClose={closeModal}
                />
            )}
        </div>
    );
}

export default ActivityPage;

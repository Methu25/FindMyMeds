import { useState, useEffect } from 'react';
import { History, Settings } from 'lucide-react';
import ReservationCard from '../../components/civilian/ReservationCard';
import ReservationHistoryItem from '../../components/civilian/ReservationHistoryItem';
import ReservationModal from '../../components/civilian/ReservationModal';
import '../../styles/civilian/ActivityPage.css';

function ActivityPage() {
    const [currentReservations, setCurrentReservations] = useState([]);
    const [historyReservations, setHistoryReservations] = useState([]);
    const [selectedReservation, setSelectedReservation] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchReservations();
    }, []);

    const fetchReservations = async () => {
        try {
            const response = await fetch('http://localhost:8081/api/reservations');
            if (response.ok) {
                const data = await response.json();

                // Map backend data to frontend format
                const formatted = data.map(res => ({
                    id: res.id,
                    pharmacy: res.pharmacy ? res.pharmacy.name : 'Unknown Pharmacy',
                    total: res.totalAmount,
                    date: new Date(res.reservationDate).toLocaleDateString(),
                    time: res.timeframe || new Date(res.reservationDate).toLocaleTimeString(),
                    status: res.status,
                    items: res.items?.map(item => ({
                        name: item.medicine ? item.medicine.medicineName : 'Unknown Item',
                        quantity: item.quantity,
                        price: item.price
                    })) || []
                }));

                const current = formatted.filter(r => ['PENDING', 'ACCEPTED', 'READY_FOR_PICKUP'].includes(r.status));
                const history = formatted.filter(r => ['COMPLETED', 'CANCELLED', 'EXPIRED', 'REJECTED'].includes(r.status));

                setCurrentReservations(current);
                setHistoryReservations(history);
            }
        } catch (error) {
            console.error("Error fetching reservations:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleViewDetails = (reservation) => {
        setSelectedReservation(reservation);
    };

    const closeModal = () => {
        setSelectedReservation(null);
    };

    if (loading) return <div className="p-8 text-center text-gray-500">Loading your activity...</div>;

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
                        <span className="count">{currentReservations.length}</span>
                    </h2>
                    <div className="reservation-cards">
                        {currentReservations.length === 0 ? (
                            <p className="text-gray-400 italic">No active reservations.</p>
                        ) : (
                            currentReservations.map((reservation) => (
                                <ReservationCard
                                    key={reservation.id}
                                    reservation={reservation}
                                    onViewDetails={handleViewDetails}
                                />
                            ))
                        )}
                    </div>
                </section>

                <section className="activity-section">
                    <h2>
                        Reservation History
                        <span className="count">{historyReservations.length}</span>
                    </h2>
                    <div className="reservation-cards">
                        {historyReservations.length === 0 ? (
                            <p className="text-gray-400 italic">No past reservations.</p>
                        ) : (
                            historyReservations.map((reservation) => (
                                <ReservationHistoryItem
                                    key={reservation.id}
                                    reservation={reservation}
                                />
                            ))
                        )}
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

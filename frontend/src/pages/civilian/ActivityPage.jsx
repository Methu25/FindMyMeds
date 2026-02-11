import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ReservationCard from '../../components/civilian/ReservationCard';
import ReservationHistoryItem from '../../components/civilian/ReservationHistoryItem';
import ReservationModal from '../../components/civilian/ReservationModal';
import '../../styles/civilian/ActivityPage.css';

function ActivityPage() {

    const [currentReservations, setCurrentReservations] = useState([]);
    const [historyReservations, setHistoryReservations] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchReservations = async () => {
            try {
                const res = await fetch('http://localhost:8080/api/reservations');
                if (res.ok) {
                    const jsonData = await res.json();
                    console.log("Reservations fetched:", jsonData);

                    // Handle potential non-array response (e.g. Page<T>)
                    const data = Array.isArray(jsonData) ? jsonData : (jsonData.content || []);

                    const current = [];
                    const history = [];

                    data.forEach(r => {
                        const mappedRes = {
                            id: r.id,
                            status: r.status,
                            pharmacy: r.pharmacy?.name || 'Unknown Pharmacy',
                            total: r.totalAmount,
                            date: r.reservationDate ? new Date(r.reservationDate).toLocaleString() : 'Date N/A',
                            time: r.reservationDate ? new Date(r.reservationDate).toLocaleString() : 'Date N/A',
                            formattedId: `Order #${(r.id || '').substring(0, 8).toUpperCase()}`,
                            items: r.items || []
                        };

                        if (['COMPLETED', 'CANCELED'].includes(r.status)) {
                            history.push(mappedRes);
                        } else {
                            current.push(mappedRes);
                        }
                    });

                    setCurrentReservations(current);
                    setHistoryReservations(history);
                } else {
                    console.error("Fetch failed with status:", res.status);
                }
            } catch (err) {
                console.error("Failed to fetch reservations", err);
            } finally {
                setLoading(false);
            }
        };

        fetchReservations();
    }, []);

    const [selectedReservation, setSelectedReservation] = useState(null);

    const handleViewDetails = (reservation) => {
        setSelectedReservation(reservation);
    };

    const closeModal = () => {
        setSelectedReservation(null);
    };

    return (
        <div className="main-content">
            {/* Header Section */}
            <div className="page-header">
                <h1 className="text-3xl font-extrabold text-gray-800 tracking-tight">Your Activity</h1>
                <div className="flex gap-3">
                    <button className="px-5 py-2.5 bg-white border border-gray-200 text-gray-600 font-bold rounded-lg text-sm hover:bg-gray-50 transition-colors shadow-sm">
                        Reservation History
                    </button>
                    <button className="px-5 py-2.5 bg-[#2FA4A9] text-white font-bold rounded-lg text-sm hover:bg-[#258a8e] transition-colors shadow-sm">
                        Profile Settings
                    </button>
                </div>
            </div>

            {/* Main Content Grid */}
            <div className="dashboard-grid">

                {/* Left Column: Current Reservations */}
                <div className="card">
                    <h2 className="text-xl font-bold text-gray-800 mb-8">Current Reservations</h2>

                    <div className="flex flex-col gap-2">
                        {loading ? (
                            <div className="p-8 text-center text-gray-500 animate-pulse">Loading reservations...</div>
                        ) : currentReservations.length > 0 ? (
                            currentReservations.map((reservation, index) => (
                                <ReservationCard
                                    key={index}
                                    reservation={reservation}
                                    onViewDetails={handleViewDetails}
                                />
                            ))
                        ) : (
                            <div className="p-10 text-center border-2 border-dashed border-gray-100 rounded-xl mt-4 bg-gray-50">
                                <p className="text-gray-400">No active reservations.</p>
                                <Link to="/civilian/reservation" className="text-[#2FA4A9] font-bold hover:underline mt-2 inline-block">
                                    Create one now
                                </Link>
                            </div>
                        )}
                    </div>
                </div>

                {/* Right Column: History */}
                <div className="card">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-xl font-bold text-gray-800">Reservation History</h2>
                    </div>
                    <div className="">
                        {loading ? (
                            <div className="p-4 text-center text-gray-400 text-sm">Loading...</div>
                        ) : historyReservations.map((reservation, index) => (
                            <ReservationHistoryItem
                                key={index}
                                reservation={reservation}
                            />
                        ))}
                    </div>
                </div>
            </div>

            {/* Modal */}
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

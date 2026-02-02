import React, { useState, useEffect } from 'react';
import Layout from '../../components/pharmacy/Layout';
import { Clock, CheckCircle2, XCircle, Package, User, Calendar, ChevronRight, AlertCircle } from 'lucide-react';

export default function CurrentReservations() {
    const [reservations, setReservations] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchReservations();
    }, []);

    const fetchReservations = async () => {
        try {
            const response = await fetch('http://localhost:8080/api/pharmacy/reservations/current');
            if (response.ok) {
                const data = await response.json();
                setReservations(data);
            }
        } catch (error) {
            console.error('Error fetching reservations:', error);
        } finally {
            setLoading(false);
        }
    };

    const updateStatus = async (id, status) => {
        try {
            const response = await fetch(`http://localhost:8080/api/pharmacy/reservations/${id}/status?status=${status}`, {
                method: 'PATCH'
            });
            if (response.ok) {
                fetchReservations();
            }
        } catch (error) {
            console.error('Error updating status:', error);
        }
    };

    return (
        <Layout title="Current Reservations">
            <div className="space-y-6 animate-in fade-in duration-500">
                {loading ? (
                    <div className="flex items-center justify-center h-64">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
                    </div>
                ) : reservations.length === 0 ? (
                    <div className="bg-white rounded-3xl p-20 text-center shadow-sm border border-gray-100">
                        <div className="bg-gray-50 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 text-gray-300">
                            <Clock size={40} />
                        </div>
                        <h3 className="text-xl font-bold text-gray-800">No active reservations</h3>
                        <p className="text-gray-500 mt-2">New reservations from customers will appear here.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 gap-4">
                        {reservations.map((res) => (
                            <ReservationCard
                                key={res.id}
                                reservation={res}
                                onStatusUpdate={updateStatus}
                            />
                        ))}
                    </div>
                )}
            </div>
        </Layout>
    );
}

function ReservationCard({ reservation, onStatusUpdate }) {
    const getStatusColor = (status) => {
        switch (status) {
            case 'PENDING': return 'bg-yellow-100 text-yellow-700 border-yellow-200';
            case 'CONFIRMED': return 'bg-blue-100 text-blue-700 border-blue-200';
            case 'READY': return 'bg-teal-100 text-teal-700 border-teal-200';
            default: return 'bg-gray-100 text-gray-700 border-gray-200';
        }
    };

    return (
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-all group">
            <div className="flex flex-col lg:flex-row justify-between gap-6">
                <div className="flex-1 space-y-4">
                    <div className="flex items-center justify-between lg:justify-start lg:gap-4">
                        <span className="text-[10px] font-black uppercase tracking-widest text-gray-400">Order #{reservation.id.substring(0, 8)}</span>
                        <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider border ${getStatusColor(reservation.status)}`}>
                            {reservation.status}
                        </span>
                    </div>

                    <div className="flex items-start gap-4">
                        <div className="bg-gray-50 p-3 rounded-2xl text-gray-400 group-hover:bg-primary/10 group-hover:text-primary transition-colors">
                            <User size={24} />
                        </div>
                        <div>
                            <h4 className="text-lg font-bold text-gray-800">{reservation.civilian?.name || 'Unknown Patient'}</h4>
                            <p className="text-sm text-gray-500 flex items-center gap-1.5">
                                <Calendar size={14} /> Registered: {new Date(reservation.reservationDate).toLocaleString()}
                            </p>
                            <p className="text-sm text-gray-500 flex items-center gap-1.5">
                                <Clock size={14} /> Preferred Pickup: {reservation.timeframe}
                            </p>
                        </div>
                    </div>

                    <div className="bg-gray-50/50 rounded-2xl p-4 border border-gray-100">
                        <p className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-3">Reserved Items</p>
                        <ul className="space-y-2">
                            {reservation.items?.map((item, idx) => (
                                <li key={idx} className="flex justify-between items-center text-sm">
                                    <span className="font-medium text-gray-700">{item.medicine?.medicineName}</span>
                                    <span className="font-bold text-primary">x{item.quantity}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                <div className="flex flex-col justify-between lg:items-end gap-6 pt-4 lg:pt-0 border-t lg:border-t-0 lg:border-l border-gray-50 lg:pl-8">
                    <div className="lg:text-right">
                        <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">Total Bill</p>
                        <h3 className="text-3xl font-black text-gray-900">LKR {reservation.totalAmount?.toLocaleString()}</h3>
                    </div>

                    <div className="flex flex-wrap gap-2 justify-end">
                        {reservation.status === 'PENDING' && (
                            <button
                                onClick={() => onStatusUpdate(reservation.id, 'CONFIRMED')}
                                className="px-5 py-2.5 rounded-xl bg-primary text-white text-sm font-bold shadow-lg shadow-primary/20 hover:scale-105 transition"
                            >
                                Confirm Order
                            </button>
                        )}
                        {reservation.status === 'CONFIRMED' && (
                            <button
                                onClick={() => onStatusUpdate(reservation.id, 'READY')}
                                className="px-5 py-2.5 rounded-xl bg-teal-500 text-white text-sm font-bold shadow-lg shadow-teal-500/20 hover:scale-105 transition"
                            >
                                Mark as Ready
                            </button>
                        )}
                        {reservation.status === 'READY' && (
                            <button
                                onClick={() => onStatusUpdate(reservation.id, 'COLLECTED')}
                                className="px-5 py-2.5 rounded-xl bg-green-500 text-white text-sm font-bold shadow-lg shadow-green-500/20 hover:scale-105 transition"
                            >
                                Mark as Collected
                            </button>
                        )}
                        {(reservation.status === 'PENDING' || reservation.status === 'CONFIRMED') && (
                            <button
                                onClick={() => onStatusUpdate(reservation.id, 'CANCELLED')}
                                className="px-5 py-2.5 rounded-xl border-2 border-red-50 text-red-500 text-sm font-bold hover:bg-red-50 transition"
                            >
                                Reject Order
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

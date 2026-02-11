import { Lock, X, Check } from 'lucide-react';

function ReservationHistoryItem({ reservation }) {

    // Determine visuals based on status
    const getVisuals = () => {
        // Safe access to status
        const s = (reservation.status || '').toUpperCase();

        if (s === 'COMPLETED') {
            return {
                icon: <Lock size={16} fill="currentColor" strokeWidth={0} className="text-gray-400" />,
                badgeClass: 'bg-green-100 text-green-600',
                statusText: 'COMPLETED'
            };
        }
        if (s === 'CANCELED' || s === 'CANCELLED') {
            return {
                icon: <X size={16} strokeWidth={3} className="text-gray-400" />,
                badgeClass: 'bg-red-100 text-red-500',
                statusText: 'CANCELED'
            };
        }
        // Fallback
        return {
            icon: <Lock size={16} fill="currentColor" strokeWidth={0} className="text-gray-400" />,
            badgeClass: 'bg-gray-100 text-gray-600',
            statusText: s
        };
    };

    const visuals = getVisuals();

    return (
        <div className="flex items-center justify-between py-4 border-b border-gray-50 last:border-b-0">
            <div className="flex items-center gap-4">
                {/* Small Gray Round Icon */}
                <div className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center flex-shrink-0">
                    {visuals.icon}
                </div>

                {/* Text Info */}
                <div>
                    <h4 className="font-bold text-gray-800 text-sm mb-0.5">
                        {reservation.formattedId || reservation.id || 'Order #2022-115'}
                    </h4>
                    <p className="text-gray-400 text-xs font-medium">
                        {reservation.pharmacy || 'Local Pharmacy'}
                    </p>
                </div>
            </div>

            {/* Status Badge */}
            <span className={`px-3 py-1 rounded-md text-[10px] font-bold tracking-wider ${visuals.badgeClass}`}>
                {visuals.statusText}
            </span>
        </div>
    );
}

export default ReservationHistoryItem;

import { Check, Package, Clock, MapPin } from 'lucide-react';

function ReservationCard({ reservation, onViewDetails }) {

    // Determine the visual style and content based on reservation status/type
    const getCardConfig = () => {
        const s = (reservation.status || '').toUpperCase();

        // Case 1: Ready for Pickup (Green Check, Price shown)
        if (s === 'READY_FOR_PICKUP') {
            return {
                icon: <Check size={20} strokeWidth={4} />,
                bgClass: 'bg-green-100',
                textClass: 'text-green-600',
                title: 'Ready for Pickup',
                subtitle: reservation.pharmacy || 'Citywide Pharmacy',
                showPrice: true,
                showButton: false
            };
        }

        // Case 2: Standard Order (Blue Package, Button shown) - For 'ACCEPTED' or 'ORDER'
        if (s.includes('ORDER') || s === 'ACCEPTED') {
            return {
                icon: <Package size={20} fill="currentColor" strokeWidth={0} />,
                bgClass: 'bg-blue-100',
                textClass: 'text-blue-600',
                title: reservation.formattedId || `Order #${reservation.id}`,
                subtitle: reservation.pharmacy || 'Citywide Pharmacy',
                showPrice: false,
                showButton: true
            };
        }

        // Case 3: Pending (Yellow Clock, Button shown)
        if (s === 'PENDING') {
            return {
                icon: <Clock size={20} fill="currentColor" className="text-white" strokeWidth={0} />,
                bgClass: 'bg-yellow-100',
                textClass: 'text-yellow-600',
                title: 'Pending Confirmation',
                subtitle: reservation.time || '10/05/2026 20:30',
                showPrice: false,
                showButton: true
            };
        }

        // Case 4: Location / Other (Gray Pin, Button shown)
        return {
            icon: <MapPin size={20} fill="currentColor" strokeWidth={0} />,
            bgClass: 'bg-gray-100',
            textClass: 'text-gray-500',
            title: reservation.pharmacy || 'HealthPoint Dispensary',
            subtitle: reservation.formattedId || '13009004 203032',
            showPrice: false,
            showButton: true
        };
    };

    const config = getCardConfig();

    return (
        <div className="flex items-center p-6 bg-white border border-gray-100 rounded-xl shadow-sm hover:shadow-md transition-all duration-200 w-full mb-4">
            {/* Round Icon Container */}
            <div className={`w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 ${config.bgClass} ${config.textClass}`}>
                {config.icon}
            </div>

            {/* Middle Text Content */}
            <div className="ml-5 flex-1 flex flex-col justify-center">
                <h3 className="text-gray-800 font-bold text-base mb-1">
                    {config.title}
                </h3>
                <p className="text-gray-400 text-xs font-medium">
                    {config.subtitle}
                </p>
            </div>

            {/* Right Side: Price or Button */}
            <div className="ml-4">
                {config.showPrice ? (
                    <span className="font-bold text-gray-800 text-lg">
                        ${reservation.total ? parseFloat(reservation.total).toFixed(2) : '03.00'}
                    </span>
                ) : (
                    <button
                        onClick={() => onViewDetails(reservation)}
                        className="px-5 py-2 text-xs font-bold text-[#2FA4A9] bg-transparent border border-[#2FA4A9] rounded-lg hover:bg-teal-50 transition-colors"
                    >
                        View Details
                    </button>
                )}
            </div>
        </div>
    );
}

export default ReservationCard;

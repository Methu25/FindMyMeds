export default function MetricCard({ title, value, icon: Icon, onClick, isActive }) {
    return (
        <div
            onClick={onClick}
            className={`rounded-xl shadow-sm p-6 border transition cursor-pointer ${isActive
                    ? 'bg-primary text-white border-primary shadow-lg scale-105'
                    : 'bg-white text-gray-900 border-gray-100 hover:shadow-md'
                }`}
        >
            <div className="flex items-center justify-between">
                <div>
                    <p className={`text-sm font-medium ${isActive ? 'text-white/80' : 'text-gray-600'}`}>{title}</p>
                    <p className={`text-3xl font-bold mt-2 ${isActive ? 'text-white' : 'text-primary'}`}>{value}</p>
                </div>
                {Icon && <Icon size={42} className={`${isActive ? 'text-white' : 'text-primary'} opacity-70`} />}
            </div>
        </div>
    )
}

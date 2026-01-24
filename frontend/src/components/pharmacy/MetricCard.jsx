export default function MetricCard({ title, value, icon: Icon, onClick }) {
    return (
        <div
            onClick={onClick}
            className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 hover:shadow-md transition cursor-pointer"
        >
            <div className="flex items-center justify-between">
                <div>
                    <p className="text-gray-600 text-sm font-medium">{title}</p>
                    <p className="text-3xl font-bold text-primary mt-2">{value}</p>
                </div>
                {Icon && <Icon size={42} className="text-primary opacity-70" />}
            </div>
        </div>
    )
}

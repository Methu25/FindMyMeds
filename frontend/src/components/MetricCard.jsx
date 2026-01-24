export default function MetricCard({ title, value, icon: Icon, onClick }) {
  return (
    <div
      onClick={onClick}
      className="bg-white rounded-2xl shadow-2xl border border-gray-200 p-10 hover:shadow-3xl hover:-translate-y-3 transition-all duration-500 cursor-pointer group"
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-gray-500 text-lg font-semibold uppercase tracking-wider">{title}</p>
          <p className="text-6xl font-extrabold text-primary mt-6 group-hover:scale-110 transition-transform duration-300">
            {value}
          </p>
        </div>
        {Icon && <Icon size={80} className="text-primary opacity-70 group-hover:opacity-100 transition" />}
      </div>
    </div>
  )
}
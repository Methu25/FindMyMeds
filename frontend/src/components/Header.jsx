import { Bell, LogOut } from 'lucide-react'

export default function Header({ title }) {
  return (
    <header className="fixed top-0 left-64 right-0 h-20 bg-white border-b border-gray-200 flex items-center justify-between px-12 z-50 shadow-lg">
      <h2 className="text-4xl font-bold text-gray-800">{title}</h2>
      <div className="flex items-center gap-8">
        <button className="relative group">
          <Bell size={32} className="text-gray-600 group-hover:text-primary transition" />
          <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full w-8 h-8 flex items-center justify-center shadow-lg">
            8
          </span>
        </button>
        <button className="flex items-center gap-3 text-gray-600 hover:text-red-600 font-medium transition">
          <LogOut size={24} />
          <span>Logout</span>
        </button>
      </div>
    </header>
  )
}
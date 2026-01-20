import { Bell } from 'lucide-react'

export default function Header({ title }) {
  return (
    <header className="fixed top-0 left-64 right-0 h-16 bg-white border-b border-gray-200 flex items-center justify-between px-8 z-10 shadow-sm">
      <h2 className="text-2xl font-semibold text-gray-800">{title}</h2>
      <div className="flex items-center gap-6">
        <button className="relative">
          <Bell size={24} className="text-gray-600" />
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
            8
          </span>
        </button>
      </div>
    </header>
  )
}
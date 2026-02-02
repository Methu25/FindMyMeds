import { NavLink } from 'react-router-dom'
import { Home, Package, History, Pill, Bell, Settings, MessageSquare } from 'lucide-react'

const menuItems = [
    { name: 'Dashboard', icon: Home, path: '/pharmacy' },
    { name: 'Current Reservations', icon: Package, path: '/pharmacy/current-reservations' },
    { name: 'Reservation History', icon: History, path: '/pharmacy/reservation-history' },
    { name: 'Medicine Inventory', icon: Pill, path: '/pharmacy/inventory' },
    { name: 'Notification Center', icon: Bell, path: '/pharmacy/notifications' },
    { name: 'Admin Center', icon: MessageSquare, path: '/pharmacy/admin-center' },
    { name: 'System Settings', icon: Settings, path: '/pharmacy/settings' },
]

export default function Sidebar() {
    return (
        <div className="fixed left-0 top-0 h-screen w-64 bg-primary text-white flex flex-col shadow-xl">
            <div className="p-6 border-b border-primary-dark">
                <h1 className="text-2xl font-bold">FindMyMeds</h1>
                <p className="text-sm opacity-90">Pharmacy Portal</p>
            </div>
            <nav className="flex-1 p-4 space-y-1">
                {menuItems.map((item) => {
                    const Icon = item.icon
                    return (
                        <NavLink
                            key={item.name}
                            to={item.path}
                            className={({ isActive }) =>
                                `flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${isActive ? 'bg-primary-dark shadow-md' : 'hover:bg-primary-dark/70'
                                }`
                            }
                        >
                            <Icon size={20} />
                            <span className="font-medium">{item.name}</span>
                        </NavLink>
                    )
                })}
            </nav>
            <div className="p-4 text-xs opacity-75 border-t border-primary-dark">
                © 2026 FindMyMeds
            </div>
        </div>
    )
}

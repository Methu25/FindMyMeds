import Sidebar from './Sidebar'
import Header from './Header'

export default function Layout({ children, title = "Dashboard" }) {
    return (
        <div className="min-h-screen bg-gray-50">
            <Sidebar />
            <div className="ml-64">
                <Header title={title} />
                <main className="pt-20 p-8">
                    {children}
                </main>
            </div>
        </div>
    )
}

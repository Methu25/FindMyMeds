import Sidebar from './Sidebar'
import Header from './Header'

export default function Layout({ children, title = "Dashboard" }) {
  return (
    <div className="min-h-screen bg-gray-100">
      <Sidebar />
      <div className="ml-64">
        <Header title={title} />
        <main className="pt-28 px-12 pb-12">
          {children}
        </main>
      </div>
    </div>
  )
}
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import Dashboard from './pages/Dashboard.jsx'
import AdminCenter from './pages/AdminCenter.jsx'
import SystemSettings from './pages/SystemSettings.jsx'

function App() {
  return (
    <Router>
      <Routes>

        <Route path="/" element={<Dashboard />} />

        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/admin-center" element={<AdminCenter />} />
        <Route path="/settings" element={<SystemSettings />} />

      </Routes>
    </Router>
  )
}

export default App

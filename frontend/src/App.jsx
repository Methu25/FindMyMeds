import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import AdminLayout from './components/admin/AdminLayout';
import Dashboard from './pages/pharmacy/Dashboard.jsx'
import AdminCenter from './pages/pharmacy/AdminCenter.jsx'
import SystemSettings from './pages/pharmacy/SystemSettings.jsx'
import MedicineRegistry from './pages/admin/MedicineRegistry';
import AddMedicine from './pages/admin/AddMedicine';
import MedicineDetails from './pages/admin/MedicineDetails';
import NotificationCenter from './pages/admin/NotificationCenter';
import NotificationDetails from './pages/admin/NotificationDetails';
import ProfilePage from './pages/admin/ProfilePage';
import MedicineInventory from './pages/pharmacy/MedicineInventory';
import PharmacyNotificationCenter from './pages/pharmacy/NotificationCenter';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/admin" replace />} />

        {/* Admin Routes */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<div className="p-4">Dashboard Placeholder</div>} />

          {/* Placeholders for other sections */}
          {/* Medicine Registry */}
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="admin-center" element={<AdminCenter />} />
          <Route path="settings" element={<SystemSettings />} />
          <Route path="medicines" element={<MedicineRegistry />} />
          <Route path="medicines/add" element={<AddMedicine />} />
          <Route path="medicines/:id" element={<MedicineDetails />} />
          <Route path="pharmacies" element={<div className="p-4">Pharmacy Management Placeholder</div>} />
          <Route path="civilians" element={<div className="p-4">Civilian Management Placeholder</div>} />

          {/* Notification Center */}
          <Route path="notifications" element={<NotificationCenter />} />
          <Route path="notifications/:id" element={<NotificationDetails />} />

          {/* Profile */}
          <Route path="profile" element={<ProfilePage />} />
        </Route>

        {/* Pharmacy Routes */}
        <Route path="/pharmacy">
          <Route index element={<Dashboard />} />
          <Route path="inventory" element={<MedicineInventory />} />
          <Route path="notifications" element={<PharmacyNotificationCenter />} />
          <Route path="admin-center" element={<AdminCenter />} />
          <Route path="settings" element={<SystemSettings />} />
          {/* Placeholders for missing pages */}
          <Route path="current-reservations" element={<div className="p-8">Current Reservations Placeholder</div>} />
          <Route path="reservation-history" element={<div className="p-8">Reservation History Placeholder</div>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import AdminLayout from './components/admin/AdminLayout';

// Admin Pages
import Dashboard from './pages/pharmacy/Dashboard.jsx'
import AdminCenter from './pages/pharmacy/AdminCenter.jsx'
import SystemSettings from './pages/pharmacy/SystemSettings.jsx'
import MedicineRegistry from './pages/admin/MedicineRegistry';
import AddMedicine from './pages/admin/AddMedicine';
import MedicineDetails from './pages/admin/MedicineDetails';
import NotificationCenter from './pages/admin/NotificationCenter';
import NotificationDetails from './pages/admin/NotificationDetails';
import ProfilePage from './pages/admin/ProfilePage';
import CivilianManagement from './pages/admin/CivilianManagement';

// Pharmacy Pages (HEAD)
import MedicineInventory from './pages/pharmacy/MedicineInventory';
import PharmacyMedicineDetails from './pages/pharmacy/MedicineDetails';
import PharmacyNotificationCenter from './pages/pharmacy/NotificationCenter';
import PharmacyNotificationDetails from './pages/pharmacy/NotificationDetails';

// Civilian Pages (Master)
import CivilianLayout from './components/civilian/CivilianLayout';
import ActivityPage from './pages/civilian/ActivityPage';
import FindPharmacy from './pages/civilian/FindPharmacy';
import ReservationPage from './pages/civilian/ReservationPage';

import { NotificationProvider } from './context/NotificationContext';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/admin" replace />} />

        {/* Admin Routes */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<div className="p-4">Dashboard Placeholder</div>} />

          {/* Placeholders for other sections */}
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="admin-center" element={<AdminCenter />} />
          <Route path="settings" element={<SystemSettings />} />
          <Route path="medicines" element={<MedicineRegistry />} />
          <Route path="medicines/add" element={<AddMedicine />} />
          <Route path="medicines/:id" element={<MedicineDetails />} />
          <Route path="pharmacies" element={<div className="p-4">Pharmacy Management Placeholder</div>} />
          <Route path="civilians" element={<CivilianManagement />} />

          {/* Notification Center */}
          <Route path="notifications" element={<NotificationCenter />} />
          <Route path="notifications/:id" element={<NotificationDetails />} />

          {/* Profile */}
          <Route path="profile" element={<ProfilePage />} />
        </Route>

        {/* Pharmacy Routes (HEAD) */}
        <Route path="/pharmacy/*" element={
          <NotificationProvider>
            <Routes>
              <Route index element={<Dashboard />} />
              <Route path="inventory" element={<MedicineInventory />} />
              <Route path="medicines/:id" element={<PharmacyMedicineDetails />} />
              <Route path="notifications" element={<PharmacyNotificationCenter />} />
              <Route path="notifications/:id" element={<PharmacyNotificationDetails />} />
              <Route path="admin-center" element={<AdminCenter />} />
              <Route path="settings" element={<SystemSettings />} />
              <Route path="current-reservations" element={<div className="p-8">Current Reservations Placeholder</div>} />
              <Route path="reservation-history" element={<div className="p-8">Reservation History Placeholder</div>} />
            </Routes>
          </NotificationProvider>
        } />

        {/* Civilian Routes (Master) */}
        <Route path="/civilian" element={<CivilianLayout />}>
          <Route index element={<Navigate to="activity" replace />} />
          <Route path="activity" element={<ActivityPage />} />
          <Route path="find-pharmacy" element={<FindPharmacy />} />
          <Route path="reservation" element={<ReservationPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
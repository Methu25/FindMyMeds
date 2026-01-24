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
import CivilianManagement from './pages/admin/CivilianManagement';

// User Portal Imports
import CivilianLayout from './components/civilian/CivilianLayout';
import ActivityPage from './pages/civilian/ActivityPage';
import FindPharmacy from './pages/civilian/FindPharmacy';
import ReservationPage from './pages/civilian/ReservationPage';

import PharmacyLayout from './components/civilian/PharmacyLayout';
import PharmacyDashboard from './pages/pharmacy/Dashboard'; // Reusing dashboard or should be separate?
// Assuming PharmacyDashboard is intended for Pharmacy User Portal based on context


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
          <Route path="civilians" element={<CivilianManagement />} />

          {/* Notification Center */}
          <Route path="notifications" element={<NotificationCenter />} />
          <Route path="notifications/:id" element={<NotificationDetails />} />

          {/* Profile */}
          <Route path="profile" element={<ProfilePage />} />
        </Route>

        {/* Civilian Routes */}
        <Route path="/civilian" element={<CivilianLayout />}>
          <Route index element={<Navigate to="activity" replace />} />
          <Route path="activity" element={<ActivityPage />} />
          <Route path="find-pharmacy" element={<FindPharmacy />} />
          <Route path="reservation" element={<ReservationPage />} />
        </Route>

        {/* Pharmacy Routes */}
        <Route path="/pharmacy" element={<PharmacyLayout />}>
          {/* Reusing Admin Dashboard for now as User Dashboard, or Placeholder */}
          <Route index element={<PharmacyDashboard />} />
          <Route path="current-reservations" element={<div className="p-4">Current Reservations Placeholder</div>} />
          <Route path="reservation-history" element={<div className="p-4">History Placeholder</div>} />
          <Route path="inventory" element={<div className="p-4">Inventory Placeholder</div>} />
          <Route path="notifications" element={<div className="p-4">Notifications Placeholder</div>} />
          <Route path="admin-center" element={<div className="p-4">Admin Center Placeholder</div>} />
          <Route path="settings" element={<div className="p-4">Settings Placeholder</div>} />
        </Route>
      </Routes>
    </BrowserRouter >
  );
}

export default App;
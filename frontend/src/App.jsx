import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import AdminLayout from './components/admin/AdminLayout';

// Landing Page 
import Home from './pages/Home';

// Admin Pages 
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminManagement from './pages/admin/AdminManagement';
import CivilianManagement from './pages/admin/CivilianManagement';
import AdminMedicineRegistry from './pages/admin/AdminMedicineRegistry';
import AdminAddMedicine from './pages/admin/AdminAddMedicine';
import AdminMedicineDetails from './pages/admin/AdminMedicineDetails';
import AdminNotificationCenter from './pages/admin/AdminNotificationCenter';
import AdminNotificationDetails from './pages/admin/AdminNotificationDetails';
import AdminProfilePage from './pages/admin/AdminProfilePage';
import SystemSettings from './pages/admin/SystemSettings'; // Moved to admin

// Pharmacy Pages 
import PharmacyDashboard from './pages/pharmacy/Dashboard';
import MedicineInventory from './pages/pharmacy/MedicineInventory';
import PharmacyMedicineDetails from './pages/pharmacy/MedicineDetails';
import PharmacyNotificationCenter from './pages/pharmacy/NotificationCenter';
import PharmacyNotificationDetails from './pages/pharmacy/NotificationDetails';
import AdminCenter from './pages/pharmacy/AdminCenter.jsx'; // This was originally here, keeping it.

// Civilian Pages 
import CivilianLayout from './components/civilian/CivilianLayout';
import ActivityPage from './pages/civilian/ActivityPage';
import FindPharmacy from './pages/civilian/FindPharmacy';
import ReservationPage from './pages/civilian/ReservationPage';

import { NotificationProvider } from './context/NotificationContext';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Landing page first */}
        <Route path="/" element={<Home />} />

        {/*  Admin Routes */}
        <Route path="/admin" element={<AdminLayout />}>

          {/* When visiting /admin -> go to /admin/dashboard */}
          <Route index element={<Navigate to="dashboard" replace />} />

          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="administrators" element={<AdminManagement />} />
          <Route path="settings" element={<SystemSettings />} />

          {/* Medicines */}
          <Route path="medicines" element={<AdminMedicineRegistry />} />
          <Route path="medicines/add" element={<AdminAddMedicine />} />
          <Route path="medicines/:id" element={<AdminMedicineDetails />} />

          {/* Pharmacies placeholder */}
          <Route path="pharmacies" element={<div className="p-4">Pharmacy Management Placeholder</div>} />

          {/* Civilians */}
          <Route path="civilians" element={<CivilianManagement />} />

          {/* Notifications */}
          <Route path="notifications" element={<AdminNotificationCenter />} />
          <Route path="notifications/:id" element={<AdminNotificationDetails />} />

          {/* Profile */}
          <Route path="profile" element={<AdminProfilePage />} />
        </Route>

        {/* Pharmacy Routes */}
        <Route path="/pharmacy/*" element={
          <NotificationProvider>
            <Routes>
              <Route index element={<PharmacyDashboard />} />
              <Route path="inventory" element={<MedicineInventory />} />
              <Route path="medicines/:id" element={<PharmacyMedicineDetails />} />
              <Route path="notifications" element={<PharmacyNotificationCenter />} />
              <Route path="notifications/:id" element={<PharmacyNotificationDetails />} />
              <Route path="admin-center" element={<AdminCenter />} />
              <Route path="settings" element={<div className="p-8">Pharmacy Settings Placeholder</div>} /> {/* SystemSettings moved to admin, so this is a placeholder now */}
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

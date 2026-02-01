import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import AdminLayout from './components/admin/AdminLayout';

// Landing Page 
import Home from './pages/Home';

// Admin Pages 
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminCenter from './pages/pharmacy/AdminCenter.jsx';
import SystemSettings from './pages/pharmacy/SystemSettings.jsx';
import MedicineRegistry from './pages/admin/MedicineRegistry';
import AddMedicine from './pages/admin/AddMedicine';
import MedicineDetails from './pages/admin/MedicineDetails';
import NotificationCenter from './pages/admin/NotificationCenter';
import NotificationDetails from './pages/admin/NotificationDetails';
import ProfilePage from './pages/admin/ProfilePage';
import CivilianManagement from './pages/admin/CivilianManagement';
import PharmacyManagementHome from './pages/admin/Pharmacy/PharmacyManagementHome';

// Pharmacy Pages 
import MedicineInventory from './pages/pharmacy/MedicineInventory';
import PharmacyMedicineDetails from './pages/pharmacy/MedicineDetails';
import PharmacyNotificationCenter from './pages/pharmacy/NotificationCenter';
import PharmacyNotificationDetails from './pages/pharmacy/NotificationDetails';

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
          <Route path="admin-center" element={<AdminCenter />} />
          <Route path="settings" element={<SystemSettings />} />

          {/* Medicines */}
          <Route path="medicines" element={<MedicineRegistry />} />
          <Route path="medicines/add" element={<AddMedicine />} />
          <Route path="medicines/:id" element={<MedicineDetails />} />

          {/* Pharmacies */}
          <Route path="pharmacies" element={<PharmacyManagementHome />} />

          {/* Civilians */}
          <Route path="civilians" element={<CivilianManagement />} />

          {/* Notifications */}
          <Route path="notifications" element={<NotificationCenter />} />
          <Route path="notifications/:id" element={<NotificationDetails />} />

          {/* Profile */}
          <Route path="profile" element={<ProfilePage />} />
        </Route>

        {/* Pharmacy Routes */}
        <Route path="/pharmacy/*" element={
          <NotificationProvider>
            <Routes>
              <Route index element={<AdminDashboard />} />
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

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
import SystemSettings from './pages/admin/SystemSettings';
import PharmacyManagementHome from './pages/admin/Pharmacy/PharmacyManagementHome';

// Pharmacy Pages 
import PharmacyDashboard from './pages/pharmacy/Dashboard';
import MedicineInventory from './pages/pharmacy/MedicineInventory';
import PharmacyMedicineDetails from './pages/pharmacy/MedicineDetails';
import PharmacyNotificationCenter from './pages/pharmacy/NotificationCenter';
import PharmacyNotificationDetails from './pages/pharmacy/NotificationDetails';
import CurrentReservations from './pages/pharmacy/CurrentReservations';
import ReservationHistory from './pages/pharmacy/ReservationHistory';
import AdminCenter from './pages/pharmacy/AdminCenter.jsx';

// Civilian Pages 
import CivilianLayout from './components/civilian/CivilianLayout';
import ActivityPage from './pages/civilian/ActivityPage';
import FindPharmacy from './pages/civilian/FindPharmacy';
import ReservationPage from './pages/civilian/ReservationPage';

import { NotificationProvider } from './context/NotificationContext';

// App version: 1.0.1 - Forced Refresh
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />

        {/* Admin Routes */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<Navigate to="dashboard" replace />} />
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="administrators" element={<AdminManagement />} />
          <Route path="settings" element={<SystemSettings />} />
          <Route path="medicines" element={<AdminMedicineRegistry />} />
          <Route path="medicines/add" element={<AdminAddMedicine />} />
          <Route path="medicines/:id" element={<AdminMedicineDetails />} />
          <Route path="pharmacies" element={<PharmacyManagementHome />} />
          <Route path="civilians" element={<CivilianManagement />} />
          <Route path="notifications" element={<AdminNotificationCenter />} />
          <Route path="notifications/:id" element={<AdminNotificationDetails />} />
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
              <Route path="settings" element={<div className="p-8">Pharmacy Settings Content Coming Soon</div>} />
              <Route path="current-reservations" element={<CurrentReservations />} />
              <Route path="reservation-history" element={<ReservationHistory />} />
            </Routes>
          </NotificationProvider>
        } />

        {/* Civilian Routes */}
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

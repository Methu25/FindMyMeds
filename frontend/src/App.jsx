import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import AdminLayout from './components/admin/AdminLayout';

// Landing Page 
import Home from './pages/Home';
import Login from './pages/Login';

// Admin Pages 
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminManagement from './pages/admin/AdminManagement';
import CivilianManagement from "./pages/admin/Civilian/CivilianManagement";
import CivilianDetails from "./pages/admin/Civilian/CivilianDetails";
import CivilianVivo from "./pages/admin/Civilian/CivilianVivo";
import CivilianReports from "./pages/admin/Civilian/CivilianReports";
import CivilianReportDetails from "./pages/admin/Civilian/CivilianReportDetails";
import AppealDetails from "./pages/admin/Appeal/AppealDetails";
import AdminMedicineRegistry from './pages/admin/AdminMedicineRegistry';
import AdminAddMedicine from './pages/admin/AdminAddMedicine';
import AdminMedicineDetails from './pages/admin/AdminMedicineDetails';
import AdminNotificationCenter from './pages/admin/AdminNotificationCenter';
import AdminNotificationDetails from './pages/admin/AdminNotificationDetails';
import AdminProfilePage from './pages/admin/AdminProfilePage';
import SystemSettings from './pages/admin/SystemSettings'; // Moved to admin
import PharmacyManagementHome from './pages/admin/Pharmacy/PharmacyManagementHome'; // Imported PharmacyManagementHome
import AdminPharmacyDetails from "./pages/admin/Pharmacy/AdminPharmacyDetails";
import AdminPharmacyReview from "./pages/admin/Pharmacy/AdminPharmacyReview";
import AdminPharmacyReports from "./pages/admin/Pharmacy/AdminPharmacyReports";
import AdminReportDetails from "./pages/admin/Pharmacy/AdminReportDetails";
import RejectedPharmacyTable from "./pages/admin/Pharmacy/RejectedPharmacyTable";
import RejectedPharmacyDetails from "./pages/admin/Pharmacy/RejectedPharmacyDetails";

// Pharmacy Pages 
import PharmacyDashboard from './pages/pharmacy/Dashboard';
import MedicineInventory from './pages/pharmacy/MedicineInventory';
import PharmacyMedicineDetails from './pages/pharmacy/MedicineDetails';
import PharmacyNotificationCenter from './pages/pharmacy/NotificationCenter';
import PharmacyNotificationDetails from './pages/pharmacy/NotificationDetails';
import AdminCenter from './pages/pharmacy/AdminCenter.jsx';
import PharmacySystemSettings from './pages/pharmacy/SystemSettings';
import PharmacyAddMedicine from './pages/pharmacy/AddMedicine';
import PharmacyCurrentReservations from './pages/pharmacy/CurrentReservations';
import PharmacyReservationHistory from './pages/pharmacy/ReservationHistory';
import PharmacyReportPage from './pages/pharmacy/PharmacyReportPage';
import PharmacyProfile from './pages/pharmacy/PharmacyProfile';

// Civilian Pages 
import CivilianLayout from './components/civilian/CivilianLayout';
import ActivityPage from './pages/civilian/ActivityPage';
import FindPharmacy from './pages/civilian/FindPharmacy';
import ReservationPage from './pages/civilian/ReservationPage';

import { NotificationProvider } from './context/NotificationContext';
import { ToastProvider } from './context/ToastContext';

function App() {
  return (
    <BrowserRouter>
      <ToastProvider>
        <Routes>
          {/* Landing page first */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />

          {/*  Admin Routes */}
          <Route path="/admin" element={<AdminLayout />}>
            <Route path="pharmacies/:pharmacyId" element={<AdminPharmacyDetails />} />
            {/* Pharmacy Reports & Inquiries Routes */}
            <Route path="reports" element={<AdminPharmacyReports />} />
            <Route path="reports/:reportId" element={<AdminReportDetails />} />
            <Route path="pharmacy/rejected" element={<RejectedPharmacyTable />} />
            <Route path="pharmacy/rejected/:id" element={<RejectedPharmacyDetails />} />
            <Route path="pharmacy-review/:pharmacyId" element={<AdminPharmacyReview />} />

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
            <Route path="pharmacies" element={<PharmacyManagementHome />} />

            {/* Civilians */}
            <Route path="/admin/civilians" element={<CivilianManagement />} />
            <Route path="/admin/civilians/:id" element={<CivilianDetails />} />
            <Route path="/admin/civilians/:id/vivo" element={<CivilianVivo />} />
            <Route path="/admin/civilian-reports" element={<CivilianReports />} />
            <Route path="/admin/civilian-reports/:id" element={<CivilianReportDetails />} />
            <Route path="/admin/appeals" element={<AppealDetails />} />

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
                <Route path="inventory/add" element={<PharmacyAddMedicine />} />
                <Route path="medicines/:id" element={<PharmacyMedicineDetails />} />
                <Route path="notifications" element={<PharmacyNotificationCenter />} />
                <Route path="notifications/:id" element={<PharmacyNotificationDetails />} />
                <Route path="admin-center" element={<AdminCenter />} />
                <Route path="settings" element={<PharmacySystemSettings />} />
                <Route path="current-reservations" element={<PharmacyCurrentReservations />} />
                <Route path="reservation-history" element={<PharmacyReservationHistory />} />
                {/* stock-management routes back to inventory as per user request */}
                <Route path="stock-management" element={<MedicineInventory />} />
                <Route path="reports" element={<PharmacyReportPage />} />
                <Route path="profile" element={<PharmacyProfile />} />
              </Routes >
            </NotificationProvider >
          } />

          {/* Civilian Routes (Master) */}
          <Route path="/civilian" element={<CivilianLayout />}>
            <Route index element={<Navigate to="activity" replace />} />
            <Route path="activity" element={<ActivityPage />} />
            <Route path="find-pharmacy" element={<FindPharmacy />} />
            <Route path="reservation" element={<ReservationPage />} />
          </Route>
        </Routes >
      </ToastProvider>
    </BrowserRouter >
  );
}

export default App;

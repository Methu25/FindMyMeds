import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/layout/Layout';
import AdminManagement from './pages/AdminManagement';

import Dashboard from './pages/Dashboard';
import MedicineRegistry from './pages/MedicineRegistry';
import AddMedicine from './pages/AddMedicine';
import MedicineDetails from './pages/MedicineDetails';
import PharmacyManagement from './pages/PharmacyManagement';
import CivilianManagement from './pages/CivilianManagement';
import CivilianDetails from './pages/CivilianDetails';
import AppealDetails from './pages/AppealDetails';
import ReportsInquiries from './pages/ReportsInquiries';
import ReportDetails from './pages/ReportDetails';
import ReportSubmission from './pages/ReportSubmission';
import NotificationCenter from './pages/NotificationCenter';
import NotificationDetails from './pages/NotificationDetails';
import PharmacyApplications from './pages/PharmacyApplications';
import ApplicationDetails from './pages/ApplicationDetails';
import RemovedPharmacies from './pages/RemovedPharmacies';
import PharmacyDetails from './pages/PharmacyDetails';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Dashboard />} />
        <Route path="medicine" element={<MedicineRegistry />} />
        <Route path="medicine/:id" element={<MedicineDetails />} />
        <Route path="admin/add-medicine" element={<AddMedicine />} />
        <Route path="pharmacy" element={<PharmacyManagement />} />
        <Route path="pharmacy/applications" element={<PharmacyApplications />} />
        <Route path="pharmacy/applications/:id" element={<ApplicationDetails />} />
        <Route path="pharmacy/removed" element={<RemovedPharmacies />} />
        <Route path="pharmacy/:id" element={<PharmacyDetails />} />
        <Route path="civilian" element={<CivilianManagement />} />
        <Route path="civilian/:id" element={<CivilianDetails />} />
        <Route path="civilian/appeal/:appealId" element={<AppealDetails />} />
        <Route path="admin" element={<AdminManagement />} />
        <Route path="reports" element={<ReportsInquiries />} />
        <Route path="admin/reports/:id" element={<ReportDetails />} />
        <Route path="report-submission" element={<ReportSubmission />} />
        <Route path="notifications" element={<NotificationCenter />} />
        <Route path="notifications/:id" element={<NotificationDetails />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  );
}

export default App;

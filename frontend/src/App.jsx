import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import AdminLayout from './components/AdminLayout';
import CivilianLayout from './components/CivilianLayout';
import PharmacyLayout from './components/PharmacyLayout';

import MedicineRegistry from './pages/MedicineRegistry';
import AddMedicine from './pages/AddMedicine';
import MedicineDetails from './pages/MedicineDetails';
import NotificationCenter from './pages/NotificationCenter';
import NotificationDetails from './pages/NotificationDetails';
import ProfilePage from './pages/ProfilePage';
import FindPharmacy from './pages/FindPharmacy';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/admin" replace />} />

        {/* Admin Routes */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<div className="p-4">Dashboard Placeholder</div>} />

          <Route path="medicines" element={<MedicineRegistry />} />
          <Route path="medicines/add" element={<AddMedicine />} />
          <Route path="medicines/:id" element={<MedicineDetails />} />
          <Route path="pharmacies" element={<div className="p-4">Pharmacy Management Placeholder</div>} />
          <Route path="civilians" element={<div className="p-4">Civilian Management Placeholder</div>} />
          <Route path="notifications" element={<NotificationCenter />} />
          <Route path="notifications/:id" element={<NotificationDetails />} />
          <Route path="profile" element={<ProfilePage />} />
        </Route>

        {/* Civilian Routes */}
        <Route path="/civilian" element={<CivilianLayout />}>
          <Route index element={<Navigate to="/civilian/find-pharmacy" replace />} />
          <Route path="find-pharmacy" element={<FindPharmacy />} />

          {/* Placeholders for links in sidebar */}
          <Route path="home" element={<div className="p-8">Civilian Home Placeholder</div>} />
          <Route path="inquiries" element={<div className="p-8">Inquiries Placeholder</div>} />
          <Route path="reservation" element={<div className="p-8">Reservations Placeholder</div>} />
          <Route path="activity" element={<div className="p-8">Activity Placeholder</div>} />
          <Route path="feedback" element={<div className="p-8">Feedback Placeholder</div>} />
        </Route>

        {/* Pharmacy Routes */}
        <Route path="/pharmacy" element={<PharmacyLayout />}>
          <Route index element={<div className="p-4">Pharmacy Dashboard Placeholder</div>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

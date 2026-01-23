import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import AdminLayout from './components/AdminLayout';



import MedicineRegistry from './pages/MedicineRegistry';
import AddMedicine from './pages/AddMedicine';
import MedicineDetails from './pages/MedicineDetails';
import NotificationCenter from './pages/NotificationCenter';
import NotificationDetails from './pages/NotificationDetails';
import ProfilePage from './pages/ProfilePage';

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
      </Routes>
    </BrowserRouter>
  );
}

export default App;

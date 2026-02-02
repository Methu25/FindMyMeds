import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import AdminLayout from './components/AdminLayout';
import MedicineRegistry from './pages/MedicineRegistry';
import AddMedicine from './pages/AddMedicine';
import MedicineDetails from './pages/MedicineDetails';
import NotificationCenter from './pages/NotificationCenter';
import NotificationDetails from './pages/NotificationDetails';
import ProfilePage from './pages/ProfilePage';
import CurrentReservations from './pages/CurrentReservations';
import ReservationHistory from './pages/ReservationHistory';

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Navigate to="/admin/medicines" replace />} />
                <Route path="/admin" element={<AdminLayout />}>
                    <Route index element={<Navigate to="medicines" replace />} />
                    <Route path="medicines" element={<MedicineRegistry />} />
                    <Route path="medicines/add" element={<AddMedicine />} />
                    <Route path="medicines/:id" element={<MedicineDetails />} />
                    <Route path="notifications" element={<NotificationCenter />} />
                    <Route path="notifications/:id" element={<NotificationDetails />} />
                    <Route path="profile" element={<ProfilePage />} />
                    <Route path="reservations" element={<CurrentReservations />} />
                    <Route path="reservations/history" element={<ReservationHistory />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;

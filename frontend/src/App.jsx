import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import ReservationPage from './pages/civilian/ReservationPage';
import ActivityPage from './pages/civilian/ActivityPage';
import './styles/global.css';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <div className="app-layout">
        <Sidebar />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Navigate to="/civilian/reservation" replace />} />
            <Route path="/civilian/home" element={<div className="card"><h2>Home</h2><p>Coming soon...</p></div>} />
            <Route path="/civilian/reservation" element={<ReservationPage />} />
            <Route path="/civilian/activity" element={<ActivityPage />} />
            <Route path="/civilian/inquiries" element={<div className="card"><h2>Inquiries</h2><p>Coming soon...</p></div>} />
            <Route path="/civilian/feedback" element={<div className="card"><h2>Feedback</h2><p>Coming soon...</p></div>} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;

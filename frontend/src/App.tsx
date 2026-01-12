import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import NotificationCenter from '@/components/NotificationCenter';
import NotificationDetails from '@/components/NotificationDetails';

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-background text-foreground font-sans antialiased">
        <Routes>
          <Route path="/" element={<Navigate to="/notifications" replace />} />
          <Route path="/notifications" element={<NotificationCenter />} />
          <Route path="/notifications/:id" element={<NotificationDetails />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;

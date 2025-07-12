import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AdminLogin from './pages/AdminLogin';
import VoucherEntry from './pages/VoucherEntry';
import AdminDashboard from './pages/AdminDashboard';
import LandingPage from './pages/LandingPage';

function App() {
  const [adminToken, setAdminToken] = useState('');

  // ✅ On first load, check localStorage
  useEffect(() => {
    const storedToken = localStorage.getItem('adminToken');
    if (storedToken) {
      setAdminToken(storedToken);
    }
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/admin" element={<AdminLogin setToken={setAdminToken} />} />
        <Route path="/voucher" element={<VoucherEntry />} />
        <Route path="/dashboard" element={<AdminDashboard token={adminToken} />} />
      </Routes>
    </Router>
  );
}

export default App;

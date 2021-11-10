import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import BaseLayout from './pages/BaseLayout';
import DashboardPage from './pages/dashboard/DashboardPage';
import LoginPage from './pages/login/LoginPage';
import AuthProvider from './services/auth/AuthProvider';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<BaseLayout />}>
          <Route path="dashboard/anjay" element={<AuthProvider level={["pegawai", "admin", "adminupt"]}><DashboardPage /></AuthProvider>} />
        </Route>
        <Route exact path="/login" element={<LoginPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

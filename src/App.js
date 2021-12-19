import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './assets/css/App.css';
import BaseLayout from './pages/BaseLayout';
import DashboardPage from './pages/dashboard/DashboardPage';
import ListEmployee from './pages/listemployee/ListEmployee';
import LoginPage from './pages/login/LoginPage';
import AuthProvider from './services/auth/AuthProvider';
import ListUser from './pages/listuser/ListUser';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<BaseLayout />}>
          <Route path="dashboard" element={<AuthProvider level={["pegawai", "admin", "adminupt"]}><DashboardPage /></AuthProvider>} />
          <Route path="employees" element={<AuthProvider level={["pegawai", "admin", "adminupt"]}><ListEmployee /></AuthProvider>} />
          <Route path="users" element={<AuthProvider level={["pegawai", "admin", "adminupt"]}><ListUser /></AuthProvider>} />
        </Route>
        <Route exact path="/login" element={<LoginPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

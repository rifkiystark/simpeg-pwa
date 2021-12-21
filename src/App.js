import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './assets/css/App.css';
import BaseLayout from './pages/BaseLayout';
import DashboardPage from './pages/dashboard/DashboardPage';
import ListEmployee from './pages/listemployee/ListEmployee';
import LoginPage from './pages/login/LoginPage';
import AuthProvider from './services/auth/AuthProvider';
import ListUser from './pages/listuser/ListUser';
import MasterReligion from './pages/master-religion/MasterReligion';
import MasterTraining from './pages/master-training/MasterTraining';
import MasterSalary from './pages/master-salary/MasterSalary';
import MasterGroup from './pages/master-group/MasterGroup';
import MasterEducation from './pages/master-education/MasterEducation';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<BaseLayout />}>
          <Route path="dashboard" element={<AuthProvider level={["pegawai", "admin", "adminupt"]}><DashboardPage /></AuthProvider>} />
          <Route path="employees" element={<AuthProvider level={["pegawai", "admin", "adminupt"]}><ListEmployee /></AuthProvider>} />
          <Route path="users" element={<AuthProvider level={["pegawai", "admin", "adminupt"]}><ListUser /></AuthProvider>} />
          
          <Route path="master/religions" element={<AuthProvider level={["admin"]}><MasterReligion /></AuthProvider>} />
          <Route path="master/training" element={<AuthProvider level={["admin"]}><MasterTraining /></AuthProvider>} />
          <Route path="master/salary" element={<AuthProvider level={["admin"]}><MasterSalary /></AuthProvider>} />
          <Route path="master/group" element={<AuthProvider level={["admin"]}><MasterGroup /></AuthProvider>} />
          <Route path="master/education" element={<AuthProvider level={["admin"]}><MasterEducation /></AuthProvider>} />

        

        </Route>
        <Route exact path="/login" element={<LoginPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

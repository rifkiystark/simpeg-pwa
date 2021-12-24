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
import MasterFunctionalPosition from './pages/master-functional-position/MasterFunctionalPosition';
import MasterStructuralPosition from './pages/master-structural-position/MasterStructuralPosition';
import MasterAdditionalPosition from './pages/master-additional-position/MasterAdditionalPosition';
import MasterUnits from './pages/master-units/MasterUnits';
import DataPresence from './pages/presence-data/DataPresence';
import SettingPresence from './pages/presence-setting/SettingPresence';
import MyPresence from './pages/presence-my/MyPresence';

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
          <Route path="master/structural-position" element={<AuthProvider level={["admin"]}><MasterStructuralPosition /></AuthProvider>} />
          <Route path="master/functional-position" element={<AuthProvider level={["admin"]}><MasterFunctionalPosition /></AuthProvider>} />
          <Route path="master/additional-position" element={<AuthProvider level={["admin"]}><MasterAdditionalPosition /></AuthProvider>} />
          <Route path="master/units" element={<AuthProvider level={["admin"]}><MasterUnits /></AuthProvider>} />


          <Route path="presence/data" element={<AuthProvider level={["admin", 'adminunit']}><DataPresence /></AuthProvider>} />
          <Route path="presence/setting" element={<AuthProvider level={['admin', 'adminunit']}><SettingPresence /></AuthProvider>} />
          <Route path="presence/history" element={<AuthProvider level={['admin', 'adminunit','pegawai']}><MyPresence /></AuthProvider>} />



        </Route>
        <Route exact path="/login" element={<LoginPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

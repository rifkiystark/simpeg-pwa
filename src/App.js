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
import Submission from './pages/submission/Submission';
import HistoryTraining from './pages/history-training/HistoryTraining';
import HistorySalary from './pages/history-salary/HistorySalary';
import HistoryPunishment from './pages/history-punishment/HistoryPunishment';
import HistoryStructuralPosition from './pages/history-structural-position/HistoryStructuralPosition';
import HistoryFunctionalPosition from './pages/history-functional-position/HistoryFunctionalPosition';
import HistoryAdditionalPosition from './pages/history-additional-position/HistoryAdditionalPosition';
import Profile from './pages/profile/Profile';
import EditProfile from './pages/edit-profile/EditProfile';
import FillOutProfile from './pages/fillout-profile/FillOutProfile';
import PresenceIn from './pages/presence-in/PresenceIn';
import PresenceOut from './pages/presence-out/PresenceOut';
import { ToastContainer } from 'react-toastify';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<BaseLayout />}>
            <Route path="dashboard" element={<AuthProvider level={["pegawai", "admin", "adminupt"]}><DashboardPage /></AuthProvider>} />
            <Route path="employees" element={<AuthProvider level={["pegawai", "admin", "adminupt"]}><ListEmployee /></AuthProvider>} />
            <Route path="users" element={<AuthProvider level={["pegawai", "admin", "adminupt"]}><ListUser /></AuthProvider>} />
            <Route path="submission" element={<AuthProvider level={["admin"]}><Submission /></AuthProvider>} />
            <Route path="profile" element={<AuthProvider level={['admin', 'adminunit', 'pegawai']}><Profile /></AuthProvider>} />
            <Route path="profile/edit" element={<AuthProvider level={["admin"]}><EditProfile /></AuthProvider>} />

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
            <Route path="presence/history" element={<AuthProvider level={['admin', 'adminunit', 'pegawai']}><MyPresence /></AuthProvider>} />
            <Route path="presence/in" element={<AuthProvider level={['admin', 'adminunit', 'pegawai']}><PresenceIn /></AuthProvider>} />
            <Route path="presence/out" element={<AuthProvider level={['admin', 'adminunit', 'pegawai']}><PresenceOut /></AuthProvider>} />

            <Route path="history/training" element={<AuthProvider level={["admin", "pegawai"]}><HistoryTraining /></AuthProvider>} />
            <Route path="history/salary" element={<AuthProvider level={["admin", "pegawai"]}><HistorySalary /></AuthProvider>} />
            <Route path="history/punishment" element={<AuthProvider level={["admin", "pegawai"]}><HistoryPunishment /></AuthProvider>} />
            <Route path="history/structural-position" element={<AuthProvider level={["admin", "pegawai"]}><HistoryStructuralPosition /></AuthProvider>} />
            <Route path="history/functional-position" element={<AuthProvider level={["admin", "pegawai"]}><HistoryFunctionalPosition /></AuthProvider>} />
            <Route path="history/additional-position" element={<AuthProvider level={["admin", "pegawai"]}><HistoryAdditionalPosition /></AuthProvider>} />


          </Route>
          <Route path="profile/fillout" element={<AuthProvider level={["admin"]}><FillOutProfile /></AuthProvider>} />
          <Route exact path="/login" element={<LoginPage />} />
        </Routes>

      </BrowserRouter>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </>
  );
}

export default App;

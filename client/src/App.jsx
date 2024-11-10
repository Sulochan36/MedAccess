
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';


import UserLayout from './layouts/UserLayout';
import DashLayout from './layouts/DashLayout';


import HomePage from './pages/HomePage/HomePage';
import HospitalsPage from './pages/HospitalsPage/HospitalsPage';
import BloodBankPage from './pages/BloodBankPage/BloodBankPage';
import DoctorsPage from './pages/DoctorsPage/DoctorsPage';
import AboutPage from './pages/AboutPage/AboutPage';
import ContactPage from './pages/ContactPage/ContactPage';
import LoginPage from './pages/LoginPage/LoginPage';
import SignupPage from './pages/SignupPage/SignupPage';


const App = () => {
  return (
    <Router>
      <Routes>
        {/* User routes */}
        <Route path="/" element={<UserLayout><HomePage /></UserLayout>} />
        <Route path="/hospitals" element={<UserLayout><HospitalsPage /></UserLayout>} />
        <Route path="/blood-bank" element={<UserLayout><BloodBankPage /></UserLayout>} />
        <Route path="/doctors" element={<UserLayout><DoctorsPage /></UserLayout>} />
        <Route path="/about" element={<UserLayout><AboutPage /></UserLayout>} />
        <Route path="/contact" element={<UserLayout><ContactPage /></UserLayout>} />
        <Route path="/login" element={<UserLayout><LoginPage /></UserLayout>} />
        <Route path="/signup" element={<UserLayout><SignupPage /></UserLayout>} />

        {/* Dash routes */}
        <Route path="/dashboard" element={<DashLayout></DashLayout>} />
        
      </Routes>
    </Router>
  );
};

export default App;

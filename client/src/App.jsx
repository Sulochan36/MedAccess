
import { useAuth } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import axios from 'axios';
import UserLayout from './layouts/UserLayout';
import DashLayout from './layouts/DashLayout';


// import HomePage from './pages/Homepage/Homepage';
// import HospitalsPage from './pages/HospitalsPage/HospitalsPage';
import BloodBankPage from './pages/BloodBankPage/BloodBankPage';
// import DoctorsPage from './pages/DoctorsPage/DoctorsPage';
import AboutPage from './pages/AboutPage/AboutPage';
import ContactPage from './pages/ContactPage/ContactPage';
import LoginPage from './pages/LoginPage/LoginPage';
import SignupPage from './pages/SignupPage/SignupPage';
import HomePage from './pages/HomePage/Homepage';
import DoctorsPage from './pages/DoctorsPage/DoctorsPage';
import HospitalsPage from './pages/HospitalsPage/HospitalsPage';
// import SignUpPage from './pages/SignUpPage';
// import LoginPage from './pages/LoginPage';
// import ProfilePage from './pages/ProfilePage';


import Dashboard from './DashPages/Dashboard/Dashboard';
import DashBloodBank from './DashPages/DashBloodBank/DashBloodBank';
import DashDoctors from './DashPages/DashDoctors/DashDoctors';
import Dashbeds from './DashPages/DashBeds/Dashbeds';
import AddDoctorForm from './components/AddDoctorForm/AddDoctorForm';
import BedDetailForm from './components/BedDetailForm/BedDetailForm';
import HospitalSignUp from './pages/HospitalSignUp/HospitalSignUp';
import DoctorSignUp from './pages/DoctorSIgnUp/DoctorSignUp';
import ProfilePage from './DoctorProfilePages/ProfilePage/ProfilePage';
import BloodBankDetailPage from './pages/BloodBankDetailPage/BloodBankDetailPage';
import HospitalDetailsPage from './pages/HospitalDetailsPage/HospitalDetailsPage';
import DoctorDetailsPage from './pages/DoctorDetailsPage/DoctorDetailsPage';
import PrivateRoute from './components/PrivateRoute.jsx';

import HospitalBedsTable from './components/Beds/HospitalBedsTable.jsx';


const App = () => {

  return (
    <Router>
      {/* <Navbar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} /> */}
      <Routes>
        {/* User routes */}
        <Route path="/" element={<UserLayout><HomePage /></UserLayout>} />
        <Route path="/hospitals" element={<UserLayout><HospitalsPage /></UserLayout>} />
        <Route path="/hospitals/:id" element={<UserLayout><HospitalDetailsPage /></UserLayout>} />
        <Route path="/blood-bank" element={<UserLayout><BloodBankPage /></UserLayout>} />
        <Route path="/beds" element={<UserLayout><HospitalBedsTable /></UserLayout>} />
        <Route path="/blood-bank/:bloodGroup" element={<UserLayout><BloodBankDetailPage /></UserLayout>} />
        <Route path="/doctors" element={<UserLayout><DoctorsPage /></UserLayout>} />
        <Route path="/doctors/:id" element={<UserLayout><DoctorDetailsPage /></UserLayout>} />
        <Route path="/about" element={<UserLayout><AboutPage /></UserLayout>} />
        <Route path="/contact" element={<UserLayout><ContactPage /></UserLayout>} />
        <Route path="/login" element={<UserLayout><LoginPage /></UserLayout>} />
        <Route path="/signup" element={<UserLayout><SignupPage /></UserLayout>} />
        <Route path="/signup/hospitalsignup" element={<UserLayout><HospitalSignUp /></UserLayout>} />
        <Route path="/signup/doctorsignup" element={<UserLayout><DoctorSignUp /></UserLayout>} />






        {/* Private Routes */}
        <Route
          path="/profile"
          element={<ProfilePage />}
        />


        {/* Dash routes */}
        <Route path="/dashboard" element={<PrivateRoute><DashLayout><Dashboard /></DashLayout></PrivateRoute>} />
        <Route path="/dashboard/bloodbank" element={<PrivateRoute><DashLayout><DashBloodBank /></DashLayout></PrivateRoute>} />
        <Route path="/dashboard/doctors" element={<PrivateRoute><DashLayout><DashDoctors /></DashLayout></PrivateRoute>} />
        <Route path="/dashboard/beds" element={<PrivateRoute><DashLayout><Dashbeds /></DashLayout></PrivateRoute>} />
        <Route path="/dashboard/doctors/adddoctorform" element={<PrivateRoute><DashLayout><AddDoctorForm /></DashLayout></PrivateRoute>} />
        <Route path="/dashboard/doctors/bedetailsform" element={<PrivateRoute><DashLayout><BedDetailForm /></DashLayout></PrivateRoute>} />

      </Routes>
    </Router>
  );
};

// // PrivateRoute for Protected Routes
// const PrivateRoute = ({ children }) => {
//   const { isLoggedIn } = useAuth();
//   return isLoggedIn ? children : <Navigate to="/login" replace />;
// };

export default App;

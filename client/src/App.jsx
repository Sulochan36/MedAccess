
import { useState, useEffect} from 'react';
import { BrowserRouter as Router, Routes, Route,Navigate } from 'react-router-dom';

import axios from 'axios';
import UserLayout from './layouts/UserLayout';
import DashLayout from './layouts/DashLayout';

import Navbar from './components/Navbar';
// import HomePage from './pages/Homepage/Homepage';
// import HospitalsPage from './pages/HospitalsPage/HospitalsPage';
import BloodBankPage from './pages/BloodBankPage/BloodBankPage';
// import DoctorsPage from './pages/DoctorsPage/DoctorsPage';
import AboutPage from './pages/AboutPage/AboutPage';
import ContactPage from './pages/ContactPage/ContactPage';
// import LoginPage from './pages/LoginPage/LoginPage';
// import SignupPage from './pages/SignupPage/SignupPage';
import HomePage from './pages/HomePage/Homepage';
import DoctorsPage from './pages/DoctorsPage';
import HospitalsPage from './pages/HospitalsPage';
import SignUpPage from './pages/SignUpPage';
import LoginPage from './pages/LoginPage';
import ProfilePage from './pages/ProfilePage';
import DoctorDetailsPage from './pages/DoctorDetailsPage';
import HospitalDetailsPage from './pages/HospitalDetailsPage';


const App = () => {
  const [user, setUser] = useState(null); // Store the user data
  const [loading, setLoading] = useState(true); // Track loading state
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Track login status

  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        setIsLoggedIn(false);
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get('http://localhost:5000/api/users/profile', {
          headers: { Authorization: `Bearer ${token}`},
        });
        setUser(response.data);
        setIsLoggedIn(true);
      } catch (error) {
        console.error('Error fetching user data:', error.response?.data || error.message);
        if (error.response?.status === 400 || error.response?.status === 401) {
          alert('Session expired. Please log in again.');
          localStorage.removeItem('token');
        }
        setIsLoggedIn(false);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }
  return (
    <Router>
      <Navbar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
      <Routes>
        {/* User routes */}
        <Route path="/" element={<UserLayout><HomePage /></UserLayout>} />
        <Route path="/hospitals" element={<UserLayout><HospitalsPage /></UserLayout>} />
        <Route path="/blood-bank" element={<UserLayout><BloodBankPage /></UserLayout>} />
        <Route path="/doctors" element={<UserLayout><DoctorsPage /></UserLayout>} />
        <Route path="/about" element={<UserLayout><AboutPage /></UserLayout>} />
        <Route path="/contact" element={<UserLayout><ContactPage /></UserLayout>} />
        <Route path="/login" element={<UserLayout><LoginPage setIsLoggedIn={setIsLoggedIn} /></UserLayout>} />
        <Route path="/signup" element={<UserLayout><SignUpPage /></UserLayout>} />

        {/* Dash routes */}
        <Route path="/dashboard" element={<DashLayout></DashLayout>} />
        <Route
          path="/profile"
          element={
            isLoggedIn ? (
              <ProfilePage user={user} setIsLoggedIn={setIsLoggedIn} />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />
        <Route path="/doctors/:id" element={<DoctorDetailsPage />} />
        <Route path="/hospitals/:id" element={<HospitalDetailsPage />} />
        
      </Routes>
    </Router>
  );
};

export default App;

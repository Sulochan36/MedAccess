import React from 'react';
import Footer from '../components/Footer/Footer';
import './layout.css';
import Navbar from '../components/Navbar/NavBar';
import { useAuth } from '../context/authContext';
import DashNav from '../components/DashNav/DashNav';

const UserLayout = ({ children }) => {
    const { isLoggedIn } = useAuth();  // Get login state from context

    return (
        <div className="layout-container">
            {/* Show Navbar only if not logged in */}
            {!isLoggedIn ? <Navbar /> : <DashNav />}

            <main className="layout-content">{children}</main>
            <Footer />
        </div>
    );
};

export default UserLayout;

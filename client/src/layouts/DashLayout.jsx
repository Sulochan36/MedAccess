import React from 'react';
import './layout.css';
import Sidebar from '../components/Sidebar/Sidebar';
import Footer from '../components/Footer/Footer';
import DashNav from '../components/DashNav/DashNav';
import { useAuth } from '../context/authContext';
import Navbar from '../components/Navbar/NavBar';

const DashLayout = ({ children }) => {
    const { isLoggedIn } = useAuth();  // Get login state from context

    return (
        <div className="layout-container dashboard-layout">
            {/* Show DashNav only if logged in */}
            {isLoggedIn ? <DashNav /> : null}

            <div className="content-wrapper">
                <Sidebar />
                <main className="layout-content">{children}</main>
            </div>
            <Footer />
        </div>
    );
};

export default DashLayout;

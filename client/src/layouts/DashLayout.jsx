// DashLayout.jsx
import React from 'react';
import './layout.css';
// import Navbar from '../components/Navbar/NavBar';
import Sidebar from '../components/Sidebar/Sidebar';
import Footer from '../components/Footer/Footer';
import DashNav from '../components/DashNav/DashNav';


const DashLayout = ({ children }) => {
    return (
        <div className="layout-container dashboard-layout">
            <DashNav />

            <div className="content-wrapper">
                <Sidebar />
                <main className="layout-content">
                    {children}
                </main>

            </div>
            <Footer />
        </div>
    );
};

export default DashLayout;

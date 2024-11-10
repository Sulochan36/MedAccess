// layouts/AdminLayout.jsx
import React from 'react';
import './layout.css'; 
import Footer from '../components/Footer/Footer';

const DashLayout = ({ children }) => {
    return (
        <div className="layout-container">
            <Sidebar />
            <main className="layout-content">{children}</main>
            <Footer />
        </div>
    );
};

export default DashLayout;

// layouts/PublicLayout.jsx
import React from 'react';
import Navbar from '../components/NavBar/NavBar';
import Footer from '../components/Footer/Footer';
import './layout.css';  

const UserLayout = ({ children }) => {
    return (
        <div className="layout-container">
            <Navbar />
            <main className="layout-content">{children}</main>
            <Footer />
        </div>
    );
};

export default UserLayout;

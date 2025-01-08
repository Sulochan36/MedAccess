import React, { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import './DashNav.css';

const DashNav = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false); // State to toggle menu
    const navigate = useNavigate();

    // Handle the logout
    const handleLogout = () => {
        // Remove the token from localStorage (or sessionStorage)
        localStorage.removeItem('token');

        // Redirect to the login page
        navigate('/login');
    };

    const toggleMenu = () => {
        setIsMenuOpen((prevState) => !prevState);
    };

    return (
        <nav className="navbar">
            <div className="navbar-container">
                <div className="logo">
                    <a href="/">MedAccess</a>
                </div>

                <div className="hamburger-menu" onClick={toggleMenu}>
                    <span></span>
                    <span></span>
                    <span></span>
                </div>

                <ul className={`nav-links ${isMenuOpen ? 'active' : ''}`}>
                    <li>
                        <NavLink to="/" end className={({ isActive }) => (isActive ? 'active-link' : '')}>Home</NavLink>
                    </li>
                    <li>
                        <NavLink to="/hospitals" className={({ isActive }) => (isActive ? 'active-link' : '')}>Hospitals</NavLink>
                    </li>
                    <li>
                        <NavLink to="/blood-bank" className={({ isActive }) => (isActive ? 'active-link' : '')}>Blood Bank</NavLink>
                    </li>
                    <li>
                        <NavLink to="/doctors" className={({ isActive }) => (isActive ? 'active-link' : '')}>Doctors</NavLink>
                    </li>
                    <li>
                        <NavLink to="/about" className={({ isActive }) => (isActive ? 'active-link' : '')}>About</NavLink>
                    </li>
                    <li>
                        <NavLink to="/contact" className={({ isActive }) => (isActive ? 'active-link' : '')}>Contact Us</NavLink>
                    </li>
                </ul>

                <div className="auth-buttons">
                    {/* Logout button triggers handleLogout */}
                    <button onClick={handleLogout} className="logout-btn">
                        Logout
                    </button>
                </div>
            </div>
        </nav>
    );
};

export default DashNav;

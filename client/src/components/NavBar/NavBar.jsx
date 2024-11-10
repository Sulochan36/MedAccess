// src/components/Navbar/Navbar.jsx
import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="logo">
          <a href="/">MedAccess</a>
        </div>
        <ul className="nav-links">
          <li><NavLink to="/" end className={({ isActive }) => (isActive ? 'active-link' : '')}>Home</NavLink></li>
          <li><NavLink to="/hospitals" className={({ isActive }) => (isActive ? 'active-link' : '')}>Hospitals</NavLink></li>
          <li><NavLink to="/blood-bank" className={({ isActive }) => (isActive ? 'active-link' : '')}>Blood Bank</NavLink></li>
          <li><NavLink to="/doctors" className={({ isActive }) => (isActive ? 'active-link' : '')}>Doctors</NavLink></li>
          <li><NavLink to="/about" className={({ isActive }) => (isActive ? 'active-link' : '')}>About</NavLink></li>
          <li><NavLink to="/contact" className={({ isActive }) => (isActive ? 'active-link' : '')}>Contact Us</NavLink></li>
        </ul>

        <div className="auth-buttons">
          <NavLink to="/login">
            <button className="login-btn">Login</button>
          </NavLink>


          <NavLink to="/signup">
            <button className="signup-btn">Signup</button>
          </NavLink>

        </div>
      </div>
    </nav>
  );
};

export default Navbar;

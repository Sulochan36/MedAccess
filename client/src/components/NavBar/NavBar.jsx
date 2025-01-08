import React, { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false); // State to toggle menu
  const navigate = useNavigate();



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


          <Link to="/login" className="login-btn">Login</Link>
          <Link to="/signup" className="signup-btn">Sign Up</Link>


        </div>
      </div>
    </nav>
  );
};

export default Navbar;

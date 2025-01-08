// Sidebar.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaBars, FaBed, FaHome, FaMailBulk } from 'react-icons/fa';
import { MdBloodtype } from "react-icons/md";
import { FaUserDoctor } from "react-icons/fa6";
import { IoMdSettings } from "react-icons/io";
import './Sidebar.css';

const Sidebar = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    };

    return (
        <>
            {/* Sidebar */}
            <div className={`sidebar ${isOpen ? 'open' : ''}`}>
                <h2 className="sidebar-title">Health Dashboard</h2>
                <Link to="/dashboard" className="sidebar-link"><FaHome className="sidebar-icon" />Dashboard</Link>
                <Link to="/dashboard/bloodbank" className="sidebar-link"><MdBloodtype className="sidebar-icon" />Blood Bank</Link>
                <Link to="/dashboard/doctors" className="sidebar-link"><FaUserDoctor className="sidebar-icon" />Manage Doctors</Link>
                <Link to="/dashboard/beds" className="sidebar-link"><FaBed className="sidebar-icon" />Beds</Link>
                <Link to="/inbox" className="sidebar-link"><FaMailBulk className="sidebar-icon" />Inbox</Link>
                <Link to="/settings" className="sidebar-link"><IoMdSettings className="sidebar-icon" />Settings</Link>
            </div>

            {/* Hamburger Menu (Mobile) */}
            <button className="toggle-button" onClick={toggleSidebar}>
                <FaBars />
            </button>
        </>
    );
};

export default Sidebar;

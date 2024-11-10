// src/components/Footer/Footer.jsx
import React from 'react';
import './Footer.css'; // Import the CSS file for styling

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-container">
                <div className="footer-links">
                    <ul>
                        <li><a href="/about">About</a></li>
                        <li><a href="/services">Services</a></li>
                        <li><a href="/contact">Contact</a></li>
                        <li><a href="/privacy-policy">Privacy Policy</a></li>
                    </ul>
                </div>
                <div className="footer-social">
                    <a href="#" className="social-icon">Facebook</a>
                    <a href="#" className="social-icon">Twitter</a>
                    <a href="#" className="social-icon">Instagram</a>
                </div>
                <p className="footer-copy">© 2024 MedAccess. All rights reserved.</p>
            </div>
        </footer>
    );
};

export default Footer;

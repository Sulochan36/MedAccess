import React from 'react';
import './Footer.css';
import { Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';

const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="footer">
            <div className="footer-content">
                <div className="footer-left">
                    <h2 className="footer-logo">MedAccess</h2>
                    <div className="footer-social">
                        <a href="#" className="social-btn" aria-label="Facebook">
                            <Facebook size={20}/>
                            <span className="tooltip">Follow on Facebook</span>
                        </a>
                        <a href="#" className="social-btn" aria-label="Twitter">
                            <Twitter size={20}/>
                            <span className="tooltip">Follow on Twitter</span>
                        </a>
                        <a href="#" className="social-btn" aria-label="Instagram">
                            <Instagram size={20}/>
                            <span className="tooltip">Follow on Instagram</span>
                        </a>
                        <a href="#" className="social-btn" aria-label="LinkedIn">
                            <Linkedin size={20}/>
                            <span className="tooltip">Connect on LinkedIn</span>
                        </a>
                        {/* <a href="#" className="social-btn" aria-label="YouTube">
                            <i className="fab fa-youtube"></i>
                            <span className="tooltip">Subscribe on YouTube</span>
                        </a> */}
                    </div>
                </div>

                <div className="footer-nav">
                    <nav>
                        <a href="/about" className="nav-link">About</a>
                        <a href="/" className="nav-link">Services</a>
                        <a href="/contact" className="nav-link">Contact</a>
                        <a href="/" className="nav-link">Privacy</a>
                    </nav>
                </div>

                <div className="footer-right">
                    <button className="contact-btn">
                    <a href="/contact"><span>Contact Us</span></a>

                        <i className="fas fa-arrow-right"></i>
                    </button>
                </div>
            </div>

            <div className="footer-bottom">
                <div className="copyright">
                    <p className='allrights'>© {currentYear} MedAccess. All Rights Reserved.</p>
                </div>
                <div className="footer-info">
                    <a href="/terms">Terms & Conditions</a>
                    <span className="separator">|</span>
                    <a href="/privacy">Privacy Policy</a>
                    <span className="separator">|</span>
                    <a href="/cookies">Cookie Policy</a>
                </div>
            </div>
        </footer>
    );
};

export default Footer;

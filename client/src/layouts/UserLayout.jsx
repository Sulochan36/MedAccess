// layouts/PublicLayout.jsx
import React, { useEffect, useState } from 'react';
import Footer from '../components/Footer/Footer';
import './layout.css';
import Navbar from '../components/Navbar/NavBar';
import axios from 'axios';
import Carousel from '../components/Carousal/Carousal';

const UserLayout = ({ children }) => {

    const [user, setUser] = useState(null); // Store the user data
    const [loading, setLoading] = useState(true); // Track loading state
    const [isLoggedIn, setIsLoggedIn] = useState(false); // Track login status

    useEffect(() => {
        const fetchUserData = async () => {
            const token = localStorage.getItem('token');
            if (!token) {
                setIsLoggedIn(false);
                setLoading(false);
                return;
            }

            try {
                const response = await axios.get('http://localhost:5000/api/users/profile', {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setUser(response.data);
                setIsLoggedIn(true);
            } catch (error) {
                console.error('Error fetching user data:', error.response?.data || error.message);
                if (error.response?.status === 400 || error.response?.status === 401) {
                    alert('Session expired. Please log in again.');
                    localStorage.removeItem('token');
                }
                setIsLoggedIn(false);
            } finally {
                setLoading(false);
            }
        };

        fetchUserData();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }


    return (
        <div className="layout-container">
            
            <Navbar />
            <main className="layout-content">{children}</main>
            <Footer />
        </div>
    );
};

export default UserLayout;

// ProfilePage.jsx (or wherever you need to fetch the user data)
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ProfilePage = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserProfile = async () => {
      const token = localStorage.getItem('token'); // Assuming the token is saved in localStorage

      try {
        const response = await axios.get('http://localhost:5000/api/auth/profile', {
          headers: {
            Authorization: `Bearer ${token}`, // Send the token in the Authorization header
          },
        });
        setUserData(response.data);
      } catch (err) {
        setError('Failed to fetch user data');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <h1>{userData ? `Profile of ${userData.fullName}` : 'Profile Not Found'}</h1>
      <p>Email: {userData?.email}</p>
      <img src={userData?.profilePhoto || '/default-profile-photo.png'} alt="Profile" />
      {/* Render additional profile information here */}
    </div>
  );
};

export default ProfilePage;

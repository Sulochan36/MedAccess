import { useState, useEffect } from 'react';
import axios from 'axios';

const ProfilePage = ({ user, setIsLoggedIn }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    bio: '',
    specialization: '',
    experience: '',
    education: '',
    address: '',
    emergencyAvailable: '',
    departments: '',
    numberOfBeds: '',
    openHours: '',
    rating: '',
    bloodBankAvailable: '',
  });

  useEffect(() => {
    setFormData({
      name: user?.name || '',
      email: user?.email || '',
      bio: user?.bio || '',
      specialization: user?.specialization || '',
      experience: user?.experience || '',
      education: user?.education || '',
      address: user?.address || '',
      emergencyAvailable: user?.emergencyAvailable || '',
      departments: user?.departments || '',
      numberOfBeds: user?.numberOfBeds || '',
      openHours: user?.openHours || '',
      rating: user?.rating || '',
      bloodBankAvailable: user?.bloodBankAvailable || '',
    });
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      await axios.put('http://localhost:5000/api/users/profile', formData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert('Profile updated successfully!');
    } catch (error) {
      console.error('Error updating profile:', error.response?.data || error.message);
      alert('Error updating profile. Please try again.');
    }
  };

  const renderDoctorFields = () => (
    <>
      <input
        name="specialization"
        type="text"
        value={formData.specialization}
        onChange={handleChange}
        placeholder="Specialization"
      />
      <input
        name="experience"
        type="text"
        value={formData.experience}
        onChange={handleChange}
        placeholder="Experience"
      />
      <input
        name="education"
        type="text"
        value={formData.education}
        onChange={handleChange}
        placeholder="Education"
      />
    </>
  );

  const renderHospitalFields = () => (
    <>
      <input
        name="address"
        type="text"
        value={formData.address}
        onChange={handleChange}
        placeholder="Address"
      />
      <select
        name="emergencyAvailable"
        value={formData.emergencyAvailable}
        onChange={handleChange}
      >
        <option value="">Emergency Available?</option>
        <option value="Yes">Yes</option>
        <option value="No">No</option>
      </select>
      <input
        name="departments"
        type="text"
        value={formData.departments}
        onChange={handleChange}
        placeholder="Departments"
      />
      <input
        name="numberOfBeds"
        type="text"
        value={formData.numberOfBeds}
        onChange={handleChange}
        placeholder="Number of Beds"
      />
      <input
        name="openHours"
        type="text"
        value={formData.openHours}
        onChange={handleChange}
        placeholder="Open Hours"
      />
      <input
        name="rating"
        type="text"
        value={formData.rating}
        onChange={handleChange}
        placeholder="Rating"
      />
      <select
        name="bloodBankAvailable"
        value={formData.bloodBankAvailable}
        onChange={handleChange}
      >
        <option value="">Blood Bank Available?</option>
        <option value="Yes">Yes</option>
        <option value="No">No</option>
      </select>
    </>
  );

  return (
    <div>
      <h1>Update Profile</h1>
      <form onSubmit={handleSubmit}>
        <input
          name="name"
          type="text"
          value={formData.name}
          onChange={handleChange}
          placeholder="Name"
          required
        />
        <input
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Email"
          required
        />
        <textarea
          name="bio"
          value={formData.bio}
          onChange={handleChange}
          placeholder="Bio"
        />
        {user?.role === 'doctor' && renderDoctorFields()}
        {user?.role === 'hospital' && renderHospitalFields()}
        <button type="submit">Update Profile</button>
      </form>
    </div>
  );
};

export default ProfilePage;
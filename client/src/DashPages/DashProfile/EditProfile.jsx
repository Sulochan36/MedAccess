import React, { useState, useEffect } from 'react';
import { AlertCircle, Mail, Phone, MapPin, Globe, Upload } from 'lucide-react';
import './EditProfile.css';

const EditProfile = () => {
    const [formData, setFormData] = useState({
        hospitalName: '',
        email: '',
        contact: '',
        streetAddress: '',
        city: '',
        zipCode: '',
        registrationNumber: '',
        state: '',
        about: '',
        profilePhoto: null,
        websiteUrl: '',
    });

    const [userId, setUserId] = useState(null);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [imagePreview, setImagePreview] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            // Decode the JWT token to extract userId
            const payload = token.split('.')[1]; // Extract the payload (middle part)
            const decodedPayload = JSON.parse(atob(payload)); // Decode from base64
            setUserId(decodedPayload.userId); // Set userId from decoded token
            console.log('Decoded User ID:', decodedPayload.userId);
        } else {
            setError('Token not found in localStorage');
        }
    }, []); // Run once on component mount

    useEffect(() => {
        if (!userId) return; // Don't fetch data if userId is not available

        // Fetch hospital profile data when the component mounts
        const fetchHospitalData = async () => {
            try {
                const response = await fetch(`http://localhost:5000/api/auth/profile`, {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`,
                    },
                });
                const data = await response.json();
                if (response.ok) {
                    setFormData({
                        hospitalName: data.fullName || '',
                        email: data.email || '',
                        contact: data.contact || '',
                        streetAddress: data.address?.street || '',
                        city: data.address?.city || '',
                        zipCode: data.address?.zipCode || '',
                        registrationNumber: data.registrationNumber || '',
                        state: data.address?.state || '',
                        about: data.about || '',
                        profilePhoto: data.profilePhoto || null,
                        websiteUrl: data.websiteUrl || '',
                    });
                    setImagePreview(data.profilePhoto);  // Display current profile photo if available
                } else {
                    setError(data.message || 'Failed to fetch data');
                }
            } catch (error) {
                setError('Error fetching hospital data');
            } finally {
                setIsLoading(false);
            }
        };

        fetchHospitalData();
    }, [userId]);

    // Handle form input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();

        reader.onloadend = () => {
            // Ensure base64 string is set correctly
            setFormData({
                ...formData,
                profilePhoto: reader.result,  // Base64 encoded image data
            });

            setImagePreview(reader.result);  // Optional: Set preview if needed
        };

        if (file) reader.readAsDataURL(file);  // This converts the file into base64
    };


    const handleSubmit = async (e) => {
        e.preventDefault();

        const updatedData = { ...formData };

        // If no new profile photo is selected, remove it from the updated data
        if (!formData.profilePhoto) {
            delete updatedData.profilePhoto;
        }

        try {
            const response = await fetch(`http://localhost:5000/api/auth/hospitals/${userId}`, {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedData),
            });

            const data = await response.json();
            if (response.ok) {
                alert('Profile updated successfully!');
            } else {
                setError(data.message || 'Error updating profile');
            }
        } catch (error) {
            setError('An error occurred while updating the profile');
        }
    };



    if (isLoading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="edit-profile-container">
            <h2>Edit Profile</h2>
            {error && <div className="error">{error}</div>}
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="hospitalName">Hospital Name</label>
                    <input
                        type="text"
                        id="hospitalName"
                        name="hospitalName"
                        value={formData.hospitalName}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="contact">Contact</label>
                    <input
                        type="text"
                        id="contact"
                        name="contact"
                        value={formData.contact}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="address">Address</label>
                    <input
                        type="text"
                        id="streetAddress"
                        name="streetAddress"
                        value={formData.streetAddress}
                        onChange={handleChange}
                        placeholder="Street"
                    />
                    <input
                        type="text"
                        id="city"
                        name="city"
                        value={formData.city}
                        onChange={handleChange}
                        placeholder="City"
                    />
                    <input
                        type="text"
                        id="state"
                        name="state"
                        value={formData.state}
                        onChange={handleChange}
                        placeholder="State"
                    />
                    <input
                        type="text"
                        id="zipCode"
                        name="zipCode"
                        value={formData.zipCode}
                        onChange={handleChange}
                        placeholder="Zip Code"
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="about">About</label>
                    <textarea
                        id="about"
                        name="about"
                        value={formData.about}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="websiteUrl">Website URL</label>
                    <input
                        type="url"
                        id="websiteUrl"
                        name="websiteUrl"
                        value={formData.websiteUrl}
                        onChange={handleChange}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="profilePhoto">Profile Photo</label>
                    <input
                        type="file"
                        id="profilePhoto"
                        name="profilePhoto"
                        onChange={handleFileChange}
                    />
                    {imagePreview && <img src={imagePreview} alt="Profile Preview" className="image-preview" />}
                </div>

                <button type="submit" className="submit-btn">
                    Save Changes
                </button>
            </form>
        </div>
    );
};

export default EditProfile;

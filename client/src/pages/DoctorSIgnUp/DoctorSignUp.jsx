import React, { useState } from 'react';
import './DoctorSignUp.css';

const DoctorSignUp = () => {
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        password: '',
        confirmPassword: '',
        licenseNumber: '',
        clinicName: '',
        streetAddress: '',
        city: '',
        state: '',
        zipCode: '',
        specialization: '',
        experience: '',
        daysAvailable: '',
        clinicTimings: '',
        aboutYourself: '',
        profilePhoto: null,
        websiteUrl: '',
    });

    const [error, setError] = useState(null); // To handle errors
    const [isLoading, setIsLoading] = useState(false); // To show loading state

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value,
        }));
    };

    const handleFileChange = (event) => {
        setFormData((prevFormData) => ({
            ...prevFormData,
            profilePhoto: event.target.files[0],
        }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        // Check if passwords match
        if (formData.password !== formData.confirmPassword) {
            alert("Passwords do not match!");
            return;
        }


        // Prepare the clinicAddress object
        const clinicAddress = {
            zipCode: formData.zipCode,
            state: formData.state,
            city: formData.city,
            street: formData.streetAddress,
        };

        // Prepare form data for API request
        const doctorFormData = new FormData();

        // Append all non-address fields to FormData
        for (let key in formData) {
            if (key !== 'zipCode' && key !== 'state' && key !== 'city' && key !== 'streetAddress'){
                doctorFormData.append(key, formData[key]);
            }
            
        }

        // Append the address object to FormData (stringified)
        doctorFormData.append('clinicAddress', JSON.stringify(clinicAddress));

        // Log FormData content to verify its structure
        for (let pair of doctorFormData.entries()) {
            console.log(pair[0], pair[1]);
        }

        try {
            setIsLoading(true);
            const response = await fetch('http://localhost:5000/api/auth/doctor/register', {
                method: 'POST',
                body: doctorFormData,
            });

            const result = await response.json();
            if (response.ok) {
                alert('Registration successful');
                // Redirect to login or dashboard if needed
            } else {
                setError(result.message || 'Registration failed');
            }
        } catch (error) {
            setError('Something went wrong. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="doctor-signup-form">
            <h2 className="form-title">Doctor Registration Form</h2>

            {error && <p className="error">{error}</p>}

            <div className="form-group">
                <label htmlFor="fullName" className="form-label">Full Name:</label>
                <input
                    type="text"
                    id="fullName"
                    name="fullName"
                    className="form-input"
                    value={formData.fullName}
                    onChange={handleChange}
                    required
                />
            </div>

            <div className="form-group">
                <label htmlFor="email" className="form-label">Email Address:</label>
                <input
                    type="email"
                    id="email"
                    name="email"
                    className="form-input"
                    value={formData.email}
                    onChange={handleChange}
                    required
                />
            </div>

            <div className="form-group">
                <label htmlFor="password" className="form-label">Password:</label>
                <input
                    type="password"
                    id="password"
                    name="password"
                    className="form-input"
                    value={formData.password}
                    onChange={handleChange}
                    required
                />
            </div>

            <div className="form-group">
                <label htmlFor="confirmPassword" className="form-label">Confirm Password:</label>
                <input
                    type="password"
                    id="confirmPassword"
                    name="confirmPassword"
                    className="form-input"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    required
                />
            </div>

            <div className="form-group">
                <label htmlFor="licenseNumber" className="form-label">License Number:</label>
                <input
                    type="text"
                    id="licenseNumber"
                    name="licenseNumber"
                    className="form-input"
                    value={formData.licenseNumber}
                    onChange={handleChange}
                    required
                />
            </div>

            <div className="form-group">
                <label htmlFor="clinicName" className="form-label">Clinic Name:</label>
                <input
                    type="text"
                    id="clinicName"
                    name="clinicName"
                    className="form-input"
                    value={formData.clinicName}
                    onChange={handleChange}
                    required
                />
            </div>

            <div className="form-group">
                <label htmlFor="streetAddress" className="form-label">Street Address:</label>
                <input
                    type="text"
                    id="streetAddress"
                    name="streetAddress"
                    className="form-input"
                    value={formData.streetAddress}
                    onChange={handleChange}
                    required
                />
            </div>

            <div className="form-group">
                <label htmlFor="city" className="form-label">City:</label>
                <input
                    type="text"
                    id="city"
                    name="city"
                    className="form-input"
                    value={formData.city}
                    onChange={handleChange}
                    required
                />
            </div>

            <div className="form-group">
                <label htmlFor="state" className="form-label">State:</label>
                <input
                    type="text"
                    id="state"
                    name="state"
                    className="form-input"
                    value={formData.state}
                    onChange={handleChange}
                    required
                />
            </div>

            <div className="form-group">
                <label htmlFor="zipCode" className="form-label">Zip Code:</label>
                <input
                    type="text"
                    id="zipCode"
                    name="zipCode"
                    className="form-input"
                    value={formData.zipCode}
                    onChange={handleChange}
                    required
                />
            </div>

            <div className="form-group">
                <label htmlFor="specialization" className="form-label">Specialization:</label>
                <input
                    type="text"
                    id="specialization"
                    name="specialization"
                    className="form-input"
                    value={formData.specialization}
                    onChange={handleChange}
                    required
                />
            </div>

            <div className="form-group">
                <label htmlFor="experience" className="form-label">Years of Experience:</label>
                <input
                    type="number"
                    id="experience"
                    name="experience"
                    className="form-input"
                    value={formData.experience}
                    onChange={handleChange}
                    required
                />
            </div>

            <div className="form-group">
                <label htmlFor="daysAvailable" className="form-label">Days Available:</label>
                <input
                    type="text"
                    id="daysAvailable"
                    name="daysAvailable"
                    className="form-input"
                    value={formData.daysAvailable}
                    onChange={handleChange}
                    required
                />
            </div>

            <div className="form-group">
                <label htmlFor="clinicTimings" className="form-label">Clinic Timings:</label>
                <input
                    type="text"
                    id="clinicTimings"
                    name="clinicTimings"
                    className="form-input"
                    value={formData.clinicTimings}
                    onChange={handleChange}
                    required
                />
            </div>

            <div className="form-group">
                <label htmlFor="aboutYourself" className="form-label">About Yourself:</label>
                <textarea
                    id="aboutYourself"
                    name="aboutYourself"
                    className="form-textarea"
                    value={formData.aboutYourself}
                    onChange={handleChange}
                    required
                />
            </div>

            <div className="form-group">
                <label htmlFor="profilePhoto" className="form-label">Profile Photo:</label>
                <input
                    type="file"
                    id="profilePhoto"
                    name="profilePhoto"
                    className="form-input"
                    onChange={handleFileChange}
                    required
                />
            </div>

            <div className="form-group">
                <label htmlFor="websiteUrl" className="form-label">Website URL:</label>
                <input
                    type="url"
                    id="websiteUrl"
                    name="websiteUrl"
                    className="form-input"
                    value={formData.websiteUrl}
                    onChange={handleChange}
                />
            </div>

            <button type="submit" className="submit-btn" disabled={isLoading}>
                {isLoading ? 'Registering...' : 'Register'}
            </button>
        </form>
    );
};

export default DoctorSignUp;

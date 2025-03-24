import React, { useState } from 'react';
import { AlertCircle, Hospital, Mail, Phone, MapPin, Globe, Upload } from 'lucide-react';
import './HospitalSignUp.css';

const HospitalSignUp = () => {
    const [formData, setFormData] = useState({
        hospitalName: '',
        email: '',
        password: '',
        confirmPassword: '',
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

    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [step, setStep] = useState(1);
    const [imagePreview, setImagePreview] = useState(null);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData(prev => ({
            ...prev,
            [name]: value,
        }));
    };

    // const handleFileChange = (event) => {
    //     const file = event.target.files[0];
    //     if (file) {
    //         setFormData(prev => ({
    //             ...prev,
    //             profilePhoto: file,
    //         }));
    //         const reader = new FileReader();
    //         reader.onloadend = () => {
    //             setImagePreview(reader.result);
    //         };
    //         reader.readAsDataURL(file);
    //     }
    // };

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setFormData(prev => ({
                    ...prev,
                    profilePhoto: reader.result,  // Store the Base64 encoded string
                }));
                setImagePreview(reader.result);  // Preview the image
            };
            reader.readAsDataURL(file);  // Convert to Base64
        }
    };


    const handleSubmit = async (event) => {
        event.preventDefault();
        if (step < 3) {
            setStep(step + 1);
            return;
        }

        if (formData.password !== formData.confirmPassword) {
            setError("Passwords do not match!");
            return;
        }

        const address = {
            zipCode: formData.zipCode,
            state: formData.state,
            city: formData.city,
            street: formData.streetAddress,
        };

        const hospitalFormData = {
            hospitalName: formData.hospitalName,
            email: formData.email,
            password: formData.password,
            confirmPassword: formData.confirmPassword,
            contact: formData.contact,
            address: JSON.stringify(address),
            registrationNumber: formData.registrationNumber,
            about: formData.about,
            websiteUrl: formData.websiteUrl,
            profilePhoto: formData.profilePhoto,  // Send Base64 encoded image here
        };

        try {
            setIsLoading(true);
            const response = await fetch('http://localhost:5000/api/auth/hospital/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',  // Set the content type to JSON
                },
                body: JSON.stringify(hospitalFormData),
            });

            const result = await response.json();
            if (response.ok) {
                alert('Registration successful');
            } else {
                setError(result.message || 'Registration failed');
            }
        } catch (error) {
            setError('Something went wrong. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    const renderStepIndicator = () => (
        <div className="step-indicator">
            {[1, 2, 3].map(num => (
                <div
                    key={num}
                    className={`step ${step >= num ? 'active' : ''} ${step === num ? 'current' : ''}`}
                >
                    <span className="step-number">{num}</span>
                    <span className="step-label">
                        {num === 1 ? 'Basic Info' : num === 2 ? 'Location' : 'Details'}
                    </span>
                </div>
            ))}
        </div>
    );

    const renderFormStep = () => {
        switch (step) {
            case 1:
                return (
                    <div className="form-step">
                        <div className="form-row">
                            <div className="form-group">
                                <label htmlFor="hospitalName" className="form-label">
                                    <Hospital className="icon" size={18} />
                                    Hospital Name
                                </label>
                                <input
                                    type="text"
                                    id="hospitalName"
                                    name="hospitalName"
                                    className="form-input"
                                    value={formData.hospitalName}
                                    onChange={handleChange}
                                    required
                                    placeholder="Enter hospital name"
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="email" className="form-label">
                                    <Mail className="icon" size={18} />
                                    Email ID
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    className="form-input"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                    placeholder="Enter email address"
                                />
                            </div>
                        </div>

                        <div className="form-row">
                            <div className="form-group">
                                <label htmlFor="password" className="form-label">Password</label>
                                <input
                                    type="password"
                                    id="password"
                                    name="password"
                                    className="form-input"
                                    value={formData.password}
                                    onChange={handleChange}
                                    required
                                    placeholder="Create password"
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
                                <input
                                    type="password"
                                    id="confirmPassword"
                                    name="confirmPassword"
                                    className="form-input"
                                    value={formData.confirmPassword}
                                    onChange={handleChange}
                                    required
                                    placeholder="Confirm password"
                                />
                            </div>
                        </div>
                    </div>
                );
            case 2:
                return (
                    <div className="form-step">
                        <div className="form-row">
                            <div className="form-group">
                                <label htmlFor="streetAddress" className="form-label">
                                    <MapPin className="icon" size={18} />
                                    Street Address
                                </label>
                                <input
                                    type="text"
                                    id="streetAddress"
                                    name="streetAddress"
                                    className="form-input"
                                    value={formData.streetAddress}
                                    onChange={handleChange}
                                    required
                                    placeholder="Enter street address"
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="city" className="form-label">City</label>
                                <input
                                    type="text"
                                    id="city"
                                    name="city"
                                    className="form-input"
                                    value={formData.city}
                                    onChange={handleChange}
                                    required
                                    placeholder="Enter city"
                                />
                            </div>
                        </div>

                        <div className="form-row">
                            <div className="form-group">
                                <label htmlFor="state" className="form-label">State</label>
                                <input
                                    type="text"
                                    id="state"
                                    name="state"
                                    className="form-input"
                                    value={formData.state}
                                    onChange={handleChange}
                                    required
                                    placeholder="Enter state"
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="zipCode" className="form-label">Zip Code</label>
                                <input
                                    type="text"
                                    id="zipCode"
                                    name="zipCode"
                                    className="form-input"
                                    value={formData.zipCode}
                                    onChange={handleChange}
                                    required
                                    placeholder="Enter zip code"
                                />
                            </div>
                        </div>
                    </div>
                );
            case 3:
                return (
                    <div className="form-step">
                        <div className="form-row">
                            <div className="form-group">
                                <label htmlFor="registrationNumber" className="form-label">Registration Number</label>
                                <input
                                    type="text"
                                    id="registrationNumber"
                                    name="registrationNumber"
                                    className="form-input"
                                    value={formData.registrationNumber}
                                    onChange={handleChange}
                                    required
                                    placeholder="Enter registration number"
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="contact" className="form-label">
                                    <Phone className="icon" size={18} />
                                    Contact Number
                                </label>
                                <input
                                    type="tel"
                                    id="contact"
                                    name="contact"
                                    className="form-input"
                                    value={formData.contact}
                                    onChange={handleChange}
                                    required
                                    placeholder="Enter contact number"
                                />
                            </div>
                        </div>

                        <div className="form-group full-width">
                            <label htmlFor="about" className="form-label">
                                About the Hospital (Please provide detailed information for the following sections):
                                <br />
                                - **About the Hospital**: Describe your hospital briefly, its mission, vision, and core values.
                                <br />
                                - **Center of Excellence**: List any specialized centers of excellence (e.g., Heart Care, Cancer Center).
                                <br />
                                - **Other Specialties**: List any additional specialties or services your hospital offers.
                                <br />
                                - **Admission Process**: Explain the steps for patient admission, including paperwork and insurance.
                                <br />
                                - **Discharge Process**: Provide information about the discharge procedure for patients.
                                <br />
                                - **Guidelines for Visitors**: List visitor rules and guidelines, including visiting hours.
                                <br />
                                - **Patient Attendant Responsibilities**: Describe the duties and responsibilities of patient attendants.
                                <br />
                                - **Facilities**: List and describe the hospital’s key facilities, such as emergency services and diagnostic equipment.
                                <br />
                                - **Visiting Hours**: Provide your hospital's visiting hours and any specific department restrictions.
                                
                            </label>
                            <textarea
                                id="about"
                                name="about"
                                className="form-textarea"
                                value={formData.about}
                                onChange={handleChange}
                                required
                                placeholder="List your departments and facilities"
                            />
                        </div>

                        <div className="form-row">
                            <div className="form-group">
                                <label htmlFor="profilePhoto" className="form-label">
                                    <Upload className="icon" size={18} />
                                    Hospital Profile Photo
                                </label>
                                <div className="file-upload-container">
                                    <input
                                        type="file"
                                        id="profilePhoto"
                                        name="profilePhoto"
                                        className="form-input file-input"
                                        onChange={handleFileChange}
                                        required
                                        accept="image/*"
                                    />
                                    {imagePreview && (
                                        <div className="image-preview">
                                            <img src={imagePreview} alt="Preview" />
                                        </div>
                                    )}
                                </div>
                            </div>
                            <div className="form-group">
                                <label htmlFor="websiteUrl" className="form-label">
                                    <Globe className="icon" size={18} />
                                    Website URL
                                </label>
                                <input
                                    type="url"
                                    id="websiteUrl"
                                    name="websiteUrl"
                                    className="form-input"
                                    value={formData.websiteUrl}
                                    onChange={handleChange}
                                    placeholder="Enter website URL (optional)"
                                />
                            </div>
                        </div>
                    </div>
                );
            default:
                return null;
        }
    };

    return (
        <div className="registration-container">
            <form onSubmit={handleSubmit} className="hospital-signup-form">
                <h2 className="form-title">Hospital Registration</h2>
                {renderStepIndicator()}

                {error && (
                    <div className="error-message">
                        <AlertCircle size={20} />
                        <span>{error}</span>
                    </div>
                )}

                {renderFormStep()}

                <div className="form-navigation">
                    {step > 1 && (
                        <button
                            type="button"
                            className="nav-btn back-btn"
                            onClick={() => setStep(step - 1)}
                        >
                            Previous
                        </button>
                    )}
                    <button
                        type="submit"
                        className="nav-btn next-btn"
                        disabled={isLoading}
                    >
                        {isLoading ? 'Processing...' : step === 3 ? 'Register' : 'Next'}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default HospitalSignUp;

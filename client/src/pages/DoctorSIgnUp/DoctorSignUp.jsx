



import React, { useState } from 'react';
import { Check, ChevronRight, ChevronLeft, Upload, AlertCircle } from 'lucide-react';
import "./DoctorSignUp.css";

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

    const [currentStep, setCurrentStep] = useState(1);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [previewUrl, setPreviewUrl] = useState(null);

    // Form steps configuration
    const steps = [
        { number: 1, label: 'Personal Info' },
        { number: 2, label: 'Clinic Details' },
        { number: 3, label: 'Professional Info' },
        { number: 4, label: 'Additional Details' }
    ];

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    // const handleFileChange = (event) => {
    //     const file = event.target.files[0];
    //     if (file) {
    //         setFormData(prev => ({ ...prev, profilePhoto: file }));
    //         setPreviewUrl(URL.createObjectURL(file));
    //     }
    // };

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setFormData(prev => ({
                    ...prev,
                    profilePhoto: reader.result,  // Store Base64 string
                }));
                setPreviewUrl(reader.result);  // Preview the Base64 image
            };
            reader.readAsDataURL(file);  // Convert file to Base64
        }
    };


    const handleSubmit = async (event) => {
        event.preventDefault();
        if (currentStep < 4) {
            setCurrentStep(prev => prev + 1);
            return;
        }

        if (formData.password !== formData.confirmPassword) {
            setError("Passwords do not match!");
            return;
        }

        const clinicAddress = {
            zipCode: formData.zipCode,
            state: formData.state,
            city: formData.city,
            street: formData.streetAddress,
        };

        // Prepare the data to be sent as JSON (not FormData)
        const doctorData = {
            fullName: formData.fullName,
            email: formData.email,
            password: formData.password,
            confirmPassword: formData.confirmPassword,
            licenseNumber: formData.licenseNumber,
            specialization: formData.specialization,
            experience: formData.experience,
            daysAvailable: formData.daysAvailable,
            clinicTimings: formData.clinicTimings,
            aboutYourself: formData.aboutYourself,
            websiteUrl: formData.websiteUrl,
            clinicAddress: JSON.stringify(clinicAddress),
            profilePhoto: formData.profilePhoto,  // Send Base64 encoded image here
        };

    
        try {
            setIsLoading(true);
            const response = await fetch('http://localhost:5000/api/auth/doctor/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',  // Set content type to JSON
                },
                body: JSON.stringify(doctorData),  // Send the entire object as JSON
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

    const renderFormStep = () => {
        switch(currentStep) {
            case 1:
                return (
                    <div className="form-step">
                        <div className="form-row">
                            <div className="form-group">
                                <label className="form-label">Full Name</label>
                                <input
                                    type="text"
                                    name="fullName"
                                    className="form-input"
                                    value={formData.fullName}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label className="form-label">Email Address</label>
                                <input
                                    type="email"
                                    name="email"
                                    className="form-input"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        </div>
                        <div className="form-row">
                            <div className="form-group">
                                <label className="form-label">Password</label>
                                <input
                                    type="password"
                                    name="password"
                                    className="form-input"
                                    value={formData.password}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label className="form-label">Confirm Password</label>
                                <input
                                    type="password"
                                    name="confirmPassword"
                                    className="form-input"
                                    value={formData.confirmPassword}
                                    onChange={handleChange}
                                    required
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
                                <label className="form-label">Clinic Name</label>
                                <input
                                    type="text"
                                    name="clinicName"
                                    className="form-input"
                                    value={formData.clinicName}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label className="form-label">Street Address</label>
                                <input
                                    type="text"
                                    name="streetAddress"
                                    className="form-input"
                                    value={formData.streetAddress}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        </div>
                        <div className="form-row">
                            <div className="form-group">
                                <label className="form-label">City</label>
                                <input
                                    type="text"
                                    name="city"
                                    className="form-input"
                                    value={formData.city}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label className="form-label">State</label>
                                <input
                                    type="text"
                                    name="state"
                                    className="form-input"
                                    value={formData.state}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        </div>
                        <div className="form-row">
                            <div className="form-group">
                                <label className="form-label">Zip Code</label>
                                <input
                                    type="text"
                                    name="zipCode"
                                    className="form-input"
                                    value={formData.zipCode}
                                    onChange={handleChange}
                                    required
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
                                <label className="form-label">License Number</label>
                                <input
                                    type="text"
                                    name="licenseNumber"
                                    className="form-input"
                                    value={formData.licenseNumber}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label className="form-label">Specialization</label>
                                <input
                                    type="text"
                                    name="specialization"
                                    className="form-input"
                                    value={formData.specialization}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        </div>
                        <div className="form-row">
                            <div className="form-group">
                                <label className="form-label">Years of Experience</label>
                                <input
                                    type="number"
                                    name="experience"
                                    className="form-input"
                                    value={formData.experience}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label className="form-label">Days Available</label>
                                <input
                                    type="text"
                                    name="daysAvailable"
                                    className="form-input"
                                    value={formData.daysAvailable}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        </div>
                        <div className="form-row">
                            <div className="form-group">
                                <label className="form-label">Clinic Timings</label>
                                <input
                                    type="text"
                                    name="clinicTimings"
                                    className="form-input"
                                    value={formData.clinicTimings}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        </div>
                    </div>
                );
            case 4:
                return (
                    <div className="form-step">
                        <div className="form-row">
                            <div className="form-group">
                                <label className="form-label">About Yourself</label>
                                <textarea
                                    name="aboutYourself"
                                    className="form-textarea"
                                    value={formData.aboutYourself}
                                    onChange={handleChange}
                                    required
                                    rows={4}
                                />
                            </div>
                        </div>
                        <div className="form-row">
                            <div className="form-group">
                                <label className="form-label">Profile Photo</label>
                                <div className="file-upload-container">
                                    <input
                                        type="file"
                                        name="profilePhoto"
                                        className="file-input"
                                        onChange={handleFileChange}
                                        accept="image/*"
                                        required
                                    />
                                    <Upload className="upload-icon" size={24} />
                                    <p>Drop your image here or click to browse</p>
                                    {previewUrl && (
                                        <div className="image-preview">
                                            <img src={previewUrl} alt="Preview" />
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                        <div className="form-row">
                            <div className="form-group">
                                <label className="form-label" data-optional>Website URL</label>
                                <input
                                    type="url"
                                    name="websiteUrl"
                                    className="form-input"
                                    value={formData.websiteUrl}
                                    onChange={handleChange}
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
        <div className="signup-container">
            <form onSubmit={handleSubmit} className="doctor-signup-form">
                <h2 className="form-title">Doctor Registration</h2>

                {error && (
                    <div className="error-message">
                        <AlertCircle size={20} />
                        {error}
                    </div>
                )}

                <div className="form-progress">
                    {steps.map(step => (
                        <div
                            key={step.number}
                            className={`progress-step ${currentStep === step.number ? 'active' : ''} ${currentStep > step.number ? 'completed' : ''}`}
                        >
                            <div className="step-number">
                                {currentStep > step.number ? <Check size={20} /> : step.number}
                            </div>
                            <div className="step-label">{step.label}</div>
                        </div>
                    ))}
                </div>

                {renderFormStep()}

                <div className="form-navigation">
                    {currentStep > 1 && (
                        <button
                            type="button"
                            className="nav-btn prev-btn"
                            onClick={() => setCurrentStep(prev => prev - 1)}
                        >
                            <ChevronLeft size={20} />
                            Previous
                        </button>
                    )}
                    <button
                        type="submit"
                        className="nav-btn next-btn"
                        disabled={isLoading}
                    >
                        {isLoading ? 'Processing...' : currentStep < 4 ? (
                            <>
                                Next
                                <ChevronRight size={20} />
                            </>
                        ) : 'Complete Registration'}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default DoctorSignUp;

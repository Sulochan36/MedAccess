import React, { useEffect, useState } from 'react';
import './AddDoctorForm.css';
import { useLocation, useNavigate } from 'react-router-dom';

const AddDoctorForm = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);

    const [formData, setFormData] = useState({
        fullName: '',
        profilePicture: null,  // Profile picture will be stored as a Base64 string
        specialization: '',
        experience: '',
        qualification: '',
        contactNumber: '',
        email: '',
        visitingHours: '',
        fee: '',
        availabilityStatus: '',
    });

    const editingHdoctor = location.state?.doctor;

    useEffect(() => {
        if (editingHdoctor) {
            setFormData({
                fullName: editingHdoctor.fullName,
                profilePicture: editingHdoctor.profilePicture,
                specialization: editingHdoctor.specialization,
                experience: editingHdoctor.experience,
                qualification: editingHdoctor.qualification,
                contactNumber: editingHdoctor.contactNumber,
                email: editingHdoctor.email,
                visitingHours: editingHdoctor.visitingHours,
                fee: editingHdoctor.fee,
                availabilityStatus: editingHdoctor.availabilityStatus
            });
        }
    }, [editingHdoctor]);

    // Handle file change for profile picture
    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setFormData(prev => ({
                    ...prev,
                    profilePicture: reader.result,  // Store the Base64 encoded string
                }));
            };
            reader.readAsDataURL(file);  // Convert to Base64
        }
    };

    const handleChange = (e) => {
        const { name, value, type, files } = e.target;
        if (type === 'file') {
            handleFileChange(e);  // Handle file change
        } else {
            setFormData((prevData) => ({ ...prevData, [name]: value }));
        }
    };

    const validateForm = () => {
        const newErrors = {};
        if (!formData.fullName) newErrors.fullName = "Full Name is required";
        if (!formData.specialization) newErrors.specialization = "Specialization is required";
        if (!formData.experience || formData.experience <= 0) newErrors.experience = "Experience must be a positive number";
        if (!formData.qualification) newErrors.qualification = "Qualification is required";
        if (!formData.contactNumber || formData.contactNumber.length !== 10) newErrors.contactNumber = "Contact Number must be 10 digits";
        if (!formData.email) newErrors.email = "Email is required";
        if (!formData.visitingHours) newErrors.visitingHours = "Visiting time is required";
        if (!formData.fee) newErrors.fee = "Fee is required";
        if (!formData.availabilityStatus) newErrors.availabilityStatus = "Availability status is required";
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (validateForm()) {
            setLoading(true);
            const doctorFormData = { ...formData };

            // Check if the profile picture was updated
            if (formData.profilePicture && formData.profilePicture.startsWith('data:image')) {
                // If it's a new image (Base64), send it as is
                doctorFormData.profilePicture = formData.profilePicture;
            } else if (!formData.profilePicture) {
                // If there's no new profile picture, keep the existing one (URL or null)
                doctorFormData.profilePicture = editingHdoctor ? editingHdoctor.profilePicture : null;
            }

            const token = localStorage.getItem('token');
            if (!token) {
                alert('You are not logged in');
                return;
            }

            const apiUrl = editingHdoctor
                ? `http://localhost:5000/api/hospitaldoctors/${editingHdoctor._id}`  // Use PUT for update
                : 'http://localhost:5000/api/hospitaldoctors/addhdoctor';  // Use POST for adding

            const method = editingHdoctor ? 'PUT' : 'POST';

            try {
                const response = await fetch(apiUrl, {
                    method: method,  // Use the correct HTTP method (PUT for updates, POST for adding)
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`,
                    },
                    body: JSON.stringify(doctorFormData),  // Send the formData (including profile picture)
                });

                const result = await response.json();
                if (!response.ok) {
                    // If response is not ok, handle error
                    throw new Error(result.message || 'An error occurred while saving doctor details');
                }

                alert(editingHdoctor ? 'Doctor details updated' : 'Doctor details added');
                navigate('/dashboard/doctors');
            } catch (error) {
                console.error("Error saving doctor details:", error);
                alert(error.message || 'An unexpected error occurred');
            } finally {
                setLoading(false);  // Set loading to false once the operation completes
            }
        }
    };



    return (
        <div>
            <h2>{editingHdoctor ? "Edit Doctor Details" : "Add Doctor Details"}</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Full Name</label>
                    <input
                        type="text"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleChange}
                    />
                    {errors.fullName && <p className="error">{errors.fullName}</p>}
                </div>
                <div>
                    <label>Specialization</label>
                    <input
                        type="text"
                        name="specialization"
                        value={formData.specialization}
                        onChange={handleChange}
                    />
                    {errors.specialization && <p className="error">{errors.specialization}</p>}
                </div>
                <div>
                    <label>Experience (in years)</label>
                    <input
                        type="number"
                        name="experience"
                        value={formData.experience}
                        onChange={handleChange}
                    />
                    {errors.experience && <p className="error">{errors.experience}</p>}
                </div>
                <div>
                    <label>Qualification</label>
                    <input
                        type="text"
                        name="qualification"
                        value={formData.qualification}
                        onChange={handleChange}
                    />
                    {errors.qualification && <p className="error">{errors.qualification}</p>}
                </div>
                <div>
                    <label>Contact Number</label>
                    <input
                        type="text"
                        name="contactNumber"
                        value={formData.contactNumber}
                        onChange={handleChange}
                    />
                    {errors.contactNumber && <p className="error">{errors.contactNumber}</p>}
                </div>
                <div>
                    <label>Email</label>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                    />
                    {errors.email && <p className="error">{errors.email}</p>}
                </div>
                <div>
                    <label>Visiting Hours</label>
                    <input
                        type="text"
                        name="visitingHours"
                        value={formData.visitingHours}
                        onChange={handleChange}
                    />
                    {errors.visitingHours && <p className="error">{errors.visitingHours}</p>}
                </div>
                <div>
                    <label>Fee</label>
                    <input
                        type="text"
                        name="fee"
                        value={formData.fee}
                        onChange={handleChange}
                    />
                    {errors.fee && <p className="error">{errors.fee}</p>}
                </div>
                <div>
                    <label>Availability Status</label>
                    <input
                        type="text"
                        name="availabilityStatus"
                        value={formData.availabilityStatus}
                        onChange={handleChange}
                    />
                    {errors.availabilityStatus && <p className="error">{errors.availabilityStatus}</p>}
                </div>
                <div>
                    <label>Profile Picture</label>
                    <input
                        type="file"
                        name="profilePicture"
                        accept="image/*"
                        onChange={handleChange}
                    />
                    {formData.profilePicture && (
                        <img
                            src={formData.profilePicture}
                            alt="Profile Preview"
                            style={{ width: '100px', height: '100px' }}
                        />
                    )}
                </div>
                <button type="submit" disabled={loading}>
                    {loading ? "Saving..." : "Submit"}
                </button>
            </form>
        </div>
    );
};

export default AddDoctorForm;

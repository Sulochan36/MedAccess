// AddDoctorForm.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';  // Make sure to install axios
import './AddDoctorForm.css';
import { useLocation, useNavigate } from 'react-router-dom';

const AddDoctorForm = () => {

    const location = useLocation();  // Get the location object
    const navigate = useNavigate();

    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);

    const [formData, setFormData] = useState({
        fullName: '',
        profilePicture: null,
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

    

    const handleChange = (e) => {
        const { name, value, type, files } = e.target;
        if (type === 'file') {
            setFormData((prevData) => ({ ...prevData, [name]: files[0] }));
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
        if (!formData.visitingHours) newErrors.visitingHours = "Visitng time is required";
        if (!formData.fee) newErrors.fee = "Fees is required";
        if (!formData.availabilityStatus) newErrors.availabilityStatus = "Availability status is required";
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (validateForm()) {
            setLoading(true);
            const formDataToSend = new FormData();

            Object.keys(formData).forEach((key) => {
                console.log(key, formData[key]);
                formDataToSend.append(key, formData[key]);
            });

            const token = localStorage.getItem('token');
            if (!token) {
                alert('You are not logged in');
                return;
            }

            const apiUrl = editingHdoctor ? `http://localhost:5000/api/hospitaldoctors/${editingHdoctor._id}` : 'http://localhost:5000/api/hospitaldoctors/addhdoctor';
            const method = editingHdoctor ? 'put' : 'post';

            axios[method](apiUrl, formDataToSend, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                }
            })
                .then(response => {
                    alert(editingHdoctor ? 'Doctor details updated' : 'Doctor details added');
                    navigate('/dashboard/doctors');
                })
                .catch(error => {
                    console.error("Error saving doctor details:", error);
                    alert('An error occurred while saving doctor details.');
                });
        }
    };

    return (
        <div>
            <h2>{editingHdoctor?"Edit Doctor Details" : "Add Doctor Details"}</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="fullName">Full Name (Required)</label>
                    <input type="text" id="fullName" name="fullName" value={formData.fullName} onChange={handleChange} />
                    {errors.fullName && <p style={{ color: 'red' }}>{errors.fullName}</p>}
                </div>

                <div>
                    <label htmlFor="profilePicture">Profile Picture (Optional)</label>
                    <input type="file" id="profilePicture" name="profilePicture" accept="image/png, image/jpeg" onChange={handleChange} />
                </div>

                <div>
                    <label htmlFor="specialization">Specialization (Required)</label>
                    <input type="text" id="specialization" name="specialization" value={formData.specialization} onChange={handleChange} />
                    {errors.specialization && <p style={{ color: 'red' }}>{errors.specialization}</p>}
                </div>

                <div>
                    <label htmlFor="experience">Experience (Years) (Required)</label>
                    <input type="number" id="experience" name="experience" value={formData.experience} onChange={handleChange} />
                    {errors.experience && <p style={{ color: 'red' }}>{errors.experience}</p>}
                </div>

                <div>
                    <label htmlFor="qualification">Qualification (Required)</label>
                    <input type="text" id="qualification" name="qualification" value={formData.qualification} onChange={handleChange} />
                    {errors.qualification && <p style={{ color: 'red' }}>{errors.qualification}</p>}
                </div>

                <div>
                    <label htmlFor="contactNumber">Contact Number (Required)</label>
                    <input type="text" id="contactNumber" name="contactNumber" value={formData.contactNumber} onChange={handleChange} />
                    {errors.contactNumber && <p style={{ color: 'red' }}>{errors.contactNumber}</p>}
                </div>

                <div>
                    <label htmlFor="email">Email (Required)</label>
                    <input type="text" id="email" name="email" value={formData.email} onChange={handleChange} />
                    {errors.email && <p style={{ color: 'red' }}>{errors.email}</p>}
                </div>

                <div>
                    <label htmlFor="visitingHours">Visiting Hours</label>
                    <input type="text" id="visitingHours" name="visitingHours" value={formData.visitingHours} onChange={handleChange} />
                    {errors.visitingHours && <p style={{ color: 'red' }}>{errors.visitingHours}</p>}
                </div>

                <div>
                    <label htmlFor="fee">Fees</label>
                    <input type="text" id="fee" name="fee" value={formData.fee} onChange={handleChange} />
                    {errors.fee && <p style={{ color: 'red' }}>{errors.fee}</p>}
                </div>

                <div>
                    <label htmlFor="availabilityStatus">Availability Status (Required)</label>
                    <select id="availabilityStatus" name="availabilityStatus" value={formData.availabilityStatus} onChange={handleChange}>
                        <option value="">Select Availability Status</option>
                        <option value="Available">Available</option>
                        <option value="Unavailable">Unavailable</option>
                    </select>
                    {errors.availabilityStatus && <p style={{ color: 'red' }}>{errors.availabilityStatus}</p>}
                </div>

                <button type="submit" disabled={loading}>{loading
                    ? (editingHdoctor ? "Updating..." : "Adding...")
                    : (editingHdoctor ? "Update" : "Add")
                }
                    Doctor Details
                </button>
            </form>
        </div>
    );
};

export default AddDoctorForm;

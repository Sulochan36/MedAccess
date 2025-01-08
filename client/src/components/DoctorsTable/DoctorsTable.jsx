// DoctorsTable.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const DoctorsTable = () => {
    const [doctors, setDoctors] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    // Fetch doctors from the backend
    useEffect(() => {
        const fetchDoctors = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/hospitaldoctors',{
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`  // Include the JWT token in the header
                    }
                });
                setDoctors(response.data);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching doctors:", error);
                setLoading(false);
            }
        };

        fetchDoctors();
    }, []);

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:5000/api/hospitaldoctors/${id}`,{
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`  // Authorization header
                }
            });
            setDoctors(doctors.filter((doctor) => doctor._id !== id));
        } catch (error) {
            console.error("Error deleting doctor:", error);
        }
    };

    const handleEdit = (doctor) => {
        navigate('/dashboard/doctors/adddoctorform', { state: { doctor } });
    };

    return (
        <div>
            <h2>Doctors Profile</h2>
            {loading ? (
                <p>Loading...</p>
            ) : (
                <table border="1" style={{ width: "100%", marginBottom: "20px" }}>
                    <thead>
                        <tr>
                            <th>Profile Picture</th>
                            <th>Doctor's Name</th>
                            <th>Specialization</th>
                            <th>Experience (Years)</th>
                            <th>Contact Number</th>
                            <th>Availability</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {doctors.map((doctor) => (
                            <tr key={doctor._id}>
                                <td>
                                    <img
                                        src={doctor.profilePicture}
                                        alt={`${doctor.fullName} Profile`}
                                        style={{ borderRadius: "50%", width: "40px", height: "40px" }}
                                    />
                                </td>
                                <td>{doctor.fullName}</td>
                                <td>{doctor.specialization}</td>
                                <td>{doctor.experience}</td>
                                <td>{doctor.contactNumber}</td>
                                <td>{doctor.availabilityStatus}</td>
                                <td>
                                    <button onClick={() => handleEdit(doctor)}>Edit</button>
                                    <button onClick={() => handleDelete(doctor._id)}>Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default DoctorsTable;

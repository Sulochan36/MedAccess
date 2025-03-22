import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './HospitalBedsTable.css';
import { useNavigate } from 'react-router-dom';  // Import useNavigate

const HospitalBedsTable = () => {
    const [beds, setBeds] = useState([]);
    const [editingBed, setEditingBed] = useState(null); // For editing a bed
    const navigate = useNavigate();  // Initialize the useNavigate hook

    useEffect(() => {
        // Fetch all bed details from the backend
        axios.get('http://localhost:5000/api/beds', {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`  // Include the JWT token in the header
            }
        })
            .then(response => {
                setBeds(response.data);  // Store the beds data in state
            })
            .catch(error => {
                console.error("Error fetching bed details:", error);
            });
    }, []);

    const handleDelete = (id) => {
        // Delete bed
        axios.delete(`http://localhost:5000/api/beds/${id}`, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`  // Authorization header
            }
        })
            .then(() => {
                setBeds(prevBeds => prevBeds.filter(bed => bed._id !== id)); // Remove deleted bed from state
                alert("Bed deleted successfully");
            })
            .catch(error => {
                console.error("Error deleting bed:", error);
            });
    };

    const handleEdit = (bed) => {
        // Navigate to the form page for editing
        navigate('/dashboard/doctors/bedetailsform', { state: { bed } });
    };

    return (
        <div>
            {/* <h2>Hospital Bed Management</h2> */}

            {beds.length === 0 ? (
                <p>No bed details available</p>  // Show message if no beds are found
            ) : (
                <table border="1" style={{ width: "100%", marginBottom: "20px" }}>
                    <thead>
                        <tr>
                            <th>Bed Type</th>
                            <th>Total Beds</th>
                            <th>Occupied Beds</th>
                            <th>Available Beds</th>
                            <th>Price per Day (₹)</th>
                            <th>Last Updated</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {beds.map((bed) => (
                            <tr key={bed._id}>
                                <td>{bed.bedType}</td>
                                <td>{bed.totalBeds}</td>
                                <td>{bed.occupiedBeds}</td>
                                <td>{bed.availableBeds}</td>
                                <td>{bed.pricePerDay}</td>
                                <td>{new Date(bed.lastUpdated).toLocaleString()}</td>
                                <td>
                                    <button className='bedEditBtn' onClick={() => handleEdit(bed)}>Edit</button>
                                    <button className='bedEditBtn' onClick={() => handleDelete(bed._id)}>Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default HospitalBedsTable;

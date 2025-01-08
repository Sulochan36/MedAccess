import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './BedDetailForm.css';
import { useLocation, useNavigate } from 'react-router-dom';  // Import useLocation

const BedDetailForm = () => {
    const location = useLocation();  // Get the location object
    const navigate = useNavigate();  // Use navigate hook

    // Set initial form data based on the bed received via navigation state
    const [formData, setFormData] = useState({
        bedType: '',
        totalBeds: '',
        occupiedBeds: '',
        pricePerDay: '',
        wardSectionName: ''
    });

    const editingBed = location.state?.bed;  // Get the editing bed if exists

    useEffect(() => {
        if (editingBed) {
            setFormData({
                bedType: editingBed.bedType,
                totalBeds: editingBed.totalBeds,
                occupiedBeds: editingBed.occupiedBeds,
                pricePerDay: editingBed.pricePerDay,
                wardSectionName: editingBed.wardSectionName || ''
            });
        }
    }, [editingBed]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Ensure totalBeds and occupiedBeds are numbers, and calculate availableBeds
        const totalBeds = parseInt(formData.totalBeds);
        const occupiedBeds = parseInt(formData.occupiedBeds);
        const availableBeds = totalBeds - occupiedBeds;

        const dataToSend = { ...formData, totalBeds, occupiedBeds, availableBeds };

        const token = localStorage.getItem('token');
        if (!token) {
            alert('You are not logged in');
            return;
        }

        const apiUrl = editingBed ? `http://localhost:5000/api/beds/${editingBed._id}` : 'http://localhost:5000/api/beds/add';
        const method = editingBed ? 'put' : 'post';

        axios[method](apiUrl, dataToSend, {
            headers: {
                'Authorization': `Bearer ${token}`,
            }
        })
            .then(response => {
                alert(editingBed ? 'Bed details updated' : 'Bed details added');
                navigate('/dashboard/beds');  
            })
            .catch(error => {
                console.error("Error saving bed details:", error);
                alert('An error occurred while saving bed details.');
            });
    };

    return (
        <div>
            <h2>{editingBed ? "Edit Bed Details" : "Add Bed Details"}</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Bed Type</label>
                    <input
                        type="text"
                        name="bedType"
                        value={formData.bedType}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Total Beds</label>
                    <input
                        type="number"
                        name="totalBeds"
                        value={formData.totalBeds}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Occupied Beds</label>
                    <input
                        type="number"
                        name="occupiedBeds"
                        value={formData.occupiedBeds}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Price per Day</label>
                    <input
                        type="number"
                        name="pricePerDay"
                        value={formData.pricePerDay}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label>Ward Section Name</label>
                    <input
                        type="text"
                        name="wardSectionName"
                        value={formData.wardSectionName}
                        onChange={handleChange}
                    />
                </div>
                <button type="submit">{editingBed ? "Update" : "Add"} Bed Details</button>
            </form>
        </div>
    );
};

export default BedDetailForm;

import React, { useState, useEffect } from "react";
import { addNonMedicalStaff, updateNonMedicalStaff } from "../../api/nonMedicalStaffApi.js"; // Assuming you have the API functions imported

const NonMedicalStaffForm = ({ staff, setStaff, hospitalId, editingStaff, setEditingStaff }) => {
    const [formData, setFormData] = useState({
        name: "",
        role: "",
        department: "",
        email: "",
        phone: "",
    });

    useEffect(() => {
        if (editingStaff) {
            setFormData({
                name: editingStaff.name,
                role: editingStaff.role,
                department: editingStaff.department,
                email: editingStaff.email,
                phone: editingStaff.phone,
            });
        }
    }, [editingStaff]);

    const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();

        const requestData = {
            ...formData,
            hospitalId, // Ensure hospitalId is passed for the backend to associate the staff
        };

        try {
            let response;
            if (editingStaff) {
                // Update staff
                response = await updateNonMedicalStaff(editingStaff._id, hospitalId, requestData);
                if (response) {
                    setStaff(staff.map((item) => (item._id === response._id ? response : item)));
                    setEditingStaff(null);
                }
            } else {
                // Add new staff
                response = await addNonMedicalStaff(hospitalId, requestData);
                if (response) {
                    setStaff([...staff, response]);
                }
            }

            // Reset form data after submission
            setFormData({ name: "", role: "", department: "", email: "", phone: "" });
        } catch (error) {
            console.error("Error handling staff form:", error);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="staff-form">
            <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Name"
                required
            />
            <input
                type="text"
                name="role"
                value={formData.role}
                onChange={handleChange}
                placeholder="Role"
                required
            />
            <input
                type="text"
                name="department"
                value={formData.department}
                onChange={handleChange}
                placeholder="Department"
                required
            />
            <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email"
                required
            />
            <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Phone"
                required
            />
            <button type="submit">{editingStaff ? "Update" : "Add"} Staff</button>
        </form>
    );
};

export default NonMedicalStaffForm;

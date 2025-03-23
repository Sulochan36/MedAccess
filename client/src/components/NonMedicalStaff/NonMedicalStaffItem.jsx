import React from "react";
import { deleteNonMedicalStaff } from "../../api/nonMedicalStaffApi";  // Import the delete API function

const NonMedicalStaffItem = ({ staff, setStaff }) => {

    // Delete the staff item
    const handleDelete = async () => {
        try {
            const token = localStorage.getItem("token"); // Assuming you're using localStorage for the token
            if (!token) throw new Error("No token provided");

            // Use the deleteNonMedicalStaff function from API file
            const response = await deleteNonMedicalStaff(staff._id, staff.hospitalId);  // Use the API function

            if (response && response.success) {
                setStaff((prevState) => prevState.filter((item) => item._id !== staff._id));
            } else {
                console.error("Failed to delete staff:", response.message || "Unknown error");
            }
        } catch (error) {
            console.error("Error deleting staff:", error);
        }
    };

    // Edit the staff item
    const handleEdit = () => {
        setEditingStaff(staff);  // This will trigger the edit mode in the form
    };

    return (
        <tr>
            <td>{staff.name}</td>
            <td>{staff.role}</td>
            <td>{staff.department}</td>
            <td>{staff.email}</td>
            <td>{staff.phone}</td>
            <td>
                <button onClick={handleEdit}>Edit</button>
                <button onClick={handleDelete}>Delete</button>
            </td>
        </tr>
    );
};

export default NonMedicalStaffItem;

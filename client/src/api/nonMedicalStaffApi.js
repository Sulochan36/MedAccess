const BASE_URL = "http://localhost:5000/api/nonmedicalstaff"; // Your backend API endpoint

const getToken = () => {
    return localStorage.getItem("token"); // Assuming the token is stored in localStorage
}

// Fetch all non-medical staff for a specific hospital
export const fetchNonMedicalStaff = async (hospitalId) => {
    try {
        const token = getToken();
        if (!token) throw new Error("No token provided");

        const response = await fetch(`${BASE_URL}/${hospitalId}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        });

        if (!response.ok) throw new Error("Failed to fetch non-medical staff");

        const data = await response.json();
        return data.data; // Assuming the response contains { data: [staff] }
    } catch (error) {
        console.error("Error fetching non-medical staff:", error);
        return [];
    }
};

// Add new non-medical staff for a specific hospital
export const addNonMedicalStaff = async (hospitalId, staffData) => {
    try {
        const token = getToken();
        if (!token) throw new Error("No token provided");

        const response = await fetch(`${BASE_URL}/add`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(staffData),
        });

        if (!response.ok) throw new Error("Failed to add non-medical staff");

        const data = await response.json();
        return data.data; // Assuming the backend returns { success: true, data: staff }
    } catch (error) {
        console.error("Error adding non-medical staff:", error);
        return null;
    }
};

// Update non-medical staff details
export const updateNonMedicalStaff = async (id, hospitalId, staffData) => {
    try {
        const token = getToken();
        if (!token) throw new Error("No token provided");

        const response = await fetch(`${BASE_URL}/update/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(staffData),
        });

        if (!response.ok) throw new Error("Failed to update non-medical staff");

        const data = await response.json();
        return data.data; // Assuming the backend returns { success: true, data: updatedStaff }
    } catch (error) {
        console.error("Error updating non-medical staff:", error);
        return null;
    }
};

// Delete non-medical staff
export const deleteNonMedicalStaff = async (id, hospitalId) => {
    try {
        const token = getToken();
        if (!token) throw new Error("No token provided");

        const response = await fetch(`${BASE_URL}/delete/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        });

        if (!response.ok) throw new Error("Failed to delete non-medical staff");

        const data = await response.json();
        return data; // Assuming the backend returns { success: true, message: "Staff deleted" }
    } catch (error) {
        console.error("Error deleting non-medical staff:", error);
    }
};

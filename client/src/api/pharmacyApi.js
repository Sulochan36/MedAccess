const BASE_URL = "http://localhost:5000/api/pharmacy";

// Helper function to get the auth token
const getAuthToken = () => {
    const authToken = localStorage.getItem("token");
    if(!authToken){
        alert('You are not logged in');
        return;
    }
    else{
        return authToken;
    }
};

// Fetch medicines function with Authorization
export const fetchMedicines = async (hospitalId) => {
    try {
        const token = getAuthToken();
        const response = await fetch(`${BASE_URL}/${hospitalId}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`,
            },
        });

        if (!response.ok) throw new Error("Failed to fetch medicines");
        const data = await response.json();
        return data.data;
    } catch (error) {
        console.error("Error fetching medicines:", error);
        return [];
    }
};

// Add medicine function with Authorization
export const addMedicine = async (medicine) => {
    try {
        const token = getAuthToken();
        const response = await fetch(`${BASE_URL}/add`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`, // Add Authorization header with token
            },
            body: JSON.stringify(medicine),
        });

        if (!response.ok) throw new Error("Failed to add medicine");
        const data = await response.json();
        return data.data;
    } catch (error) {
        console.error("Error adding medicine:", error);
        return null;
    }
};

// Update medicine function with Authorization
export const updateMedicine = async (id, medicine) => {
    try {
        const token = getAuthToken();
        const response = await fetch(`${BASE_URL}/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`,
            },
            body: JSON.stringify(medicine),
        });

        if (!response.ok) throw new Error("Failed to update medicine");
        const data = await response.json();
        return data.data;
    } catch (error) {
        console.error("Error updating medicine:", error);
        return null;
    }
};

// Delete medicine function with Authorization
export const deleteMedicine = async (id) => {
    try {
        const token = getAuthToken();
        const response = await fetch(`${BASE_URL}/${id}`, {
            method: "DELETE",
            headers: {
                "Authorization": `Bearer ${token}`,
            },
        });

        if (!response.ok) throw new Error("Failed to delete medicine");
    } catch (error) {
        console.error("Error deleting medicine:", error);
    }
};

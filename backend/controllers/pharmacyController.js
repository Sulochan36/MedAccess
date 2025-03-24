import Pharmacy from "../models/Pharmacy.js";

// ✅ Add Medicine
export const addMedicine = async (req, res) => {
    try {
        const { medicineName, category, brand, quantity, price, expiryDate, supplier } = req.body;

        // Extract hospitalId from the logged-in user's JWT payload
        const hospitalId = req.user.userId;

        // Create a new medicine object and associate it with the user's hospital
        const newMedicine = new Pharmacy({
            hospitalId,  // This is set based on the logged-in user's hospital ID
            medicineName,
            category,
            brand,
            quantity,
            price,
            expiryDate,
            supplier,
            addedBy: req.user.id,  // Associate the medicine with the logged-in user
        });

        // Save the medicine to the database
        await newMedicine.save();
        res.status(201).json({ success: true, message: "Medicine added successfully", data: newMedicine });
    } catch (error) {
        console.error("Error adding medicine:", error);
        res.status(500).json({ success: false, message: "Error adding medicine", error: error.message });
    }
};

// ✅ Get Medicines by Hospital
export const getMedicinesByHospital = async (req, res) => {
    try {
        // Extract hospitalId from the logged-in user's JWT payload
        const hospitalId = req.user.userId;

        // Fetch all medicines associated with the hospitalId
        const medicines = await Pharmacy.find({ hospitalId });

        if (!medicines || medicines.length === 0) {
            return res.status(404).json({ success: false, message: "No medicines found for this hospital" });
        }

        res.status(200).json({ success: true, data: medicines });
    } catch (error) {
        console.error("Error fetching medicines:", error);
        res.status(500).json({ success: false, message: "Server error. Could not fetch medicines.", error: error.message });
    }
};

// ✅ Update Medicine
export const updateMedicine = async (req, res) => {
    const { id } = req.params;  // Medicine ID from URL parameter

    try {
        // Ensure the hospitalId matches the logged-in user's hospital and update the medicine
        const updatedMedicine = await Pharmacy.findOneAndUpdate(
            { _id: id, hospitalId: req.user.userId },  // Ensure the user can only update their own hospital's medicines
            req.body,  // Update with the data from the request body
            { new: true }  // Return the updated document
        );

        if (!updatedMedicine) {
            return res.status(404).json({ success: false, message: "Medicine not found or you do not have permission to edit this medicine" });
        }

        res.status(200).json({ success: true, message: "Medicine updated successfully", data: updatedMedicine });
    } catch (error) {
        console.error("Error updating medicine:", error);
        res.status(500).json({ success: false, message: "Error updating medicine", error: error.message });
    }
};

// ✅ Delete Medicine
export const deleteMedicine = async (req, res) => {
    const { id } = req.params;  // Medicine ID from URL parameter

    try {
        // Ensure the hospitalId matches the logged-in user's hospital and delete the medicine
        const deletedMedicine = await Pharmacy.findOneAndDelete(
            { _id: id, hospitalId: req.user.userId }  // Ensure the user can only delete their own hospital's medicines
        );

        if (!deletedMedicine) {
            return res.status(404).json({ success: false, message: "Medicine not found or you do not have permission to delete this medicine" });
        }

        res.status(200).json({ success: true, message: "Medicine deleted successfully" });
    } catch (error) {
        console.error("Error deleting medicine:", error);
        res.status(500).json({ success: false, message: "Error deleting medicine", error: error.message });
    }
};


export const searchMedicines = async (req, res) => {
    try {
        const { query } = req.query; // Get search term from query params

        const medicines = await Pharmacy.find({
            $or: [
                { name: { $regex: query, $options: 'i' } }, // Search by name (case-insensitive)
                { category: { $regex: query, $options: 'i' } }, // Search by category
                { expiryDate: { $regex: query, $options: 'i' } } // Search by expiryDate
            ]
        });

        res.status(200).json(medicines);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching medicines', error });
    }
};
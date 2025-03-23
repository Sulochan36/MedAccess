import NonMedicalStaff from '../models/NonMedicalStaff.js';

// ✅ Add Non-Medical Staff
export const addNonMedicalStaff = async (req, res) => {
    try {
        const { name, role, department, email, phone } = req.body;
        const hospitalId = req.user.userId; // The hospitalId from JWT (user's hospital)

        const newStaff = new NonMedicalStaff({
            hospitalId,  // Associating the staff with the hospital
            name,
            role,
            department,
            email,
            phone,
        });

        await newStaff.save();
        res.status(201).json({ success: true, message: "Non-medical staff added", data: newStaff });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// ✅ Get Non-Medical Staff by Hospital
export const getNonMedicalStaffByHospital = async (req, res) => {
    try {
        const hospitalId = req.user.userId;  // Get the hospitalId from JWT
        const staff = await NonMedicalStaff.find({ hospitalId });  // Fetch staff associated with the hospital

        res.status(200).json({ success: true, data: staff });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// ✅ Update Non-Medical Staff
export const updateNonMedicalStaff = async (req, res) => {
    try {
        const { id } = req.params;
        const hospitalId = req.user.userId;  // Get the hospitalId from JWT

        // Find the staff by id and make sure the hospitalId matches
        const updatedStaff = await NonMedicalStaff.findOneAndUpdate(
            { _id: id, hospitalId },  // Ensuring that the hospitalId is matched
            req.body,
            { new: true }
        );

        if (!updatedStaff) {
            return res.status(404).json({ success: false, message: "Staff member not found or you do not have permission to edit this staff" });
        }

        res.status(200).json({ success: true, message: "Non-medical staff updated", data: updatedStaff });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// ✅ Delete Non-Medical Staff
export const deleteNonMedicalStaff = async (req, res) => {
    try {
        const { id } = req.params;
        const hospitalId = req.user.userId;  // Get the hospitalId from JWT

        // Find the staff by id and make sure the hospitalId matches
        const deletedStaff = await NonMedicalStaff.findOneAndDelete(
            { _id: id, hospitalId }  // Ensuring that the hospitalId is matched
        );

        if (!deletedStaff) {
            return res.status(404).json({ success: false, message: "Staff member not found or you do not have permission to delete this staff" });
        }

        res.status(200).json({ success: true, message: "Non-medical staff deleted" });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

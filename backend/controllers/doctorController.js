// controllers/doctorController.js
import HospitalDoctor from '../models/HospitalDoctor.js';

// Add a new doctor
export const addDoctor = async (req, res) => {
    try {
        const { fullName, specialization, experience, qualification, contactNumber, email, visitingHours, fee, availabilityStatus } = req.body;
        const profilePicture = req.file ? req.file.path : null;  // Get the uploaded file path

        // Create a new doctor document
        const newDoctor = new HospitalDoctor({
            hospital: req.user.userId,
            fullName,
            profilePicture,
            specialization,
            experience,
            qualification,
            contactNumber,
            email,
            visitingHours,
            fee,
            availabilityStatus,
        });

        const savedDoctor = await newDoctor.save();
        res.status(201).json({ message: 'Doctor added successfully', doctor: savedDoctor });
    } catch (error) {
        res.status(500).json({ message: 'Messg check karo ', error:error.message });
    }
};

// Get all doctors for a hospital
export const getDoctorsByHospital = async (req, res) => {
    try {
        const  hospitalId  = req.user.userId;
        const doctors = await HospitalDoctor.find({ hospital: hospitalId });
        res.json(doctors);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update a doctor's details
export const updateDoctor = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedData = req.body;
        const profilePicture = req.file ? req.file.path : null;

        if (profilePicture) {
            updatedData.profilePicture = profilePicture;
        }

        console.log("Updated Data:", updatedData); // Log the updated data
        console.log("Doctor ID:", id); // Log the doctor ID
        console.log("Hospital ID:", req.user.userId); // Log the hospital ID

        const updatedDoctor = await HospitalDoctor.findByIdAndUpdate({_id:id, hospital: req.user.userId}, updatedData, { new: true });

        if (!updatedDoctor) return res.status(404).json({ message: 'Doctor not found' });

        res.status(200).json({ message: 'Doctor updated successfully', doctor: updatedDoctor });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Delete a doctor
export const deleteDoctor = async (req, res) => {
    try {
        const { id } = req.params;

        const deletedDoctor = await HospitalDoctor.findByIdAndDelete(id);
        if (!deletedDoctor) return res.status(404).json({ message: 'Doctor not found' });

        res.status(200).json({ message: 'Doctor deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

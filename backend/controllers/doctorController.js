// controllers/doctorController.js
import HospitalDoctor from '../models/HospitalDoctor.js';
import cloudinary from "../lib/cloudinary.js";
import Hospital from '../models/Hospital.js';

// Add a new doctor
export const addDoctor = async (req, res) => {
    try {
        const { fullName, profilePicture, specialization, experience, qualification, contactNumber, email, visitingHours, fee, availabilityStatus } = req.body;

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

        if (profilePicture) {
            // Remove the "data:image/png;base64," part of the Base64 string
            const base64Image = profilePicture.split(',')[1];

            // Upload image to Cloudinary
            const result = await cloudinary.uploader.upload(`data:image/png;base64,${base64Image}`, {
                folder: 'hdoctor_profiles',
                use_filename: true,
                unique_filename: false,
                resource_type: 'image',
            });

            // Store the Cloudinary image URL in the profilePicture field
            newDoctor.profilePicture = result.secure_url;
        }

        console.log("Incoming request body:", req.body);  // Log incoming data
        console.log("New doctor object:", newDoctor);    // Log the new doctor object

        // Save the new doctor to the HospitalDoctor collection
        const savedDoctor = await newDoctor.save();

        // After saving the doctor, update the hospital's doctors array
        const hospital = await Hospital.findById(req.user.userId);  // Ensure you have the hospital ID from the authenticated user

        if (!hospital) {
            return res.status(404).json({ message: 'Hospital not found' });
        }

        // Add the new doctor's ID to the hospital's doctors array
        hospital.doctors.push(savedDoctor._id);

        // Save the updated hospital document
        await hospital.save();

        res.status(201).json({ message: 'Doctor added successfully', doctor: savedDoctor });
    } catch (error) {
        console.error("Error in addDoctor controller:", error);  // Log error for better debugging
        res.status(500).json({ message: 'Error occurred while adding doctor details', error: error.message });
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

export const updateDoctor = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedData = req.body;
        let profilePicture;

        // If profilePicture is sent as base64 string
        if (updatedData.profilePicture) {
            const base64Image = updatedData.profilePicture.split(',')[1]; // Remove the prefix (data:image/png;base64, etc.)

            // Upload image to Cloudinary
            const result = await cloudinary.uploader.upload(`data:image/png;base64,${base64Image}`, {
                folder: 'hdoctor_profiles',
                use_filename: true,
                unique_filename: false,
                resource_type: 'image',
            });

            profilePicture = result.secure_url;
        } else if (req.file) {
            // If it's sent as a file, use multer's uploaded file path
            profilePicture = req.file.path;
        }

        // If there's a new profile picture, include it in the updated data
        if (profilePicture) {
            updatedData.profilePicture = profilePicture;
        }

        console.log("Updated Data:", updatedData); // Log the updated data
        console.log("Doctor ID:", id); // Log the doctor ID
        console.log("Hospital ID:", req.user.userId); // Log the hospital ID

        // Find the doctor by ID and hospital to ensure the hospital can update the doctor's data
        const updatedDoctor = await HospitalDoctor.findByIdAndUpdate(
            { _id: id, hospital: req.user.userId },
            updatedData,
            { new: true } // Return the updated document
        );

        if (!updatedDoctor) {
            return res.status(404).json({ message: 'Doctor not found' });
        }

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

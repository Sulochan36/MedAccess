import bcrypt from "bcryptjs";
import { generateToken, verifyToken } from "../utils/jwt.js";
import Hospital from "../models/Hospital.js";
import Doctor from "../models/Doctor.js";
import { createBloodBankForHospital } from "../utils/createBloodBankForHospital.js";

// import multer from 'multer';
// import path from 'path';




// Register hospital function
export const registerHospital = async (req, res) => {
    try {
        // Extract form data from the request body
        const { hospitalName, email, password, contact, address, registrationNumber, about, websiteUrl } = req.body;

        // Check if the email is already registered
        const existingHospital = await Hospital.findOne({ email });
        if (existingHospital) {
            return res.status(400).json({ message: "Hospital already registered." });
        }

        // Parse the address from JSON string to object
        let parsedAddress = {};
        if (address) {
            try {
                parsedAddress = JSON.parse(address);  // Convert the address from JSON string to object
            } catch (error) {
                return res.status(400).json({ message: "Invalid address format." });
            }
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new hospital record
        const hospital = new Hospital({
            hospitalName,
            email,
            password: hashedPassword,
            contact,
            address: parsedAddress,  // Store the parsed address object
            registrationNumber,
            about,
            profilePhoto: null,  // Default to null initially; will be updated after file upload
            websiteUrl,
        });

        // If a file was uploaded, update the hospital's profilePhoto field
        if (req.file) {
            hospital.profilePhoto = `/uploads/profiles/${req.file.filename}`;
        }

        // Save the hospital record to the database
        await hospital.save();

        // Send success response
        res.status(201).json({ message: "Hospital registered successfully." });
    } catch (error) {
        // Catch any errors and send a response
        console.error('Error during registration:', error);
        res.status(500).json({ message: error.message });
    }
};


// Register a Doctor
export const registerDoctor = async (req, res) => {
    try {
        // Extract form data from the request body
        const { fullName, email, password, licenseNumber, specialization, experience, daysAvailable, clinicTimings, aboutYourself, websiteUrl, clinicAddress } = req.body;

        // Check if the email is already registered
        const existingDoctor = await Doctor.findOne({ email });
        if (existingDoctor) return res.status(400).json({ message: "Doctor already registered." });


        // Parse the address from JSON string to object
        let parsedclinicAddress = {};
        if (clinicAddress) {
            try {
                parsedclinicAddress = JSON.parse(clinicAddress);  // Convert the address from JSON string to object
            } catch (error) {
                return res.status(400).json({ message: "Invalid address format." });
            }
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);


        // Create and save the doctor
        const doctor = new Doctor({
            fullName,
            email,
            password: hashedPassword,
            licenseNumber,
            specialization,
            experience,
            daysAvailable,
            clinicTimings,
            aboutYourself,
            profilePhoto:null,
            websiteUrl,
            clinicAddress: parsedclinicAddress,
        });

        // If a file was uploaded, update the doctor's profilePhoto field
        if (req.file) {
            doctor.profilePhoto = `/uploads/profiles/${req.file.filename}`;
        }

        await doctor.save();

        res.status(201).json({ message: "Doctor registered successfully." });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


// Login for Both
export const login = async (req, res) => {
    try {
        const { email, password, userType } = req.body;

        // Determine the model based on userType
        const Model = userType === "hospital" ? Hospital : Doctor;

        // Find user by email
        const user = await Model.findOne({ email });
        if (!user) return res.status(404).json({ message: "User not found." });

        // Compare passwords
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) return res.status(400).json({ message: "Invalid credentials." });

        if (userType === "hospital") {
            await createBloodBankForHospital(user._id);  // Call your existing function to create blood bank data
        }

        // Generate JWT
        const token = generateToken(user._id, userType); // Pass user ID and userType to generate the token

        res.status(200).json({ message: "Login successful.", token });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getUserProfile = async (req, res) => {
    try {
        const { userType, userId } = req.user; // Extract userType and userId from the JWT (set by authMiddleware)

        // Determine the model based on the userType
        const Model = userType === "hospital" ? Hospital : Doctor;

        // Find the user by ID (either a hospital or a doctor)
        const user = await Model.findById(userId).select('-password'); // Exclude the password field from the response

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Return the user data (customize based on your needs)
        res.json({
            fullName: user.hospitalName || user.fullName, // Adjust depending on userType
            email: user.email,
            profilePhoto: user.profilePhoto || null,
            contact: user.contact || null, // Add other details as needed
            // You can add more fields depending on what you want to return in the profile
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
};
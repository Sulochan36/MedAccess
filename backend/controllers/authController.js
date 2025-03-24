import bcrypt from "bcryptjs";
import { generateToken, verifyToken } from "../utils/jwt.js";
import Hospital from "../models/Hospital.js";
import Doctor from "../models/Doctor.js";
import { createBloodBankForHospital } from "../utils/createBloodBankForHospital.js";
import cloudinary from "../lib/cloudinary.js";

// import multer from 'multer';
// import path from 'path';




// Register hospital function
export const registerHospital = async (req, res) => {
    try {
        // Extract form data from the request body
        const { hospitalName, email, password, contact, address, registrationNumber, about, profilePhoto, websiteUrl } = req.body;

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
            profilePhoto,  // Default to null initially; will be updated after file upload
            websiteUrl,
        });

        if (profilePhoto) {
            // Remove the "data:image/png;base64," part of the Base64 string
            const base64Image = profilePhoto.split(',')[1];

            // Upload image to Cloudinary
            const result = await cloudinary.uploader.upload(`data:image/png;base64,${base64Image}`, {
                folder: 'hospital_profiles',
                use_filename: true,
                unique_filename: false,
                resource_type: 'image',
            });

            // Store the Cloudinary image URL in the profilePhoto field
            hospital.profilePhoto = result.secure_url;
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
        const { fullName, email, password, licenseNumber, specialization, experience, daysAvailable, clinicTimings, aboutYourself, websiteUrl, clinicAddress, profilePhoto } = req.body;

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
            profilePhoto,
            websiteUrl,
            clinicAddress: parsedclinicAddress,
        });

        // If a file was uploaded, update the doctor's profilePhoto field
        if (profilePhoto) {
            // Remove the "data:image/png;base64," part of the Base64 string
            const base64Image = profilePhoto.split(',')[1];

            // Upload image to Cloudinary
            const result = await cloudinary.uploader.upload(`data:image/png;base64,${base64Image}`, {
                folder: 'doctor_profiles',
                use_filename: true,
                unique_filename: false,
                resource_type: 'image',
            });

            // Store the Cloudinary image URL in the profilePhoto field
            doctor.profilePhoto = result.secure_url;
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

export const getHospitalProfile = async (req, res) => {
    try {
        // Extract userId from the JWT (set by authMiddleware)
        const { userId } = req.user;

        // Check if userId exists
        if (!userId) {
            return res.status(400).json({ message: "User ID is missing from the request" });
        }

        // Always set the Model to Hospital (since we only want this for hospitals)
        const Model = Hospital;

        // Find the user by ID (hospital) and exclude the password field
        const user = await Model.findById(userId).select('-password');

        // If user not found, return 404 error
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Check if address exists and structure it correctly
        const address = user.address || {};
        const addressFields = {
            street: address.street || '',
            city: address.city || '',
            state: address.state || '',
            zipCode: address.zipCode || '',
        };

        // Return the user data (hospital specific)
        res.json({
            fullName: user.hospitalName || "",  // Only return hospitalName
            email: user.email,
            profilePhoto: user.profilePhoto || null,
            contact: user.contact || null,
            about: user.about || "",  // Include about field if present
            address: addressFields,  // Send structured address object
            websiteUrl: user.websiteUrl || "",  // If applicable
        });
    } catch (error) {
        // Log any errors that occur
        console.error(error);

        // Return a 500 Internal Server Error with a message
        res.status(500).json({ message: "Internal server error" });
    }
};





// Get Hospital Details with Populated Doctors
export const getHospitalDetails = async (req, res) => {
    try {
        // Fetch the hospital by ID and populate the 'doctors' field
        const hospital = await Hospital.findById(req.params.hospitalId).populate('doctors');

        // If the hospital doesn't exist, return a 404 error
        if (!hospital) {
            return res.status(404).json({ message: 'Hospital not found' });
        }

        // Return the hospital details along with the populated doctors array
        res.json(hospital);
    } catch (error) {
        // Handle any errors that occur
        res.status(500).json({ message: error.message });
    }
};




export const updateHospital = async (req, res) => {
    try {
        const { hospitalId } = req.params;  
        
        const updates = req.body;           // Data to update
        console.log("Updated data received from frontend: ", updates);  // Debugging log

        // Check if hospital exists
        const hospital = await Hospital.findById(hospitalId);
        if (!hospital) {
            return res.status(404).json({ message: "Hospital not found" });
        }

        // If profile photo is updated, upload it to Cloudinary
        if (updates.profilePhoto && updates.profilePhoto !== hospital.profilePhoto) {
            console.log("Before Cloudinary upload");
            const base64Image = updates.profilePhoto.split(',')[1]; // Remove prefix if it's base64

            console.log("Cloudinary upload in progress...");
            const result = await cloudinary.uploader.upload(`data:image/png;base64,${base64Image}`, {
                folder: 'hospital_profiles',
                use_filename: true,
                unique_filename: false,
                resource_type: 'image',
            });
            console.log("Cloudinary upload result: ", result);

            // Set the URL of the uploaded image in the profilePhoto field
            updates.profilePhoto = result.secure_url;
        } else {
            // If no new profile photo is provided, remove the profile photo key from updates
            delete updates.profilePhoto;
        }

        // Update hospital details with the new data
        const updatedHospital = await Hospital.findByIdAndUpdate(hospitalId, updates, { new: true });

        // Respond with the updated hospital details
        res.status(200).json({
            message: "Hospital details updated successfully",
            hospital: updatedHospital,
        });

    } catch (error) {
        console.error("Error updating hospital:", error);  // Log any error
        res.status(500).json({ message: error.message });
    }
};



export const updateDoctorProfile = async (req, res) => {
    try {
        const doctorId = req.params.id;  // Get doctor ID from URL params
        const {
            fullName,
            email,
            contact,  // Added contact to the update
            clinicName,  // Added clinicName to the update
            licenseNumber,  // Added licenseNumber to the update
            specialization,
            experience,
            aboutYourself,
            profilePhoto,
            websiteUrl,
            clinicAddress
        } = req.body;

        // Check if the doctor exists in the database
        const doctor = await Doctor.findById(doctorId);
        if (!doctor) {
            return res.status(404).json({ message: "Doctor not found." });
        }

        // Update doctor profile fields with provided data (if present)
        doctor.fullName = fullName || doctor.fullName;
        doctor.email = email || doctor.email;
        doctor.contact = contact || doctor.contact;  // Ensure contact is updated if provided
        doctor.clinicName = clinicName || doctor.clinicName;  // Ensure clinicName is updated if provided
        doctor.licenseNumber = licenseNumber || doctor.licenseNumber; 
        doctor.specialization = specialization || doctor.specialization;
        doctor.experience = experience || doctor.experience;
        doctor.aboutYourself = aboutYourself || doctor.aboutYourself;
        doctor.websiteUrl = websiteUrl || doctor.websiteUrl;

        // If clinicAddress is provided and valid, parse and update it
        if (clinicAddress) {
            try {
                doctor.clinicAddress = JSON.parse(clinicAddress);  // Ensure clinicAddress is a valid object
            } catch (error) {
                return res.status(400).json({ message: "Invalid clinic address format." });
            }
        }

        // If a new profile photo is provided, upload it to Cloudinary and update the profile
        if (profilePhoto && profilePhoto !== doctor.profilePhoto) {
            const base64Image = profilePhoto.split(',')[1];  // Remove base64 prefix
            const result = await cloudinary.uploader.upload(`data:image/png;base64,${base64Image}`, {
                folder: 'doctor_profiles',
                use_filename: true,
                unique_filename: false,
                resource_type: 'image',
            });
            doctor.profilePhoto = result.secure_url;  // Update profile photo URL with Cloudinary URL
        }

        // Save the updated doctor profile to the database
        await doctor.save();

        // Respond with success message and updated doctor profile
        res.status(200).json({ message: "Doctor profile updated successfully." });

    } catch (error) {
        // Log error for debugging purposes
        console.error("Error updating doctor profile:", error);
y
        // Send error response
        res.status(500).json({ message: error.message });
    }
};


// Controller to get the doctor's profile
export const getDoctorProfile = async (req, res) => {
    try {
        const doctor = await Doctor.findById(req.user.userId).select('-password'); // Assuming you are using JWT to authenticate and the userId is decoded from the token

        if (!doctor) {
            return res.status(404).json({ message: 'Doctor profile not found' });
        }

        // Send the doctor profile data
        res.status(200).json({
            fullName: doctor.fullName,
            email: doctor.email,
            contact: doctor.contact, // Ensure that 'contact' is part of the schema, or adjust accordingly
            licenseNumber: doctor.licenseNumber,
            specialization: doctor.specialization,
            experience: doctor.experience,
            aboutYourself: doctor.aboutYourself,
            profilePhoto: doctor.profilePhoto,
            websiteUrl: doctor.websiteUrl,
            clinicName: doctor.clinicName,
            clinicTimings: doctor.clinicTimings,
            daysAvailable: doctor.daysAvailable,
            clinicAddress: doctor.clinicAddress,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error fetching doctor profile' });
    }
};


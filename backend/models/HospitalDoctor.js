import mongoose from 'mongoose';

const doctorSchema = new mongoose.Schema(
    {
        hospital: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Hospital',
            required: true,
        },
        fullName: {
            type: String,
            required: true,
            trim: true,
        },
        profilePicture: {
            type: String, // URL or file path
        },
        specialization: {
            type: String,
            required: true,
        },
        experience: {
            type: Number,
            required: true,
            min: 0,
        },
        qualification: {
            type: String,
            required: true,
        },
        contactNumber: {
            type: String,
            required: true,
            match: /^\d{10}$/, // Validates 10-digit number
        },
        email: {
            type: String,
            match: /^\S+@\S+\.\S+$/, // Optional email validation
        },
        visitingHours: {
            type: String, // Free text format
        },
        fee: {
            type: Number,
            min: 0, // Optional but cannot be negative
        },
        availabilityStatus: {
            type: String,
            required: true,
            enum: ['Available', 'Unavailable'], // Only these two statuses
        },
    },
    { timestamps: true } // Automatically adds createdAt and updatedAt
);

export default mongoose.model('HospitalDoctor', doctorSchema);

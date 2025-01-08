import mongoose from 'mongoose';

const doctorSchema = new mongoose.Schema({
    fullName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    licenseNumber: { type: String, required: true },
    specialization: { type: String, required: true },
    experience: { type: Number, required: true },
    daysAvailable: { type: [String], required: true }, // Example: ["Monday", "Tuesday"]
    clinicTimings: { type: String, required: true }, // Example: "9:00 AM - 5:00 PM"
    aboutYourself: { type: String },
    profilePhoto: { type: String },
    websiteUrl: { type: String },
    affiliateHospital: { type: mongoose.Schema.Types.ObjectId, ref: "Hospital", default: null },
    clinicAddress: {
        street: { type: String },
        city: { type: String },
        state: { type: String },
        zipCode: { type: String },
    },
}, { timestamps: true });

export default mongoose.model("Doctor", doctorSchema);

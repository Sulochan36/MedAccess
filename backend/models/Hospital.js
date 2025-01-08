import mongoose from 'mongoose';

const hospitalSchema = new mongoose.Schema({
    hospitalName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    contact: { type: String, required: true },
    address: {
        street: { type: String, required: true },
        city: { type: String, required: true },
        state: { type: String, required: true },
        zipCode: { type: String, required: true },
    },
    registrationNumber: { type: String, required: true },
    about: { type: String },
    profilePhoto: { type: String },
    websiteUrl: { type: String },
    doctors: [{ type: mongoose.Schema.Types.ObjectId, ref: "HospitalDoctor" }], // Linked list of associated doctors
}, { timestamps: true });

export default mongoose.model("Hospital", hospitalSchema);

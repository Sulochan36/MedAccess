import mongoose from 'mongoose';

const nonMedicalStaffSchema = new mongoose.Schema({
    hospitalId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Hospital",
        required: true
    },
    name: {
        type: String,
        required: true
    },
    role: {
        type: String,
        required: true
    },
    department: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    phone: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const NonMedicalStaff = mongoose.model('NonMedicalStaff', nonMedicalStaffSchema);

export default NonMedicalStaff;

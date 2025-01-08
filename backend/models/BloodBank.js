import mongoose from 'mongoose';


const bloodBankSchema = new mongoose.Schema({
    hospital: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Hospital', // Reference to the Hospital model
        required: true,
    },
    bloodGroup: {
        type: String,
        required: true,
        enum: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'], // Fixed blood groups
    },
    unitsAvailable: {
        type: Number,
        required: true,
        min: 0, // Cannot have negative quantities
    },
    lastUpdated: {
        type: Date,
        default: Date.now,
    },
}, { timestamps: true });

export default mongoose.model("BloodBank", bloodBankSchema);

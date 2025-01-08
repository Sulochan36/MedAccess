

import mongoose from 'mongoose';

const bedSchema = new mongoose.Schema({
    hospital: { type: mongoose.Schema.Types.ObjectId, ref: "Hospital", required: true }, // Associated hospital
    bedType: { type: String, required: true }, // Example: "ICU", "General Ward"
    totalBeds: { type: Number, required: true },
    occupiedBeds: { type: Number, required: true },
    availableBeds: { type: Number, required: true }, // Available Beds (calculated: totalBeds - occupiedBeds)
    pricePerDay: { type: Number, required: true },
    lastUpdated: { type: Date, default: Date.now },
    wardSectionName: { type: String, default: '' }, // Optional field for section name
}, { timestamps: true });

export default mongoose.model("Bed", bedSchema);

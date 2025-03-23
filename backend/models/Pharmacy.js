import mongoose from "mongoose";

const pharmacySchema = new mongoose.Schema({
    hospitalId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Hospital",
        required: true
    },

    medicineName: { type: String, required: true },
    category: { type: String, required: true },
    brand: { type: String },
    quantity: { type: Number, required: true },
    price: { type: Number, required: true },
    expiryDate: { type: Date, required: true },
    supplier: { type: String },
    addedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },

    createdAt: { type: Date, default: Date.now },
});

const Pharmacy = mongoose.model("Pharmacy", pharmacySchema);
export default Pharmacy;

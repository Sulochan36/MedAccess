import express from "express";
import { addMedicine, getMedicinesByHospital, updateMedicine, deleteMedicine } from "../controllers/pharmacyController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

// ✅ Add Medicine (Protected Route)
router.post("/add", authMiddleware, addMedicine);

// ✅ Get Medicines by Hospital
router.get("/:hospitalId", authMiddleware, getMedicinesByHospital);

// ✅ Update Medicine
router.put("/:id", authMiddleware, updateMedicine);

// ✅ Delete Medicine
router.delete("/:id", authMiddleware, deleteMedicine);

export default router;

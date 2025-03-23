// routes/nonMedicalStaffRoutes.js

import express from 'express';
import { addNonMedicalStaff, getNonMedicalStaffByHospital, updateNonMedicalStaff, deleteNonMedicalStaff } from '../controllers/nonMedicalStaffcontroller.js ';
import authMiddleware from '../middleware/authMiddleware.js';

const router = express.Router();

// ✅ Add Non-Medical Staff (Protected Route)
router.post("/add", authMiddleware, addNonMedicalStaff);

// ✅ Get Non-Medical Staff by Hospital
router.get("/:hospitalId", authMiddleware, getNonMedicalStaffByHospital);

// ✅ Update Non-Medical Staff
router.put("/update/:id", authMiddleware, updateNonMedicalStaff);

// ✅ Delete Non-Medical Staff
router.delete("/delete/:id", authMiddleware, deleteNonMedicalStaff);

export default router;

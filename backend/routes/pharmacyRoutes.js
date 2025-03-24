import express from "express";
import { addMedicine, getMedicinesByHospital, updateMedicine, deleteMedicine, searchMedicines } from "../controllers/pharmacyController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();


router.post("/add", authMiddleware, addMedicine);
router.get("/:hospitalId", authMiddleware, getMedicinesByHospital);
router.put("/:id", authMiddleware, updateMedicine);
router.delete("/:id", authMiddleware, deleteMedicine);
router.get('/search', authMiddleware, searchMedicines);


export default router;

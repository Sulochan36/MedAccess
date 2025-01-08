import express from "express";
import { getBloodGroupDetails, getBloodGroups, updateBloodUnits } from "../controllers/bloodBankController.js";
import authMiddleware from "../middleware/authMiddleware.js";


const router = express.Router();

router.get("/", authMiddleware, getBloodGroups); // Get all blood groups
router.put("/update", authMiddleware, updateBloodUnits); // Update blood units
router.get('/:bloodGroup',getBloodGroupDetails);

export default router;

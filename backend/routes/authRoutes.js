import express from 'express';
import { login, registerDoctor, registerHospital, getHospitalDetails, updateDoctorProfile, updateHospital, getDoctorProfile, getHospitalProfile } from '../controllers/authController.js'; // Import the updateDoctor function
import authMiddleware from '../middleware/authMiddleware.js';

const router = express.Router();

// Existing routes for registering and logging in
router.post("/hospital/register", registerHospital);
router.post("/doctor/register", registerDoctor);
router.post("/login", login);
router.get("/profile", authMiddleware, getHospitalProfile);

router.get("/doctor/profile", authMiddleware, getDoctorProfile);

// New route to update doctor profile
router.put("/doctor/update/:id", authMiddleware, updateDoctorProfile);  // Add this route for updating doctor profile

// New route to get hospital details with doctors
router.get("/hospitals/:hospitalId", authMiddleware, getHospitalDetails);
router.put("/hospitals/:hospitalId", authMiddleware, updateHospital);

export default router;

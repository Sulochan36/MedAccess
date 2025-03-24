// routes/hdoctorRoutes.js
import express from 'express';
import { addDoctor, getDoctorsByHospital, updateDoctor, deleteDoctor } from '../controllers/doctorController.js';
import authMiddleware from '../middleware/authMiddleware.js';

const router = express.Router();


router.post('/addhdoctor', authMiddleware, addDoctor);

// Get all doctors for a specific hospital
router.get('/', authMiddleware, getDoctorsByHospital);

// Update a doctor by ID
router.put('/:id', authMiddleware, updateDoctor);

// Delete a doctor by ID
router.delete('/:id', authMiddleware, deleteDoctor);

export default router;

// routes/hdoctorRoutes.js
import express from 'express';
import multer from 'multer';
import path from 'path';
import { addDoctor, getDoctorsByHospital, updateDoctor, deleteDoctor } from '../controllers/doctorController.js';
import authMiddleware from '../middleware/authMiddleware.js';

const router = express.Router();

// Set up multer for image uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/hdoctors');
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
    }
});

const upload = multer({ storage });

// Add a new doctor with profile picture upload
router.post('/addhdoctor', authMiddleware, upload.single('profilePicture'), addDoctor);

// Get all doctors for a specific hospital
router.get('/', authMiddleware, getDoctorsByHospital);

// Update a doctor by ID
router.put('/:id', authMiddleware, upload.single('profilePicture'), updateDoctor);

// Delete a doctor by ID
router.delete('/:id', authMiddleware, deleteDoctor);

export default router;

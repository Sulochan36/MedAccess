import express from 'express';
import User from '../models/User.js';
import authMiddleware from '../middleware/authMiddleware.js';
import { getBlood, getDoctorDetails, getDoctors, getHospitalDetails, getHospitals } from '../controllers/visitorController.js';

const router = express.Router();

// Get all doctors (public route)
router.get('/doctors', getDoctors);

// Get all hospitals (public route)
router.get('/hospitals', getHospitals);
router.get('/bloodbank', getBlood);

// Get doctor details (protected route)
router.get('/doctors/:id', getDoctorDetails);

// Get hospital details (protected route)
router.get('/hospitals/:id', getHospitalDetails);



export default router;
import express from 'express';

import { validateLogin, validateRegistration } from '../middleware/validate.js';
import { getUserProfile, login, registerDoctor, registerHospital } from '../controllers/authController.js';
import authMiddleware from '../middleware/authMiddleware.js';





const router = express.Router();

router.post("/hospital/register",validateRegistration, registerHospital);
router.post("/doctor/register", validateRegistration, registerDoctor);
router.post("/login", validateLogin, login);

router.get("/profile", authMiddleware, getUserProfile);

export default router;
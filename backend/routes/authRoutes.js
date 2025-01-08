import express from 'express';
import multer from 'multer';
import path from 'path';
import { validateLogin, validateRegistration } from '../middleware/validate.js';
import { getUserProfile, login, registerDoctor, registerHospital } from '../controllers/authController.js';
import authMiddleware from '../middleware/authMiddleware.js';


// Multer configuration for file uploads
const storage = (folder) => multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, `./uploads/profiles/${folder}`);  // Store images in the profiles folder
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
    }
});

const uploadDoctor = multer({ storage: storage('doctors') }).single('profilePhoto');
const uploadHospital = multer({ storage: storage('hospitals') }).single('profilePhoto');



const router = express.Router();

router.post("/hospital/register", uploadHospital,validateRegistration, registerHospital);
router.post("/doctor/register", uploadDoctor, validateRegistration, registerDoctor);
router.post("/login", validateLogin, login);

router.get("/profile", authMiddleware, getUserProfile);

export default router;
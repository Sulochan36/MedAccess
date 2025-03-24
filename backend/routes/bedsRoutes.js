// routes/bedsRoutes.js

import express from 'express';
import { createBed, getAllBeds, updateBed, deleteBed, getBedsByHospital } from '../controllers/bedController.js';
import authMiddleware from '../middleware/authMiddleware.js';

const router = express.Router();

// CRUD Routes
router.post('/add', authMiddleware, createBed);       // Add a new bed (requires auth)
router.get('/', authMiddleware, getAllBeds);          // Get all bed details for the logged-in user's hospital (requires auth)
router.put('/:id', authMiddleware, updateBed);        // Update a bed (requires auth)
router.delete('/:id', authMiddleware, deleteBed); 
router.get('/bedspage', getBedsByHospital);    // Delete a bed (requires auth)

export default router;

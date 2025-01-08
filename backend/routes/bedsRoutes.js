// routes/bedsRoutes.js

import express from 'express';
import { createBed, getAllBeds, updateBed, deleteBed } from '../controllers/bedController.js';
import authMiddleware from '../middleware/authMiddleware.js';

const router = express.Router();

// CRUD Routes
router.post('/add', authMiddleware, createBed);       // Add a new bed (requires auth)
router.get('/', authMiddleware, getAllBeds);          // Get all bed details for the logged-in user's hospital (requires auth)
router.put('/:id', authMiddleware, updateBed);        // Update a bed (requires auth)
router.delete('/:id', authMiddleware, deleteBed);     // Delete a bed (requires auth)

export default router;

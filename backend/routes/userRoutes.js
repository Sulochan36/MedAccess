import express from 'express';
import User from '../models/User.js';
import authMiddleware from '../middleware/authMiddleware.js';

const router = express.Router();

// Get all doctors (public route)
router.get('/doctors', async (req, res) => {
  try {
    const doctors = await User.find({ role: 'doctor' });
    res.status(200).json(doctors);
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong' });
  }
});

// Get all hospitals (public route)
router.get('/hospitals', async (req, res) => {
  try {
    const hospitals = await User.find({ role: 'hospital' });
    res.status(200).json(hospitals);
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong' });
  }
});

// Get doctor details (protected route)
router.get('/doctors/:id', async (req, res) => {
  try {
    const doctor = await User.findById(req.params.id);
    if (!doctor || doctor.role !== 'doctor') {
      return res.status(404).json({ message: 'Doctor not found' });
    }
    res.status(200).json(doctor);
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong' });
  }
});

// Get hospital details (protected route)
router.get('/hospitals/:id', async (req, res) => {
  try {
    const hospital = await User.findById(req.params.id);
    if (!hospital || hospital.role !== 'hospital') {
      return res.status(404).json({ message: 'Hospital not found' });
    }
    res.status(200).json(hospital);
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong' });
  }
});

// Get user profile (protected route)
router.get('/profile', authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json(user);
  } catch (error) {
    console.error('Error fetching profile data:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Update user profile (protected route)
router.put('/profile', authMiddleware, async (req, res) => {
  try {
    const updatedData = { ...req.body };

    // Update the user document
    const user = await User.findByIdAndUpdate(req.user.id, updatedData, {
      new: true, // Return the updated document
      runValidators: true, // Ensure validations are run
    }).select('-password');

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json(user);
  } catch (error) {
    console.error('Error updating profile data:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

export default router;
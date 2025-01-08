// server.js
import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cors from 'cors';  // Import cors package
import path from 'path';

import authRoutes from './routes/authRoutes.js';
import userRoutes from './routes/userRoutes.js';
import bloodBankRoutes from './routes/bloodBankRoutes.js';
import bedsRoutes from './routes/bedsRoutes.js';
import hdoctorRoutes from './routes/hdoctorRoutes.js';

dotenv.config();
const app = express();

// Middleware
app.use(express.json());
app.use(cors({
    origin: 'http://localhost:5173',  // Allow requests from your frontend (Vite)
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ['Content-Type', 'Authorization']
}));
 // Enable CORS for cross-origin requests

app.use('/uploads', express.static('uploads'));

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('MongoDB Connected'))
    .catch((err) => console.error(err));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/blood-bank', bloodBankRoutes);
app.use('/api/beds', bedsRoutes);
app.use('/api/hospitaldoctors', hdoctorRoutes);
app.use('/api/users', userRoutes);
app.use('/uploads', express.static(path.join(process.cwd(), 'uploads')));

// Port
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

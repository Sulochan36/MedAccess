import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['doctor', 'hospital'], required: true },
  bio: { type: String }, // Doctor's specialization or description
  experience: { type: Number }, // Years of experience
  education: { type: String }, // Educational qualifications
  reviews: { type: [String], default: [] }, // Array of reviews
  contactInfo: { type: String }, // Contact details
  consultationHours: { type: String }, // Doctor's working hours
  address: { type: String }, // Hospital address
  emergencyAvailable: { type: Boolean }, // Hospital emergency availability
  departments: { type: [String], default: [] }, // Departments available in the hospital
  numberOfBeds: { type: Number }, // Number of beds in the hospital
  hoursOpen: { type: String }, // Hospital operating hours
  bloodOrganBankAvailable: { type: Boolean }, // Blood/organ bank availability
});

// Hash password before saving the user document
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

export default mongoose.model('User', userSchema);
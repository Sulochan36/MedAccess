import BloodBank from "../models/BloodBank.js";
import Doctor from "../models/Doctor.js";
import Hospital from "../models/Hospital.js";


// Get all doctors (public route)
export const getDoctors = async (req, res) =>{
    try {
        const doctors = await Doctor.find();
        res.status(200).json(doctors);
    } catch (error) {
        res.status(500).json({ message: 'Something went wrong' });
    }
}


// Get all hospitals (public route)
export const getHospitals = async(req,res) =>{
    try {
        const hospitals = await Hospital.find();
        res.status(200).json(hospitals);
    } catch (error) {
        res.status(500).json({ message: 'Something went wrong' });
    }
}


// Get doctor details (protected route)
export const getDoctorDetails = async(req, res) =>{
    try {
        const doctor = await Doctor.findById(req.params.id);
        if (!doctor) {
            return res.status(404).json({ message: 'Doctor not found' });
        }
        res.status(200).json(doctor);
    } catch (error) {
        res.status(500).json({ message: 'Something went wrong' });
    }
}


// Get hospital details (protected route)
export const getHospitalDetails = async(req, res) =>{
    try {
        const hospital = await Hospital.findById(req.params.id);
        if (!hospital) {
            return res.status(404).json({ message: 'Hospital not found' });
        }
        res.status(200).json(hospital);
    } catch (error) {
        res.status(500).json({ message: 'Something went wrong' });
    }
}

export const getBlood = async (req, res) => {
    try {
        const blood = await BloodBank.find();
        res.status(200).json(blood);
    } catch (error) {
        res.status(500).json({ message: 'Something went wrong' });
    }
}





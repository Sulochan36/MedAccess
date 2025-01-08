import BloodBank from '../models/BloodBank.js';

export const createBloodBankForHospital = async (hospitalId) => {
    const bloodGroups = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];

    try {
        // Check if blood bank data for this hospital already exists
        const existingBloodBank = await BloodBank.findOne({ hospital: hospitalId });
        if (existingBloodBank) return; // No need to create if blood bank data already exists

        // Create blood bank data for each blood group with 0 units for the hospital
        const bloodBankData = bloodGroups.map(bloodGroup => ({
            hospital: hospitalId,
            bloodGroup: bloodGroup,
            unitsAvailable: 0, // Set units to 0 for initial data
        }));

        // Insert the blood bank data into the database
        await BloodBank.insertMany(bloodBankData);
        console.log("Blood bank data created successfully for hospital:", hospitalId);
    } catch (error) {
        console.error("Error creating blood bank data for hospital:", error);
    }
};

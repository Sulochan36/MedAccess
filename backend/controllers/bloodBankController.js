import BloodBank from "../models/BloodBank.js";


// Get all blood groups
export const getBloodGroups = async (req, res) => {

    const hospitalId = req.user.userId;

    try {
        const bloodGroups = await BloodBank.find({ hospital: hospitalId }).populate("hospital", "name");
        res.status(200).json(bloodGroups);
    } catch (error) {
        res.status(500).json({ message: "Error fetching blood groups", error });
    }
};

// Update blood group units
export const updateBloodUnits = async (req, res) => {
    const hospitalId = req.user.userId;
    const { bloodGroup, unitsAvailable } = req.body;
    console.log("Request body:", { bloodGroup, unitsAvailable });  // Log the request body

    // Ensure the required fields are present
    if (!bloodGroup || unitsAvailable === undefined) {
        return res.status(400).json({ message: "Blood group and unitsAvailable are required" });
    }

    try {
        const bloodBank = await BloodBank.findOneAndUpdate(
            { bloodGroup, hospital: hospitalId },
            { unitsAvailable, lastUpdated: Date.now() },
            { new: true }
        );

        if (!bloodBank) {
            return res.status(404).json({ message: "Blood group not found" });
        }

        res.status(200).json(bloodBank);
    } catch (error) {
        console.error("Error updating blood units", error);
        res.status(500).json({ message: "Error updating blood units", error });
    }
};

// Example endpoint in Express.js (Node.js)
export const getBloodGroupDetails = async(req,res) => {
    const { bloodGroup } = req.params;

    try {
        // Fetch blood data for the specific blood group, and populate the hospital details
        const bloodData = await BloodBank.find({ bloodGroup })
            .populate('hospital', 'hospitalName address contact')  // Populate hospital with name, address, and contact
            .exec();

        res.json(bloodData);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error fetching data');
    }
}





// controllers/bedController.js

import Bed from '../models/Beds.js';

export const createBed = async (req, res) => {
    try {
        const { bedType, totalBeds, occupiedBeds, pricePerDay, wardSectionName } = req.body;

        // Calculate availableBeds from totalBeds and occupiedBeds if not passed
        const availableBeds = totalBeds - occupiedBeds;

        // Create a new bed associated with the user's hospital (userId)
        const newBed = new Bed({
            hospital: req.user.userId,  // Use the hospital ID from the JWT
            bedType,
            totalBeds,
            availableBeds,  // Use the calculated or passed availableBeds
            occupiedBeds,
            pricePerDay,
            wardSectionName,
        });

        await newBed.save();
        res.status(201).json(newBed);
    } catch (err) {
        res.status(500).json({ message: 'Error adding bed details', error: err.message });
    }
};

export const getAllBeds = async (req, res) => {
    try {
        const hospitalId = req.user.userId;  // Extract hospitalId from JWT payload
        const beds = await Bed.find({ hospital: hospitalId });  // Fetch beds for the specific hospital

        // Send an empty array if no beds are found
        res.json(beds);  // Empty array is fine, no need to send a 404 for no data

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error. Could not fetch beds.' });
    }
};

export const updateBed = async (req, res) => {
    const { id } = req.params;
    try {
        const updatedBed = await Bed.findOneAndUpdate(
            { _id: id, hospital: req.user.userId },  // Ensure only the hospital associated with the user can update
            req.body,
            { new: true }
        );

        if (!updatedBed) {
            return res.status(404).json({ message: 'Bed not found or you do not have permission to edit this bed' });
        }

        res.status(200).json(updatedBed);
    } catch (err) {
        res.status(500).json({ message: 'Error updating bed details', error: err.message });
    }
};

export const deleteBed = async (req, res) => {
    const { id } = req.params;
    try {
        const deletedBed = await Bed.findOneAndDelete(
            { _id: id, hospital: req.user.userId }  // Ensure only the hospital associated with the user can delete
        );

        if (!deletedBed) {
            return res.status(404).json({ message: 'Bed not found or you do not have permission to delete this bed' });
        }

        res.status(200).json({ message: 'Bed deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: 'Error deleting bed details', error: err.message });
    }
};



export const getBedsByHospital = async (req, res) => {
    try {
        // Aggregate query to get beds grouped by hospital
        const beds = await Bed.aggregate([
            {
                $lookup: {
                    from: 'hospitals',  // Reference to the "hospitals" collection
                    localField: 'hospital',  // Field in the 'Beds' collection
                    foreignField: '_id',  // Reference field in the 'hospitals' collection
                    as: 'hospitalDetails',  // Name of the array that will hold the hospital data
                }
            },
            {
                $unwind: '$hospitalDetails',  // Unwind the 'hospitalDetails' array
            },
            {
                $group: {
                    _id: '$hospital',  // Group by hospital ID
                    hospitalName: { $first: '$hospitalDetails.name' },  // Get the hospital name
                    hospitalProfilePhoto: { $first: '$hospitalDetails.profilePhoto' },  // Get the hospital profile photo
                    beds: {
                        $push: {
                            bedType: '$bedType',
                            totalBeds: '$totalBeds',
                            availableBeds: '$availableBeds',
                            occupiedBeds: '$occupiedBeds',
                            pricePerDay: '$pricePerDay',
                        }
                    }
                }
            },
            {
                $project: {
                    hospitalName: 1,  // Include hospital name
                    hospitalProfilePhoto: 1,  // Include hospital profile photo
                    beds: 1  // Include the beds array
                }
            }
        ]);

        // Debugging: Check if we got the desired result
        console.log("Beds grouped by hospital:", beds);

        // Send the results as a JSON response
        if (beds.length === 0) {
            return res.status(404).json({ message: "No bed details found" });
        }

        res.json(beds);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error fetching bed details grouped by hospital', error: error.message });
    }
};


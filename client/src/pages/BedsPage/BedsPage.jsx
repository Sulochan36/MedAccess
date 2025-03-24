import React, { useEffect, useState } from 'react';

const BedsPage = () => {
    const [bedsData, setBedsData] = useState([]);
    const [selectedHospital, setSelectedHospital] = useState(null);
    const [error, setError] = useState(null);

    // Fetch data from the backend API using fetch
    useEffect(() => {
        // Fetch bed data from the API endpoint
        fetch('http://localhost:5000/api/beds/bedspage', {
            method: 'GET', // GET request to fetch data
        })
            .then((response) => response.json()) // Parse response as JSON
            .then((data) => {
                setBedsData(data); // Set the fetched data to the state
            })
            .catch((err) => {
                setError('Error fetching bed details');
                console.error(err); // Log the error to the console
            });
    }, []);

    // Handle clicking a hospital card to display its bed details
    const handleHospitalClick = (hospitalId) => {
        const hospital = bedsData.find((hospital) => hospital._id === hospitalId);
        setSelectedHospital(hospital); // Set the selected hospital's bed data
    };

    // Handle error and loading states
    if (error) return <div className="error-message">{error}</div>;

    if (!bedsData.length) return <div>Loading bed details...</div>;

    return (
        <div className="beds-page">
            <h1>Hospital Bed Details</h1>
            <div className="hospital-cards-container">
                {bedsData.map((hospital) => (
                    <div
                        key={hospital._id}
                        className="hospital-card"
                        onClick={() => handleHospitalClick(hospital._id)} // On card click, show bed details
                    >
                        <img
                            src={hospital.hospitalProfilePhoto}
                            alt={`${hospital.hospitalName} Profile`}
                            className="hospital-photo"
                        />
                        <h3>{hospital.hospitalName}</h3>
                        <p>Total Beds: {hospital.beds.reduce((total, bed) => total + bed.totalBeds, 0)}</p>
                        {/* Show total beds from all bed types */}
                    </div>
                ))}
            </div>

            {/* Conditionally render the selected hospital's bed details */}
            {selectedHospital && (
                <div className="bed-details">
                    <h2>Bed Details for {selectedHospital.hospitalName}</h2>
                    <table className="bed-details-table">
                        <thead>
                            <tr>
                                <th>Bed Type</th>
                                <th>Total Beds</th>
                                <th>Available Beds</th>
                                <th>Occupied Beds</th>
                                <th>Price per Day</th>
                            </tr>
                        </thead>
                        <tbody>
                            {selectedHospital.beds.map((bed, index) => (
                                <tr key={index}>
                                    <td>{bed.bedType}</td>
                                    <td>{bed.totalBeds}</td>
                                    <td>{bed.availableBeds}</td>
                                    <td>{bed.occupiedBeds}</td>
                                    <td>{bed.pricePerDay}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default BedsPage;

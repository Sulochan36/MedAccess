import React, { useEffect, useState } from 'react';
import axios from 'axios';
import BloodBankCard from '../../components/BloodBankCard/BloodBankCard';
import './BloodBankPage.css';

const BloodBankPage = () => {
  const [bloodData, setBloodData] = useState([]);
  const bloodGroups = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];

  useEffect(() => {
    const fetchBlood = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/users/bloodbank');
        setBloodData(response.data); // Set fetched blood bank data
      } catch (error) {
        console.error('Error fetching blood data:', error);
      }
    };

    fetchBlood();
  }, []);

  // Create a combined list of blood data with total units for each blood group
  const combinedBloodData = bloodGroups.map(bloodGroup => {
    // Find blood info for the current blood group
    const bloodInfo = bloodData.filter(blood => blood.bloodGroup === bloodGroup);

    // Ensure bloodInfo is an array and calculate the total units safely
    const totalAvailableUnits = Array.isArray(bloodInfo)
      ? bloodInfo.reduce((total, blood) => total + blood.unitsAvailable, 0)
      : 0;

    // Return the blood group data (including total available units)
    return {
      bloodGroup,
      totalAvailableUnits,
      lastUpdated: bloodInfo.length > 0 ? bloodInfo[0].lastUpdated : 'N/A', // Use first item for last updated
    };
  });

  return (
    <div>
      <div className="card-container">
        {combinedBloodData.map((blood, index) => (
          <BloodBankCard key={index} blood={blood} />
        ))}
      </div>
    </div>
  );
};

export default BloodBankPage;

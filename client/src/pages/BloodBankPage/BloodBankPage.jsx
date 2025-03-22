import React, { useEffect, useState } from 'react';
import axios from 'axios';
import BloodBankCard from '../../components/BloodBankCard/BloodBankCard';
import './BloodBankPage.css';

const BloodBankPage = () => {
  const [bloodData, setBloodData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedGroups, setSelectedGroups] = useState([]);

  const bloodGroups = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];

  useEffect(() => {
    const fetchBlood = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get('http://localhost:5000/api/users/bloodbank');
        setBloodData(response.data);
        setError(null);
      } catch (error) {
        setError('Error fetching blood data. Please try again later.');
        console.error('Error fetching blood data:', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchBlood();
  }, []);

  const handleGroupToggle = (group) => {
    setSelectedGroups(prev => {
      if (prev.includes(group)) {
        return prev.filter(g => g !== group);
      } else {
        return [...prev, group];
      }
    });
  };

  const clearFilters = () => {
    setSelectedGroups([]);
  };

  // Create a combined list of blood data with total units for each blood group
  const combinedBloodData = bloodGroups.map(bloodGroup => {
    const bloodInfo = bloodData.filter(blood => blood.bloodGroup === bloodGroup);
    const totalAvailableUnits = Array.isArray(bloodInfo)
      ? bloodInfo.reduce((total, blood) => total + blood.unitsAvailable, 0)
      : 0;

    return {
      bloodGroup,
      totalAvailableUnits,
      lastUpdated: bloodInfo.length > 0 ? bloodInfo[0].lastUpdated : 'N/A',
    };
  });

  // Filter blood data based on selected groups
  const filteredBloodData = selectedGroups.length === 0
    ? combinedBloodData
    : combinedBloodData.filter(blood => selectedGroups.includes(blood.bloodGroup));

  if (isLoading) {
    return (
      <div className="blood-bank-page">
        <div className="loading-container">
          <div className="loading-spinner"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="blood-bank-page">
        <div className="error-message">
          {error}
        </div>
      </div>
    );
  }

  return (
    <div className="blood-bank-page">
      <div className="page-layout">
        <aside className="sidebar">
          <div className="sidebar-content">
            <h2 className="sidebar-title">Filter Blood Groups</h2>
            <button
              className={`clear-filter-btn ${selectedGroups.length === 0 ? 'active' : ''}`}
              onClick={clearFilters}
            >
              Show All
            </button>
            <div className="blood-group-filters">
              {bloodGroups.map(group => (
                <label key={group} className="filter-option">
                  <input
                    type="checkbox"
                    checked={selectedGroups.includes(group)}
                    onChange={() => handleGroupToggle(group)}
                  />
                  <span className="filter-label">{group}</span>
                </label>
              ))}
            </div>
          </div>
        </aside>

        <main className="main-content">
          <h1 className="page-titleb">Blood Bank Inventory</h1>
          <div className="card-container">
            {filteredBloodData.map((blood, index) => (
              <BloodBankCard key={index} blood={blood} />
            ))}
          </div>
        </main>
      </div>
    </div>
  );
};

export default BloodBankPage;

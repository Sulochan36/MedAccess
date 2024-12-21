import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

import './Details.css';

const HospitalDetailsPage = () => {
  const { id } = useParams();
  const [hospital, setHospital] = useState(null);

  useEffect(() => {
    const fetchHospital = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/users/hospitals/${id}`);
        setHospital(response.data);
      } catch (error) {
        console.error('Error fetching hospital details:', error);
      }
    };
    fetchHospital();
  }, [id]);

  if (!hospital) return <div>Loading...</div>;

  return (
    <div className="hospital-details">
      <img src={hospital.profileImage} alt={`${hospital.name}`} className="hospital-photo" />
      <h1>{hospital.name}</h1>
      <p><strong>Address:</strong> {hospital.address}</p>
      <p><strong>Emergency Available:</strong> {hospital.emergencyAvailable ? 'Yes' : 'No'}</p>
      <p><strong>Departments:</strong> {hospital.departments.join(', ')}</p>
      <p><strong>Number of Beds:</strong> {hospital.numberOfBeds}</p>
      <p><strong>Hours Open:</strong> {hospital.hoursOpen}</p>
      <p><strong>Blood/Organ Bank Available:</strong> {hospital.bloodOrganBankAvailable ? 'Yes' : 'No'}</p>
      <div>
        <strong>Reviews/Rating:</strong>
        <ul>
          {hospital.reviews.length > 0 ? (
            hospital.reviews.map((review, index) => <li key={index}>{review}</li>)
          ) : (
            <li>No reviews available</li>
          )}
        </ul>
      </div>
    </div>
  );
};

export default HospitalDetailsPage;
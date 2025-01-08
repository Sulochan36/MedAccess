import { useEffect, useState } from 'react';
import HospitalCard from '../../components/HospitalCard/HospitalCard';
import axios from 'axios';
import './HospitalsPage.css';

const HospitalsPage = () => {
  const [hospitals, setHospitals] = useState([]);

  useEffect(() => {
    const fetchHospitals = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/users/hospitals');
        setHospitals(response.data);
      } catch (error) {
        console.error('Error fetching hospitals:', error);
      }
    };

    fetchHospitals();
  }, []);

  return (
    <div>
      <h1>All Hospitals</h1>
      <div className="hospitals-page">
            {hospitals.map(hospital => (
              <HospitalCard
                key={hospital._id}
                hospital = {hospital}
                
              />
            ))}
          </div>
    </div>
  );
};

export default HospitalsPage;
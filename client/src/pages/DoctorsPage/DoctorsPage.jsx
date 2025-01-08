import { useEffect, useState } from 'react';
import DoctorCard from '../../components/DoctorCard/DoctorCard';
import axios from 'axios';
import './DoctorsPage.css';

const DoctorsPage = () => {
  const [doctors, setDoctors] = useState([]);

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/users/doctors');
        console.log("doctor ki list",response.data);
        setDoctors(response.data);
      } catch (error) {
        console.error('Error fetching doctors:', error);
      }
    };

    fetchDoctors();
  }, []);

  return (
    <div>
      <h1>All Doctors</h1>
      <div className="doctor-cards-container">
        {doctors.map((doctor) => (
          <DoctorCard key={doctor._id} doctor={doctor} />
        ))}
      </div>
    </div>
  );
};

export default DoctorsPage;
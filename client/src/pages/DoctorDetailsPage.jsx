import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

import './Details.css';

const DoctorDetailsPage = () => {
  const { id } = useParams();
  const [doctor, setDoctor] = useState(null);

  useEffect(() => {
    const fetchDoctor = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/users/doctors/${id}`);
        setDoctor(response.data);
      } catch (error) {
        console.error('Error fetching doctor details:', error);
      }
    };
    fetchDoctor();
  }, [id]);

  if (!doctor) return <div>Loading...</div>;

  return (
    <div className="doctor-details">
      <img src={doctor.profileImage} alt={`${doctor.name}`} className="doctor-photo" />
      <h1>{doctor.name}</h1>
      <p><strong>Bio/Specialization:</strong> {doctor.bio}</p>
      <p><strong>Experience:</strong> {doctor.experience} years</p>
      <p><strong>Education:</strong> {doctor.education}</p>
      <p><strong>Consultation Hours:</strong> {doctor.consultationHours}</p>
      <p><strong>Contact Info:</strong> {doctor.contactInfo}</p>
      <div>
        <strong>Reviews:</strong>
        <ul>
          {doctor.reviews.length > 0 ? (
            doctor.reviews.map((review, index) => <li key={index}>{review}</li>)
          ) : (
            <li>No reviews available</li>
          )}
        </ul>
      </div>
    </div>
  );
};

export default DoctorDetailsPage;
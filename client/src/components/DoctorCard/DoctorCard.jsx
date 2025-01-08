import React from "react";
import { Link } from "react-router-dom"; // Import Link
import './DoctorCard.css';

const DoctorCard = ({ doctor }) => {
  const imageUrl = doctor.profilePhoto
    ? `http://localhost:5000${doctor.profilePhoto}`
    : '/default-avatar.png';

  return (
    <div className="doctor-card">
      <img src={imageUrl} alt={doctor.name} className="doctor-image" />
      <div className="doctor-info">
        <h2>{doctor.name}</h2>
        <p><strong>Specialization:</strong> {doctor.specialization}</p>
        <p><strong>Affiliated Hospital:</strong> {doctor.hospital}</p>
        <p><strong>Contact:</strong> {doctor.contact}</p>
      </div>
      {/* Update the button to be a Link */}
      <Link to={`/doctors/${doctor._id}`} className="appointment-btn">View Details</Link>
    </div>
  );
};

export default DoctorCard;

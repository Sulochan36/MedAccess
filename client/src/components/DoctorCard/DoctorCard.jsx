// import React from "react";
// import { Link } from "react-router-dom"; // Import Link
// import './DoctorCard.css';

// const DoctorCard = ({ doctor }) => {
//   const imageUrl = doctor.profilePhoto
//     ? `http://localhost:5000${doctor.profilePhoto}`
//     : '/default-avatar.png';

//   return (
//     <div className="doctor-card">
//       <img src={imageUrl} alt={doctor.name} className="doctor-image" />
//       <div className="doctor-info">
//         <h2>{doctor.name}</h2>
//         <p><strong>Specialization:</strong> {doctor.specialization}</p>
//         <p><strong>Affiliated Hospital:</strong> {doctor.hospital}</p>
//         <p><strong>Contact:</strong> {doctor.contact}</p>
//       </div>
//       {/* Update the button to be a Link */}
//       <Link to={`/doctors/${doctor._id}`} className="appointment-btn">View Details</Link>
//     </div>
//   );
// };

// export default DoctorCard;


import React from "react";
import { Link } from "react-router-dom";
import { Phone, Hospital, Stethoscope, ArrowRight } from 'lucide-react';
import './DoctorCard.css';

const DoctorCard = ({ doctor }) => {
  const imageUrl = doctor.profilePhoto
    ? doctor.profilePhoto
    : 'https://www.shutterstock.com/image-photo/profile-photo-attractive-family-doc-600nw-1724693776.jpg';

  return (
    <div className="doctor-card">
      <div className="image-wrapper">
        <img src={imageUrl} alt={doctor.fullName} className="doctor-image" />
        <div className="doctor-specialty-badge">
          {doctor.specialization}
        </div>
      </div>

      <div className="doctor-info">
        <h2 className="doctor-name">{doctor.fullName}</h2>

        <div className="info-grid">
          <div className="info-item">
            <Stethoscope size={16} className="info-icon" />
            <span>{doctor.specialization}</span>
          </div>

          <div className="info-item">
            <Hospital size={16} className="info-icon" />
            <span>{doctor.experience}</span>
          </div>

          {/* <div className="info-item">
            <Phone size={16} className="info-icon" />
            <span>{doctor.websiteUrl}</span>
          </div> */}
        </div>
      </div>

      <Link to={`/doctors/${doctor._id}`} className="view-profile-btn">
        <span>View Profile</span>
        <ArrowRight size={16} className="arrow-icon" />
      </Link>
    </div>
  );
};

export default DoctorCard;

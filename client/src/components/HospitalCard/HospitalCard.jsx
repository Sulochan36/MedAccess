

import { Link } from 'react-router-dom';
import { MapPin, Award, ArrowRight } from 'lucide-react';
import './HospitalCard.css';

const HospitalCard = ({ hospital }) => {
  const imageUrl = hospital.profilePhoto && hospital.profilePhoto.trim() !== ''
    ? hospital.profilePhoto
    : 'https://images.unsplash.com/photo-1587351021759-3e566b6af7cc?q=80&w=2072&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D ' ;  // Fallback hospital image

  return (
    <div className="hospital-card">
      <div className="image-container">
        <img className="hospital-image" src={imageUrl} alt={hospital.hospitalName} />
      </div>
      <div className="hospital-info">
        <h3 className="hospital-name">{hospital.hospitalName}</h3>
        <div className="info-row">
          <MapPin size={16} className="icon" />
          <p className="hospital-location">{hospital.address.street}</p>
        </div>
        {/* <div className="info-row">
          <Award size={16} className="icon" />
          <p className="hospital-specialties">{hospital.about}</p>
        </div> */}
        <Link to={`/hospitals/${hospital._id}`} className="details-btn">
          View Details
          <ArrowRight size={16} className="arrow-icon" />
        </Link>
      </div>
    </div>
  );
};

export default HospitalCard;

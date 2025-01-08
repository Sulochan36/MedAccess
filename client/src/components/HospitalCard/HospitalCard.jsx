import { Link } from 'react-router-dom';
import './HospitalCard.css';

const HospitalCard = ({ hospital }) => {
  const imageUrl = hospital.profilePhoto
    ? `/uploads/hospitals/${hospital._id}/${hospital.profilePhoto}`  // Correct path for the uploaded image
    : '/default-avatar.png';  // Fallback to default avatar if no photo is available

  return (
    <div className="hospital-card">
      <img className="hospital-image" src={imageUrl} alt={hospital.hospitalName} />
      <div className="hospital-info">
        <h3 className="hospital-name">{hospital.hospitalName}</h3>
        <p className="hospital-location">
          <i className="location-icon"></i> {hospital.address.street}
        </p>
        <p className="hospital-specialties">
          Specialties: {hospital.specialties}
        </p>
        <div className="hospital-actions">
          {/* Replace button with a Link to go to hospital details */}
          <Link to={`/hospitals/${hospital._id}`} className="details-btn">
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HospitalCard;

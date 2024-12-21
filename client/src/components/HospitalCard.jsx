import { Link } from 'react-router-dom';

const HospitalCard = ({ hospital }) => {
  return (
    <div className="hospital-card">
      <img src={hospital.profileImage || '/default-avatar.png'} alt={hospital.name} />
      <h3>{hospital.name}</h3>
      <Link to={`/hospitals/${hospital._id}`}>More Info</Link>
    </div>
  );
};

export default HospitalCard;
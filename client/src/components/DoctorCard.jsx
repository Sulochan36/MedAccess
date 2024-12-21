import { Link } from 'react-router-dom';

const DoctorCard = ({ doctor }) => {
  return (
    <div className="doctor-card">
      <img src={doctor.profileImage || '/default-avatar.png'} alt={doctor.name} />
      <h3>{doctor.name}</h3>
      <Link to={`/doctors/${doctor._id}`}>More Info</Link>
    </div>
  );
};

export default DoctorCard;
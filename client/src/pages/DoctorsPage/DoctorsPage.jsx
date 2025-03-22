// import { useEffect, useState } from 'react';
// import DoctorCard from '../../components/DoctorCard/DoctorCard';
// import axios from 'axios';
// import './DoctorsPage.css';

// const DoctorsPage = () => {
//   const [doctors, setDoctors] = useState([]);

//   useEffect(() => {
//     const fetchDoctors = async () => {
//       try {
//         const response = await axios.get('http://localhost:5000/api/users/doctors');
//         console.log("doctor ki list",response.data);
//         setDoctors(response.data);
//       } catch (error) {
//         console.error('Error fetching doctors:', error);
//       }
//     };

//     fetchDoctors();
//   }, []);

//   return (
//     <div>
//       <h1>All Doctors</h1>
//       <div className="doctor-cards-container">
//         {doctors.map((doctor) => (
//           <DoctorCard key={doctor._id} doctor={doctor} />
//         ))}
//       </div>
//     </div>
//   );
// };

// export default DoctorsPage;


import { useEffect, useState } from 'react';
import DoctorCard from '../../components/DoctorCard/DoctorCard';
import { Search, UserRound } from 'lucide-react';
import axios from 'axios';
import './DoctorsPage.css';

const DoctorsPage = () => {
  const [doctors, setDoctors] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/users/doctors');
        setDoctors(response.data);
      } catch (error) {
        console.error('Error fetching doctors:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDoctors();
  }, []);

  const filteredDoctors = searchTerm.trim() === ''
    ? doctors
    : doctors.filter(doctor =>
        doctor.fullName?.toLowerCase().includes(searchTerm.toLowerCase().trim()) ||
        doctor.specialization?.toLowerCase().includes(searchTerm.toLowerCase().trim())
      );

  return (
    <div className="doctors-container">
      <div className="doctors-banner">
        <div className="banner-content">
          <UserRound size={40} className="banner-icon" />
          <h1>Find Your Doctor</h1>
          <p className="banner-subtitle">Connect with the best healthcare professionals</p>

          <div className="search-wrapper">
            <div className="search-container">
              <Search className="search-icon" size={20} />
              <input
                type="text"
                placeholder="Search by doctor name or specialization..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="search-input"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="doctors-content">
        {isLoading ? (
          <div className="loading-state">
            <div className="loader"></div>
            <p>Loading doctors...</p>
          </div>
        ) : (
          <>
            <div className="results-info">
              <p className='sub-para'>Found {filteredDoctors.length} doctors</p>
            </div>

            <div className="doctor-cards-container">
              {filteredDoctors.length > 0 ? (
                filteredDoctors.map((doctor) => (
                  <DoctorCard key={doctor._id} doctor={doctor} />
                ))
              ) : (
                <div className="no-results">
                  <p className='sub-para'>No doctors found matching your search criteria.</p>
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default DoctorsPage;

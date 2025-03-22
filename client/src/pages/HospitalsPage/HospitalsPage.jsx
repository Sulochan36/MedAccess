// import { useEffect, useState } from 'react';
// import HospitalCard from '../../components/HospitalCard/HospitalCard';
// import axios from 'axios';
// import './HospitalsPage.css';

// const HospitalsPage = () => {
//   const [hospitals, setHospitals] = useState([]);

//   useEffect(() => {
//     const fetchHospitals = async () => {
//       try {
//         const response = await axios.get('http://localhost:5000/api/users/hospitals');
//         setHospitals(response.data);
//       } catch (error) {
//         console.error('Error fetching hospitals:', error);
//       }
//     };

//     fetchHospitals();
//   }, []);

//   return (
//     <div>
//       <h1>All Hospitals</h1>
//       <div className="hospitals-page">
//             {hospitals.map(hospital => (
//               <HospitalCard
//                 key={hospital._id}
//                 hospital = {hospital}

//               />
//             ))}
//           </div>
//     </div>
//   );
// };

// export default HospitalsPage;



import { useEffect, useState } from 'react';
import HospitalCard from '../../components/HospitalCard/HospitalCard';
import axios from 'axios';
import './HospitalsPage.css';

const HospitalsPage = () => {
  const [hospitals, setHospitals] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

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

  const filteredHospitals = searchTerm.trim() === ''
    ? hospitals
    : hospitals.filter(hospital =>
        hospital.hospitalName?.toLowerCase().includes(searchTerm.toLowerCase().trim())
      );

  return (
    <div className="hospitals-container">
      <div className="banner">
        <h1>All Hospitals</h1>
        <div className="search-container">
          <input
            type="text"
            placeholder="Search hospitals..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>
      </div>

      <div className="hospitals-page">
        {filteredHospitals.length > 0 ? (
          filteredHospitals.map(hospital => (
            <HospitalCard
              key={hospital._id}
              hospital={hospital}
            />
          ))
        ) : (
          <div className="no-results">
            <p className='sub-para'>No hospitals found matching your search.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default HospitalsPage;

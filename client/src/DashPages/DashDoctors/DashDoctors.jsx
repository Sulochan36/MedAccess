import React from 'react'
import DoctorsTable from '../../components/DoctorsTable/DoctorsTable';
import { useNavigate } from 'react-router-dom'; 

const DashDoctors = () => {
  const navigate = useNavigate();
  

  const handleButtonClick = () => {
    navigate('/dashboard/doctors/adddoctorform');  // Navigate to the /form route
  };

  return (
    <div>
      <button onClick={handleButtonClick}>+ Add Doctor</button>
      <DoctorsTable/>
    </div>
  )
}

export default DashDoctors
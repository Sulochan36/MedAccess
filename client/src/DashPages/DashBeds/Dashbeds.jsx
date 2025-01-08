import React from 'react'
import HospitalBedsTable from '../../components/Beds/HospitalBedsTable'
import { useNavigate } from 'react-router-dom';

const Dashbeds = () => {
  const navigate = useNavigate();


  const handleClick = () => {
    navigate('/dashboard/doctors/bedetailsform');  // Navigate to the /form route
  };
  return (
    <div>
      <button onClick={handleClick}>+ Bed Details </button>
      <HospitalBedsTable/>
    </div>
  )
}

export default Dashbeds
import React from 'react'
import { useNavigate } from 'react-router-dom';
import './SignupPage.css'
import Carousel from '../../components/Carousal/Carousal';

const SignupPage = () => {
  const navigate = useNavigate();


  const handleButtonHospital = () => {
    navigate('/signup/hospitalsignup');  // Navigate to the /form route
  };

  const handleButtonDoctor = () => {
    navigate('/signup/doctorsignup');  // Navigate to the /form route
  };

  return (
    <div className='signuppage'>
      
      <button className='btn hospitalsignup' onClick={handleButtonHospital} >Hospital Adminisration</button>
      <button className='btn doctorsignup' onClick={handleButtonDoctor} >Individually as a Doctor</button>
    </div>
  )
}

export default SignupPage
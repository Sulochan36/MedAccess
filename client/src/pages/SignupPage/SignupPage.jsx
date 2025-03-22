import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Hospital, UserCog } from 'lucide-react'; // Import icons
import './SignupPage.css';

const SignupPage = () => {
  const navigate = useNavigate();

  const handleButtonHospital = () => {
    navigate('/signup/hospitalsignup');
  };

  const handleButtonDoctor = () => {
    navigate('/signup/doctorsignup');
  };

  return (
    <div className="signup-container">
      <div className="signup-content">
        <h1 className="signup-title">Choose Your Account Type</h1>
        <p className="signup-subtitle">Select the option that best describes your role</p>

        <div className="signup-options">
          <button
            className="signup-card hospital"
            onClick={handleButtonHospital}
          >
            <div className="card-icon">
              <Hospital size={48} />
            </div>
            <h2>Hospital Administration</h2>
            <p>Register your healthcare facility and manage institutional services</p>
          </button>

          <button
            className="signup-card doctor"
            onClick={handleButtonDoctor}
          >
            <div className="card-icon">
              <UserCog size={48} />
            </div>
            <h2>Medical Professional</h2>
            <p>Sign up as an individual healthcare provider</p>
          </button>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;

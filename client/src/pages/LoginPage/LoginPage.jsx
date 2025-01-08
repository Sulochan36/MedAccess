import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './LoginPage.css'; // Import the CSS file

const LoginPage = ({ setIsLoggedIn }) => {

  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    userType: 'doctor',  // default to 'doctor'
  });
  const [loading, setLoading] = useState(false); // Add a loading state for login
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post('http://localhost:5000/api/auth/login', formData);
      localStorage.setItem('token', response.data.token); // Store the token
      // Redirect based on userType
      if (formData.userType === 'doctor') {
        navigate('/profile'); // Navigate to doctor profile
      } else {
        navigate('/dashboard'); // Navigate to hospital dashboard
      }
    } catch (error) {
      console.error('Error logging in:', error);
      alert('Invalid credentials');
    } finally {
      setLoading(false);
    }
  };


  return (

    <div className="login-container">

      <h1 className="login-title">Login</h1>
        {error && <p className="error">{error}</p>}

      <form onSubmit={handleSubmit} className="login-form">
        <p className='login-instruction'>Please select the user type</p>
        <div className="user-type-selection">
          
          <label className="user-type-label">
            <input
              type="radio"
              name="userType"
              value="doctor"
              checked={formData.userType === 'doctor'}
              onChange={handleChange}
              className="user-type-radio"
            /> Doctor
          </label>
          <hr></hr>
          
          <label className="user-type-label">
            <input
              type="radio"
              name="userType"
              value="hospital"
              checked={formData.userType === 'hospital'}
              onChange={handleChange}
              className="user-type-radio"
            /> Hospital
          </label>
        </div>

        <hr className='seperateline' ></hr>

        <input
          name="email"
          type="email"
          placeholder="Email"
          onChange={handleChange}
          value={formData.email}
          className="input-field"
          required
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          onChange={handleChange}
          value={formData.password}
          className="input-field"
          required
        />



        <button type="submit" className="submit-button" disabled={loading}>
          {loading ? 'Logging in...' : 'Login'}
        </button>
      </form>
    </div>
  );
};

export default LoginPage;

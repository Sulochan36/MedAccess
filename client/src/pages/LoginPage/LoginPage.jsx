import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { User, Hospital, Loader2, Mail, Lock } from 'lucide-react';
import './LoginPage.css';

const LoginPage = ({ setIsLoggedIn }) => {
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    userType: 'doctor',
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError(null); // Clear error when user makes changes
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post('http://localhost:5000/api/auth/login', formData);
      localStorage.setItem('token', response.data.token);
      navigate(formData.userType === 'doctor' ? '/profile' : '/dashboard');
    } catch (error) {
      setError(error.response?.data?.message || 'Invalid credentials. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-wrapper">
      <div className="login-container">
        <div className="login-header">
          <h1 className="login-title">Welcome Back</h1>
          <p className="login-subtitle">Please enter your details to continue</p>
        </div>

        {error && (
          <div className="error-message">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="login-form">
          <div className="user-type-container">
            <p className="selection-label">Select Account Type</p>
            <div className="user-type-selection">
              <label className={`user-type-option ${formData.userType === 'doctor' ? 'active' : ''}`}>
                <input
                  type="radio"
                  name="userType"
                  value="doctor"
                  checked={formData.userType === 'doctor'}
                  onChange={handleChange}
                  className="user-type-radio"
                />
                <User className="option-icon" />
                <span>Doctor</span>
              </label>

              <label className={`user-type-option ${formData.userType === 'hospital' ? 'active' : ''}`}>
                <input
                  type="radio"
                  name="userType"
                  value="hospital"
                  checked={formData.userType === 'hospital'}
                  onChange={handleChange}
                  className="user-type-radio"
                />
                <Hospital className="option-icon" />
                <span>Hospital</span>
              </label>
            </div>
          </div>

          <div className="form-group">
            <label className="input-label">
              <Mail className="input-icon" />
              <input
                name="email"
                type="email"
                placeholder="           Enter your email"
                onChange={handleChange}
                value={formData.email}
                className="input-field"
                required
              />
            </label>
          </div>

          <div className="form-group">
            <label className="input-label">
              <Lock className="input-icon" />
              <input
                name="password"
                type="password"
                placeholder="           Enter your password"
                onChange={handleChange}
                value={formData.password}
                className="input-field"
                required
              />
            </label>
          </div>

          <button type="submit" className="submit-button" disabled={loading}>
            {loading ? (
              <>
                <Loader2 className="spinner" />
                Logging in...
              </>
            ) : (
              'Login'
            )}
          </button>
        </form>

        <div className="login-footer">
          <p>Don't have an account? <a href="/signup" className="signup-link">Sign up</a></p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;

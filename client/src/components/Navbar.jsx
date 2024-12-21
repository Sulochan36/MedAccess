import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css';


const Navbar = ({ isLoggedIn, setIsLoggedIn }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token'); // Clear token from storage
    setIsLoggedIn(false); // Update state
    navigate('/'); // Redirect to homepage
  };

  return (
    <nav>
      <div>
        <Link to="/">Home</Link>
        <Link to="/doctors">Doctors</Link>
        <Link to="/hospitals">Hospitals</Link>
      </div>
      <div>
        {isLoggedIn ? (
          <>
            <button onClick={() => navigate('/profile')}>Profile</button>       
            <button onClick={handleLogout}>Logout</button>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/signup">Sign Up</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
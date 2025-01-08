import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
    // Check if the user is authenticated (e.g., by checking for a token)
    const token = localStorage.getItem('token'); // You can replace this with your own authentication logic

    // If the user is not authenticated, redirect them to the login page
    if (!token) {
        return <Navigate to="/login" replace />;
    }

    // Otherwise, render the protected route's children
    return children;
};

export default PrivateRoute;

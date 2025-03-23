import React, { createContext, useContext, useState, useEffect } from 'react';

// Creating context
const AuthContext = createContext();

// Provide the AuthContext to children
export const useAuth = () => {
    return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
    // Check localStorage directly during initialization
    const initialLoginState = localStorage.getItem('token') ? true : false;

    const [isLoggedIn, setIsLoggedIn] = useState(initialLoginState);

    const login = () => {
        localStorage.setItem('token', 'your-auth-token');  // Store token upon login
        setIsLoggedIn(true);
    };

    const logout = () => {
        localStorage.removeItem('token');
        setIsLoggedIn(false);
    };

    return (
        <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

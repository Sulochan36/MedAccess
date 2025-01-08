// utils/jwt.js
import jwt from 'jsonwebtoken';

export const generateToken = (userId, userType) => {
    return jwt.sign(
        { userId, userType },  // Payload: user info to be stored inside the token
        process.env.JWT_SECRET, // Secret key from environment variables
        { expiresIn: process.env.JWT_EXPIRES_IN } // Expiration time from environment variables
    );
};

export const verifyToken = (token) => {
    return jwt.verify(token, process.env.JWT_SECRET);
};

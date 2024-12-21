import React from 'react';
import './LoginPage.css'; // Create a separate CSS file for styling

const LoginPage = () => {
  return (
    <div className="login-container">
      <h2>Login</h2>
      <form action="/login" method="post">
        <input
          type="email"
          id="email"
          name="email"
          placeholder="Enter your email"
          required
        />
        <input
          type="password"
          id="password"
          name="password"
          placeholder="Enter your password"
          required
        />
        <button type="submit" className="login-button">Login</button>
      </form>
      <div className="register-section">
        <p>
          Don't have an account? <a href="/register">Register</a>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;

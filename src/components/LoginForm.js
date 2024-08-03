import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/Home.css';

const LoginForm = ({ hidePopup }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch('https://acms-backend-c1vn.onrender.com/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email: username, password: password }),
      credentials: 'include', // Important for including cookies
    })
      .then(response => response.json())
      .then(data => {
        if (data.message === 'Login successful') {
          if (data.role === 'admin') {
            navigate('/admin-dashboard');
            localStorage.setItem('adminEmail', username);
          } else {
            navigate('/student-dashboard');
          }
        } else {
          setError(data.error);
        }
      })
      .catch(err => {
        console.error('Error:', err);
        setError('An error occurred. Please try again.');
      });
  };

  return (
    <div className="login-form">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="username">Username:</label>
        <input type="text" id="username" name="username" value={username} onChange={(e) => setUsername(e.target.value)} required /><br />
        <label htmlFor="password">Password:</label>
        <input type="password" id="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} required /><br />
        {error && (
          <div className="error-notification">
            <div className="error-icon">!</div>
            <div className="error-message">{error}</div>
          </div>
        )}
        <button type="submit" className="login-button">Login</button>
      </form>
    </div>
  );
};

export default LoginForm;

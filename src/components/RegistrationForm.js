import React, { useState } from 'react';
import '../css/Home.css';
import axios from 'axios';

const RegistrationForm = ({ hidePopup, onSuccess }) => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');

  axios.defaults.withCredentials = true;

  const handleRegister = (e) => {
    e.preventDefault();

    axios.post("https://acms-backend-c1vn.onrender.com/register", { email, name })
      .then(response => {
        console.log(response.data);
        onSuccess();
      })
      .catch(error => {
        console.error('Error registering user:', error);
      });
  };

  return (
    <div className="registration-form">
      <h2>Registration</h2>
      <form onSubmit={handleRegister}>
        <label htmlFor="email">Email:</label>
        <input type="email" id="email" name="email" required onChange={e => setEmail(e.target.value)} /><br />
        <label htmlFor="name">Name:</label>
        <input type="text" id="name" name="name" required onChange={e => setName(e.target.value)} /><br />
        <button type="submit" className="login-button">Register</button>
      </form>
    </div>
  );
};

export default RegistrationForm;

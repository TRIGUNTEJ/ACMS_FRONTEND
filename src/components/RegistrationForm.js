// RegistrationForm.js

import React, { useState } from 'react';
import '../css/Home.css';
import axios from 'axios';

const RegistrationForm = ({ hidePopup, onSuccess }) => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');

  axios.defaults.withCredentials = true;

  const handleRegister = (e) => {
    e.preventDefault();

    axios.post("http://localhost:3041/register", { email, name, password })
      .then(req => {
        console.log(req);
        onSuccess();
      })
      .catch(err => console.log(err));
  };

  return (
    <div className="registration-form">
      <h2>Registration</h2>
      <form>
        <label htmlFor="email">Email:</label>
        <input type="text" id="email" name="email" required onChange={e => setEmail(e.target.value)} /><br />
        <label htmlFor="name">Name:</label>
        <input type="text" id="name" name="name" required onChange={e => setName(e.target.value)} /><br />
        <label htmlFor="password">Password:</label>
        <input type="password" id="password" name="password" required onChange={e => setPassword(e.target.value)} /><br />
        <button type="submit" className="login-button" onClick={handleRegister}>Register</button>
      </form>
    </div>
  );
};

export default RegistrationForm;

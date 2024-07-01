// Home.js
import React, { useState } from 'react';
import LoginForm from './LoginForm';
import RegistrationForm from './RegistrationForm';
import '../css/Home.css';
import homeImage from '../images/home.png';

const Home = () => {
  const [showLoginForm, setShowLoginForm] = useState(false);
  const [showRegistrationForm, setShowRegistrationForm] = useState(false);
  const [showSuccessNotification, setShowSuccessNotification] = useState(false);

  const handleLoginClick = () => {
    setShowLoginForm(true);
    setShowRegistrationForm(false);
  };

  const handleRegistrationClick = () => {
    setShowLoginForm(false);
    setShowRegistrationForm(true);
  };

  const hidePopup = () => {
    setShowLoginForm(false);
    setShowRegistrationForm(false);
  };

  const handleRegistrationSuccess = () => {
    setShowSuccessNotification(true);
    setTimeout(() => {
      setShowSuccessNotification(false);
    }, 5000);
  };

  return (
    <div>
      {showSuccessNotification && (
        <div className="success-notification">
          <div className="success-icon">&#10004;</div>
          <div className="success-message">Registration successful!</div>
        </div>
      )}
      <div className = "content">
        <div className="image-container">
          {!showLoginForm && !showRegistrationForm && <img src={homeImage} alt="Home" />}
          {showLoginForm && <LoginForm hidePopup={hidePopup} />}
          {showRegistrationForm && <RegistrationForm hidePopup={hidePopup} onSuccess={handleRegistrationSuccess} />}
        </div>
      
        <div className="container">
          <h1>Embark on Your Academic Journey:</h1>
          <h1 id="animated-text">Introducing Our Course Registration Portal</h1>
          <div className="button-container">
            <button className="login-button" onClick={handleLoginClick}>Login</button>
            <button className="login-button" onClick={handleRegistrationClick}>Register</button>
          </div>
        </div>
        <div className = "container2">      </div>
       </div>
    </div>
  );
};

export default Home;
